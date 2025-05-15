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
import { getTotalPoints, getSpikarCount } from '@/utils/pointHelpers';
import { getChallengesDone, groupPlayersByTeam, allTeamsFinishedRound, allTeamsFinishedAllRounds, getTeamMates } from '@/utils/teamHelpers';


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
              players={players.filter((p) => getSpikarCount(p) === 0)}
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
              players={players.filter((p) => p.gender === "male")}
              limit={5}
            />

            {/* Female leaderboard */}
            <Leaderboard
              title="Top 5 Flickor"
              players={players.filter((p) => p.gender === "female")}
              limit={5}
            />
          </div>
        </Accordion>


        <div className="w-full h-full">
          <SortedList
            title="Teams"
            items={Object.entries(teams)}
            sort={(a, b) => getChallengesDone(b[1]) - getChallengesDone(a[1])}
            renderItem={([teamName, players]) => (

              <div className="w-full">
                <p className="font-semibold text-xl text-gray-800">{teamName}</p>
                <div className="text-right">
                  <ProgressBar done={getChallengesDone(players)} total={roomData.challenges * 2} />
                </div>
              </div>

            )}
          />
        </div>


        <Accordion title="Advanced Settings" locked={true}>
          <Teamboard title="Lag" teams={teams}>
            {Object.entries(teams).map(([team, players]) => (
              <TeamRow key={team} team={team} players={players} challenges={roomData.challenges}>
                <TeamDetail players={players} roomCode={roomCode} challenges={roomData.challenges} />
              </TeamRow>
            ))}
          </Teamboard>
        </Accordion>

      </Card>
    </AnimatedPage>

  );
}

