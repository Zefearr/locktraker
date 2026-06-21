import icon_loader from '@/img/icon_loader2.svg';
export default function Loading() {
  return (
    <div className="flex  items-center justify-center h-64">

      <div className="h-16 w-16  relative">
        <span className="absolute w-full animate-spinner h-full border-[6px] border-l-transparent border-t-transparent border-b-transparent
           border-r-gray-300 scale-135 rounded-[50%]" > </span>

        <img
          src={icon_loader.src}
          alt={'spinner'}
          className="fill animate-counterSpinner"
        />
      </div>
      <p className="font-bold text-2xl px-6 text-gray-100">Loading..</p>
    </div>
  );
} 