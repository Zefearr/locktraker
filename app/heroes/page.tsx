import { fetchHeroes } from '@/services/heroService';
import HeroList from '@/components/HeroList';


export default async function HeroesPage() {
  const pulledHeroes = await fetchHeroes();

  if (!pulledHeroes) {
    return <div className="p-10 text-center">Failed to load heroes...</div>;
  }

  return (
    <main className="container mx-auto max-w-[1280px]">
      <HeroList heroes={pulledHeroes} />

    </main>
  );
}


