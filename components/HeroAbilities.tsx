'use client';
import { useState } from "react";
import { StarIcon } from "./ui/icons";
import { highlightText } from "./HeroSingle";
export default function AbilityList({ abilities }: { abilities: any[] }) {



  return (
    <div className="flex flex-wrap gap-2 mb-10 ">
      {abilities.map((ability, index) => (
        <AbilityCard key={index} ability={ability} />
      ))}
    </div>
  );
}
function AbilityCard({ ability }: { ability: any }) {

  return (

    <div className="w-25 h-25 mt-10 group relative">


      <div className="absolute left-0 top-0 w-full h-full border-2 border-[#0F0F16] rounded-[50%]"></div>
      <button
        className="w-25 h-25 overflow-hidden cursor-pointer relative border border-gray-700 hover:bg-gray-600 transition-colors rounded-[50%]"
      >
        {ability.image && (
          <img
            src={ability.image}
            alt={ability.name}
            className="w-25 h-25 object-cover"
          />
        )}
        {/* <span className="absolute bottom-0 left-0 w-full py-2 opacity-95 bg-deadlock-dark  text-deadlock-headings uppercase tracking-wider text-[0.4rem]">
          {ability.name}

        </span> */}
      </button>

      <div className="w-120 flex flex-col absolute scale-0 h-auto opacity-0 origin-top-left group-hover:opacity-100 
              transition-opacity group-hover:scale-100 z-10 bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.8)),url('/tweed.png')] border border-gray-800">
        {/* <span className="absolute inset-0 w-full h-full bg-[url('/tweed.png')] z-0 opacity-100"></span> */}


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



        {/* <div className="flex flex-1 flex-row justify-between gap-4">
          {(ability.upgrades || []).map((upgrade: any, uIdx: number) => (
            <div key={uIdx} className="border w-[33%] overflow-hidden min-h-70" >
              <div className=" bg-[#0d0d11] text-lg">
                <div className="flex items-center justify-center">
                  <span className="text-[0.9rem] -translate-x-1  block rounded-md -rotate-z-90  text-deadlock-headings">🗲</span>
                  <span className="inline">{uIdx + 1}</span>
                </div>

              </div>
              <div className="flex flex-col items-center overflow-hidden justify-center bg-purple-950 h-full">

                {upgrade.property_upgrades?.map((prop: any, pIdx: number) => (
                  <div key={pIdx} className="last:border-0 text-[0.6rem] py-1 items-center">


                    <span className="text-green-400 font-bold px-2">
                      {typeof prop.bonus === 'number' && prop.bonus > 0 ? `+${prop.bonus}` : prop.bonus}
                    </span>
                    <span className="opacity-70 font-bold text-[0.6rem] text-amber-100">{prop.name}</span>

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