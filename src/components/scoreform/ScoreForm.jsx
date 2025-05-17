import { useRef, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase-config";
import { ConfirmModal } from "@/components/ui";

export default function ScoreForm({ roomCode, players, challenges, round }) {
  const [grid, setGrid] = useState([]);
  const [lockedCells, setLockedCells] = useState([]);
  const [confirmCell, setConfirmCell] = useState(null);
  const cellTimers = useRef([]);
  // Add in your component or global store
  const [toast, setToast] = useState("");
  const prevScoresRef = useRef({});
  const timeLock = 2000; // 2 seconds

  // Show toast
  const showToast = (message) => {
    setToast(message);
    // setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    const updateStatus = () => {
      if (!navigator.onLine) {
        showToast("Ingen internetuppkoppling");
      } else {
        setToast(""); // Clear any existing toast
      }
    };

    // Initial check
    updateStatus();

    // Listen to network changes
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    // Cleanup
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);


  useEffect(() => {

    const loadScores = async () => {
      const changed = Array.from({ length: challenges }, () =>
        Array.from({ length: players.length }, () => false)
      );

      // Load scores
      const initialScores = await Promise.all(
        players.map(async (player, col) => {
          const playerId = player.id;
          const scores = player?.scores?.[round] ?? Array(challenges).fill(0);
          const prev = prevScoresRef.current[playerId] ?? [];

          scores.forEach((score, row) => {

            if (score !== prev[row]) {
              changed[row][col] = true;
            }
          });

          prevScoresRef.current[playerId] = scores;
          return scores;
        })
      );

      // Transpose the score from (player, challenge) to (challenge, player)
      const transposed = Array.from({ length: challenges }, (_, rowIndex) =>
        players.map((_, colIndex) => initialScores[colIndex][rowIndex])
      );


      // Update only changed cells in grid
      setGrid((prevGrid) =>
        transposed.map((rowData, row) =>
          rowData.map((score, col) => (changed[row][col] ? score : prevGrid?.[row]?.[col] ?? score))
        )
      );

      // Merge locked state with local logic (preserve unlocked if recently interacted)
      setLockedCells(() =>
        transposed.map((row) =>
          row.map((score) => {
            return score === 0 ? false : true;
          })
        )
      );

    };

    loadScores();
  }, [roomCode, players, challenges, round]);


  const getLockedColor = (score) => {
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

    cellTimers.current[row][col] = setTimeout(() => {

      const attemptUpdate = async () => {
        try {
          const playerId = players[col].id;
          const playerRef = doc(db, "rooms", roomCode, "players", playerId);
          const snap = await getDoc(playerRef);
          const playerData = snap.data();
          const scores = playerData.scores || {};
          const roundScores = scores[round] || Array(challenges).fill(0);

          // Get latest score from local grid state
          roundScores[row] = next;

          await updateDoc(playerRef, {
            [`scores.${round}`]: roundScores,
          });

        } catch (error) {
          console.error("⚠️ Firestore update failed:", error);

          // ✅ Notify user (via toast, alert, etc.)
          showToast("Kunde inte spara. Försöker igen...");

          // ⏱️ Retry after 1 second
          setTimeout(attemptUpdate, 1000);
        }
      };

      attemptUpdate();
    }, timeLock);
  };


  return (
    <div className="w-full overflow-x-auto relative">
      <div className="inline-block min-w-full">
        <table className="table-auto border-spacing-x-2 border-separate min-w-full">
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

      {toast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {toast}
        </div>
      )}
      {confirmCell && (
        <ConfirmModal
          onConfirm={() => applyScore(confirmCell.row, confirmCell.col)}
          onCancel={() => setConfirmCell(null)}
        >
          <div className="flex justify-center">
            <p className="mb-4 text-lg">
              Ändra {players[confirmCell.col].name}'s poäng?
            </p>
          </div>
        </ConfirmModal>
      )}
    </div>
  );
}

