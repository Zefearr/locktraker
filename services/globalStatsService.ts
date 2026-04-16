
export interface globStats {
  hiddenKingWins: number;
  archMotherWins: number;
  avg_kills: number;
  totalMatches: number;
  archMotherPercent: number;
  hiddenKingPercent: number;
}
function calculatePercent(wins: number, totalmatches: number) {
  if (totalmatches === 0) return 0
  return Number(((wins / totalmatches) * 100)).toFixed(1)

}

export async function fetchGlobalStats(): Promise<globStats[] | null> {
  try {
    const url = 'https://api.deadlock-api.com/v1/analytics/game-stats';
    const gStats = await fetch(url);
    if (!gStats.ok) {
      console.warn('GS api not responging');
      return null
    }
    const gStatsData = await gStats.json();

    const mergedStatData: globStats[] = gStatsData.map((item: any) => {
      return {
        hiddenKingWins: item?.team1_wins || 0,
        archMotherWins: item?.team0_wins || 0,
        avg_kills: item?.avg_kills || 0,
        totalMatches: (item?.team1_wins + item?.team0_wins) || 0,
        archMotherPercent: calculatePercent(item?.team0_wins, item?.total_matches),
        hiddenKingPercent: calculatePercent(item?.team1_wins, item?.total_matches)
      };
    })
    return mergedStatData;

  } catch (error) {
    console.error(error);
    return null;
  }

}