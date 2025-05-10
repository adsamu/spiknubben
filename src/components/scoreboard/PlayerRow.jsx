import { useState } from 'react';
import PlayerDetail from './PlayerDetail'; // you can stub this for now
import { getTotalPoints, getSpikarCount } from '@/utils/points';

export default function PlayerRow({ player }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalPoints = getTotalPoints(player);
  const spikarCount = getSpikarCount(player);

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

      {isExpanded && <PlayerDetail player={player} />}
    </li>
  );
}

