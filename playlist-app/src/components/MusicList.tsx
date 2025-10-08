import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store/store';
import type { Track } from '@/@types/Track';
import Logo from '@/assets/sonora-logo.png';

import { Card } from '@/components/ui/card';

import { Heart } from 'lucide-react';
import { likeMusic, unlikeMusic } from '@/store/slices/likesSlice';
import MusicDropdown from './MusicDropdown';

interface MusicListProps {
  items: Track[];
  albumThumb?: string;
}

export default function MusicList({ items, albumThumb }: MusicListProps) {
  const playlists = useSelector((s: RootState) => s.playlists.items);
  const likedTracks = useSelector((s: RootState) => s.likes.items);
  const auth = useSelector((s: RootState) => s.auth.user);
  const dispatch = useDispatch();

  if (!items || items.length === 0)
    return <div className="text-white">Não há músicas.</div>;

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="flex flex-col gap-4">
        {items.map((m: Track) => {
          const isLiked = likedTracks.some(
            (track) => track.idTrack === m.idTrack
          );

          return (
            <Card
              key={m.idTrack}
              className="flex cursor-pointer flex-row items-center justify-between border-none bg-zinc-800 p-4 hover:border-[#FF4081]/95 hover:bg-[#FF4081]/10 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <img
                  src={m.strTrackThumb || albumThumb || Logo}
                  alt={m.strArtist}
                  className="h-16 w-16 rounded object-cover"
                />
                <div>
                  <div className="font-semibold text-white">{m.strTrack}</div>
                  <div className="text-sm text-gray-400">{m.strArtist}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="rounded-full p-2 transition hover:bg-pink-100 dark:hover:bg-pink-900"
                  onClick={() => {
                    if (!auth) return;
                    if (isLiked) {
                      dispatch(unlikeMusic(m.idTrack));
                    } else {
                      dispatch(likeMusic(m));
                    }
                  }}
                >
                  <Heart
                    className={`h-5 w-5 cursor-pointer ${
                      isLiked ? 'fill-pink-600 text-pink-600' : 'text-pink-500'
                    }`}
                  />
                </button>

                {playlists.filter((p) => p.userId === auth?.id).length > 0 && (
                  <MusicDropdown track={m} playlists={playlists} auth={auth} />
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
