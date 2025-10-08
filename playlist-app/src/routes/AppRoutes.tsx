import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Home from '@/pages/Home';
import Playlists from '@/pages/Playlists';
import Musics from '@/pages/Musics';
import AppLayout from './layout/AppLayout';
import Bands from '@/pages/Bands';
import PlaylistDetails from '@/pages/PaylistDetails';
import ArtistDetails from '@/pages/ArtistDetails';
import AlbumDetails from '@/pages/AlbumDetails';
import Search from '@/pages/Search';
import LikedTracks from '@/pages/LikedTracks';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/artists/:name" element={<ArtistDetails />} />
            <Route path="/bands" element={<Bands />} />
            <Route path="/musics" element={<Musics />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/playlists/:id" element={<PlaylistDetails />} />
            <Route path="/album/:id" element={<AlbumDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/liked-tracks" element={<LikedTracks />} />
          </Route>
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
