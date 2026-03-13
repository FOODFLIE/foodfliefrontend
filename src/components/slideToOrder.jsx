import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronRight, ArrowRight, Check } from "lucide-react";

/**
 * SlideToOrder Component
 * A premium sliding button for finalizing orders with smooth physics and rich aesthetics.
 */
const SlideToOrder = ({ onComplete, disabled = false, label = "Slide to Order" }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const positionRef = useRef(0); // Stable ref for calculations to avoid re-binds

  const THUMB_WIDTH = 64;
  const PADDING = 8;
  const COMPLETION_THRESHOLD = 0.9;

  // Stable handler for movement calculation
  const handleMove = useCallback((currentX) => {
    if (!containerRef.current || disabled) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const maxSlide = containerRect.width - THUMB_WIDTH - PADDING * 2;
    const diff = currentX - startXRef.current;
    const newPosition = Math.max(0, Math.min(diff, maxSlide));

    positionRef.current = newPosition;
    setSliderPosition(newPosition);
  }, [disabled]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    const handleEnd = () => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const maxSlide = containerRect.width - THUMB_WIDTH - PADDING * 2;

      if (positionRef.current >= maxSlide * COMPLETION_THRESHOLD) {
        setSliderPosition(maxSlide);
        setIsSuccess(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 600);
      } else {
        setSliderPosition(0);
        positionRef.current = 0;
      }
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove, onComplete]);

  const handleStart = (e) => {
    if (isSuccess || disabled) return;
    setIsDragging(true);
    const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    startXRef.current = clientX - sliderPosition;
  };

  const getPercentage = () => {
    if (!containerRef.current) return 0;
    const containerRect = containerRef.current.getBoundingClientRect();
    const maxSlide = containerRect.width - THUMB_WIDTH - PADDING * 2;
    return Math.min(100, (sliderPosition / maxSlide) * 100);
  };

  const progress = getPercentage();

  return (
    <div className={`mt-8 relative overflow-hidden rounded-[1.5rem] select-none touch-none ${disabled ? "opacity-60 grayscale-[0.5]" : ""}`}>
      <div
        ref={containerRef}
        className={`w-full h-[72px] rounded-[1.5rem] relative overflow-hidden flex items-center shadow-lg transition-colors duration-500 ${
          isSuccess ? "bg-emerald-500" : disabled ? "bg-slate-200" : "bg-slate-900"
        }`}
        style={{ touchAction: "none" }}
      >
        {/* Shimmering Text Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span
            className={`text-sm font-black uppercase tracking-[0.2em] transition-all duration-500 ${
              isSuccess
                ? "opacity-0 translate-y-2"
                : "opacity-100 translate-y-0"
            }`}
          >
            <span className={`relative inline-block ${disabled ? "text-slate-500" : "text-white/20"}`}>
              {label}
              {/* Shimmer overlay */}
              {!disabled && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] animate-shimmer bg-clip-text text-transparent">
                  {label}
                </span>
              )}
            </span>
          </span>

          <span
            className={`absolute flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white transition-all duration-500 ${
              isSuccess
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-2 scale-90"
            }`}
          >
            <Check className="animate-bounce" size={18} strokeWidth={3} />
            Order Placed
          </span>
        </div>

        {/* Dynamic Progress Fill */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/40 transition-all z-10"
          style={{
            width: `${progress + 15}%`,
            opacity: isSuccess || disabled ? 0 : 1,
            transition: isDragging
              ? "none"
              : "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />

        {/* The Slide Thumb */}
        <div
          className={`absolute left-2 top-2 bottom-2 w-16 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center z-20 transition-transform ${
            isDragging ? "scale-95 shadow-xl" : "scale-100"
          } ${disabled ? "bg-slate-100 cursor-not-allowed" : "bg-white cursor-grab"}`}
          style={{
            transform: `translateX(${sliderPosition}px)`,
            transition: isDragging
              ? "none"
              : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
            {/* Glossy overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br from-white via-transparent ${disabled ? "to-slate-100" : "to-slate-200/50"}`} />

            {!isSuccess ? (
              <div className="relative z-10 flex items-center transition-all duration-300">
                <ChevronRight
                  size={24}
                  strokeWidth={3}
                  className={`${disabled ? "text-slate-400" : "text-slate-900"} transition-all duration-300 ${
                    progress > 50
                      ? "opacity-0 -translate-x-2"
                      : "opacity-100 translate-x-0"
                  }`}
                />
                <ArrowRight
                  size={24}
                  strokeWidth={3}
                  className={`absolute ${disabled ? "text-slate-400" : "text-slate-900"} transition-all duration-300 ${
                    progress > 50
                      ? "opacity-100 translate-x-0 scale-110"
                      : "opacity-0 translate-x-2 scale-75"
                  }`}
                />
              </div>
            ) : (
              <Check
                className="text-emerald-500 relative z-10 scale-125"
                strokeWidth={3}
              />
            )}

            {/* Inner thumb pulse when idle */}
            {!isDragging && !isSuccess && !disabled && (
              <div className="absolute inset-0 bg-slate-400/10 animate-ping rounded-full scale-50" />
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `,
        }}
      />
    </div>
  );
};

export default SlideToOrder;
