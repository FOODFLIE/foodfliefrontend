import React from "react";
import { Receipt, ShieldCheck } from "lucide-react";
import SlideToOrder from "./slideToOrder";

const BillSummary = ({
  subtotal,
  deliveryFee,
  handlingFee,
  totalAmount,
  onOrderComplete,
  isAddressSelected = false,
}) => {
  return (
    <div className="bg-white rounded-3xl md:rounded-4xl border border-slate-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-5 md:p-8 sticky top-28">
      <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-6 md:mb-8 flex items-center gap-3">
        <Receipt
          className="text-slate-800 md:w-[24px]"
          size={20}
          strokeWidth={2}
        />
        Bill Summary
      </h2>

      <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
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

      {/* Payment method & cancellation notice */}
      <div className="mb-4 md:mb-6 space-y-3">
        <div className="flex justify-between items-center text-[11px] md:text-xs font-semibold text-slate-600">
          <span className="uppercase tracking-[0.16em] text-slate-400">
            Payment Method
          </span>
          {/* Green UI indicator for instant digital payments */}
          <span className="text-emerald-600 font-bold flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Pay via UPI
          </span>
        </div>
        
        <div className="bg-red-50/60 border border-red-100 rounded-xl px-3 py-2 flex items-start gap-2">
          <span className="mt-px text-[12px] md:text-sm font-black text-red-500">
            !
          </span>
          <p className="text-[10px] md:text-xs font-semibold text-slate-700 leading-relaxed">
            Please note: Once the payment is submitted, it cannot be canceled as the
            restaurant begins preparation immediately.
          </p>
        </div>
      </div>

      <SlideToOrder 
        onComplete={onOrderComplete} 
        disabled={!isAddressSelected}
        label={isAddressSelected ? "Slide to Pay via UPI" : "Set Address to Pay"}
      />

      <div className="mt-6 md:mt-8 flex items-center justify-center gap-3">
        <ShieldCheck size={16} className="text-emerald-600 md:w-[18px]" />
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          100% SECURE CHECKOUT
        </span>
      </div>
    </div>
  );
};

export default BillSummary;