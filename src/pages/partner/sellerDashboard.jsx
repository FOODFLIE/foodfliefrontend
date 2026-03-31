import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  Utensils,
  HelpCircle,
  Power,
} from "lucide-react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { storeToggle } from "../../services/partnerStoreService";
import SEO from "../../components/common/seo";

const SellerDashboard = () => {
  const { partner, partnerLogout } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (partner?.is_active !== undefined) {
      setIsOnline(partner.is_active);
    }
  }, [partner?.is_active]);

  // Highlight active link based on path
  const isActive = (path) => {
    // Handle root path for orders or exact match
    if (
      path === "" &&
      (location.pathname.endsWith("/dashboard") ||
        location.pathname.endsWith("/dashboard/"))
    )
      return true;
    return location.pathname.includes(path) && path !== "";
  };

  const handleLogout = () => {
    partnerLogout();
    navigate("/partner");
  };

  const handleToggleStore = async () => {
    if (isToggling) return;
    
    const newStatus = !isOnline;
    setIsToggling(true);
    
    try {
      await storeToggle(newStatus);
      setIsOnline(newStatus);
      
      // Update partner data in localStorage
      if (partner) {
        const updatedPartner = { ...partner, is_active: newStatus };
        localStorage.setItem("partner", JSON.stringify(updatedPartner));
      }
    } catch (error) {
      console.error("Failed to toggle store status:", error);
      // Revert on error
      setIsOnline(!newStatus);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-primary text-slate-900">
      <SEO title="Seller Dashboard" />
      {/* Sidebar - Dark Theme */}
      <aside className="w-20 lg:w-24 bg-[#171a29] text-white flex flex-col items-center py-6 fixed h-full z-30">
        {/* Brand/Logo */}
        <div className="mb-8 p-2">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-lg tracking-tighter skew-x-[-10deg]">
            F
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 w-full space-y-2 flex flex-col items-center">
          <NavItem
            icon={ClipboardList}
            label="ORDERS"
            to=""
            active={isActive("")}
          />
          <NavItem
            icon={Utensils}
            label="MENU"
            to="menu"
            active={isActive("menu")}
          />
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto w-full flex flex-col items-center space-y-4 pb-4">
          <button
            title="Help"
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <HelpCircle size={24} />
            <span className="sr-only">Help</span>
          </button>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
          >
            <Power size={24} />
            <span className="sr-only">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-24 flex flex-col h-screen">
        {/* Header - Dark Bar */}
        <header className="bg-[#282c3f] text-white h-16 flex items-center justify-between px-6 shrink-0 z-20 shadow-md">
          <div className="flex items-center gap-6">
            <h1 className="text-base text-white font-bold uppercase tracking-wider">
              {location.pathname.includes("menu") ? "Menu" : "Manage Orders"}
            </h1>
            <div className="h-6 w-px bg-slate-600 mx-2"></div>
            {/* Online Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleStore}
                disabled={isToggling}
                className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${isOnline ? "bg-green-500" : "bg-slate-500"} ${isToggling ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ml-0.5 ${isOnline ? "translate-x-6" : "translate-x-0"}`}
                ></div>
              </button>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[13px] tracking-tight">
                  {partner?.store_name || "Store Name"}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {partner?.address || "Address not available"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-[#fc8019] hover:bg-[#e67312] text-white text-xs font-bold px-4 py-2 rounded shadow-sm transition-colors uppercase">
              FAQs
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 bg-slate-100 overflow-y-scroll partner-scroll">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// Sub-component for Nav Items
const NavItem = ({ icon: Icon, label, to, active, badge }) => (
  <NavLink
    to={to}
    end={to === ""}
    className={`w-full flex flex-col items-center justify-center py-3 px-1 transition-all relative border-l-4 ${active ? "border-[#fc8019] bg-[#282c3f]" : "border-transparent hover:bg-[#282c3f]/50"}`}
  >
    <div className="relative">
      <Icon
        size={22}
        className={`mb-1 ${active ? "text-white" : "text-slate-400"}`}
      />
      {badge && (
        <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
    <span
      className={`text-[9px] font-bold uppercase tracking-widest ${active ? "text-white" : "text-slate-400"}`}
    >
      {label}
    </span>
  </NavLink>
);

export default SellerDashboard;
