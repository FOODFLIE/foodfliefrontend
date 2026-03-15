import React, { useState } from "react";
import { Search, Plus, MoreVertical, Edit2, X } from "lucide-react";
import SEO from "../../../components/common/seo";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("New");

  const tabs = ["New", "Preparing", "Ready", "Picked Up", "Past Orders"];

  return (
    <div className="flex flex-col h-full bg-white">
      <SEO title="Manage Orders" />
      {/* Tabs */}
      <div className="border-b border-slate-200 flex px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[#fc8019] text-[#fc8019]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#f2f4f6]">
        {/* Empty State Message */}
        <div className="text-center max-w-lg">
          <p className="text-slate-800 font-medium mb-2">
            Updates regarding new orders is disabled right now.
          </p>
          <p className="text-slate-500 mb-8 text-sm">
            Please go to settings if you are managing orders.
          </p>

          <button className="bg-[#171a29] text-white font-bold text-sm px-8 py-3 rounded shadow hover:bg-black transition-colors uppercase tracking-wide">
            Go to Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
