import HeroSelectFilter from "@/components/heroSelectFilter";
import { fetchHeroes } from "@/services/heroService";
import { flattenItems } from "@/services/itemService";
import { fetchAllItemsNested } from "@/services/itemService";
import { Suspense } from "react";
import LoadingSpinner from "../leaderboard/loading";
import BuildsContent from "@/components/BuildsContent";
import BuildFilters from "@/components/buildFilters";
import { Metadata } from "next";

export const metadata: Metadata = {

  title: 'Deadlock item builds',
  description: 'Here you can find builds for different characters',

  openGraph: {
    title: 'Deadlock Character Sheet',
    description: 'All Deadlock heroes in one place. Sort by winrate, tier, and kda.',
    url: 'https://statdl.eu/builds',
    siteName: 'Deadlock item builds',
    images: [
      {
        url: 'https://statdl.eu/buildsPreview.webp',
        width: 609,
        height: 446,
        alt: 'Deadlock Character Sheet',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Deadlock - heroes',
    description: 'Item builds for Deadlock',
    images: ['https://statdl.eu//buildsPreview.webp'],
  },
};
interface PageProps {

  searchParams: Promise<{ limit?: string; sort?: string; order?: string; heroId?: string }>;
}

export default async function Builds({ searchParams }: PageProps) {

  const resolvedSearchParams = await searchParams;
  const currentLimit = Number(resolvedSearchParams.limit) || 24;
  const currentSort = resolvedSearchParams.sort || 'recent';
  const currentOrder = resolvedSearchParams.order || 'desc';
  const currentHeroId = resolvedSearchParams.heroId ? Number(resolvedSearchParams.heroId) : null;

  // const buildsCacheKey = `${currentHeroId}-${currentSort}-${currentOrder}-${currentLimit}`;
  const suspenseKey = `${currentHeroId}-${currentSort}-${currentOrder}`;

  const [nestedItems, heroes] = await Promise.all([
    fetchAllItemsNested(),
    fetchHeroes()
  ]);

  if (!nestedItems || !heroes) return null;
  const itemsMap = flattenItems(nestedItems);

  return (
    <div className="pb-6 px-4 overflow-hidden ">


      <HeroSelectFilter heroes={heroes} currentHeroId={currentHeroId ?? 0} />

      <BuildFilters
        currentLimit={currentLimit}
        currentSort={currentSort}
        currentOrder={currentOrder}
      />
      <Suspense key={suspenseKey} fallback={
        <div className="w-full py-20 min-h-[80vh] flex justify-center items-center">
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

