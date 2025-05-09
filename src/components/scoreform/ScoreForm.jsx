import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase-config";
import { ConfirmModal } from "@/components/ui";

export default function ScoreForm({ roomCode, players, challenges }) {
  const [grid, setGrid] = useState([]); // score values
  const [timestamps, setTimestamps] = useState([]); // time of last update per cell
  const [confirmCell, setConfirmCell] = useState(null); // { row, col } or null
  const [tick, setTick] = useState(0);
  const timeLock = 2000; // 2 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000); // re-render every second

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    const loadScores = async () => {
      const initialScores = await Promise.all(
        players.map(async (player) => {
          const playerRef = doc(db, "rooms", roomCode, "players", player.id);
          const snap = await getDoc(playerRef);
          const data = snap.data();
          return data?.scores?.slice(0, challenges) || Array(challenges).fill(0);
        })
      );

      const transposed = Array.from({ length: challenges }, (_, rowIndex) =>
        players.map((_, colIndex) => initialScores[colIndex][rowIndex])
      );

      const now = Date.now();
      const initialTimestamps = transposed.map((row) =>
        row.map((score) => (score === 0 ? 0 : now - timeLock - 1))
      );

      setGrid(transposed);
      setTimestamps(initialTimestamps);
    };

    loadScores();
  }, [roomCode, players, challenges]);

  const cycleScore = async (row, col) => {
    const now = Date.now();
    const score = grid[row][col];
    const lastChanged = timestamps[row][col];

    if (score === 0 || lastChanged === 0 || now - lastChanged < timeLock) {
      return applyScore(row, col);
    }

    setConfirmCell({ row, col });
  };

  const applyScore = async (row, col) => {
    const updatedGrid = [...grid];
    const updatedTimestamps = [...timestamps];

    const current = grid[row][col];
    const next = (current + 1) % 4;

    updatedGrid[row][col] = next;
    updatedTimestamps[row][col] = Date.now(); // Reset timer after confirm

    setGrid(updatedGrid);
    setTimestamps(updatedTimestamps);
    setConfirmCell(null);

    const playerId = players[col].id;
    const playerRef = doc(db, "rooms", roomCode, "players", playerId);
    const snap = await getDoc(playerRef);
    const playerData = snap.data();
    const scores = playerData?.scores || Array(challenges).fill(0);
    scores[row] = next;

    const points = scores.reduce((a, b) => a + b, 0);
    const spikar = scores.filter((s) => s === 1).length;

    await updateDoc(playerRef, { scores, points, spikar });
  };

  return (
    <div className="w-full overflow-x-auto relative">
      <div className="inline-block min-w-full">
        <table className="table-auto border-separate min-w-full">
          <thead>
            <tr>
              {players.map((player) => (
                <th key={player.id} className="w-[60px] h-[120px] relative">
                  <div
                    className="absolute bottom-2 left-1/2 transform -rotate-70 origin-bottom-left whitespace-nowrap"
                  >
                    {player.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {grid.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                {rowData.map((score, colIndex) => (
                  <td
                    key={colIndex}
                    onClick={() => cycleScore(rowIndex, colIndex)}
                    className={`border rounded-lg px-4 py-2 text-center cursor-pointer select-none min-w-[48px] hover:bg-blue-100 
                ${Date.now() - timestamps[rowIndex][colIndex] > timeLock && score !== 0 ? "bg-green-100" : ""} `}
                  >
                    <h1 className="font-bold text-xl">{score > 0 ? score : "-"}</h1>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmCell && (
        <ConfirmModal
          onConfirm={() => applyScore(confirmCell.row, confirmCell.col)}
          onCancel={() => setConfirmCell(null)}
        >
          <p className="mb-4 text-lg">
            Change score for Challenge {confirmCell.row + 1}, {players[confirmCell.col].name}?
          </p>
        </ConfirmModal>
      )}
    </div>

  );
}

