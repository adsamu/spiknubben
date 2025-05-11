import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase-config";

export function useTeamPlayers(roomCode, teamId) {
  const [players, setPlayers] = useState([]);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const playersRef = collection(db, "rooms", roomCode, "players");

    const unsubscribe = onSnapshot(playersRef, (snapshot) => {
      const players = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((p) => p.teamId === teamId);

      setPlayers(players);

      if (players.length > 0) {
        setTeamName(players[0].teamName || "Unknown Team");
      }
    });

    return () => unsubscribe();
  }, [roomCode, teamId]);

  return { players, teamName };
}

