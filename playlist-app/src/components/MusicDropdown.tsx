import type { Playlist } from '@/@types/Playlist';
import type { Track } from '@/@types/Track';
import { addMusicToPlaylist } from '@/store/slices/playlistsSlice';

import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface MusicDropdownProps {
  track: Track;
  playlists: Playlist[];
  auth: {
    id: string;
    email: string;
  } | null;
}

const MusicDropdown = ({ track, playlists, auth }: MusicDropdownProps) => {
  const dispatch = useDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer rounded-full bg-black/50 p-2 text-white hover:bg-[#FF4081]/30">
          <Plus className="h-5 w-5 text-pink-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-900 text-white">
        {playlists
          .filter((p) => p.userId === auth?.id)
          .map((p) => (
            <DropdownMenuItem
              key={p.id}
              onClick={() => {
                const alreadyInPlaylist = p.musics?.some(
                  (t) => t.idTrack === track.idTrack
                );

                if (alreadyInPlaylist) {
                  toast.error(
                    `A música "${track.strTrack}" já está na playlist "${p.name}"`
                  );
                } else {
                  toast.success(
                    `Música "${track.strTrack}" adicionada à playlist "${p.name}"!`
                  );
                  dispatch(
                    addMusicToPlaylist({
                      playlistId: p.id,
                      music: track,
                    })
                  );
                }
              }}
            >
              {p.name}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MusicDropdown;
