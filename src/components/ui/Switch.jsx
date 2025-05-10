import React, { useState } from 'react'

export default function Switch({ children, onChange, containerSize = "h-12 w-20", buttonSize = "h-9 w-9" }) {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  }

  const childArray = React.Children.toArray(children);
  const firstChild = childArray[0];
  const secondChild = childArray[1];

  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="sr-only"
      />
      <div
        className={`flex ${containerSize} items-center justify-center rounded-md bg-secondary shadow-card flex-none`}
      >
        <span
          className={`flex ${buttonSize} items-center justify-center rounded ${!isChecked ? "bg-accent2 text-white" : "text-body-color"
            }`}
        >
          {firstChild}
        </span>
        <span
          className={`flex ${buttonSize} items-center justify-center rounded ${isChecked ? "bg-accent2 text-white" : "text-body-color"
            }`}
        >
          {secondChild}
        </span>
      </div>

    </label>
  )
}

