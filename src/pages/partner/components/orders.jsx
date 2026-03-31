import React, { useEffect, useState } from "react";
import SEO from "../../../components/common/seo";
import { getOrderDetails, getPendingOrders } from "../../../services/partnerOrderService";
import { Package, RefreshCw } from "lucide-react";
import { useKitchenAlert } from "../../../hooks/useKitchenAlert";
import OrderCard from "./OrderCard";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("New");
  const [orders, setOrders] = useState([]);
  console.log("Orders component rendered with orders:", orders);  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [checkedItems, setCheckedItems] = useState({});
  const { notifyOnNewOrders } = useKitchenAlert();

  const tabs = ["New", "Picked Up", "Past Orders"];

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => fetchOrders(false), 30000); // 30s auto-refresh
    return () => clearInterval(interval);
  }, [notifyOnNewOrders]);

  const fetchOrders = async (showLoading = true) => {
    if (showLoading) setIsRefreshing(true);
    try {
      const res = await getPendingOrders();
      if (res.data) {
        setOrders(res.data);
        setLastUpdated(new Date());
        notifyOnNewOrders(res.data);
      }
    } catch (e) {
      console.error("Fetch failed", e);
    } finally {
      if (showLoading) setIsRefreshing(false);
    }
  };


  const toggleItemCheck = (orderId, itemId) => {
    setCheckedItems((prev) => {
      const s = new Set(prev[orderId] || []);
      s.has(itemId) ? s.delete(itemId) : s.add(itemId);
      return { ...prev, [orderId]: Array.from(s) };
    });
  };

  const filteredOrders = orders.filter(
    (o) =>
      (activeTab === "New" && ["placed", "assigned"].includes(o.status)) ||
      (activeTab === "Picked Up" && o.status === "picked_up") ||
      (activeTab === "Past Orders" && o.status === "delivered"),
  );

  return (
    <div className="flex flex-col w-full bg-slate-50">
      <SEO title="Manage Orders" />
      <div className="border-b bg-white shrink-0 flex flex-col sm:flex-row justify-between shadow-sm z-10 sticky top-0">
        <div className="flex overflow-x-auto px-6">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-6 py-4 text-sm font-bold border-b-2 ${activeTab === t ? "border-[#fc8019] text-[#fc8019]" : "border-transparent text-slate-500"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="px-6 py-2 flex items-center justify-end gap-4 bg-slate-50">
          <span className="text-xs text-slate-400">
            Updated:{" "}
            {lastUpdated.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <button
            onClick={() => fetchOrders(true)}
            disabled={isRefreshing}
            className="flex gap-2 text-sm font-bold bg-white px-3 py-1.5 rounded-lg border"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#fc8019]" : ""}`}
            />{" "}
            Refresh
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6 pb-20">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Package className="w-16 h-16 text-slate-300 mb-4" />
            <h2 className="text-xl font-bold text-slate-600">
              No {activeTab} Orders
            </h2>
          </div>
        ) : (
          <div className="max-w-[1200px] mx-auto space-y-6 pb-6">
            {filteredOrders.map((o) => (
              <OrderCard
                key={o.id}
                order={o}
                activeTab={activeTab}
                isChecked={(oid, iid) =>
                  (checkedItems[oid] || []).includes(iid)
                }
                toggleItemCheck={toggleItemCheck}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
