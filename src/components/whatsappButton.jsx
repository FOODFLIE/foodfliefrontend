import React, { useState, useEffect } from 'react';
import { X, Clock, Users, Headphones, ChevronUp } from 'lucide-react';
import WhatsAppIcon from './whatsappIcon';

const WhatsAppButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  // WhatsApp number and message
  const whatsappNumber = "+918309180145"; // Replace with actual support number
  const defaultMessage = "Hi! I need help with FoodFlie. Can you assist me?";

  // Support hours
  const supportHours = {
    start: 9, // 9 AM
    end: 22,  // 10 PM
  };

  // Check if support is online
  const isSupportOnline = () => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= supportHours.start && currentHour < supportHours.end;
  };

  // Handle scroll behavior - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide when scrolling down
      } else {
        setIsVisible(true); // Show when scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Show tooltip after 3 seconds on first visit
  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('whatsapp-tooltip-seen');
    if (!hasSeenTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
          localStorage.setItem('whatsapp-tooltip-seen', 'true');
        }, 5000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const openWhatsApp = (customMessage = defaultMessage) => {
    const encodedMessage = encodeURIComponent(customMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsExpanded(false);
  };

  const quickMessages = [
    {
      icon: "🍕",
      title: "Order Issue",
      message: "Hi! I'm having an issue with my food order. Can you help me track it?"
    },
    {
      icon: "💳",
      title: "Payment Problem", 
      message: "Hello! I'm facing a payment issue. Can you assist me with this?"
    },
    {
      icon: "🚚",
      title: "Delivery Query",
      message: "Hi! I have a question about my delivery. Can you provide an update?"
    },
    {
      icon: "🎯",
      title: "General Support",
      message: "Hello! I need help with FoodFlie. Can you assist me?"
    }
  ];

  return (
    <>
      {/* Main WhatsApp Button */}
      <div 
        className={`fixed bottom-20 right-6 z-[70] transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-4 animate-in slide-in-from-bottom-2 fade-in duration-300">
            <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl max-w-[280px] relative">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <WhatsAppIcon size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm mb-1">Need Help? 👋</p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Chat with us on WhatsApp for instant support!
                  </p>
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-slate-900 rotate-45"></div>
            </div>
          </div>
        )}

        {/* Expanded Support Menu */}
        {isExpanded && (
          <div className="absolute bottom-full right-0 mb-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden min-w-[320px] max-w-[90vw]">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <WhatsAppIcon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">FoodFlie Support</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${isSupportOnline() ? 'bg-green-300' : 'bg-yellow-300'}`}></div>
                        <span className="text-xs opacity-90">
                          {isSupportOnline() ? 'Online now' : 'Usually replies in 1 hour'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Support Info */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={14} />
                    <span>9 AM - 10 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users size={14} />
                    <span>24/7 Chat Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Headphones size={14} />
                    <span>Instant Help</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Quick Help
                </p>
                <div className="space-y-2">
                  {quickMessages.map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => openWhatsApp(msg.message)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                    >
                      <span className="text-lg">{msg.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-slate-800 group-hover:text-green-600 transition-colors">
                          {msg.title}
                        </p>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {msg.message}
                        </p>
                      </div>
                      <ChevronUp size={16} className="text-slate-400 rotate-90 group-hover:text-green-500 transition-colors" />
                    </button>
                  ))}
                </div>

                {/* Custom Message Button */}
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
                >
                  <WhatsAppIcon size={18} />
                  Start Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center transition-all duration-300 group ${
            isExpanded ? 'rotate-45 scale-110' : 'hover:scale-110'
          }`}
          aria-label="WhatsApp Support"
        >
          {/* Pulse animation when not expanded */}
          {!isExpanded && (
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          )}
          
          {/* Icon */}
          {isExpanded ? (
            <X size={24} className="transition-transform" />
          ) : (
            <WhatsAppIcon size={24} className="transition-transform" />
          )}

          {/* Online indicator */}
          {!isExpanded && isSupportOnline() && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
          )}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[69] md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default WhatsAppButton;