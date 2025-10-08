import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { searchTrack, searchArtist } from '@/api/theAudioDB';
import type { Artist } from '@/@types/Artist';
import type { Track } from '@/@types/Track';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import Spinner from '@/components/Spinner';
import Logo from '@/assets/sonora-logo.png';
import MusicDropdown from '@/components/MusicDropdown';
import LikeButton from '@/components/LikeButton';

const popularBands = [
  'Metallica',
  "Guns N' Roses",
  'Imagine Dragons',
  'Queen',
  'Maroon 5',
  'Linkin Park',
  'The Beatles',
  'Coldplay',
  'Nirvana',
  'Red Hot Chili Peppers',
  'U2',
  'Arctic Monkeys',
  'Foo Fighters',
  'Green Day',
  'Radiohead',
  'Pearl Jam',
  'The Rolling Stones',
  'Pink Floyd',
  'Muse',
  'AC/DC',
];

const popularArtists = [
  'The Weeknd',
  'Adele',
  'Ed Sheeran',
  'Beyoncé',
  'Taylor Swift',
  'Drake',
  'Bruno Mars',
  'Lady Gaga',
  'Billie Eilish',
  'Post Malone',
  'Dua Lipa',
  'Shawn Mendes',
  'Rihanna',
  'Kendrick Lamar',
  'Ariana Grande',
  'Harry Styles',
  'Justin Bieber',
  'Travis Scott',
  'Olivia Rodrigo',
  'Madonna',
];

export default function Search() {
  const navigate = useNavigate();
  const playlists = useSelector((s: RootState) => s.playlists.items);
  const likedTracks = useSelector((s: RootState) => s.likes.items);
  const auth = useSelector((s: RootState) => s.auth.user);

  const [artistQuery, setArtistQuery] = useState('');
  const [trackQuery, setTrackQuery] = useState('');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!artistQuery && !trackQuery) {
        setArtists([]);
        setTracks([]);
        return;
      }

      setLoading(true);
      try {
        if (artistQuery && trackQuery) {
          const tracksData = await searchTrack(artistQuery, trackQuery);
          setTracks(tracksData?.track || []);
          setArtists([]);
        } else if (artistQuery) {
          const artistsData = await searchArtist(artistQuery);
          setArtists(artistsData?.artists || []);
          setTracks([]);
        }
      } catch (err) {
        console.error(err);
        setArtists([]);
        setTracks([]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [artistQuery, trackQuery]);

  return (
    <div className="mt-20 min-h-screen bg-zinc-900 p-10">
      <h1 className="mb-6 text-2xl font-semibold text-white">Buscar</h1>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-2">
        <Input
          placeholder="Artista"
          value={artistQuery}
          onChange={(e) => setArtistQuery(e.target.value)}
          className="flex-1 text-white selection:bg-[#FF4081]/95 selection:text-white"
        />
        <Input
          placeholder="Música"
          value={trackQuery}
          onChange={(e) => setTrackQuery(e.target.value)}
          className="flex-1 text-white selection:bg-[#FF4081]/95 selection:text-white"
        />
      </div>

      {loading && <Spinner />}

      {tracks.length > 0 && (
        <section className="mb-10">
          <h3 className="mb-4 text-xl font-bold text-white">
            Músicas Encontradas
          </h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {tracks.map((track) => {
              const isLiked = likedTracks.some(
                (t) => t.idTrack === track.idTrack
              );

              return (
                <div
                  key={track.idTrack}
                  className="group relative flex cursor-pointer flex-col"
                >
                  <Card className="h-full w-full overflow-hidden p-0 transition duration-300 hover:border-[#FF4081]/95">
                    <img
                      src={track.strTrackThumb || Logo}
                      alt={track.strTrack}
                      className="h-full w-full bg-zinc-400 object-cover"
                    />

                    <div className="absolute top-2 right-2 z-10 flex gap-2">
                      <LikeButton track={track} isLiked={isLiked} />

                      {playlists.filter((p) => p.userId === auth?.id).length >
                        0 && (
                        <MusicDropdown
                          track={track}
                          playlists={playlists}
                          auth={auth}
                        />
                      )}
                    </div>
                  </Card>

                  <div className="mt-3 text-center text-sm text-white">
                    "{track.strTrack}"
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {artists.length > 0 && (
        <section className="mb-10">
          <h3 className="mb-4 text-xl font-bold text-white">
            Artistas Encontrados
          </h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {artists.map((artist) => (
              <div
                key={artist.idArtist}
                className="group flex cursor-pointer flex-col"
                onClick={() => navigate(`/artists/${artist.strArtist}`)}
              >
                <Card className="h-full w-full overflow-hidden p-0 transition duration-300 hover:border-[#FF4081]/95">
                  <img
                    src={artist.strArtistThumb || artist.strArtistFanart2}
                    alt={artist.strArtist}
                    className="h-full w-full object-cover"
                  />
                </Card>
                <div className="mt-3 text-center text-sm text-white">
                  "{artist.strArtist}"
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!loading &&
        (artistQuery || trackQuery) &&
        tracks.length === 0 &&
        artists.length === 0 && (
          <div className="mt-6 text-center text-gray-400">
            Nenhum resultado encontrado para sua busca.
          </div>
        )}

      {!artistQuery && !trackQuery && (
        <>
          <section className="mb-10">
            <h3 className="mb-4 text-xl font-bold text-white">
              Bandas Populares
            </h3>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
              {popularBands.map((name) => (
                <div
                  key={name}
                  className="group flex cursor-pointer flex-col"
                  onClick={() => navigate(`/artists/${name}`)}
                >
                  <Card className="h-full w-full overflow-hidden p-0 transition duration-300 hover:border-[#FF4081]/95">
                    <div className="flex h-full w-full items-center justify-center bg-zinc-700 font-bold text-white">
                      {name}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="mb-4 text-xl font-bold text-white">
              Artistas Populares
            </h3>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
              {popularArtists.map((name) => (
                <div
                  key={name}
                  className="group flex cursor-pointer flex-col"
                  onClick={() => navigate(`/artists/${name}`)}
                >
                  <Card className="h-full w-full overflow-hidden p-0 transition duration-300 hover:border-[#FF4081]/95">
                    <div className="flex h-full w-full items-center justify-center bg-zinc-700 font-bold text-white">
                      {name}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
