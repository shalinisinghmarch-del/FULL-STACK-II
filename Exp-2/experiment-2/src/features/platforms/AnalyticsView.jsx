import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPlatforms, selectAnalyticsData, togglePlatform } from './platformsSlice';

export const AnalyticsView = () => {
  const analytics = useSelector(selectAnalyticsData);
  const platforms = useSelector(selectAllPlatforms);
  const dispatch = useDispatch();

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #ccfbf1', textAlign: 'center' }}>
          <span style={{ fontSize: '24px' }}>📊</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#064e3b' }}>{analytics.totalPosts}</div>
          <div style={{ fontSize: '12px', color: '#047857' }}>Total Posts</div>
        </div>

        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #ccfbf1', textAlign: 'center' }}>
          <span style={{ fontSize: '24px' }}>🚀</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#0d9488' }}>{analytics.estimatedReach}</div>
          <div style={{ fontSize: '12px', color: '#047857' }}>Est. Total Reach</div>
        </div>
      </div>

      {/* Platforms Control */}
      <div style={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '16px', border: '1px solid #ccfbf1' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#064e3b' }}>Connected Platforms</h4>
        {platforms.map((p) => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span>{p.icon} {p.name}</span>
            <button
              onClick={() => dispatch(togglePlatform(p.id))}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                background: p.status === 'Connected' ? '#dcfce7' : '#fee2e2',
                color: p.status === 'Connected' ? '#15803d' : '#b91c1c',
              }}
            >
              {p.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};