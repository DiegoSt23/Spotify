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
import { Playlist } from '@common/interfaces';
import { Grid, Loading } from '@components/common';

interface PlaylistsGridProps {
  data?: Playlist[];
  displayOwner?: boolean;
  displayTotalTracks?: boolean;
  loading?: boolean;
}

export const PlaylistsGrid = ({
  data,
  displayOwner,
  displayTotalTracks,
  loading,
}: PlaylistsGridProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRedirect = (id?: string) => {
    if (!id) return;
    
    navigate(`/playlists/${id}`);
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
      {data
        ?.filter((item) => item)
        ?.map((playlist) => (
          <Stack sx={{ alignItems: 'center' }}>
            <Stack sx={{ width: '100%', gap: 1 }}>
              <Card
                variant='outlined'
              >
                <CardActionArea onClick={() => handleRedirect(playlist?.id)}>
                  <Avatar
                    key={playlist.id}
                    src={playlist.images[0]?.url}
                    alt={playlist.name}
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
                  {playlist?.name}
                </Typography>
                {displayOwner && (
                  <Typography
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: (theme) => theme.palette.text.disabled,
                    }}
                  >
                    {playlist?.owner?.display_name}
                  </Typography>
                )}
                {displayTotalTracks && (
                  <Typography
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: (theme) => theme.palette.text.disabled,
                    }}
                  >
                    {playlist?.tracks?.total} tracks
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
        ))}
    </Grid>
  );
};
