import { GridColDef } from '@mui/x-data-grid';
import { useMediaQuery, useTheme } from '@mui/material';
import { useLanguage } from '@hooks/language';
import { TrackNameCell, TrackTimeAndOptionsCell } from '@components/tracks';

export const useMinimalTracksTable = () => {
  const theme = useTheme();
  const { t } = useLanguage('tracks');
  const isSmartphone = useMediaQuery(theme.breakpoints.down('sm'));
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('tracksTable.headerLabels.song'),
      flex: 1,
      renderCell: (params) => {
        const trackNumber = params.api.getAllRowIds().indexOf(params.id) + 1;
        const trackName = params.value;

        return (
          <TrackNameCell trackNumber={trackNumber} trackName={trackName} />
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
  ];

  return { columns, isSmartphone };
};
