import React, { useEffect, useState } from "react";
import "./Preloader.css";

const Preloader = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out slightly before the animation ends (around 1.5s)
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    // Completely remove the loader from DOM after fade out transition
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2300);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`preloader-overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="animation-container">
        <div className="motion-blur"></div>
        <div className="delivery-icon">
          <div className="delivery-box"></div>
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
