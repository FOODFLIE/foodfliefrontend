import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Package,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  Star,
} from "lucide-react";
import { getCustomerOrders } from "../../services/orderService";
import { useAuth } from "../../context/authContext";
import SEO from "../../components/common/seo";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getCustomerOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle2 className="text-green-500" size={18} />;
      case "cancelled":
        return <XCircle className="text-slate-400" size={18} />;
      default:
        return <Clock className="text-amber-500" size={18} />;
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "Order delivered";
      case "cancelled":
        return "Order cancelled";
      case "preparing":
        return "Preparing your order";
      case "out_for_delivery":
        return "Out for delivery";
      default:
        return status || "Order placed";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-brand/20 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <SEO title="My Orders" />
      {/* Header */}
      <div className="glass-morphism sticky top-0 z-30">
        <div className="responsive-container py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 hover:bg-slate-50/50 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-slate-700" />
          </button>
          <h1 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight italic">
            Orders
          </h1>
        </div>
      </div>

      <div className="responsive-container py-6">
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={36} className="text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              No orders yet
            </h3>
            <p className="text-slate-500 font-medium mb-8">
              Looks like you haven't placed any orders yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-brand text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-xl transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/profile/order/${order.id}`)}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 overflow-hidden cursor-pointer group"
              >
                <div className="p-6">
                  {/* Order Items Preview */}
                  <div className="flex gap-4 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="shrink-0">
                        <img
                          src={item.product?.image || "/placeholder-food.png"}
                          alt={item.product?.name}
                          className="w-16 h-16 object-cover rounded-2xl border border-slate-50 hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-base">
                          {getStatusText(order.status)}
                        </span>
                        {getStatusIcon(order.status)}
                      </div>
                      <p className="text-slate-400 text-sm font-medium">
                        Placed at {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-slate-900">
                        ₹{order.total_amount}
                      </span>
                      <ChevronRight size={18} className="text-slate-400" />
                    </div>
                  </div>
                </div>

                {order.status?.toLowerCase() === "delivered" && (
                  <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-50 flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          "https://www.instagram.com/foodflie?igsh=MWNraGIxdHdqbmYycg==",
                          "_blank",
                          "noopener,noreferrer",
                        );
                      }}
                      className="text-slate-700 font-medium text-[11px] sm:text-xs underline underline-offset-4 decoration-brand/70 hover:text-brand transition-colors"
                    >
                      Thanks for ordering – follow us on Instagram
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
