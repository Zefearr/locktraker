export const getTierStyle = (tier: string | undefined) => {
  switch (tier) {
    case 'S+': return 'py-2  inline-block mx-2 my-2 text-center w-15 rounded-[10] text-[2.6rem]    text-green-500 font-black drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]';
    case 'S': return 'py-2 inline-block mx-2 my-2 text-center w-15 rounded-[10] text-[2.6rem]     text-green-500 font-black';
    case 'A': return 'py-2 inline-block mx-2 my-2 text-center w-15 rounded-[10] text-[2.6rem]    text-orange-400 font-bold';
    case 'B': return 'py-2 inline-block mx-2 my-2 text-center w-15 rounded-[10] text-[2.6rem]     text-amber-200';
    case 'C': return 'py-2 inline-block mx-2 my-2 text-center w-15 rounded-[10] text-[2.6rem]     text-zinc-400';
    case 'D': return 'py-2 inline-block mx-2 my-2 text-center w-15 rounded-[10] text-[2.6rem]     text-zinc-600';
    default: return 'text-zinc-500';
  }
};
export const calculateTime = (timestamp: number) => {

  if (!timestamp) return 'Unknown';

  const date = new Date(timestamp * 1000);

  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
export const truncateText = (text: string, max: number) => {
  if (!text) return '';
  return text.length > max ? text.slice(0, max).trim() + '...' : text;
};