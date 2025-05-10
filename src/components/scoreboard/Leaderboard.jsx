import { Board, SortedList } from "@/components/ui";
import PlayerDetail from "./PlayerDetail";
import { getTotalPoints, getSpikarCount } from "@/utils/pointHelpers";
import { getTeamMates } from "@/utils/teamHelpers";

export default function Leaderboard({ title, players, round = -1, limit = 5 }) {
  const top = players
    .sort((a, b) => getTotalPoints(b, round) - getTotalPoints(a, round))
    .slice(0, limit);

  return (
    <div className="w-full bg-gray-200 rounded-xl">
      <h2 className="text-xl font-bold mb-4 ml-5 mt-2 text-gray-800">{title}</h2>
      <SortedList
        items={top}
        expandable
        renderItem={(player, isExpanded, index) => (
          <>
            <div className="grid grid-cols-[40px_1fr_auto_auto] flex-wrap justify-between items-center ">
              {/* Position */}
              <div className="text-2xl font-bold text-center text-gray-700">
                {index + 1}
              </div>

              {/* Player name */}
              <div className="text-base font-medium  text-xl text-gray-800 truncate">
                {player.name}
              </div>

              {/* Spikar and point*/}
              <div className="flex gap-2">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Poäng:</p>
                  <p className="text-sm text-gray-500">Spikar:</p>
                </div>

                <div className="text-center mr-1">
                  <p className="font-semibold text-gray-700">{getSpikarCount(player, round)}</p>
                  <p className="font-semibold text-gray-700">{getTotalPoints(player, round)}</p>
                </div>
              </div>

            </div>
            {isExpanded && (
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

