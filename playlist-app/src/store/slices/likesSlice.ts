import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Track } from '@/@types/Track';

type LikesState = {
  items: Track[];
};

const initialState: LikesState = {
  items: [],
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    likeMusic(state, action: PayloadAction<Track>) {
      const exists = state.items.find(
        (m) => m.idTrack === action.payload.idTrack
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    unlikeMusic(state, action: PayloadAction<string>) {
      state.items = state.items.filter((m) => m.idTrack !== action.payload);
    },
  },
  selectors: {
    selectLikedMusics: (state) => state.items,
    selectIsLiked: (state, id: string) =>
      state.items.some((m) => m.idTrack === id),
  },
});

export const { likeMusic, unlikeMusic } = likesSlice.actions;
export const { selectLikedMusics, selectIsLiked } = likesSlice.selectors;
export default likesSlice.reducer;
