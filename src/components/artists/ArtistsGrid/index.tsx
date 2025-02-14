import {
  Card,
  CardActionArea,
  Avatar,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArtistExtended,
} from '@common/interfaces';
import { Grid, Loading } from '@components/common';

interface ArtistsGridProps {
  data?: ArtistExtended[];
  loading?: boolean;
}

export const ArtistsGrid = ({ data, loading }: ArtistsGridProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid columnGap={isSmallScreen ? 2 : 4} rowGap={isSmallScreen ? 2 : 4}>
      {data?.map((artist) => (
        <Stack sx={{ alignItems: 'center', gap: 1 }}>
          <Card
            variant='outlined'
            sx={{
              borderRadius: '100%',
              boxShadow: 5,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s',
              },
            }}
          >
            <CardActionArea>
              <Avatar
                key={artist.id}
                src={artist.images[1]?.url}
                alt={artist.name}
                sx={{
                  width: 150,
                  height: 150,
                }}
              />
            </CardActionArea>
          </Card>
          <Stack sx={{ textAlign: 'center', width: '100%' }}>
            <Typography
              variant='subtitle1'
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {artist?.name}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Grid>
  );
};
