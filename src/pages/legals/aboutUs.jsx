import React from "react";
import { Heart, Clock, ShieldCheck, Leaf, Users } from "lucide-react";
import SEO from "../../components/common/seo";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#FCFBFA] text-slate-800 font-sans selection:bg-brand-light selection:text-slate-900 pb-24 overflow-hidden relative">
      <SEO title="About Us | FoodFlie" />
      {/* Soft Ambient Backgrounds to create a "soft corner" feeling */}
      <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-full rounded-full bg-brand-light/50 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[10%] max-w-full -right-[10%] w-[40%] h-[80%] rounded-full bg-amber-50/70 blur-[100px] mix-blend-multiply"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12 lg:pt-16">
        {/* Soft Intro */}
        <div className="text-center mb-16 max-w-2xl mx-auto space-y-8 tracking-tight">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(220,38,38,0.06)] border border-brand-muted/80 mx-auto transition-all hover:shadow-[0_8px_30px_-4px_rgba(220,38,38,0.12)]">
            <Heart className="w-4 h-4 text-brand fill-brand/20" />
            <span className="text-sm font-bold text-brand tracking-wide uppercase">
              Built with purpose
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
            A small idea with a <br />
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-brand-dark">
                big heart.
              </span>
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-brand-light"
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
        </div>

        {/* Empathy Journey */}
        <div className="relative max-w-3xl mx-auto">
          {/* Subtle connection line for visual narrative */}
          <div className="absolute left-[27px] top-8 bottom-32 w-[2px] bg-linear-to-b from-brand-light/50 via-brand-muted/30 to-transparent -z-10 hidden md:block"></div>

          <div className="space-y-20">
            {/* Step 1: The Personal Connection */}
            <div className="relative md:pl-20 group">
              <div className="hidden md:flex absolute left-0 top-1 w-14 h-14 bg-white shadow-sm border border-brand-light rounded-full items-center justify-center z-10 transition-transform duration-500 group-hover:-translate-y-1">
                <Users className="w-6 h-6 text-brand" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-4">
                I’m Nandu Boda, 23 years old, and the story of Food Flie began
                with my own struggles.
              </h2>
            </div>

            {/* Step 2: The Shared Pain (Building a soft corner) */}
            <div className="relative md:pl-20 group">
              <div className="hidden md:flex absolute left-0 top-1 w-14 h-14 bg-white shadow-sm border border-brand-light rounded-full items-center justify-center z-10 transition-transform duration-500 group-hover:-translate-y-1">
                <span className="w-2 h-2 rounded-full bg-brand-light"></span>
              </div>
              <p className="text-xl text-slate-600 leading-relaxed mb-10 font-medium">
                For years, I faced the same problems many people deal with every
                day — high delivery charges, long waiting times, and food that
                arrives late. I spent a lot of money on food delivery,
                and every time I felt the same frustration.
              </p>

              <div className="bg-white rounded-4xl p-8 md:p-12 shadow-[0_8px_40px_-12px_rgba(220,38,38,0.08)] border border-brand-muted hover:shadow-[0_12px_44px_-12px_rgba(220,38,38,0.12)] transition-shadow duration-500 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-brand to-brand-dark rounded-l-3xl"></div>
                <div className="absolute -right-12 -top-12 opacity-5">
                  <Heart className="w-40 h-40" />
                </div>
                <p className="font-serif text-3xl md:text-4xl font-medium text-slate-800 leading-[1.3] italic relative z-10">
                  “Why is good food so expensive to get? Why does it take so
                  long?”
                </p>
              </div>
            </div>

            {/* Step 3: The Empathetic Solution */}
            <div className="relative md:pl-20 group">
              <div className="hidden md:flex absolute left-0 top-1 w-14 h-14 bg-brand shadow-[0_4px_20px_-4px_rgba(220,38,38,0.4)] rounded-full items-center justify-center z-10 transition-transform duration-500 group-hover:-translate-y-1">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                Instead of complaining, I decided to build a solution. That’s
                how Food Flie was born. I started working on low‑price food
                delivery with a very human promise:{" "}
                <strong className="text-brand font-bold bg-brand-muted/80 px-3 py-1.5 rounded-xl border border-brand-light inline-block mt-2">
                  fast delivery in just 13 minutes, without compromising
                  quality.
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* The Promise Cards (Soft UI) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
          <div className="bg-white rounded-4xl p-10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] border border-slate-50 hover:shadow-[0_12px_44px_-12px_rgba(220,38,38,0.12)] hover:-translate-y-1 transition-all duration-500 group">
            <div className="w-16 h-16 bg-brand-muted/80 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-light transition-colors duration-500">
              <Clock className="w-8 h-8 text-brand stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Time Respected
            </h3>
            <p className="text-slate-500 leading-relaxed text-lg">
              We know you're hungry. 13-minute delivery ensures your food is
              fresh, hot, and arrives right when you need it.
            </p>
          </div>

          <div className="bg-white rounded-4xl p-10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] border border-slate-50 hover:shadow-[0_12px_44px_-12px_rgba(94,23,235,0.12)] hover:-translate-y-1 transition-all duration-500 group">
            <div className="w-16 h-16 bg-emerald-50/80 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-100 transition-colors duration-500">
              <ShieldCheck className="w-8 h-8 text-emerald-600 stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Honest Pricing
            </h3>
            <p className="text-slate-500 leading-relaxed text-lg">
              Affordable delivery without hidden fees. We believe everyone
              deserves convenience without overpaying.
            </p>
          </div>
        </div>

        {/* Emotional Close */}
        <div className="mt-24 text-center bg-white/50 backdrop-blur-3xl rounded-[3rem] p-12 md:p-16 shadow-[0_4px_40px_-10px_rgba(220,38,38,0.05)] border border-white">
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Food Flie is still a pilot test, but it is deeply built with
            passion, purpose, and the belief that everyone deserves affordable,
            quick, and reliable food delivery.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
            It’s not just a service.
            <br className="hidden md:block pb-2" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-brand-dark inline-block">
              It’s my journey, my dream, and my commitment to you.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
