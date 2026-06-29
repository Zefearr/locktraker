'use client';
import { HeroBuild } from "@/services/buildService";
import { calculateTime } from "./helpers";
import { useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/react';
import { useState } from "react";


export interface PropertyUpgrade {
  name: string;
  bonus: string | number;
}
export interface AbilityUpgrade {
  property_upgrades: PropertyUpgrade[];
}

export default function BuildSingle({ build, itemsMap }: { build: HeroBuild, itemsMap: any }) {

  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    name: string;
    description: string;
    annotation: string;
    cost?: number;
    upgrades: any;

  } | null>(null);

  const { refs, floatingStyles } = useFloating({
    open: activeItemId !== null,
    whileElementsMounted: autoUpdate,
    placement: 'top',
    middleware: [
      offset(12),
      flip(),
      shift({ padding: 2 }),
    ],
  });

  const buildInfo = build.hero_build;
  if (!buildInfo || !buildInfo.details) return null;

  return (
    <div className="my-4  bg-amber-50 overflow-hidden  bg-[url('/lined_paperdark.png')]  
                 bg-absolute">
      <div className=" p-4 relative  text-[1.7rem] bg-gray-700/95 text-gray-200 font-semibold ">
        <div className="flex flex-col md:flex-row md:items-center">
          <span className="px-4 text-amber-100">{buildInfo?.name}</span>
          <span className="p-4 text-[0.9rem] font-bold">{calculateTime(buildInfo.last_updated_timestamp)}</span>
        </div>
        <span className="px-4 relative block text-[1rem] [text-shadow:_-1px_1px_1px_#000000]">{buildInfo?.description}</span>
      </div>

      <div className="p-4 flex gap-4 flex-wrap ">
        {buildInfo.details.mod_categories?.map((category: any, index: number) => {

          const hasValidItems = category.mods?.some((mod: any) => {
            const itemData = itemsMap[mod.ability_id];
            return itemData && itemData.image;
          });

          if (!hasValidItems) return null;

          return (
            <div className="bg-[#6e6e6e] cursor-pointer relative" key={index}>
              {category && (
                <div className="flex flex-col md:flex-row md:items-center bg-gray-900  ">
                  <span className="text-[1.5rem]  text-gray-100 p-4 py-2 ">{category.name || "Generally good items"}</span>
                  {category.description && (
                    <span className="text-[1rem]  text-gray-100 p-4 py-2  ">{category.description}</span>
                  )}
                </div>

              )}
              <div className="flex p-4 flex-wrap">
                {category.mods?.map((mod: any, idx: number) => {
                  const itemData = itemsMap[mod.ability_id];
                  if (!itemData?.image) return null;

                  const isMeActive = activeItemId === mod.ability_id;
                  return (
                    <div key={idx} ref={isMeActive ? refs.setReference : null}
                      onMouseEnter={() => {
                        const currentModInfo = itemData.upgrades[0];
                        setActiveItemId(mod.ability_id);
                        setTooltipData({
                          name: itemData.itemName || "Unknown Item",
                          description: itemData.description || "No description available.",
                          annotation: mod.annotation || "",
                          cost: itemData.cost,
                          upgrades: currentModInfo?.property_upgrades || []
                        });
                      }}
                      onMouseLeave={() => {
                        setActiveItemId(null);
                        setTooltipData(null);
                      }}
                      className="relative  rounded-sm w-20 h-30 my-2 flex items-center flex-col cursor-pointer bg-yellow-50 mr-2">
                      <div className="w-20 h-20 relative " >
                        {itemData?.image && (
                          <img
                            className=""
                            src={itemData?.image}
                            alt="itemData?.itenName
                            w-20
                            h-20" />
                        )
                        }

                      </div>

                      {itemData?.itemName && (
                        <span className=" font-bold text-[0.5rem]  m-auto text-center text-green-900">{itemData.itemName} $</span>
                      )}

                    </div>

                  )
                })}

              </div>
            </div>
          )

        })}
      </div>


      {activeItemId !== null && tooltipData && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="w-100 bg-deadlock-city text-gray-200 text-xs p-4 rounded-sm shadow-2xl border
           border-zinc-800 z-50 pointer-events-none wrap-break-word flex flex-col gap-2.5 animate-in fade-in duration-100"
        >

          <div className="flex justify-between items-start border-b border-zinc-800 pb-2">
            <h4 className="font-bold text-amber-400 text-sm uppercase tracking-wide">
              {tooltipData.name}
            </h4>
            {tooltipData.cost && (
              <span className="text-emerald-400 font-bold bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-900/50">
                {tooltipData.cost} $
              </span>
            )}

          </div>

          <div className="text-zinc-400 text-[0.75rem] leading-relaxed">
            {tooltipData.description}
          </div>

          {tooltipData.upgrades.length > 0 && (
            <div className="border-t border-zinc-800 pt-2 flex flex-col gap-1">
              {tooltipData.upgrades.map((upgrade: any, idx: number) => (
                <div key={idx} className="text-[0.75rem] text-emerald-400">
                  ▲ {upgrade.name} <span className="text-zinc-300">{upgrade.bonus}</span>
                </div>
              ))}
            </div>
          )}

          {tooltipData.annotation && (
            <div className="mt-1 pt-2 border-t border-zinc-800/60 bg-amber-500/5 p-2 rounded border border-amber-500/10">

              <p className="text-zinc-300 italic leading-relaxed text-[0.9rem]">
                «{tooltipData.annotation}»
              </p>
            </div>
          )}
        </div>
      )}
    </div>

  )
}