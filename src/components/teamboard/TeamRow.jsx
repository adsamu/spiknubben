import { useState } from 'react';
import TeamDetail from './TeamDetail'; // you can stub this for now

export default function TeamRow({ player }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalPoints = player.scores.reduce((sum, n) => sum + n, 0);
  const spikarCount = player.scores.filter((n) => n === 1).length;

  return (
    <li
      onClick={() => setIsExpanded((prev) => !prev)}
      className="py-4 px-2 hover:bg-gray-50 transition cursor-pointer rounded-md"
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-800">{player.name}</p>

        <div className="text-right">
          <p className="text-sm text-gray-600">
            Points:{' '}
            <span className="font-medium" data-testid="player-points">
              {totalPoints}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Spikar:{' '}
            <span className="font-medium" data-testid="player-spikar">
              {spikarCount}
            </span>
          </p>
        </div>
      </div>

      {isExpanded && <TeamDetail player={player} />}
    </li>
  );
}

