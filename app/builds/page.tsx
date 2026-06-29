import BuildsList from "@/components/HeroBuilds";
import HeroSelectFilter from "@/components/heroSelectFilter";
import { getAllBuilds, getBuildsById } from "@/services/buildService";
import { fetchHeroes } from "@/services/heroService";
import { flattenItems } from "@/services/itemService";
import { fetchAllItemsNested } from "@/services/itemService";
import { Suspense } from "react";
import LoadingSpinner from "../leaderboard/loading";
import BuildsContent from "@/components/BuildsContent";

interface PageProps {

  searchParams: Promise<{ limit?: string; sort?: string; order?: string; heroId?: string }>;
}

export default async function Builds({ searchParams }: PageProps) {

  const resolvedSearchParams = await searchParams;
  const currentLimit = Number(resolvedSearchParams.limit) || 24;
  const currentSort = resolvedSearchParams.sort || 'recent';
  const currentOrder = resolvedSearchParams.order || 'desc';
  const currentHeroId = resolvedSearchParams.heroId ? Number(resolvedSearchParams.heroId) : null;

  const buildsCacheKey = `${currentHeroId}-${currentSort}-${currentOrder}-${currentLimit}`;

  const [nestedItems, heroes] = await Promise.all([
    fetchAllItemsNested(),
    fetchHeroes()
  ]);

  if (!nestedItems || !heroes) return null;
  const itemsMap = flattenItems(nestedItems);

  return (
    <div>

      <HeroSelectFilter heroes={heroes} currentHeroId={currentHeroId ?? 0} />

      <Suspense key={buildsCacheKey} fallback={
        <div className="w-full py-20 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      }>
        <BuildsContent
          currentHeroId={currentHeroId}
          currentLimit={currentLimit}
          currentSort={currentSort}
          currentOrder={currentOrder}
          itemsMap={itemsMap}
        />
      </Suspense>
    </div>
  );
}

