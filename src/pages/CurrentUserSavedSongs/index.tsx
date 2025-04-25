import { Stack } from '@mui/material';
import {
  useCurrentUserSavedSongs,
  useExtendedTracksTable,
} from '@hooks/tracks';
import { Table } from '@components/common';
import { TrackContextMenu } from '@components/tracks';

export const CurrentUserSavedSongs = () => {
  const {
    gridApiRef,
    tracks,
    total,
    isFetching,
    selectedTrack,
    contextMenuPosition,
    handleOpenContextMenu,
    handleCloseContextMenu,
  } = useCurrentUserSavedSongs();
  const { columns, isSmartphone } = useExtendedTracksTable(
    handleOpenContextMenu
  );

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
        <TrackContextMenu
          selectedTrack={selectedTrack}
          anchorPosition={contextMenuPosition}
          onClose={handleCloseContextMenu}
          isSavedTracksList
        />
      )}
    </Stack>
  );
};
