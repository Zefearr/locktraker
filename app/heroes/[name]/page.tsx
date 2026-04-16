import { getSingleHero } from "@/services/heroService";
import Image from "next/image";
import { notFound } from "next/navigation";
import HeroSingle from '@/components/HeroSingle';
import { fetchHeroes } from "@/services/heroService";



interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function HeroDetailPage({ params }: PageProps) {
  const { name } = await params;
  // const hero = await getSingleHero(name);
  const decodedName = decodeURIComponent(name);
  const [hero, allHeroesData] = await Promise.all([
    getSingleHero(decodedName),
    fetchHeroes()
  ])

  if (!hero) notFound();
  const heroFromList = allHeroesData?.find(h => h.name.toLowerCase() === decodedName.toLowerCase());
  const enrichedHero = {
    ...hero,
    tier: heroFromList?.tier
  }
  console.log(enrichedHero);
  return (
    <div>
      <HeroSingle hero={enrichedHero} />
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



