import React from "react";

const LoadingCart = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-[3px] border-slate-100"></div>
        <div className="absolute inset-0 rounded-full border-[3px] border-zepto-purple border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-zepto-purple/10 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCart;
