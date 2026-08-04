import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, User, Edit3, KeyRound } from 'lucide-react';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('viewer');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(selectedRole);
    navigate('/dashboard');
  };

  const roles = [
    { id: 'viewer', title: 'Viewer', desc: 'Read-only access across basic resources[cite: 1]', icon: User, badge: 'Low Privilege' },
    { id: 'editor', title: 'Editor', desc: 'Can read and write resource records[cite: 1]', icon: Edit3, badge: 'Medium Privilege' },
    { id: 'admin', title: 'Admin', desc: 'Full system control & route guard access[cite: 1]', icon: KeyRound, badge: 'Root Privilege' },
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 bg-slate-900/70 backdrop-blur-2xl p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-600/20 rounded-2xl border border-indigo-500/30 text-indigo-400">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Sign In to Guard</h2>
          <p className="text-xs text-slate-400">Select a target role profile to simulate JWT issuing[cite: 1]</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-3">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/40 shadow-lg shadow-indigo-500/10'
                      : 'border-slate-800/80 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-600/30 text-indigo-300' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200 text-sm">{role.title}</h3>
                      <p className="text-[11px] text-slate-400">{role.desc}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isSelected ? 'border-indigo-500/40 text-indigo-300 bg-indigo-950' : 'border-slate-800 text-slate-500'
                  }`}>
                    {role.badge}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/25 border border-indigo-400/30 transition-all active:scale-98"
          >
            Authenticate as {selectedRole.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;