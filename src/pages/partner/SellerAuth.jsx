import React, { useState } from "react";
import {
  Smartphone,
  ArrowRight,
  Store,
  MapPin,
  CreditCard,
  FileText,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Clock,
  Calendar,
  UploadCloud,
  ChevronRight,
  User,
  Mail,
  Building,
  Briefcase,
  Check,
} from "lucide-react";
import { useSellerAuth } from "../../hooks/useSellerAuth";
import SEO from "../../components/common/seo";

const SellerAuth = () => {
  const {
    step,
    registrationStep,
    nextRegistrationStep,
    prevRegistrationStep,
    loading,
    success,
    error,
    formData,
    handleInputChange,
    toggleWorkingDay,
    handleSendOTP,
    handleVerifyOTP,
    handleRegister,
    resetStep,
  } = useSellerAuth();

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const renderRegistrationStep = () => {
    if (success) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-zepto-green" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
            Application Submitted!
          </h2>
          <p className="text-slate-500 text-center max-w-md mb-8">
            Thank you for registering with FoodFlie. We are redirecting you to
            your dashboard...
          </p>
          <div className="flex items-center gap-2 text-zepto-purple font-bold">
            <Loader2 className="animate-spin" size={20} />
            Redirecting...
          </div>
        </div>
      );
    }

    switch (registrationStep) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Restaurant Information
              </h3>
              <p className="text-slate-500 text-sm">
                Location, Owner details, Contact info.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">
                Basic Details
              </h4>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Owner's Full Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="block w-full border-slate-200 rounded-xl focus:ring-zepto-purple focus:border-transparent py-3 px-4 bg-slate-50 focus:bg-white transition-all"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Restaurant Name*
                  </label>
                  <input
                    type="text"
                    name="store_name"
                    required
                    className="block w-full border-slate-200 rounded-xl focus:ring-zepto-purple focus:border-transparent py-3 px-4 bg-slate-50 focus:bg-white transition-all"
                    placeholder="Restaurant Name"
                    value={formData.store_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Restaurant Location*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="address"
                      required
                      className="block w-full border-slate-200 rounded-xl focus:ring-zepto-purple focus:border-transparent py-3 px-4 pr-12 bg-slate-50 focus:bg-white transition-all"
                      placeholder="Complete Address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zepto-purple font-bold text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Area / Locality*
                    </label>
                    <input
                      type="text"
                      name="area"
                      required
                      className="block w-full border-slate-200 rounded-xl focus:ring-zepto-purple focus:border-transparent py-3 px-4 bg-slate-50 focus:bg-white transition-all"
                      placeholder="e.g. Indiranagar"
                      value={formData.area}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="block w-full border-slate-200 rounded-xl focus:ring-zepto-purple focus:border-transparent py-3 px-4 bg-slate-50 focus:bg-white transition-all"
                      placeholder="owner@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">
                Owner Contact Details
              </h4>
              <p className="text-xs text-slate-500">
                To get updates on payments, customer complaints, order
                acceptance, etc
              </p>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Mobile Number*
                </label>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold">+91</span>
                  <span className="text-slate-900 font-bold flex-1">
                    {formData.phone}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 size={10} /> Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={nextRegistrationStep}
                className="bg-zepto-purple text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-zepto-purple/20 hover:bg-zepto-dark transition-all flex items-center gap-2"
              >
                Proceed <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Restaurant Documents
              </h3>
              <p className="text-slate-500 text-sm">
                FSSAI, PAN, GST and Bank account.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700">
                  What's your outlet-type?
                </label>
                <select
                  name="outlet_type"
                  value={formData.outlet_type}
                  onChange={handleInputChange}
                  className="w-full border-slate-200 rounded-xl py-3 px-4 bg-slate-50 focus:bg-white focus:ring-zepto-purple"
                >
                  <option value="">Choose your outlet type</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="cloud_kitchen">Cloud Kitchen</option>
                  <option value="bakery">Bakery</option>
                  <option value="sweet_shop">Sweet Shop</option>
                </select>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">
                Enter PAN & GSTIN details
              </h4>

              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Business/Owner PAN*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="pan_number"
                    required
                    className="block w-full border-slate-200 rounded-xl focus:ring-zepto-purple focus:border-transparent py-3 px-4 uppercase bg-slate-50 focus:bg-white transition-all"
                    placeholder="ABCDE1234F"
                    value={formData.pan_number}
                    onChange={handleInputChange}
                    maxLength={10}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 font-bold text-xs uppercase hover:underline"
                  >
                    Re-Check
                  </button>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  GSTIN
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="gst_number"
                    required
                    className="block w-full border-slate-200 rounded-xl focus:ring-zepto-purple focus:border-transparent py-3 px-4 uppercase bg-slate-50 focus:bg-white transition-all"
                    placeholder="22AAAAA0000A1Z5"
                    value={formData.gst_number}
                    onChange={handleInputChange}
                    maxLength={15}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 font-bold text-xs uppercase hover:underline"
                  >
                    Verify
                  </button>
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  FSSAI License
                </label>
                <input
                  type="text"
                  name="fssai_number"
                  required
                  className="block w-full border-slate-200 rounded-xl focus:ring-zepto-purple focus:border-transparent py-3 px-4 uppercase bg-slate-50 focus:bg-white transition-all"
                  placeholder="14-digit number"
                  value={formData.fssai_number}
                  onChange={handleInputChange}
                  maxLength={14}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">
                Official Bank Details
              </h4>
              <p className="text-xs text-slate-500 -mt-4 mb-4">
                Payments from FoodFlie will be credited here
              </p>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Account Number*
                  </label>
                  <input
                    type="text"
                    name="bank_account_number"
                    required
                    className="block w-full border-slate-200 rounded-xl focus:ring-zepto-purple focus:border-transparent py-3 px-4 bg-slate-50 focus:bg-white transition-all"
                    value={formData.bank_account_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    IFSC Code*
                  </label>
                  <input
                    type="text"
                    name="bank_ifsc"
                    required
                    className="block w-full border-slate-200 rounded-xl focus:ring-zepto-purple focus:border-transparent py-3 px-4 uppercase bg-slate-50 focus:bg-white transition-all"
                    value={formData.bank_ifsc}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevRegistrationStep}
                className="text-slate-500 font-bold hover:text-slate-800 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextRegistrationStep}
                className="bg-zepto-purple text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-zepto-purple/20 hover:bg-zepto-dark transition-all flex items-center gap-2"
              >
                Proceed <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Menu & Operations
              </h3>
              <p className="text-slate-500 text-sm">
                Setup your menu and working hours.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">
                Menu Setup
              </h4>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {formData.menu_file ? (
                    <div className="text-center">
                      <CheckCircle2 className="w-8 h-8 text-zepto-green mb-2 mx-auto" />
                      <p className="text-sm text-slate-900 font-semibold">
                        {formData.menu_file.name}
                      </p>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                      <p className="text-sm text-slate-500">
                        <span className="font-semibold text-zepto-purple">
                          Click to upload
                        </span>{" "}
                        menu
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        PDF or Images (Max 5MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  name="menu_file"
                  className="hidden"
                  onChange={handleInputChange}
                  accept=".pdf,image/*"
                />
              </label>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                  Working days
                </h4>
                <button
                  type="button"
                  className="text-xs font-bold text-orange-500 uppercase"
                >
                  Select All
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {daysOfWeek.map((day) => (
                  <label
                    key={day}
                    className="flex items-center cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.working_days.includes(day) ? "bg-orange-500 border-orange-500" : "border-slate-300 group-hover:border-orange-400"}`}
                    >
                      {formData.working_days.includes(day) && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.working_days.includes(day) || false}
                      onChange={() => toggleWorkingDay(day)}
                    />
                    <span className="ml-3 text-slate-700 font-medium">
                      {day}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">
                Opening & Closing time
              </h4>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-5 h-5 rounded-full border border-orange-500 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                  </div>
                  <span className="text-slate-700 font-medium">
                    I open and close my restaurant at the same time on all
                    working days
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center" />
                  <span className="text-slate-700 font-medium">
                    I've separate daywise timings
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="border border-orange-200 rounded-lg p-4 flex items-center justify-between">
                  <input
                    type="time"
                    name="opening_time"
                    value={formData.opening_time}
                    onChange={handleInputChange}
                    className="bg-transparent font-bold text-lg outline-none w-full"
                  />
                </div>
                <div className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                  <input
                    type="time"
                    name="closing_time"
                    value={formData.closing_time}
                    onChange={handleInputChange}
                    className="bg-transparent font-bold text-lg outline-none w-full"
                  />
                </div>
              </div>

              <button
                type="button"
                className="text-slate-900 font-bold text-sm flex items-center gap-1 hover:underline"
              >
                + Add another slot
              </button>

              <div className="bg-slate-100 p-3 rounded-lg text-xs text-slate-600">
                Longer operational timings ensures you get 1.5X more orders and
                helps you avoid cancellations.
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevRegistrationStep}
                className="text-slate-500 font-bold hover:text-slate-800 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextRegistrationStep}
                className="bg-zepto-purple text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-zepto-purple/20 hover:bg-zepto-dark transition-all flex items-center gap-2"
              >
                Proceed <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Partner Contract
              </h3>
              <p className="text-slate-500 text-sm">
                Final review and agreement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="prose prose-sm text-slate-600 max-h-60 overflow-y-auto">
                <p>
                  <strong>Terms and Conditions</strong>
                </p>
                <p>
                  By registering as a partner with FoodFlie, you agree to comply
                  with our platform policies, food safety standards, and
                  commission structure.
                </p>
                <p>1. You certify that all information provided is accurate.</p>
                <p>
                  2. You permit FoodFlie to display your menu and accept orders
                  on your behalf.
                </p>
                <p>...</p>
              </div>

              <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  name="terms_accepted"
                  checked={formData.terms_accepted}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-zepto-purple rounded border-slate-300 focus:ring-zepto-purple"
                />
                <span className="text-sm font-medium text-slate-800">
                  I accept the Terms of Service and Privacy Policy. I confirm
                  that I am the authorized owner of this establishment.
                </span>
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevRegistrationStep}
                className="text-slate-500 font-bold hover:text-slate-800 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleRegister}
                disabled={loading}
                className="bg-zepto-green text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-zepto-green/20 hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Main Render
  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-900">
      <SEO title="Partner Login/Signup" />
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="font-display font-extrabold text-2xl tracking-tighter">
          FoodFlie{" "}
          <span className="text-zepto-purple text-base font-bold bg-purple-50 px-2 py-0.5 rounded-md ml-1 tracking-normal">
            for partners
          </span>
        </div>
        <div className="text-sm font-medium text-slate-500">
          Need help?{" "}
          <a href="#" className="text-zepto-purple font-bold">
            Contact Support
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 min-h-[calc(100vh-80px)] flex items-center">
        {/* Step 1 & 2 (Login/OTP) - Split Screen */}
        {step < 3 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {/* Left: Hero/Branding (Hidden on mobile) */}
            <div className="hidden lg:flex flex-col justify-center bg-slate-900 rounded-3xl p-12 relative overflow-hidden text-white min-h-[600px]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-zepto-purple rounded-full filter blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-zepto-green rounded-full filter blur-[80px] opacity-30 translate-y-1/3 -translate-x-1/4"></div>

              <div className="relative z-10 space-y-8">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                  <Store size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-display font-extrabold leading-tight mb-4">
                    Grow your business with FoodFlie
                  </h1>
                  <p className="text-lg text-slate-300 max-w-md leading-relaxed">
                    Join thousands of restaurant partners who trust FoodFlie to
                    expand their reach and increase revenue.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">
                      1000+
                    </h3>
                    <p className="text-sm text-slate-400">
                      Restaurant Partners
                    </p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-zepto-green mb-1">
                      1.5X
                    </h3>
                    <p className="text-sm text-slate-400">Revenue Growth</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Login Form */}
            <div className="flex flex-col justify-center max-w-md mx-auto w-full lg:px-8">
              {step === 1 && (
                <form
                  onSubmit={handleSendOTP}
                  className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500"
                >
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                      Welcome Partner!
                    </h2>
                    <p className="text-slate-500 mt-2 font-medium">
                      Enter your mobile number to get started
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <span className="text-slate-500 font-bold group-focus-within:text-zepto-purple transition-colors">
                          +91
                        </span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        className="block w-full pl-14 text-xl font-bold border-2 border-slate-100 rounded-2xl py-4 focus:ring-4 focus:ring-zepto-purple/10 focus:border-zepto-purple transition-all outline-none bg-slate-50 focus:bg-white"
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        maxLength={10}
                        required
                        autoFocus
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-zepto-purple text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-zepto-purple/20 hover:bg-zepto-dark hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 group"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>
                          Get OTP{" "}
                          <ArrowRight
                            size={20}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-slate-400 font-medium">
                      By continuing, you agree to our{" "}
                      <a href="#" className="underline hover:text-zepto-purple">
                        Terms of Service
                      </a>{" "}
                      &{" "}
                      <a href="#" className="underline hover:text-zepto-purple">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form
                  onSubmit={handleVerifyOTP}
                  className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500"
                >
                  <div>
                    <button
                      type="button"
                      onClick={resetStep}
                      className="text-slate-400 hover:text-slate-600 mb-4 flex items-center gap-1 font-bold text-sm transition-colors"
                    >
                      <ChevronRight size={16} className="rotate-180" /> Back
                    </button>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                      Verify Details
                    </h2>
                    <p className="text-slate-500 mt-2 font-medium">
                      We've sent a 6-digit code to{" "}
                      <span className="text-slate-900 font-bold">
                        +91 {formData.phone}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-6">
                    <input
                      type="text"
                      name="otp"
                      className="block w-full text-center text-4xl tracking-[0.6em] font-black border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-zepto-purple/10 focus:border-zepto-purple transition-all outline-none bg-slate-50 focus:bg-white py-5"
                      placeholder="••••••"
                      value={formData.otp}
                      onChange={handleInputChange}
                      maxLength={6}
                      required
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-zepto-purple text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-zepto-purple/20 hover:bg-zepto-dark hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Verify & Continue"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          // Registration Dashboard Layout
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block col-span-1">
              <div className="sticky top-24">
                <nav className="space-y-8 relative">
                  {/* Connecting Line */}
                  <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200 -z-10" />

                  {[
                    {
                      id: 1,
                      title: "Restaurant Information",
                      desc: "Location, Owner details",
                    },
                    {
                      id: 2,
                      title: "Restaurant Documents",
                      desc: "FSSAI, PAN, GST",
                    },
                    { id: 3, title: "Menu Setup", desc: "Menu, Timing, Days" },
                    {
                      id: 4,
                      title: "Partner Contract",
                      desc: "Review agreement",
                    },
                  ].map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-slate-50 flex-shrink-0 transition-all duration-300 ${
                          registrationStep >= item.id
                            ? "border-zepto-green bg-green-50"
                            : "border-slate-300"
                        }`}
                      >
                        {registrationStep > item.id ? (
                          <div className="w-2.5 h-2.5 bg-zepto-green rounded-full" />
                        ) : registrationStep === item.id ? (
                          <div className="w-2.5 h-2.5 bg-zepto-purple rounded-full animate-pulse" />
                        ) : null}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-bold transition-colors ${registrationStep === item.id ? "text-zepto-purple" : "text-slate-900"}`}
                        >
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Mobile Top Stepper */}
            <div className="lg:hidden col-span-1">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-slate-500">
                  Step {registrationStep} of 4
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={`h-1 w-8 rounded-full ${registrationStep >= s ? "bg-zepto-purple" : "bg-slate-200"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-3">
              {renderRegistrationStep()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerAuth;
