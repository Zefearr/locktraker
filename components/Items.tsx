'use client';
import { itemDesc } from "@/services/itemService";
import Item from "./item";

interface ItemsListProps {
  tiers: Record<string, itemDesc[]>;
}
function calculateTierPrice(tier: string) {
  switch (tier) {
    case '1': return '800$';
    case '2': return '1600$';
    case '3': return '3200$';
    case '4': return '6400'
  }
}

export default function ItemsList({ tiers }: ItemsListProps) {
  return (
    <div className="flex flex-col gap-8 ">
      {Object.entries(tiers)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([tier, itemsArray]) => (
          <div key={tier} className="">
            <h3 className="text-xl font-bold mb-4">TIER {tier} {calculateTierPrice(tier)}</h3>
            <div className="flex flex-wrap gap-4">
              {itemsArray.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}



