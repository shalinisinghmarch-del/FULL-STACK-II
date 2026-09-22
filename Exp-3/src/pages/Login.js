import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, Mail, KeyRound, AlertCircle } from 'lucide-react';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('viewer');
  const [errorMsg, setErrorMsg] = useState('');

  const { login, authenticateUser, registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSignup) {
      if (!email || !password) {
        setErrorMsg('Please enter both email and password.');
        return;
      }

      const result = registerUser(email, password, selectedRole);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrorMsg(result.message);
      }
    } else {
      const result = authenticateUser(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrorMsg(result.message);
      }
    }
  };

  const fillDemoAccount = (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword('password123');
    setSelectedRole(demoRole);
    setErrorMsg('');
    login(demoRole);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 relative overflow-hidden">
      <div className="relative z-10 bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-md w-full border border-white/20 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-600 text-white rounded-2xl shadow-lg">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isSignup ? 'Create Security Account' : 'Sign In to RBAC Guard'}
          </h1>
          <p className="text-xs text-slate-500">
            {isSignup
              ? 'Register credentials and select an authorization role'
              : 'Enter your email and password to authenticate'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => { setIsSignup(false); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              !isSignup ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignup(true); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              isSignup ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {isSignup && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Assign Role Privilege</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-600"
              >
                <option value="viewer">Viewer (Read-only access)</option>
                <option value="editor">Editor (Read & Write access)</option>
                <option value="admin">Admin (Full Root Control)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/20 transition-all active:scale-98"
          >
            {isSignup ? 'Create Account & Sign In' : 'Sign In'}
          </button>
        </form>

        {/* Quick Demo Buttons */}
        {!isSignup && (
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
            <p className="text-[11px] font-bold text-slate-600">Quick Test Accounts (Password: <code className="text-indigo-600">password123</code>):</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => fillDemoAccount('viewer@guard.com', 'viewer')}
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
              >
                Viewer Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('editor@guard.com', 'editor')}
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
              >
                Editor Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('admin@guard.com', 'admin')}
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 hover:bg-rose-200"
              >
                Admin Demo
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;