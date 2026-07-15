import { fetchLeaderBoard, fetchGlobalLeaderBoard } from "@/services/playerService";
import PlayerList from "@/components/PlayerList";

interface LoaderProps {
  currentHeroId: number | null;
  heroes: any[];
}

export default async function LeaderboardLoader({ currentHeroId, heroes }: LoaderProps) {

  const playersScores = currentHeroId
    ? await fetchLeaderBoard(100, currentHeroId)
    : await fetchGlobalLeaderBoard();

  if (!playersScores) {
    return <div>looks like api down</div>;
  }

  return (
    <>
      <PlayerList players={playersScores} heroes={heroes} />
    </>

  )
}