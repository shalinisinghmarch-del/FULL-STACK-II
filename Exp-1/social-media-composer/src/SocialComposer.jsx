import React, { useState, useEffect } from "react";

// CONFIGURATIONS FOR PLATFORMS (Dynamic limits and validation strategies)
const PLATFORM_CONFIGS = {
  twitter: {
    name: "Twitter / X",
    limit: 280,
    placeholder: "Write your post content here... (Max 280 characters)",
    brandColor: "border-sky-300 bg-sky-50 text-sky-900",
    badgeColor: "bg-sky-500 text-white",
    validate: (text) => {
      if (text.length > 280) return `Exceeds Twitter's 280-character limit by ${text.length - 280} characters.`;
      if (text.trim() === "") return "Post content cannot be empty.";
      return null;
    }
  },
  linkedin: {
    name: "LinkedIn",
    limit: 3000,
    placeholder: "Write your professional post insights here... (Max 3000 characters)",
    brandColor: "border-blue-300 bg-blue-50 text-blue-900",
    badgeColor: "bg-blue-600 text-white",
    validate: (text) => {
      if (text.length > 3000) return `Exceeds LinkedIn's 3000-character limit by ${text.length - 3000} characters.`;
      if (text.trim() === "") return "Post content cannot be empty.";
      return null;
    }
  },
  instagram: {
    name: "Instagram",
    limit: 2200,
    placeholder: "Write your caption text here... (Max 2200 characters, max 30 hashtags)",
    brandColor: "border-pink-300 bg-pink-50 text-pink-900",
    badgeColor: "bg-gradient-to-r from-pink-500 to-amber-500 text-white",
    validate: (text) => {
      if (text.length > 2200) return `Exceeds Instagram's 2200-character limit by ${text.length - 2200} characters.`;
      if (text.trim() === "") return "Post caption cannot be empty.";
      
      const hashtagCount = (text.match(/#/g) || []).length;
      if (hashtagCount > 30) return `Instagram limits posts to 30 hashtags. You have used ${hashtagCount}.`;
      return null;
    }
  }
};

// MOCK API SIMULATION LAYER WITH RETRY PATTERN
const saveDraftMock = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.content || data.content.trim() === "") {
        reject(new Error("Content is empty"));
        return;
      }
      if (Math.random() < 0.2) {
        reject(new Error("Network glitch. Retrying server handshakes..."));
      } else {
        resolve({ success: true });
      }
    }, 800);
  });
};

