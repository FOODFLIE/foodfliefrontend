import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-xl sm:text-2xl font-black text-zepto-purple tracking-tighter italic font-poppins"
    >
      Food Flie
    </Link>
  );
};

export default Logo;
