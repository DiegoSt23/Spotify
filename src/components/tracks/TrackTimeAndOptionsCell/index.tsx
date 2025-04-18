import { MouseEvent } from 'react';
import { Stack, Typography, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useFormatMs } from '@hooks/common';

interface TrackTimeAndOptionsCellProps {
  id: string;
  ms: number;
  isSmartphone: boolean;
  onClickContextMenu: (
    event: MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
}

export const TrackTimeAndOptionsCell = ({
  id,
  ms,
  isSmartphone,
  onClickContextMenu,
}: TrackTimeAndOptionsCellProps) => {
  const { formattedTime } = useFormatMs(ms);

  return (
    <Stack
      sx={{
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: isSmartphone ? 'flex-end' : 'space-between',
        gap: 1,
      }}
    >
      <Typography
        sx={{
          color: (theme) => theme.palette.text.secondary,
          display: { xs: 'none', sm: 'flex' },
        }}
      >
        {formattedTime}
      </Typography>
      <IconButton
        size='small'
        edge='end'
        onClick={(event) => onClickContextMenu(event, id)}
      >
        <MoreVert />
      </IconButton>
    </Stack>
  );
};
