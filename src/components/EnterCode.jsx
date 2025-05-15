import { useRef, useState } from "react";

export default function EnterCode({ length = 6, onComplete, className = "" }) {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return; // Only allow alphanumeric, max 1 char

    const updated = [...values];
    updated[index] = value.toUpperCase();
    setValues(updated);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (updated.every((v) => v !== "") && onComplete) {
      onComplete(updated.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className={`flex w-full gap-2 justify-center ${className}`}>
      {values.map((char, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={char}
          ref={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-full max-w-12 h-12 text-center text-xl font-mono border rounded border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
        />
      ))}
    </div>
  );
}

