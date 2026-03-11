import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-muted/80 to-transparent -z-10" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brand-light rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      <div className="bg-white/80 backdrop-blur-2xl p-10 md:p-14 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-white/60 text-center max-w-lg w-full transform transition-all hover:-translate-y-1 hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.06)] duration-500 relative z-10">
        <div className="relative w-36 h-36 mx-auto mb-10 group">
          <div className="absolute inset-0 bg-brand-light rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-transparent rounded-full rotate-45 transform group-hover:rotate-90 transition-transform duration-700"></div>
          <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-[inset_0_2px_20px_rgba(0,0,0,0.03)] border border-slate-100 backdrop-blur-sm z-10">
            <ShoppingBag
              size={52}
              strokeWidth={1.5}
              className="text-brand drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute top-2 right-4 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)] animate-pulse"></div>
          <div className="absolute bottom-6 left-2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)] animate-bounce"></div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
          Cart is empty
        </h1>
        <p className="text-slate-500 font-medium mb-12 text-lg leading-relaxed">
          Good food is always cooking! Explore incredible restaurants near you.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full relative overflow-hidden bg-slate-900 text-white py-4 md:py-5 rounded-[1.25rem] font-bold hover:bg-black transition-all flex items-center justify-center gap-3 group shadow-xl shadow-slate-900/20 active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center gap-2 text-[1.05rem] tracking-wide">
            Explore Restaurants
            <ArrowRight
              size={22}
              className="group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer z-0" />
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
