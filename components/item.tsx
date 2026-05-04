import Image from "next/image";


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

  return (
    <div key={item.id} className="w-25 p-1 group border bg-amber-100 rounded-[0.4rem] border-amber-100 relative rounded-1xl  cursor-pointer">
      <Image alt={`${item.itemName} name`} src={item.image} width={50} height={50} className="opacity-80 cursor-pointer h-auto w-25  -z-10" />
      <div className="bottom-0 left-0 w-full min-h-15 flex items-center bg-amber-700 ">

        <span className={fontClass}>{item?.itemName} </span>
        <div className="overflow-hidden opacity-0 w-70 h-60 origin-bottom text-[0.9rem] scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 bg-amber-100 z-10 absolute left-0  p-4 rounded-2xl ">
          <span className=" text-deadlock-dark">{item?.description}</span>
          {(item?.upgrades || []).map((upgrade: any, uIdx: number) => (
            <div key={uIdx} className="text-deadlock-dark font-bold">
              {upgrade.property_upgrades?.map((prop: any, pIdx: number) => (
                <div key={pIdx} className="border-b border-blue-900 pb-1 last:border-0">
                  <span className="">{prop.name}:</span>
                  <span className="text-green-400 font-bold">
                    {typeof prop.bonus === 'number' && prop.bonus > 0 ? `+${prop.bonus}` : prop.bonus}
                  </span>
                </div>
              ))}
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}