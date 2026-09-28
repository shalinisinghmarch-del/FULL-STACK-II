import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('Interactive Calendar Tests', () => {
  test('renders initial scheduled event titles correctly[cite: 1]', () => {
    render(<App />);
    expect(screen.getByText('Product Launch Post')).toBeInTheDocument();
    expect(screen.getByText('Weekly Newsletter')).toBeInTheDocument();
  });

  test('filters events by category[cite: 1]', () => {
    render(<App />);
    const filterSelect = screen.getByRole('combobox');
    fireEvent.change(filterSelect, { target: { value: 'Editorial' } });

    expect(screen.getByText('Weekly Newsletter')).toBeInTheDocument();
    expect(screen.queryByText('Product Launch Post')).not.toBeInTheDocument();
  });

  test('handles drag-and-drop state update[cite: 1]', () => {
    render(<App />);
    const sourceCard = screen.getByTestId('event-card-evt-1');
    const targetDayCell = screen.getByTestId('day-cell-2026-08-15');

    const dataTransfer = {
      data: {},
      setData(key, value) { this.data[key] = value; },
      getData(key) { return this.data[key] || ''; }
    };

    fireEvent.dragStart(sourceCard, { dataTransfer });
    fireEvent.dragOver(targetDayCell, { dataTransfer });
    fireEvent.drop(targetDayCell, { dataTransfer });

    expect(targetDayCell).toHaveTextContent('Product Launch Post');
  });
});