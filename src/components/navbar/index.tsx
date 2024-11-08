import React from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/pngegg.png";

const Navbar: React.FC = () => {
  const location = useLocation();
  const locationArray = location.pathname.split("/");
  const filteredArray = locationArray.filter((el) => el != "");

  return (
    <div
      className={`px-16 py-8 ${
        filteredArray.length <= 1 ? "absolute" : "bg-[#2B2B2B]"
      } top-0 z-10 w-full flex items-center justify-between`}
    >
      <Link to="incorta-react.ts">
        <img className="w-[10em]" src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default Navbar;
