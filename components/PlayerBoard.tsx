import { PlayerScores } from "@/services/playerService";

interface PlayerListProps {
  players: PlayerScores[];
  heroes: any[];
}
export default function PlayerBoard({ players, heroes }: PlayerListProps) {

  const getRankStyle = (rank: string) => {
    switch (rank) {
      case '1': return { bg: '/goldMedal.png', cls: 'text-gray-700 font-black' };
      case '2': return { bg: '/silverMedal.png', cls: 'text-gray-600 font-black' };
      case '3': return { bg: '/bronzeMedal.png', cls: 'text-gray-700 font-bold' };
    }
  };

  return (
    <table className="w-full ">
      <tbody>
        {players.map((player: PlayerScores, index: number) => {
          const medal = getRankStyle(String(player.rank));

          return (
            <tr key={index} className="w-full  p-4 text-lg flex even:bg-zinc-900/50">
              <td>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center mr-4 bg-cover bg-center ${medal ? medal.cls : 'text-zinc-400'}`}
                  style={medal ? { backgroundImage: `url(${medal.bg})` } : undefined}> <span className="block text-sm m-auto ">{player.rank}</span>
                </span>
              </td>
              <td>
                <span className=" block text-gray-300 font-normal text-shadow-sm text-shadow-gray-900 tracking-wider">{player.name}</span>
              </td>

              {/* <td>
                <span className="font-lg text-gray-300 font-semibold">{player.badgeLevel}</span>
              </td> */}

              <td className="flex gap-x-2 pl-4 justify-end">
                {player.favHeroesId.map((favHeroId: number, index: number) => {
                  const heroData = heroes.find((h: any) => h.id === favHeroId)
                  if (!heroData?.image) return null;
                  return (
                    <img
                      key={index}
                      src={heroData.image}
                      alt={heroData.name}
                      style={{ width: '24px', height: '24px', objectFit: 'contain', }}
                    />
                  )
                })}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}