import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllPosts, 
  selectShortPosts, 
  fetchPosts, 
  deletePost 
} from './postsSlice';
import { selectAllPlatforms } from '../platforms/platformsSlice';

const PostItem = React.memo(({ post, onDelete }) => {
  return (
    <div
      style={{
        background: 'var(--card-bg)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '18px',
        border: '1px solid #ccfbf1',
        boxShadow: '0 10px 20px -5px rgba(20, 184, 166, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h4 style={{ margin: 0, fontSize: '18px', color: '#064e3b', fontWeight: '700' }}>
            {post.title}
          </h4>
          <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '8px', fontWeight: '600' }}>
            {post.platform || 'General'}
          </span>
        </div>
        <p style={{ margin: '0 0 18px 0', color: '#334155', fontSize: '15px', lineHeight: '1.6' }}>
          {post.content}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#059669', fontWeight: '600' }}>
          📅 {post.scheduledDate || '2026-07-21'}
        </span>
        <button
          onClick={() => onDelete(post.id)}
          style={{
            background: 'var(--danger-bg)',
            color: 'var(--danger-text)',
            border: '1px solid #fecaca',
            padding: '8px 16px',
            fontSize: '13px',
            borderRadius: '8px',
          }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
});

export const PostList = () => {
  const dispatch = useDispatch();
  
  // Local Toolbar State
  const [showOnlyShort, setShowOnlyShort] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // Redux State Access via Selectors
  const posts = useSelector(selectAllPosts);
  const shortPosts = useSelector(selectShortPosts);
  const platforms = useSelector(selectAllPlatforms);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleDelete = useCallback(
    (id) => {
      dispatch(deletePost(id));
    },
    [dispatch]
  );

  // Filter & Sort Logic Optimization
  const filteredAndSortedPosts = useMemo(() => {
    let result = showOnlyShort ? shortPosts : [...posts];

    // Filter by platform
    if (selectedPlatform !== 'All') {
      result = result.filter((p) => p.platform === selectedPlatform);
    }

    // Sort order
    return result.sort((a, b) => {
      return sortOrder === 'newest' ? b.id - a.id : a.id - b.id;
    });
  }, [posts, shortPosts, showOnlyShort, selectedPlatform, sortOrder]);

  if (status === 'loading') {
    return <div style={{ textAlign: 'center', padding: '40px', color: '#0d9488', fontWeight: '600' }}>🍃 Fetching feed items...</div>;
  }

  if (status === 'failed') {
    return <div style={{ color: 'var(--danger-text)', textAlign: 'center' }}>Error: {error}</div>;
  }

  return (
    <div>
      {/* Dynamic Toolbar Header */}
      <div 
        style={{ 
          background: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(8px)',
          padding: '16px 20px', 
          borderRadius: '16px', 
          border: '1px solid #ccfbf1',
          marginBottom: '22px',
          boxShadow: '0 4px 12px rgba(13, 148, 136, 0.05)'
        }}
      >
        {/* Title & Badge Counters Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '22px', color: '#064e3b', fontWeight: '800' }}>
              Feed
            </h3>
            {/* Total Count Badge */}
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#0d9488', background: '#ccfbf1', padding: '3px 12px', borderRadius: '20px' }}>
              Total: {posts.length}
            </span>
            {/* Short Posts Badge */}
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#d97706', background: '#fef3c7', padding: '3px 12px', borderRadius: '20px' }}>
              Short (&lt;50 chars): {shortPosts.length}
            </span>
          </div>

          {/* Sort Order Toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            style={{
              background: '#ffffff',
              border: '1px solid #99f6e4',
              color: '#047857',
              padding: '6px 14px',
              fontSize: '12px',
              borderRadius: '8px'
            }}
          >
            Sort: {sortOrder === 'newest' ? '⬇️ Newest First' : '⬆️ Oldest First'}
          </button>
        </div>

        {/* Interactive Filter Controls Bar */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Platform Filter Dropdown */}
          <div style={{ flex: 1, minWidth: '180px' }}>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '13px',
                borderRadius: '8px',
                border: '1px solid #ccfbf1',
                color: '#064e3b',
                background: '#ffffff',
                fontWeight: '600'
              }}
            >
              <option value="All">🌐 All Platforms</option>
              {platforms.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.icon} {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Short Posts Toggle Button */}
          <button
            onClick={() => setShowOnlyShort(!showOnlyShort)}
            style={{
              background: showOnlyShort ? 'linear-gradient(90deg, #d97706, #f59e0b)' : '#ffffff',
              color: showOnlyShort ? '#ffffff' : '#0d9488',
              border: showOnlyShort ? 'none' : '1px solid #99f6e4',
              padding: '8px 16px',
              fontSize: '12px',
              boxShadow: showOnlyShort ? '0 4px 10px rgba(217, 119, 6, 0.25)' : 'none',
            }}
          >
            {showOnlyShort ? '⚡ Filter: Short Only (<50 chars)' : '🔍 Show Short Posts Only'}
          </button>
        </div>
      </div>

      {/* Feed List Items */}
      {filteredAndSortedPosts.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#047857', padding: '40px', background: 'rgba(255,255,255,0.5)', borderRadius: '16px', border: '1px solid #ccfbf1' }}>
          No posts match your selected filter criteria.
        </div>
      ) : (
        filteredAndSortedPosts.map((post) => (
          <PostItem key={post.id} post={post} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};