import { AlbumTrack, ArtistBase, PlaylistTrack } from '@common/interfaces';

export const getFeaturedArtists = (
  tracks?: AlbumTrack[] | PlaylistTrack[],
  type?: 'album' | 'playlist'
) => {
  const featuredArtists: ArtistBase[] = [];

  if (type === 'album') {
    (tracks as AlbumTrack[])?.forEach((track) => {
      track.artists.forEach((artist) => {
        if (!featuredArtists.some((item) => item.id === artist.id)) {
          featuredArtists.push(artist);
        }
      });
    });
  } else {
    (tracks as PlaylistTrack[])?.forEach((track) => {
      track.track.artists.forEach((artist) => {
        if (!featuredArtists.some((item) => item.id === artist.id)) {
          featuredArtists.push(artist);
        }
      });
    });
  }
  
  return featuredArtists;
};
