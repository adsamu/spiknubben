import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase-config";
import { ScoreForm } from "@/components/scoreform";
import { TabCard, Tab } from "@/components/ui";

export default function TeamView() {
  const { roomCode, teamId } = useParams();
  const [players, setPlayers] = useState([]);
  const [challenges, setChallenges] = useState(0);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const loadTeam = async () => {
      const playersCol = collection(db, "rooms", roomCode, "players");
      const playersSnap = await getDocs(playersCol);

      const teamPlayers = playersSnap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((p) => p.teamId === teamId);

      if (teamPlayers.length > 0) {
        setPlayers(teamPlayers);
        setTeamName(teamPlayers[0].teamName || "Unknown Team");

        const roomSnap = await getDocs(collection(db, "rooms"));
        const room = roomSnap.docs.find((d) => d.id === roomCode);
        const challenges = room?.data()?.challenges || 5;

        setChallenges(challenges);
      }
    };

    loadTeam();
  }, [roomCode, teamId]);

  if (players.length === 0) {
    return <p className="text-center mt-10">Loading team...</p>;
  }

  return (
    <TabCard>
      {[1, 2].map((round) => (
        <Tab key={round} label={`Runda ${round}`}>
          <div className="w-full flex justify-center">
            <h1 className="text-2xl font-bold mb-2">{teamName}</h1>
          </div>

          <ScoreForm
            roomCode={roomCode}
            players={players}
            challenges={challenges}
            round={round}
          />

          <p className="text-gray-600 mb-6 text-center">Room Code: {roomCode}</p>
        </Tab>
      ))}
    </TabCard>
  );
}

