'use client'
import { HeroBuild } from "@/services/buildService";
import { calculateTime } from "./helpers";
import Link from "next/link";
import { truncateText } from "./helpers";

interface BuildsListProps {
  builds: HeroBuild[];
  itemsMap: Record<number, any>;
}

export default function BuildsList({ builds, itemsMap }: BuildsListProps) {


  return (
    <div className="pb-6">

      <div className="flex  flex-wrap gap-4 justify-between px-4 md:px-2 lg:px-0">
        {builds.map((build, index) => (
          <BuildCard key={index} build={build} itemsMap={itemsMap} />
        ))}

      </div>

    </div>
  );
}

export function BuildCard({ build, itemsMap }: { build: HeroBuild, itemsMap: any }) {

  const buildInfo = build.hero_build;

  if (!buildInfo || !buildInfo.details) return null;
  const buildId = build.hero_build?.hero_build_id;

  return (

    <Link href={`/builds/${buildId}?t=${build.hero_build?.last_updated_timestamp}/${encodeURIComponent(build.hero_build.name)}`} className=" bg-amber-50 grow relative  w-100 overflow-hidden  bg-[url('/lined_paperdark.png')] bg-absolute hover:scale-[1.05] hover:shadow-md shadow-blue-200 transition-all cursor-pointer">

      <div className="flex flex-row items-center bg-deadlock-dark ">
        <h3 className="flex-1 p-4 pl-6 relative block text-[1rem] text-gray-200 font-semibold whitespace-nowrap">
          {truncateText(buildInfo?.name, 20)}
        </h3>
        <span className="block flex-1 pl-12 text-[0.6rem] font-bold whitespace-nowrap">{calculateTime(buildInfo?.last_updated_timestamp)}</span>

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