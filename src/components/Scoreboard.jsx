// src/components/Leaderboard.jsx
export default function Scoreboard({ players }) {
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Scoreboard</h2>

      <ul className="divide-y divide-gray-200">
        {players.map((player, index) => (
          <li
            key={player.id || index}
            className="py-4 px-2 hover:bg-gray-50 transition cursor-pointer rounded-md"
            // Placeholder for future expand toggle
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{player.name}</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">Points: <span className="font-medium">{player.scores.reduce((sum, val) => sum + val, 0)}</span></p>
                <p className="text-sm text-gray-600">Spikar: <span className="font-medium">{player.scores.filter((val) => val === 1).length}</span></p>
              </div>
            </div>

            {/* Future detail section can go here */}
            {/* {isExpanded && <PlayerDetail player={player} />} */}
          </li>
        ))}
      </ul>
    </div>
  );
}

