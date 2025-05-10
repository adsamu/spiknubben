// src/pages/HostRoom.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";

import { db } from "@/firebase-config";
import { Scoreboard } from "@/components/scoreboard";
import { Teamboard, TeamRow, TeamDetail } from "@/components/teamboard";
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

      <div className="flex flex-col justify-center items-center mb-15">
        <p className="mb-2"><strong>Room Code:</strong> {roomCode}</p>
        <QRCodeSVG value={`${window.location.origin}/join/${roomCode}`} />
      </div>

      <Teamboard title="Lag" teams={teams}>
        {Object.entries(teams).map(([team, players]) => (
          <TeamRow key={team} team={team} players={players} challenges={roomData.challenges}>
            <TeamDetail players={players} roomCode={roomCode} challenges={roomData.challenges} />
          </TeamRow>
        ))}
      </Teamboard>

      <Scoreboard title="Poängtavla" players={players}/>
    </Card>
  );
}

