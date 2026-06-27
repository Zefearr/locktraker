'use client'
import { PlayerScores } from "@/services/playerService"
import { useState } from "react";
import PlayerBoard from "./PlayerBoard";


interface PlayerListProps {
  players: PlayerScores[];
  heroes: any[];
}
function calculateMedal(rank: string) {

  if (rank > '3') {
    'text-red'
  }

}


export default function PlayerList({ players, heroes }: PlayerListProps) {

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const filteredPlayers = players.filter(player =>
    player.name?.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentPlayers = filteredPlayers.slice(indexOfFirstItem, indexOfLastItem);

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuery(e.target.value);
  //   setCurrentPage(1);
  // };


  return (

    <div className="bg-gray-800">
      {/* <div className="flex items-center gap-x-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="type name"
          className="border p-2 text-base bg-zinc-950 text-white border-zinc-800 focus:border-zinc-700 outline-none rounded w-80"
        />
        {query && (
          <span className="text-zinc-500 text-sm">
            Найдено совпадений: {filteredPlayers.length}
          </span>
        )}
      </div> */}

      {currentPlayers.length > 0 ? (
        <div>

          <PlayerBoard players={currentPlayers} heroes={heroes} />
        </div>
      ) : (
        <div className="text-zinc-500 py-10 text-center border border-zinc-800  bg-zinc-900/50">
          player not found
        </div>
      )}


      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-x-4 mt-6 py-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-4 py-2 border border-zinc-800  bg-zinc-900 text-sm disabled:opacity-50 hover:border-zinc-700 transition"
          >
            ←
          </button>

          <span className="text-zinc-400 font-medium text-sm">
            Page {currentPage} из {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-4 py-2 border border-zinc-800  bg-zinc-900 text-sm disabled:opacity-50 hover:border-zinc-700 transition"
          >
            →
          </button>
        </div>
      )}

    </div>
  )
}