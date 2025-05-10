import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { Button, ConfirmModal } from "@/components/ui";
import EditPlayer from "./EditPlayer";
import { db } from "@/firebase-config";

export default function TeamDetail({ players, roomCode, challenges }) {
  const [activeModal, setActiveModal] = useState(null); // { type: 'remove' | 'edit' | 'team', player: {...} }
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch available team names
    const fetchTeams = async () => {
      const snapshot = await getDocs(collection(db, "teams"));
      const teamNames = snapshot.docs.map(doc => doc.id);
      setTeams(teamNames);
    };

    fetchTeams();
  }, []);

  function closeModal() {
    setActiveModal(null);
  }

  const handleRemove = async () => {
    const playerRef = doc(db, "players", activeModal.player.id);
    await updateDoc(playerRef, { active: false }); // or delete, depending on your model
    closeModal();
  };

  const handleChangeTeam = async (newTeam) => {
    const playerRef = doc(db, "players", activeModal.player.id);
    await updateDoc(playerRef, { team: newTeam });
    closeModal();
  };

  const handleEditScore = async (newScores) => {
    const playerRef = doc(db, "players", activeModal.player.id);
    await updateDoc(playerRef, { scores: newScores });
    closeModal();
  };

  return (
    <div className="mt-3 rounded-lg bg-gray-50 p-4 text-sm text-gray-700 space-y-3">

      <Button size="sm" variant="destructive" onClick={(e) => {
        e.stopPropagation();
        setActiveModal({ type: "remove", player });
      }}>
        Ta bort grupp
      </Button>

      <div className="flex flex-wrap justify-between ">
        {players.map((player) => (
          <div key={player.id} className="flex flex-col items-center justify-between">
            <span className="font-medium">{player.name}</span>

              <Button size="sm" onClick={(e) => {
                e.stopPropagation();
                setActiveModal({ type: "edit", player });
              }}>
                Ändra
              </Button>

          </div>

        ))}
      </div>

      {/* Modal content */}
      {activeModal?.type === "remove" && (
        <ConfirmModal
          onConfirm={handleRemove}
          onCancel={closeModal}
        >
          <p>Remove <strong>{activeModal.player.name}</strong>?</p>
        </ConfirmModal>
      )}


      {activeModal?.type === "edit" && (
        <EditScoreModal
          player={activeModal.player}
          onSubmit={handleEditScore}
          onCancel={closeModal}
          challenges={challenges}
          roomCode={roomCode}
          teams={teams}
        />
      )}

    </div>
  );
}

