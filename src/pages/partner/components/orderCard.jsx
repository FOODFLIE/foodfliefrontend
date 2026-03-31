import React from "react";
import { Clock, MapPin, Phone, CheckCircle2, Circle, Package, AlertCircle, CreditCard, Check } from "lucide-react";

export default function OrderCard({ order, activeTab, isChecked, toggleItemCheck }) {
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Unknown";
    const then = new Date(dateString);
    const diffInMinutes = Math.floor((new Date() - then) / 60000);
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hr ago`;
    return then.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <span className="bg-[#fc8019] text-white text-sm font-extrabold px-4 py-1.5 rounded-full shadow-sm">
            Order #{order.id}
          </span>
          <span className="text-slate-600 font-medium text-sm flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <Clock className="w-4 h-4 text-[#fc8019]" /> {formatTimeAgo(order.created_at)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {order.payment_method === "COD" && (
             <span className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold rounded-lg uppercase flex items-center gap-1.5">
               <CreditCard className="w-3.5 h-3.5"/> Cash on Delivery
             </span>
          )}
          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold rounded-lg uppercase">
            {order.status}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 md:p-6 flex flex-col lg:flex-row gap-6">
        
        {/* Packing List */}
        <div className="flex-1 w-full bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-700 uppercase flex items-center gap-2">
              <Package className="w-4 h-4 text-[#fc8019]"/> Packing List
              </h3>
              <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                  {order.items.length} Items
              </span>
          </div>

          <div className="space-y-3">
          {order.items.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleItemCheck(order.id, item.id)}
                className={`flex gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isChecked(order.id, item.id) ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-100 hover:border-[#fc8019]/40"
                }`}
              >
                <div className="mt-1 shrink-0">
                    {isChecked(order.id, item.id) ? <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100" /> : <Circle className="w-6 h-6 text-slate-200" />}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <span className={`flex items-center justify-center min-w-[32px] h-[32px] text-base font-black rounded-lg border ${
                                isChecked(order.id, item.id) ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-900 text-white border-slate-800'
                            }`}>
                            {item.quantity}×
                            </span>
                            <span className={`text-lg font-bold truncate ${isChecked(order.id, item.id) ? "text-slate-400 line-through" : "text-slate-800"}`}>
                            {item.item_name}
                            </span>
                        </div>
                        <div className="flex flex-col text-right">
                            <span className={`font-bold ${isChecked(order.id, item.id) ? 'text-slate-400' : 'text-slate-700'}`}>₹{parseFloat(item.total_price).toFixed(2)}</span>
                            <span className="text-xs text-slate-400">@ ₹{parseFloat(item.price).toFixed(2)}/ea</span>
                        </div>
                    </div>

                    {(item.variant || item.instructions) && (
                    <div className={`mt-2 flex flex-wrap gap-2 ${isChecked(order.id, item.id) ? 'opacity-50' : ''}`}>
                        {item.variant && (
                        <span className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-amber-800 bg-amber-100 px-2 py-1 rounded-md border border-amber-200 uppercase">
                            <AlertCircle className="w-3 h-3" /> Variant: {item.variant}
                        </span>
                        )}
                        {item.instructions && (
                        <span className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-red-700 bg-red-50 px-2 py-1 rounded-md border border-red-100 uppercase">
                            <AlertCircle className="w-3 h-3" /> Note: {item.instructions}
                        </span>
                        )}
                    </div>
                    )}
                </div>
              </div>
          ))}
          </div>
        </div>

        {/* Financials & Actions */}
        <div className="w-full lg:w-[300px] flex flex-col gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase flex flex-col gap-3">
               Customer Details
               <span className="flex items-center gap-2 text-slate-700 font-bold lowercase text-sm"><Phone className="w-4 h-4 text-emerald-600"/> {order.customer_phone || 'N/A'}</span>
               <span className="flex items-start gap-2 text-slate-700 font-medium normal-case text-sm"><MapPin className="w-4 h-4 mt-0.5 text-[#fc8019]"/> {order.address}</span>
            </h4>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Financials</h4>
            <div className="flex justify-between items-center text-sm font-medium mb-3">
              <span className="text-slate-500">Method / Status</span>
              <span className={`text-[0.7rem] font-bold px-2 py-1 rounded-md uppercase ${order.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {order.payment_method} - {order.payment_status}
              </span>
            </div>
            <div className="flex justify-between items-end border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-500 text-sm">TOTAL</span>
              <span className="font-black text-xl text-slate-900">₹{parseFloat(order.final_amount).toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-1">
            {activeTab === "New" && (
              <button className="w-full bg-[#fc8019] hover:bg-[#e67315] transition-colors text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md">
                <Check className="w-5 h-5" /> Accept Order
              </button>
            )}
            {activeTab === "Preparing" && (
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md">
                 <Package className="w-5 h-5" /> Mark Ready
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
