import React from "react";
import { Star, Clock, Zap } from "lucide-react";

const RestaurantHeader = ({ restaurantData }) => {
  if (!restaurantData) return null;

  return (
    <section className="bg-brand-grey/40 border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 relative overflow-hidden">
      <div className="relative z-10 flex-1">
        <h1 className="text-2xl md:text-5xl font-black text-slate-800 tracking-tighter mb-4 uppercase italic font-poppins">
          {restaurantData.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-slate-500 font-bold text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-brand text-white px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md shadow-brand/10">
              <Star size={12} fill="currentColor" /> {restaurantData.rating}
            </div>
            <span className="hidden text-red-500 sm:inline">Menu Price</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-brand" />
            <span>{restaurantData.time} Delivery</span>
          </div>
          <p className="text-brand hidden sm:block">
            {restaurantData.cuisines?.join
              ? restaurantData.cuisines.join(" • ")
              : typeof restaurantData.cuisines === "string"
              ? restaurantData.cuisines
              : "Restaurant"}
          </p>
        </div>
      </div>

      <div className="relative z-10 bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-50 shadow-lg max-w-full md:max-w-xs w-full">
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <Zap
            size={20}
            className="text-brand animate-pulse"
            fill="currentColor"
          />
          <h3 className="font-black text-slate-800 uppercase tracking-tighter italic text-sm md:text-base">
            Active Offer
          </h3>
        </div>
        <p className="text-brand font-black text-lg md:text-xl mb-1">
          {restaurantData.offer}
        </p>
        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Valid on all items above ₹199
        </p>
      </div>
    </section>
  );
};

export default RestaurantHeader;
