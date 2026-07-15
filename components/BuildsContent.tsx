import BuildsList from "@/components/HeroBuilds";
import { getBuildsById } from "@/services/buildService";
import LoadMoreButton from "./LoadMoreButton";

export default async function BuildsContent({
  currentHeroId, currentLimit, currentSort, currentOrder, itemsMap
}: {
  currentHeroId: number | null, currentLimit: number, currentSort: string, currentOrder: string, itemsMap: any
}) {
  const buildsData = await getBuildsById(currentHeroId, currentLimit, currentSort, currentOrder);
  const builds = buildsData || [];

  return (
    <>
      <BuildsList
        builds={builds || []}
        itemsMap={itemsMap}
      />
      <LoadMoreButton
        currentLimit={currentLimit}
        hasMore={builds.length === currentLimit}
      />
    </>
  );
}


