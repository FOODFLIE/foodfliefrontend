import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Calendar,
  Phone,
  User,
  LogOut,
  ChevronRight,
  Package,
  MapPin,
  CreditCard,
  BadgeCheck,
  Store,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../components/AuthModal";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    } else {
      setShowAuthModal(true);
    }
  }, []);

  if (!user) {
    return <AuthModal isOpen={showAuthModal} onClose={() => navigate("/")} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header/Banner Area */}
      <div className="bg-zepto-purple h-48 w-full relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
      </div>

      <div className="responsive-container -mt-24 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-white">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-zepto-light rounded-3xl flex items-center justify-center mb-6 shadow-inner rotate-3 hover:rotate-0 transition-transform duration-500">
                  <span className="text-4xl font-black text-zepto-purple uppercase">
                    {user?.name?.charAt(0) || user?.phone?.charAt(0) || "U"}
                  </span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {user?.name || "Food Flie User"}
                </h1>
                <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">
                  Premium Member
                </p>

                <div className="w-full my-8 space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/50 group hover:border-zepto-purple/20 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-zepto-light text-slate-400 group-hover:text-zepto-purple transition-all">
                      <BadgeCheck size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Member ID
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {user?.id
                          ? `#FF-${user.id.toString().padStart(4, "0")}`
                          : "Guest User"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/50 group hover:border-zepto-purple/20 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-zepto-light text-slate-400 group-hover:text-zepto-purple transition-all">
                      <Phone size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Phone
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {user?.phone || "No phone added"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/50 group hover:border-zepto-purple/20 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-zepto-light text-slate-400 group-hover:text-zepto-purple transition-all">
                      <Calendar size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Joined On
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {user?.created_at
                          ? formatDate(user.created_at)
                          : "Join Date Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-4 text-rose-500 font-bold text-sm bg-rose-50 rounded-2xl hover:bg-rose-100 transition-colors border border-rose-100"
                >
                  <LogOut size={18} />
                  Logout Session
                </button>
              </div>
            </div>

            {/* Loyalty Card */}
            <div className="bg-zepto-dark rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              <p className="text-sm font-bold opacity-60 italic">
                Food Flie Gold
              </p>
              <h3 className="text-2xl font-black mt-1">Save ₹240/mo</h3>
              <p className="text-xs mt-4 font-medium opacity-80 leading-relaxed">
                Enjoy free deliveries on orders above ₹149 and extra 10% off on
                all restaurants.
              </p>
              <button className="mt-6 text-xs font-black uppercase tracking-widest bg-white text-zepto-purple px-6 py-3 rounded-xl hover:shadow-xl transition-all">
                Know More
              </button>
            </div>
          </div>

          {/* Right Column: Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Partner Card */}
            <div
              className="bg-gradient-to-r from-zepto-purple to-zepto-dark rounded-3xl p-6 text-white flex items-center justify-between relative overflow-hidden group cursor-pointer"
              onClick={() => navigate("/partner")}
            >
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                <Store size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black italic tracking-tight">
                  Partner with FoodFlie
                </h3>
                <p className="text-sm font-medium opacity-90 mt-1 max-w-[200px]">
                  Grow your business with 0% commission for the first month.
                </p>
                <button className="mt-4 bg-white text-zepto-purple px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-lg transition-all">
                  Register Now
                </button>
              </div>
              <div className="relative z-10 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <Store size={32} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Package, label: "Orders", count: "12" },
                { icon: MapPin, label: "Addresses", count: "3" },
                { icon: CreditCard, label: "Payments", count: "2" },
                { icon: User, label: "Help", count: null },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-zepto-light transition-colors">
                    <item.icon
                      size={22}
                      className="text-slate-400 group-hover:text-zepto-purple transition-colors"
                    />
                  </div>
                  <p className="text-sm font-black text-slate-800 tracking-tight">
                    {item.label}
                  </p>
                  {item.count && (
                    <p className="text-xs font-bold text-zepto-purple mt-1">
                      {item.count} Active
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Recent Orders Placeholder */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 tracking-tight italic">
                  Recent Orders
                </h2>
                <button className="text-xs font-bold text-zepto-purple hover:underline">
                  View All
                </button>
              </div>
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package size={28} className="text-slate-200" />
                </div>
                <p className="text-slate-400 font-bold text-sm">
                  No recent orders found
                </p>
                <p className="text-xs text-slate-300 mt-1 uppercase tracking-widest font-black">
                  Ready to order something delicious?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
