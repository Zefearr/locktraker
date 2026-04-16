'use client';
import { useState } from "react";

export default function AbilityList({ abilities }: { abilities: any[] }) {


  return (
    <div className="flex flex-wrap gap-6  min-h-[50vh]  overflow-hidden">
      {abilities.map((ability, index) => (
        <AbilityCard key={index} ability={ability} />
      ))}
    </div>
  );
}
function AbilityCard({ ability }: { ability: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (

    <div className="w-30 h-30">

      <button
        className="w-30 h-30 overflow-hidden cursor-pointer relative border border-gray-700 hover:bg-gray-600 transition-colors rounded-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {ability.image && (
          <img
            src={ability.image}
            alt={ability.name}
            className="w-30 h-30  object-cove m-auto"
          />
        )}
        <span className="absolute bottom-0 left-0 w-full py-2 opacity-90 bg-deadlock-dark  text-deadlock-headings uppercase tracking-wider text-[0.5rem]">
          {ability.name}

        </span>
      </button>

      <div className={`${isExpanded ? 'opacity-100' : 'opacity-0'}`}>


        <div className="p-2 mb-4 rounded shadow-inner">
          <p className="text-sm opacity-90">
            {ability.description?.replace(/<[^>]*>/g, '')}
          </p>
        </div>

        {/* <div className=" text-[0.7rem]">
          {(ability.upgrades || []).map((upgrade: any, uIdx: number) => (
            <div key={uIdx} className="flex-1 bg-blue-950 p-2 rounded relative border border-blue-900/50">
              <div className="absolute -top-2 left-2 bg-amber-600 text-[10px] px-1 rounded">
                T{uIdx + 1}
              </div>
              <div className="mt-1">
                {upgrade.property_upgrades?.map((prop: any, pIdx: number) => (
                  <div key={pIdx} className="border-b border-blue-900 pb-1 last:border-0">
                    <span className="opacity-70">{prop.name}:</span>
                    <span className="text-green-400 font-bold">
                      {typeof prop.bonus === 'number' && prop.bonus > 0 ? `+${prop.bonus}` : prop.bonus}
                    </span>
                  </div>
                ))}
                {upgrade.description && (
                  <p className="mt-1 italic opacity-80 border-t border-blue-900 pt-1">
                    {upgrade.description.replace(/<[^>]*>/g, '')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div> */}





      </div>
    </div>
  );
}