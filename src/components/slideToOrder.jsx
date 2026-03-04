import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";

const SlideToOrder = ({ onComplete }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const startXRef = useRef(0);

  const THUMB_WIDTH = 64;
  const PADDING = 8;
  const COMPLETION_THRESHOLD = 0.85;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const maxSlide = containerRect.width - THUMB_WIDTH - PADDING * 2;
      const currentX = e.clientX || e.touches?.[0]?.clientX;
      const diff = currentX - startXRef.current;
      const newPosition = Math.max(0, Math.min(diff, maxSlide));
      
      setSliderPosition(newPosition);
    };

    const handleMouseUp = () => {
      if (!isDragging || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const maxSlide = containerRect.width - THUMB_WIDTH - PADDING * 2;
      
      if (sliderPosition > maxSlide * COMPLETION_THRESHOLD) {
        setSliderPosition(maxSlide);
        setTimeout(() => onComplete(), 300);
      } else {
        setSliderPosition(0);
      }
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, sliderPosition, onComplete]);

  const handleStart = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX || e.touches?.[0]?.clientX;
  };

  const maxSlide = containerRef.current 
    ? containerRef.current.getBoundingClientRect().width - THUMB_WIDTH - PADDING * 2 
    : 260;
  const isCompleting = sliderPosition > maxSlide * COMPLETION_THRESHOLD;

  return (
    <div className="mt-8 relative pt-2">
      <div 
        ref={containerRef}
        className="w-full bg-slate-900 h-20 rounded-[1.25rem] relative overflow-hidden flex items-center shadow-xl shadow-slate-900/15 group"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none w-full pr-4">
          <span className={`text-[1.05rem] font-bold tracking-wide transition-all duration-300 ml-12 ${
            isCompleting ? "text-white scale-95" : "text-slate-400 group-hover:text-slate-300"
          }`}>
            {isCompleting ? "Processing..." : "Slide to Complete Order"}
          </span>
        </div>

        <div
          className="absolute left-2 top-2 bottom-2 w-16 bg-white rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing z-20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          style={{
            transform: `translateX(${sliderPosition}px)`,
            transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <ChevronRight
              size={24}
              strokeWidth={2.5}
              className={`text-slate-900 transition-all duration-300 ${
                sliderPosition > 50 ? "opacity-0 scale-50" : "opacity-100 scale-100"
              }`}
            />
            <ArrowRight
              size={24}
              strokeWidth={2.5}
              className={`absolute text-slate-900 transition-all duration-300 ${
                sliderPosition > 50 ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            />
          </div>
        </div>

        <div
          className="absolute top-0 left-0 h-full bg-zepto-green opacity-95 transition-all z-10 rounded-[1.25rem]"
          style={{
            width: sliderPosition > 0 ? `${sliderPosition + 60}px` : "0px",
            transition: isDragging ? "none" : "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </div>
    </div>
  );
};

export default SlideToOrder;
