import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase-config";
import { ScoreForm } from "@/components/scoreform";
import { TabCard, Tab, Button, Modal, MemberInput } from "@/components/ui";
import { AnimatedPage } from "@/animation";
import { addPlayers } from "@/utils/firestore";
import { validatePlayersForm } from "@/utils/validation";

export default function TeamView() {
  const { roomCode, teamId } = useParams();
  const [players, setPlayers] = useState([]);
  const [challenges, setChallenges] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [members, setMembers] = useState(
    Array.from({ length: 6 }, () => ({ name: "", gender: "male" }))
  );
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    const loadTeam = async () => {
      const playersCol = collection(db, "rooms", roomCode, "players");
      const playersSnap = await getDocs(playersCol);

      const teamPlayers = playersSnap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((p) => p.teamId === teamId);

      if (teamPlayers.length > 0) {
        setPlayers(teamPlayers);
        setTeamName(teamPlayers[0].teamName || "Unknown Team");

        const roomSnap = await getDocs(collection(db, "rooms"));
        const room = roomSnap.docs.find((d) => d.id === roomCode);
        const challenges = room?.data()?.challenges || 5;

        setChallenges(challenges);
      }
    };

    loadTeam();
  }, [roomCode, teamId]);

  if (players.length === 0) {
    return <p className="text-center mt-10">Loading team...</p>;
  }

  const handleAddPlayer = async () => {
    const { isFormValid } = validatePlayersForm(teamName, members);
    if (!isFormValid) {
      setError("Kontrollera att spelarnamnet är unikt, kort nog och att gruppnamnet finns.");
      return;
    }

    try {
      await addPlayers({
        roomCode,
        teamId,
        teamName,
        players: members,
      });
    } catch (err) {
      console.error("Error adding player:", err);
      setError("Något gick fel. Försök igen.");
    }
  };

  return (

    <AnimatedPage
      className="w-full max-w-md mx-auto"
      animation={"rl"}
    >
      <TabCard>
        {[1, 2].map((round) => (
          <Tab key={round} label={`Runda ${round}`}>
            <div className="w-full flex justify-center">
              <h1 className="text-2xl font-bold mb-2">{teamName}</h1>
            </div>

            <ScoreForm
              roomCode={roomCode}
              players={players}
              challenges={challenges}
              round={round}
            />

            <p className="text-gray-600 mb-6 text-center">Grupp ID: {teamId}</p>
          </Tab>
        ))}
      </TabCard>

      <div className="text-center mt-4">
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="text-sm text-blue-500 hover:underline"
        >
          Hantera spelare
        </button>
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Lägg till spelare i {teamName}
          </h2>

          {members.map((member, index) => (
            <MemberInput
              member={member}
              index={index}
              onNameChange={(_, val) => setMembers({ ...member, name: val })}
              onGenderChange={(_, gender) => setMembers({ ...member, gender })}
              inputRef={(el) => (inputRefs.current[index] = el)}
            />))}

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <Button onClick={handleAddPlayer}>Lägg till spelare</Button>

        </Modal>
      )}

    </AnimatedPage>
  );
}

