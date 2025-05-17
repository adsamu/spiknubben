import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";

import { Card, Button } from "@/components/ui";
import { AnimatedPage } from "@/animation";
import EnterCode from "@/components/EnterCode";
import { db } from "@/firebase-config";

const generateRoomCode = () =>
  Math.random().toString(36).substr(2, 6).toUpperCase();

export default function Home() {
  const [challenges, setChallenges] = useState(5);
  const [error, setError] = useState("");
  const [showRooms, setShowRooms] = useState(false);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const codeRef = useRef(null);

  const createRoom = async () => {
    const code = generateRoomCode();
    await setDoc(doc(db, "rooms", code), {
      challenges,
      createdAt: new Date().toISOString(),
    });
    navigate(`/host/${code}`);
  };

  const handleJoinCode = async (code) => {
    const roomRef = doc(db, "rooms", code);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
      navigate(`/join/${code}`);
    } else {
      setError("Felaktig kod. Försök igen.");
      codeRef.current?.reset();
    }
  };

  const fetchRooms = async () => {
    const snap = await getDocs(collection(db, "rooms"));
    const roomList = snap.docs
      .map(doc => ({
        code: doc.id,
        ...doc.data(),
      }))
      .filter(room => room.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setRooms(roomList);
  };

  useEffect(() => {
    if (showRooms && rooms.length === 0) {
      fetchRooms();
    }
  }, [showRooms]);

  return (
    <AnimatedPage className="w-full max-w-md mx-auto">
      <Card>
        <h1 className="text-2xl font-bold text-center mb-4">Anslut till ett spel</h1>

        <EnterCode 
          ref={codeRef} 
          onComplete={handleJoinCode} 
          className="px-4"
        />

        {error && (
          <p className="text-red-500 text-center text-sm mt-2">{error}</p>
        )}

        <hr className="my-6 border-gray-300" />

        <h1 className="text-2xl font-bold text-center mb-4">Starta ett nytt spel</h1>

        <div className="w-[80%] mx-auto">
          <div className="mb-6">
            <label className="block text-text font-semibold mb-1">
              Antal stationer
            </label>
            <input
              type="number"
              min="1"
              value={challenges}
              onChange={(e) => setChallenges(parseInt(e.target.value))}
              className="w-full min-h-[48px] px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
            />
          </div>

          <Button onClick={createRoom} className="w-full">
            Starta spel
          </Button>
        </div>

        {/* Toggle to show room list */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowRooms(prev => !prev)}
            className="text-sm text-gray-500 hover:underline"
          >
            {showRooms ? "Dölj spelrum" : "Visa alla spelrum"}
          </button>
        </div>

        {/* Room list */}
        {showRooms && (
          <div className="mt-4 max-h-[300px] overflow-y-auto border-t pt-4">
            {rooms.length === 0 ? (
              <p className="text-sm text-gray-400 text-center">Inga spelrum hittades.</p>
            ) : (
              <ul className="space-y-2 px-2">
                {rooms.map((room) => (
                  <li
                    key={room.code}
                    onClick={() => navigate(`/host/${room.code}`)}
                    className="cursor-pointer p-2 rounded hover:bg-gray-100"
                  >
                    <p className="font-medium text-sm">{room.code}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(room.createdAt).toLocaleString("sv-SE")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Card>
    </AnimatedPage>
  );
}

