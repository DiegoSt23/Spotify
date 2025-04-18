import { ReactNode } from 'react';
import {
  Stack,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';

interface ContextMenuProps {
  title: string;
  subtitle: string;
  options: {
    label: string;
    action: () => void;
    icon?: ReactNode;
  }[];
  onClose: () => void;
  anchorPosition: {
    top: number;
    left: number;
  };
};

export const ContextMenu = ({
  title,
  subtitle,
  options,
  onClose,
  anchorPosition,
}: ContextMenuProps) => (
  <Menu
    id='context-menu'
    anchorReference='anchorPosition'
    anchorPosition={anchorPosition}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    keepMounted
    open={!!anchorPosition}
    onClose={onClose}
  >
    <Stack sx={{ padding: '0 1rem' }}>
      <Typography fontWeight='fontWeightMedium'>{title}</Typography>
      <Typography
        variant='body2'
        color='textSecondary'
        fontWeight='fontWeightMedium'
      >
        {subtitle}
      </Typography>
    </Stack>
    <Divider sx={{ mt: 1, mb: 1 }} />
    {options.map(({ label, action, icon }) => (
      <MenuItem
        key={label}
        onClick={(event) => {
          event.stopPropagation();
          action();
          onClose();
        }}
        dense
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText>{label}</ListItemText>
      </MenuItem>
    ))}
  </Menu>
);
