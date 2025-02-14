import { Stack, Typography, Chip } from '@mui/material';
import { PlaylistExtended } from '@common/interfaces';
import { useExtendedTracksTable } from '@hooks/tracks';
import { Table, MediaHeader } from '@components/common';

export const PlaylistDetails = ({
  images,
  name,
  description,
  owner,
  tracks,
  public: isPublic,
  collaborative,
}: Partial<PlaylistExtended>) => {
  const { columns, isSmartphone } = useExtendedTracksTable();

  return (
    <Stack gap={3}>
      <MediaHeader
        cover={images?.[0]?.url}
        title={name}
        owner={owner?.display_name}
        details={
          <Stack
            sx={{
              justifyContent: { xs: 'center', sm: 'flex-start' },
              gap: 1,
              mt: { xs: 0, sm: 0.5 },
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{ color: (theme) => theme.palette.text.disabled }}
            >
              {tracks?.total && `${tracks?.total} tracks`}
            </Typography>
            <Stack
              sx={{
                flexDirection: 'row',
                gap: 1,
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              <Chip label={isPublic ? 'Public' : 'Private'} size='small' />
              {collaborative && <Chip label='Collaborative' size='small' />}
            </Stack>
            {description && (
              <Typography
                variant='subtitle2'
                sx={{ color: (theme) => theme.palette.text.disabled }}
              >
                {description}
              </Typography>
            )}
          </Stack>
        }
        isSmartphone={isSmartphone}
      />
      <Table
        columns={columns.filter(Boolean)}
        rows={tracks?.items}
        getRowId={(row) => row?.track?.id}
        slots={{
          columnHeaders: isSmartphone ? () => null : undefined,
        }}
        hideFooter
        disableRowSelectionOnClick
        disableColumnSelector
      />
    </Stack>
  );
};
