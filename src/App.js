import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import './App.css';
import Home from './Home';
import Host from './Host';
import Join from './Join';
import { lightTheme, darkTheme } from './theme';

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
    <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
