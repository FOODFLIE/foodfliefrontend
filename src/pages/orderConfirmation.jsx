import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, Clock, MapPin, Phone, Package } from "lucide-react";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);
  const orderId = location.state?.orderId || "ORD" + Date.now();
  console.log(location);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-20 pt-6">
      <div className="responsive-container max-w-2xl mx-auto px-4">
        {/* Success Animation */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
              <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-white" strokeWidth={3} />
            </div>
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute top-4 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping animation-delay-200"></div>
                <div className="absolute top-4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping animation-delay-400"></div>
              </div>
            )}
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Your food will arrive in <span className="font-black text-green-600">13 minutes</span>
          </p>
        </div>

        {/* Order ID Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-bold mb-1">Order ID</p>
              <p className="text-lg sm:text-xl font-black text-slate-900">{orderId}</p>
            </div>
            <div className="bg-green-100 px-3 py-1.5 rounded-full">
              <p className="text-xs font-black text-green-700">CONFIRMED</p>
            </div>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 mb-4">
          <h2 className="text-base sm:text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-zepto-purple" />
            Delivery Timeline
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">Order Placed</p>
                <p className="text-xs text-slate-500">Just now</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">Preparing</p>
                <p className="text-xs text-slate-500">In progress...</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-400">Out for Delivery</p>
                <p className="text-xs text-slate-400">Waiting...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => navigate("/orders")}
            className="bg-zepto-purple text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-zepto-dark transition-colors shadow-lg"
          >
            Track Order
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-white text-slate-900 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-slate-50 transition-colors border-2 border-slate-200"
          >
            Order More
          </button>
        </div>

        {/* Support Card */}
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-4 sm:p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-zepto-purple" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">Need Help?</p>
              <p className="text-xs text-slate-600">We're here for you</p>
            </div>
          </div>
          <button className="w-full bg-white text-zepto-purple py-2.5 rounded-lg font-bold text-sm border border-purple-200 hover:bg-purple-50 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
