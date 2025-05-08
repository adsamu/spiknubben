export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        min-h-[48px]
        px-4
        py-3
        bg-secondary
        hover:bg-accent2
        active:bg-accent2
        text-white
        text-lg
        font-semibold
        rounded-lg
        transition
        duration-150
        ease-in-out
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-blue-400
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}

