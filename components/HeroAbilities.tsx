'use client';
import { highlightText } from "./HeroSingle";
import { useState } from "react";


export default function AbilityList({ abilities }: { abilities: any[] }) {
  if (!abilities || abilities.length === 0) return null;
  return (
    <div className="flex-1 px-4">
      <div className="flex flex-row gap-2">
        {abilities.map((ability, index) => {
          if (ability.name === "Melee") return null;
          return (
            <AbilityCard key={index} ability={ability} />
          )
        })}
      </div>
    </div>
  );
}
function AbilityCard({ ability }: { ability: any }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  return (

    <div className="group relative">
      <button
        className="w-15 h-15 md:w-20 md:h-20 overflow-hidden cursor-pointer relative border border-gray-700 hover:bg-gray-600 transition-colors rounded-[50%]"
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCoords({
            x: rect.left,
            y: rect.top,
          });
          setShowTooltip(true);
        }}
        onMouseLeave={() => setShowTooltip(false)}>
        {ability.image && (
          <img
            src={ability.image}
            alt={ability.name}
            className=""
          />
        )}

      </button>


      <div>

      </div>

      {showTooltip && (
        <div className="w-[400px] pointer-events-none flex flex-col  z-10 bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.8)),url('/tweed.png')] border border-gray-800"
          style={{
            position: 'fixed',
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            // left: 0,
            // top: 0,
            // transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`
          }}
        >
          <div className="flex-4 p-4 mb-2 z-1 ">

            <span className="font-bold block text-[1.4rem] mb-4 text-amber-100">{ability.name}</span>

            <div className="flex min-h-[80] ">
              {ability.cooldown > 0 && (
                <span className=" bg-gray-700 shadow-inner absolute text-[0.7rem] right-4 top-4 shadow-gray-800 flex items-center justify-center  w-12 h-12">⏲ {ability?.cooldown}s</span>
              )}
              <div className=" text-amber-50 text-[0.8rem]  flex justify-end gap-4">

                {ability.abilityCharges && (
                  <span className="bg-gray-700 shadow-inner  shadow-gray-800 flex items-center justify-center  w-13 h-13">
                    <span className="">🗲</span>
                    <span>{ability?.abilityCharges}</span>
                  </span>
                )}
                {ability.abilityRange && (
                  <span className="bg-gray-700 shadow-inner  shadow-gray-800 flex items-center justify-center  w-13 h-13 "> {ability?.abilityRange}</span>
                )}
                {ability.abilityDamage && (

                  <div className="bg-gray-700 shadow-inner relative  shadow-gray-800 flex flex-col w-16 h-16  items-center justify-center text-[0.8rem]">
                    <span> {ability.abilityDamage}</span>
                    <span>Damage</span>

                  </div>
                )}
              </div>
            </div>
            <div className="text-[0.9rem] h-40 font-medium bg-gray-800 mt-6 mb-10 shadow-gray-900 shadow-inner opacity-90 ">
              {ability.description && (
                <p className="p-4 italic">
                  {highlightText(ability.description, ['heals', 'spirit damage', 'bullet damage', 'weapon damage', 'barrier'])}
                </p>
              )}
            </div>
            <div className="flex flex-row h-46 gap-2 text-[0.8rem] justify-between">
              {ability.upgradeOneDescription && (
                <div className="w-[33%] bg-purple-800 ">
                  <span className="text-[1rem] pl-4 py-1 bg-deadlock-city block text-deadlock-headings">🗲1</span>
                  <div className="p-2">
                    <span className="">{ability?.upgradeOneDescription}</span>
                  </div>
                </div>
              )}
              {ability.upgradeTwoDescription && (
                <div className="w-[33%] bg-purple-800">
                  <span className="text-[1rem] pl-4 py-1  block bg-deadlock-city  text-deadlock-headings">🗲3</span>
                  <div className="p-2">
                    <span> {ability?.upgradeTwoDescription}</span>

                  </div>
                </div>
              )}
              {ability.upgradeThreeDescription && (
                <div className="w-[33%] bg-purple-800 overflow-hidden">
                  <span className="text-[1rem] block pl-4 py-1 bg-deadlock-city text-deadlock-headings">🗲5</span>
                  <div className="p-2">
                    <span className=""> {ability?.upgradeThreeDescription}</span>

                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      )}


    </div>
  );
}