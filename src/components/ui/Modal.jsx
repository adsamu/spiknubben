import { useEffect, useState } from "react";
export default function Modal({ children, onClose }) {
  useEffect(() => {
    const originalStyle = {
      top: window.scrollY,
      position: document.body.style.position,
      width: document.body.style.width,
    };

    document.body.style.position = 'fixed';
    document.body.style.top = `-${originalStyle.top}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.position = originalStyle.position || '';
      document.body.style.top = '';
      document.body.style.width = originalStyle.width || '';
      window.scrollTo(0, parseInt(originalStyle.top || 0));
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation(); // ✅ Prevent backdrop click from bubbling
        onClose();
      }}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg min-w-[280px] max-w-md max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // ✅ Prevent inner content from closing modal
      >
        {children}
      </div>
    </div>
  );
}

