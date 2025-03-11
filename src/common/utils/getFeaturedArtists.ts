import { AlbumTrack, ArtistBase } from '@common/interfaces';

export const getFeaturedArtists = (tracks?: AlbumTrack[]) => {
  const featuredArtists: ArtistBase[] = [];

  tracks?.forEach((track) => {
    track.artists.forEach((artist) => {
      if (!featuredArtists.some((item) => item.id === artist.id)) {
        featuredArtists.push(artist);
      }
    });
  });

  return featuredArtists;
};
