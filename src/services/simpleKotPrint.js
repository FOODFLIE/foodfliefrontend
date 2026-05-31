import partnerApiClient from '../utils/partnerApiClient';

// Get KOT text data
export const getKOTText = async (orderId) => {
  try {
    const response = await partnerApiClient.get(`api/kot/${orderId}/text`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch KOT text:', error);
    throw error;
  }
};

// Simple, reliable KOT printing that works immediately
export const printKOTSimple = async (orderId) => {
  try {
    console.log(`🖨️ Printing KOT for Order #${orderId}`);
    
    // Get KOT data
    const kotData = await getKOTText(orderId);
    
    // Create print window with thermal printer formatting
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
                margin: 2mm;
              }
              body { 
                margin: 0; 
                padding: 0;
                font-family: 'Courier New', monospace;
                font-size: 11px;
                line-height: 1.1;
              }
              .no-print { display: none; }
            }
            
            @media screen {
              body { 
                font-family: 'Courier New', monospace; 
                font-size: 12px; 
                margin: 10px;
                background: #f5f5f5;
              }
              .container {
                background: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                max-width: 300px;
                margin: 0 auto;
              }
              .print-btn {
                background: #fc8019;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                margin: 10px 5px;
              }
              .print-btn:hover {
                background: #e67312;
              }
            }
            
            .kot-content {
              white-space: pre-line;
              font-family: 'Courier New', monospace;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="no-print" style="text-align: center; margin-bottom: 15px;">
              <h3 style="margin: 0; color: #333;">Kitchen Order Ticket</h3>
              <button class="print-btn" onclick="window.print()">🖨️ Print KOT</button>
              <button class="print-btn" onclick="window.close()" style="background: #666;">✕ Close</button>
            </div>
            <div class="kot-content">${kotData.replace(/\n/g, '<br>')}</div>
          </div>
          
          <script>
            // Auto-print after 1 second (optional)
            setTimeout(() => {
              // Uncomment next line for auto-print
              // window.print();
            }, 1000);
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    return { 
      success: true, 
      message: `KOT #${orderId} opened in print window` 
    };
    
  } catch (error) {
    console.error('Print failed:', error);
    throw new Error(`Failed to print KOT #${orderId}: ${error.message}`);
  }
};