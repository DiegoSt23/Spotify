import { cloneElement } from 'react';
import { Stack, IconButton } from '@mui/material';
import { useMobileNavBar } from '@hooks/navigation';

export const MobileNavBar = () => {
  const { navItems, theme } = useMobileNavBar();

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
      }}
    >
      {navItems.map(({ icon, isActive, onClick }, index) => (
        <IconButton
          sx={{
            width: 30,
            height: 30,
            borderRadius: 1.5,
          }}
          disableRipple
          key={index}
          onClick={onClick}
        >
          {cloneElement(icon, {
            sx: {
              ...icon.props.sx,
              fill: isActive ? theme.palette.accent.main : undefined,
            },
          })}
        </IconButton>
      ))}
    </Stack>
  );
};
