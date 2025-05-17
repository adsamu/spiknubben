import { updateDoc, deleteDoc, doc, getDoc, setDoc, getDocs, collection, serverTimestamp } from "firebase/firestore";
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

export const deletePlayer = async (roomCode, playerId) => {
  const playerRef = doc(db, "rooms", roomCode, "players", playerId);
  const deletedRef = doc(db, "rooms", roomCode, "deleted", playerId);

  const snapshot = await getDoc(playerRef);
  if (!snapshot.exists()) {
    throw new Error("Player not found");
  }

  const playerData = snapshot.data();

  // Save to 'deleted'
  await setDoc(deletedRef, {
    ...playerData,
    deletedAt: Date.now(), // optional timestamp
  });

  // Remove from 'players'
  await deleteDoc(playerRef);
};

export const editPlayer = async (roomCode, playerId, edits) => {
  const playerRef = doc(db, "rooms", roomCode, "players", playerId);
  await updateDoc(playerRef, edits);
}

export const restorePlayer = async (roomCode, playerId) => {
  const deletedRef = doc(db, "rooms", roomCode, "deleted", playerId);
  const playerRef = doc(db, "rooms", roomCode, "players", playerId);

  const snap = await getDoc(deletedRef);
  if (!snap.exists()) throw new Error("Deleted player not found");

  await setDoc(playerRef, snap.data());
  await deleteDoc(deletedRef);
};

export const movePlayerToTeam = async (roomCode, playerId, newTeamId, newTeamName) => {
  const playerRef = doc(db, "rooms", roomCode, "players", playerId);
  await setDoc(playerRef, { teamId: newTeamId, teamName: newTeamName }, { merge: true });
};

