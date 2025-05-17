import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase-config";
import { ScoreForm } from "@/components/scoreform";
import { Leaderboard } from "@/components/scoreboard";
import {
  TabCard,
  Tab,
  Button,
  Modal,
  DeletePlayer,
  AddPlayersForm,
  AddPlayersError,
  EditPlayersForm,
} from "@/components/ui";
import { AnimatedPage } from "@/animation";
import { addPlayers, deletePlayer, editPlayer } from "@/utils/firestore";
import { validatePlayersForm } from "@/utils/validation";
import { useTeamPlayers } from "@/hooks/useTeamPlayers";

export default function TeamView() {
  const { roomCode, teamId } = useParams();
  const { players, teamName } = useTeamPlayers(roomCode, teamId);

  const [challenges, setChallenges] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [members, setMembers] = useState([{ name: "", gender: "male", deleted: false }]);
  const [modifiedMembers, setModifiedMembers] = useState([]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const validation = useMemo(() => {
    return validatePlayersForm(teamName, members, players);
  }, [teamName, members, players]);

  useEffect(() => {
    const handlePopState = () => {
      // Force reload instead of going back
      window.location.reload();
    };

    // Push a dummy state to prevent back navigation
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);


  useEffect(() => {
    const loadRoom = async () => {
      const roomsSnap = await getDocs(collection(db, "rooms"));
      const room = roomsSnap.docs.find((d) => d.id === roomCode);
      const challengeCount = room?.data()?.challenges || 5;
      setChallenges(challengeCount);
    };

    loadRoom();
  }, [roomCode]);

  const handleEditPlayers = async (modifiedMembers) => {
    try {
      const editPromises = modifiedMembers.map(async (member) => {
        const { id, deleted, ...edits } = member;

        if (deleted) {
          await deletePlayer(roomCode, id);
        } else if (Object.keys(edits).length > 0) {
          await editPlayer(roomCode, id, edits);
        }
      });

      await Promise.all(editPromises);
    } catch (err) {
      console.error("Error editing or deleting player:", err);
      setError("Kunde inte uppdatera spelare.");
    }
    setModifiedMembers([]);
  };

  const handleAddPlayer = async () => {
    const { isFormValid } = validatePlayersForm(teamName, members, players);
    if (!isFormValid) {
      setError(
        "Kontrollera att spelarnamnet är unikt, kort nog och att gruppnamnet finns."
      );
      return;
    }

    try {
      await addPlayers({ roomCode, teamId, teamName, players: members });
    } catch (err) {
      console.error("Error adding player:", err);
      setError("Något gick fel. Försök igen.");
    }
  };

  if (players.length === 0) {
    return <p className="text-center mt-10"></p>;
  }


  return (
    <AnimatedPage className="w-full max-w-md mx-auto" animation="rl">
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

            <p className="text-gray-600 mb-6 text-center">
              Grupp ID: {teamId}
            </p>
          </Tab>
        ))}
        <Tab label="Poängställning">

          <div className="flex flex-col gap-6">
            {/* Male leaderboard */}
            <Leaderboard
              title=""
              players={players}
              limit={20}
              expandable={false}
            />
          </div>
        </Tab>
      </TabCard>

      <div className="text-center mt-4">
        <button
          onClick={() => setShowModal(true)}
          className="text-sm text-blue-500 hover:underline"
        >
          Hantera spelare
        </button>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Lägg till spelare
            </h2>

            <AddPlayersForm
              members={members}
              setMembers={setMembers}
              inputRefs={inputRefs}
              showAddButton={true}
            />
            <AddPlayersError validation={validation} backendError={error} />

            <div className="flex items-center justify-center">
              <Button onClick={handleAddPlayer} disabled={!validation.isFormValid}>
                Lägg till spelare
              </Button>
            </div>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Ändra spelare
            </h2>

            <EditPlayersForm
              players={players}
              modifiedMembers={modifiedMembers}
              setModifiedMembers={setModifiedMembers}
            />

          </div>
          <div className="flex gap-5 items-center justify-center mt-4">

            <Button onClick={() => { handleEditPlayers(modifiedMembers); setShowModal(false) }} >
              Spara
            </Button>

            <Button onClick={() => setShowModal(false)} >
              Stäng
            </Button>
          </div>
        </Modal>
      )}
    </AnimatedPage>
  );
}

