import React, { useState } from 'react';
import { AddPostForm } from './features/posts/AddPostForm';
import { PostList } from './features/posts/PostList';
import { CalendarView } from './features/platforms/CalendarView';
import { AnalyticsView } from './features/platforms/AnalyticsView';
import { DraftsView } from './features/platforms/DraftsView';
import { PlatformsView } from './features/platforms/PlatformsView';

function App() {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        {/* Main Title Header (Subtitle Removed) */}
        <header style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1
            style={{
              fontSize: '40px',
              margin: 0,
              background: 'linear-gradient(90deg, #0d9488, #059669, #d97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '900',
              letterSpacing: '-0.5px',
            }}
          >
            Redux Content Hub
          </h1>
        </header>

        {/* Enhanced Multi-Tab Navigation Bar */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(5, 1fr)', 
            gap: '6px', 
            marginBottom: '24px', 
            background: 'rgba(255,255,255,0.7)', 
            padding: '6px', 
            borderRadius: '14px', 
            border: '1px solid #ccfbf1',
            boxShadow: '0 4px 15px rgba(13, 148, 136, 0.08)'
          }}
        >
          <button
            onClick={() => setActiveTab('feed')}
            style={{
              padding: '10px 4px',
              fontSize: '13px',
              background: activeTab === 'feed' ? '#0d9488' : 'transparent',
              color: activeTab === 'feed' ? '#ffffff' : '#064e3b',
              boxShadow: activeTab === 'feed' ? '0 2px 8px rgba(13, 148, 136, 0.3)' : 'none',
            }}
          >
            📰 Feed & Posts
          </button>

          <button
            onClick={() => setActiveTab('drafts')}
            style={{
              padding: '10px 4px',
              fontSize: '13px',
              background: activeTab === 'drafts' ? '#0d9488' : 'transparent',
              color: activeTab === 'drafts' ? '#ffffff' : '#064e3b',
              boxShadow: activeTab === 'drafts' ? '0 2px 8px rgba(13, 148, 136, 0.3)' : 'none',
            }}
          >
            📝 Drafts & Queue
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            style={{
              padding: '10px 4px',
              fontSize: '13px',
              background: activeTab === 'calendar' ? '#0d9488' : 'transparent',
              color: activeTab === 'calendar' ? '#ffffff' : '#064e3b',
              boxShadow: activeTab === 'calendar' ? '0 2px 8px rgba(13, 148, 136, 0.3)' : 'none',
            }}
          >
            📅 Calendar
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              padding: '10px 4px',
              fontSize: '13px',
              background: activeTab === 'analytics' ? '#0d9488' : 'transparent',
              color: activeTab === 'analytics' ? '#ffffff' : '#064e3b',
              boxShadow: activeTab === 'analytics' ? '0 2px 8px rgba(13, 148, 136, 0.3)' : 'none',
            }}
          >
            📈 Analytics
          </button>

          <button
            onClick={() => setActiveTab('platforms')}
            style={{
              padding: '10px 4px',
              fontSize: '13px',
              background: activeTab === 'platforms' ? '#0d9488' : 'transparent',
              color: activeTab === 'platforms' ? '#ffffff' : '#064e3b',
              boxShadow: activeTab === 'platforms' ? '0 2px 8px rgba(13, 148, 136, 0.3)' : 'none',
            }}
          >
            🌐 Platforms
          </button>
        </div>

        {/* Tab Views */}
        {activeTab === 'feed' && (
          <>
            <AddPostForm />
            <PostList />
          </>
        )}

        {activeTab === 'drafts' && <DraftsView />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'platforms' && <PlatformsView />}
      </div>
    </div>
  );
}

export default App;