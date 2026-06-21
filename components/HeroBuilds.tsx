'use client'
import { HeroBuild } from "@/services/buildService";
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DeadlockArrowIcon } from "./ui/icons";
import { calculateTime } from "./helpers";
import Link from "next/link";

interface BuildsListProps {
  builds: HeroBuild[];
  itemsMap: Record<number, any>;
  currentLimit: number;
  currentSort?: string;
  currentOrder?: string;
}


export default function BuildsList({ builds, itemsMap, currentLimit, currentSort, currentOrder }: BuildsListProps) {

  const router = useRouter();
  const pathname = usePathname();

  const handleSortClick = (sortType: string) => {
    let nextOrder = 'desc';
    let nextLimit = 3;

    if (currentSort === sortType) {
      nextOrder = currentOrder === 'desc' ? 'asc' : 'desc';
      nextLimit = currentLimit;
    } else {
      nextOrder = 'desc';
      nextLimit = 3;
    }

    router.push(`${pathname}?limit=${nextLimit}&sort=${sortType}&order=${nextOrder}`, { scroll: false });
  };


  const handleLoadMore = () => {
    const nextLimit = currentLimit + 3;
    router.push(`${pathname}?limit=${nextLimit}&sort=${currentSort}&order=${currentOrder}`, { scroll: false });
  };

  return (
    <div className="my-12">

      <div className="flex p-8 py-4 border rounded-md ">
        <h3 className="text-[1.5rem] uppercase font-bold mr-12">Builds</h3>

        <button
          onClick={() => handleSortClick('favorites')}
          className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center gap-2 ${currentSort === 'favorites'
            ? 'bg-amber-600 text-black font-black'
            : 'text-zinc-400 hover:text-white bg-transparent'
            }`}
        >
          <span> Popular</span>

          <DeadlockArrowIcon
            className={`w-2.5 h-2.5  transition-transform duration-200 ${currentOrder === 'asc' && currentSort === 'favorites' ? 'rotate-180' : 'rotate-0'
              }`}
          />

        </button>
        <button
          onClick={() => handleSortClick('recent')}
          className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center gap-2 ${currentSort === 'recent'
            ? 'bg-amber-600 text-black font-black'
            : 'text-zinc-400 hover:text-white bg-transparent'
            }`}
        >
          <span> Recent</span>
          <DeadlockArrowIcon
            className={`w-2.5  h-2.5  transition-transform duration-200 ${currentOrder === 'asc' && currentSort === 'recent' ? 'rotate-180' : 'rotate-0'
              }`}
          />
        </button>
      </div>
      <div className="flex  flex-wrap justify-between">
        {builds.map((build, index) => (
          <BuildCard key={index} build={build} itemsMap={itemsMap} />
        ))}


      </div>

      {builds.length === currentLimit && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-emerald-900 text-white
             font-bold
              rounded-sm
               border
                border-emerald-500
                 hover:bg-emerald-500
                  transition-colors
                   cursor-pointer
                    text-sm
                     uppercase
                      tracking-wider"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}


export function BuildCard({ build, itemsMap }: { build: HeroBuild, itemsMap: any }) {

  // const [isOpen, setIsOpen] = useState(false);
  const buildInfo = build.hero_build;


  if (!buildInfo || !buildInfo.details) return null;
  const buildId = build.hero_build?.hero_build_id;

  return (

    <div className="my-2 mx-2 bg-amber-50 flex-grow relative rounded-lg w-100 overflow-hidden  bg-[url('/lined_paperdark.png')] bg-absolute border border-gray-850">

      <Link href={`/builds/${buildId}?t=${build.hero_build?.last_updated_timestamp}/${build.hero_build.name}`}>
        <h3 className=" p-4 relative block text-[1.7rem] bg-gray-700/95 text-gray-200 font-semibold ">
          {buildInfo?.name}
          <span className="pl-12 text-[0.6rem] font-bold">{calculateTime(buildInfo.last_updated_timestamp)}</span>

          {/* <button onClick={() => setIsOpen(!isOpen)}
            className={isOpen ? rotated : rotationDeffault} > <DeadlockArrowIcon className="w-8 h-8 text-deadlock-headings " />
          </button> */}

        </h3>
      </Link>

      <div className="p-4 flex gap-4 flex-wrap overflow-hidden">
        {buildInfo.details.mod_categories?.map((category: any, index: number) => {

          const firstValidMod = category.mods?.find((mod: any) => itemsMap[mod.ability_id]?.image);
          if (!firstValidMod) return null;

          const itemData = itemsMap[firstValidMod.ability_id];


          return (
            <div className="bg-[#6e6e6e]  " key={index}>



              <img width={50} height={50} src={itemData?.image} alt="itemData?.name" />




            </div>
          )

        })}
      </div>







    </div>
  );
}