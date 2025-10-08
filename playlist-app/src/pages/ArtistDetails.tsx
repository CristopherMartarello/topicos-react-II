import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import { Card } from '@/components/ui/card';
import type { Track } from '@/@types/Track';
import type { Artist } from '@/@types/Artist';
import type { Album } from '@/@types/Album';

import {
  searchArtist,
  getTop10Tracks,
  getAlbumsByArtist,
} from '@/api/theAudioDB';
import Spinner from '@/components/Spinner';
import { InfoTags } from '@/components/InfoTags';

export default function ArtistDetails() {
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [lovedAlbums, setLovedAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      if (!name) return;
      setLoading(true);
      try {
        const artistData = await searchArtist(name);
        if (artistData?.artists?.[0]) {
          setArtist(artistData.artists[0]);
        }

        const topTracksData = await getTop10Tracks(name);
        setTopTracks(topTracksData?.track || []);

        const albumsData = await getAlbumsByArtist(name);
        setLovedAlbums(albumsData?.album.reverse() || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchArtistDetails();
  }, [name]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <Spinner />
      </div>
    );

  if (!artist) return <div className="p-10">Artista não encontrado</div>;

  return (
    <div className="bg-zinc-900 text-white">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="min-h-[70vh]"
      >
        {[artist.strArtistFanart, artist.strArtistFanart2]
          .filter(Boolean)
          .map((img, i) => (
            <SwiperSlide key={i}>
              <section
                className="relative flex h-[82vh] items-end bg-cover bg-center p-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url(${img})`,
                }}
              >
                <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-zinc-900" />

                <div className="relative z-10 space-y-6 rounded">
                  <img
                    src={artist.strArtistLogo || artist.strArtistCutout}
                    alt={artist.strArtist}
                    className="mb-4 h-24 object-contain"
                  />

                  <InfoTags
                    items={[
                      artist.strStyle,
                      artist.strGenre,
                      artist.strCountry,
                      artist.intBornYear,
                    ]}
                  />
                </div>
              </section>
            </SwiperSlide>
          ))}
      </Swiper>

      <section className="p-10">
        <h3 className="mb-4 text-xl font-bold">Top 10 (3) Músicas</h3>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {topTracks.map((track) => (
            <div className="group flex flex-col">
              <Card
                key={track.idTrack}
                className="h-full w-full cursor-pointer overflow-hidden p-0 transition duration-300 hover:border-[#FF4081]/95"
              >
                <img
                  src={track.strTrackThumb || artist.strArtistThumb}
                  alt={track.strTrack}
                  className="h-full w-full object-cover"
                />
              </Card>

              <div className="p-3 text-center">"{track.strTrack}"</div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-10">
        <h3 className="mb-4 text-xl font-bold">Álbuns do Artista</h3>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {lovedAlbums.map((album) => (
            <div
              className="group flex flex-col"
              onClick={() => navigate(`/album/${album.strMusicBrainzID}`)}
            >
              <Card
                key={album.idAlbum}
                className="h-full w-full cursor-pointer overflow-hidden p-0 transition duration-300 hover:border-[#FF4081]/95"
              >
                <img
                  src={album.strAlbumThumb || artist.strArtistLogo}
                  alt={album.strAlbum}
                  className="h-full w-full object-cover"
                />
              </Card>
              <div className="p-3 text-center">"{album.strAlbum}"</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
