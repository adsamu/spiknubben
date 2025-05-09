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
  const [members, setMembers] = useState([""]);
  const [error, setError] = useState("");

  const handleAddMember = () => {
    setMembers([...members, ""]);
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleRemoveMember = (index) => {
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  };

  const handleSubmit = async () => {
    setError("");

    if (!teamName.trim()) {
      setError("Team name is required.");
      return;
    }

    if (members.some((m) => !m.trim())) {
      setError("All member names must be filled.");
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
        members.map((name) => {
          const playerId = uuidv4();
          const playerRef = doc(db, "rooms", roomCode, "players", playerId);

          return setDoc(playerRef, {
            name,
            teamId: teamName,
            points: 0,
            spikar: 0,
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
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Team Members</h3>
        {members.map((member, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <TextInput
              value={member}
              placeholder={`Member ${index + 1}`}
              handleChange={(e) => handleMemberChange(index, e.target.value)}
            />
            <Switch>

              <FontAwesomeIcon icon={faMars} className="" />
              <FontAwesomeIcon icon={faVenus} className="" />

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

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Join Team
      </button>
    </div>
  );
}

