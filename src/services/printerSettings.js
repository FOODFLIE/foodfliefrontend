// Printer Settings Management
const PRINTER_SETTINGS_KEY = 'foodflie_printer_settings';

export const getPrinterSettings = () => {
  try {
    const settings = localStorage.getItem(PRINTER_SETTINGS_KEY);
    return settings ? JSON.parse(settings) : {
      preferredMethod: 'auto', // 'auto', 'thermal', 'browser'
      thermalPrinterIP: '',
      autoDetect: true
    };
  } catch (error) {
    console.error('Failed to get printer settings:', error);
    return {
      preferredMethod: 'auto',
      thermalPrinterIP: '',
      autoDetect: true
    };
  }
};

export const savePrinterSettings = (settings) => {
  try {
    localStorage.setItem(PRINTER_SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Failed to save printer settings:', error);
    return false;
  }
};

export const resetPrinterSettings = () => {
  try {
    localStorage.removeItem(PRINTER_SETTINGS_KEY);
    return true;
  } catch (error) {
    console.error('Failed to reset printer settings:', error);
    return false;
  }
};