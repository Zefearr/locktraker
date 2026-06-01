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
export type GroupedItems = Record<string, itemDesc[]>;


export type NestedGroupedItems = Record<string, Record<string, itemDesc[]>>;

function processNestedData(rawData: any[]): Record<string, itemDesc[]> {

  return rawData.reduce((acc: Record<string, itemDesc[]>, item: any) => {

    let rawImage = item.shop_image_webp || item.image || ''
    if (rawImage.includes('panorama')) {
      rawImage = '/no-image.svg';
    }
    if (
      item.type === 'upgrade' &&
      item.item_slot_type &&
      item.cost > 0 &&
      item.item_tier !== 5 &&
      !item.name.includes('item_projectile') &&
      !item.name.includes('Toughness') &&
      !item.name.includes('Bullet Armor') &&
      !item.name.includes('Spirit Armor') &&
      item.shop_image_webp
    ) {

      const tier = item.item_tier || "1";
      if (!acc[tier]) acc[tier] = [];

      acc[tier].push({
        id: item.id || '',
        itemName: item.name || '',
        image: rawImage,
        tier: item.item_tier || '',
        description: item.description?.desc?.replace(/<[^>]*>/g, '') ?? '',
        cost: item.cost,
        isActive: item.is_active_item,
        itemType: item.item_slot_type,
        upgrades: (item.upgrades || []).map((upg: any) => ({
          property_upgrades: upg.property_upgrades || []
        }))
      });
    }
    return acc;
  }, {});
}


export async function fetchAllItemsNested(): Promise<NestedGroupedItems | null> {

  const slots = ['weapon', 'vitality', 'spirit'];

  try {
    const responses = await Promise.all(
      slots.map(slot => fetch(`https://assets.deadlock-api.com/v2/items/by-slot-type/${slot}`))
    );
    const results = await Promise.all(responses.map(res => res.json()));
    const seenItemIds = new Set<string>();


    return slots.reduce((acc, slot, index) => {
      acc[slot] = processNestedData(results[index]);


      Object.values(acc[slot]).forEach(tierArray => {



        const uniqueItems = tierArray.filter(item => {
          // Замени .id на .ability_id или .class_name, если уникальный ключ в API называется иначе
          const itemId = item.itemName;

          if (seenItemIds.has(itemId)) {
            return false; // Дубликат, выкидываем
          }

          seenItemIds.add(itemId); // Новый предмет, запоминаем его
          return true;
        });

        tierArray.length = 0;
        tierArray.push(...uniqueItems);
        console.log(uniqueItems)
        tierArray.sort((a, b) => a.cost - b.cost);

      });
      return acc;
    }, {} as NestedGroupedItems);
  } catch { return null; }
}
export function flattenItems(nestedItems: NestedGroupedItems) {
  const flatMap: Record<number, any> = {};

  Object.values(nestedItems).forEach(slotType => {
    Object.values(slotType).forEach((tierArray: any) => {
      tierArray.forEach((item: any) => {
        flatMap[item.id] = item;
      });
    });
  });

  return flatMap;
}
