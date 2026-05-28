import React, { useState, useEffect } from 'react';
import { Printer, Settings, Wifi, Usb, Monitor } from 'lucide-react';
import { getPrinterSettings, savePrinterSettings } from '../../services/printerSettings';

const PrinterSettings = () => {
  const [settings, setSettings] = useState({
    preferredMethod: 'auto',
    thermalPrinterIP: '',
    autoDetect: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const currentSettings = getPrinterSettings();
    setSettings(currentSettings);
  }, []);

  const handleSave = () => {
    setSaving(true);
    const success = savePrinterSettings(settings);
    if (success) {
      alert('Printer settings saved successfully!');
    } else {
      alert('Failed to save printer settings');
    }
    setSaving(false);
  };

  const handleMethodChange = (method) => {
    setSettings(prev => ({ ...prev, preferredMethod: method }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center">
          <Printer className="w-5 h-5 text-brand" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Printer Settings</h3>
          <p className="text-sm text-slate-500">Configure how KOTs are printed</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Print Method Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Preferred Print Method
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => handleMethodChange('auto')}
              className={`p-4 border-2 rounded-xl transition-all ${
                settings.preferredMethod === 'auto'
                  ? 'border-brand bg-brand/5'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Settings className="w-6 h-6 mx-auto mb-2 text-slate-600" />
              <div className="text-sm font-medium">Auto Detect</div>
              <div className="text-xs text-slate-500 mt-1">Try thermal first, fallback to browser</div>
            </button>

            <button
              onClick={() => handleMethodChange('thermal')}
              className={`p-4 border-2 rounded-xl transition-all ${
                settings.preferredMethod === 'thermal'
                  ? 'border-brand bg-brand/5'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Usb className="w-6 h-6 mx-auto mb-2 text-slate-600" />
              <div className="text-sm font-medium">Thermal Only</div>
              <div className="text-xs text-slate-500 mt-1">USB thermal printer required</div>
            </button>

            <button
              onClick={() => handleMethodChange('browser')}
              className={`p-4 border-2 rounded-xl transition-all ${
                settings.preferredMethod === 'browser'
                  ? 'border-brand bg-brand/5'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Monitor className="w-6 h-6 mx-auto mb-2 text-slate-600" />
              <div className="text-sm font-medium">Browser Print</div>
              <div className="text-xs text-slate-500 mt-1">Use system print dialog</div>
            </button>
          </div>
        </div>

        {/* Network Printer IP */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Network Printer IP (Optional)
          </label>
          <div className="relative">
            <Wifi className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={settings.thermalPrinterIP}
              onChange={(e) => setSettings(prev => ({ ...prev, thermalPrinterIP: e.target.value }))}
              placeholder="192.168.1.100"
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enter IP address for network thermal printer (leave empty for USB only)
          </p>
        </div>

        {/* Current Status */}
        <div className="bg-slate-50 rounded-xl p-4">
          <h4 className="text-sm font-medium text-slate-700 mb-2">Current Configuration</h4>
          <div className="space-y-1 text-sm text-slate-600">
            <div>Method: <span className="font-medium capitalize">{settings.preferredMethod}</span></div>
            {settings.thermalPrinterIP && (
              <div>Network IP: <span className="font-medium">{settings.thermalPrinterIP}</span></div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-brand text-white py-3 px-4 rounded-xl font-medium hover:bg-brand-dark transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default PrinterSettings;