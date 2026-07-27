import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from './postsSlice';
import { selectAllPlatforms } from '../platforms/platformsSlice';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('Twitter / X');
  const [scheduledDate, setScheduledDate] = useState('2026-07-22');
  
  const platforms = useSelector(selectAllPlatforms);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(
        addPost({
          id: Date.now(),
          title,
          content,
          platform,
          scheduledDate,
        })
      );
      setTitle('');
      setContent('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--card-bg)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #99f6e4',
        boxShadow: '0 20px 30px -10px rgba(13, 148, 136, 0.15)',
        marginBottom: '32px',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', color: '#065f46', display: 'flex', alignItems: 'center', gap: '8px' }}>
        📝 <span style={{ background: 'linear-gradient(90deg, #0d9488, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700' }}>Create New Post</span>
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <input
          type="text"
          placeholder="Enter post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%' }}
        />
        
        <textarea
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          style={{ width: '100%', resize: 'vertical' }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#047857' }}>Target Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '2px solid #ccfbf1', marginTop: '4px' }}
            >
              {platforms.map((p) => (
                <option key={p.id} value={p.name}>{p.icon} {p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#047857' }}>Schedule Date</label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            background: 'linear-gradient(90deg, #0d9488 0%, #059669 50%, #10b981 100%)',
            color: '#ffffff',
            padding: '14px',
            fontSize: '15px',
            marginTop: '6px',
            boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)',
          }}
        >
          🟢 Publish & Schedule
        </button>
      </div>
    </form>
  );
};