import { useState } from 'react';
import TeamDetail from './TeamDetail'; // you can stub this for now
import { getTotalPoints, getSpikarCount, getChallengesDone } from '@/utils/points';

export default function TeamRow({ children, team, players, challenges }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalPoints = players.reduce((acc, player) => acc + getTotalPoints(player), 0);
  const spikarCount = players.reduce((acc, player) => acc + getSpikarCount(player), 0);

  // Transpose the score data to group scores by challenge
  const scoresByChallenge = Array.from({ length: challenges }, (_, i) =>
    players.map(player => player.scores[i])
  );

  // Count how many challenges are completed (no zero scores)
  const completedChallenges = scoresByChallenge.filter(
    (scores) => scores.every(score => score > 0)
  ).length;

  console.log(completedChallenges); // Output: 1

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

