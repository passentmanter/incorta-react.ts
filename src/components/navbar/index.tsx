import React from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/pngegg.png";

const Navbar: React.FC = () => {
  const location = useLocation();
  const locationArray = location.pathname.split("/");
  const filteredArray = locationArray.filter((el) => el != "");

  return (
    <div
      className={`xxs:p-8 sm:px-16 sm:py-8 
        ${
          filteredArray.length <= 1 ? "absolute" : "bg-[#2B2B2B]"
        } top-0 z-10 w-full`}
    >
      <Link to="/">
        <img className="xxs:w-[4.5em] sm:w-[10em]" src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default Navbar;
