import { useState } from "react";

export default function Tabs({ tabs }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`px-4 py-2 -mb-px font-semibold rounded-t-lg border 
              ${
                index === active
                  ? "bg-white border-x border-t border-b-0 text-black"
                  : "bg-gray-100 text-gray-500 border-transparent hover:text-black"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-4 bg-white border border-gray-300 rounded-b-lg shadow">
        {tabs[active].content}
      </div>
    </div>
  );
}

