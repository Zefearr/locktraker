export interface HeroBuild {

  hero_id: number;
  hero_build_id: number;
  author_account_id: number;
  name: string;
  description: string;
  num_favorites: number;
  details?: any;
  hero_build: any;
}



export async function getBuildsById(heroId: number, limit: number = 3, sortBy: string = 'recent', order: string = 'desc'): Promise<HeroBuild[] | null> {

  try {

    const buildsApiurl = `https://api.deadlock-api.com/v1/builds?hero_id=${heroId}`;
    const response = await fetch(buildsApiurl, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) return null;

    const seenNames = new Set<string>();
    const buildsData: HeroBuild[] = await response.json();
    const isDesc = order === 'desc'; // Флаг: сортируем по убыванию?

    const sortedBuildsData = buildsData.sort((a, b) => {

      if (sortBy === 'recent') {
        const timeA = a.hero_build?.last_updated_timestamp || 0;
        const timeB = b.hero_build?.last_updated_timestamp || 0;
        return isDesc ? timeB - timeA : timeA - timeB;
      }

      const favA = a.num_favorites || 0;
      const favB = b.num_favorites || 0;

      return isDesc ? favB - favA : favA - favB;

    })


    return sortedBuildsData.slice(0, limit)
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function getAllBuilds(limit: number = 3, sortBy: string = 'recent', order: string = 'desc'): Promise<HeroBuild[] | null> {

  try {

    const buildsApiurl = `https://api.deadlock-api.com/v1/builds`;

    const response = await fetch(buildsApiurl, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;

    const buildsData: HeroBuild[] = await response.json();

    const isDesc = order === 'desc';
    const sortedBuildsData = buildsData.sort((a, b) => {

      if (sortBy === 'recent') {
        const timeA = a.hero_build?.last_updated_timestamp || 0;
        const timeB = b.hero_build?.last_updated_timestamp || 0;
        return isDesc ? timeB - timeA : timeA - timeB;
      }

      const favA = a.num_favorites || 0;
      const favB = b.num_favorites || 0;

      return isDesc ? favB - favA : favA - favB;

    })

    return sortedBuildsData.slice(0, limit)
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getBuildByBuildId(buildId: number): Promise<HeroBuild | null> {
  try {
    const buildsApiurl = `https://api.deadlock-api.com/v1/builds?build_id=${buildId}`;
    const response = await fetch(buildsApiurl, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;

    const buildData = await response.json();


    return buildData;

  } catch (e) {
    console.log(e);
    return null;
  }
}