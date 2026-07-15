import fs from 'fs';
import path from 'path';
import GalleryClient from '@/components/GalleryClient';
import { Suspense } from 'react';
import LoadingSpinner from '../leaderboard/loading';



const GalleryPage = async () => {

  const galleryDir = path.join(process.cwd(), 'public/gallery');
  let images: string[] = [];

  if (fs.existsSync(galleryDir)) {
    images = fs.readdirSync(galleryDir)
      .filter(file => /\.(webp|png|jpg|jpeg)$/i.test(file))
      .map(file => `/gallery/${file}`)
  }

  return (
    <div className="min-h-screen p-8">

      <Suspense fallback={<LoadingSpinner />}>
        {images && (
          <div>
            <GalleryClient allImages={images} />
          </div>
        )}
      </Suspense>
    </div>
  )
}
export default GalleryPage;