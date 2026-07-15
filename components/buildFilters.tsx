'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { DeadlockArrowIcon } from "./ui/icons";

interface filterProps {
  currentLimit: number;
  currentSort?: string;
  currentOrder?: string;
}

export default function BuildFilters({ currentSort, currentLimit, currentOrder }: filterProps) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortClick = (sortType: string) => {

    const params = new URLSearchParams(searchParams.toString());

    let nextOrder = 'desc';

    if (currentSort === sortType) {
      nextOrder = currentOrder === 'desc' ? 'asc' : 'desc';
    } else {
      nextOrder = 'desc';
    }

    params.set('limit', currentLimit.toString());
    params.set('sort', sortType);
    params.set('order', nextOrder);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });

  };
  return (

    <div className="flex px-4 py-4 mt-4 items-center justify-center md:justify-end-safe mb-4 border border-gray-800 shadow-emerald-800 overflow-hidden">

      <button
        onClick={() => handleSortClick('favorites')}
        className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center gap-2 ${currentSort === 'favorites'
          ? 'bg-amber-600 text-black font-black'
          : 'text-zinc-400 hover:text-white bg-transparent'
          }`}
      >
        <span> Popular</span>

        <DeadlockArrowIcon
          className={`w-2.5 h-2.5  transition-transform duration-200 ${currentOrder === 'asc' && currentSort === 'favorites' ? 'rotate-180' : 'rotate-0'
            }`}
        />

      </button>
      <button
        onClick={() => handleSortClick('recent')}
        className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center gap-2 ${currentSort === 'recent'
          ? 'bg-amber-600 text-black font-black'
          : 'text-zinc-400 hover:text-white bg-transparent'
          }`}
      >
        <span> Recent</span>

        <DeadlockArrowIcon
          className={`w-2.5  h-2.5  transition-transform duration-200 ${currentOrder === 'asc' && currentSort === 'recent' ? 'rotate-180' : 'rotate-0'
            }`}
        />
      </button>
    </div>

  )

}