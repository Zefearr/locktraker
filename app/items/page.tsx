import type { Metadata } from "next";

import ItemsList from "@/components/Items";
import { fetchAllItemsNested } from "@/services/itemService";
import Loading from "../heroes/loading";
import { act, Suspense } from 'react';
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function ItemsPage({ searchParams }: PageProps) {

  const params = await searchParams;
  const activeTab = params.type?.toLowerCase() || 'weapon';

  const data = await fetchAllItemsNested();

  function typeIcon(type: string) {
    switch (type) {
      case 'weapon': return '⁌';
      case 'spirit': return '🪄';
      case 'vitality': return '♥';
    }
  }
  function buttonType(slot: string, isActive: boolean) {

    const baseClasses = 'text-gray-700 p-4 py-2 font-bold transition-all';
    const activeClasses = isActive ? 'ring-2 ring-black scale-105' : 'opacity-80';

    let colorClass = '';

    switch (slot) {
      case 'weapon': colorClass = 'bg-amber-200'; break;
      case 'spirit': colorClass = 'bg-purple-200'; break;
      case 'vitality': colorClass = 'bg-emerald-200'; break;
      default: colorClass = 'bg-gray-200';
    }

    return `${baseClasses} ${colorClass} ${activeClasses}`;
  }

  if (!data) return <div>Failed to load data</div>;

  const currentSlotData = data[activeTab] || data['weapon'];

  return (
    <div className="p-4 min-h-screen text-white">
      <nav className="flex gap-4 mb-8 border-b border-white/10 pb-2">
        {Object.keys(data).map((slot) => (
          <Link
            key={slot}
            href={`?type=${slot}`}
            className={buttonType(slot, activeTab === slot)}
          >
            <span>
              {`${typeIcon(slot)} `}
            </span>
            {slot}
          </Link>
        ))}
      </nav>

      {currentSlotData ? (
        <ItemsList tiers={currentSlotData} />
      ) : (
        <div>Category not found</div>
      )}
    </div>
  );
}