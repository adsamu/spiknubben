import { useState } from "react";
import { Button, Modal } from "@/components/ui";

export default function EditScoreModal({ player, onSubmit, onCancel }) {
  const [scores, setScores] = useState(player.scores || []);

  const updateScore = (i, value) => {
    const copy = [...scores];
    copy[i] = parseInt(value, 10) || 0;
    setScores(copy);
  };

  return (
    <Modal onClose={onCancel}>
      <div className="space-y-4">
        <p>Edit scores for <strong>{player.name}</strong></p>
        <div className="space-y-2">
          {scores.map((val, i) => (
            <input
              key={i}
              className="border w-full p-2 rounded"
              type="number"
              value={val}
              onChange={(e) => updateScore(i, e.target.value)}
            />
          ))}
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <Button onClick={() => onSubmit(scores)}>Save</Button>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
}

