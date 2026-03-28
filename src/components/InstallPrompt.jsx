import React, { useState, useEffect, useRef } from 'react';

const InstallPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const autoCloseTimer = useRef(null);
  
  const STORAGE_KEY = 'foodflie_a2hs_dismissed';

  useEffect(() => {
    // Check if device is iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIos(ios);

    const isDismissed = () => {
      const dismissedAt = localStorage.getItem(STORAGE_KEY);
      if (!dismissedAt) return false;
      return (new Date().getTime() - parseInt(dismissedAt)) < (24 * 60 * 60 * 1000);
    };

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Initial 3-second delay to show the prompt
    const showTimer = setTimeout(() => {
      if (!isDismissed()) {
        setIsVisible(true);
        startAutoCloseTimer();
      }
    }, 7000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(showTimer);
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    };
  }, []);

  const startAutoCloseTimer = () => {
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    autoCloseTimer.current = setTimeout(() => {
      dismissPopup();
    }, 3000);
  };

  const pauseAutoCloseTimer = () => {
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
  };

  const dismissPopup = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, new Date().getTime().toString());
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      dismissPopup();
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    dismissPopup(); // Close right after they interact with the native prompt
  };

  return (
    <div
      onMouseEnter={pauseAutoCloseTimer}
      onMouseLeave={startAutoCloseTimer}
      className={`fixed left-1/2 -translate-x-1/2 w-max max-w-[90vw] bg-[#141414]/75 backdrop-blur-xl border border-white/15 p-2 pr-4 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.1)] z-[10000] flex items-center gap-3 transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] font-sans ${
        isVisible ? 'bottom-10 opacity-100 scale-100 pointer-events-auto' : '-bottom-24 opacity-0 scale-90 pointer-events-none'
      }`}
    >
      {/* Icon Wrapper */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-[#F4B400] to-[#F09A00]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path>
        </svg>
      </div>

      {/* Text Content */}
      <div className="flex flex-col mr-2">
        <p className="text-sm font-semibold text-white m-0 leading-[1.2]">
          {isIos ? "Add to Home Screen" : "Get the FoodFlie App"}
        </p>
        <p className="text-xs text-white/60 m-0 mt-0.5">
          {isIos ? "Tap Share \u2192 Add to Home Screen" : "For a faster experience"}
        </p>
      </div>

      {/* Install Button (Hidden on iOS) */}
      {!isIos && (
        <button
          onClick={handleInstallClick}
          className="bg-white text-black border-none px-4 py-2 font-semibold rounded-full text-[13px] cursor-pointer whitespace-nowrap transition-all duration-200 hover:bg-[#F4B400] hover:text-white hover:scale-105 active:scale-95"
        >
          Install
        </button>
      )}
    </div>
  );
};

export default InstallPrompt;
