import {
  Stack,
  List,
  ListItem,
  ListItemButton,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import fullLogo from '@assets/svg/Full_Logo_Green_RGB.svg';
import { useSideNavBar } from '@hooks/navigation';

export const SideNavBar = () => {
  const { isSideNavBarOpen, handleExpand, navItems } = useSideNavBar();

  return (
    <Stack
      sx={{
        width: isSideNavBarOpen ? 200 : 80,
        height: '100%',
        padding: isSideNavBarOpen ? '1rem' : '1rem',
        position: 'relative',
        transition: 'padding 0.3s, width 0.3s',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 1.5,
      }}
    >
      <Stack sx={{ flex: 1 }}>
        <Stack
          sx={{
            maxWidth: isSideNavBarOpen ? 200 : 55,
            transition: 'all 0.3s',
            overflow: 'hidden',
            mb: 1.5,
          }}
        >
          <img src={fullLogo} alt='logo' width={155} />
        </Stack>
        <Stack sx={{ flex: 1 }}>
          {navItems.map(({ sectionLabel, items }, index) => (
            <Stack key={sectionLabel}>
              {index !== 0 && (
                <Stack
                  sx={{
                    borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                  }}
                />
              )}
              <List>
                {items.map(({ label, icon, isActive, onClick }) => (
                  <ListItem key={label} disablePadding>
                    <Tooltip
                      title={label}
                      placement='right'
                      disableHoverListener={isSideNavBarOpen}
                      arrow
                    >
                      <ListItemButton
                        disableGutters
                        selected={isActive}
                        onClick={onClick}
                        sx={{
                          borderRadius: 1.5,
                          pl: 1.4,
                          transition: 'all 0.3s',
                          overflow: 'hidden',
                        }}
                      >
                        <Stack
                          sx={{
                            flexDirection: 'row',
                            gap: 2.2,
                            alignItems: 'center',
                          }}
                        >
                          {icon}
                          {isSideNavBarOpen && (
                            <Typography
                              sx={{
                                color: (theme) =>
                                  isActive
                                    ? theme.palette.text.primary
                                    : theme.palette.text.disabled,
                              }}
                            >
                              {label}
                            </Typography>
                          )}
                        </Stack>
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                ))}
              </List>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <IconButton
        size='small'
        onClick={handleExpand}
        sx={{
          position: 'absolute',
          backgroundColor: (theme) => theme.palette.background.paper,
          right: !isSideNavBarOpen ? 22 : 16,
          bottom: 15,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          transform: isSideNavBarOpen ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.3s',
        }}
      >
        <ChevronRight />
      </IconButton>
    </Stack>
  );
};
