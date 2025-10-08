import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import type { RootState } from '../store';
import type { Track } from '@/@types/Track';
import type { Playlist } from '@/@types/Playlist';

type PlaylistsState = {
  items: Playlist[];
};

const initialState: PlaylistsState = { items: [] };

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setPlaylists(state, action: PayloadAction<Playlist[]>) {
      state.items = action.payload;
    },
    addPlaylist(
      state,
      action: PayloadAction<{ name: string; userId: string }>
    ) {
      const p: Playlist = {
        id: uuid(),
        name: action.payload.name,
        userId: action.payload.userId,
        musics: [],
      };
      state.items.push(p);
    },
    updatePlaylist(state, action: PayloadAction<{ id: string; name: string }>) {
      const p = state.items.find((x) => x.id === action.payload.id);
      if (p) p.name = action.payload.name;
    },
    removePlaylist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
    addMusicToPlaylist(
      state,
      action: PayloadAction<{ playlistId: string; music: Track }>
    ) {
      const p = state.items.find((x) => x.id === action.payload.playlistId);
      if (p) p.musics.push(action.payload.music);
    },
    removeMusicFromPlaylist(
      state,
      action: PayloadAction<{ playlistId: string; musicId: string }>
    ) {
      const p = state.items.find((x) => x.id === action.payload.playlistId);
      if (p)
        p.musics = p.musics.filter((m) => m.idTrack !== action.payload.musicId);
    },
  },
});

export const selectPlaylistById = (state: RootState, id: string) =>
  state.playlists.items.find((p) => p.id === id);

export const selectMyPlaylists = (state: RootState, userId: string) =>
  state.playlists.items.filter((p) => p.userId === userId);

export const {
  addPlaylist,
  updatePlaylist,
  removePlaylist,
  addMusicToPlaylist,
  removeMusicFromPlaylist,
  setPlaylists,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
