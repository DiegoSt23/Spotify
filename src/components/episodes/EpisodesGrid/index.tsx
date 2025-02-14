import {
  Avatar,
  Stack,
  Typography,
  Card,
  CardActionArea,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Episode } from '@common/interfaces';
import { Grid } from '@components/common';

interface EpisodesGridProps {
  data?: Episode[];
}

export const EpisodesGrid = ({ data }: EpisodesGridProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      columnGap={isSmallScreen ? 2 : 4}
      rowGap={isSmallScreen ? 2 : 4}
      minColumnWidth={isSmallScreen ? 150 : 200}
    >
      {data?.map((episode) => (
        <Stack sx={{ alignItems: 'center' }}>
          <Stack sx={{ width: isSmallScreen ? 150 : 200, gap: 1 }}>
            <Card
              variant='outlined'
              sx={{
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
                  key={episode.id}
                  src={episode.images[1]?.url}
                  alt={episode.name}
                  variant='rounded'
                  sx={{
                    width: isSmallScreen ? 150 : 200,
                    height: isSmallScreen ? 150 : 200,
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
                {episode?.name}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Grid>
  );
};
