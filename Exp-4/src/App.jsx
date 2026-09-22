import React, {
  useState,
  useMemo,
  useCallback,
  Suspense,
  lazy,
  useRef,
  useEffect,
} from "react";

// ============================================================
// CODE SPLITTING
// ============================================================
const PremiumReportWidget = lazy(
  () => import("./components/AnalyticsReportWidget")
);

// ============================================================
// INITIAL EVENTS
// ============================================================
const INITIAL_EVENTS = [
  {
    id: "evt-1",
    title: "🚀 Product Launch Post",
    date: "2026-08-28",
    category: "Marketing",
    gradient:
      "from-blue-600 via-indigo-600 to-cyan-500 shadow-blue-500/30",
  },
  {
    id: "evt-2",
    title: "📰 Weekly Newsletter",
    date: "2026-08-29",
    category: "Editorial",
    gradient:
      "from-emerald-500 via-teal-600 to-green-400 shadow-emerald-500/30",
  },
  {
    id: "evt-3",
    title: "🔥 Community AMA",
    date: "2026-08-30",
    category: "Social",
    gradient:
      "from-amber-500 via-orange-600 to-rose-500 shadow-amber-500/30",
  },
  {
    id: "evt-4",
    title: "💻 Tech Blog Release",
    date: "2026-09-02",
    category: "Dev",
    gradient:
      "from-purple-600 via-fuchsia-600 to-pink-500 shadow-purple-500/30",
  },
];

// ============================================================
// DAYS
// ============================================================
const DAYS_OF_WEEK = [
  {
    name: "Mon",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
  },
  {
    name: "Tue",
    color: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
  },
  {
    name: "Wed",
    color: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
  },
  {
    name: "Thu",
    color: "bg-gradient-to-r from-rose-500 to-pink-500 text-white",
  },
  {
    name: "Fri",
    color: "bg-gradient-to-r from-sky-500 to-indigo-500 text-white",
  },
  {
    name: "Sat",
    color: "bg-gradient-to-r from-purple-500 to-violet-600 text-white",
  },
  {
    name: "Sun",
    color: "bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white",
  },
];

// ============================================================
// CALENDAR DAYS
// ============================================================
const CALENDAR_DAYS = [];

for (let i = 28; i <= 31; i++) {
  CALENDAR_DAYS.push({
    dayNumber: i,
    monthLabel: `${i} AUG`,
    dateString: `2026-08-${i}`,
  });
}

for (let i = 1; i <= 10; i++) {
  const day = i < 10 ? `0${i}` : `${i}`;

  CALENDAR_DAYS.push({
    dayNumber: i,
    monthLabel: `${i} SEP`,
    dateString: `2026-09-${day}`,
  });
}

// ============================================================
// OPTIMIZED EVENT CARD
// React.memo prevents unnecessary child re-renders
// ============================================================
const OptimizedEventCard = React.memo(function OptimizedEventCard({
  event,
  onDragStart,
}) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, event.id)}
      className={`bg-gradient-to-r ${event.gradient}
      text-white p-3 my-2 rounded-xl shadow-lg
      hover:scale-[1.03] transition-all duration-300
      cursor-grab font-bold text-xs
      border border-white/20`}
      data-testid={`optimized-event-${event.id}`}
    >
      <div className="flex justify-between gap-2">
        <span className="truncate">{event.title}</span>

        <span className="text-[9px] bg-black/20 px-2 py-1 rounded-full">
          R{renderCount.current}
        </span>
      </div>

      <span className="inline-block mt-2 bg-black/20 px-2 py-1 rounded-full text-[9px] uppercase">
        {event.category}
      </span>
    </div>
  );
});

