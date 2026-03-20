import React, { useState, useEffect } from "react";
import {
  MapPin,
  Plus,
  Home,
  Briefcase,
  Navigation,
  Trash2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { fetchAddresses, saveAddress, deleteAddress } from "../../services/addressService";
import LocationModal from "../../components/modals/locationModal";
import SEO from "../../components/common/seo";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [deletedAddress, setDeletedAddress] = useState(null);

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

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (addressId) => {
    const addressToDelete = addresses.find(addr => addr.id === addressId);
    setDeleting(addressId);
    try {
      await deleteAddress(addressId);
      setAddresses(addresses.filter(addr => addr.id !== addressId));
      setDeletedAddress(addressToDelete);
      showToast("Address deleted successfully");
    } catch (error) {
      console.error("Failed to delete address:", error);
      showToast("Failed to delete address", "error");
    } finally {
      setDeleting(null);
      setDeleteConfirm(null);
    }
  };

  const handleUndo = async () => {
    if (!deletedAddress) return;
    try {
      await saveAddress(deletedAddress);
      loadAddresses();
      setDeletedAddress(null);
      setToast(null);
    } catch (error) {
      console.error("Failed to restore address:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <SEO title="My Addresses | FoodFlie" />
      <div className="min-h-screen bg-slate-50 pb-20 pt-6">
        <div className="responsive-container max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                My Addresses
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Manage your delivery locations
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-brand text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-brand-dark transition-colors shadow-lg"
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
                className="bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition-colors"
              >
                Add Address
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-brand hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center text-brand">
                        {getCategoryIcon(address.address_type)}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 capitalize">
                          {address.address_type || "Other"}
                        </h3>
                        {address.address_line1 && (
                          <p className="text-xs text-slate-600 font-bold">
                            {address.address_line1.split(',')[0]}
                          </p>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => setDeleteConfirm(address.id)}
                      disabled={deleting === address.id}
                      className=" text-slate-400 hover:text-rose-500 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {address.address_line1}
                    </p>
                    <p className="text-xs text-slate-500">
                      {address.city}, {address.pincode}
                    </p>
                    {address.contact_name && (
                      <p className="text-xs text-slate-500">
                        <span className="font-bold">Contact:</span> {address.contact_name} - {address.phone}
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

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-lg font-black text-slate-900 text-center mb-2">
              Delete Address?
            </h3>
            <p className="text-sm text-slate-600 text-center mb-6">
              You can undo this action.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${
            toast.type === "error" 
              ? "bg-rose-500 text-white" 
              : "bg-green-500 text-white"
          }`}>
            {toast.type === "error" ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
            <span className="font-bold text-sm">{toast.message}</span>
            {toast.type !== "error" && deletedAddress && (
              <button
                onClick={handleUndo}
                className="ml-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors"
              >
                Undo
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Addresses;
