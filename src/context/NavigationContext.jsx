// NavigationProvider.jsx
import { createContext, useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const location = useLocation();
  const hasNavigated = useRef(false);

  useEffect(() => {
    hasNavigated.current = true;
  }, [location]);

  return (
    <NavigationContext.Provider value={{ cameFromInternal: hasNavigated.current }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigationState = () => useContext(NavigationContext);

