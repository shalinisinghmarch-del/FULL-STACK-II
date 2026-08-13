import React, { useState, useMemo, useCallback, Suspense, lazy } from 'react';

// Dynamic Import / Code Splitting for heavy components
const AnalyticsReportWidget = lazy(() => import('./components/AnalyticsReportWidget'));

const INITIAL_EVENTS = [
  { id: 'evt-1', title: '🚀 Product Launch Post', date: '2026-08-10', category: 'Marketing', gradient: 'from-blue-600 via-indigo-600 to-cyan-500 shadow-blue-500/30' },
  { id: 'evt-2', title: '📰 Weekly Newsletter', date: '2026-08-11', category: 'Editorial', gradient: 'from-emerald-500 via-teal-600 to-green-400 shadow-emerald-500/30' },
  { id: 'evt-3', title: '🔥 Community AMA', date: '2026-08-12', category: 'Social', gradient: 'from-amber-500 via-orange-600 to-rose-500 shadow-amber-500/30' },
  { id: 'evt-4', title: '💻 Tech Blog Release', date: '2026-08-14', category: 'Dev', gradient: 'from-purple-600 via-fuchsia-600 to-pink-500 shadow-purple-500/30' }
];

const DAYS_OF_WEEK = [
  { name: 'Mon', color: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-300/50' },
  { name: 'Tue', color: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-300/50' },
  { name: 'Wed', color: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-300/50' },
  { name: 'Thu', color: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-300/50' },
  { name: 'Fri', color: 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-sky-300/50' },
  { name: 'Sat', color: 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-purple-300/50' },
  { name: 'Sun', color: 'bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white shadow-fuchsia-300/50' }
];

// Memoized Event Card component
const EventCard = React.memo(({ event, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, event.id)}
      className={`bg-gradient-to-r ${event.gradient} text-white p-3 my-2 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.04] active:scale-95 transition-all duration-300 cursor-grab active:cursor-grabbing font-bold text-xs flex flex-col justify-between gap-2 border border-white/20`}
      data-testid={`event-card-${event.id}`}
    >
      <span className="truncate drop-shadow-md text-xs sm:text-sm tracking-wide">{event.title}</span>
      <span className="self-start bg-black/20 backdrop-blur-md text-white text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold border border-white/30">
        {event.category}
      </span>
    </div>
  );
});

// Memoized Calendar Day slot
const CalendarDay = React.memo(({ dayNumber, dateString, events, onDragOver, onDrop, onDragStart }) => {
  const isSelectedDay = dayNumber === 11;

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, dateString)}
      className={`min-h-[165px] rounded-2xl p-3.5 border transition-all duration-300 flex flex-col justify-between backdrop-blur-xl ${
        isSelectedDay
          ? 'bg-gradient-to-b from-blue-100/90 via-indigo-100/90 to-purple-100/90 border-indigo-500 ring-2 ring-indigo-400/80 shadow-xl shadow-indigo-300/40'
          : 'bg-white/85 hover:bg-white border-white/90 hover:border-purple-300 hover:shadow-xl hover:-translate-y-0.5'
      }`}
      data-testid={`day-cell-${dateString}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs sm:text-sm shadow-md transition-all ${
            isSelectedDay
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-indigo-400/50 scale-110'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {dayNumber}
        </span>
        <span className="text-[11px] font-black tracking-wide text-slate-500 uppercase">{dateString.slice(8)} Aug</span>
      </div>
      <div className="flex-1 overflow-y-auto pr-0.5">
        {events.map((evt) => (
          <EventCard key={evt.id} event={evt} onDragStart={onDragStart} />
        ))}
      </div>
    </div>
  );
});

export default function App() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Memoized event filtering
  const filteredEvents = useMemo(() => {
    if (filterCategory === 'All') return events;
    return events.filter((e) => e.category === filterCategory);
  }, [events, filterCategory]);

  // Drag-and-drop state callbacks
  const handleDragStart = useCallback((e, eventId) => {
    e.dataTransfer.setData('text/plain', eventId);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e, targetDate) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData('text/plain');
    setEvents((prevEvents) =>
      prevEvents.map((evt) => (evt.id === eventId ? { ...evt, date: targetDate } : evt))
    );
  }, []);

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 10; i <= 23; i++) {
      const dayStr = i < 10 ? `0${i}` : `${i}`;
      days.push({ dayNumber: i, dateString: `2026-08-${dayStr}` });
    }
    return days;
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-gradient-to-br from-sky-100 via-indigo-100 via-purple-100 to-amber-100 px-4 sm:px-8 py-6 font-sans text-slate-900 flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      {/* Bright Ambient Glowing Orbs */}
      <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-r from-blue-400/35 to-cyan-300/35 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-r from-purple-400/35 to-pink-300/35 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[20%] w-[650px] h-[650px] bg-gradient-to-r from-amber-300/35 to-rose-400/35 rounded-full blur-[130px] pointer-events-none"></div>

      {/* Full-Width Bright Glass Header */}
      <header className="relative w-full mx-auto mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-2xl p-6 rounded-3xl border border-white/90 shadow-xl shadow-indigo-100/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600">Dynamic Content Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-0.5">
            Interactive Content Calendar
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-bold mt-1">
            Drag and drop posts to reschedule • Memoized component optimization
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 bg-white border-2 border-indigo-100 rounded-xl text-xs font-extrabold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer hover:border-indigo-300 transition-all"
          >
            <option value="All">🌈 All Categories</option>
            <option value="Marketing">🚀 Marketing</option>
            <option value="Editorial">📰 Editorial</option>
            <option value="Social">🔥 Social</option>
            <option value="Dev">💻 Dev</option>
          </select>

          <button
            onClick={() => setShowAnalytics((prev) => !prev)}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-black rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all border border-white/30"
          >
            {showAnalytics ? '⚡ Hide Analytics' : '✨ Load Analytics'}
          </button>
        </div>
      </header>

      {/* Lazy Loaded Widget */}
      {showAnalytics && (
        <div className="relative w-full mx-auto mb-6">
          <Suspense
            fallback={
              <div className="p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-white text-center font-black text-indigo-600 animate-pulse shadow-lg">
                ✨ Fetching interactive analytics module...
              </div>
            }
          >
            <AnalyticsReportWidget eventsCount={events.length} />
          </Suspense>
        </div>
      )}

      {/* Full-Width Main Calendar Grid */}
      <main className="relative w-full flex-1 bg-white/60 backdrop-blur-3xl p-6 rounded-3xl border border-white/80 shadow-2xl shadow-indigo-200/50 flex flex-col justify-between">
        {/* Multi-Colored Day Headers */}
        <div className="grid grid-cols-7 gap-3 mb-4">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day.name}
              className={`text-center py-2.5 rounded-xl border border-white/60 text-xs sm:text-sm font-black tracking-wider uppercase shadow-md ${day.color}`}
            >
              {day.name}
            </div>
          ))}
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 flex-1">
          {calendarDays.map((day) => {
            const dayEvents = filteredEvents.filter((e) => e.date === day.dateString);
            return (
              <CalendarDay
                key={day.dateString}
                dayNumber={day.dayNumber}
                dateString={day.dateString}
                events={dayEvents}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}