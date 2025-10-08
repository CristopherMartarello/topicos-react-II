import { useEffect, useState } from 'react';
import { searchTrack } from '../api/theAudioDB';
import { type Track } from '../@types/Track';
import MusicList from '../components/MusicList';
import Spinner from '@/components/Spinner';

const popularTracks = [
  { artist: 'Ed Sheeran', track: 'Shape of You' },
  { artist: 'The Weeknd', track: 'Blinding Lights' },
  { artist: 'Mark Ronson', track: 'Uptown Funk' },
  { artist: 'Adele', track: 'Rolling in the Deep' },
  { artist: 'Billie Eilish', track: 'Bad Guy' },
  { artist: 'Adele', track: 'Someone Like You' },
  { artist: 'Shakira', track: 'Hips Don’t Lie' },
  { artist: 'Coldplay', track: 'Viva La Vida' },
  { artist: 'Justin Bieber', track: 'Sorry' },
  { artist: 'Lady Gaga', track: 'Poker Face' },
  { artist: 'Rihanna', track: 'Umbrella' },
  { artist: 'Imagine Dragons', track: 'Radioactive' },
  { artist: 'Arctic Monkeys', track: 'Do I Wanna Know?' },
  { artist: 'Justin Timberlake', track: 'Can’t Stop the Feeling!' },
  { artist: 'Metallica', track: 'Master of Puppets' },
  { artist: 'Nirvana', track: 'Smells Like Teen Spirit' },
  { artist: 'Eminem', track: 'Lose Yourself' },
  { artist: 'Bruno Mars', track: '24K Magic' },
  { artist: 'Michael Jackson', track: 'Thriller' },
  { artist: 'Queen', track: 'Bohemian Rhapsody' },
];

export default function Musics() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      const fetchedTracks: Track[] = [];

      for (const { artist, track } of popularTracks) {
        try {
          const data = await searchTrack(artist, track);
          if (data?.track) {
            fetchedTracks.push(...data.track);
          }
        } catch (err) {
          console.error(`Erro ao buscar ${artist} - ${track}:`, err);
        }
      }

      setTracks(fetchedTracks);
      setLoading(false);
    };

    fetchTracks();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-20 bg-zinc-900 p-10">
      <h1 className="mb-6 text-2xl font-bold text-white">
        Confira as músicas mais populares!
      </h1>
      {tracks.length > 0 ? (
        <MusicList items={tracks} />
      ) : (
        <div>Nenhuma música encontrada</div>
      )}
    </div>
  );
}
