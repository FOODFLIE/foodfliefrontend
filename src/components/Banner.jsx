import React from "react";
import { BadgeCheck, Sparkles } from "lucide-react";

const Banner = ({ badgeText, title, titleHighlight, subtitle }) => {
  return (
    <div className="w-full h-[230px] sm:h-[260px] md:h-[340px] rounded-4xl sm:rounded-[3rem] overflow-hidden mb-8 shadow-2xl relative cursor-pointer group bg-slate-900">

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-r from-indigo-950 via-purple-900 to-orange-900" />

      {/* Glow Effects */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 blur-[140px] rounded-full" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center px-6 sm:px-12 md:px-16">
        <div className="max-w-xl space-y-5 relative z-10">

          {/* Badge */}
          {badgeText && (
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[11px] font-bold tracking-wide w-fit uppercase">
              <BadgeCheck size={14} className="text-yellow-400" />
              {badgeText}
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.05]">
            🔥 {title}
            <br />
            <span className="bg-linear-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text italic">
              {titleHighlight}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-white/90 max-w-md">
            {subtitle}
          </p>

          {/* CTA Button */}
   
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="hidden lg:block">
        <div className="absolute -right-16 bottom-[-80px] w-72 h-72 rounded-full border-20 border-white/5 animate-spin-slow" />
        <div className="absolute right-[-100px] top-[-120px] w-96 h-96 rounded-full border border-white/10" />
      </div>
    </div>
  );
};

export default Banner;