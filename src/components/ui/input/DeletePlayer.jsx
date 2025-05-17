import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function DeletePlayer({ player, isMarked, onDelete, onRestore }) {

  if (!isMarked) {

    return (
      <button
        className="h-12 w-20 text-2xl text-white bg-red-800 rounded"
        onClick={() => onDelete(player.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    );
  }

  return (

    <button
      className="h-12 w-20 text-2xl text-white bg-green-800 rounded"
      onClick={() => onRestore(player.id)}
    >
      <FontAwesomeIcon icon={faTrashArrowUp} />
    </button>
  )

}

