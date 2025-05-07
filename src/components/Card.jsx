// Card.jsx
export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-surface w-[90%] rounded-xl shadow-md p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

