import { ReactNode } from 'react';
import { Stack, Typography, Divider, useMediaQuery, useTheme } from '@mui/material';

interface PageProps {
  title: string;
  children: ReactNode;
}

export const Page = ({ title, children }: PageProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack sx={{ height: '100%' }}>
      <Stack sx={{ height: { xs: 48, md: 60 } }}>
        <Typography variant={isSmallScreen ? 'h5' : 'h4'}>{title}</Typography>
      </Stack>
      <Divider />
      <Stack
        sx={{
          flex: 1,
          pt: 3,
          maxHeight: { xs: 'calc(100% - 48px)', md: 'calc(100% - 60px)' },
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
};
