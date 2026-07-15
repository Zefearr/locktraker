'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
interface LoadMoreButtonProps {
  currentLimit: number;
  hasMore: boolean;
}

export default function LoadMoreButton({ currentLimit, hasMore }: LoadMoreButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (!hasMore) return null;

  const handleLoadMore = () => {
    const nextLimit = currentLimit + 3;
    const params = new URLSearchParams(searchParams.toString());

    params.set('limit', nextLimit.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    })

  };

  return (
    <div className="flex justify-center mt-4 mb-4">
      <button
        onClick={handleLoadMore}
        className="px-6 py-2 bg-gray-900 text-white font-bold block rounded-sm border
         border-gray-800 shadow-emerald-800 hover:bg-gray-500 transition-colors cursor-pointer text-sm uppercase tracking-wider "
      >
        Load More
      </button>
    </div>
  );
}