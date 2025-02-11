import { useState } from 'react';
import {
  Stack,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import {
  PlayArrow,
  SkipNext,
  SkipPrevious,
  VolumeUp,
  KeyboardArrowUp,
  Speaker,
  Message,
  QueueMusic,
} from '@mui/icons-material';
import { useStore } from '@store/index';
import { FullScreenPlayer } from '../FullScreenPlayer';
import { ProgressBar } from '../ProgressBar';

export const Player = () => {
  const [open, setOpen] = useState(false);
  const toggleQueueDrawer = useStore((state) => state.toggleQueueDrawer);

  const handleOpenFullScreenPlayer = () => setOpen(true);

  const handleCloseFullScreenPlayer = () => setOpen(false);

  const handleOpenQueueDrawer = () => toggleQueueDrawer(true);

  return (
    <>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Metadata */}
        <Stack
          sx={{
            width: { xs: 'auto', sm: 200 },
            flexDirection: 'row',
            gap: 1.5,
            alignItems: 'center',
          }}
        >
          <Stack
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 1,
            }}
          >
            <Avatar
              src='https://i.scdn.co/image/ab67616d0000b2736c7057ee3dc07fde70d00891'
              variant='rounded'
              sx={{ width: { xs: 45, sm: 50 }, height: { xs: 45, sm: 50 } }}
            />
            <IconButton
              onClick={handleOpenFullScreenPlayer}
              sx={{
                position: 'absolute',
                borderRadius: 0,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                opacity: 0,
                transition: 'opacity 0.2s',
                '&:hover': {
                  opacity: 1,
                  transition: 'opacity 0.2s',
                },
              }}
            >
              <KeyboardArrowUp />
            </IconButton>
          </Stack>
          <Stack sx={{ flex: 1, overflow: 'hidden', pr: 2 }}>
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: 500
              }}
            >
              Find My Way
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.disabled,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
             Nine Inch Nails
            </Typography>
          </Stack>
        </Stack>
        {/* Progress bar */}
        <Stack flex={1} sx={{ display: { xs: 'none', md: 'block' }, pr: 3 }}>
          <ProgressBar
            variant='determinate'
            value={70}
            sx={{ height: 5 }}
            containerProps={{ sx: { gap: 1.5, position: 'relative', top: 3 } }}
          />
        </Stack>
        {/* Controls */}
        <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
          <IconButton size='small'>
            <SkipPrevious />
          </IconButton>
          <IconButton size='small'>
            <PlayArrow />
          </IconButton>
          <IconButton size='small'>
            <SkipNext />
          </IconButton>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Divider
              orientation='vertical'
              flexItem
              sx={{
                margin: '0rem 0.5rem',
              }}
            />
            <IconButton size='medium'>
              <VolumeUp sx={{ width: 20, height: 20 }} />
            </IconButton>
            <IconButton size='medium'>
              <Speaker sx={{ width: 20, height: 20 }} />
            </IconButton>
            <IconButton onClick={handleOpenQueueDrawer} size='medium'>
              <Message sx={{ width: 20, height: 20 }} />
            </IconButton>
            <IconButton onClick={handleOpenQueueDrawer} size='small'>
              <QueueMusic />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      <FullScreenPlayer
        open={open}
        onClose={handleCloseFullScreenPlayer}
        onOpenQueueDrawer={handleOpenQueueDrawer}
      />
    </>
  );
};
