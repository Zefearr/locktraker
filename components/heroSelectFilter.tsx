'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { CleanHero } from '@/services/heroService';

export default function HeroSelectFilter({ heroes, currentHeroId }: { heroes: CleanHero[], currentHeroId: number }) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const handleChange = (heroId: number | null) => {

    const params = new URLSearchParams(searchParams.toString());

    if (heroId === null || heroId === 0) {
      params.delete('heroId');
    } else {
      params.set('heroId', heroId.toString());
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });

  };

  return (
    <div className='flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4 mt-8 md:mt-0'>
      <button
        disabled={isPending}
        onClick={() => handleChange(0)}
        className={`w-10 h-10 border flex items-center justify-center text-sm font-semibold transition-all cursor-pointer 
      ${currentHeroId === 0 ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-zinc-800 hover:border-zinc-700'}`}
      >
        All
      </button>

      {heroes.map((hero) => {
        const isActive = currentHeroId === hero.id;

        return (
          <button
            key={hero.id}
            disabled={isPending}
            onClick={() => handleChange(hero.id)}
            title={hero.name}
            className={`w-10 h-10 p-1 border transition-all flex items-center justify-center cursor-pointer 
          ${isActive ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-800 hover:border-zinc-700'}`}
          >
            {hero.image ? (
              <img
                className='w-full h-full object-contain block'
                src={hero.image}
                alt={hero.name}
              />
            ) : (
              <span className='text-xs text-zinc-500'>{hero.name.slice(0, 2)}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}