import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md text-center space-y-4">
        <ShieldX className="mx-auto h-20 w-20 text-red-500 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-slate-900">403 Forbidden</h1>
        <p className="text-slate-600">Access Denied! Your assigned role lacks permissions to enter this route[cite: 1].</p>
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;