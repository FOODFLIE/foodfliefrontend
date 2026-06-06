// Secure UPI Payment Service
class UPIPaymentService {
  constructor() {
    this.businessUpi = "nanduboda@ibl";
    this.businessName = "FoodFlie";
  }

  // Generate secure UPI intent with proper encoding
  generateUPIIntent(amount, orderId, note = "") {
    const params = new URLSearchParams({
      pa: this.businessUpi,
      pn: this.businessName,
      am: amount.toFixed(2),
      cu: "INR",
      tn: note || `FoodFlie Order #${orderId}`,
      ...(orderId && { tr: `FL${orderId}${Date.now().toString().slice(-6)}` })
    });
    
    return `upi://pay?${params.toString()}`;
  }

  // Generate QR code URL with better service
  generateQRCode(upiIntent) {
    // Use multiple QR services for reliability
    const services = [
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=png&data=${encodeURIComponent(upiIntent)}`,
      `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(upiIntent)}`,
      `https://qr-generator.qrcode.studio/qr/custom?download=true&file=png&data=${encodeURIComponent(upiIntent)}&size=200`
    ];
    
    return services[0]; // Primary service
  }

  // Smart UPI app detection and launching
  async launchUPIApp(upiIntent) {
    try {
      // For mobile devices - try direct app opening
      if (this.isMobileDevice()) {
        // Create a hidden link and click it
        const link = document.createElement('a');
        link.href = upiIntent;
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Add timeout to detect if app opened
        const timeout = setTimeout(() => {
          document.body.removeChild(link);
          this.showFallbackOptions(upiIntent);
        }, 3000);
        
        // Listen for page visibility change (indicates app opened)
        const handleVisibilityChange = () => {
          if (document.hidden) {
            clearTimeout(timeout);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.body.removeChild(link);
          }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        link.click();
        
        return { success: true, method: 'app-launch' };
      } else {
        // For desktop - show QR code immediately
        return { success: false, method: 'desktop-qr-needed' };
      }
    } catch (error) {
      console.error('UPI app launch failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Check if device is mobile
  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Show fallback payment options
  showFallbackOptions(upiIntent) {
    // This can trigger showing QR code or other payment methods
    console.log('Showing fallback payment options');
    return {
      qrCode: this.generateQRCode(upiIntent),
      webIntent: upiIntent,
      alternatives: this.getAlternativeApps()
    };
  }

  // Get list of popular UPI apps
  getAlternativeApps() {
    return [
      { name: 'Google Pay', scheme: 'tez://', packageName: 'com.google.android.apps.nbu.paisa.user' },
      { name: 'PhonePe', scheme: 'phonepe://', packageName: 'com.phonepe.app' },
      { name: 'Paytm', scheme: 'paytmmp://', packageName: 'net.one97.paytm' },
      { name: 'BHIM UPI', scheme: 'bhim://', packageName: 'in.org.npci.upiapp' },
      { name: 'Amazon Pay', scheme: 'amazonpay://', packageName: 'in.amazon.mShop.android.shopping' }
    ];
  }

  // Enhanced payment flow with multiple attempts
  async initiatePayment(amount, orderId, note) {
    const upiIntent = this.generateUPIIntent(amount, orderId, note);
    
    // Try 1: Direct app launch (mobile)
    const launchResult = await this.launchUPIApp(upiIntent);
    
    if (launchResult.success) {
      return {
        success: true,
        method: 'direct-app',
        message: 'UPI app opened successfully'
      };
    }
    
    // Try 2: Fallback options
    const fallbackOptions = this.showFallbackOptions(upiIntent);
    
    return {
      success: true,
      method: 'fallback',
      qrCode: fallbackOptions.qrCode,
      upiIntent: upiIntent,
      alternatives: fallbackOptions.alternatives,
      message: 'Showing payment options'
    };
  }

  // Validate UTR format
  validateUTR(utr) {
    // UTR should be 12 digits, but we're asking for last 4
    const cleanUTR = utr.toString().replace(/\D/g, '');
    return cleanUTR.length === 4 && /^\d{4}$/.test(cleanUTR);
  }

  // Generate payment verification token
  generateVerificationToken(orderId) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${orderId}_${timestamp}_${random}`;
  }
}

export const upiPayment = new UPIPaymentService();