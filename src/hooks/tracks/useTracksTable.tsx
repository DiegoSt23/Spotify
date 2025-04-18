import { MouseEvent } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ArtistBase } from '@common/interfaces';
import { useLanguage } from '@hooks/common';
import {
  TrackNameCell,
  TrackLink,
  TrackTimeAndOptionsCell,
} from '@components/tracks';

export const useTracksTable = (
  onClickContextMenu: (event: MouseEvent<HTMLButtonElement>, id: string) => void
) => {
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
      flex: 2,
      valueGetter: (_, row) =>
        row?.artists?.map((artist: ArtistBase) => artist.name).join(', '),
      renderCell: (params) => {
        return (
          <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
            {params?.row?.artists?.map((artist: ArtistBase, index: number) => (
              <>
                <TrackLink
                  key={artist?.id}
                  name={artist.name}
                  path='artist'
                  id={artist?.id}
                />
                {index !== params.row.artists.length - 1 && (
                  <Typography sx={{ mr: 0.5 }}>,</Typography>
                )}
              </>
            ))}
          </Stack>
        );
      },
    },
    !isSmartphone && {
      field: 'album',
      headerName: t('tracksTable.headerLabels.album'),
      flex: 2,
      valueGetter: (_, row) => row?.album?.name,
      renderCell: ({ value, row }) => {
        return <TrackLink name={value} path='albums' id={row.album.id} />;
      },
    },
    {
      field: 'duration_ms',
      headerName: t('tracksTable.headerLabels.time'),
      width: isSmartphone ? 20 : 100,
      renderCell: ({ value, row }) => (
        <TrackTimeAndOptionsCell
          id={row?.id ?? ''}
          ms={value}
          isSmartphone={isSmartphone}
          onClickContextMenu={onClickContextMenu}
        />
      ),
    },
  ] as GridColDef[];

  return { columns, isSmartphone };
};
