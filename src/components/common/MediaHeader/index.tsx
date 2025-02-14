import { ReactNode } from 'react';
import {
  Card,
  Stack,
  Typography,
  IconButton,
  Avatar,
} from '@mui/material';
import { PlayArrow, MoreVert, Add } from '@mui/icons-material';

interface MediaHeaderProps {
  cover?: string;
  title?: string;
  owner?: string | string[];
  details?: string | ReactNode;
  isSmartphone: boolean;
  onAdd?: () => void;
  onPlay?: () => void;
  onMore?: () => void;
}

export const MediaHeader = ({
  cover,
  title,
  owner,
  details,
  isSmartphone,
  onAdd,
  onPlay,
  onMore,
}: MediaHeaderProps) => {
  const actions = [
    {
      icon: <Add />,
      onClick: onAdd,
    },
    {
      icon: <PlayArrow />,
      onClick: onPlay,
    },
    {
      icon: <MoreVert />,
      onClick: onMore,
    },
  ];

  return (
    <Stack
      sx={{
        flexDirection: { sm: 'row' },
        alignItems: { xs: 'center', sm: 'inherit' },
        gap: 3,
      }}
    >
      <Card variant='outlined'>
        <Avatar
          src={cover}
          alt={title}
          variant='rounded'
          sx={{
            width: 300,
            height: 300,
          }}
        />
      </Card>
      <Stack
        sx={{
          flex: 1,
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Stack sx={{ textAlign: { xs: 'center', sm: 'start' } }}>
          <Typography variant={isSmartphone ? 'h5' : 'h4'}>{title}</Typography>
          <Typography
            variant={isSmartphone ? 'h6' : 'h5'}
            sx={{ color: (theme) => theme.palette.accent.main }}
          >
            {typeof owner === 'string' ? owner : owner?.join(', ')}
          </Typography>
          {typeof details === 'string' ? (
            <Typography
              variant='subtitle2'
              sx={{ color: (theme) => theme.palette.text.disabled }}
            >
              {details}
            </Typography>
          ) : (
            details
          )}
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: { xs: 3, sm: 1 },
            justifyContent: { xs: 'center', sm: 'flex-start' },
          }}
        >
          {actions.map(({ icon, onClick }, index) => (
            <IconButton
              key={index}
              sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}
              onClick={onClick}
            >
              {icon}
            </IconButton>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
