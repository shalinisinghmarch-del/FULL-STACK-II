import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPlatforms, togglePlatform } from './platformsSlice';

export const PlatformsView = () => {
  const platforms = useSelector(selectAllPlatforms);
  const dispatch = useDispatch();

  return (
    <div style={{ background: 'var(--card-bg)', padding: '28px', borderRadius: '20px', border: '1px solid #99f6e4' }}>
      <h3 style={{ marginTop: 0, color: '#064e3b', marginBottom: '8px' }}>🌐 Social Media Platforms</h3>
      <p style={{ color: '#047857', fontSize: '14px', marginTop: 0, marginBottom: '20px' }}>
        Connect or disconnect platforms to dynamically synchronize state and live reach metrics.
      </p>

      <div style={{ display: 'grid', gap: '14px' }}>
        {platforms.map((p) => (
          <div
            key={p.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#ffffff',
              padding: '18px 20px',
              borderRadius: '14px',
              border: '1px solid #ccfbf1',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>{p.icon}</span>
              <div>
                <strong style={{ color: '#064e3b', fontSize: '16px' }}>{p.name}</strong>
                <div style={{ fontSize: '12px', color: p.status === 'Connected' ? '#16a34a' : '#dc2626' }}>
                  ● {p.status}
                </div>
              </div>
            </div>

            <button
              onClick={() => dispatch(togglePlatform(p.id))}
              style={{
                padding: '8px 18px',
                fontSize: '13px',
                background: p.status === 'Connected' ? '#fee2e2' : '#dcfce7',
                color: p.status === 'Connected' ? '#dc2626' : '#15803d',
                border: '1px solid transparent',
              }}
            >
              {p.status === 'Connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};