// ============================================================
// NON-OPTIMIZED EVENT CARD
// Deliberately does NOT use React.memo
// ============================================================
function NonOptimizedEventCard({ event, onDragStart }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, event.id)}
      className={`bg-gradient-to-r ${event.gradient}
      text-white p-3 my-2 rounded-xl shadow-lg
      hover:scale-[1.03] transition-all duration-300
      cursor-grab font-bold text-xs
      border border-white/20`}
      data-testid={`nonoptimized-event-${event.id}`}
    >
      <div className="flex justify-between gap-2">
        <span className="truncate">{event.title}</span>

        <span className="text-[9px] bg-black/20 px-2 py-1 rounded-full">
          R{renderCount.current}
        </span>
      </div>

      <span className="inline-block mt-2 bg-black/20 px-2 py-1 rounded-full text-[9px] uppercase">
        {event.category}
      </span>
    </div>
  );
}

// ============================================================
// OPTIMIZED DAY
// React.memo
// ============================================================
const OptimizedCalendarDay = React.memo(function OptimizedCalendarDay({
  dayNumber,
  monthLabel,
  dateString,
  events,
  onDragOver,
  onDrop,
  onDragStart,
}) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const isSelectedDay = dayNumber === 28;

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, dateString)}
      className={`min-h-[165px] rounded-2xl p-3 border
      flex flex-col bg-white/85 backdrop-blur-xl
      ${
        isSelectedDay
          ? "border-indigo-500 ring-2 ring-indigo-400 bg-indigo-50"
          : "border-white hover:border-purple-300"
      }`}
      data-testid={`optimized-day-${dateString}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm
          ${
            isSelectedDay
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {dayNumber}
        </span>

        <div className="text-right">
          <div className="text-[9px] text-indigo-600 font-bold">
            Renders
          </div>

          <div className="text-xs font-black text-indigo-700">
            {renderCount.current}
          </div>

          <div className="text-[10px] font-bold text-slate-500">
            {monthLabel}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {events.map((event) => (
          <OptimizedEventCard
            key={event.id}
            event={event}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
});

// ============================================================
// NON-OPTIMIZED DAY
// No React.memo
// ============================================================
function NonOptimizedCalendarDay({
  dayNumber,
  monthLabel,
  dateString,
  events,
  onDragOver,
  onDrop,
  onDragStart,
}) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, dateString)}
      className="min-h-[165px] rounded-2xl p-3 border border-red-200 bg-red-50/80"
      data-testid={`nonoptimized-day-${dateString}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm bg-red-200 text-red-800">
          {dayNumber}
        </span>

        <div className="text-right">
          <div className="text-[9px] text-red-600 font-bold">
            Renders
          </div>

          <div className="text-xs font-black text-red-700">
            {renderCount.current}
          </div>

          <div className="text-[10px] font-bold text-red-500">
            {monthLabel}
          </div>
        </div>
      </div>

      <div>
        {events.map((event) => (
          <NonOptimizedEventCard
            key={event.id}
            event={event}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const [filterCategory, setFilterCategory] = useState("All");

  const [showAnalytics, setShowAnalytics] = useState(false);

  const [mode, setMode] = useState("optimized");

  const [totalRenders, setTotalRenders] = useState(0);

  const [recentLogs, setRecentLogs] = useState([]);

  const [counter, setCounter] = useState(0);

  // ============================================================
  // OPTIMIZED: useMemo
  // ============================================================
  const filteredEvents = useMemo(() => {
    console.log("useMemo: Filtering events");

    if (filterCategory === "All") {
      return events;
    }

    return events.filter(
      (event) => event.category === filterCategory
    );
  }, [events, filterCategory]);

  // ============================================================
  // OPTIMIZED: GROUP EVENTS ONLY ON DEPENDENCY CHANGE
  // ============================================================
  const eventsByDate = useMemo(() => {
    const grouped = {};

    CALENDAR_DAYS.forEach((day) => {
      grouped[day.dateString] = filteredEvents.filter(
        (event) => event.date === day.dateString
      );
    });

    return grouped;
  }, [filteredEvents]);

  // ============================================================
  // OPTIMIZED: useCallback
  // ============================================================
  const handleDragStart = useCallback((e, eventId) => {
    e.dataTransfer.setData("text/plain", eventId);
  }, []);

  // ============================================================
  // OPTIMIZED: useCallback
  // ============================================================
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  // ============================================================
  // DRAG & DROP
  // ============================================================
  const handleDrop = useCallback(
    (e, targetDate) => {
      e.preventDefault();

      const eventId = e.dataTransfer.getData("text/plain");

      const draggedEvent = events.find(
        (event) => event.id === eventId
      );

      if (!draggedEvent) return;

      if (draggedEvent.date === targetDate) return;

      const sourceDate = draggedEvent.date;

      setEvents((previousEvents) =>
        previousEvents.map((event) =>
          event.id === eventId
            ? {
                ...event,
                date: targetDate,
              }
            : event
        )
      );

      setTotalRenders((previous) => previous + 2);

      const sourceLabel = `${sourceDate.slice(8)} ${
        sourceDate.includes("-08-") ? "AUG" : "SEP"
      }`;

      const targetLabel = `${targetDate.slice(8)} ${
        targetDate.includes("-08-") ? "AUG" : "SEP"
      }`;

      setRecentLogs([
        `⚡ ${targetLabel} Target`,
        `⚡ ${sourceLabel} Source`,
      ]);
    },
    [events]
  );

  // ============================================================
  // SIMULATE UNRELATED PARENT RENDER
  // ============================================================
  const triggerRender = () => {
    setCounter((previous) => previous + 1);

    setTotalRenders((previous) => previous + 1);

    setRecentLogs([
      "🔄 Parent re-render",
      mode === "optimized"
        ? "🟢 Memoized children protected"
        : "🔴 Children re-rendered",
    ]);
  };

  // ============================================================
  // STATISTICS
  // ============================================================
  const totalPosts = events.length;

  const optimized = mode === "optimized";

  return (
    <div
      className="w-full min-h-screen overflow-x-hidden
      bg-gradient-to-br from-sky-100 via-indigo-100
      via-purple-100 to-amber-100 px-4 sm:px-8 py-6
      font-sans text-slate-900"
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header
        className="w-full max-w-[1400px] mx-auto mb-6
        bg-white/80 backdrop-blur-2xl p-6 rounded-3xl
        border border-white shadow-xl"
      >
        <div className="flex flex-col lg:flex-row
        justify-between items-center gap-5">

          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500" />

              <span className="text-xs font-black uppercase
              tracking-widest text-indigo-600">
                Experiment 4 Module
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-black
              bg-gradient-to-r from-blue-600
              via-purple-600 to-pink-600
              bg-clip-text text-transparent"
            >
              Interactive Content Calendar
            </h1>

            <p className="text-slate-600 text-sm font-bold mt-2">
              Optimized vs Non-Optimized React Rendering
            </p>
          </div>

          {/* CONTROLS */}

          <div className="flex flex-wrap justify-center gap-3">

            {/* MODE */}

            <button
              onClick={() =>
                setMode((previous) =>
                  previous === "optimized"
                    ? "nonoptimized"
                    : "optimized"
                )
              }
              className={`px-5 py-3 rounded-xl
              text-xs font-black text-white shadow-lg
              ${
                optimized
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600"
                  : "bg-gradient-to-r from-red-500 to-orange-600"
              }`}
            >
              {optimized
                ? "⚡ Optimized Mode"
                : "🐌 Non-Optimized Mode"}
            </button>

            {/* FILTER */}

            <select
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(e.target.value)
              }
              className="px-4 py-3 bg-white
              border-2 border-indigo-200 rounded-xl
              text-xs font-bold"
            >
              <option value="All">🌈 All Categories</option>
              <option value="Marketing">🚀 Marketing</option>
              <option value="Editorial">📰 Editorial</option>
              <option value="Social">🔥 Social</option>
              <option value="Dev">💻 Dev</option>
            </select>

            {/* ANALYTICS */}

            <button
              onClick={() =>
                setShowAnalytics((previous) => !previous)
              }
              className="px-5 py-3 rounded-xl
              bg-gradient-to-r from-indigo-600
              to-pink-600 text-white
              text-xs font-black shadow-lg"
            >
              {showAnalytics
                ? "Hide Premium Report"
                : "Load Premium Report"}
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================
          OPTIMIZATION COMPARISON
      ====================================================== */}

      <section
        className="max-w-[1400px] mx-auto mb-6
        grid grid-cols-1 md:grid-cols-3 gap-4"
      >

        {/* OPTIMIZED */}

        <div
          className={`p-5 rounded-2xl border-2
          ${
            optimized
              ? "border-emerald-400 bg-emerald-50"
              : "border-slate-200 bg-white/70"
          }`}
        >
          <h3 className="font-black text-emerald-700">
            ⚡ OPTIMIZED
          </h3>

          <p className="text-xs mt-2 font-semibold">
            React.memo
          </p>

          <p className="text-xs font-semibold">
            useMemo
          </p>

          <p className="text-xs font-semibold">
            useCallback
          </p>

          <p className="text-xs font-semibold">
            Stable references
          </p>

          <div className="mt-3 text-2xl font-black text-emerald-600">
            {optimized ? "ACTIVE" : "OFF"}
          </div>
        </div>

        {/* NON OPTIMIZED */}

        <div
          className={`p-5 rounded-2xl border-2
          ${
            !optimized
              ? "border-red-400 bg-red-50"
              : "border-slate-200 bg-white/70"
          }`}
        >
          <h3 className="font-black text-red-700">
            🐌 NON-OPTIMIZED
          </h3>

          <p className="text-xs mt-2 font-semibold">
            No React.memo
          </p>

          <p className="text-xs font-semibold">
            Repeated rendering
          </p>

          <p className="text-xs font-semibold">
            More component work
          </p>

          <p className="text-xs font-semibold">
            Useful for comparison
          </p>

          <div className="mt-3 text-2xl font-black text-red-600">
            {!optimized ? "ACTIVE" : "OFF"}
          </div>
        </div>

        {/* TEST */}

        <div
          className="p-5 rounded-2xl
          bg-gradient-to-r from-indigo-700
          to-purple-700 text-white"
        >
          <h3 className="font-black">
            🧪 RENDER TEST
          </h3>

          <p className="text-xs mt-2">
            Parent render count
          </p>

          <div className="text-3xl font-black mt-2">
            {counter}
          </div>

          <button
            onClick={triggerRender}
            className="mt-3 px-4 py-2
            rounded-lg bg-white text-indigo-700
            text-xs font-black"
          >
            Trigger Re-render
          </button>
        </div>
      </section>

      {/* ======================================================
          REACT RENDER MONITOR
      ====================================================== */}

      <section
        className="max-w-[1400px] mx-auto mb-6
        bg-slate-900 text-white p-5 rounded-3xl
        shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row
        justify-between items-center gap-5">

          <div>
            <h2
              className="text-sm font-black
              tracking-widest text-indigo-400"
            >
              📊 REACT RENDER MONITOR
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Compare component re-render behaviour
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            <div className="bg-slate-800 p-4 rounded-xl text-center">
              <p className="text-[10px] text-slate-400">
                TOTAL RENDER EVENTS
              </p>

              <p
                className="text-2xl font-black text-amber-400"
                data-testid="total-renders-counter"
              >
                {totalRenders}
              </p>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl text-center">
              <p className="text-[10px] text-slate-400">
                CURRENT MODE
              </p>

              <p
                className={`text-sm font-black mt-2
                ${
                  optimized
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {optimized ? "OPTIMIZED" : "NON-OPTIMIZED"}
              </p>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl text-center">
              <p className="text-[10px] text-slate-400">
                RECENT ACTIVITY
              </p>

              <div className="text-[10px] mt-2 text-indigo-300">
                {recentLogs.length > 0
                  ? recentLogs.join(" • ")
                  : "No interaction yet"}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================
          PERFORMANCE ANALYTICS
      ====================================================== */}

      <section
        className="max-w-[1400px] mx-auto mb-6
        p-6 rounded-3xl
        bg-gradient-to-r from-indigo-800 to-purple-800
        text-white shadow-xl"
      >
        <div className="flex flex-col md:flex-row
        justify-between gap-5">

          <div>
            <h2 className="text-xl font-black">
              Performance & Post Analytics
            </h2>

            <p className="text-sm text-indigo-200 mt-1">
              Total posts scheduled: {totalPosts}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white/10 p-4 rounded-xl text-center">
              <p className="text-xs">Rendering Strategy</p>

              <p className="font-black text-emerald-300">
                {optimized
                  ? "Memoized"
                  : "Standard"}
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl text-center">
              <p className="text-xs">Performance</p>

              <p
                className={`font-black
                ${
                  optimized
                    ? "text-emerald-300"
                    : "text-red-300"
                }`}
              >
                {optimized
                  ? "HIGH"
                  : "BASELINE"}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================
          LAZY LOADED REPORT
      ====================================================== */}

      {showAnalytics && (
        <div className="max-w-[1400px] mx-auto mb-6">
          <Suspense
            fallback={
              <div
                className="p-8 bg-white rounded-2xl
                text-center font-black text-indigo-600"
              >
                ✨ Loading premium interactive report...
              </div>
            }
          >
            <PremiumReportWidget
              processedData={filteredEvents}
            />
          </Suspense>
        </div>
      )}

      {/* ======================================================
          CALENDAR
      ====================================================== */}

      <main
        className="max-w-[1400px] mx-auto
        bg-white/60 backdrop-blur-xl
        p-6 rounded-3xl border border-white
        shadow-2xl"
      >

        {/* DAYS */}

        <div
          className="grid grid-cols-7 gap-3 mb-4"
        >
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day.name}
              className={`${day.color}
              text-center py-3 rounded-xl
              text-xs sm:text-sm font-black
              uppercase shadow-md`}
            >
              {day.name}
            </div>
          ))}
        </div>

        {/* CALENDAR */}

        <div
          className="grid grid-cols-1
          sm:grid-cols-2 md:grid-cols-4
          lg:grid-cols-7 gap-3"
        >
          {CALENDAR_DAYS.map((day) => {
            const dayEvents = optimized
              ? eventsByDate[day.dateString] || []
              : filteredEvents.filter(
                  (event) =>
                    event.date === day.dateString
                );

            if (optimized) {
              return (
                <OptimizedCalendarDay
                  key={day.dateString}
                  dayNumber={day.dayNumber}
                  monthLabel={day.monthLabel}
                  dateString={day.dateString}
                  events={dayEvents}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragStart={handleDragStart}
                />
              );
            }

            return (
              <NonOptimizedCalendarDay
                key={day.dateString}
                dayNumber={day.dayNumber}
                monthLabel={day.monthLabel}
                dateString={day.dateString}
                events={dayEvents}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
              />
            );
          })}
        </div>

        {/* INSTRUCTIONS */}

        <div
          className="mt-6 p-4 rounded-2xl
          bg-indigo-50 border border-indigo-100"
        >
          <p className="text-xs font-black text-indigo-700">
            💡 PERFORMANCE DEMO
          </p>

          <p className="text-xs text-slate-600 mt-1">
            Switch between Optimized and Non-Optimized
            Mode, then click "Trigger Re-render".
            Observe the render counters and compare
            component behaviour.
          </p>

          <p className="text-xs text-slate-600 mt-1">
            You can also drag an event from one calendar
            day to another to demonstrate synchronized
            React state.
          </p>
        </div>

      </main>
    </div>
  );
}