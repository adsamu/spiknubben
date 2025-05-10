import { useState } from 'react';
import TeamDetail from './TeamDetail'; // you can stub this for now

export default function TeamRow({ children, team, players, challenges }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const round = 1; // or 2, or whatever round you want

  const scoresByChallenge = Array.from({ length: challenges }, (_, challengeIndex) =>
    players.map(player => player.scores?.[round]?.[challengeIndex] ?? 0)
  );

  const completedChallenges = scoresByChallenge.filter(
    (scores) => scores.every(score => score > 0)
  ).length;

  const challengesLeft = challenges - completedChallenges;




  return (
    <li
      onClick={() => setIsExpanded((prev) => !prev)}
      className="py-4 px-2 hover:bg-gray-50 transition cursor-pointer rounded-md"
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-800">{team}</p>

        <div className="text-right">
          Grenar kvar: {challengesLeft}
        </div>
      </div>

      {isExpanded && children}
    </li>
  );
}

