// src/pages/GameSetup.jsx
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "@/firebase-config";
import { Button } from "@/components/ui";

const generateRoomCode = () =>
  Math.random().toString(36).substr(2, 6).toUpperCase();

export default function GameSetup() {
  const [challenges, setChallenges] = useState(5);
  const navigate = useNavigate();

  const createRoom = async () => {
    const code = generateRoomCode();
    await setDoc(doc(db, "rooms", code), {
      challenges,
      createdAt: new Date().toISOString(),
    });
    navigate(`/host/${code}`);
  };




  return (
      <div className="w-[90%] max-w-md bg-surface rounded-xl shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold text-text mb-6">Host a New Game</h1>

        <div className="w-[80%] mx-auto">
          <div className="mb-8">
            <label className="block text-text font-semibold mb-1">
              Number of Challenges
            </label>
            <input
              type="number"
              min="1"
              value={challenges}
              onChange={(e) => setChallenges(parseInt(e.target.value))}
              className="w-full min-h-[48px] px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
            />
          </div>
          <Button onClick={createRoom} className="w-full" >Start Game</Button>
        </div>
      </div>
  );
}

