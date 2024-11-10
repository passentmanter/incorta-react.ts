import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import React, { Suspense } from "react";

// Pages
// Lazy load pages
const Home = React.lazy(() => import("./pages/Home"));
const RaceList = React.lazy(() => import("./pages/Races"));
const RaceDetails = React.lazy(() => import("./pages/RaceDetails"));

// components
import Navbar from "./components/navbar";

import "./App.css";
import Loader from "./components/loader";

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="App">
        <Router basename="incorta-react.ts">
          <Navbar />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/season/:season" element={<RaceList />} />
              <Route
                path="/season/:season/race/:round"
                element={<RaceDetails />}
              />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </AppProvider>
  );
};

export default App;
