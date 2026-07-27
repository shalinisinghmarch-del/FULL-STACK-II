import { 
  createSlice, 
  createAsyncThunk, 
  createEntityAdapter, 
  createSelector 
} from '@reduxjs/toolkit';

const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return [
    { id: 1, title: 'Product Launch Update', content: 'We are launching our v2.0 update tomorrow!', platform: 'Twitter / X', scheduledDate: '2026-07-22' },
    { id: 2, title: 'Weekly Tech Newsletter', content: 'Check out our top engineering highlights from this week.', platform: 'LinkedIn', scheduledDate: '2026-07-24' },
    { id: 3, title: 'Quick Note', content: 'Short announcement post.', platform: 'Twitter / X', scheduledDate: '2026-07-25' },
  ];
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      postsAdapter.addOne(state, action.payload);
    },
    updatePost: (state, action) => {
      postsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    deletePost: (state, action) => {
      postsAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectShortPosts = createSelector(
  [selectAllPosts],
  (posts) => posts.filter((post) => post.content && post.content.length < 50)
);

// --- MEMOIZED SELECTOR FOR CALENDAR VIEW ---
export const selectCalendarSchedule = createSelector(
  [selectAllPosts],
  (posts) => {
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      platform: post.platform || 'General',
      date: post.scheduledDate || '2026-07-21',
    }));
  }
);