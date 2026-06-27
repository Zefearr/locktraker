import { fetchLeaderBoard } from "@/services/playerService";
import { PlayerScores } from "@/services/playerService";
import { fetchHeroes } from "@/services/heroService";
import HeroSelectFilter from "@/components/heroSelectFilter";
import { fetchGlobalLeaderBoard } from "@/services/playerService";
import { Suspense } from "react";
import LoadingSpinner from "./loading";
import LeaderboardLoader from "@/components/LeaderboardLoader";


interface LeaderBoardHeroProps {
  searchParams: Promise<{ heroId?: string }>;
}

async function leaderboardPage({ searchParams }: LeaderBoardHeroProps) {

  // const { heroId } = await searchParams
  const resolvedSearchParams = await searchParams;
  const heroes = await fetchHeroes();

  if (!heroes || heroes.length === 0) {
    return <div>nothing found</div>
  }


  const currentHeroId = resolvedSearchParams.heroId ? Number(resolvedSearchParams.heroId) : null;

  return (
    <div>
      <HeroSelectFilter heroes={heroes} currentHeroId={currentHeroId ?? 0} />

      <Suspense key={currentHeroId ?? 'global'} fallback={<LoadingSpinner />}>
        <LeaderboardLoader currentHeroId={currentHeroId} heroes={heroes} />
      </Suspense>
    </div>
  )
}
export default leaderboardPage;