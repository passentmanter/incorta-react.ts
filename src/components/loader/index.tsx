import * as React from "react";
import loadingGif from "../../assets/Dual Ball@1x-1.0s-200px-200px.gif";


const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-[80vh] ">
      <img className="w-[12vw]" src={loadingGif} alt="loading..." />
    </div>
  );
};

export default Loader;
