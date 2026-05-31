// Thermal Printer Integration Service
import { getPrinterSettings } from './printerSettings';

class ThermalPrinterService {
  constructor() {
    this.settings = getPrinterSettings();
  }

  // Method 1: Use existing backend KOT print endpoint
  async printToThermalPrinter(kotData, orderId) {
    try {
      // Use your existing backend endpoint
      const response = await fetch(`/api/kot/${orderId}/print`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('partnerToken')}`
        }
      });
      
      if (response.ok) {
        const result = await response.text();
        console.log('✅ Backend thermal print response:', result);
        return { success: true, method: 'backend-thermal' };
      }
      throw new Error('Backend thermal printer not responding');
    } catch (error) {
      console.warn('Backend thermal printer failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Method 2: Browser Print Dialog (works immediately)
  async printToBrowser(kotData, orderId) {
    try {
      const printWindow = window.open('', '_blank', 'width=400,height=600');
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>KOT #${orderId}</title>
            <style>
              @media print {
                @page { 
                  size: 80mm auto; 
                  margin: 0; 
                }
                body { 
                  margin: 0; 
                  padding: 5mm;
                  font-family: 'Courier New', monospace;
                  font-size: 12px;
                  line-height: 1.2;
                }
              }
              body { 
                font-family: 'Courier New', monospace; 
                font-size: 12px; 
                margin: 10px;
                white-space: pre-line;
              }
              .kot-content {
                max-width: 300px;
              }
            </style>
          </head>
          <body>
            <div class="kot-content">${kotData.replace(/\n/g, '<br>')}</div>
            <script>
              window.onload = function() {
                setTimeout(() => {
                  window.print();
                  setTimeout(() => window.close(), 1000);
                }, 500);
              }
            </script>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      return { success: true, method: 'browser' };
    } catch (error) {
      console.error('Browser print failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Method 3: Network Thermal Printer (ESC/POS commands)
  async printToNetworkPrinter(kotData, orderId) {
    if (!this.settings.thermalPrinterIP) {
      return { success: false, error: 'No network printer IP configured' };
    }

    try {
      // Convert text to ESC/POS commands
      const escPosData = this.convertToESCPOS(kotData);
      
      const response = await fetch(`http://${this.settings.thermalPrinterIP}:9100`, {
        method: 'POST',
        body: escPosData,
        headers: { 'Content-Type': 'application/octet-stream' }
      });
      
      if (response.ok) {
        return { success: true, method: 'network' };
      }
      throw new Error('Network printer not responding');
    } catch (error) {
      console.warn('Network printer failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Method 4: Web Serial API (Chrome only, requires user permission)
  async printToSerialPrinter(kotData) {
    if (!('serial' in navigator)) {
      return { success: false, error: 'Web Serial API not supported' };
    }

    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      
      const writer = port.writable.getWriter();
      const escPosData = this.convertToESCPOS(kotData);
      
      await writer.write(escPosData);
      writer.releaseLock();
      await port.close();
      
      return { success: true, method: 'serial' };
    } catch (error) {
      console.warn('Serial printer failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Convert text to ESC/POS commands for thermal printers
  convertToESCPOS(text) {
    const ESC = '\x1B';
    const commands = [
      ESC + '@',        // Initialize printer
      ESC + 'a' + '\x01', // Center align
      text,
      '\n\n\n',        // Feed paper
      ESC + 'i'         // Cut paper (if supported)
    ].join('');
    
    return new TextEncoder().encode(commands);
  }

  // Main print method with fallback chain
  async print(kotData, orderId) {
    const method = this.settings.preferredMethod;
    
    console.log(`🖨️ Attempting to print KOT #${orderId} using method: ${method}`);
    
    // For now, skip backend thermal since you mentioned it's not implemented
    // Just use browser printing which works reliably
    
    if (method === 'network' && this.settings.thermalPrinterIP) {
      const networkResult = await this.printToNetworkPrinter(kotData, orderId);
      if (networkResult.success) return networkResult;
    }
    
    if (method === 'serial') {
      const serialResult = await this.printToSerialPrinter(kotData);
      if (serialResult.success) return serialResult;
    }
    
    // Always fallback to browser print (most reliable)
    console.log('🔄 Using browser print method...');
    return await this.printToBrowser(kotData, orderId);
  }
}

export const thermalPrinter = new ThermalPrinterService();