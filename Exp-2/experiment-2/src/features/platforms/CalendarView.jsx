import React from 'react';
import { useSelector } from 'react-redux';
import { selectCalendarSchedule } from '../posts/postsSlice';

export const CalendarView = () => {
  const schedule = useSelector(selectCalendarSchedule);

  return (
    <div style={{ background: 'var(--card-bg)', padding: '24px', borderRadius: '16px', border: '1px solid #ccfbf1' }}>
      <h3 style={{ marginTop: 0, color: '#064e3b' }}>📅 Scheduled Content Calendar</h3>
      <div style={{ display: 'grid', gap: '12px' }}>
        {schedule.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div>
              <strong>{item.title}</strong>
              <div style={{ fontSize: '12px', color: '#0d9488' }}>{item.platform}</div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#d97706' }}>{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};