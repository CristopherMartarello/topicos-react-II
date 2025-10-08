import { removeMusicFromPlaylist } from '@/store/slices/playlistsSlice';
import { Trash } from 'lucide-react';
import { Card } from './ui/card';
import type { Track } from '@/@types/Track';
import type { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { transformMinutes } from '@/utils/trackUtils';
import Logo from '@/assets/sonora-logo.png';
import LikeButton from './LikeButton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { toast } from 'sonner';

interface MusicItemProps {
  items: Track[];
  playlistId?: string;
  albumThumb?: string | null;
}

export default function MusicItem({
  items,
  playlistId,
  albumThumb,
}: MusicItemProps) {
  const auth = useSelector((s: RootState) => s.auth.user);
  const likedTracks = useSelector((s: RootState) => s.likes.items);
  const dispatch = useDispatch();

  if (!items || items.length === 0)
    return <div className="text-white">Não há músicas.</div>;

  return (
    <div className="flex flex-col gap-4">
      {items.map((m) => {
        const isLiked = likedTracks.some(
          (track) => track.idTrack === m.idTrack
        );

        return (
          <Card
            key={m.idTrack}
            className="flex cursor-pointer flex-row items-center justify-between border-none bg-zinc-800 p-4 shadow-md hover:border-[#FF4081] hover:bg-[#FF4081]/10 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src={albumThumb ?? m.strTrackThumb ?? Logo}
                alt={m.strArtist}
                className="h-16 w-16 rounded object-cover"
              />
              <div>
                <div className="font-semibold text-white">{m.strTrack}</div>
                <div className="text-sm text-gray-400">{m.strArtist}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-400">
                {transformMinutes(m.intDuration as string)}
              </div>

              <LikeButton track={m} isLiked={isLiked} />

              {playlistId && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="rounded-full p-2 transition hover:bg-pink-100 dark:hover:bg-pink-900">
                      <Trash className="h-5 w-5 cursor-pointer text-red-500" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-zinc-900 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Remover música da playlist
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja remover a música "{m.strTrack}"
                        da playlist? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-transparent">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          if (!auth) return;
                          dispatch(
                            removeMusicFromPlaylist({
                              playlistId,
                              musicId: m.idTrack,
                            })
                          );
                          toast.warning(
                            `Música "${m.strTrack}" foi removida da playlist.`
                          );
                        }}
                        className="cursor-pointer bg-[#FF4081]/95 hover:bg-[#FF4081]/50"
                      >
                        Remover
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
