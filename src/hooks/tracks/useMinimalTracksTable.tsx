import { Fragment } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Stack, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { ArtistBase } from '@common/interfaces';
import { useLanguage } from '@hooks/common';
import {
  TrackNameCell,
  TrackTimeAndOptionsCell,
  TrackLink,
} from '@components/tracks';

export const useMinimalTracksTable = () => {
  const theme = useTheme();
  const { t } = useLanguage('tracks');
  const isSmartphone = useMediaQuery(theme.breakpoints.down('sm'));
  const columns: GridColDef[] | false[] = [
    {
      field: 'name',
      headerName: t('tracksTable.headerLabels.song'),
      flex: 1,
      renderCell: (params) => {
        const trackNumber = params.api.getAllRowIds().indexOf(params.id) + 1;
        const trackName = params.value;
        const artistName = params.row.artists
          .map((artist: ArtistBase) => artist.name)
          .join(', ');
        const explicit = params.row.explicit;

        return (
          <TrackNameCell
            trackNumber={trackNumber}
            trackName={trackName}
            artistName={artistName}
            explicit={explicit}
            isSmartphone={isSmartphone}
          />
        );
      },
    },
    !isSmartphone && {
      field: 'artists',
      headerName: t('tracksTable.headerLabels.artists'),
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
            {params?.row?.artists?.map(
              (artist: ArtistBase, index: number) => (
                <Fragment key={artist.id}>
                  <TrackLink
                    name={artist.name}
                    path='artist'
                    id={artist?.id}
                  />
                  {index !== params?.row?.artists?.length - 1 && (
                    <Typography sx={{ mr: 0.5 }}>,</Typography>
                  )}
                </Fragment>
              )
            )}
          </Stack>
        );
      },
    },
    {
      field: 'duration_ms',
      headerName: t('tracksTable.headerLabels.time'),
      width: isSmartphone ? 20 : 100,
      renderCell: ({ value }) => {
        return (
          <TrackTimeAndOptionsCell ms={value} isSmartphone={isSmartphone} />
        );
      },
    },
  ] as GridColDef[];

  return { columns, isSmartphone };
};
