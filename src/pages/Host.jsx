// src/pages/HostRoom.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";

import { db } from "@/firebase-config";
import { Scoreboard } from "@/components/scoreboard";
import { Teamboard } from "@/components/teamboard";
import { Card } from "@/components/ui";
import { useScoreboard } from "@/hooks/useScoreboard";
import { groupPlayersByTeam } from "@/utils/groupPlayersByTeam";

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

  const teams = groupPlayersByTeam(players);



  return (
    <Card>
      <p><strong>Room Code:</strong> {roomCode}</p>

      <QRCodeSVG value={`${window.location.origin}/join/${roomCode}`} />

      <h2>Game Settings</h2>
      <p>Number of Challenges: {roomData.challenges}</p>

      <Teamboard title="Upcoming Matches" players={players}>
        {/* …your own list component goes here… */}
      </Teamboard>

      <h2>Teams</h2>
      {Object.keys(teams).length === 0 ? (
        <p>No teams joined yet.</p>
      ) : (
        <ul>
          {Object.entries(teams).map(([teamId, members]) => (
            <li key={teamId}>
              <strong>{teamId}</strong>: {members.map(m => m.name).join(", ")}
            </li>
          ))}
        </ul>
      )}
      <Scoreboard players={players} />
    </Card>
  );
}

