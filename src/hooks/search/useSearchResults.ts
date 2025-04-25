import { useState, type MouseEvent } from 'react';
import {
  TracksResponse,
  ArtistsResponse,
  AlbumsResponse,
  PlaylistsResponse,
  ContextMenuPosition,
  Track,
} from '@common/interfaces';
import { useSearch } from '@services/search';

export const useSearchResults = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
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

    event.preventDefault();
    const track = tracks?.items?.find((track) => track.id === id);

    if (!track) return;

    setSelectedTrack(track);
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
    setSelectedTrack(null);
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
    selectedTrack,
    handleOpenContextMenu,
    handleCloseContextMenu,
  };
};