export default function SocialComposer() {
  // STATE MANAGEMENT
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [drafts, setDrafts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiLogs, setApiLogs] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Load saved drafts from localStorage on initialization
  useEffect(() => {
    const stored = localStorage.getItem("assignment_drafts");
    if (stored) {
      try { setDrafts(JSON.parse(stored)); } catch (e) { console.error(e); }
    }
  }, []);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };

  const addLog = (message, isError = false) => {
    setApiLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] ${isError ? "✕" : "✓"} ${message}`,
      ...prev.slice(0, 4)
    ]);
  };

  const currentConfig = PLATFORM_CONFIGS[platform];
  const validationError = currentConfig.validate(content);
  const charsLeft = currentConfig.limit - content.length;
  const isOverLimit = charsLeft < 0;

  // ASSIGNMENT REQUIREMENT: SAVE TO STORAGE & LIFECYCLE STATE
  const handleSaveDraft = async () => {
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setIsLoading(true);
    addLog(`Pushing post object via simulated network link...`);

    try {
      await saveDraftMock({ content });
      
      const draftPayload = {
        id: editingId || Date.now().toString(),
        content: content,
        platform: platform,
        updatedAt: new Date().toLocaleString()
      };

      let newDraftsList;
      if (editingId) {
        newDraftsList = drafts.map((d) => (d.id === editingId ? draftPayload : d));
        showToast("Draft updated successfully!");
        setEditingId(null);
      } else {
        newDraftsList = [draftPayload, ...drafts];
        showToast("Draft compiled and saved!");
      }

      setDrafts(newDraftsList);
      localStorage.setItem("assignment_drafts", JSON.stringify(newDraftsList));
      setContent("");
      addLog("Transaction logged. LocalStorage array sequence updated.");
    } catch (err) {
      showToast(err.message, "error");
      addLog(err.message, true);
    } finally {
      setIsLoading(false);
    }
  };

  // ASSIGNMENT REQUIREMENT: EDIT FUNCTIONALITY
  const handleEditDraft = (draft) => {
    setPlatform(draft.platform);
    setContent(draft.content);
    setEditingId(draft.id);
    showToast("Draft loaded into editing fields.", "warning");
  };

  // ASSIGNMENT REQUIREMENT: DELETE FUNCTIONALITY
  const handleDeleteDraft = (id) => {
    const freshList = drafts.filter((d) => d.id !== id);
    setDrafts(freshList);
    localStorage.setItem("assignment_drafts", JSON.stringify(freshList));
    if (editingId === id) {
      setEditingId(null);
      setContent("");
    }
    showToast("Draft removed permanently.", "error");
  };

  return (
    /* UPDATED: Removed constraints to guarantee full-screen layout canvas background */
    <div className="w-full min-h-screen bg-gradient-to-br from-sky-200 via-purple-100 to-pink-200 px-8 py-12 text-slate-800 font-sans">
      
      {/* HEADER SECTION */}
      <header className="w-full mb-12 text-center border-b border-purple-300/40 pb-6">
        <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent tracking-wide uppercase drop-shadow-sm">
          Social Media Post Composer
        </h1>
        <p className="text-indigo-950/80 mt-3 text-base font-semibold max-w-4xl mx-auto tracking-wide">
          Validate content structures, swap live destination platform rules, and handle persistent draft arrays using secure client caching hooks.
        </p>
      </header>

      {/* UPDATED: Changed container to w-full edge-to-edge grid layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* COMPOSER FIELD & WORKSPACE */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-purple-50/60 rounded-3xl p-8 shadow-xl shadow-purple-950/5 border border-purple-200/50 backdrop-blur-sm">
            <h2 className="text-xl font-extrabold mb-6 text-indigo-950 flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow animate-pulse"></span>
              {editingId ? "Modify Target Draft Parameters" : "Compose Workspace Core"}
            </h2>

            {/* PLATFORM SELECTION DROPDOWN REQUIREMENT */}
            <div className="mb-6">
              <label htmlFor="platform-select" className="block text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2.5">
                Platform Selection Dropdown
              </label>
              <select
                id="platform-select"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-white border border-purple-200 text-slate-800 py-3.5 px-4 rounded-xl font-semibold focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all cursor-pointer shadow-sm"
              >
                {Object.entries(PLATFORM_CONFIGS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.name} (Dynamic Limit: {value.limit} characters)
                  </option>
                ))}
              </select>
            </div>

            {/* TEXT INPUT + CHARACTER LIMIT ELEMENT */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Post Content Structure
                </label>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full border transition-all shadow-sm ${
                  isOverLimit ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  Remaining Margin: {charsLeft} / {currentConfig.limit}
                </span>
              </div>
              <textarea
                rows="6"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={currentConfig.placeholder}
                className={`w-full p-5 rounded-2xl border text-sm font-medium outline-none transition-all focus:ring-4 shadow-sm ${
                  validationError && content.length > 0
                    ? 'border-rose-300 focus:ring-rose-100 focus:border-rose-400 text-rose-900 bg-white' 
                    : 'border-purple-200 focus:ring-purple-200 focus:border-purple-300 text-slate-900 bg-white'
                }`}
              />
              
              {/* REAL-TIME STRATEGY ERROR FEEDBACK MESSAGES */}
              {validationError && content.trim().length > 0 && (
                <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs font-bold text-rose-700 shadow-sm">
                  <span>⚠️</span> {validationError}
                </div>
              )}
            </div>

            {/* BUTTON SUBMISSION INTERACTION CONTROLS */}
            <div className="flex items-center justify-between border-t border-purple-200/50 pt-6">
              <button
                type="button"
                onClick={() => { setContent(""); setEditingId(null); }}
                className="text-xs font-bold tracking-wider uppercase text-rose-500 hover:text-rose-700 transition-colors"
              >
                Clear Fields
              </button>

              <div className="flex gap-3">
                {editingId && (
                  <button
                    type="button"
                    onClick={() => { setContent(""); setEditingId(null); }}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-white border border-purple-200 rounded-xl hover:bg-purple-50 transition-all shadow-sm"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="button"
                  disabled={isLoading || isOverLimit || content.trim() === ""}
                  onClick={handleSaveDraft}
                  className={`px-8 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md transform active:scale-95 ${
                    isLoading || isOverLimit || content.trim() === ""
                      ? 'bg-purple-200/50 text-indigo-400 border border-purple-200/40 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-purple-300 hover:opacity-95'
                  }`}
                >
                  {isLoading ? "Synchronizing Layer..." : editingId ? "Update Active Draft" : "Save Draft"}
                </button>
              </div>
            </div>
          </div>

          {/* SIMULATED CANVAS POST FEEDS PREVIEW */}
          <div className="bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-4">
              Live Simulation Canvas Preview
            </h3>
            <div className={`border rounded-2xl p-6 min-h-[120px] flex flex-col justify-between transition-all duration-300 ${
              content ? currentConfig.brandColor : 'border-dashed border-white/20 bg-white/5 text-purple-200/50'
            }`}>
              <p className="whitespace-pre-wrap font-medium text-sm tracking-wide leading-relaxed break-words overflow-hidden">
                {content || "Awaiting core text data payload from workspace interaction strings..."}
              </p>
              <div className="flex justify-between items-center border-t border-white/10 mt-6 pt-4 text-xs font-medium">
                <span>Network Node: <strong className={`ml-1 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold ${currentConfig.badgeColor}`}>{platform}</strong></span>
                <span>Status: {validationError ? "✕ Validation Failed" : content ? "✓ Ready" : "○ Idle"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* REPOSITORY REQ 5: LIST LAYOUT / DISPLAY / MANAGE / EDIT & DELETE */}
        <div className="space-y-6">
          <div className="bg-purple-50/60 rounded-3xl p-6 shadow-xl shadow-purple-950/5 border border-purple-200/50 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-purple-200/60">
              <h2 className="text-sm font-extrabold text-indigo-950 flex items-center gap-2">
                📁 Storage Repository
              </h2>
              <span className="bg-white text-purple-700 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-purple-200 shadow-sm">
                {drafts.length} Saved
              </span>
            </div>

            {drafts.length === 0 ? (
              <div className="text-center py-10 bg-white/60 rounded-2xl border border-dashed border-purple-200/60 text-purple-400">
                <p className="text-xs font-bold text-indigo-950/60">Repository Array Empty</p>
                <p className="text-[11px] mt-1 text-indigo-400/80 px-2 font-medium">Fill the text field and save to instantiate a localStorage item entry.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                {drafts.map((draft) => {
                  const conf = PLATFORM_CONFIGS[draft.platform];
                  return (
                    <div 
                      key={draft.id} 
                      className={`p-4 rounded-xl border transition-all ${
                        editingId === draft.id 
                          ? 'border-indigo-400 bg-white shadow-inner' 
                          : 'border-purple-100 bg-white hover:bg-purple-100/30 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${conf?.badgeColor || 'bg-slate-400'}`}>
                          {draft.platform}
                        </span>
                        <span className="text-[10px] text-indigo-400/70 font-mono font-medium">{draft.updatedAt}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 line-clamp-3 mb-3 whitespace-pre-wrap leading-relaxed break-words overflow-hidden">
                        {draft.content}
                      </p>
                      
                      <div className="flex justify-end gap-2 text-[11px] pt-2 border-t border-purple-100/40">
                        <button 
                          onClick={() => handleEditDraft(draft)}
                          className="px-2.5 py-1 font-bold text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-purple-50 transition-colors shadow-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteDraft(draft.id)}
                          className="px-2.5 py-1 font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* SIMULATED CONSOLE METRICS */}
          <div className="bg-purple-50/60 rounded-3xl p-6 shadow-xl shadow-purple-950/5 border border-purple-200/50 backdrop-blur-sm">
            <h3 className="text-xs font-bold tracking-wider uppercase text-indigo-600 mb-3 pb-2 border-b border-purple-200/60">
              API Stream Validation Metrics
            </h3>
            <div className="font-mono text-[11px] space-y-2 h-24 overflow-y-auto">
              {apiLogs.length === 0 ? (
                <p className="text-purple-400 font-medium italic">No network actions logged yet.</p>
              ) : (
                apiLogs.map((log, idx) => (
                  <p key={idx} className={`leading-tight ${log.includes("✕") ? "text-rose-600 font-bold" : "text-emerald-600 font-semibold"}`}>
                    {log}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* FIXED TOAST HANDLERS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`p-4 rounded-xl shadow-xl border text-xs font-bold transition-all flex items-center justify-between ${
              toast.type === "error" 
                ? "bg-rose-50 text-rose-800 border-rose-200" 
                : toast.type === "warning" 
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{toast.type === "error" ? "✕" : toast.type === "warning" ? "!" : "✓"}</span>
              <span>{toast.message}</span>
            </div>
            <button onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))} className="opacity-40 hover:opacity-100">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}