
export interface PlayerScores {
  name: string;
  rank: number;
  rankedRank: number;
  badgeLevel: number;
  heroId?: number;
  favHeroesId: any[];
  heroes: any[];

}


interface LeaderboardResponse {
  entries: PlayerScores[];
}


export async function fetchLeaderBoard(limit: number = 100, heroId: number): Promise<PlayerScores[] | null> {

  try {

    const url = `https://api.deadlock-api.com/v1/leaderboard/Europe/${heroId}`;

    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response) return null;

    const data = await response.json().catch(() => null) as LeaderboardResponse;
    if (!data || !Array.isArray(data.entries)) return null;



    if (data && Array.isArray(data.entries)) {
      return data.entries.slice(0, limit).map((player: any): PlayerScores => {
        return {
          name: player.account_name,
          rank: player.rank,
          rankedRank: player.ranked_rank,
          badgeLevel: player.badge_level,
          favHeroesId: player.top_hero_ids,
          heroes: []
        }
      })

    }
  } catch (e) {
    console.log(e)
  }
  return null;
}
export async function fetchGlobalLeaderBoard(): Promise<PlayerScores[] | null> {

  try {

    const url = `https://api.deadlock-api.com/v1/leaderboard/Europe`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    const data = await response.json().catch(() => null) as LeaderboardResponse;
    if (!data || !Array.isArray(data.entries)) return null;

    return data.entries.map((player: any): PlayerScores => {
      return {
        name: player.account_name,
        rank: player.rank,
        rankedRank: player.ranked_rank,
        badgeLevel: player.badge_level,
        favHeroesId: player.top_hero_ids,
        heroes: []

      }
    })



  } catch (e) {
    console.log(e)
  }
  return null;
}
