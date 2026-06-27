import Image from "next/image";
import { SingleHero } from "@/services/heroService";

import HeroAbilitiesCard from "./HeroAbilities";

import { getTierStyle } from "./helpers";


export const highlightText = (text: string, wordsToHighlight: string[]) => {
  if (!wordsToHighlight || wordsToHighlight.length === 0) return text;


  const pattern = wordsToHighlight
    .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  const parts = text.split(new RegExp(`(${pattern})`, 'gi'));


  const highlightSet = new Set(wordsToHighlight.map(w => w.toLowerCase()));

  return (
    <span>
      {parts.map((part, i) => {
        const lowerPart = part.toLowerCase();
        if (lowerPart.includes('spirit damage')) {
          return <b key={i} className="text-purple-400">{part}</b>;
        }
        if (lowerPart.includes('barrier')) {
          return <b key={i} className="text-blue-400">{part}</b>;
        }
        if (lowerPart.includes('heals')) {
          return <b key={i} className="text-emerald-400">{part}</b>;
        }
        if (lowerPart.includes('bullet damage')) {
          return <b key={i} className="text-orange-300">{part}</b>;
        }
        if (lowerPart.includes('weapon damage')) {
          return <b key={i} className="text-orange-400">{part}</b>;
        }
        return part;
      })}
    </span>
  );
};

export default function HeroSingle({ hero }: { hero: SingleHero }) {

  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.8)),url('/tweed.png')] p-6 pb-4 pt-6  border border-gray-800 shadow-emerald-800">

      <div className="flex flex-row gap-4">
        <div className="flex flex-1 flex-col w-40  overflow-hidden">
          <div className="relative h-80 overflow-hidden ">
            <Image
              loading="eager"
              src={hero?.image || ""}
              alt={hero?.name || ""}
              width={380}
              height={400}
              className="w-full"
            />
            {/* <span className="font-bold">{hero?.id}</span> */}

          </div>

          <h1 className=" text-[1.8rem] font-black text-amber-400  px-4 pt-5"> {hero?.name}</h1>
          <div className=" py-4 flex-1">



            <span className={getTierStyle(hero?.tier || 'A')}>{hero?.tier}</span>
            {hero.tags.map((tag, index) => {
              // rotation of tags based of index 1 2 3
              const rotations = ['-rotate-4', '-rotate-2', 'rotate-2'];
              const rotation = rotations[index % rotations.length];

              return (
                <span
                  key={tag}
                  className={`
                  ${rotation}
                bg-zinc-800/80 backdrop-blur-sm
                  border border-zinc-700
                  px-2 py-1.5 
                  mx-1.5 my-1
                  inline-block 
                  rounded-sm 
                  font-mono text-[0.5rem] uppercase tracking-wider text-deadlock-headings
                  shadow-md hover:rotate-0 transition-transform duration-200`}>

                  {tag}
                </span>
              );
            })}

          </div>
        </div>
        <div className="flex-4 items-center text-[1.2rem] text-gray-200 p-5 py-0 ">
          {hero?.playstyle &&
            <div>
              <p className="font-thin text-[1.2rem] italic text-gray-400 uppercase ">" {hero?.playstyle} "</p>

            </div>}


          {hero?.lore && (

            <div className="relative">

              <p className="text-black relative text-[1.2rem] z-10 p-4 font-thin"> {hero.lore}</p>
              <span className="bg-[url('/lined_paper.png')] border absolute inset-0 w-full z-1 h-full opacity-50
            
                mask-[url('/paper_masked6.png')]
                [mask-size:100%_100%]
                [mask-repeat:no-repeat]
                ">

              </span>
            </div>

          )}

          <div className="flex flex-col md:flex-row items-center ">
            <HeroAbilitiesCard abilities={hero.abilities} />
            <div className="flex gap-x-4 flex-1">

              <span className="flex flex-row  my-4 items-center gap-x-2"> <span className="text-[0.9rem]">Base Health: </span>
                <span className="px-2  inline-block min-w-10 bg-[#224D31] text-gray-100 text-sm">{hero.basehealth} </span>
              </span>
              <span className="flex flex-row  my-4 items-center gap-x-2"> <span className="text-[0.9rem]">Base Speed: </span>
                <span className="px-2  inline-block min-w-10 bg-[#224D31] text-gray-100 text-sm">{hero.basespeed} </span>
              </span>
              <span className="flex flex-row  my-4 items-center gap-x-2"> <span className="text-[0.9rem]">Stamina: </span>
                <span className="px-2  inline-block min-w-10 bg-[#224D31] text-gray-100 text-sm">{hero?.stamina} </span>
              </span>
            </div>
          </div>


        </div>

      </div>


    </div>
  )
}