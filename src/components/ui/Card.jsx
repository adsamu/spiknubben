// Card.jsx
export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-surface w-full p-4 rounded-xl shadow-md flex flex-col items-center${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

