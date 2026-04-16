import GlobalStatsList from "@/components/GlobalStats";
import { fetchGlobalStats } from "@/services/globalStatsService";
import { fetchHeroes } from '@/services/heroService';
import HeroList from '@/components/HeroList';

export default async function Home() {
  const statsData = await fetchGlobalStats();
  const pulledHeroes = await fetchHeroes();
  if (!pulledHeroes) {
    return <div className="p-10 text-center">Failed to load heroes...</div>;
  }
  return (

    <div>
      <main className="container mx-auto">
        <GlobalStatsList initialStats={statsData} />
        <HeroList heroes={pulledHeroes} />

      </main>

    </div>
  );
}
