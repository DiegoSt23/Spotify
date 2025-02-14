import { useState, useEffect, type ChangeEvent } from 'react';
import { Stack, TextField, CircularProgress, Tabs, Tab, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear } from '@mui/icons-material';
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
import { ArtistsGrid } from '@components/artists';
import { AlbumsGrid } from '@components/albums';
import { PlaylistsGrid } from '@components/playlists';
import { ShowsGrid } from '@components/shows';
import { EpisodesGrid } from '@components/episodes';

export const Search = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [inputValue, setSearchQuery] = useState<string>('');
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('');
  const { data, isFetching } = useSearch(debouncedInputValue);
  const { columns, isSmartphone } = useTracksTable();
  const tabsHeaderData = data ? Object.keys(data) : [];
  const tabsContentData = data ? Object.values(data) : [];
  const tracks: TracksResponse | undefined = data?.['tracks'];
  const artists: ArtistsResponse | undefined = data?.['artists'];
  const albums: AlbumsResponse | undefined = data?.['albums'];
  const playlists: PlaylistsResponse | undefined = data?.['playlists'];
  const shows: ShowsResponse | undefined = data?.['shows'];
  const episodes: EpisodesResponse | undefined = data?.['episodes'];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleInputClear = () => setSearchQuery('');

  const handleSelectTab = (newValue: number) => {
    setCurrentTab(newValue);
  };
  
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);

    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue]);

  return (
    <Page
      title='Search'
      headerElement={
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Search...'
          size='small'
          slotProps={{
            input: {
              endAdornment: inputValue ? (
                <IconButton size='small' edge='end'>
                  <Clear
                    sx={{ width: 16, height: 16 }}
                    onClick={handleInputClear}
                  />
                </IconButton>
              ) : (
                <SearchIcon sx={{ width: 20, height: 20 }} />
              ),
            },
          }}
        />
      }
    >
      <Stack sx={{ flex: 1, gap: 3 }}>
        {/* <Tabs
          value={currentTab}
          onChange={(_, val) => handleSelectTab(val)}
          variant='standard'
          TabIndicatorProps={{
            sx: {
              height: 35,
              borderRadius: 1.2,
              zIndex: 1,
              backgroundColor: (theme) => theme.palette.action.selected,
            },
          }}
        >
          {tabsHeaderData?.map((tab, index) => (
            <Tab
              label={tab}
              value={index}
              sx={{
                padding: 0,
                minHeight: 35,
                height: 35,
                zIndex: 2,
                borderRadius: 1,
                textTransform: 'capitalize',
                '&.Mui-selected': {
                  color: (theme) =>
                    theme.palette.getContrastText(
                      theme.palette.background.paper
                    ),
                },
              }}
              disableRipple
              tabIndex={0}
            />
          ))}
        </Tabs> */}
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
        <ArtistsGrid data={artists?.items} />
        <PlaylistsGrid data={playlists?.items} displayOwner />
        <ShowsGrid data={shows?.items} />
        <EpisodesGrid data={episodes?.items} />
        <AlbumsGrid data={albums?.items} displayArtist />
      </Stack>
    </Page>
  );
};
