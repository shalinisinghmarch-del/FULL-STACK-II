import React from 'react';
import { ShieldAlert, Users, Settings, Database } from 'lucide-react';

const AdminPanel = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl flex items-center space-x-4">
        <ShieldAlert className="h-10 w-10 text-amber-600 shrink-0" />
        <div>
          <h1 className="text-xl font-bold text-amber-900">Admin Control Center</h1>
          <p className="text-amber-700 text-sm">Protected route verified. Welcome to the root control panel[cite: 1].</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <Users className="h-8 w-8 text-indigo-600" />
          <div>
            <p className="text-xs text-slate-500 uppercase">Active Users</p>
            <p className="text-xl font-bold text-slate-800">1,248</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <Settings className="h-8 w-8 text-indigo-600" />
          <div>
            <p className="text-xs text-slate-500 uppercase">System Status</p>
            <p className="text-xl font-bold text-emerald-600">Healthy</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <Database className="h-8 w-8 text-indigo-600" />
          <div>
            <p className="text-xs text-slate-500 uppercase">Token Storage</p>
            <p className="text-xl font-bold text-slate-800">Encrypted JWT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;