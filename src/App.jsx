import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Host, Join, Team, Home, GameSetup } from '@/pages/';
import { Layout } from '@/components/layout';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/test" element={<Home />} />
          <Route path="/" element={<GameSetup />} />
          <Route path="/host/:roomCode" element={<Host />} />
          <Route path="/join/:roomCode" element={<Join />} />
          <Route path="/team/:teamId" element={<Team />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
