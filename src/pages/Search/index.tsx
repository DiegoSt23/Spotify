import { Stack, type Theme } from '@mui/material';
import { Add, QueueMusic, PlaylistAdd, ContentCopy } from '@mui/icons-material';
import { useLanguage } from '@hooks/common';
import { useTracksTable } from '@hooks/tracks';
import { useSearchResults } from '@hooks/search';
import { Page } from '@components/layout';
import { Table, ContextMenu } from '@components/common';
import { SearchBar, InitialMessage, ResultsTabs } from '@components/search';
import { ArtistsGrid } from '@components/artists';
import { AlbumsGrid } from '@components/albums';
import { PlaylistsGrid } from '@components/playlists';

const contextMenuIconSx = {
  width: 20,
  height: 20,
  fill: (theme: Theme) => theme.palette.accent.main,
};

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
    trackContext,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleAddTrack,
    handleAddTrackToQueue,
    handleAddTrackToPlaylist,
    handleCopyTrackLink,
  } = useSearchResults();
  const { columns, isSmartphone } = useTracksTable(handleOpenContextMenu);
  const trackOptions = [
    {
      label: t('trackOptions.add'),
      action: handleAddTrack,
      icon: <Add sx={contextMenuIconSx} />,
    },
    {
      label: t('trackOptions.addToQueue'),
      action: handleAddTrackToQueue,
      icon: <QueueMusic sx={contextMenuIconSx} />,
    },
    {
      label: t('trackOptions.addToPlaylist'),
      action: handleAddTrackToPlaylist,
      icon: <PlaylistAdd sx={contextMenuIconSx} />,
    },
    {
      label: t('trackOptions.copyLink'),
      action: handleCopyTrackLink,
      icon: (
        <ContentCopy
          sx={{ width: 18, height: 18, fill: contextMenuIconSx.fill }}
        />
      ),
    },
  ];

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
        <ContextMenu
          title={trackContext.name}
          subtitle={trackContext.artists}
          options={trackOptions}
          anchorPosition={contextMenuPosition}
          onClose={handleCloseContextMenu}
        />
      )}
    </Page>
  );
};
