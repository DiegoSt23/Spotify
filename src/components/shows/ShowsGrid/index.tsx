import {
  Avatar,
  Stack,
  Typography,
  Card,
  CardActionArea,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Show } from '@common/interfaces';
import { Grid } from '@components/common';

interface ShowsGridProps {
  data?: Show[];
  displayPublisher?: boolean;
}

export const ShowsGrid = ({
  data,
  displayPublisher = false,
}: ShowsGridProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      columnGap={isSmallScreen ? 2 : 4}
      rowGap={isSmallScreen ? 2 : 4}
      minColumnWidth={isSmallScreen ? 150 : 200}
    >
      {data?.map((show) => (
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
                  key={show.id}
                  src={show.images[1]?.url}
                  alt={show.name}
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
                {show?.name}
              </Typography>
              {displayPublisher && (
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {show?.publisher}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Grid>
  );
};
