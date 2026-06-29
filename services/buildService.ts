export interface HeroBuild {

  hero_id: number;
  hero_build_id: number;
  author_account_id: number;
  name: string;
  description: string;
  num_favorites: number;
  details?: any;
  hero_build: any;
  heroId: number;
}



export async function getBuildsById(heroId: number | null, limit: number = 3, sortBy: string = 'recent', order: string = 'desc'): Promise<HeroBuild[] | null> {

  try {
    let buildsApiurl;
    if (heroId === null) {
      buildsApiurl = `https://api.deadlock-api.com/v1/builds?only_latest=true`;

    } else {
      buildsApiurl = `https://api.deadlock-api.com/v1/builds?hero_id=${heroId}&only_latest=true`;

    }
    const response = await fetch(buildsApiurl, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;

    const buildsData: HeroBuild[] = await response.json();
    const isDesc = order === 'desc';

    const sortedByTime = [...buildsData].sort((a, b) => {
      const timeA = a.hero_build?.last_updated_timestamp || 0;
      const timeB = b.hero_build?.last_updated_timestamp || 0;
      return timeB - timeA;
    });

    const seenAuthors = new Set<string>();
    const uniqueAuthorBuilds = sortedByTime.filter(build => {

      const authorId = build.hero_build?.author_account_id;

      if (!authorId) return true;
      if (seenAuthors.has(authorId)) return false;

      seenAuthors.add(authorId);
      return true;
    });

    if (sortBy !== 'recent') {
      uniqueAuthorBuilds.sort((a, b) => {
        const favA = a.num_favorites || 0;
        const favB = b.num_favorites || 0;
        return isDesc ? favB - favA : favA - favB;
      });
    } else if (!isDesc) {
      uniqueAuthorBuilds.reverse();
    }

    return uniqueAuthorBuilds.slice(0, limit);


  } catch (e) {
    console.log(e);
  }

  return null;
}


export async function getAllBuilds(limit: number = 12, sortBy: string = 'recent', order: string = 'desc', heroId: number | null = null): Promise<HeroBuild[] | null> {

  try {
    const buildsApiurl = 'https://api.deadlock-api.com/v1/builds?only_latest=true';



    const response = await fetch(buildsApiurl, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;

    const buildsData: HeroBuild[] = await response.json();

    const filteredBuilds = heroId
      ? buildsData.filter(build => (build.hero_id === heroId || build.hero_build?.hero_id === heroId))
      : buildsData;
    console.log(filteredBuilds);

    const isDesc = order === 'desc';
    const sortedBuildsData = filteredBuilds.sort((a, b) => {

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