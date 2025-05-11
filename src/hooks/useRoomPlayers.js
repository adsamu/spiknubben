import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase-config";

export function useRoomPlayers(roomCode) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const playersRef = collection(db, "rooms", roomCode, "players");

    const unsubscribe = onSnapshot(playersRef, (snapshot) => {
      const players = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPlayers(players);
    });

    return () => unsubscribe();
  }, [roomCode]);

  return players;
}

