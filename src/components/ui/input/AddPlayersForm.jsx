export default function AddPlayersForm(children, handleAddMember) {

return (
  <div className="mb-4">
    <h3 className="font-semibold mb-2">Spelare</h3>
    {children}

    <button
      onClick={handleAddMember}
      className="text-blue-500 hover:underline text-sm mt-2"
    >
      + Lägg till fler
    </button>
  </div>
  );
}
