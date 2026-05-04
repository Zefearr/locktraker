import icon_loader from '@/img/icon_loader2.svg';
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="h-16 w-16 animate-spinner relative">
        <img
          src={icon_loader.src}
          alt={'spinner'}
          className="fill"
        />
      </div>
      <p className="font-bold text-2xl px-2 text-deadlock-dark">Loading..</p>
    </div>
  );
} 