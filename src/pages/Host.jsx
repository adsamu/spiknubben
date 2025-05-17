// src/pages/HostRoom.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";

import { db } from "@/firebase-config";
import { Scoreboard, PlayerDetail, Leaderboard } from "@/components/scoreboard";
import { Teamboard, TeamRow, TeamDetail } from "@/components/teamboard";
import { Card, SortedList, Board, Accordion, ProgressBar } from "@/components/ui";
import { AnimatedPage } from "@/animation";
import { useScoreboard } from "@/hooks/useScoreboard";
import { getChallengesDone, groupPlayersByTeam, allTeamsFinishedRound, allTeamsFinishedAllRounds } from '@/utils/teamHelpers';
import AdvancedPlayerTools from "@/components/AdvancedPlayerTools";


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
    return <p></p>;
  }

  const teams = groupPlayersByTeam(players);
  const round = 1
  const challengesPerRound = roomData.challenges;

  const roundOneReady = allTeamsFinishedRound(teams, 1, challengesPerRound);
  const allRoundsReady = allTeamsFinishedAllRounds(teams, challengesPerRound);


  return (
    <AnimatedPage className="w-full max-w-md mx-auto" >
      <Card>

        <div className="flex flex-col justify-center items-center mb-15">
          <p className="mb-2"><strong>Room Code:</strong> {roomCode}</p>
          <QRCodeSVG value={`${window.location.origin}/join/${roomCode}`} />
        </div>


        {/*locked={!roundOneReady}*/}
        <Accordion
          title="En gratis nubbe till..."
          locked={false}
        >
          <Leaderboard
            title=""
            players={players}
            filter={(p) => p.spikarCount === 0}
            limit={5}
          />
        </Accordion>

        {/*locked={!allRoundsReady}*/}
        <Accordion
          title="Poängställning"
          locked={false}
        >
          <div className="flex flex-col gap-6">
            {/* Male leaderboard */}
            <Leaderboard
              title="Top 5 Pojkar"
              players={players}
              filter={(p) => p.gender === "male"}
              limit={5}
            />

            {/* Female leaderboard */}
            <Leaderboard
              title="Top 5 Flickor"
              players={players}
              filter={(p) => p.gender == "female"}
              limit={5}
            />
          </div>
        </Accordion>


        <div className="w-full h-full">
          <SortedList
            title="Teams"
            items={Object.entries(teams)}
            sort={(a, b) => getChallengesDone(b[1]) - getChallengesDone(a[1])}
            renderItem={([teamId, players]) => (

              <div className="w-full">
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-2xl text-gray-800">{players?.[0]?.teamName ?? "Inget namn"}</p>
                  <p className="text-xs text-gray-400 mt-2">{teamId}</p>
                </div>
                <div className="text-right">
                  <ProgressBar done={getChallengesDone(players)} total={roomData.challenges * 2} />
                </div>
              </div>

            )}
          />
        </div>


        <Accordion title="Advanced Settings" locked={false}>
          <AdvancedPlayerTools roomCode={roomCode} />
        </Accordion>

      </Card>
    </AnimatedPage>

  );
}

