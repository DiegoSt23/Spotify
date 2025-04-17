import { Fragment } from 'react';
import { Stack, Typography, Divider } from '@mui/material';

interface TrackListDataProps {
  data: string[];
}

export const TrackListData = ({ data = [] }: TrackListDataProps) => (
  <Stack
    sx={{
      flexDirection: 'row',
      justifyContent: { xs: 'space-evenly', sm: 'flex-start' },
      alignSelf: { sm: 'flex-start' },
      backgroundColor: (theme) => theme.palette.divider,
      padding: '0.5rem 0.7rem',
      borderRadius: 1,
      gap: 1,
    }}
  >
    {data.length &&
      data.map((item, index) => (
        <Fragment key={index}>
          <Typography variant='subtitle2'>{item}</Typography>
          {index !== data.length - 1 && (
            <Divider orientation='vertical' flexItem sx={{ opacity: 1 }} />
          )}
        </Fragment>
      ))}
  </Stack>
);
