import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import playlistsReducer from './slices/playlistsSlice';
import likesReducer from './slices/likesSlice';
import { saveToLocal, loadFromLocal } from '../utils/storage';

const preloaded = loadFromLocal('app_state_v1') ?? undefined;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    playlists: playlistsReducer,
    likes: likesReducer,
  },
  preloadedState: preloaded,
});

store.subscribe(() => {
  const state = store.getState();
  const toPersist = {
    auth: state.auth,
    playlists: state.playlists,
    likes: state.likes,
  };
  saveToLocal('app_state_v1', toPersist);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
