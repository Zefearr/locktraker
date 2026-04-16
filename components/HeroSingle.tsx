import Image from "next/image";
import { SingleHero } from "@/services/heroService";
import { Tier } from "@/services/heroService";
import HeroAbilitiesCard from "./HeroAbilities";




export default function HeroSingle({ hero }: { hero: SingleHero }) {


  const getTierStyle = (tier: string | undefined) => {
    switch (tier) {
      case 'S+': return 'py-2  inline-block mx-2 my-2 text-center w-15 rounded-[10] text-[2.6rem]    text-green-500 font-black drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]';
      case 'S': return 'py-2 inline-block mx-2 my-2 text-center w-15 rounded-[10] text-[2.6rem]     text-green-500 font-black';
      case 'A': return 'py-2 inline-block mx-2 my-2 text-center w-15 rounded-[10] text-[2.6rem]    text-orange-400 font-bold';
      case 'B': return 'py-2 inline-block mx-2 my-2 text-center w-15 rounded-[10] text-[2.6rem]     text-amber-200';
      case 'C': return 'py-2 inline-block mx-2 my-2 text-center w-15 rounded-[10] text-[2.6rem]     text-zinc-400';
      case 'D': return 'py-2 inline-block mx-2 my-2 text-center w-15 rounded-[10] text-[2.6rem]     text-zinc-600';
      default: return 'text-zinc-500';
    }
  };

  return (
    <div className="p-4 max-w-800 rounded-2xl ">

      <div className="flex flex-row overflow-hidden">
        <div className="flex flex-1 flex-col w-40  overflow-hidden">
          <div className="relative h-70 overflow-hidden">
            <Image
              loading="eager"
              src={hero?.image || ""}
              alt={hero?.name || ""}
              width={380}
              height={400}
              className="w-full absolute left-0 top-0 -z-10"
            />
            <h1 className="text-2xl font-black text-amber-400 absolute bottom-0 px-4 py-2 bg-deadlock-dark"> {hero?.name}</h1>

          </div>
          <div className=" py-4">

            <span className={getTierStyle(hero?.tier || 'A')}>{hero?.tier}</span>



            {hero.tags.map((tag, index) => {
              // Чередуем наклон: первый влево, второй вправо, третий ровно
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
        <div className="flex-6 text-[1.2rem] text-gray-400 p-5 py-0">

          {hero?.playstyle &&
            <div>
              <p className="font-thin text-[1.1rem]  font-">{hero?.playstyle}</p>
              <br />
            </div>}
          <p>{hero?.lore}</p>

        </div>

      </div>


      {/* {hero.abilities.map((ability: any, index: number) => {
          return (

            <div className="flex flex-col border-2 border-blue-950 gap-6 bg-slate-900 rounded-2xl w-80 overflow-hidden" key={index}>
            

              <div className="flex bg-blue-900 p-2">
                {ability.image && (
                  <img
                    src={ability.image}
                    alt={ability.name}
                    className="w-16 h-16 rounded-md object-cover border"
                  />
                )}

                <div className="m-auto font-bold uppercase tracking-wider"> {ability.name} </div>
              </div>

              <div className="flex flex-col flex-1 ">

                <div className="flex flex-col-reverse h-full justify-around gap-5 p-4 text-[0.7rem]">

                  {(ability.upgrades || []).map((upgrade: any, uIdx: number) => (
                    <div key={uIdx} className="flex-1 bg-blue-950 p-2 rounded relative border border-blue-900/50">
                   
                      <div className="absolute -top-2 left-2 bg-amber-600 text-[10px] px-1 rounded">
                        T{uIdx + 1}
                      </div>

                      <div className="flex flex-col gap-2 space-y-reverse mt-1">
                    
                        {upgrade.property_upgrades?.map((prop: any, pIdx: number) => (
                          <div key={pIdx} className="flex flex-col justify-between border-b border-blue-900 pb-1 last:border-0">
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
                </div>

                <div className="p-4 bg-blue-950 rounded shadow-inner">
                  <p className="">
                    {ability.description?.replace(/<[^>]*>/g, '')}
                  </p>
                </div>
              </div>
            </div>
          )
        })} */}
      <HeroAbilitiesCard abilities={hero.abilities} />


    </div>
  )
}