import { Stack } from '@mui/material';
import { useSavedSongs } from '@hooks/tracks';
import { useExtendedTracksTable } from '@hooks/tracks';
import { Table } from '@components/common';

export const SavedSongs = () => {
  const { gridApiRef, tracks, total, isFetching } = useSavedSongs();
  const { columns, isSmartphone } = useExtendedTracksTable();

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
        getRowId={(row) => `${row?.track?.album?.id}-${row?.track?.id}`}
        slots={{
          columnHeaders: isSmartphone ? () => null : undefined,
        }}
        paginationMode='server'
        hideFooter
        disableRowSelectionOnClick
        disableColumnSelector
      />
    </Stack>
  );
};
