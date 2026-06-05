import React, { useState, useEffect } from 'react';
import { X, MessageSquare, ShoppingBag, CreditCard, Truck, Send } from 'lucide-react';
import WhatsAppIcon from './whatsappIcon';
import { getFlieOptions } from '../utils/flieUtils';

const WhatsAppButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const flies = getFlieOptions();
  const whatsappNumber = flies.whatsappNumber;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < lastScrollY || window.scrollY < 100);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const openWhatsApp = (msg) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg || "Hi FoodFlie!")}`;
    window.open(url, '_blank');
  };

  const actions = [
    { icon: <ShoppingBag size={18} />, label: "Order Status", msg: "I need help tracking my order." },
    { icon: <CreditCard size={18} />, label: "Payments", msg: "I'm having trouble with my payment." },
    { icon: <Truck size={18} />, label: "Delivery", msg: "I have a question about delivery." },
    { icon: <MessageSquare size={18} />, label: "General", msg: "I need general support." }
  ];

  return (
    <div className={`fixed bottom-20 right-4 sm:right-6 z-[60] transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      
      {isExpanded && (
        <div className="absolute bottom-20 right-0 w-[85vw] sm:w-80 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300 origin-bottom-right">
          
          {/* Bot Header */}
          <div className="bg-slate-950 p-6 text-white relative">
             <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
            <div className="flex justify-between items-center mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border border-white/20">
                  <WhatsAppIcon size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base leading-none">FoodFlie Bot</h3>
                  <span className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Online</span>
                  </span>
                </div>
              </div>
              <button onClick={() => setIsExpanded(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20}/>
              </button>
            </div>
          </div>

          {/* Bot Message Area */}
          <div className="p-5 bg-slate-50">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 mb-4 animate-in slide-in-from-left-2 duration-500">
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                Hi! Welcome to <strong>FoodFlie</strong> 👋 How can I help you today?
              </p>
            </div>
            
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Select an option</p>
            
            <div className="grid grid-cols-2 gap-2">
              {actions.map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => openWhatsApp(item.msg)} 
                  className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-green-500 hover:bg-green-50/50 transition-all text-left group"
                >
                  <span className="text-slate-400 group-hover:text-green-600 transition-colors">{item.icon}</span>
                  <span className="text-[11px] font-bold text-slate-700">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <button 
              onClick={() => openWhatsApp()} 
              className="w-full py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Send size={16} />
              Open Custom Chat
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl relative ${isExpanded ? 'bg-slate-950 rotate-90' : 'bg-green-500 hover:scale-105'}`}
      >
        {isExpanded ? (
          <X className="text-white" />
        ) : (
          <>
            <WhatsAppIcon size={28} className="text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
          </>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;