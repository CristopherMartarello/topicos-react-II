import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Logo from '@/assets/sonora-logo.png';

import 'swiper/swiper-bundle.css';

import type { Track } from '@/@types/Track';
import type { Album } from '@/@types/Album';

import { getAlbumById, getTracksByAlbum } from '@/api/theAudioDB';
import Spinner from '@/components/Spinner';
import { InfoTags } from '@/components/InfoTags';
import MusicList from '@/components/MusicList';

export default function AlbumDetails() {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const albumData = await getAlbumById(id);
        if (albumData?.album?.[0]) {
          setAlbum(albumData.album[0]);
        }

        const tracksData = await getTracksByAlbum(albumData.album[0].idAlbum);
        setTracks(tracksData?.track || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchAlbumDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <Spinner />
      </div>
    );

  if (!album) return <div className="p-10">Álbum não encontrado</div>;

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
        {[album.strAlbumThumb ?? Logo].filter(Boolean).map((img, i) => (
          <SwiperSlide key={i}>
            <section
              className="relative flex h-[82vh] items-end bg-cover bg-center p-10"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.6)), url(${img})`,
              }}
            >
              <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-zinc-900" />
              <div className="relative z-10 space-y-6 rounded">
                <img
                  src={album.strAlbumThumb || Logo}
                  alt={album.strAlbum}
                  className="h-1/2 w-1/2 object-contain"
                />
                <h1 className="mt-12 text-5xl font-bold">{album.strAlbum}</h1>
                <InfoTags
                  items={[
                    album.strStyle,
                    album.strGenre,
                    album.strArtist,
                    album.intYearReleased,
                  ]}
                />
                <InfoTags items={[album.strLabel, `${album.intScore}/10`]} />
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="p-10">
        <h3 className="mb-4 text-xl font-bold">Músicas do Álbum</h3>
        <MusicList items={tracks} albumThumb={album.strAlbumThumb || Logo} />
      </section>
    </div>
  );
}
