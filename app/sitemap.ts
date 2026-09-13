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

    const safeHeroName = hero.name
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[\/\\?%#\[\]!'`()]/g, '')
      .trim()
      .replace(/\s+/g, '-');



    // const rawUrl = `${baseUrl}/heroes/${hero.id}-${hero.name.toLowerCase()}`;
    const rawUrl = `${baseUrl}/heroes/${hero.id}-${safeHeroName}`;

    return {
      url: encodeURI(rawUrl),
      lastModified: new Date(),
    }
  });

  // builds
  const allBuilds = await getBuildsById(null, 100) || [];


  const buildPages = allBuilds
    .map((build) => {
      if (!build) return null;

      const buildId = build.hero_build?.hero_build_id;
      const rawTimestamp = build.hero_build?.last_updated_timestamp || build.hero_build?.publish_timestamp;
      const buildName = build.hero_build?.name || 'build';

      // 1. Очищаем имя от спецсимволов (! ' [ ] / \ ? % #), которые ломают XML и URL
      const cleanName = buildName
        .replace(/[\/\\?%#\[\]!'`()&]/g, '') // добавили скобки ( )
        .trim()
        .replace(/\s+/g, ' ');
      // 2. Кодируем имя (пробелы превратятся в %20)
      const encodedName = encodeURIComponent(cleanName);

      // 3. Формируем точно ваш URL
      const rawUrl = `${baseUrl}/builds/${buildId}?t=${rawTimestamp || ''}/${encodedName}`;

      // 4. Исправляем дату (переводим секундный timestamp в миллисекунды)
      let parsedDate = new Date();
      if (rawTimestamp) {
        const tsNum = Number(rawTimestamp);
        parsedDate = new Date(tsNum < 10000000000 ? tsNum * 1000 : tsNum);
      }

      return {
        url: rawUrl,
        lastModified: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
      };


      // return {
      //   url: rawUrl,
      //   lastModified: build?.hero_build?.publish_timestamp ? new Date(build?.hero_build?.publish_timestamp) : new Date(),
      // };

      return {
        url: rawUrl,
        lastModified: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
      }
    })
    .filter((page): page is { url: string; lastModified: Date } => page !== null);

  const allPages = [...staticPages, ...heroPages, ...buildPages];

  return allPages.map(page => ({
    ...page,
    url: page.url.includes('&amp;') ? page.url : page.url.replace(/&/g, '&amp;')
  }));
}