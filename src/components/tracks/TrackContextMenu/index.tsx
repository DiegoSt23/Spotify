import {
  Stack,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { Track } from '@common/interfaces';
import { useTrackContext } from '@hooks/tracks';

interface TrackContextMenuProps {
  selectedTrack: Track | null;
  onClose: () => void;
  anchorPosition: {
    top: number;
    left: number;
  };
  isSavedTracksList?: boolean;
}

export const TrackContextMenu = ({
  selectedTrack,
  onClose,
  anchorPosition,
  isSavedTracksList,
}: TrackContextMenuProps) => {
  const { options } = useTrackContext(selectedTrack, isSavedTracksList);

  return (
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
        <Typography fontWeight='fontWeightMedium'>
          {selectedTrack?.name ?? 'NA'}
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          fontWeight='fontWeightMedium'
        >
          {selectedTrack?.artists?.map((artist) => artist.name)?.join(', ') ??
            'NA'}
        </Typography>
      </Stack>
      <Divider sx={{ mt: 1, mb: 1 }} />
      {options.map(({ label, onClick, icon }) => (
        <MenuItem
          key={label}
          onClick={(event) => {
            event.stopPropagation();
            onClick();
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
};
