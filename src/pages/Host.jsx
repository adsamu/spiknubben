// src/pages/HostRoom.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";

import Scoreboard from "../components/Scoreboard";
import { useScoreboard } from "../hooks/useScoreboard";

export default function HostRoom() {
  const { roomCode } = useParams();
  const [roomData, setRoomData] = useState(null);
  const players = useScoreboard(roomCode);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "rooms", roomCode), (docSnap) => {
      if (docSnap.exists()) {
        setRoomData(docSnap.data());
      } else {
        console.error("Room not found");
      }
    });

    return () => unsub();
  }, [roomCode]);

  if (!roomData) {
    return <p>Loading room data...</p>;
  }

  return (
      <div className="w-[90%] max-w-md bg-surface rounded-xl shadow-md p-6 text-center">
      <h1>Host Dashboard</h1>
      <p><strong>Room Code:</strong> {roomCode}</p>
      <QRCodeSVG value={`${window.location.origin}/join/${roomCode}`} />

      <h2>Game Settings</h2>
      <p>Number of Challenges: {roomData.challenges}</p>

      <h2>Teams</h2>
      {roomData.teams.length === 0 ? (
        <p>No teams joined yet.</p>
      ) : (
        <ul>
          {roomData.teams.map((team, idx) => (
            <li key={idx}>
              <strong>{team.name}</strong>: {team.members?.join(", ")}
            </li>
          ))}
        </ul>
      )}
      <Scoreboard players={players} />;
    </div>
  );
}

