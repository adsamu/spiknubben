import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { ThemeProvider, CssBaseline } from '@mui/material';
import './App.css';
import GameSetup from './pages/GameSetup';
import Host from './pages/Host';
import Join from './pages/Join';
import Team from './pages/Team';
import Home from './pages/Home';
// import { lightTheme, darkTheme } from './theme';

// import { db } from './firebase-config';
// import { collection, getDocs } from "firebase/firestore";
//
// const colRef = collection(db, "users");
//
// getDocs(colRef)
//   .then((snapshot) => {
//      console.log(snapshot.docs)
//   })

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GameSetup />} />
          <Route path="/host/:roomCode" element={<Host />} />
          <Route path="/join/:roomCode" element={<Join />} />
          <Route path="/team/:teamId" element={<Team />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
