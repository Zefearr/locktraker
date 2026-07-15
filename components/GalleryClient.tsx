'use client';
import { useState, useEffect, useCallback } from 'react';

export default function GalleryClient({ allImages }: { allImages: string[] }) {

  const ITEMS_PER_PAGE = 12;

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [currentLimit, setCurrentLimit] = useState<number>(ITEMS_PER_PAGE);

  const displayedImages = allImages.slice(0, currentLimit);


  const hasMore = currentLimit < allImages.length;

  const handleLoadMore = () => {
    setCurrentLimit((prev) => prev + ITEMS_PER_PAGE);
  };


  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(-1);



  if (allImages.length === 0 || allImages === undefined) {
    return <div className="text-zinc-500">nothing</div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {displayedImages.map((src, index) => (
          <div
            key={src}
            onClick={() => openLightbox(index)}
            className="break-inside-avoid bg-zinc-900 border border-zinc-800 rounded cursor-pointer overflow-hidden group hover:border-amber-500/50 transition-colors"
          >
            <img
              src={src}
              alt={`Screenshot ${index + 1}`}
              title={`Screenshot ${index + 1}`}
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300 "
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Кнопка Load More */}
      {hasMore && (
        <div className="flex justify-center mt-12 mb-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded text-sm font-semibold 
              hover:bg-zinc-800 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer uppercase tracking-wider"
          >
            Load More ({allImages.length - currentLimit} left)
          </button>
        </div>
      )}


      {selectedIndex !== -1 && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-in fade-in duration-150 cursor-zoom-out"
        >
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-zinc-400 hover:text-white text-3xl font-light z-50 p-2 cursor-pointer">✕</button>
          {/* <button onClick={showPrev} className="absolute left-6 text-zinc-400 hover:text-white text-4xl p-4 bg-zinc-900/40 rounded-full hover:bg-zinc-900/80 transition-colors cursor-pointer select-none">‹</button> */}

          <div className="relative w-[92vw] h-[85vh] flex items-center justify-center cursor-default" onClick={(e) => e.stopPropagation()}>
            <img
              src={displayedImages[selectedIndex]}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain rounded shadow-2xl select-none"
            />
          </div>

          {/* <button onClick={showNext} className="absolute right-6 text-zinc-400 hover:text-white text-4xl p-4 bg-zinc-900/40 rounded-full hover:bg-zinc-900/80 transition-colors cursor-pointer select-none">›</button> */}

          {/* <div className="absolute bottom-6 text-zinc-500 text-sm select-none">
            {selectedIndex + 1} / {displayedImages.length}
          </div> */}
        </div>
      )}
    </>
  )
}