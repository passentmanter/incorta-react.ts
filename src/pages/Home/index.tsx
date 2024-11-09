import React from "react";

// Component
import SeasonList from "../Season";

// Assets
import landingImage from "../../assets/landImg.jpeg";

const Home: React.FC = () => {
  return (
    <div className="relative">
      <img
        className="w-full xxs:h-[50vh] sm:h-[60vh] lg:h-screen"
        src={landingImage}
        alt="landingImage"
      />
      <SeasonList />
    </div>
  );
};

export default Home;
