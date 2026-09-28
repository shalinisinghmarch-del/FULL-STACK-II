import { createSlice, createSelector } from '@reduxjs/toolkit';
import { selectAllPosts } from '../posts/postsSlice';

const initialState = {
  list: [
    { id: 'p1', name: 'Twitter / X', status: 'Connected', icon: '🐦' },
    { id: 'p2', name: 'LinkedIn', status: 'Connected', icon: '💼' },
    { id: 'p3', name: 'Instagram', status: 'Disconnected', icon: '📸' },
  ],
};

const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    togglePlatform: (state, action) => {
      const platform = state.list.find((p) => p.id === action.payload);
      if (platform) {
        platform.status = platform.status === 'Connected' ? 'Disconnected' : 'Connected';
      }
    },
  },
});

export const { togglePlatform } = platformsSlice.actions;
export const selectAllPlatforms = (state) => state.platforms.list;

// --- MEMOIZED SELECTOR FOR ANALYTICS VIEW ---
export const selectAnalyticsData = createSelector(
  [selectAllPosts, selectAllPlatforms],
  (posts, platforms) => {
    const totalPosts = posts.length;
    const connectedCount = platforms.filter((p) => p.status === 'Connected').length;
    const avgCharCount = totalPosts
      ? Math.round(posts.reduce((acc, p) => acc + (p.content ? p.content.length : 0), 0) / totalPosts)
      : 0;

    return {
      totalPosts,
      connectedCount,
      avgCharCount,
      estimatedReach: totalPosts * connectedCount * 150,
    };
  }
);

export default platformsSlice.reducer;