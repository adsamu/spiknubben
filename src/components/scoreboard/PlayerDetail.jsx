export default function PlayerDetail({ player }) {
  return (
    <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
      {/* Replace with whatever extra info you want to show */}
      Coming soon: details for <strong>{player.name}</strong>
    </div>
  );
}

