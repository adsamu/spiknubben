import { useEffect } from "react";

export default function Modal({ children, onClose }) {
  useEffect(() => {
    // Lock scroll
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll when modal unmounts
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg min-w-[280px] max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

