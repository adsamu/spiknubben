// src/pages/HostRoom.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";

import { db } from "@/firebase-config";
import { Scoreboard, PlayerDetail } from "@/components/scoreboard";
import { Teamboard, TeamRow, TeamDetail } from "@/components/teamboard";
import { Card, SortedList, Board, Accordion, ProgressBar } from "@/components/ui";
import { useScoreboard } from "@/hooks/useScoreboard";
import { getTotalPoints, getSpikarCount } from '@/utils/pointHelpers';
import { getChallengesDone, groupPlayersByTeam, allTeamsFinishedRound, allTeamsFinishedAllRounds } from '@/utils/teamHelpers';

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
  const round = 1
  const challengesPerRound = roomData.challenges;

  const roundOneReady = allTeamsFinishedRound(teams, 1, challengesPerRound);
  const allRoundsReady = allTeamsFinishedAllRounds(teams, challengesPerRound);

  return (
    <Card>

      <div className="flex flex-col justify-center items-center mb-15">
        <p className="mb-2"><strong>Room Code:</strong> {roomCode}</p>
        <QRCodeSVG value={`${window.location.origin}/join/${roomCode}`} />
      </div>


      <Accordion
        title="Inga spikar efter första rundan"
        locked={!roundOneReady}
      >
        <p>Challenge breakdown and scores go here.</p>
      </Accordion>

      <Accordion
        title="Final"
        locked={!allRoundsReady}
      >
        <div className="flex flex-col gap-6">
          {/* Male leaderboard */}
          <Board title="Top 5 Pojkar" className="shadow-inner">
            <SortedList
              items={
                players
                  .filter((p) => p.gender === "male")
                  .sort((a, b) => getTotalPoints(a) - getTotalPoints(b))
                  .slice(0, 5)
              }
              expandable
              renderItem={(player, isExpanded, index) => (
                <>
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold text-3xl">{index+1}</h1>
                    <p>{player.name}</p>
                    <p>{getTotalPoints(player)} poäng</p>
                    <p>{getSpikarCount(player)} spikar</p>
                  </div>
                  {isExpanded && <PlayerDetail player={player} round={round} />}
                </>
              )}
            />
          </Board>

          {/* Female leaderboard */}
          <Board title="Top 5 Flickor">
            <SortedList
              items={
                players
                  .filter((p) => p.gender === "female")
                  .sort((a, b) => getTotalPoints(a) - getTotalPoints(b))
                  .slice(0, 5)
              }
              expandable
              renderItem={(player, isExpanded, index) => (
                <>
                  <div className="flex justify-between">
                    <h1 className="font-bold text-3xl">{index+1}</h1>
                    <p>{player.name}</p>
                    <p>{getTotalPoints(player)} poäng</p>
                  </div>
                  {isExpanded && <PlayerDetail player={player} round={round} />}
                </>
              )}
            />
          </Board>
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


      <Accordion title="Advanced Settings" >
        <Teamboard title="Lag" teams={teams}>
          {Object.entries(teams).map(([team, players]) => (
            <TeamRow key={team} team={team} players={players} challenges={roomData.challenges}>
              <TeamDetail players={players} roomCode={roomCode} challenges={roomData.challenges} />
            </TeamRow>
          ))}
        </Teamboard>
      </Accordion>

    </Card>
  );
}

