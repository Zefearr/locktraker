

export interface HeroAbility {
  id: number;
  name: string;
  image: string;
  description: string;
  quip: string;
  upgradeOneDescription: string;
  upgradeTwoDescription: string;
  upgradeThreeDescription: string;
  upgrades: AbilityUpgrade[];
  abilityCharges: string;
  abilityRange: string;
  cooldown: number;

}

export interface CleanHero {
  id: number;
  name: string;
  class: string;
  image: string;
  wins: number;
  losses: number;
  matches: number;
  totalPlayers: number;
  kills: number;
  deaths: number;
  assists: number;
  kda: string;
  winrate: number;
  tier: Tier
}
export type Tier = 'S+' | 'S' | 'A' | 'B' | 'C' | 'D';
export const tierWeights: Record<string, number> = {
  'S+': 6,
  'S': 5,
  'A': 4,
  'B': 3,
  'C': 2,
  'D': 1,
};

interface DeadlockHeroStats {
  hero_id: number;
  wins: number;
  losses: number;
  matches: number;
  players: number;
  total_kills: number;
  total_deaths: number;
  total_assists: number;
}
interface DeadlockApiHero {
  id: number;
  name: string;
  hero_type: string;
  images: {
    minimap_image_webp: string;
    [key: string]: any;
  };
}

export interface SingleHero {
  id: number;
  name: string;
  image: string;
  role: string;
  playstyle: string;
  hero_type: string;
  tags: [];
  lore?: string;
  abilities: any[];
  tier?: string;
  basehealth?: string;
  basespeed?: string;
}


export interface PropertyUpgrade {
  name: string;
  bonus: string | number;
}
export interface AbilityUpgrade {
  property_upgrades: PropertyUpgrade[];
}

function calculateWinRate(wins: number, matches: number): number {

  // const winrate = ((wins / matches) * 100).toFixed(1);

  if (!matches || matches === 0) return 0;
  return Math.round((wins / matches) * 1000) / 10;
}

function calculateKda(k: number, d: number, a: number): string {
  const deaths = d === 0 ? 1 : d;
  const kda = (k + a) / deaths;
  return kda.toFixed(1);
}

function calculateTier(winrate: number): Tier {
  if (winrate >= 55) return 'S+';
  if (winrate >= 54) return 'S';
  if (winrate >= 51) return 'A';
  if (winrate >= 48) return 'B';
  if (winrate >= 45) return 'C';
  return 'D';

}

export async function fetchHeroes(): Promise<CleanHero[] | null> {

  try {
    const [heroesData, statsData] = await Promise.all([
      fetch(`https://assets.deadlock-api.com/v2/heroes?language=english&client_version=6430&only_active=true`, {
        next: { revalidate: 3600 }
      }).then(res => {
        if (!res.ok) throw new Error('Heroes fetch failed');
        return res.json() as Promise<DeadlockApiHero[]>;
      }),
      fetch(`https://api.deadlock-api.com/v1/analytics/hero-stats?bucket=no_bucket&game_mode=normal`, {
        next: { revalidate: 3600 }
      }).then(res => {
        if (!res.ok) throw new Error('Stats fetch failed');
        return res.json() as Promise<DeadlockHeroStats[]>
      })

    ]);

    const mergedHeroesData: CleanHero[] = heroesData.map((hero) => {

      const heroStats = statsData.find((stats: any) => stats.hero_id === hero.id);
      const winCount = heroStats?.wins || 0;
      const matchCount = heroStats?.matches || 0;
      const killsCount = heroStats?.total_kills || 0;
      const deathsCount = heroStats?.total_deaths || 0;
      const assistsCount = heroStats?.total_assists || 0;
      const winrateValue = calculateWinRate(winCount, matchCount); // Это строка "51.5"

      return {
        id: hero.id,
        name: hero.name,
        class: hero.hero_type,
        image: hero.images?.minimap_image_webp || '',
        wins: winCount,
        losses: heroStats?.losses || 0,
        matches: matchCount,
        totalPlayers: heroStats?.players || 0,
        kills: killsCount,
        deaths: deathsCount,
        assists: assistsCount,
        kda: calculateKda(killsCount, deathsCount, assistsCount),
        winrate: winrateValue,
        tier: calculateTier(winrateValue)
      };

    });
    return mergedHeroesData;

  } catch (error) {
    console.error('error in fetchHeroes', error)
    return null
  }
}

export const formatVal = (val: any): string => {
  const num = parseFloat(val);
  return (!isNaN(num) && num > 0) ? String(val) : '';
};



export async function getSingleHero(name: string): Promise<SingleHero | null> {
  try {
    const url = `https://assets.deadlock-api.com/v2/heroes/by-name/${name}`;
    const fetchHeroes = await fetch(url);
    if (!fetchHeroes.ok) return null;

    const heroesData = await fetchHeroes.json();

    const abilityRawData = await fetch(`https://assets.deadlock-api.com/v2/items/by-hero-id/${heroesData?.id}`);
    const abilityDataById = await abilityRawData.json();



    const cleanAbilities: HeroAbility[] = abilityDataById
      .map((ability: any, index: number) => {
        const realId = ability.id?.value || ability.id || index;
        return {
          id: realId,
          description: ability.description.desc?.replace(/<[^>]*>/g, '') ?? '',
          upgradeOneDescription: ability.description?.t1_desc?.replace(/<[^>]*>/g, '') ?? '',
          upgradeTwoDescription: ability.description?.t2_desc?.replace(/<[^>]*>/g, '') ?? '',
          upgradeThreeDescription: ability.description?.t3_desc?.replace(/<[^>]*>/g, '') ?? '',
          cooldown: ability.properties.AbilityCooldown.value || '',
          abilityCharges: formatVal(ability.properties.AbilityCharges?.value),
          abilityRange: formatVal(ability.properties.Radius?.value),
          abilityDamage: ability.properties.Damage?.value || '',
          quip: ability.description.quip || '',
          name: ability.name || `Ability ${index + 1}`,
          image: ability.image,
          upgrades: (ability.upgrades || []).map((upg: any) => ({
            property_upgrades: upg.property_upgrades || []
          }))
        }
      })

    return {
      id: heroesData?.id,
      name: heroesData?.name,
      role: heroesData?.description.role,
      lore: heroesData?.description.lore,
      image: heroesData?.images.icon_hero_card || '',
      playstyle: heroesData.description.playstyle,
      hero_type: heroesData.hero_type,
      tags: heroesData.tags,
      basehealth: heroesData.starting_stats.max_health.value,
      basespeed: heroesData.starting_stats.sprint_speed.value,
      abilities: cleanAbilities
    };
  } catch (error) {
    console.error("something wends wrong");
    return null;
  }



}
