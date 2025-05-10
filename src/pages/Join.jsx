import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

import { db } from "@/firebase-config";
import { Button, TextInput, Switch, Card } from "@/components/ui";

const generateTeamId = () =>
  Math.random().toString(36).substr(2, 6).toUpperCase();

export default function JoinGame() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState(
    Array.from({ length: 6 }, () => ({ name: "", gender: "male" }))
  );
  const [error, setError] = useState("");

  const handleAddMember = () => {
    setMembers([...members, { name: "", gender: "male" }]);
  };

  const handleGenderChange = (index, gender) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], gender };
    setMembers(newMembers);
  };

  const handleNameChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], name: value };
    setMembers(newMembers);
  };

  const trimmedNames = members.map((m) => m.name.trim());
  const seen = new Set();
  const duplicateNames = trimmedNames.some((name) => {
    if (!name) return false;
    if (seen.has(name)) return true;
    seen.add(name);
    return false;
  });

  const hasTooLongNames = trimmedNames.some((name) => name.length > 10);
  const teamNameIsEmpty = !teamName.trim();
  const hasAtLeastOneValidName = trimmedNames.some((name) => name !== "");

  const isFormValid =
    !teamNameIsEmpty &&
    hasAtLeastOneValidName &&
    !hasTooLongNames &&
    !duplicateNames;

  const handleSubmit = async () => {
    setError("");

    const teamId = generateTeamId();
    const players = members.filter(({ name }) => name.trim());

    try {
      const roomRef = doc(db, "rooms", roomCode);
      const roomSnap = await getDoc(roomRef);

      if (!roomSnap.exists()) {
        setError("Rum hittades inte.");
        return;
      }

      const roomData = roomSnap.data();
      const numChallenges = roomData.challenges || 5;

      await Promise.all(
        players.map(({ name, gender }) => {
          const playerId = uuidv4();
          const playerRef = doc(db, "rooms", roomCode, "players", playerId);

          return setDoc(playerRef, {
            name,
            gender,
            teamId,
            teamName,
            scores: {
              1: Array(numChallenges).fill(0),
              2: Array(numChallenges).fill(0),
            },
            joinedAt: serverTimestamp(),
          });
        })
      );

      navigate(`/room/${roomCode}/team/${teamId}`);
    } catch (err) {
      console.error("Failed to join game:", err);
      setError("Något gick fel. Försök igen.");
    }
  };

  return (
    <Card>
      <h1 className="text-2xl font-bold mb-4 text-center">Välkommen till Gräsharenspelen!</h1>
      <p className="text-center text-sm text-gray-600 mb-4 px-2">
        Skriv in ert gruppnamn och lägg till deltagare för att komma igång.
      </p>

      <div className="flex flex-col justify-center items-center mb-4">
        <label className="block font-semibold mb-1">Gruppnamn</label>
        <TextInput
          maxLength={10}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Spelare</h3>
        {members.map((member, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <TextInput
              value={member.name}
              placeholder={`Spelare ${index + 1}`}
              onChange={(e) => handleNameChange(index, e.target.value)}
              maxLength={10}
            />
            <Switch
              onChange={(isChecked) =>
                handleGenderChange(index, isChecked ? "female" : "male")
              }
            >
              <FontAwesomeIcon icon={faMars} />
              <FontAwesomeIcon icon={faVenus} />
            </Switch>
          </div>
        ))}

        <button
          onClick={handleAddMember}
          className="text-blue-500 hover:underline text-sm mt-2"
        >
          + Lägg till fler
        </button>
      </div>

      {/* Inline errors */}
      <div className="text-red-500 text-sm mb-4 space-y-1">
        {teamNameIsEmpty && <p>Gruppnamn krävs.</p>}
        {!hasAtLeastOneValidName && <p>Lägg till minst en spelare.</p>}
        {hasTooLongNames && <p>Namn får vara max 10 tecken.</p>}
        {duplicateNames && <p>Spelarnamn måste vara unika.</p>}
        {error && <p>{error}</p>}
      </div>
      <Button onClick={handleSubmit} disabled={!isFormValid}>
        Skapa grupp
      </Button>
    </Card>
  );
}

