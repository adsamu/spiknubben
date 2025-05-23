import { Board } from '@/components/ui';
import PlayerRow from './PlayerRow';

export default function Scoreboard({ title, players }) {
  return (
    <Board title={title}>
      <ul className="divide-y divide-gray-200">
        {players.map((p, i) => (
          <PlayerRow key={p.id ?? i} player={p} />
        ))}
      </ul>
    </Board>
  );
}

