import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Package,
  Store,
} from "lucide-react";
import { getOrderById } from "../services/orderService";
import SEO from "../components/common/seo";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getOrderById(id)
        .then(setOrder)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            Order Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-brand text-white px-6 py-3 rounded-xl font-bold"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-20 pt-6">
      <SEO title="Order Confirmed | FoodFlie" />
      <div className="responsive-container max-w-2xl mx-auto px-4">
        <div className="text-center mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2
              className="w-12 h-12 sm:w-14 sm:h-14 text-white"
              strokeWidth={3}
            />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Your food will arrive in{" "}
            <span className="font-black text-green-600">13 minutes</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 mb-4">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-brand" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Restaurant</p>
              <p className="text-base font-black text-slate-900">
                {order.partner_name || "Restaurant"}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 font-medium">
                Order ID
              </span>
              <span className="text-sm font-black text-slate-900">
                {order.order_id || id}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 font-medium">Items</span>
              <span className="text-sm font-black text-slate-900">
                {order.items?.length || 0} items
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 font-medium">
                Total Amount
              </span>
              <span className="text-lg font-black text-green-600">
                ₹{parseFloat(order.final_amount || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 font-medium">
                Payment
              </span>
              <span className="text-sm font-black text-slate-900">
                {order.payment_method || "COD"}
              </span>
            </div>
          </div>
        </div>

        {order.delivery_address && (
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold mb-1">
                  Delivery Address
                </p>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  {order.delivery_address}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 mb-4">
          <h2 className="text-base sm:text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand" />
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
                <p className="text-sm font-bold text-slate-400">
                  Out for Delivery
                </p>
                <p className="text-xs text-slate-400">Waiting...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => navigate(`/profile/order/${order.id || id}`)}
            className="bg-brand text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-brand-dark transition-colors shadow-lg"
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

        <div className="bg-gradient-to-br from-brand-muted to-white rounded-2xl p-4 sm:p-6 border border-brand-light">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">Need Help?</p>
              <p className="text-xs text-slate-600">We're here for you</p>
            </div>
          </div>
          <button className="w-full bg-white text-brand py-2.5 rounded-lg font-bold text-sm border border-brand-light hover:bg-brand-muted transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
