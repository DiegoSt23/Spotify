import { forwardRef, type Ref } from 'react';
import {
  Dialog,
  Slide,
  Stack,
  Avatar,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {
  PlayArrow,
  SkipNext,
  SkipPrevious,
  KeyboardArrowDown,
  MoreVert,
  // Speaker,
  Message,
  QueueMusic,
} from '@mui/icons-material';
import { ProgressBar } from '../ProgressBar';

interface FullScreenPlayerProps {
  open: boolean;
  onClose: () => void;
  onOpenQueueDrawer: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const FullScreenPlayer = ({
  open,
  onClose,
  onOpenQueueDrawer,
}: FullScreenPlayerProps) => {
  const isDarkTheme = useTheme().palette.mode === 'dark';

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      slots={{ transition: Transition }}
    >
      <Stack
        sx={{
          height: '100dvh',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: (theme) => theme.palette.background.paper,
          position: 'relative',
        }}
      >
        {isDarkTheme && (
          <img
            src='https://i.scdn.co/image/ab67616d0000b2736c7057ee3dc07fde70d00891'
            className='background-img'
          />
        )}
        <Stack
          sx={{
            padding: '2rem',
            position: 'relative',
            zIndex: 2,
            gap: { xs: 1, sm: 1.5 },
            top: -15,
          }}
        >
          <Avatar
            src='https://i.scdn.co/image/ab67616d0000b2736c7057ee3dc07fde70d00891'
            variant='rounded'
            sx={{
              width: { xs: '100%', sm: 400, md: 500 },
              height: { xs: 'auto', sm: 400, md: 500 },
              border: '1px solid #9c9c9c9a',
              boxShadow: 10,
            }}
          />
          <Stack sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant='subtitle1'>Find My Way</Typography>
            <Typography sx={{ color: (theme) => theme.palette.text.disabled }}>
              Nine Inch Nails
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <IconButton>
              <SkipPrevious sx={{ width: 40, height: 40 }} />
            </IconButton>
            <IconButton>
              <PlayArrow sx={{ width: 60, height: 60 }} />
            </IconButton>
            <IconButton>
              <SkipNext sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Stack>
        </Stack>
        <Stack
          sx={{
            width: '100%',
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            top: '1rem',
            padding: '0rem 1rem',
            zIndex: 2,
          }}
        >
          <IconButton onClick={onClose}>
            <KeyboardArrowDown />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            width: '100%',
            position: 'absolute',
            bottom: '1rem',
            padding: '0rem 2rem',
            zIndex: 2,
            gap: 0.5,
          }}
        >
          <Stack>
            <ProgressBar
              variant='determinate'
              value={70}
              containerProps={{ sx: { flexDirection: 'column-reverse' } }}
              sx={{
                height: 5,
              }}
            />
          </Stack>
          <Stack
            sx={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton edge='start'>
              <Message />
            </IconButton>

            <Stack
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <IconButton>
                <SkipPrevious />
              </IconButton>
              <IconButton>
                <PlayArrow sx={{ width: 40, height: 40 }} />
              </IconButton>
              <IconButton>
                <SkipNext />
              </IconButton>
            </Stack>
            <IconButton edge='end' onClick={onOpenQueueDrawer}>
              <QueueMusic />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};
