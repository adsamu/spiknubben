import { doc, getDoc, setDoc, getDocs, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/firebase-config";

export async function addPlayers({ roomCode, teamId, teamName, players }) {
  const roomRef = doc(db, "rooms", roomCode);
  const roomSnap = await getDoc(roomRef);

  if (!roomSnap.exists()) {
    throw new Error("Rum hittades inte.");
  }

  const roomData = roomSnap.data();
  const numChallenges = roomData.challenges || 5;

  await Promise.all(
    players.map(({ name, gender }) => {
      const playerId = uuidv4();
      const playerRef = doc(db, "rooms", roomCode, "players", playerId);

      return setDoc(playerRef, {
        name,
        gender,
        teamId,
        teamName,
        scores: {
          1: Array(numChallenges).fill(0),
          2: Array(numChallenges).fill(0),
        },
        joinedAt: serverTimestamp(),
      });
    })
  );
}

