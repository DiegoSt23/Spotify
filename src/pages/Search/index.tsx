import { useState} from 'react';
import { Stack } from '@mui/material';
import {
  TracksResponse,
  ArtistsResponse,
  AlbumsResponse,
  PlaylistsResponse,
  ShowsResponse,
  EpisodesResponse,
} from '@common/interfaces';
import { useSearch } from '@hooks/search';
import { useTracksTable } from '@hooks/tracks';
import { Page } from '@components/layout';
import { Table } from '@components/common';
import { SearchBar, InitialMessage, ResultsTabs } from '@components/search';
import { ArtistsGrid } from '@components/artists';
import { AlbumsGrid } from '@components/albums';
import { PlaylistsGrid } from '@components/playlists';
import { ShowsGrid } from '@components/shows';
import { EpisodesGrid } from '@components/episodes';

export const Search = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('');
  const { data, isFetching, isFetched } = useSearch(debouncedInputValue);
  const { columns, isSmartphone } = useTracksTable();
  const tabsHeaderData = data ? Object.keys(data) : [];
  const tracks: TracksResponse | undefined = data?.['tracks'];
  const artists: ArtistsResponse | undefined = data?.['artists'];
  const albums: AlbumsResponse | undefined = data?.['albums'];
  const playlists: PlaylistsResponse | undefined = data?.['playlists'];
  const shows: ShowsResponse | undefined = data?.['shows'];
  const episodes: EpisodesResponse | undefined = data?.['episodes'];

  const handleSelectTab = (newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Page
      hideHeaderBorder
      headerElement={
        <SearchBar
          onChange={setDebouncedInputValue}
          isLoading={isFetching}
          isFetched={isFetched}
        />
      }
    >
      {!isFetched ? (
        <InitialMessage isLoading={isFetching} />
      ) : (
        <Stack sx={{ flex: 1, gap: 3 }}>
          <ResultsTabs
            currentTab={currentTab}
            handleSelectTab={handleSelectTab}
            data={tabsHeaderData}
          />
          <Stack sx={{ display: currentTab === 0 ? 'flex' : 'none' }}>
            <Table
              columns={columns.filter(Boolean)}
              rows={tracks?.items}
              loading={isFetching}
              slots={{
                columnHeaders: isSmartphone ? () => null : undefined,
              }}
              hideFooter
              disableRowSelectionOnClick
              disableColumnSelector
            />
          </Stack>
          <Stack sx={{ display: currentTab === 1 ? 'flex' : 'none' }}>
            <ArtistsGrid data={artists?.items} />
          </Stack>
          <Stack sx={{ display: currentTab === 2 ? 'flex' : 'none' }}>
            <AlbumsGrid data={albums?.items} displayArtist />
          </Stack>
          <Stack sx={{ display: currentTab === 3 ? 'flex' : 'none' }}>
            <PlaylistsGrid data={playlists?.items} displayOwner />
          </Stack>
          <Stack sx={{ display: currentTab === 4 ? 'flex' : 'none' }}>
            <ShowsGrid data={shows?.items} displayPublisher />
          </Stack>
          <Stack sx={{ display: currentTab === 5 ? 'flex' : 'none' }}>
            <EpisodesGrid data={episodes?.items} />
          </Stack>
        </Stack>
      )}
    </Page>
  );
};
