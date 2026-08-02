// app/not-found.tsx
import Link from 'next/link'
import paige from '@/public/404.webp'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] ">

      <div className='w-80 h-56 relative'>
        <Image
          src={paige}
          fill alt="paige"
          className='object-cover'
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <p>This page does not exist</p>
      <Link
        href="/"
        className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-gray-800 font-medium transition-colors"
      >
        Back
      </Link>
    </div>
  );
}