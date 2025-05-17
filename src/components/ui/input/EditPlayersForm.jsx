import { useState } from "react";
import DeletePlayer from "./DeletePlayer";
import Switch from "../Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

export default function EditPlayersForm({ players, modifiedMembers, setModifiedMembers }) {
  if (!players?.length) return null;

  const getModified = (id) => modifiedMembers.find((m) => m.id === id) || {};

  const onGenderChange = (id, newGender) => {
    setModifiedMembers((prev) => {
      const existing = prev.find((p) => p.id === id);
      if (existing) {
        return prev.map((p) => p.id === id ? { ...p, gender: newGender } : p);
      } else {
        return [...prev, { id, gender: newGender }];
      }
    });
  };

  const onDelete = (id) => {
    setModifiedMembers((prev) => {
      const existing = prev.find((p) => p.id === id);
      if (existing) {
        return prev.map((p) => p.id === id ? { ...p, deleted: true } : p);
      } else {
        return [...prev, { id, deleted: true }];
      }
    });
  };

  const onRestore = (id) => {
    setModifiedMembers((prev) => {
      const updated = prev
        .map((p) => (p.id === id ? { ...p, deleted: false } : p))
        .filter((p) => p.gender !== undefined || p.deleted !== false);
      return updated;
    });
  };

  return (
    <div className="space-y-2">
      {players.map((player) => {
        const modified = getModified(player.id);
        const gender = modified.gender ?? player.gender;
        const isMarked = modified.deleted === true;

        return (
          <div
            key={player.id}
            className="flex items-center gap-2 justify-left mb-2"
          >
            <div
              className={`min-h-[48px] max-w-[200px] text-2xl flex justify-center items-center w-full min-w-0 px-4 py-2 h-full rounded-md ${
                isMarked ? "bg-red-100 line-through opacity-60" : "bg-gray-100"
              }`}
            >
              <h1 className="truncate">{player.name}</h1>
            </div>

            <Switch
              onChange={(isChecked) =>
                onGenderChange(player.id, isChecked ? "female" : "male")
              }
              disabled={isMarked}
              value={gender === "female"}
            >
              <FontAwesomeIcon icon={faMars} />
              <FontAwesomeIcon icon={faVenus} />
            </Switch>

            <DeletePlayer
              onDelete={() => onDelete(player.id)}
              onRestore={() => onRestore(player.id)}
              isMarked={isMarked}
              player={player}
            />
          </div>
        );
      })}
    </div>
  );
}

