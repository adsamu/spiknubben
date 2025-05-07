import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import TeamScore from "../components/TeamScore";

export default function TeamView() {
  const { teamId } = useParams();
  const [roomCode, setRoomCode] = useState(null);
  const [players, setPlayers] = useState([]);
  const [challenges, setChallenges] = useState(0);

  useEffect(() => {
    const loadTeam = async () => {
      const roomsCol = collection(db, "rooms");
      const roomDocs = await getDocs(roomsCol);

      for (const docSnap of roomDocs.docs) {
        const roomId = docSnap.id;
        const roomData = docSnap.data();

        const playersCol = collection(db, "rooms", roomId, "players");
        const playersSnap = await getDocs(playersCol);
        const teamPlayers = playersSnap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((p) => p.teamId === teamId);

        if (teamPlayers.length > 0) {
          setPlayers(teamPlayers);
          setChallenges(roomData.challenges);
          setRoomCode(roomId);
          break;
        }
      }
    };

    loadTeam();
  }, [teamId]);

  if (!roomCode || players.length === 0) {
    return <p className="text-center mt-10">Loading team...</p>;
  }

  return (
      <div className="w-[90%] max-w-md bg-surface rounded-xl shadow-md p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Team: {teamId}</h1>
      <p className="text-gray-600 mb-6">Room Code: {roomCode}</p>

      <TeamScore
        roomCode={roomCode}
        players={players}
        challenges={challenges}
      />
    </div>
  );
}

