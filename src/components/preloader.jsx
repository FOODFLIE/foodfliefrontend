import React, { useEffect, useState } from "react";
import "./Preloader.css";
import MainLogo from "../assets/Main_logo.png";

const Preloader = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out slightly before the animation ends (around 2s)
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Completely remove the loader from DOM after fade out transition
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`preloader-overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="animation-container">
        <div className="logo-wrapper">
          <img src={MainLogo} alt="FoodFlie Logo" className="preloader-logo" />
          <div className="motion-sparkles">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="brand-info">
        <h1 className="brand-name">FoodFlie</h1>
        <p className="brand-tagline">13 Minute Food Delivery</p>

        <div className="progress-container">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
