import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

// Pages
import Home from "./pages/Home";
import RaceList from "./pages/Races";
import RaceDetails from "./pages/RaceDetails";

// components
import Navbar from "./components/navbar";

import "./App.css";

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="App">
        <Router basename="incorta-react.ts" >
          <Navbar />
          <Routes>
            <Route path="incorta-react.ts/" element={<Home />} />
            <Route
              path="incorta-react.ts/season/:season"
              element={<RaceList />}
            />
            <Route
              path="incorta-react.ts/season/:season/race/:round"
              element={<RaceDetails />}
            />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
};

export default App;
