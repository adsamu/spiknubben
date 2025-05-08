import { Button, Modal } from "@/components/ui";

export default function ChangeTeamModal({ player, teams, onSubmit, onCancel }) {
  return (
    <Modal onClose={onCancel}>
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
        <Button onClick={onCancel} className="w-full mt-2">Cancel</Button>
      </div>
    </Modal>
  );
}

