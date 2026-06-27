'use client'

import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { CleanHero } from '@/services/heroService';

export default function HeroSelectFilter({ heroes, currentHeroId }: { heroes: CleanHero[], currentHeroId: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextId: string) => {
    startTransition(() => {
      if (nextId === "0") {
        router.push(pathname);
      } else {
        router.push(`${pathname}?heroId=${nextId}`);
      }
      router.refresh();
    });
  };

  return (
    <div className='flex flex-wrap items-center gap-2 mb-4'>
      <button
        disabled={isPending}
        onClick={() => handleChange("0")}
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
            onClick={() => handleChange(String(hero.id))}
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
    // remove this later!

    // <div className='flex items-center gap-x-5 mb-4'>
    //   {currentHero?.image ? (
    //     <img
    //       className='w-8 h-8 block'
    //       src={currentHero.image}
    //       alt={currentHero.name}
    //     />
    //   ) : (
    //     <span className='flex items-center w-8 h-8 border'><span className='m-auto text-[0.9rem] px-1'>All</span></span>
    //   )}

    //   <select className='py-1 px-2 border' value={currentHeroId} onChange={handleChange} disabled={isPending}>
    //     <option value="0">Глобальный топ (Все герои)</option>
    //     {heroes.map((hero) => (

    //       <option key={hero.id} value={hero.id}>
    //         {hero.name}
    //       </option>
    //     ))}
    //   </select>
    // </div>
  );
}