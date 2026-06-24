import Image from "next/image";
import { useState } from "react";
import { useFloating, autoUpdate, offset, flip, shift, FloatingPortal } from '@floating-ui/react';


export interface itemDesc {
  id: string;
  itemName: string;
  image: string;
  tier: string;
  description: string;
  cost: number;
  isActive: string;
  itemType: string;
  upgrades: AbilityUpgrade[];
}

export interface PropertyUpgrade {
  name: string;
  bonus: string | number;
}

export interface AbilityUpgrade {
  property_upgrades: PropertyUpgrade[];
}

export default function Item({ item }: { item: itemDesc }) {

  const wordCount = item.itemName.trim().split(/\s+/).length;
  const baseFontClass = 'text-center text-deadlock-dark m-auto py-2 px-1 block text-[0.8rem]'
  const smallFontClass = 'text-center text-deadlock-dark m-auto py-2 px-1 block text-[0.6rem]'
  const fontClass = wordCount >= 3 ? smallFontClass : baseFontClass;

  const [tooltipData, setTooltipData] = useState<{
    description: string;
    upgrades: any;
  } | null>(null);

  const { refs, floatingStyles } = useFloating({
    open: tooltipData !== null,
    whileElementsMounted: autoUpdate,
    placement: 'top',
    middleware: [
      offset(12),
      flip(),
      shift({ padding: 12 }),
    ],
  });

  return (
    <div
      ref={refs.setReference}
      onMouseEnter={() => {
        setTooltipData({
          description: item.description || "No description available.",
          upgrades: item?.upgrades || []
        });
      }}
      onMouseLeave={() => {
        setTooltipData(null);
      }}
      key={item.id} className="w-25   bg-amber-100 rounded-[0.4rem] border-amber-100 relative rounded-1xl  cursor-pointer">
      <Image alt={`${item.itemName} name`} src={item.image} width={100} height={100} className="opacity-80 cursor-pointer h-auto w-25  -z-10" />
      <div className="bottom-0 left-0 w-full min-h-15 flex items-center bg-amber-100 ">

        <span className={fontClass}>{item?.itemName} </span>


      </div>

      {tooltipData && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="w-72 bg-zinc-950/95 text-zinc-100 text-[0.8rem] p-4 rounded-md shadow-2xl
              z-50 pointer-events-none wrap-break-word flex flex-col gap-2.5
              animate-in fade-in
              animate-in       
             fade-in-0       
             zoom-in-95       
             duration-100"
          >
            <span className="text-zinc-300">{item.description}</span>
            {(tooltipData.upgrades || []).map((upgrade: any, uIdx: number) => (
              <div key={uIdx} className="text-zinc-400 font-bold">
                {upgrade.property_upgrades?.map((prop: any, pIdx: number) => (
                  <div key={pIdx} className="border-b border-blue-900/40 pb-1 last:border-0 flex justify-between">
                    <span>{prop.name}:</span>
                    <span className="text-green-400 font-bold">
                      {typeof prop.bonus === 'number' && prop.bonus > 0 ? `+${prop.bonus}` : prop.bonus}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </FloatingPortal>
      )}
    </div>

  )
}