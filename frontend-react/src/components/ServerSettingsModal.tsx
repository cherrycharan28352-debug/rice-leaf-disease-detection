import React, { useState } from 'react';
import { Settings, Globe, Check, AlertCircle, X, RefreshCw, Server, Wifi } from 'lucide-react';
import { getApiBase } from '../services/api';

interface ServerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServerSettingsModal: React.FC<ServerSettingsModalProps> = ({ isOpen, onClose }) => {
  const currentBase = localStorage.getItem('ricecare_api_url') || 'http://10.233.122.153:8000';
  const [serverUrl, setServerUrl] = useState(currentBase);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const cleanUrl = serverUrl.replace(/\/$/, '');
      const res = await fetch(`${cleanUrl}/api/health`, { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        setTestResult({
          success: true,
          message: `Connected successfully! Model: ${data.model_architecture || 'Loaded'}`
        });
      } else {
        setTestResult({
          success: false,
          message: `Server returned HTTP status ${res.status}.`
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Could not reach server at ${serverUrl}. Ensure the server is running and accessible.`
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    const cleanUrl = serverUrl.trim().replace(/\/$/, '');
    localStorage.setItem('ricecare_api_url', cleanUrl);
    window.location.reload();
  };

  const handleResetDefault = () => {
    localStorage.removeItem('ricecare_api_url');
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Server Endpoint Settings</h3>
              <p className="text-[11px] text-slate-500">Configure remote API backend for mobile or cloud deployment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs text-slate-700">
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Backend Server URL
            </label>
            <input
              type="text"
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              placeholder="e.g. http://10.233.122.153:8000 or https://your-server.com"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-emerald-500 font-mono"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Enter the full HTTPS or local IP address of your running FastAPI server.
            </p>
          </div>

          {/* Presets */}
          <div className="space-y-1.5">
            <span className="font-semibold text-slate-500 text-[10px] uppercase tracking-wider">Quick Presets:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setServerUrl('http://10.233.122.153:8000')}
                className="p-2 text-left bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-lg text-[11px]"
              >
                <div className="font-bold text-slate-800 flex items-center space-x-1">
                  <Wifi className="w-3 h-3 text-emerald-600" />
                  <span>Wi-Fi Network</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">10.233.122.153:8000</div>
              </button>
              <button
                type="button"
                onClick={() => setServerUrl('http://127.0.0.1:8000')}
                className="p-2 text-left bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-lg text-[11px]"
              >
                <div className="font-bold text-slate-800 flex items-center space-x-1">
                  <Server className="w-3 h-3 text-emerald-600" />
                  <span>Localhost</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">127.0.0.1:8000</div>
              </button>
            </div>
          </div>

          {/* Test Status Alert */}
          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-start space-x-2 ${
                testResult.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              {testResult.success ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex space-x-2 pt-2">
            <button
              type="button"
              disabled={testing}
              onClick={handleTestConnection}
              className="flex-1 py-2 px-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition flex items-center justify-center space-x-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Testing...' : 'Test Connection'}</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 py-2 px-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
            >
              Save & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
