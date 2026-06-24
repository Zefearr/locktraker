import { getSingleHero } from "@/services/heroService";
import { notFound } from "next/navigation";
import HeroSingle from '@/components/HeroSingle';
import BuildsList from '@/components/HeroBuilds';
import { getBuildsById } from "@/services/buildService";
import { fetchHeroes } from "@/services/heroService";
import { fetchAllItemsNested, flattenItems } from "@/services/itemService";


interface PageProps {
  params: Promise<{ name: string, id: string }>;
  searchParams: Promise<{ limit?: string; sort?: string; order?: string }>;
}

export default async function HeroDetailPage({ params, searchParams }: PageProps) {

  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  const resolvedSearchParams = await searchParams;
  const currentOrder = resolvedSearchParams.order || 'desc';
  const currentSort = resolvedSearchParams.sort || 'recent';
  const currentLimit = Number(resolvedSearchParams.limit) || 3;

  const hero = await getSingleHero(decodedName);
  if (!hero) notFound();

  const [allHeroesData, buildsData, nestedItems] = await Promise.all([
    fetchHeroes(),
    getBuildsById(hero.id, currentLimit, currentSort, currentOrder),
    fetchAllItemsNested()
  ])

  if (!nestedItems) return null;

  const heroFromList = allHeroesData?.find(h => h.name.toLowerCase() === decodedName.toLowerCase());
  const enrichedHero = {
    ...hero,
    tier: heroFromList?.tier
  }
  console.log(heroFromList);
  const itemsMap = flattenItems(nestedItems);

  return (
    <div className="max-w-[1280px] m-auto">
      <HeroSingle hero={enrichedHero} />
      <BuildsList builds={buildsData || []} itemsMap={itemsMap} currentLimit={currentLimit} currentSort={currentSort} currentOrder={currentOrder} />
    </div>
  )
}

























// interface Props {
//   params: Promise<{ name: string }>;
// }

// async function getHeroData(name: string) {

//   const url = `https://assets.deadlock-api.com/v2/heroes/by-name/${name}?language=english&client_version=6430`;
//   const res = await fetch(url);
//   const resData = await res.json();
//   if (!res.ok) return null;

//   const reducedData = {
//     name: resData.name,
//     lore: resData.description.lore,
//     image: resData.images.hero_card_critical,
//     id: resData.id,
//   };

//   return reducedData;
// }

// export default async function HeroDetailPage({ params }: Props) {
//   const resolvedParams = await params;
//   const name = resolvedParams.name;

//   const [heroData] = await Promise.all([
//     getHeroData(name),

//   ]);

//   if (!heroData) {
//     return <div className="p-10 text-white">Герой {name} не найден.</div>;
//   }

//   return (
//     <div className="p-10 text-white">
//       <div className="hero-list">
//         <div className="flex flex-col border p-4 bg-deadlock-dark">
//           {heroData && (
//             <div className="text-white gap-5 flex flex-row overflow-hidden">
//               <div className="flex flex-col items-center">
//                 <div className="border">
//                   {/* <Image
//                     loading="eager"
//                     src={heroData?.image}
//                     alt={heroData?.name}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                   /> */}

//                   <img
//                     src={heroData?.image}
//                     alt={heroData?.name}
//                     className="w-full h-auto"
//                   />
//                 </div>
//                 <h1 className="text-4xl font-oswald font-bold py-4">
//                   {heroData?.name}
//                 </h1>
//                 <span>{heroData?.id}</span>
//                 <span className="bg-orange-600 h-20 w-20 rounded-2xl">

//                 </span>
//               </div>
//               <div className="p-4 py-0">
//                 <p className="text-lg text-gray-300">{heroData?.lore}</p>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }



