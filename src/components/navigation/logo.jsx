import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Main_logo.svg";
// import logo from "../../assets/Main_logo.png";

const Logo = () => {
  return (
     <Link to="/" className="flex items-center">
      <img
        src={logo}
        alt="FoodFlie Logo"
        className="h-12 sm:h-16 w-auto"
      />
    </Link>
  );
};

export default Logo;