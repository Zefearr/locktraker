import { fetchLeaderBoard } from "@/services/playerService";
import { PlayerScores } from "@/services/playerService";
import { fetchHeroes } from "@/services/heroService";
import HeroSelectFilter from "@/components/heroSelectFilter";
import { fetchGlobalLeaderBoard } from "@/services/playerService";
import { Suspense } from "react";
import LoadingSpinner from "./loading";
import LeaderboardLoader from "@/components/LeaderboardLoader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Deadlock Leaderboard in Europe region',
  description: 'A list of top deadlock players from europe',

  openGraph: {
    title: 'Deadlock Europe Leaderboard',
    description: 'The table of the best European deadlock players',
    url: 'https://statdl.eu/leaderboard',
    siteName: 'Deadlock Europe Leaderboard',
    images: [
      {
        url: 'https://statdl.eu/playerTable.png',
        width: 1200,
        height: 630,
        alt: 'Deadlock Europe Leaderboard',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Deadlock Europe Leaderboard',
    description: 'A complete table of Deadlock european players. ',
    images: ['https://statdl.eu/playerTable.png'],
  },
};

interface LeaderBoardHeroProps {
  searchParams: Promise<{ heroId?: string }>;
}

async function leaderboardPage({ searchParams }: LeaderBoardHeroProps) {


  const resolvedSearchParams = await searchParams;
  const heroes = await fetchHeroes();

  if (!heroes || heroes.length === 0) {
    return <div>nothing found</div>
  }

  const currentHeroId = resolvedSearchParams.heroId ? Number(resolvedSearchParams.heroId) : null;

  return (
    <div>
      <HeroSelectFilter heroes={heroes} currentHeroId={currentHeroId ?? 0} />
      <h1 className="text-[1.5rem] text-gray-200 font-thin p-4">Europe Leaderboard</h1>

      <Suspense key={currentHeroId ?? 'global'} fallback={<LoadingSpinner />}>
        <LeaderboardLoader currentHeroId={currentHeroId} heroes={heroes} />
      </Suspense>
    </div>
  )
}
export default leaderboardPage;