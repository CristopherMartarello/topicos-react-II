import axios from 'axios';

const API_KEY = '123';
const BASE = `https://www.theaudiodb.com/api/v1/json/${API_KEY}`;

export const searchArtist = async (artist: string) => {
  const q = encodeURIComponent(artist);
  const url = `${BASE}/search.php?s=${q}`;
  const { data } = await axios.get(url);
  return data;
};

export const searchTrack = async (artist: string, trackName: string) => {
  const s = encodeURIComponent(artist);
  const t = encodeURIComponent(trackName);
  const url = `${BASE}/searchtrack.php?s=${s}&t=${t}`;
  const { data } = await axios.get(url);
  return data;
};

export const getTop10Tracks = async (artist: string) => {
  const s = encodeURIComponent(artist);
  const url = `${BASE}/track-top10.php?s=${s}`;
  const { data } = await axios.get(url);
  return data;
};

export const getAlbumsByArtist = async (artistName: string) => {
  const q = encodeURIComponent(artistName);
  const url = `${BASE}/searchalbum.php?s=${q}`;
  const { data } = await axios.get(url);
  return data;
};

export const getAlbumById = async (albumId: string) => {
  const url = `${BASE}/album-mb.php?i=${albumId}`;
  const { data } = await axios.get(url);
  return data;
};

export const getTracksByAlbum = async (albumId: string) => {
  const url = `${BASE}/track.php?m=${albumId}`;
  const { data } = await axios.get(url);
  return data;
};
