'use client'
import { HeroBuild } from "@/services/buildService";
import { useRouter, usePathname } from 'next/navigation';
import { DeadlockArrowIcon } from "./ui/icons";
import { calculateTime } from "./helpers";
import Link from "next/link";
import { truncateText } from "./helpers";

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
      nextLimit = currentLimit;
    }
    router.push(`${pathname}?limit=${nextLimit}&sort=${sortType}&order=${nextOrder}`, { scroll: false });
  };

  const handleLoadMore = () => {
    const nextLimit = currentLimit + 3;
    router.push(`${pathname}?limit=${nextLimit}&sort=${currentSort}&order=${currentOrder}`, { scroll: false });
  };

  return (
    <div className="my-12">

      <div className="flex p-8 py-4 mb-4 border border-gray-800 shadow-emerald-800 ">
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
      <div className="flex  flex-wrap gap-4 justify-between px-4 md:px-2 lg:px-0">
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

  const buildInfo = build.hero_build;

  if (!buildInfo || !buildInfo.details) return null;
  const buildId = build.hero_build?.hero_build_id;

  return (

    <Link href={`/builds/${buildId}?t=${build.hero_build?.last_updated_timestamp}/${build.hero_build.name}`} className=" bg-amber-50 grow relative  w-100 overflow-hidden  bg-[url('/lined_paperdark.png')] bg-absolute hover:scale-[1.05] hover:shadow-md shadow-blue-200 transition-all cursor-pointer">

      <div className="flex flex-row items-center bg-deadlock-dark ">
        <h3 className="flex-1 p-4 pl-6 relative block text-[1rem] text-gray-200 font-semibold whitespace-nowrap">
          {truncateText(buildInfo?.name, 20)}
        </h3>
        <span className="block flex-1 pl-12 text-[0.6rem] font-bold whitespace-nowrap">{calculateTime(buildInfo?.last_updated_timestamp)}</span>
        {/* <span className="block flex-2 pl-12 text-[0.6rem] font-bold whitespace-nowrap">{buildInfo?.author_account_id} </span> */}

      </div>

      <div className="p-4 flex gap-4 flex-wrap overflow-hidden">

        {buildInfo.details.mod_categories?.filter((category: any) => category.mods?.some((mod: any) => itemsMap[mod.ability_id]?.image))

          .slice(0, 6)

          .map((category: any, index: number) => {

            const firstValidMod = category.mods?.find((mod: any) => itemsMap[mod.ability_id]?.image);
            const itemData = itemsMap[firstValidMod.ability_id];

            return (
              <div className="bg-[#6e6e6e]" key={index}>
                <img width={50} height={50} src={itemData?.image} alt={itemData?.itemName || "item"} />
              </div>
            );
          })
        }
      </div>

    </Link>
  );
}