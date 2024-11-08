import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

// Pages
import Home from "./pages/Home";
import RaceList from "./pages/Races";

import "./App.css";
import Navbar from "./components/navbar";

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/season/:season" element={<RaceList />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
};

export default App;
