import React from "react";

// Component
import SeasonList from "../Season";

// Assets
import landingImage from "../../assets/landImg.jpeg";

const Home: React.FC = () => {
  return (
    <div className="relative">
      <img className="w-full h-screen" src={landingImage} alt="landingImage" />
      <SeasonList />
    </div>
  );
};

export default Home;
