import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function Tab({ label, index, setActive, active, disabled }) {
  const isActive = index === active;

  return (
    <button
      onClick={() => !disabled && setActive(index)}
      className={`px-4 py-2 -mb-px w-full font-semibold rounded-t-lg transition 
        ${isActive ? "bg-surface text-black z-10" : "bg-darksurface text-gray-500 hover:text-black z-0"}
        ${disabled ? "opacity-70 cursor-not-allowed" : ""}
      `}
    >
      <div className="flex items-center justify-center gap-1">
        {label}
        {disabled && <FontAwesomeIcon icon={faLock} />}
      </div>
    </button>
  );
}

