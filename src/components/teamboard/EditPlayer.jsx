import { useState } from "react";
import { Button, Modal } from "@/components/ui";
import { ScoreForm } from "@/components/scoreform";

export default function EditScoreModal({ player, onSubmit, onCancel, roomCode, teams, challenges }) {
  const [scores, setScores] = useState(player.scores || []);

  const updateScore = (i, value) => {
    const copy = [...scores];
    copy[i] = parseInt(value, 10) || 0;
    setScores(copy);
  };

  return (
    <Modal onClose={onCancel}>
      <div className="flex flex-col space-y-6 w-full center-justify items-center">
        <div className="flex w-full">
          <ScoreForm
            roomCode={roomCode}
            players={[player]}
            challenges={challenges}
          />
          <ScoreForm
            roomCode={roomCode}
            players={[player]}
            challenges={challenges}
          />

        </div>

        <div className="space-y-4">
          <p>Move <strong>{player.name}</strong> to:</p>
          <select
            className="w-full border rounded p-2"
            defaultValue={player.team}
            onChange={(e) => onSubmit(e.target.value)}
          >
            {teams.map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>
    <div className="flex gap-2 items-center justify-end mt-4">
    <Button onClick={onCancel} className="w-full mt-2">Spara</Button>
    <Button onClick={onCancel} className="w-full mt-2">Avbryt</Button>
    </div>

        <Button size="sm" variant="destructive" onClick={(e) => {
          e.stopPropagation();
          setActiveModal({ type: "remove", player });
        }}>
          Ta bort spelare
        </Button>

      </div>
    </Modal>
  );
}

