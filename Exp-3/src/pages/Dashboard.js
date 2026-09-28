import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  Eye, Edit3, Trash2, Terminal, Database, Tag, 
  ShieldCheck, Send, Sparkles, Activity, Key
} from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthorized } = useContext(AuthContext);
  const [inputData, setInputData] = useState('');
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: 'System Overview & Guidelines',
      createdBy: 'VIEWER',
      lastModifiedBy: 'SYSTEM',
    },
    {
      id: 2,
      content: 'Q3 Security Policy Update',
      createdBy: 'EDITOR',
      lastModifiedBy: 'EDITOR',
    }
  ]);

  const [logs, setLogs] = useState([
    {
      id: 1,
      type: 'info',
      message: `Active session authenticated as [${user?.email}]. Assigned Role: [${user?.role?.toUpperCase()}]`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const addLog = (type, message) => {
    const newLog = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  const handleRead = () => {
    if (!isAuthorized('read')) {
      addLog('error', `[ACCESS DENIED] User [${user?.email}] lacks READ permissions.`);
      return;
    }

    const query = inputData.trim() || 'All Records';
    addLog('success', `[READ EXECUTED] Retrieved records matching query: "${query}".`);
  };

  const handleWrite = () => {
    if (!isAuthorized('write')) {
      addLog(
        'error',
        `[ACCESS DENIED] WRITE action blocked for user [${user?.email}] with role [${user?.role?.toUpperCase()}].`
      );
      return;
    }

    if (!inputData.trim()) {
      addLog('info', '[VALIDATION] Please enter payload content before writing.');
      return;
    }

    const newPost = {
      id: Date.now(),
      content: inputData,
      createdBy: user?.role?.toUpperCase(),
      lastModifiedBy: user?.role?.toUpperCase(),
    };

    setPosts([newPost, ...posts]);
    addLog(
      'success',
      `[WRITE EXECUTED] Record "${inputData}" committed by [${user?.email}].`
    );
    setInputData('');
  };

  const handlePurge = () => {
    if (!isAuthorized('purge')) {
      addLog(
        'error',
        `[ACCESS DENIED] PURGE requires elevated privileges. Access denied for [${user?.email}].`
      );
      return;
    }

    if (posts.length === 0) {
      addLog('info', '[NOTICE] No records available to purge.');
      return;
    }

    const targetPost = posts[0];
    setPosts(posts.slice(1));
    addLog(
      'error',
      `[PURGE EXECUTED] Permanently deleted record #${targetPost.id} ("${targetPost.content}").`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/40 via-teal-50/30 to-amber-50/40 text-slate-800 p-4 md:p-8 space-y-8">
      {/* Top Banner - Teal, Emerald & Amber Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-emerald-600 to-amber-500 p-1 shadow-2xl shadow-teal-500/15">
        <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[23px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              RBAC Engine Live Operations
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Security Dashboard
            </h1>
            <p className="text-slate-600 text-xs md:text-sm flex items-center gap-2 font-medium">
              <Key className="w-4 h-4 text-teal-600" />
              Authenticated User: <span className="text-teal-950 font-bold">{user?.email}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-teal-600/25 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Role: {user?.role || 'Guest'}
            </div>
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xl shadow-slate-200/50 space-y-3">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-teal-700 flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-600" />
          Interactive Data Payload
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Type payload content to store in database..."
            className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white transition-all text-sm font-semibold"
          />
          {inputData && (
            <button
              onClick={() => setInputData('')}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* READ CARD (Teal) */}
        <div className="flex flex-col justify-between bg-white border border-slate-200/80 hover:border-teal-400 p-6 rounded-3xl transition-all duration-300 space-y-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-teal-500/10">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-teal-50 text-teal-700 rounded-2xl border border-teal-200">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 uppercase tracking-wide">
                All Roles Allowed
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Read Access</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-medium">
              Query database records without altering system state. Available across all assigned user roles.
            </p>
          </div>
          <button
            onClick={handleRead}
            className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-teal-600/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Execute Read</span>
          </button>
        </div>

        {/* WRITE CARD (Amber) */}
        <div className="flex flex-col justify-between bg-white border border-slate-200/80 hover:border-amber-400 p-6 rounded-3xl transition-all duration-300 space-y-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-amber-500/10">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl border border-amber-200">
                <Edit3 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wide">
                Editor & Admin
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Write Access</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-medium">
              Publish new payload entries directly to database storage. Requires active Editor or Admin privileges.
            </p>
          </div>
          <button
            onClick={handleWrite}
            disabled={!isAuthorized('write')}
            className={`w-full py-3.5 font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              isAuthorized('write')
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 active:scale-95 cursor-pointer'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Execute Write</span>
          </button>
        </div>

        {/* PURGE CARD (Rose) */}
        <div className="flex flex-col justify-between bg-white border border-slate-200/80 hover:border-rose-400 p-6 rounded-3xl transition-all duration-300 space-y-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-rose-500/10">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl border border-rose-200">
                <Trash2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wide">
                Admin Privilege
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Purge Access</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-medium">
              Permanently delete top database entries. Strictly limited to top-level Admin authorization.
            </p>
          </div>
          <button
            onClick={handlePurge}
            disabled={!isAuthorized('purge')}
            className={`w-full py-3.5 font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              isAuthorized('purge')
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/25 active:scale-95 cursor-pointer'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Execute Purge</span>
          </button>
        </div>
      </div>

      {/* Database View */}
      <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xl shadow-slate-200/50 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl border border-teal-200">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="font-extrabold text-base tracking-wide text-slate-900">
              Live Database Storage
            </h2>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full font-bold border border-slate-200">
            Total Records: {posts.length}
          </span>
        </div>

        <div className="space-y-3">
          {posts.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center italic">No records present in current database state.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-2xl border border-slate-200/70 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-teal-300 hover:bg-teal-50/20 transition-all"
              >
                <div className="space-y-1">
                  <span className="font-bold text-slate-800 text-sm">{post.content}</span>
                  <p className="text-[11px] text-slate-400 font-mono">Record ID: #{post.id}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3.5 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-sm">
                    <Tag className="w-3 h-3 text-teal-600" />
                    Role Scope: {post.createdBy}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Terminal Log Output */}
      <div className="bg-slate-900 rounded-3xl p-6 text-slate-100 space-y-4 shadow-2xl border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-teal-400" />
            <h2 className="font-bold text-xs tracking-wider uppercase text-slate-300">
              Security Execution Log
            </h2>
          </div>
          <button
            onClick={() => setLogs([])}
            className="text-[11px] text-slate-400 hover:text-white underline transition-colors"
          >
            Clear Log
          </button>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-56 overflow-y-auto pr-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-3 rounded-xl border flex items-start space-x-3 ${
                log.type === 'error'
                  ? 'bg-rose-950/40 border-rose-800/50 text-rose-300'
                  : log.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
            >
              <span className="text-[10px] text-slate-400 select-none pt-0.5">
                [{log.timestamp}]
              </span>
              <div className="flex-1">{log.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;