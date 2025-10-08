import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { searchArtist } from '@/api/theAudioDB';
import { type Artist } from '@/@types/Artist';
import 'swiper/swiper-bundle.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import { ChevronRight } from 'lucide-react';
import { InfoTags } from '@/components/InfoTags';

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

const Home = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      const fetchedArtists: Artist[] = [];

      for (const name of popularArtists) {
        const data = await searchArtist(name);
        if (data?.artists) {
          fetchedArtists.push(...data.artists);
        }
      }

      setArtists(fetchedArtists);
      setLoading(false);
    };

    fetchArtists();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <Spinner />
      </div>
    );

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
        {artists.map((artist) => (
          <SwiperSlide key={artist.idArtist}>
            <section
              className="relative flex h-[82vh] items-end bg-cover bg-center p-10"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url(${
                  artist.strArtistFanart || artist.strArtistBanner
                })`,
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
                <Button
                  onClick={() => navigate(`/artists/${artist.strArtist}`)}
                  className="cursor-pointer bg-zinc-300 text-black hover:bg-gray-50"
                  size={'lg'}
                >
                  <ChevronRight />
                  Ir para o Artista
                </Button>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="p-10">
        <h3 className="mb-4 text-xl font-bold">Artistas Populares</h3>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {artists.map((artist) => (
            <div
              key={artist.idArtist}
              className="group flex flex-col"
              onClick={() => navigate(`/artists/${artist.strArtist}`)}
            >
              <Card className="h-full w-full cursor-pointer overflow-hidden p-0 transition duration-300 hover:border-[#FF4081]/95">
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
    </div>
  );
};

export default Home;
