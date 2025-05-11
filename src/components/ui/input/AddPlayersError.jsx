// components/FormErrorList.jsx
export default function AddPlayersError({ validation, backendError }) {
  return (
    <div className="text-red-500 text-sm mb-4 space-y-1">
      {validation?.teamNameIsEmpty && <p>Gruppnamn krävs.</p>}
      {!validation?.hasAtLeastOneValidName && <p>Lägg till minst en spelare.</p>}
      {validation?.hasTooLongNames && <p>Namn får vara max 10 tecken.</p>}
      {validation?.duplicateNames && <p>Spelarnamn måste vara unika.</p>}
      {backendError && <p>{backendError}</p>}
    </div>
  );
}

