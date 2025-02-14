import { ReactNode } from 'react';
import { Stack, Typography, Divider } from '@mui/material';

interface PageProps {
  title: string;
  children: ReactNode;
  headerElement?: ReactNode;
}

export const Page = ({ title, children, headerElement }: PageProps) => (
  <Stack sx={{ height: '100%' }}>
    <Stack
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: '1rem',
        height: 60,
      }}
    >
      <Typography variant='h5'>{title}</Typography>
      {headerElement ?? null}
    </Stack>
    <Divider />
    <Stack
      sx={{
        flex: 1,
        pt: 3,
        maxHeight: 'calc(100% - 60px)',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: { xs: 6, md: 8 },
        },
        '&::-webkit-scrollbar-track': {
          background: (theme) => theme.palette.background.paper,
          borderRadius: 10,
        },
        '&::-webkit-scrollbar-thumb': {
          background: (theme) => theme.palette.divider,
          borderRadius: 10,
        },
      }}
    >
      {children}
    </Stack>
  </Stack>
);
