import { ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';

interface SettingsSectionProps {
  title: string;
  description: string;
  longDescription: string;
  icon: ReactNode;
  children: ReactNode;
}

export const SettingsSection = ({
  title,
  description,
  longDescription,
  icon,
  children,
}: SettingsSectionProps) => (
  <Stack sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
    <Stack sx={{ width: 300 }}>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
        {icon}
        <Typography variant='subtitle1'>{title}</Typography>
      </Stack>
      <Typography
        sx={{
          color: (theme) => theme.palette.text.disabled,
          display: { xs: 'none', md: 'block' },
        }}
      >
        {description}
      </Typography>
    </Stack>
    <Stack sx={{ flex: 1 }}>
      <Stack
        sx={{
          gap: 3,
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ color: (theme) => theme.palette.text.disabled }}>
          {longDescription}
        </Typography>
        {children}
      </Stack>
    </Stack>
  </Stack>
);
