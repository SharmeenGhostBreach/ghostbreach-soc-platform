import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Sliders } from 'lucide-react';
import { useSocData } from '../../context/SocDataContext';

const Settings = () => {
  const { settings, updateSettings } = useSocData();

  const toggle = (key) => {
    updateSettings({ [key]: !settings[key] });
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-cyan-400" /> Platform Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">Configure notification alerts, scanning parameters, and security preferences.</p>
      </div>

      <div className="bg-[#0B1118] border border-gray-800 rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-200 border-b border-gray-800 pb-3 flex items-center gap-2">
          <Bell className="w-5 h-5 text-cyan-400" /> Notification Preferences
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-200">Email Notifications</p>
              <p className="text-xs text-slate-400">Receive security digests via configured email.</p>
            </div>
            <input
              type="checkbox"
              checked={!!settings.emailNotifications}
              onChange={() => toggle('emailNotifications')}
              className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-200">Scan Completion Alerts</p>
              <p className="text-xs text-slate-400">Notify immediately upon simulated scan completion.</p>
            </div>
            <input
              type="checkbox"
              checked={!!settings.scanCompletionAlerts}
              onChange={() => toggle('scanCompletionAlerts')}
              className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-200">Critical Vulnerability Alerts</p>
              <p className="text-xs text-slate-400">Trigger instant notifications when critical CVSS items are cataloged.</p>
            </div>
            <input
              type="checkbox"
              checked={!!settings.criticalVulnAlerts}
              onChange={() => toggle('criticalVulnAlerts')}
              className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;