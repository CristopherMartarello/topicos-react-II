import type { Track } from './Track';

export type Playlist = {
  id: string;
  name: string;
  userId: string;
  musics: Track[];
};
