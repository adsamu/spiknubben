import React, { useState } from 'react';

export default function Switch({
  children,
  onChange,
  containerSize = "h-12 w-20",
  buttonSize = "h-9 w-9",
  disabled = false,
  value,
}) {
  const [isChecked, setIsChecked] = useState(value ?? null);

  const handleCheckboxChange = () => {
    if (disabled) return;
    const newValue = isChecked === null ? false : !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  const childArray = React.Children.toArray(children);
  const firstChild = childArray[0];
  const secondChild = childArray[1];

  return (
    <label
      className={`inline-flex items-center select-none ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      aria-disabled={disabled}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        disabled={disabled}
        className="sr-only"
      />
      <div
        className={`flex ${containerSize} items-center justify-center rounded-md bg-secondary shadow-card flex-none`}
      >
        <span
          className={`flex ${buttonSize} text-2xl items-center justify-center rounded ${isChecked === false ? "bg-accent2 text-white" : "text-body-color"}`}
        >
          {firstChild}
        </span>
        <span
          className={`flex ${buttonSize} text-2xl items-center justify-center rounded ${isChecked === true ? "bg-accent2 text-white" : "text-body-color"}`}
        >
          {secondChild}
        </span>
      </div>
    </label>
  );
}

