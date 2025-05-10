import { useState } from "react";

export default function SortedList({
  items,
  sort,
  renderItem,
  expandable = false,
}) {
  const [expandedId, setExpandedId] = useState(null);

  const sorted = sort ? [...items].sort(sort) : items;

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <ul className="divide-y divide-gray-200">
      {sorted.map((item, index) => {
        const id = item.id ?? index;
        const isExpanded = expandable && expandedId === id;

        return (
          <li
            key={id}
            onClick={() => expandable && toggleExpand(id)}
            className={`py-4 px-2 transition rounded-md cursor-${expandable ? "pointer" : "default"} hover:bg-gray-50`}
          >
            {renderItem(item, isExpanded, index)}
          </li>
        );
      })}
    </ul>
  );
}

