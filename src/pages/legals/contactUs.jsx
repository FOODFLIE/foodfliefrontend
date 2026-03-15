import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Heart,
  MessageCircle,
  AlertTriangle,
  Lightbulb,
  Handshake,
  Smile,
} from "lucide-react";
import SEO from "../../components/common/seo";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#FCFBFA] text-slate-800 font-sans selection:bg-brand-light selection:text-slate-900 pb-24 overflow-hidden relative">
      <SEO title="Contact Us | FoodFlie" />
      {/* Soft Ambient Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[80%] rounded-full bg-blue-50/60 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[0%] w-[50%] h-[70%] rounded-full bg-brand-muted/70 blur-[120px] mix-blend-multiply"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-12 lg:pt-16">
        {/* Empathetic Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto space-y-8 tracking-tight">
          <div className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(220,38,38,0.06)] border border-brand-muted/80 mx-auto transition-all hover:shadow-[0_8px_30px_-4px_rgba(220,38,38,0.12)]">
            <Phone className="w-4 h-4 text-brand" />
            <span className="text-sm font-bold text-brand tracking-wide uppercase">
              We're here for you
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Always{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-brand-dark relative">
              connected.
              <svg
                className="absolute w-full h-3 -bottom-2 left-0 text-brand-light"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium mt-8 text-balance">
            Food Flie started from real struggles, real experiences, and a real
            desire to make delivery better. If you have questions, feedback, or
            ideas to help us grow,{" "}
            <strong className="text-slate-900 font-bold">
              I’d love to hear from you.
            </strong>
          </p>
          <p className="text-lg text-brand/80 font-semibold italic">
            Reach out anytime. Your voice matters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Direct Contact Methods */}
          <div className="lg:col-span-5 space-y-6">
            <a
              href="mailto:support@foodflie.com"
              className="block bg-white rounded-4xl p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] border border-slate-50 hover:shadow-[0_12px_44px_-12px_rgba(94,23,235,0.15)] hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-14 h-14 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-500">
                <Mail className="w-6 h-6 text-blue-600 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Email Us
              </h3>
              <p className="text-slate-500 mb-4">
                For support, questions, or ideas.
              </p>
              <p className="text-lg font-semibold text-blue-600">
                support@foodflie.com
              </p>
            </a>

            <div className="bg-white rounded-4xl p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] border border-slate-50 hover:shadow-[0_12px_44px_-12px_rgba(94,23,235,0.15)] hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-14 h-14 bg-emerald-100/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors duration-500">
                <Phone className="w-6 h-6 text-emerald-600 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-500 mb-4">
                Direct line for urgent matters.
              </p>
              <p className="text-lg font-semibold text-emerald-600">+91 ————</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.03)] border border-slate-50">
                <MapPin className="w-6 h-6 text-orange-500 mb-4" />
                <h4 className="font-bold text-slate-900 mb-1">Location</h4>
                <p className="text-sm text-slate-500 leading-relaxed pt-1 border-t border-slate-100">
                  Hyderabad, Telangana
                </p>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.03)] border border-slate-50">
                <Clock className="w-6 h-6 text-brand mb-4" />
                <h4 className="font-bold text-slate-900 mb-1">Hours</h4>
                <p className="text-sm text-slate-500 leading-relaxed pt-1 border-t border-slate-100">
                  Every day
                  <br />9 AM – 11 PM
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Why Contact Us (Emotional Connection) */}
          <div className="lg:col-span-7 relative">
            {/* Soft Connection Glow */}
            <div className="absolute inset-0 bg-linear-to-br from-white/60 to-brand-muted/30 rounded-[2.5rem] blur-xl -z-10"></div>

            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-12 shadow-[0_8px_40px_-12px_rgba(220,38,38,0.08)] border border-white relative overflow-hidden">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(220,38,38,0.4)]">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                  Why contact us?
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      To share feedback
                    </h4>
                    <p className="text-slate-500 text-sm mt-1">
                      Tell us what you loved, or what we can do better.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="mt-1 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      To report issues
                    </h4>
                    <p className="text-slate-500 text-sm mt-1">
                      Delivery late? Order wrong? We will fix it immediately.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="mt-1 w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      To suggest features
                    </h4>
                    <p className="text-slate-500 text-sm mt-1">
                      Have a brilliant idea? We are building this for you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="mt-1 w-10 h-10 rounded-full bg-brand-muted flex items-center justify-center shrink-0">
                    <Handshake className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      To collaborate
                    </h4>
                    <p className="text-slate-500 text-sm mt-1">
                      Want to partner your restaurant with us? Let's talk.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="mt-1 w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                    <Smile className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      Or simply to say hi
                    </h4>
                    <p className="text-slate-500 text-sm mt-1">
                      Honestly, we love hearing from our community.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100/50 relative">
                <p className="text-lg text-slate-700 font-medium leading-relaxed italic text-center">
                  "We’re building something meaningful, and your support helps
                  us move faster. Food Flie is for the people — and it grows
                  with the people."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
