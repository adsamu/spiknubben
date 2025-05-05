import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase-config";

export function useScoreboard(roomCode) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const playersRef = collection(db, "rooms", roomCode, "players");

    const unsubscribe = onSnapshot(playersRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort lowest score first
      const sorted = data.sort((a, b) => a.scores.reduce((sum, val) => sum + val, 0) - b.scores.reduce((sum, val) => sum + val, 0));
      setPlayers(sorted);
    });

    return () => unsubscribe();
  }, [roomCode]);

  return players;
}

