import { Stack } from '@mui/material';
import { useLanguage } from '@hooks/common';
import { useTracksTable } from '@hooks/tracks';
import { useSearchResults } from '@hooks/search';
import { Page } from '@components/layout';
import { Table } from '@components/common';
import { TrackContextMenu } from '@components/tracks';
import { SearchBar, InitialMessage, ResultsTabs } from '@components/search';
import { ArtistsGrid } from '@components/artists';
import { AlbumsGrid } from '@components/albums';
import { PlaylistsGrid } from '@components/playlists';

export const Search = () => {
  const { t } = useLanguage('search');
  const {
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
  } = useSearchResults();
  const { columns, isSmartphone } = useTracksTable(handleOpenContextMenu);

  return (
    <Page
      hideHeaderBorder
      headerElement={
        <SearchBar
          placeholder={t('searchBar.placeholder')}
          onChange={setDebouncedInputValue}
          isFetched={isFetched}
        />
      }
    >
      {!isFetched ? (
        <InitialMessage message={t('searchMessage')} isLoading={isFetching} />
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
              onRowRightClick={handleOpenContextMenu}
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
        </Stack>
      )}
      {contextMenuPosition !== null && (
        <TrackContextMenu
          selectedTrack={selectedTrack}
          anchorPosition={contextMenuPosition}
          onClose={handleCloseContextMenu}
        />
      )}
    </Page>
  );
};
