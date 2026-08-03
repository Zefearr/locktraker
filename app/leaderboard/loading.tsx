import icon_loader from '@/img/icon_loader2.svg';
import Image from 'next/image';
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">

      <div className="h-16 w-16  relative">
        <span className="absolute w-full
          animate-spinner h-full border-[6px] border-l-transparent border-t-transparent border-b-transparent
           border-r-gray-300 scale-138 rounded-[50%]" > </span>

        <Image
          src={icon_loader}
          alt={'spinner'}
          className="fill animate-counterSpinner"
        />
      </div>
    </div>
  );
} 