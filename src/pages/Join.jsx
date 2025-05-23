import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase-config";
import { Button, TextInput, Card, AddPlayersForm, AddPlayersError } from "@/components/ui";
import { AnimatedPage } from "@/animation";
import { addPlayers } from "@/utils/firestore";
import { validatePlayersForm } from "@/utils/validation";

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
  const inputRefs = useRef([]);
  const teamNameRef = useRef(null);

  const [availableTeams, setAvailableTeams] = useState([]);
  const [showTeamList, setShowTeamList] = useState(false);

  const validation = useMemo(() => {
    return validatePlayersForm(teamName, members, []);
  }, [teamName, members]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsSet = new Set();
      const playersRef = collection(db, "rooms", roomCode, "players");
      const playerSnaps = await getDocs(playersRef);

      playerSnaps.forEach((doc) => {
        const data = doc.data();
        if (data.teamId && data.teamName) {
          teamsSet.add(JSON.stringify({ id: data.teamId, name: data.teamName }));
        }
      });

      const teams = Array.from(teamsSet).map((t) => JSON.parse(t));
      setAvailableTeams(teams);
    };

    if (showTeamList) fetchTeams();
  }, [roomCode, showTeamList]);

  const handleSubmit = async () => {
    const { isFormValid } = validatePlayersForm(teamName, members);
    if (!isFormValid) {
      setError("Kontrollera att gruppnamn finns och att spelarnamn är unika, giltiga och korta.");
      return;
    }

    try {
      const teamId = generateTeamId();
      const players = members.filter(({ name }) => name.trim());

      const roomRef = doc(db, "rooms", roomCode);
      const roomSnap = await getDoc(roomRef);
      if (!roomSnap.exists()) {
        setError("Rum hittades inte.");
        return;
      }

      const roomData = roomSnap.data();
      const numChallenges = roomData.challenges || 5;

      await addPlayers({
        roomCode,
        teamId,
        teamName,
        players,
        numChallenges,
      });

      navigate(`/room/${roomCode}/team/${teamId}`);
    } catch (err) {
      console.error("Failed to join game:", err);
      setError("Något gick fel. Försök igen.");
    }
  };

  return (
    <AnimatedPage className="w-full max-w-md mx-auto">
      <Card>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Välkommen till Gräsharenspelen!
        </h1>
        <p className="text-center text-sm text-gray-600 mb-4 px-2">
          Skriv in ert gruppnamn och lägg till deltagare för att komma igång.
        </p>

        <div className="flex flex-col justify-center items-center mb-4">
          <label className="block font-semibold mb-1">Gruppnamn</label>
          <TextInput
            ref={teamNameRef}
            maxLength={10}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                inputRefs.current[0]?.focus();
              }
            }}
          />
        </div>

        <AddPlayersForm
          members={members}
          setMembers={setMembers}
          inputRefs={inputRefs}
        />

        <AddPlayersError validation={validation} backendError={error} />

        <Button onClick={handleSubmit} disabled={!validation.isFormValid}>
          Skapa grupp protokoll
        </Button>
      </Card>

      <div className="mt-6 text-center text-sm text-gray-500">
        <button
          className="hover:underline text-blue-500"
          onClick={() => setShowTeamList((prev) => !prev)}
        >
          {showTeamList ? "Dölj grupper" : "Redan med i en grupp?"}
        </button>

        {showTeamList && (
          <div className="mt-3 space-y-2 flex flex-col">
            {availableTeams.length > 0 ? (
              availableTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() =>
                    navigate(`/room/${roomCode}/team/${team.id}`)
                  }
                  className="block text-center text-white underline rounded hover:bg-gray-50"
                >
                  {team.name} ({team.id})
                </button>
              ))
            ) : (
              <p className="text-gray-400 italic">Inga grupper hittades.</p>
            )}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}

