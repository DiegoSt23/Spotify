import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Stack,
  Typography,
  Card,
  CardActionArea,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Album } from '@common/interfaces';
import { Grid, Loading } from '@components/common';

interface AlbumsGridProps {
  data?: Album[];
  displayArtist?: boolean;
  displayReleaseDate?: boolean;
  loading?: boolean;
}

export const AlbumsGrid = ({
  data,
  displayArtist,
  displayReleaseDate,
  loading,
}: AlbumsGridProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRedirect = (id?: string) => {
    if (!id) return;

    navigate(`/albums/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid
      columnGap={isSmallScreen ? 2 : 4}
      rowGap={isSmallScreen ? 2 : 4}
      minColumnWidth={isSmallScreen ? 150 : 200}
    >
      {data?.map((album) => (
        <Stack sx={{ alignItems: 'center' }}>
          <Stack sx={{ width: '100%', gap: 1 }}>
            <Card variant='outlined'>
              <CardActionArea onClick={() => handleRedirect(album?.id)}>
                <Avatar
                  key={album.id}
                  src={album.images[1]?.url}
                  alt={album.name}
                  variant='rounded'
                  sx={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </CardActionArea>
            </Card>
            <Stack sx={{ textAlign: 'center' }}>
              <Typography
                variant='subtitle1'
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {album?.name}
              </Typography>
              {displayArtist && (
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {album?.artists.map((artist) => artist.name).join(', ')}
                </Typography>
              )}
              {displayReleaseDate && (
                <Typography
                  sx={{
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {album?.release_date?.split('-')[0]}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Grid>
  );
};
