import { SortedList } from "@/components/ui";
import { groupPlayersByTeam } from "@/utils/teamHelpers";
import { getTotalPoints, getSpikarCount } from "@/utils/pointHelpers";

export default function TeamLeaderboard({ title, players, round = -1, limit = 5 }) {
  const teams = groupPlayersByTeam(players);

  const ranked = Object.entries(teams)
    .map(([teamId, members]) => ({
      teamId,
      teamName: members[0]?.teamName ?? teamId,
      avgSpikars: members.reduce((sum, p) => sum + getSpikarCount(p, round), 0) / members.length,
      avgPoints: members.reduce((sum, p) => sum + getTotalPoints(p, round), 0) / members.length,
    }))
    .sort((a, b) => {
      const spikarDiff = b.avgSpikars - a.avgSpikars;
      return spikarDiff !== 0 ? spikarDiff : a.avgPoints - b.avgPoints;
    })
    .slice(0, limit);

  return (
    <div className="w-full bg-gray-200 rounded-xl">
      <h2 className="text-xl font-bold mb-4 ml-5 mt-2 text-gray-800">{title}</h2>
      <SortedList
        items={ranked}
        expandable={false}
        renderItem={(team, _isExpanded, index) => (
          <div className="grid grid-cols-[40px_1fr_auto] items-center">
            <div className="text-2xl font-bold text-center text-gray-700">{index + 1}</div>
            <div className="text-xl font-medium text-gray-800 truncate">{team.teamName}</div>
            <div className="mr-2">
              <div className="flex gap-1 items-center text-right">
                <p className="text-sm text-gray-500">Poäng:</p>
                <p className="font-semibold text-gray-700">{team.avgPoints.toFixed(1)}</p>
              </div>
              <div className="flex gap-1 items-center text-right">
                <p className="text-sm text-gray-500">Spikar:</p>
                <p className="font-semibold text-gray-700">{team.avgSpikars.toFixed(1)}</p>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
