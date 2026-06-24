'use client'
import { tierWeights } from "@/services/heroService";
import Link from "next/link";
import Image from "next/image";
import { CleanHero } from '@/services/heroService';
import { useState, useMemo } from "react";
import { ArrowIcon } from "@/components/ui/icons";
import { Tier } from "@/services/heroService";
import { Funnel_Sans } from "next/font/google";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Персонажи Deadlock — Все герои, характеристики и тир-листы',
  description: 'Полная таблица персонажей игры Deadlock. Актуальные базовые параметры, здоровье, урон, слоты и скрытые характеристики героев.',

  // Open Graph (для отображения в соцсетях, Discord, Telegram)
  openGraph: {
    title: 'Таблица персонажей Deadlock | База данных',
    description: 'Все герои Deadlock в одном месте. Сортировка по характеристикам, стоимости билдов и типам урона.',
    url: 'https://deadlock-tracker.ru/heroes', // замени на свой домен
    siteName: 'Deadlock Tracker',
    images: [
      {
        url: 'https://deadlock-tracker.ru/og/heroes-table.png', // превью-картинка для ссылки
        width: 1200,
        height: 630,
        alt: 'Таблица героев Deadlock',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },

  // Настройки для Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: 'Персонажи Deadlock — Все герои',
    description: 'Полная таблица персонажей игры Deadlock с актуальными характеристиками.',
    images: ['https://deadlock-tracker.ru/og/heroes-table.png'],
  },
};

export const saira = Funnel_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-saira'
})

const getTierStyle = (tier: Tier) => {
  switch (tier) {
    case 'S+': return 'text-green-500 font-black drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]';
    case 'S': return 'text-green-500 font-black';
    case 'A': return 'text-orange-400 font-bold';
    case 'B': return 'text-amber-200';
    case 'C': return 'text-zinc-400';
    case 'D': return 'text-zinc-600';
    default: return 'text-zinc-500';
  }
};


export default function HeroList({ heroes }: { heroes: CleanHero[] }) {
  const [sortKey, setSortKey] = useState<keyof CleanHero>('winrate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedClass, setSelectedClass] = useState('All');


  const sortedHeroes = useMemo(() => {
    const filtered = heroes.filter(hero =>
      selectedClass === 'All' ? true : hero.class === selectedClass
    );
    return [...filtered].sort((a, b) => {
      let aValue = a[sortKey] ?? '';
      let bValue = b[sortKey] ?? '';

      if (sortKey === 'tier') {
        aValue = tierWeights[a.tier] ?? 0;
        bValue = tierWeights[b.tier] ?? 0;
      }
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [heroes, sortKey, sortOrder, selectedClass]);

  const getSortStyles = (key: keyof CleanHero) => {
    const base = `w-full h-full flex cursor-pointer `;
    const activeStyle = `w-full h-full flex cursor-pointer group  bg-zinc-900  rounded-lg`;
    const inactiveStyle = `hover:bg-zinc-900 rounded-lg w-full h-full flex cursor-pointer group`;
    return sortKey === key ? `${base} ${activeStyle}` : `${base} ${inactiveStyle}`;
  };

  const getIconStyles = (key: keyof CleanHero) => {
    const isSelected = sortKey === key;
    return `ml-2 transition-transform duration-300 ${isSelected && sortOrder === 'desc' ? 'rotate-180' : 'rotate-0'
      } ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`;
  };

  const handleSort = (key: keyof CleanHero) => {

    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.8)),url('/tweed.png')] px-6 py-6 shadow-lg shadow-gray-900">
      <h1 className={`${saira.className} text-[2.2rem] pl-8 py-4 font-bold`} >Tier List</h1>
      <table className="size-full w-full border-separate border-spacing-y-3 table-fixed pl-6">
        <thead className="">
          <tr className=" text-left text-xl">
            <th scope="col" className="" >
              <button
                type="button"
                onClick={() => handleSort('name')}
                className={`transition-all duration-200 ${getSortStyles('name')}`}>
                <span className="px-4 py-4 rounded-2xl flex items-center">Hero</span>
              </button>
            </th>
            <th className="hidden md:block" scope="col">
              <form className="" onSubmit={(e) => e.preventDefault()}>
                <div className="w-full relative flex">
                  <select id="class-filter"
                    value={selectedClass}
                    className="cursor-pointer appearance-none p-3 px-5 rounded-md border-zinc-800  focus:outline-none focus:bg-deadlock-dark"
                    onChange={(e) => setSelectedClass(e.target.value)}>
                    <option value="All">All Classes</option>
                    <option value="assassin">Assasin</option>
                    <option value="brawler">Brawler</option>
                    <option value="marksman">Marksman</option>
                    <option value="mystic">Mystic</option>
                  </select>
                  <div className="pointer-events-none items-center text-zinc-500">
                    <ArrowIcon
                      className={`w-4 h-4 mt-4 transition-transform duration-300 
                        ${sortOrder === 'desc' && sortKey === 'class' ? 'rotate-180' : 'rotate-0'}`
                      }
                    />
                  </div>

                </div>
              </form>
            </th>
            <th scope="col">
              <button
                type="button"
                onClick={() => handleSort('winrate')}
                className={`transition-all duration-200 ${getSortStyles('winrate')}`}>
                <span className="py-4 px-4">WinRate</span>
                <ArrowIcon
                  className={`w-4 h-4 mt-4 transition-transform duration-300 
                  ${sortOrder === 'desc' && sortKey === 'winrate' ? 'rotate-180' : 'rotate-0'}`}
                />
              </button>
            </th>
            <th scope="col">

              <button
                type="button"
                onClick={() => handleSort('tier')}
                className={`transition-all duration-200 ${getSortStyles('tier')}`}>
                <span className="py-4 px-4"> Tier</span>
                <ArrowIcon
                  className={`w-4 h-4 mt-4 transition-transform duration-300 
                  ${sortOrder === 'desc' && sortKey === 'tier' ? 'rotate-180' : 'rotate-0'}`
                  }
                />

              </button>
            </th>
            <th scope="col">
              <button
                type="button"
                onClick={() => handleSort('kda')}
                className={`transition-all duration-200 ${getSortStyles('kda')}`}>
                <span className="p-4">KDAA</span>
                <ArrowIcon
                  className={`w-4 h-4 mt-4 transition-transform duration-300 
                  ${sortOrder === 'desc' && sortKey === 'kda' ? 'rotate-180' : 'rotate-0'}`
                  }
                />
              </button>
            </th>
          </tr>
        </thead>

        <tbody className="text-lg">
          {sortedHeroes?.map((hero: any) => (
            <tr key={hero.id} className="group odd:none relative">
              <th className="rouned-xs font-thin">
                <Link href={`/heroes/${hero.name}`} className="flex absolute inset-0 items-center hover:opacity-50  text-amber-200
                  before:content-[''] before:absolute before:-left-10 before:translate-y-[50%] before:top-0 before:w-2 before:h-7 before:opacity-0 
                 before:bg-amber-500 before:scale-x-100 before:transition-transform before:duration-300
                  hover:before:scale-x-100 hover:before:translate-x-5 hover:before:opacity-100" >
                  <img src={hero.image} className="w-10 h-10" alt={hero.name} />
                  <span className="px-4">{hero.name}</span>
                </Link>

              </th>
              <td className="p-4">
                {hero.class}
              </td>
              <td className="p-4">
                {hero.winrate}%
              </td>
              <td className="p-4">
                <span className={getTierStyle(hero.tier)}>{hero.tier}</span>
              </td>
              <td className="p-4">
                <span>{hero.kda}</span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div >
  );
}
