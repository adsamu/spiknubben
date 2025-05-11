import { useRef, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase-config";
import { ConfirmModal } from "@/components/ui";

export default function ScoreForm({ roomCode, players, challenges, round }) {
  const [grid, setGrid] = useState([]);
  const [lockedCells, setLockedCells] = useState([]);
  const [confirmCell, setConfirmCell] = useState(null);
  const cellTimers = useRef([]);
  const timeLock = 2000; // 2 seconds

  useEffect(() => {
    const loadScores = async () => {
      const initialScores = await Promise.all(
        players.map(async (player) => {
          const playerRef = doc(db, "rooms", roomCode, "players", player.id);
          const snap = await getDoc(playerRef);
          const data = snap.data();
          return data?.scores?.[round] ?? Array(challenges).fill(0);
        })
      );

      const transposed = Array.from({ length: challenges }, (_, rowIndex) =>
        players.map((_, colIndex) => initialScores[colIndex][rowIndex])
      );

      // Merge new scores into local grid
      setGrid(prevGrid =>
        transposed.map((row, r) =>
          row.map((newScore, c) => {
            const oldScore = prevGrid?.[r]?.[c];
            return oldScore !== undefined ? newScore : newScore;
          })
        )
      );

      // Merge locked state with local logic (preserve unlocked if recently interacted)
      setLockedCells((prevLocks) =>
        transposed.map((row, r) =>
          row.map((score, c) => {
            // Don't lock unset cells (score === 0)
            if (score === 0) return false;
            // Preserve current unlocked state if user just interacted
            return prevLocks?.[r]?.[c] ?? true;
          })
        )
      );

    };

    loadScores();
  }, [roomCode, players, challenges, round]);

  console.log("tes");

  const getLockedColor = (score, row, col) => {
    switch (score) {
      case 1:
        return "bg-[#FFD700]"; // gold
      case 2:
        return "bg-[#C0C0C0]"; // silver
      case 3:
        return "bg-[#CD7F32]"; // bronze
      default:
        return "";
    }
  };

  const cycleScore = (row, col) => {
    if (!lockedCells[row][col]) {
      applyScore(row, col);
    } else {
      setConfirmCell({ row, col });
    }
  };

  const applyScore = async (row, col) => {
    const updatedGrid = grid.map((r) => [...r]);
    const updatedLockedCells = lockedCells.map((r) => [...r]);

    const current = grid[row][col];
    const next = (current + 1) % 4;

    updatedGrid[row][col] = next;
    setGrid(updatedGrid);

    updatedLockedCells[row][col] = false;
    setLockedCells(updatedLockedCells);
    setConfirmCell(null);

    // 🔁 Clear existing timer
    if (cellTimers.current[row]?.[col]) {
      clearTimeout(cellTimers.current[row][col]);
    }

    // 🔁 Set new lock timer
    if (!cellTimers.current[row]) cellTimers.current[row] = [];

    if (next !== 0) {
      cellTimers.current[row][col] = setTimeout(() => {
        setLockedCells((prev) => {
          const copy = prev.map((r) => [...r]);
          copy[row][col] = true;
          return copy;
        });
      }, timeLock);
    }

    // 🔄 Firestore update
    const playerId = players[col].id;
    const playerRef = doc(db, "rooms", roomCode, "players", playerId);
    const snap = await getDoc(playerRef);
    const playerData = snap.data();

    const scores = playerData.scores || {};
    const roundScores = scores[round] || Array(challenges).fill(0);
    roundScores[row] = next;

    await updateDoc(playerRef, {
      [`scores.${round}`]: roundScores,
    });
  };

  return (
    <div className="w-full overflow-x-auto relative">
      <div className="inline-block min-w-full">
        <table className="table-auto border-separate min-w-full">
          <thead>
            <tr>
              <th className="w-[48px]"></th>
              {players.map((player) => (
                <th key={player.id} className="w-[60px] h-[115px] relative">
                  <div className="absolute bottom-2 left-1/2 transform -rotate-70 origin-bottom-left whitespace-nowrap">
                    {player.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {grid.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                <td className="sticky left-0 bg-surface p-2 z-10 font-bold text-center w-[48px]">
                  <h1 className="font-bold">{rowIndex + 1}</h1>
                </td>

                {rowData.map((score, colIndex) => (
                  <td
                    key={colIndex}
                    onClick={() => cycleScore(rowIndex, colIndex)}
                    className={`border rounded-lg px-4 py-2 text-center cursor-pointer select-none min-w-[48px] hover:bg-blue-100 
                      ${getLockedColor(score, rowIndex, colIndex)} 
                      ${lockedCells[rowIndex]?.[colIndex] ? "opacity-70 " : ""}
                    `}
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
          <div className="flex justify-center">
            <p className="mb-4 text-lg">
              Ändre {players[confirmCell.col].name}'s poäng?
            </p>
          </div>
        </ConfirmModal>
      )}
    </div>
  );
}

