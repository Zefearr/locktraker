import { getSingleHero } from "@/services/heroService";
import HeroSingle from '@/components/HeroSingle';
import { fetchHeroes } from "@/services/heroService";
import { fetchAllItemsNested, flattenItems } from "@/services/itemService";
import { Metadata } from "next";
import BuildsContent from "@/components/BuildsContent";
import BuildFilters from "@/components/buildFilters";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ limit?: string; sort?: string; order?: string; }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

  const resolvedParams = await params;
  const currentHeroId = parseInt(resolvedParams.id.toString(), 10);

  const hero = await getSingleHero(currentHeroId);

  if (!hero) {
    return {
      title: 'No such hero | Deadlock Stats ',
      description: 'This hero does not exist.',
    };
  }

  return {
    title: `${hero.name}-profile `,
    description: `${hero.name}'s lore, abilities and builds`,

    openGraph: {
      title: `${hero.name} — profile Deadlock Stats`,
      description: `About ${hero.name} `,
      images: [
        {
          url: `/public/lined_paper.png`,
          width: 1200,
          height: 630,
          alt: `Deadlock Stats for ${hero.name}`,
        },
      ],
    },
  };
}

export default async function HeroDetailPage({ params, searchParams }: PageProps) {

  const { id } = await params;
  const currentHeroId = parseInt(id.toString(), 10);

  if (!currentHeroId) return <div>Nothings here</div>;

  const resolvedSearchParams = await searchParams;
  const currentOrder = resolvedSearchParams.order || 'desc';
  const currentSort = resolvedSearchParams.sort || 'recent';
  const currentLimit = Number(resolvedSearchParams.limit) || 6;

  const [hero, allHeroesData, nestedItems] = await Promise.all([
    getSingleHero(currentHeroId ?? 0),
    fetchHeroes(),
    fetchAllItemsNested()
  ])

  if (!nestedItems || !allHeroesData || !hero) return null;

  const heroFromList = allHeroesData?.find(h => h.id === currentHeroId);

  const enrichedHero = {
    ...hero,
    tier: heroFromList?.tier
  }

  const itemsMap = flattenItems(nestedItems);
  return (
    <div className="max-w-[1280px] m-auto overflow-hidden">
      <HeroSingle hero={enrichedHero} />
      <BuildFilters
        currentLimit={currentLimit}
        currentSort={currentSort}
        currentOrder={currentOrder} />
      <BuildsContent
        currentHeroId={currentHeroId}
        currentLimit={currentLimit}
        currentSort={currentSort}
        currentOrder={currentOrder}
        itemsMap={itemsMap}
      />
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



