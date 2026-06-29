
import { globStats } from "@/services/globalStatsService";
import Image from "next/image";
import city from '@/img/city.png';
import archm from '@/img/archm.png';
import hk from '@/img/hk.png';


interface GlobalStatsListProps {
  initialStats: globStats[] | null;
}

export default function GlobalStatsList({ initialStats }: GlobalStatsListProps) {

  const calcColor = (stat: number) => {
    return stat > 50 ? 'text-green-500 text-sm' : 'text-red-500 text-sm';
  }
  const stats = initialStats

  if (stats === null) return <p>error</p>;
  if (stats.length === 0) return <p>nothing found</p>;

  return (
    <div className="">

      {stats.map((s, i) => (
        <div key={i} className="border-b  border-[#0F0F16] min-h-10 relative m-auto  py-4 flex  after:content:'' after:absolute after:w-full after:h-0.5 after:translate-y-1
         after:blur-[0.5px] after:opacity-40 after:bottom-0 after:bg-[#323243]">
          <div className="flex m-auto items-end justify-around gap-8">
            <div>
              <div className="w-12">
                <Image src={archm} width={256} height={256} alt="archmother" className="relative" />
                <span className="text-[0.6rem]"> ArchMother</span>

              </div>
            </div>
            <div className="flex gap-4 ">
              <span className={`${calcColor(s.archMotherPercent)} font-mono`}>
                {s.archMotherPercent} %
              </span>
              <span className={calcColor(s.hiddenKingPercent)}>
                {s.totalMatches > 0 ? Number((100 - s.archMotherPercent).toFixed(1)) : 0} %
              </span>

            </div>
            <div>
              <div className="w-12">
                <Image width={256} height={256} src={hk} alt="hk" className="relative scale-110 -translate-y-1" />
                <span className="text-[0.6rem] z-10 ">  HiddenKing</span>

              </div>

            </div>

          </div>

        </div>
      ))}
    </div>
  );
}