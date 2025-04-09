import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Chip, Button } from '@mui/material';
import { Favorite, FavoriteBorder, ChevronRight } from '@mui/icons-material';
import { PlaylistsResponse, UserResponse } from '@common/interfaces';
import { useLanguage } from '@hooks/common';
import {MediaHeader } from '@components/common';
import { PlaylistsGrid } from '@components/playlists';

interface UserProfileResponse {
  data?: Partial<UserResponse>;
  userPlaylists?: PlaylistsResponse;
  isFollowed?: boolean;
}

export const UserProfile = ({
  data,
  userPlaylists,
  isFollowed,
}: UserProfileResponse) => {
  const navigate = useNavigate();
  const { t } = useLanguage('users');
  const actions = [
    {
      icon: isFollowed ? (
        <Favorite
          sx={{
            width: 20,
            height: 20,
            fill: (theme) => theme.palette.accent.main,
          }}
        />
      ) : (
        <FavoriteBorder sx={{ width: 20, height: 20 }} />
      ),
      onClick: () => {},
      description: isFollowed
        ? t('header.actions.unfollow')
        : t('header.actions.follow'),
    },
  ];

  return (
    <Stack gap={4}>
      <MediaHeader
        title={data?.display_name}
        cover={data?.images?.[0]?.url}
        details={
          <Stack
            sx={{
              justifyContent: { xs: 'center', sm: 'start' },
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{ color: (theme) => theme.palette.accent.main }}
            >
              {new Intl.NumberFormat().format(data?.followers?.total ?? 0)}
            </Typography>
            <Typography
              variant='subtitle2'
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              {t(
                data?.followers?.total === 1
                  ? 'header.metadata.followers.singular'
                  : 'header.metadata.followers.plural'
              )}
            </Typography>
          </Stack>
        }
        actions={actions}
        isArtist
      />
      <Stack gap={2}>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
            <Typography variant='h6' textAlign='left'>
              {t('sections.playlists')}
            </Typography>
            <Chip
              label={userPlaylists?.total}
              size='small'
              sx={{
                color: (theme) => theme.palette.accent.main,
                fontWeight: 'fontWeightBold',
              }}
            />
          </Stack>
          {userPlaylists?.total && userPlaylists.total > 10 && (
            <Button
              size='small'
              variant='text'
              endIcon={<ChevronRight />}
              onClick={() => navigate('playlists')}
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex',
                },
              }}
            >
              {t('sections.more')}
            </Button>
          )}
        </Stack>
        <PlaylistsGrid
          data={userPlaylists?.items}
          onMoreClick={() => navigate('playlists')}
          displayMore={!!(userPlaylists?.total && userPlaylists.total > 10)}
          carousell
          displayTotalTracks
        />
      </Stack>
    </Stack>
  );
};
