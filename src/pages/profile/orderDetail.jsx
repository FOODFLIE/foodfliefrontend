import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  HelpCircle,
  CheckCircle2,
  Copy,
  FileText,
  ArrowRight,
  Package,
  Clock,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { getOrderById } from "../../services/orderService";
import SEO from "../../components/common/seo";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        console.log("1", data);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-zepto-purple/20 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
          <Package size={40} className="text-rose-200" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">
          Order Not Found
        </h2>
        <p className="text-slate-500 mb-8 text-center max-w-sm">
          We couldn't find the order you're looking for. It might have been
          deleted or moved.
        </p>
        <button
          onClick={() => navigate("/profile/orders")}
          className="bg-zepto-purple text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-xl transition-all"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      <SEO title="Order Details" />
      {/* Header */}
      <div className="glass-morphism sticky top-0 z-30 bg-white">
        <div className="responsive-container py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors border border-slate-100 shadow-sm"
            >
              <ChevronLeft size={20} className="text-slate-700" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-sm font-black text-slate-900 tracking-tight">
                Order #{order.id?.toString().toUpperCase()}
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                {order.items?.length || 0}{" "}
                {order.items?.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-100 bg-rose-50/50 text-rose-500 text-[10px] font-black uppercase tracking-wider hover:bg-rose-50 transition-all">
            <HelpCircle size={14} />
            Get Help
          </button>
        </div>
      </div>

      <div className="responsive-container py-6 space-y-6">
        {/* Status Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={24} className="text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 capitalize">
                {order.status || "Delivered"}
              </h2>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                Arrived in
              </span>
              <div className="bg-zepto-light text-zepto-purple px-3 py-1 rounded-lg text-xs font-black italic mt-1">
                ⚡ +14 MINS
              </div>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
              {order.items?.length || 0}{" "}
              {order.items?.length === 1 ? "item" : "items"} in order
            </h3>
          </div>
          <div className="divide-y divide-slate-50">
            {order.items?.map((item, idx) => (
              <div key={idx} className="p-6 flex gap-4 group">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.item_image || "/placeholder-food.png"}
                    alt={item.item_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {item.item_name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 capitalize">
                    {item.quantity} unit{item.quantity > 1 ? "s" : ""}
                    {item.variant && ` • ${item.variant}`}
                  </p>
                </div>
                <div className="text-right py-1">
                  <p className="text-sm font-black text-slate-900">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bill Summary Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center gap-2">
            <FileText size={18} className="text-slate-400" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
              Bill Summary
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-slate-400">Item Total</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-bold">
                  ₹{order.total_amount}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-slate-400">Delivery Fee</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-bold">
                  ₹{order.delivery_fee}
                </span>
              </div>
            </div>
            {Number(order.discount_amount) > 0 && (
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-400">Discount</span>
                <div className="flex items-center gap-2">
                  <span className="text-zepto-green font-bold">
                    -₹{order.discount_amount}
                  </span>
                </div>
              </div>
            )}
            <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
              <span className="text-base font-black text-slate-900 italic">
                Total Bill
              </span>
              <div className="text-right">
                <span className="text-base font-black text-slate-900 tracking-tight">
                  ₹{order.final_amount}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-zepto-light/30 border-t border-slate-50">
            <button className="w-full flex items-center justify-center gap-2 py-3 text-zepto-purple font-black text-[10px] uppercase tracking-widest hover:bg-zepto-light transition-colors rounded-2xl border border-zepto-purple/10">
              Download Invoice / Credit Note
            </button>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
              Order Details
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-1 group">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                Order ID
                <button
                  onClick={() => copyToClipboard(order.id)}
                  className="p-1 hover:bg-slate-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy size={12} className="text-slate-400" />
                </button>
              </p>
              <p className="text-sm font-bold text-slate-700 font-mono tracking-tighter">
                #{order.id?.toString().toUpperCase()}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Receiver Details
              </p>
              <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <User size={14} className="text-slate-300" />
                {order.user?.name || "Nandu"}
              </p>
              <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Phone size={14} className="text-slate-300" />
                {order.user?.phone || "+91 9381972536"}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Payment Details
              </p>
              <p className="text-sm font-bold text-slate-700 uppercase">
                {order.payment_method || "N/A"}{" "}
                <span
                  className={`ml-2 text-[10px] px-2 py-0.5 rounded-full ${
                    order.payment_status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {order.payment_status || "Pending"}
                </span>
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Delivery Address
              </p>
              <p className="text-sm font-bold text-slate-700 flex items-start gap-2 leading-relaxed">
                <MapPin
                  size={14}
                  className="text-slate-300 mt-0.5 flex-shrink-0"
                />
                {order.address && order.address !== "undefined, undefined"
                  ? order.address
                  : "Address not provided"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Order Placed at
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {order.created_at ? formatDate(order.created_at) : "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Order Status Updated
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {order.delivered_at
                    ? formatDate(order.delivered_at)
                    : order.accepted_at
                      ? formatDate(order.accepted_at)
                      : "In Progress"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 p-4 z-40">
        <div className="responsive-container flex gap-4">
          <button className="flex-1 py-4 border-2 border-rose-500 text-rose-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-50 transition-all hover:shadow-md">
            Rate Order
          </button>
          <button className="flex-[1.5] py-4 bg-rose-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 hover:shadow-xl">
            Order Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
