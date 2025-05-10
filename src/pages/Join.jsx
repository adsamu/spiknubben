import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

import { db } from "@/firebase-config";
import { Button, TextInput, Switch } from "@/components/ui";

export default function JoinGame() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState(Array(6).fill({ name: "", gender: "male" }));
  const [error, setError] = useState("");

  const handleAddMember = () => {
    setMembers([...members, ""]);
  };

  const handleGenderChange = (index, isMale) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], gender: isMale ? "male" : "female" };
    setMembers(newMembers);
  };

  const handleNameChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], name: value };
    setMembers(newMembers);
  };

  const handleSubmit = async () => {
    setError("");

    if (!teamName.trim()) {
      setError("Team name is required.");
      return;
    }

    const players = members.filter(({name}) => name.trim());

    if (players.length === 0) {
      setError("At least one member is required.");
      return;
    }

    try {
      const roomRef = doc(db, "rooms", roomCode);
      const roomSnap = await getDoc(roomRef);

      if (!roomSnap.exists()) {
        setError("Room not found.");
        return;
      }

      const roomData = roomSnap.data();
      const numChallenges = roomData.challenges || 5; // default to 5 if missing


      // Add each member as a player document under this room
      await Promise.all(
        players.map(({ name, gender }) => {
          const playerId = uuidv4();
          const playerRef = doc(db, "rooms", roomCode, "players", playerId);

          return setDoc(playerRef, {
            name,
            gender,
            teamId: teamName,
            scores: Array(numChallenges).fill(0),
            joinedAt: serverTimestamp()
          });
        })
      );

      navigate(`/team/${teamName}`);
    } catch (err) {
      console.error("Failed to join game:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-[90%] max-w-md bg-surface rounded-xl shadow-md p-6 text-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Join Game: {roomCode}</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Gruppnamn</label>
        <TextInput onChange={(e) => setTeamName(e.target.value)} />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Team Members</h3>
        {members.map((member, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <TextInput
              value={member.name}
              placeholder={`Member ${index + 1}`}
              onChange={(e) => handleNameChange(index, e.target.value)}
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
          + Add Member
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Button
        onClick={handleSubmit}
      >
        Join Team
      </Button>
    </div>
  );
}

