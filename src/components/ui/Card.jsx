// Card.jsx
export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-surface overflow-hidden space-y-4 w-full p-4 rounded-xl shadow-md z-20 flex flex-col items-center${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

