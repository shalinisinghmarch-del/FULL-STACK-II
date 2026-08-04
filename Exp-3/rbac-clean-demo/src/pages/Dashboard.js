import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosInstance';
import { Eye, Edit2, Trash2, Send, CheckCircle2, AlertTriangle, Terminal, Shield, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'success') => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [{ id: Date.now(), time, message, type }, ...prev]);
  };

  const handleFetchData = async () => {
    try {
      await api.get('/posts/1');
      addLog('HTTP GET /posts/1 200 OK - Bearer Token dynamically attached via Interceptor.', 'success');
    } catch (err) {
      addLog(`API ERROR: ${err.message}`, 'error');
    }
  };

  const handleEdit = () => {
    if (['admin', 'editor'].includes(user?.role)) {
      addLog(`PERMISSION GRANTED: Resource edited successfully by role [${user.role.toUpperCase()}].`, 'success');
    } else {
      addLog('PERMISSION DENIED: Viewer role lacks write permissions.', 'error');
    }
  };

  const handleDelete = () => {
    if (user?.role === 'admin') {
      addLog('PERMISSION GRANTED: Database entry purged by [ADMIN].', 'success');
    } else {
      addLog('PERMISSION DENIED: Elevated Admin privileges required for delete operation.', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-indigo-500/20">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Role-Based Access Control System</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Control & Security Dashboard
            </h1>
            <p className="text-indigo-200 text-sm max-w-xl">
              Test real-time role capabilities, interactive route protection, and automated JWT token authorization interceptors.
            </p>
          </div>

          <button
            onClick={handleFetchData}
            className="flex items-center space-x-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 border border-indigo-300/30"
          >
            <Send className="h-5 w-5" />
            <span>Test Axios Interceptor</span>
          </button>
        </div>
      </div>

      {/* Permissions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Read Card */}
        <div className="bg-white p-7 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Eye className="h-7 w-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                All Roles Access
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Read Permission</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">
              Public scope. Available for Viewer, Editor, and Admin profiles to inspect resources.
            </p>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition-all">
            View Analytics
          </button>
        </div>

        {/* Edit Card */}
        <div className="bg-white p-7 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <Edit2 className="h-7 w-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                Editor & Admin
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Write Permission</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">
              Restricted write scope. Requires an active Editor or Admin role assignment to execute modifications.
            </p>
          </div>
          <button
            onClick={handleEdit}
            disabled={!['admin', 'editor'].includes(user?.role)}
            className={`w-full font-semibold text-sm py-3 rounded-xl transition-all shadow-md ${
              ['admin', 'editor'].includes(user?.role)
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
            }`}
          >
            Edit Post Data
          </button>
        </div>

        {/* Delete Card */}
        <div className="bg-white p-7 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3.5 bg-rose-50 text-rose-600 rounded-2xl group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                <Trash2 className="h-7 w-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200">
                Admin Exclusive
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Purge Permission</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">
              High-risk operation restricted exclusively to root Admin users for record deletion.
            </p>
          </div>
          <button
            onClick={handleDelete}
            disabled={user?.role !== 'admin'}
            className={`w-full font-semibold text-sm py-3 rounded-xl transition-all shadow-md ${
              user?.role === 'admin'
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
            }`}
          >
            Delete System Data
          </button>
        </div>
      </div>

      {/* Live System Execution Console */}
      <div className="bg-slate-900 text-slate-100 p-7 rounded-3xl shadow-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <Terminal className="h-5 w-5 text-indigo-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Live Execution Terminal & Log Monitor
            </h3>
          </div>
          <span className="flex items-center space-x-2 text-[11px] text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SYSTEM ACTIVE</span>
          </span>
        </div>

        <div className="space-y-2.5 h-44 overflow-y-auto font-mono text-xs pr-2">
          {logs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 italic">
              Terminal initialized. Click any action button above to stream live access logs...
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800/80"
              >
                <span className="text-slate-500 text-[10px] pt-0.5">{log.time}</span>
                {log.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <span
                  className={log.type === 'success' ? 'text-emerald-300 font-semibold' : 'text-rose-300 font-semibold'}
                >
                  {log.message}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;