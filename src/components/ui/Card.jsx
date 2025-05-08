// Card.jsx
export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-surface w-[90%] rounded-xl shadow-md p-6 flex flex-col items-center${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

