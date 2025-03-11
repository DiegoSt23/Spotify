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
          <Stack sx={{ width: '100%', gap: 1 }}>
            <Card variant='outlined'>
              <CardActionArea>
                <Avatar
                  key={show.id}
                  src={show.images[1]?.url}
                  alt={show.name}
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
                {show?.name}
              </Typography>
              {displayPublisher && (
                <Typography
                  variant='caption'
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
