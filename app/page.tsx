import GlobalStatsList from "@/components/GlobalStats";
import { fetchGlobalStats } from "@/services/globalStatsService";
import { fetchHeroes } from '@/services/heroService';
import HeroList from '@/components/HeroList';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Deadlock Characters - All Heroes, Stats, and Tier Lists',
  description: 'A complete table of Deadlock characters. Base stats, health, damage, slots, and character stats..',

  openGraph: {
    title: 'Deadlock Character Sheet',
    description: 'All Deadlock heroes in one place. Sort by winrate, tier, and kda.',
    url: 'https://statdl.eu/',
    siteName: 'Deadlock statistics',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'Deadlock Character Sheet',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Deadlock - heroes',
    description: 'A complete table of Deadlock characters. Base stats, health, damage, slots, and character stats..',
    images: ['https://statdl.eu/heroes-table.png'],
  },
};
export default async function Home() {
  // const statsData = await fetchGlobalStats();
  const pulledHeroes = await fetchHeroes();
  if (!pulledHeroes) {
    return <div className="p-10 text-center">Failed to load heroes...</div>;
  }
  return (

    <div className="max-w-[1280px] m-auto">
      <main className="container mx-auto">
        <HeroList heroes={pulledHeroes} />
      </main>
    </div>
  );
}
