import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeletePlayer({ players, onDelete }) {
  const [confirm, setConfirm] = useState(null);
  if (!players?.length) return null;

  return (
    <div className="space-y-2">
      {players.map((player) => (

        <div
          key={player.id}
          className="flex items-center gap-2 justify-left mb-2"
        >
          <div className="min-h-[48px] max-w-[200px] text-2xl flex justify-center items-center w-full min-w-0 px-4 py-2 h-full rounded-md bg-gray-100">
            <h1 className="truncate">{player.name}</h1>
          </div>

          {confirm === player.id ? (
            <>
              <button
                className="h-9 w-9 text-white bg-green-600 rounded"
                onClick={() => onDelete(player.id)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                className="h-9 w-9 text-white bg-red-600 rounded"
                onClick={() => setConfirm(null)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </>
          ) : (
            <button
              className="h-12 w-20 text-white bg-secondary rounded"
              onClick={() => setConfirm(player.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}

        </div>
      ))}

    </div>
  );
}

