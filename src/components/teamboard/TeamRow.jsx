import { useState } from 'react';
import TeamDetail from './TeamDetail'; // you can stub this for now
import { getTotalPoints, getSpikarCount } from '@/utils/points';

export default function TeamRow({ team, players }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalPoints = players.reduce((acc, player) => acc + getTotalPoints(player) , 0);
  const spikarCount = players.reduce((acc, player) => acc + getSpikarCount(player) , 0);


  return (
    <li
      onClick={() => setIsExpanded((prev) => !prev)}
      className="py-4 px-2 hover:bg-gray-50 transition cursor-pointer rounded-md"
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-800">{team}</p>

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

      {isExpanded && <TeamDetail players={players} />}
    </li>
  );
}

