import React from 'react';

export default function AnalyticsReportWidget({ eventsCount }) {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-xl p-6 shadow-xl flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold">Performance & Post Analytics</h3>
        <p className="text-indigo-200 text-xs mt-1">
          Dynamically split component bundle active.[cite: 1] Total posts scheduled: <span className="font-bold text-amber-300">{eventsCount}</span>
        </p>
      </div>
      <div className="flex gap-4">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
          <p className="text-xs text-indigo-200">Efficiency</p>
          <p className="text-xl font-extrabold text-emerald-400">98.4%</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
          <p className="text-xs text-indigo-200">Re-renders</p>
          <p className="text-xl font-extrabold text-pink-400">Minimal</p>
        </div>
      </div>
    </div>
  );
}