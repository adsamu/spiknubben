import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import './App.css';
import { Host, Join, Team, Home, GameSetup } from '@/pages/';
import { Layout } from '@/components/layout';
import { NavigationProvider } from '@/context/NavigationContext';


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={true}>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/test" element={<Home />} />
          <Route path="/" element={<GameSetup />} />
          <Route path="/host/:roomCode" element={<Host />} />
          <Route path="/join/:roomCode" element={<Join />} />
          <Route path="/room/:roomCode/team/:teamId" element={<Team />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <NavigationProvider>
        <AnimatedRoutes />
      </NavigationProvider>
    </Router>
  );
}

