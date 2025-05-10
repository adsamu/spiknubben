import { useState, Children, cloneElement } from "react";
import Card from "./Card";

export default function TabCard({ children }) {
  const [active, setActive] = useState(0);
  const tabs = Children.toArray(children);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center space-x-2 px-2 overflow-hidden">
        {tabs.map((child, index) =>
          cloneElement(child, {
            index,
            active,
            setActive,
          })
        )}
      </div>

      <Card className="rounded-t-none">
        {tabs[active].props.children}
      </Card>
    </div>
  );
}

