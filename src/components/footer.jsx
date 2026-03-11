import React from "react";
import { Link } from "react-router-dom";
import { Rocket, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand text-white pt-16 pb-8 mt-auto overflow-hidden relative">
      {/* Pilot Test Background Element */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Rocket className="w-36 h-36 rotate-12 animate-pulse" />
      </div>

      <div className="responsive-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <span className="text-brand font-black text-2xl">F</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">
                FOOD<span className="text-brand">FLIE</span>
              </span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Experience the fastest delivery service in town. Fresh groceries,
              delicious meals, and essentials delivered to your doorstep in
              minutes.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors duration-300 group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors duration-300 group"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors duration-300 group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors duration-300 group"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-white transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/partner"
                  className="hover:text-white transition-colors"
                >
                  Partner with Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Pilot Test Indicator Section */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand/20 blur-2xl group-hover:bg-brand/40 transition-all duration-500"></div>

            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-3 h-3 bg-brand rounded-full"></div>
                <div className="absolute inset-0 w-3 h-3 bg-brand rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-brand">
                Pilot Test Live
              </span>
            </div>

            <h4 className="font-bold text-xl mb-3">Shape the Future</h4>
            <p className="text-slate-300 text-xs leading-relaxed mb-4">
              You're among the first to experience the new Foodflie. Your
              feedback is crucial for our evolution.
            </p>

            <button className="w-full bg-brand hover:bg-brand/90 text-white text-xs font-bold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-brand/20 flex items-center justify-center gap-2">
              Share Feedback
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:row items-center justify-between gap-4 text-white text-xs">
          <p>© {currentYear} Srava Technologies Private Limited.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-700 rounded-full"></span>
              Version 0.1.0-alpha
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-700 rounded-full"></span>
              Built with ❤️ for Foodies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
