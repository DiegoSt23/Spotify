import { GridColDef } from '@mui/x-data-grid';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { ArtistBase } from '@common/interfaces';
import { useLanguage } from '@hooks/language';
import {
  TrackNameCell,
  TrackLink,
  TrackTimeAndOptionsCell,
} from '@components/tracks';

export const useExtendedTracksTable = () => {
  const { t } = useLanguage('tracks');
  const theme = useTheme();
  const isSmartphone = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const columns: GridColDef[] | false[] = [
    {
      field: 'name',
      headerName: t('tracksTable.headerLabels.song'),
      flex: 3,
      valueGetter: (_, row) => row?.track?.name,
      renderCell: (params) => {
        const trackNumber = params.api.getAllRowIds().indexOf(params.id) + 1;
        const trackName = params.value;
        const artistName = params.row.track.artists
          .map((artist: ArtistBase) => artist.name)
          .join(', ');
        const explicit = params.row.track.explicit;

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
      flex: 2,
      valueGetter: (_, row) =>
        row?.track?.artists
          ?.map((artist: ArtistBase) => artist.name)
          .join(', '),
      renderCell: (params) => {
        return (
          <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
            {params?.row?.track?.artists?.map(
              (artist: ArtistBase, index: number) => (
                <>
                  <TrackLink
                    name={artist.name}
                    path='artists'
                    id={artist?.id}
                  />
                  {index !== params?.row?.track?.artists?.length - 1 && (
                    <Typography sx={{ mr: 0.5 }}>,</Typography>
                  )}
                </>
              )
            )}
          </Stack>
        );
      },
    },
    !isSmartphone && {
      field: 'album',
      headerName: t('tracksTable.headerLabels.album'),
      flex: 2,
      valueGetter: (_, row) => row?.track?.album?.name,
      renderCell: ({ value, row }) => {
        return <TrackLink name={value} path='albums' id={row.track.album.id} />;
      },
    },
    !isTablet && {
      field: 'added_at',
      headerName: t('tracksTable.headerLabels.added'),
      flex: 1,
      valueFormatter: (_, row) => dayjs(row.added_at).format('DD/MM/YY'),
      type: 'date',
    },
    {
      field: 'duration_ms',
      headerName: t('tracksTable.headerLabels.time'),
      width: isSmartphone ? 20 : 100,
      valueGetter: (_, row) => row?.track?.duration_ms,
      renderCell: ({ value }) => (
        <TrackTimeAndOptionsCell ms={value} isSmartphone={isSmartphone} />
      ),
    },
  ] as GridColDef[];

  return { columns, isSmartphone };
};
