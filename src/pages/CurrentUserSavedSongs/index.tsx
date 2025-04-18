import { Stack, type Theme } from '@mui/material';
import { QueueMusic, PlaylistAdd, ContentCopy } from '@mui/icons-material';
import { useLanguage } from '@hooks/common';
import {
  useCurrentUserSavedSongs,
  useExtendedTracksTable,
} from '@hooks/tracks';
import { Table, ContextMenu } from '@components/common';

const contextMenuIconSx = {
  width: 20,
  height: 20,
  fill: (theme: Theme) => theme.palette.accent.main,
};

export const CurrentUserSavedSongs = () => {
  const { t } = useLanguage('tracks');
  const {
    gridApiRef,
    tracks,
    total,
    isFetching,
    trackContext,
    contextMenuPosition,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleAddTrackToQueue,
    handleAddTrackToPlaylist,
    handleCopyTrackLink,
  } = useCurrentUserSavedSongs();
  const { columns, isSmartphone } = useExtendedTracksTable(
    handleOpenContextMenu
  );
  const trackOptions = [
    {
      label: t('tracksTable.trackOptions.addToQueue'),
      action: handleAddTrackToQueue,
      icon: <QueueMusic sx={contextMenuIconSx} />,
    },
    {
      label: t('tracksTable.trackOptions.addToPlaylist'),
      action: handleAddTrackToPlaylist,
      icon: <PlaylistAdd sx={contextMenuIconSx} />,
    },
    {
      label: t('tracksTable.trackOptions.copyLink'),
      action: handleCopyTrackLink,
      icon: (
        <ContentCopy
          sx={{ width: 18, height: 18, fill: contextMenuIconSx.fill }}
        />
      ),
    },
  ];

  return (
    <Stack
      sx={{
        height: {
          xs: 'calc(100dvh - 130px)',
          sm: 'calc(100dvh - 185px)',
          md: 'calc(100dvh - 120px)',
        },
        pt: 2,
      }}
    >
      <Table
        apiRef={gridApiRef}
        columns={columns.filter(Boolean)}
        rows={tracks}
        rowCount={total}
        loading={isFetching}
        getRowId={(row) => row?.track?.id}
        slots={{
          columnHeaders: isSmartphone ? () => null : undefined,
        }}
        onRowRightClick={handleOpenContextMenu}
        paginationMode='server'
        hideFooter
        disableRowSelectionOnClick
        disableColumnSelector
      />
      {contextMenuPosition !== null && (
        <ContextMenu
          title={trackContext.name}
          subtitle={trackContext.artists}
          options={trackOptions}
          anchorPosition={contextMenuPosition}
          onClose={handleCloseContextMenu}
        />
      )}
    </Stack>
  );
};
