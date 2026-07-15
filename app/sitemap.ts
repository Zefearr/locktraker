import { MetadataRoute } from 'next';
// Импортируй свои функции получения данных
import { fetchHeroes } from '@/services/heroService';
import { getBuildsById } from '@/services/buildService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const baseUrl = 'https://statdl.eu';


  const staticPages = [

    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/builds`, lastModified: new Date() },
  ];


  // heroes
  const heroes = await fetchHeroes() || [];

  const heroPages = heroes.map((hero) => {
    const rawUrl = `${baseUrl}/heroes/${hero.id}-${hero.name.toLowerCase()}`;
    return {
      url: encodeURI(rawUrl),
      lastModified: new Date(),
    }
  });

  // builds
  const allBuilds = await getBuildsById(null, 2000) || [];
  console.log(allBuilds.length);
  const buildPages = allBuilds

    .map((build) => {

      const buildId = build.hero_build?.hero_build_id;

      const timestamp = build.hero_build?.last_updated_timestamp || build.hero_build?.publish_timestamp;
      const buildName = build.hero_build?.name;

      if (!build) return null;

      const encodedName = buildName ? encodeURIComponent(buildName) : 'build';
      const rawUrl = `${baseUrl}/builds/${buildId}?t=${timestamp || ''}/${encodedName}`;




      return {
        url: rawUrl,
        lastModified: build?.hero_build?.publish_timestamp ? new Date(build?.hero_build?.publish_timestamp) : new Date(),
      };
    })
    .filter((page): page is { url: string; lastModified: Date } => page !== null);

  const allPages = [...staticPages, ...heroPages, ...buildPages];

  return allPages.map(page => ({
    ...page,
    url: page.url.includes('&amp;') ? page.url : page.url.replace(/&/g, '&amp;')
  }));
}