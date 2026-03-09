import React, { useState, useEffect } from "react";
import {
  MapPin,
  Plus,
  Home,
  Briefcase,
  Navigation,
  Trash2,
} from "lucide-react";
import { fetchAddresses, saveAddress } from "../../services/addressService";
import LocationModal from "../../components/modals/locationModal";
import SEO from "../../components/common/seo";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const data = await fetchAddresses();
      setAddresses(Array.isArray(data) ? data : data?.addresses || []);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "home":
        return <Home className="w-5 h-5" />;
      case "work":
        return <Briefcase className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-zepto-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <SEO title="My Addresses" />
      <div className="min-h-screen bg-slate-50 pb-20 pt-6">
        <div className="responsive-container max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                My Addresses
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Manage your delivery locations
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-zepto-purple text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-zepto-dark transition-colors shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                No Addresses Yet
              </h3>
              <p className="text-slate-600 mb-6">
                Add your first delivery address to get started
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-zepto-purple text-white px-6 py-3 rounded-xl font-bold hover:bg-zepto-dark transition-colors"
              >
                Add Address
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-zepto-purple hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-zepto-purple">
                        {getCategoryIcon(address.category)}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 capitalize">
                          {address.category || "Other"}
                        </h3>
                        {address.building_name && (
                          <p className="text-xs text-slate-600 font-bold">
                            {address.building_name}
                          </p>
                        )}
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {address.company_floor && (
                      <p className="text-sm text-slate-700 font-medium">
                        {address.company_floor}
                      </p>
                    )}
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {address.full_address || address.address}
                    </p>
                    {address.landmark && (
                      <p className="text-xs text-slate-500">
                        <span className="font-bold">Landmark:</span>{" "}
                        {address.landmark}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    {address.latitude && address.longitude && (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Navigation className="w-3 h-3" />
                        <span>
                          {parseFloat(address.latitude).toFixed(4)},{" "}
                          {parseFloat(address.longitude).toFixed(4)}
                        </span>
                      </div>
                    )}
                    {address.is_default && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <LocationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          loadAddresses();
        }}
      />
    </>
  );
};

export default Addresses;
