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
      [nothing here]
    </div>

  );
}

export default items; 