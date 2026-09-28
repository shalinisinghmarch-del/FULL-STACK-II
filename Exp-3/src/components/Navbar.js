import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Shield, LayoutDashboard, Lock, LogOut, UserCheck } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) =>
    location.pathname === path
      ? 'bg-white/20 text-white font-semibold shadow-inner'
      : 'text-indigo-100 hover:bg-white/10 hover:text-white';

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-xl border-b border-indigo-700/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-md">
              <Shield className="h-7 w-7 text-indigo-300" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                RBAC Guard
              </span>
              <span className="block text-[10px] font-medium tracking-widest text-indigo-300 uppercase">
                Enterprise Security Portal
              </span>
            </div>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm transition-all duration-200 ${isActive(
                  '/dashboard'
                )}`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>

              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm transition-all duration-200 ${isActive(
                    '/admin'
                  )}`}
                >
                  <Lock className="h-4 w-4 text-amber-300" />
                  <span>Admin Panel</span>
                </Link>
              )}

              <div className="flex items-center space-x-2 bg-slate-950/40 px-3.5 py-1.5 rounded-full border border-indigo-400/30">
                <UserCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                  {user.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-red-500/20 active:scale-95"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;