import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/assets/sonora-logo.png';
import { HeartIcon, SearchIcon, UserIcon } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMusicPage = pathname === '/musics';
  const isPlaylistPage = pathname === '/playlists';
  const isPlaylistDetailsPage = pathname.startsWith('/playlists/');
  const isSearchPage = pathname === '/search';
  const isLikedTracksPage = pathname === '/liked-tracks';

  return (
    <header
      className={`fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between p-10 transition-colors duration-500 ${
        scrolled ||
        isMusicPage ||
        isPlaylistPage ||
        isPlaylistDetailsPage ||
        isSearchPage ||
        isLikedTracksPage
          ? 'bg-gradient-to-r from-[#FF7F50]/80 to-[#FF4081]/80'
          : 'bg-transparent'
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => navigate('/home')}
        >
          <img src={Logo} alt="Logo" className="mr-3 h-20 w-20" />
          <h1 className="text-3xl font-bold text-white">Sonora</h1>
        </div>
        <div className="flex gap-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `cursor-pointer text-lg font-semibold text-white ${
                isActive ? 'border-b-2 border-white pb-1' : ''
              }`
            }
          >
            Artistas
          </NavLink>
          <NavLink
            to="/bands"
            className={({ isActive }) =>
              `cursor-pointer text-lg font-semibold text-white ${
                isActive ? 'border-b-2 border-white pb-1' : ''
              }`
            }
          >
            Bandas
          </NavLink>
          <NavLink
            to="/musics"
            className={({ isActive }) =>
              `cursor-pointer text-lg font-semibold text-white ${
                isActive ? 'border-b-2 border-white pb-1' : ''
              }`
            }
          >
            Músicas
          </NavLink>
          <NavLink
            to="/playlists"
            className={({ isActive }) =>
              `cursor-pointer text-lg font-semibold text-white ${
                isActive ? 'border-b-2 border-white pb-1' : ''
              }`
            }
          >
            Playlists
          </NavLink>
        </div>
        <div className="flex gap-6">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `cursor-pointer text-lg font-semibold text-white ${
                isActive ? 'border-b-2 border-white pb-1' : ''
              }`
            }
          >
            <SearchIcon className="cursor-pointer text-white" />
          </NavLink>
          <NavLink
            to="/liked-tracks"
            className={({ isActive }) =>
              `cursor-pointer text-lg font-semibold text-white ${
                isActive ? 'border-b-2 border-white pb-1' : ''
              }`
            }
          >
            <HeartIcon className="cursor-pointer text-white" />
          </NavLink>
          <UserIcon className="cursor-pointer text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
