import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Store,
  AlertCircle,
  ChevronRight,
  Tag,
  MapPin,
  Navigation,
  QrCode,
} from "lucide-react";
import {
  getCart,
  updateCartItem,
  removeFromCart,
} from "../services/cartService";
import { placeOrder, submitPayment } from "../services/orderService";
import { useCartLocation } from "../context/cartLocationContext";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import EmptyCart from "../components/emptyCart";
import LoadingCart from "../components/loadingCart";
import CartItem from "../components/cartItem";
import BillSummary from "../components/billSummary";
import LocationModal from "../components/modals/locationModal";
import SEO from "../components/common/seo";
import { trackInitiateCheckout, trackPurchase } from "../utils/metaPixel";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    address,
    addressDetails,
    coords,
  } = useCartLocation();
  const { refreshCartCount } = useCart();
  
  // Core state
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [cookingInstructions, setCookingInstructions] = useState("");

  // Payment state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState(null);
  const [utrDigits, setUtrDigits] = useState("");
  const [submittingUtr, setSubmittingUtr] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [paymentMethod] = useState('UPI'); // Default payment method

  // Check device type on mount to handle desktop vs mobile layouts
  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      setIsMobile(isMobileDevice);
    };

    checkDevice();
    fetchCart();
  }, []);

  // Track InitiateCheckout when cart loads
  useEffect(() => {
    if (cart && cart.items && cart.items.length > 0) {
      trackInitiateCheckout({
        totalAmount:
          parseFloat(cart.subtotal) + parseFloat(cart.delivery_fee || 0),
        items: cart.items,
      });
    }
  }, [cart]);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    try {
      await updateCartItem(itemId, newQuantity);
      fetchCart();
      refreshCartCount();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOrderComplete = async () => {
    if (!address) {
      setError("Please add a delivery address to place your order.");
      setIsLocationModalOpen(true);
      return;
    }

    if (!addressDetails) {
      setError("Invalid address. Please select a valid delivery address.");
      return;
    }

    try {
      const orderPayload = {
        ...addressDetails,
        customer_phone: user?.phone || user?.mobile || null,
        latitude: coords?.latitude || null,
        longitude: coords?.longitude || null,
      };

      const currentSubtotal = parseFloat(cart?.subtotal) || 0;
      const currentDeliveryFee = parseFloat(cart?.delivery_fee) || 0;
      const calculatedTotal = currentSubtotal + currentDeliveryFee;

      const response = await placeOrder(
        orderPayload,
        paymentMethod,
        cookingInstructions.trim() || null,
      );

      const orderId = response?.order_id;
      setCreatedOrderId(orderId);

      if (orderId) {
        trackPurchase({
          orderId: orderId,
          totalAmount: calculatedTotal,
          items: cart.items,
        });
      }



      setShowPaymentModal(true);
    } catch (err) {
      setError("Failed to place order: " + err.message);
    }
  };

  const handleUtrSubmit = async (e) => {
    e.preventDefault();
    
    if (utrDigits.length !== 4) {
      setError("Please enter exactly 4 digits from your UTR/Transaction ID.");
      return;
    }

    setSubmittingUtr(true);
    setError("");

    try {
      const data = await submitPayment(createdOrderId, utrDigits.trim());

      await refreshCartCount();
      setShowPaymentModal(false);
      navigate(`/orderConfirmation/${createdOrderId}`);
    } catch (err) {
      setError(err.message || "Payment verification failed. Please try again.");
    } finally {
      setSubmittingUtr(false);
    }
  };



  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      fetchCart();
      refreshCartCount();
    } catch (err) {
      setError(err.message);
    }
  };

  // UPI Configuration
  const UPI_ID = "nanduboda@ibl";
  const MERCHANT_NAME = "FoodFlie";

  // Generate UPI payment URL
  const generateUpiUrl = (amount, orderId) => {
    return `upi://pay?pa=${UPI_ID}&pn=${MERCHANT_NAME}&am=${amount.toFixed(2)}&cu=INR&tn=FoodFlie_Order_${orderId || 'NEW'}`;
  };

  // Generate QR Code URL
  const generateQrCode = (upiUrl) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUrl)}`;
  };

  if (loading) return <LoadingCart />;
  if (!cart || !cart.items || cart.items.length === 0) return <EmptyCart />;

  const subtotal = parseFloat(cart.subtotal) || 0;
  const deliveryFee = parseFloat(cart.delivery_fee) || 0;
  const totalAmount = subtotal + deliveryFee;

  // Generate UPI URLs
  const upiIntentString = generateUpiUrl(totalAmount, createdOrderId);
  const qrCodeFallback = generateQrCode(upiIntentString);

  return (
    <>
      <SEO
        title="Review Your Cart"
        description="Review your order and proceed to checkout. Fast 15-minute delivery with menu prices only."
      />

      <div
        className={`min-h-screen bg-[#fafafa] pb-32 pt-8 md:pt-14 relative z-0 transition-all duration-200 ${showPaymentModal ? "blur-md select-none pointer-events-none" : ""}`}
      >
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-brand-muted/70 via-white/40 to-transparent -z-10" />

        <div className="responsive-container">
          <div className="max-w-[1080px] mx-auto">
            <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-4xl leading-none font-bold text-slate-900 tracking-tighter mb-2 md:mb-3">
                  Review Cart
                </h1>
                <div className="flex items-center gap-3 text-slate-500 font-medium text-sm md:text-base">
                  <span className="bg-white px-3 py-1 rounded-full border border-slate-200/60 shadow-sm text-slate-700 font-semibold text-xs md:text-sm">
                    {cart.items.length} item{cart.items.length !== 1 ? "s" : ""}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="flex items-center gap-1.5 text-sm md:text-lg font-medium">
                    <Store size={16} className="text-slate-400 md:w-[18px]" />
                    {cart.partner_name}
                  </span>
                </div>
              </div>

              <div className="bg-brand-muted/80 border border-brand-light text-brand px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl flex items-center gap-2 font-semibold shadow-sm backdrop-blur-md self-start md:self-auto text-xs md:text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></div>
                Delivery in 15 mins
              </div>
            </div>

            {error && !showPaymentModal && (
              <div className="mb-8 bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm animate-fade-in">
                <AlertCircle size={22} className="text-rose-500" />
                <p className="text-sm font-semibold text-rose-700">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)]">
                  <div className="p-5 md:p-8">
                    <div className="flex items-start justify-between gap-3 md:gap-4">
                      <div className="flex items-start gap-3 md:gap-4 flex-1">
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-brand-muted rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                          <MapPin className="text-brand fill-brand/10 w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base md:text-lg font-black text-slate-800 leading-tight">
                              Delivery Address
                            </h3>
                            {addressDetails?.category && (
                              <span className="px-1.5 py-0.5 bg-slate-100 text-[9px] md:text-[10px] font-black uppercase text-slate-500 rounded-md tracking-wider">
                                {addressDetails.category}
                              </span>
                            )}
                          </div>
                          {address ? (
                            <div className="mt-1">
                              {addressDetails?.buildingName && (
                                <p className="text-slate-800 font-bold text-xs md:text-sm">
                                  {addressDetails.buildingName}{" "}
                                  {addressDetails.companyFloor &&
                                    `, ${addressDetails.companyFloor}`}
                                </p>
                              )}
                              <p className="text-slate-500 font-medium line-clamp-2 text-[11px] md:text-sm leading-relaxed mt-0.5">
                                {addressDetails?.fullAddress || address}
                              </p>
                            </div>
                          ) : (
                            <p className="text-rose-500 font-bold mt-1 text-xs md:text-sm">
                              No delivery address selected
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setIsLocationModalOpen(true)}
                        className="px-4 py-2 md:px-6 md:py-2.5 bg-slate-900 text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 shrink-0"
                      >
                        {address ? "Change" : "Add"}
                      </button>
                    </div>

                    {!address && (
                      <button
                        onClick={() => setIsLocationModalOpen(true)}
                        className="mt-4 md:mt-6 w-full py-3 md:py-4 border-2 border-dashed border-slate-200 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 text-slate-400 font-bold hover:border-pink-200 hover:text-pink-500 hover:bg-pink-50/30 transition-all group text-xs md:text-base animate-pulse"
                      >
                        <Navigation
                          size={16}
                          className="group-hover:rotate-45 transition-transform md:w-[18px]"
                        />
                        Set address to place order
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)] relative">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand to-brand-dark"></div>

                  <div className="p-5 md:p-8 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-[1.25rem] border border-slate-100 flex items-center justify-center shadow-sm relative overflow-hidden group-hover:border-brand-light transition-colors shrink-0">
                        <Store
                          size={22}
                          className="text-slate-700 relative z-10 md:w-[26px]"
                          strokeWidth={1.5}
                        />
                        <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                          {cart.partner_name}
                        </h2>
                        <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5 md:mt-1">
                          Review your items before checkout
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {cart.items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-brand-muted/30 rounded-2xl md:rounded-[2rem] p-4 md:p-6 border border-brand-light/60 shadow-[0_8px_20px_rgb(0,0,0,0.02)] flex items-center justify-between gap-3 md:gap-4 group cursor-pointer hover:border-brand-light hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-all">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-light/50 rounded-xl md:rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform shrink-0">
                      <Tag size={20} className="text-brand md:w-[22px]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-base md:text-lg">
                        Apply Coupon
                      </h4>
                      <p className="text-xs md:text-sm text-slate-500 font-medium">
                        Log in to view offers
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-slate-300 group-hover:text-brand transition-colors group-hover:translate-x-1 md:w-[20px]"
                    strokeWidth={2.5}
                  />
                </div>

                <div className="bg-white rounded-2xl md:rounded-[2rem] p-4 md:p-6 border border-slate-200/60 shadow-[0_8px_20px_rgb(0,0,0,0.02)] cursor-text transition-all focus-within:border-slate-300 focus-within:shadow-md">
                  <textarea
                    placeholder="Any cooking instructions? (e.g. Less spicy, extra sauce)"
                    className="w-full bg-transparent outline-none resize-none font-medium text-slate-700 placeholder:text-slate-400 text-xs md:text-sm"
                    rows="2"
                    value={cookingInstructions}
                    onChange={(e) => setCookingInstructions(e.target.value)}
                    maxLength={200}
                  ></textarea>
                  {cookingInstructions.length > 0 && (
                    <div className="mt-2 text-xs text-slate-500">
                      {cookingInstructions.length}/200 characters
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 relative mt-4 lg:mt-0">
                <BillSummary
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  totalAmount={totalAmount}
                  onOrderComplete={handleOrderComplete}
                  isAddressSelected={!!address}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- UPI PAYMENT MODAL --- */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-scale-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">💳</span>
              </div>
              <h3 className="text-lg font-bold mb-1">Pay ₹{totalAmount.toFixed(2)}</h3>
              <p className="text-emerald-100 text-xs">Order #{createdOrderId}</p>
            </div>

            <div className="p-4">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              {/* Payment Options */}
              {isMobile ? (
                /* Mobile UPI Payment */
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.href = upiIntentString}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>📱</span>
                    <span>Open UPI App</span>
                  </button>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2">Or pay manually:</p>
                    <div className="bg-gray-50 rounded-lg p-3 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span>UPI ID:</span>
                        <div className="flex items-center gap-1">
                          <code className="bg-white px-1 rounded text-xs">{UPI_ID}</code>
                          <button
                            onClick={() => navigator.clipboard.writeText(UPI_ID)}
                            className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Desktop QR Code */
                <div className="text-center space-y-3">
                  <div className="inline-block bg-white p-2 rounded-lg border">
                    <img
                      src={qrCodeFallback}
                      alt="UPI Payment QR Code"
                      className="w-32 h-32 rounded"
                    />
                  </div>
                  <p className="text-xs text-gray-600">Scan with any UPI app</p>
                  
                  <div className="bg-gray-50 rounded-lg p-3 text-xs">
                    <p className="font-medium mb-2">Manual Payment:</p>
                    <div className="flex justify-between items-center">
                      <span>UPI ID:</span>
                      <div className="flex items-center gap-1">
                        <code className="bg-white px-1 rounded text-xs">{UPI_ID}</code>
                        <button
                          onClick={() => navigator.clipboard.writeText(UPI_ID)}
                          className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Verification */}
              <div className="mt-4 pt-4 border-t">
                <form onSubmit={handleUtrSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                      Enter last 4 digits of UTR
                    </label>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="1234"
                      value={utrDigits}
                      onChange={(e) => setUtrDigits(e.target.value.replace(/\D/g, ""))}
                      disabled={submittingUtr}
                      className="w-full text-center text-xl font-mono tracking-wider py-2 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors disabled:bg-gray-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingUtr || utrDigits.length !== 4}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    {submittingUtr ? "Verifying..." : "Complete Order"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        hideCurrentLocation={true}
        useCartContext={true}
      />
    </>
  );
};

export default Cart;
