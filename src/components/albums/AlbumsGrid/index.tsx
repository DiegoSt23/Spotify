import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Stack,
  Typography,
  Card,
  CardActionArea,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { Album } from '@common/interfaces';
import { Grid, Loading } from '@components/common';

interface AlbumsGridProps {
  data?: Album[];
  displayArtist?: boolean;
  displayReleaseDate?: boolean;
  loading?: boolean;
  carousell?: boolean;
  displayMore?: boolean;
  onMoreClick?: () => void;
}

export const AlbumsGrid = ({
  data,
  displayArtist,
  displayReleaseDate,
  loading,
  carousell,
  displayMore,
  onMoreClick,
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
      carousell={carousell}
    >
      {data?.map((album) => (
        <Stack key={album?.id} sx={{ alignItems: 'center' }}>
          <Stack
            sx={{ width: { xs: carousell ? 150 : '100%', sm: '100%' }, gap: 1 }}
          >
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
            <Stack>
              <Typography
                variant='subtitle2'
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
                  variant='caption'
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {album?.artists.map((artist) => artist.name).join(', ')}
                </Typography>
              )}
              {displayReleaseDate && (
                <Typography
                  variant='caption'
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {album?.release_date?.split('-')[0]}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      ))}
      {displayMore && onMoreClick && (
        <Stack
          sx={{
            display: { xs: 'flex', sm: 'none' },
            pt: 7,
            pr: 3,
            pl: 2,
          }}
        >
          <IconButton
            onClick={onMoreClick}
            size='large'
            sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <ChevronRight />
          </IconButton>
        </Stack>
      )}
    </Grid>
  );
};
