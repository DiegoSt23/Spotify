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
import { Playlist } from '@common/interfaces';
import { Grid, Loading } from '@components/common';

interface PlaylistsGridProps {
  data?: Playlist[];
  displayOwner?: boolean;
  displayTotalTracks?: boolean;
  loading?: boolean;
  carousell?: boolean;
  displayMore?: boolean;
  onMoreClick?: () => void;
}

export const PlaylistsGrid = ({
  data,
  displayOwner,
  displayTotalTracks,
  loading,
  carousell,
  displayMore,
  onMoreClick,
}: PlaylistsGridProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRedirect = (id?: string) => {
    if (!id) return;

    navigate(`/playlist/${id}`);
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
      {data
        ?.filter((item) => item)
        ?.map((playlist) => (
          <Stack key={playlist.id} sx={{ alignItems: 'center' }}>
            <Stack
              sx={{
                width: { xs: carousell ? 150 : '100%', sm: '100%' },
                gap: 1,
              }}
            >
              <Card variant='outlined'>
                <CardActionArea onClick={() => handleRedirect(playlist?.id)}>
                  <Avatar
                    key={playlist.id}
                    src={playlist.images?.[0]?.url}
                    alt={playlist.name}
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
                  {playlist?.name}
                </Typography>
                {displayOwner && (
                  <Typography
                    variant='caption'
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  >
                    {playlist?.owner?.display_name}
                  </Typography>
                )}
                {displayTotalTracks && (
                  <Typography
                    variant='caption'
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  >
                    {playlist?.tracks?.total} tracks
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
