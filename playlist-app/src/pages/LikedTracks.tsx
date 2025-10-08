import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import MusicList from '@/components/MusicList';

export default function LikedTracks() {
  const likedTracks = useSelector((state: RootState) => state.likes.items);

  return (
    <div className="mt-20 min-h-screen bg-zinc-900 p-10">
      <h1 className="mb-6 text-2xl font-bold text-white">Músicas Curtidas</h1>

      {likedTracks.length === 0 ? (
        <div className="text-gray-400">
          Você ainda não curtiu nenhuma música.
        </div>
      ) : (
        <MusicList items={likedTracks} />
      )}
    </div>
  );
}
