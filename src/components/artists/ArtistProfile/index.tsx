import { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import {
  Stack,
  Typography,
  Chip,
  Divider,
  Dialog,
  DialogContent,
  Button,
  Alert,
  Skeleton,
  type Theme,
} from '@mui/material';
import {
  PlayArrow,
  Favorite,
  FavoriteBorder,
  ChevronRight,
  Add,
  QueueMusic,
  PlaylistAdd,
  ContentCopy,
} from '@mui/icons-material';
import {
  ArtistExtended,
  ArtistBioResponse,
  ArtistTopTracksResponse,
  PartialAlbumsResponse,
  ContextMenuPosition,
  TrackContext,
} from '@common/interfaces';
import { About } from '@assets/customIcons';
import { useLanguage } from '@hooks/common';
import { useTracksTable } from '@hooks/tracks';
import { MediaHeader, Table, ContextMenu } from '@components/common';
import { AlbumsGrid } from '@components/albums';

type ArtistData = Partial<
  ArtistExtended &
    ArtistBioResponse &
    ArtistTopTracksResponse &
    PartialAlbumsResponse
>;

interface ArtistProfileProps extends ArtistData {
  contextMenuPosition: ContextMenuPosition | null;
  trackContext: TrackContext;
  onOpenContextMenu: (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    id: string
  ) => void;
  onCloseContextMenu: () => void;
  onFollowUnfollowArtist: () => void;
  onPlayArtist: () => void;
  onAddTrack: () => void;
  onAddTrackToQueue: () => void;
  onAddTrackToPlaylist: () => void;
  onCopyTrackLink: () => void;
  isLoadingFollowUnfollow: boolean;
  isFollowed?: boolean;
  isLoading?: boolean;
}

const contextMenuIconSx = {
  width: 20,
  height: 20,
  fill: (theme: Theme) => theme.palette.accent.main,
};

export const ArtistProfile = ({
  name,
  images,
  followers,
  genres,
  artist,
  tracks: topTracks,
  albums,
  singles,
  compilations,
  appearsOn,
  contextMenuPosition,
  trackContext,
  onOpenContextMenu,
  onCloseContextMenu,
  onFollowUnfollowArtist,
  onPlayArtist,
  onAddTrack,
  onAddTrackToQueue,
  onAddTrackToPlaylist,
  onCopyTrackLink,
  isLoadingFollowUnfollow,
  isFollowed,
  isLoading,
}: ArtistProfileProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage('artists');
  const { isSmartphone, columns } = useTracksTable(onOpenContextMenu);

  const discographyData = [
    {
      title: t('artistProfile.sections.albums'),
      data: albums?.items || [],
      total: albums?.total ?? 0,
      redirect: 'albums',
    },
    {
      title: t('artistProfile.sections.singles'),
      data: singles?.items || [],
      total: singles?.total ?? 0,
      redirect: 'singles',
    },
    {
      title: t('artistProfile.sections.compilations'),
      data: compilations?.items || [],
      total: compilations?.total ?? 0,
      redirect: 'compilations',
    },
    {
      title: t('artistProfile.sections.appearsOn'),
      data: appearsOn?.items || [],
      total: appearsOn?.total ?? 0,
      redirect: 'appears-on',
    },
  ];

  const noAvailableData =
    !topTracks?.length && discographyData.every((item) => item.total === 0);

  const aboutButtonData = artist?.bio?.content
    ? [
        {
          icon: (
            <About
              sx={{
                width: 34,
                height: 34,
                fill: (theme) => theme.palette.primary.main,
              }}
            />
          ),
          onClick: () => setOpen(true),
          description: t('artistProfile.header.actions.about'),
        },
      ]
    : [];

  const playButtonData = noAvailableData
    ? []
    : [
        {
          icon: <PlayArrow />,
          onClick: onPlayArtist,
          description: t('artistProfile.header.actions.play'),
        },
      ];

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
      onClick: onFollowUnfollowArtist,
      description: isFollowed
        ? t('artistProfile.header.actions.remove')
        : t('artistProfile.header.actions.add'),
      disabled: isLoadingFollowUnfollow,
    },
    ...playButtonData,
    ...aboutButtonData,
  ];

  const trackOptions = [
    {
      label: t('artistProfile.trackOptions.add'),
      action: onAddTrack,
      icon: <Add sx={contextMenuIconSx} />,
    },
    {
      label: t('artistProfile.trackOptions.addToQueue'),
      action: onAddTrackToQueue,
      icon: <QueueMusic sx={contextMenuIconSx} />,
    },
    {
      label: t('artistProfile.trackOptions.addToPlaylist'),
      action: onAddTrackToPlaylist,
      icon: <PlaylistAdd sx={contextMenuIconSx} />,
    },
    {
      label: t('artistProfile.trackOptions.copyLink'),
      action: onCopyTrackLink,
      icon: (
        <ContentCopy
          sx={{ width: 18, height: 18, fill: contextMenuIconSx.fill }}
        />
      ),
    },
  ];

  return (
    <Stack gap={2} flex={1}>
      <MediaHeader
        title={name}
        cover={images?.[0]?.url}
        isSmartphone={isSmartphone}
        actions={actions}
        isArtist
        details={
          <Stack>
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
                {isLoading ? (
                  <Skeleton width={30} />
                ) : (
                  new Intl.NumberFormat().format(followers?.total ?? 0)
                )}
              </Typography>
              <Typography
                variant='subtitle2'
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {isLoading ? (
                  <Skeleton width={50} />
                ) : (
                  t(
                    followers?.total === 1
                      ? 'artistProfile.header.metadata.followers.singular'
                      : 'artistProfile.header.metadata.followers.plural'
                  )
                )}
              </Typography>
            </Stack>
            {isLoading ? (
              <Skeleton variant='text' width={88} height={38} />
            ) : (
              Boolean(genres?.length) && (
                <Stack
                  sx={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 1,
                    mt: 1,
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                  }}
                >
                  {genres?.map((genre) => (
                    <Chip key={genre} label={genre} size='small' />
                  ))}
                </Stack>
              )
            )}
          </Stack>
        }
        isLoading={isLoading}
      />
      {!isLoading && (
        <>
          {Boolean(topTracks?.length) && (
            <Stack gap={2}>
              <Typography variant='h6'>
                {t('artistProfile.sections.topTracks')}
              </Typography>
              <Table
                rows={topTracks}
                columns={columns.filter(Boolean)}
                slots={{
                  columnHeaders: isSmartphone ? () => null : undefined,
                }}
                onRowRightClick={onOpenContextMenu}
                hideFooter
                disableRowSelectionOnClick
                disableColumnSelector
              />
            </Stack>
          )}
          {discographyData.map(({ title, data, total, redirect }, index) =>
            total ? (
              <Stack key={title} gap={2}>
                {index !== 0 && <Divider />}
                <Stack
                  sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Stack
                    sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}
                  >
                    <Typography variant='h6'>{title}</Typography>
                    <Chip
                      label={total}
                      size='small'
                      sx={{
                        color: (theme) => theme.palette.accent.main,
                        fontWeight: 'fontWeightBold',
                      }}
                    />
                  </Stack>
                  {total > 10 && (
                    <Button
                      size='small'
                      variant='text'
                      endIcon={<ChevronRight />}
                      onClick={() => navigate(redirect)}
                      sx={{
                        display: {
                          xs: 'none',
                          sm: 'flex',
                        },
                      }}
                    >
                      {t('artistProfile.sections.more')}
                    </Button>
                  )}
                </Stack>
                <AlbumsGrid
                  data={data}
                  onMoreClick={() => navigate(redirect)}
                  displayMore={total > 10}
                  displayReleaseDate
                  carousell
                />
              </Stack>
            ) : null
          )}
          {noAvailableData && (
            <Alert severity='info' variant='filled' sx={{ mt: 2 }}>
              {t('artistProfile.noContent')}
            </Alert>
          )}
        </>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Stack>
            <Typography variant='h5'>{name}</Typography>
            <Markdown>{artist?.bio?.content?.split('<a')?.[0]}</Markdown>
          </Stack>
        </DialogContent>
      </Dialog>
      {contextMenuPosition !== null && (
        <ContextMenu
          title={trackContext.name}
          subtitle={trackContext.artists}
          options={trackOptions}
          anchorPosition={contextMenuPosition}
          onClose={onCloseContextMenu}
        />
      )}
    </Stack>
  );
};
