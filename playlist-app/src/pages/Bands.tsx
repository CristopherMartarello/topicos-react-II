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

const Bands = () => {
  const navigate = useNavigate();
  const [bands, setBands] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBands = async () => {
      setLoading(true);
      const fetchedBands: Artist[] = [];

      for (const name of popularBands) {
        const data = await searchArtist(name);
        if (data?.artists) {
          fetchedBands.push(...data.artists);
        }
      }

      setBands(fetchedBands);
      setLoading(false);
    };

    fetchBands();
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
        {bands.map((band) => (
          <SwiperSlide key={band.idArtist}>
            <section
              className="relative flex h-[82vh] items-end bg-cover bg-center p-10"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url(${
                  band.strArtistFanart || band.strArtistBanner
                })`,
              }}
            >
              <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-zinc-900" />

              <div className="relative z-10 space-y-6 rounded">
                <img
                  src={band.strArtistLogo || band.strArtistCutout}
                  alt={band.strArtist}
                  className="mb-4 h-24 object-contain"
                />
                <InfoTags
                  items={[
                    band.strStyle,
                    band.strGenre,
                    band.strCountry,
                    band.intBornYear,
                  ]}
                />
                <Button
                  onClick={() => navigate(`/artists/${band.strArtist}`)}
                  className="cursor-pointer bg-zinc-300 text-black hover:bg-gray-50"
                  size={'lg'}
                >
                  <ChevronRight />
                  Ir para a Banda
                </Button>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="p-10">
        <h3 className="mb-4 text-xl font-bold">Bandas Populares</h3>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {bands.map((band) => (
            <div
              key={band.idArtist}
              className="group flex flex-col"
              onClick={() => navigate(`/artists/${band.strArtist}`)}
            >
              <Card className="h-full w-full cursor-pointer overflow-hidden p-0 transition duration-300 hover:border-[#FF4081]/95">
                <img
                  src={band.strArtistThumb || band.strArtistFanart2}
                  alt={band.strArtist}
                  className="h-full w-full object-cover"
                />
              </Card>

              <div className="mt-3 truncate text-center text-sm text-white">
                "{band.strArtist}"
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Bands;
