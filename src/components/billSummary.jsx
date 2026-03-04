import React from "react";
import { Receipt, ShieldCheck } from "lucide-react";
import SlideToOrder from "./slideToOrder";

const BillSummary = ({
  subtotal,
  deliveryFee,
  handlingFee,
  totalAmount,
  onOrderComplete,
}) => {
  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-5 md:p-8 sticky top-28">
      <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-6 md:mb-8 flex items-center gap-3">
        <Receipt
          className="text-slate-800 md:w-[24px]"
          size={20}
          strokeWidth={2}
        />
        Bill Summary
      </h2>

      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        <div className="flex justify-between items-center text-[15px] md:text-lg">
          <span className="text-slate-500 font-medium tracking-wide">
            Item Total
          </span>
          <span className="font-bold text-slate-800">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center text-[15px] md:text-lg">
          <span className="text-slate-500 font-medium tracking-wide">
            Delivery Partner Fee
          </span>
          <span className="font-bold text-slate-800">
            ₹{deliveryFee.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center text-[15px] md:text-lg">
          <span className="text-slate-500 font-medium flex items-center gap-2">
            Platform Fee
            <span className="text-[10px] md:text-[0.65rem] bg-slate-100 border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded flex items-center justify-center font-bold">
              INFO
            </span>
          </span>
          <span className="font-bold text-slate-800">
            ₹{handlingFee.toFixed(2)}
          </span>
        </div>

        <div className="w-full h-px bg-slate-100 my-4 md:my-6"></div>

        <div className="flex justify-between items-end">
          <div>
            <span className="text-lg md:text-xl font-black text-slate-900 block tracking-tight">
              TO PAY
            </span>
          </div>
          <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">
            ₹{totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      <SlideToOrder onComplete={onOrderComplete} />

      <div className="mt-6 md:mt-8 flex items-center justify-center gap-3">
        <ShieldCheck size={16} className="text-[#5e17eb] md:w-[18px]" />
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          100% SECURE CHECKOUT
        </span>
      </div>
    </div>
  );
};

export default BillSummary;
