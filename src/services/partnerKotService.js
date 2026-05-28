import partnerApiClient from '../utils/partnerApiClient';

// Get KOT data in JSON format
export const getKOTData = async (orderId) => {
  try {
    const response = await partnerApiClient.get(`api/kot/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch KOT data:', error);
    throw error;
  }
};

// Get KOT in plain text format for printing
export const getKOTText = async (orderId) => {
  try {
    const response = await partnerApiClient.get(`api/kot/${orderId}/text`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch KOT text:', error);
    throw error;
  }
};

// Get ESC/POS formatted data for thermal printer
export const getKOTPrintData = async (orderId) => {
  try {
    const response = await partnerApiClient.get(`/kot/${orderId}/print`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch KOT print data:', error);
    throw error;
  }
};

// Print KOT using browser print dialog
export const printKOT = async (orderId) => {
  try {
    const kotText = await getKOTText(orderId);
    
    const printWindow = window.open('', '', 'width=300,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>KOT #${orderId}</title>
          <style>
            body { 
              font-family: 'Courier New', monospace; 
              font-size: 12px; 
              margin: 10px;
              white-space: pre-wrap;
            }
          </style>
        </head>
        <body>${kotText}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
    
    return { success: true, message: 'KOT printed successfully' };
  } catch (error) {
    console.error('Failed to print KOT:', error);
    throw error;
  }
};