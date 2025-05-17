import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase-config";
import { restorePlayer, movePlayerToTeam } from "@/utils/firestore";
import { Button } from "@/components/ui";

export default function AdvancedPlayerTools({ roomCode }) {
  const [deletedPlayers, setDeletedPlayers] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);
  const [groupedPlayers, setGroupedPlayers] = useState({});
  const [allTeamNames, setAllTeamNames] = useState({});
  const [allTeamIds, setAllTeamIds] = useState([]);
  const [newTeamIds, setNewTeamIds] = useState({});
  const [expandedTeams, setExpandedTeams] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms", roomCode, "deleted"), (snap) => {
      setDeletedPlayers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [roomCode]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms", roomCode, "players"), (snap) => {
      setActivePlayers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [roomCode]);

  useEffect(() => {
    const groups = {};
    const names = {};

    activePlayers.forEach(player => {
      if (!groups[player.teamId]) groups[player.teamId] = [];
      groups[player.teamId].push(player);
      if (player.teamId && player.teamName) {
        names[player.teamId] = player.teamName;
      }
    });

    setGroupedPlayers(groups);
    setAllTeamNames(names);
    setAllTeamIds(Object.keys(groups));
  }, [activePlayers]);

  const handleRestore = async (id) => {
    try {
      await restorePlayer(roomCode, id);
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  const handleMove = async (id) => {
    const newTeamId = newTeamIds[id];
    if (!newTeamId) return;

    const newTeamName = allTeamNames[newTeamId] || newTeamId;

    try {
      await movePlayerToTeam(roomCode, id, newTeamId, newTeamName);
      setNewTeamIds(prev => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Move failed", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Deleted players */}
      <div>
        <h3 className="font-semibold text-lg">Återställ borttagna spelare</h3>
        {deletedPlayers.length === 0 ? (
          <p className="text-sm text-gray-400">Inga spelare att återställa.</p>
        ) : (
          deletedPlayers.map(player => (
            <div
              key={player.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b py-2"
            >
              <div className="w-full">
                <p className="font-medium">
                  {player.name}{" "}
                  {player.teamName && player.teamId && (
                    <span className="text-xs text-gray-500">
                      {player.teamName} ({player.teamId})
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400">{player.gender}</p>
              </div>
              <div className="w-full sm:w-auto">
                <Button onClick={() => handleRestore(player.id)} className="w-full">
                  Återställ
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Move players between teams */}
      <div>
        <h3 className="font-semibold text-lg">Flytta spelare mellan grupper</h3>

        {Object.entries(groupedPlayers).map(([teamId, players]) => (
          <div key={teamId} className="border border-gray-200 rounded-md p-4 mb-4">
            <button
              className="w-full text-left font-semibold text-md mb-2"
              onClick={() =>
                setExpandedTeams(prev => ({ ...prev, [teamId]: !prev[teamId] }))
              }
            >
              {expandedTeams[teamId] ? "▼" : "▶"}{" "}
              {allTeamNames[teamId]
                ? <>
                    {allTeamNames[teamId]}{" "}
                    <span className="text-xs text-gray-500">({teamId})</span>
                  </>
                : teamId}{" "}
              ({players.length} spelare)
            </button>

            {expandedTeams[teamId] && (
              <div className="space-y-3">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="w-full">
                      <p className="font-medium">{player.name}</p>
                      <p className="text-xs text-gray-400">{player.gender}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <select
                        className="border rounded px-2 py-1 text-sm w-full"
                        value={newTeamIds[player.id] || ""}
                        onChange={(e) =>
                          setNewTeamIds(prev => ({
                            ...prev,
                            [player.id]: e.target.value,
                          }))
                        }
                      >
                        <option value="">Välj ny grupp</option>
                        {allTeamIds
                          .filter(id => id !== player.teamId)
                          .map(id => (
                            <option key={id} value={id}>
                              {allTeamNames[id] || id} ({id})
                            </option>
                          ))}
                      </select>
                      <Button onClick={() => handleMove(player.id)} className="w-full sm:w-auto">
                        Flytta
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

