import { Board, SortedList } from "@/components/ui";
import PlayerDetail from "./PlayerDetail";
import { getTotalPoints, getSpikarCount } from "@/utils/pointHelpers";
import { getTeamMates } from "@/utils/teamHelpers";

export default function Leaderboard({
  title,
  players,
  round = -1,
  limit = 5,
  expandable = true, // <-- add this line
  filter = (p) => true, // <-- add this line
}) {
  
  const filteredPlayers = players.filter(filter);

  const top = filteredPlayers
    .sort((a, b) => getTotalPoints(a, round) - getTotalPoints(b, round))
    .slice(0, limit);

  return (
    <div className="w-full bg-gray-200 rounded-xl">
      <h2 className="text-xl font-bold mb-4 ml-5 mt-2 text-gray-800">{title}</h2>
      <SortedList
        items={top}
        expandable={expandable} // <-- pass it through
        renderItem={(player, isExpanded, index) => (
          <>
            <div className="grid grid-cols-[40px_1fr_auto_auto] flex-wrap justify-between items-center">
              <div className="text-2xl font-bold text-center text-gray-700">
                {index + 1}
              </div>
              <div className="text-base font-medium text-xl text-gray-800 truncate">
                {player.name}
              </div>
              <div className="mr-2">
                <div className="flex gap-1 items-center text-right">
                  <p className="text-sm text-gray-500">Poäng: </p>
                  <p className="font-semibold text-gray-700">{getTotalPoints(player, round)}</p>
                </div>
                <div className="flex gap-1 items-center text-right">
                  <p className="text-sm text-gray-500">Spikar:</p>
                  <p className="font-semibold text-gray-700">{getSpikarCount(player, round)}</p>
                </div>
              </div>
            </div>

            {isExpanded && expandable && ( // <-- double guard (optional)
              <PlayerDetail
                player={player}
                teamMates={getTeamMates(player, players)}
              />
            )}
          </>
        )}
      />
    </div>
  );
}

