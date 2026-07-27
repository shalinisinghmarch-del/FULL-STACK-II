import React, { useState } from 'react';

export const DraftsView = () => {
  const [drafts, setDrafts] = useState([
    { id: 1, title: 'Upcoming Product Sneak Peek', platform: 'Instagram', date: '2026-07-28' },
    { id: 2, title: 'Top 5 React Best Practices', platform: 'LinkedIn', date: '2026-07-30' },
  ]);
  const [newDraft, setNewDraft] = useState('');

  const addDraft = () => {
    if (newDraft.trim()) {
      setDrafts([
        ...drafts,
        { id: Date.now(), title: newDraft, platform: 'Twitter / X', date: '2026-08-01' },
      ]);
      setNewDraft('');
    }
  };

  const removeDraft = (id) => {
    setDrafts(drafts.filter((d) => d.id !== id));
  };

  return (
    <div style={{ background: 'var(--card-bg)', padding: '28px', borderRadius: '20px', border: '1px solid #99f6e4' }}>
      <h3 style={{ marginTop: 0, color: '#064e3b', marginBottom: '16px' }}>📝 Content Drafts & Idea Queue</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Write a quick post idea or draft..."
          value={newDraft}
          onChange={(e) => setNewDraft(e.target.value)}
          style={{ flex: 1 }}
        />
        <button
          onClick={addDraft}
          style={{ background: '#0d9488', color: '#ffffff', padding: '0 20px' }}
        >
          Save Draft
        </button>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {drafts.map((draft) => (
          <div
            key={draft.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#ffffff',
              padding: '14px 18px',
              borderRadius: '12px',
              border: '1px solid #ccfbf1',
            }}
          >
            <div>
              <strong style={{ color: '#064e3b', fontSize: '15px' }}>{draft.title}</strong>
              <div style={{ fontSize: '12px', color: '#047857', marginTop: '2px' }}>
                Target: {draft.platform} • Scheduled Target: {draft.date}
              </div>
            </div>
            <button
              onClick={() => removeDraft(draft.id)}
              style={{ background: '#fef2f2', color: '#ef4444', padding: '6px 12px', fontSize: '12px' }}
            >
              Discard
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};