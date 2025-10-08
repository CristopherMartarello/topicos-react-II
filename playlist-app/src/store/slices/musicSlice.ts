import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type MusicState = {
  searchResults: unknown[];
  top10: unknown[];
  loading: boolean;
  error?: string | null;
};

const initialState: MusicState = {
  searchResults: [],
  top10: [],
  loading: false,
  error: null,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSearchResults(state, action: PayloadAction<unknown[]>) {
      state.searchResults = action.payload;
    },
    setTop10(state, action: PayloadAction<unknown[]>) {
      state.top10 = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setSearchResults, setTop10, setError } =
  musicSlice.actions;
export default musicSlice.reducer;
