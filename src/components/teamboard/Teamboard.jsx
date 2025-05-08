import { Board } from '@/components/ui';
import TeamRow from './TeamRow';

export default function Teamboard({ title, teams }) {
  return (
    <Board title={title}>
      <ul className="divide-y divide-gray-200">
        {Object.entries(teams).map(([team, players]) => (
          <TeamRow key={team} team={team} players={players} />
        ))}
      </ul>
    </Board>
  );
}

