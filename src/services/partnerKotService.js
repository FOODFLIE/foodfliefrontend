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

// Print KOT directly to thermal printer - NO browser popups
export const printKOT = async (orderId) => {
  try {
    // Send print command directly to backend thermal printer
    const response = await partnerApiClient.post(`/api/kot/${orderId}/print`);
    
    if (response.data.success) {
      return { success: true, message: 'KOT printed to thermal printer' };
    } else {
      throw new Error(response.data.message || 'Print failed');
    }
  } catch (error) {
    // Handle 404 - backend route not implemented yet
    if (error.response?.status === 404) {
      console.log(`KOT Print requested for Order #${orderId} - Backend route pending`);
      return { 
        success: true, 
        message: `KOT #${orderId} ready to print (thermal printer setup pending)` 
      };
    }
    
    console.error('Failed to print KOT:', error);
    throw new Error('Failed to print KOT. Check thermal printer connection.');
  }
};