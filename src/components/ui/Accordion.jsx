import { useState } from 'react';

export default function Accordion({
  title,
  children,
  locked = false,
  lockedMessage = "This section is locked.",
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    if (!locked) setIsOpen(!isOpen);
  };

  return (
    <div className="w-full rounded-md overflow-hidden bg-white shadow-sm">
      <button
        onClick={toggle}
        className={`w-full px-4 py-2 flex justify-between items-center text-left font-medium transition ${
          locked ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-50'
        }`}
      >
        <span>{title}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="px-4 py-3 border-t bg-gray-50 text-sm text-gray-700">
          {locked ? lockedMessage : children}
        </div>
      )}
    </div>
  );
}

