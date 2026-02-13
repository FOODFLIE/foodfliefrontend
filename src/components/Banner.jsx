import React from "react";
import { BadgeCheck, Sparkles } from "lucide-react";

const Banner = ({ image, badgeText, title, titleHighlight, subtitle }) => {
  return (
    <div className="w-full h-50 md:h-80 rounded-[3rem] overflow-hidden mb-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] relative cursor-pointer group bg-slate-900">
      {/* Background Image with Ken Burns effect */}
      <img
        src={
          image ||
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop"
        }
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10000ms] ease-out opacity-90"
        alt="Promotion"
      />

      {/* Designer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-zepto-dark/60 via-transparent to-black/20" />

      {/* Mesh Gradient Overlay (Animated Subtle) */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_0%,#5e17eb_0%,transparent_50%),radial-gradient(circle_at_100%_100%,#f0ab3f_0%,transparent_50%)]" />

      {/* Content Container (Asymmetric Layout) */}
      <div className="absolute inset-0 flex items-center px-8 md:px-16">
        <div className="max-w-xl space-y-6 relative z-10">
          {/* Glassmorphic Badge */}
          {badgeText && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-2xl text-[10px] font-black w-fit uppercase tracking-[0.2em] shadow-xl animate-pulse">
              <BadgeCheck size={14} className="text-zepto-green" /> {badgeText}
            </div>
          )}

          <div className="space-y-2">
            <h2 className="text-xl md:text-5xl font-black tracking-tighter leading-[0.9] text-white font-poppins drop-shadow-2xl">
              {title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 italic">
                {titleHighlight}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white font-medium max-w-md leading-tight italic">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Floating Decorative Elements (Designer Touch) */}
        <div className="hidden lg:flex flex-1 justify-end h-full items-center pr-12 pointer-events-none">
          <div className="w-64 h-64 rounded-full border-[24px] border-white/5 absolute -right-12 -bottom-12 animate-spin-slow" />
          <div className="w-96 h-96 rounded-full border-[1px] border-white/10 absolute -right-24 -top-24" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
