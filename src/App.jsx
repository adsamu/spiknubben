import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import GameSetup from './pages/GameSetup';
import Host from './pages/Host';
import Join from './pages/Join';
import Team from './pages/Team';
import Home from './pages/Home';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
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
