import { Board } from '@/components/ui';
import TeamRow from './TeamRow';

export default function Teamboard({ players }) {
  return (
    <Board title="Scoreboard">
      <ul className="divide-y divide-gray-200">
        {players.map((p, i) => (
          <TeamRow key={p.id ?? i} player={p} />
        ))}
      </ul>
    </Board>
  );
}

