'use client'
import type { Metadata } from "next";
import { useState } from 'react';

// export const metadata: Metadata = {
//   title: "This is items metadata title",
//   description: "Find items metadata information",
// }
const items = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-10 bg-slate-950 min-h-screen text-white">
      {/* Карта-контейнер */}
      <div className="w-80 border border-slate-700 bg-slate-900 rounded-lg overflow-hidden">
        {/* Шапка (Кнопка) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 flex justify-between items-center bg-slate-800 hover:bg-slate-700 active:bg-slate-600 transition-colors"
        >
          <span className="font-bold uppercase tracking-wider text-sm">
            Заголовок блока
          </span>
          {/* Иконка-стрелочка, которая крутится */}
          <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {/* --- ВОТ ЗДЕСЬ МАГИЯ АНИМАЦИИ --- */}
        <div className={`
          grid transition-[grid-template-rows] duration-500 ease-in-out
          /* Если открыто - 1fr (на всю высоту контента), если закрыто - 0fr */
          ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}>

          {/* ВНУТРЕННИЙ БЛОК: ОБЯЗАТЕЛЬНО overflow-hidden */}
          <div className="overflow-hidden">
            asd
          </div>
        </div>
        {/* --------------------------------- */}

      </div>
    </div>

  );
}

export default items; 