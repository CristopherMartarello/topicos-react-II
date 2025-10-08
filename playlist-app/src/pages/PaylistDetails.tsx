import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { selectPlaylistById } from '@/store/slices/playlistsSlice';
import MusicItem from '@/components/MusicItem';
import Spinner from '@/components/Spinner';

export default function PlaylistDetails() {
  const { id } = useParams();
  const playlist = useSelector((state: RootState) =>
    id ? selectPlaylistById(state, id) : null
  );

  if (!playlist) return <Spinner />;

  return (
    <div className="mt-20 bg-zinc-900 p-10">
      <h1 className="mb-4 text-2xl font-bold text-white">{playlist.name}</h1>
      <MusicItem items={playlist.musics} playlistId={playlist.id} />
    </div>
  );
}
