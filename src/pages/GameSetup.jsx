// src/pages/GameSetup.jsx
import { useState } from "react";
import { db } from "../firebase-config";
import Button from "../components/Button";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const generateRoomCode = () =>
  Math.random().toString(36).substr(2, 6).toUpperCase();

export default function GameSetup() {
  const [challenges, setChallenges] = useState(5);
  const navigate = useNavigate();

  const createRoom = async () => {
    const code = generateRoomCode();
    await setDoc(doc(db, "rooms", code), {
      challenges,
      teams: [],
      createdAt: new Date().toISOString(),
    });
    navigate(`/host/${code}`);
  };

  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center px-4">
      <div className="w-[90%] max-w-md bg-white rounded-xl shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Host a New Game</h1>

        <div className="w-[80%] mx-auto">

          <div className="mb-8">
            <label className="block text-gray-700 font-semibold">
              Number of Challenges
            </label>
            <input
              type="number"
              min="1"
              value={challenges}
              onChange={(e) => setChallenges(parseInt(e.target.value))}
              className="w-full min-h-[48px] px-4 py-2 rounded-md border border-gray-300 box-border focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
            />
          </div>
          
          <Button onClick={createRoom}>Start Game</Button>

        </div>
      </div>
    </div>
  );
}

