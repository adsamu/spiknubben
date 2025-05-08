import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

export function useGroupedPlayers(roomId) {
  const [teams, setTeams] = useState({});

  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = onSnapshot(
      collection(db, "rooms", roomId, "players"),
      (snapshot) => {
        const players = snapshot.docs.map((doc) => doc.data());

        const grouped = {};
        players.forEach((player) => {
          const { teamId } = player;
          if (!grouped[teamId]) grouped[teamId] = [];
          grouped[teamId].push(player);
        });

        setTeams(grouped);
      }
    );

    return () => unsubscribe();
  }, [roomId]);

  return teams;
}

