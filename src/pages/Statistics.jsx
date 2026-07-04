import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase-config";
import { Card } from "@/components/ui";
import { AnimatedPage } from "@/animation";
import { groupPlayersByTeam, allTeamsFinishedRound } from "@/utils/teamHelpers";
import { getSpikarCount } from "@/utils/pointHelpers";

function isTeamComplete(players, challenges) {
  const single = { t: players };
  return (
    allTeamsFinishedRound(single, 1, challenges) &&
    allTeamsFinishedRound(single, 2, challenges)
  );
}

export default function Statistics() {
  const [statsByYear, setStatsByYear] = useState(null);

  useEffect(() => {
    async function load() {
      const roomSnap = await getDocs(collection(db, "rooms"));
      const rooms = roomSnap.docs.map((d) => ({ code: d.id, ...d.data() }));

      const roomData = await Promise.all(
        rooms.map(async (room) => {
          const playerSnap = await getDocs(
            collection(db, "rooms", room.code, "players")
          );
          const players = playerSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
          return { room, players };
        })
      );

      const byYear = {};
      for (const { room, players } of roomData) {
        if (!room.createdAt) continue;
        const year = new Date(room.createdAt).getFullYear();
        if (!byYear[year]) byYear[year] = { attendees: 0, spikars: 0 };

        const teams = groupPlayersByTeam(players);
        for (const teamPlayers of Object.values(teams)) {
          if (!isTeamComplete(teamPlayers, room.challenges)) continue;
          byYear[year].attendees += teamPlayers.length;
          byYear[year].spikars += teamPlayers.reduce(
            (sum, p) => sum + getSpikarCount(p),
            0
          );
        }
      }

      setStatsByYear(byYear);
    }

    load();
  }, []);

  const years = statsByYear
    ? Object.keys(statsByYear)
        .filter((y) => statsByYear[y].attendees > 0)
        .sort((a, b) => b - a)
    : [];

  return (
    <AnimatedPage className="w-full max-w-md mx-auto">
      <Card>
        <h1 className="text-2xl font-bold text-center mb-6">Statistik</h1>

        {statsByYear === null ? (
          <p className="text-center text-gray-500">Laddar...</p>
        ) : years.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Ingen statistik hittades.
          </p>
        ) : (
          <div className="space-y-4">
            {years.map((year) => (
              <div key={year} className="bg-gray-100 rounded-xl p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{year}</h2>
                <div className="flex justify-around text-center">
                  <div>
                    <p className="text-4xl font-bold text-accent">
                      {statsByYear[year].attendees}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Deltagare</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-accent">
                      {statsByYear[year].spikars}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Spikar</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </AnimatedPage>
  );
}
