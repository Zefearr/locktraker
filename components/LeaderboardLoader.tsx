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
    return <div>Не удалось загрузить лидерборд</div>;
  }

  return (
    <div>
      <PlayerList players={playersScores} heroes={heroes} />
    </div>

  )
}