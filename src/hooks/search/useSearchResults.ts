import { useState, type MouseEvent } from 'react';
import {
  TracksResponse,
  ArtistsResponse,
  AlbumsResponse,
  PlaylistsResponse,
  ContextMenuPosition,
  TrackContext,
} from '@common/interfaces';
import { useSearch } from '@services/search';

const initialTrackContext: TrackContext = {
  id: '',
  name: '',
  artists: '',
};

export const useSearchResults = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('');
  const [trackContext, setTrackContext] =
    useState<TrackContext>(initialTrackContext);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition | null>(null);
  const { data, isFetching, isFetched } = useSearch(debouncedInputValue);
  const tabsHeaderData = data ? Object.keys(data) : [];
  const tracks: TracksResponse | undefined = data?.['tracks'];
  const artists: ArtistsResponse | undefined = data?.['artists'];
  const albums: AlbumsResponse | undefined = data?.['albums'];
  const playlists: PlaylistsResponse | undefined = data?.['playlists'];

  const handleSelectTab = (newValue: number) => {
    setCurrentTab(newValue);
  };

   const handleOpenContextMenu = (
     event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
     id: string
   ) => {
     event.preventDefault();

     const name = tracks?.items?.find((track) => track.id === id)?.name ?? '';
     const artists =
       tracks?.items
         ?.find((track) => track.id === id)
         ?.artists?.map((artist) => artist.name)
         ?.join(', ') ?? '';

     setTrackContext({
       id: id ?? '',
       name,
       artists,
     });
     setContextMenuPosition(
       contextMenuPosition === null
         ? {
             top: event.clientY - 6,
             left: event.clientX + 2,
           }
         : null
     );
   };

   const handleCloseContextMenu = () => {
     setContextMenuPosition(null);
     setTrackContext(initialTrackContext);
   };

   const handleAddTrack = () => {
     console.log('Add track', trackContext.id);
   };

   const handleAddTrackToQueue = () => {
     console.log('Add to queue', trackContext.id);
   };

   const handleAddTrackToPlaylist = () => {
     console.log('Add track to playlist', trackContext.id);
   };

   const handleCopyTrackLink = () => {
     console.log('Copy track link', trackContext.id);
   };

  return {
    tabsHeaderData,
    tracks,
    artists,
    albums,
    playlists,
    isFetching,
    isFetched,
    currentTab,
    handleSelectTab,
    setDebouncedInputValue,
    contextMenuPosition,
    trackContext,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleAddTrack,
    handleAddTrackToQueue,
    handleAddTrackToPlaylist,
    handleCopyTrackLink,
  };
};
