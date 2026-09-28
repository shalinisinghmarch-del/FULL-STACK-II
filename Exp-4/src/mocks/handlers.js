import { rest } from 'msw';

export const handlers = [
  rest.get('/api/events', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 'evt-101', title: 'MSW Mock Event 1', date: '2026-08-10', category: 'Marketing' },
        { id: 'evt-102', title: 'MSW Mock Event 2', date: '2026-08-11', category: 'Editorial' }
      ])
    );
  })
];