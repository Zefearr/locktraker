import BuildsList from "@/components/HeroBuilds";
import { getBuildsById } from "@/services/buildService";


export default async function BuildsContent({
  currentHeroId, currentLimit, currentSort, currentOrder, itemsMap
}: {
  currentHeroId: number | null, currentLimit: number, currentSort: string, currentOrder: string, itemsMap: any
}) {
  const buildsData = await getBuildsById(currentHeroId, currentLimit, currentSort, currentOrder);

  return (
    <BuildsList
      builds={buildsData || []}
      itemsMap={itemsMap}
      currentLimit={currentLimit}
      currentSort={currentSort}
      currentOrder={currentOrder}
      currentHeroId={currentHeroId ?? undefined}
    />
  );
}


