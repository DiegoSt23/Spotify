import { useGetCurrentUserTracks } from '@hooks/tracks';
import { useExtendedTracksTable } from '@hooks/tracks';
import { Page } from '@components/layout';
import { Table } from '@components/common';

export const Songs = () => {
  const { data, isFetching } = useGetCurrentUserTracks();
  const { columns, isSmartphone } = useExtendedTracksTable();

  return (
    <Page title='Saved Songs'>
      <Table
        columns={columns.filter(Boolean)}
        rows={data?.items}
        loading={isFetching}
        getRowId={(row) => row?.track?.id}
        slots={{
          columnHeaders: isSmartphone ? () => null : undefined,
        }}
        hideFooter
        disableRowSelectionOnClick
        disableColumnSelector
      />
    </Page>
  );
};
