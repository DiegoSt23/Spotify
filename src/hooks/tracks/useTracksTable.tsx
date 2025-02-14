import { GridColDef } from '@mui/x-data-grid';
import { useMediaQuery, useTheme } from '@mui/material';
import { ArtistBase } from '@common/interfaces';
import { useLanguage } from '@hooks/language';
import { TrackNameCell, TrackAlbumCell, TrackTimeAndOptionsCell } from '@components/tracks';

export const useTracksTable = () => {
  const { t } = useLanguage('tracks');
  const theme = useTheme();
  const isSmartphone = useMediaQuery(theme.breakpoints.down('sm'));

  const columns: GridColDef[] | false[] = [
    {
      field: 'name',
      headerName: t('tracksTable.headerLabels.song'),
      flex: 3,
      valueGetter: (_, row) => row?.name,
      renderCell: (params) => {
        const trackNumber = params.api.getAllRowIds().indexOf(params.id) + 1;
        const trackName = params.value;
        const artistName = params.row.artists
          .map((artist: ArtistBase) => artist.name)
          .join(', ');

        return (
          <TrackNameCell
            trackNumber={trackNumber}
            trackName={trackName}
            artistName={artistName}
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
        row?.artists?.map((artist: ArtistBase) => artist.name).join(', '),
    },
    !isSmartphone && {
      field: 'album',
      headerName: t('tracksTable.headerLabels.album'),
      flex: 2,
      valueGetter: (_, row) => row?.album?.name,
      renderCell: ({ value, row }) => {
        return <TrackAlbumCell name={value} id={row.album.id} />;
      },
    },
    {
      field: 'duration_ms',
      headerName: t('tracksTable.headerLabels.time'),
      width: isSmartphone ? 20 : 100,
      renderCell: ({ value }) => (
        <TrackTimeAndOptionsCell ms={value} isSmartphone={isSmartphone} />
      ),
    },
  ] as GridColDef[];

  return { columns, isSmartphone };
};
