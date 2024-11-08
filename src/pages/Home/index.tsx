import React from "react";

// Assets
import landingImage from "../../assets/landImg.jpeg";

const Home: React.FC = () => {
  return (
    <div className="relative">
      <img className="w-full h-screen" src={landingImage} alt="landingImage" />
    </div>
  );
};

export default Home;
