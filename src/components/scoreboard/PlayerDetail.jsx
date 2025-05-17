export default function PlayerDetail({ player, teamMates }) {
  return (
    <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-700 space-y-2">
      <p>
        <strong>Grupp:</strong> {player.teamName || "Unknown"}
      </p>
      <p>
        <strong>Spelade med:</strong>{" "}
        {teamMates.length > 0
          ? teamMates.map((mate) => mate.name).join(", ")
          : "Ingen"}
      </p>
      <p className="text-xs text-gray-400 mt-2">Grupp ID: {player.teamId}</p>
    </div>
  );
}

