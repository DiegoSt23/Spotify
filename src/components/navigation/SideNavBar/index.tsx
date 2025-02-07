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
        width: isSideNavBarOpen ? 200 : 60,
        height: '100%',
        padding: isSideNavBarOpen ? '1rem' : '1rem 0.4rem 1rem 0.4rem',
        position: 'relative',
        transition: 'padding 0.3s, width 0.3s',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 2,
        // willChange: 'width',
      }}
    >
      <Stack sx={{ flex: 1, gap: 2.6 }}>
        <Stack
          sx={{
            maxWidth: isSideNavBarOpen ? 200 : 55,
            transform: isSideNavBarOpen
              ? 'translateX(-2px)'
              : 'translateX(1px)',
            transition: 'all 0.3s',
            overflow: 'hidden',
          }}
        >
          <img src={fullLogo} alt='logo' width={155} />
        </Stack>
        <Stack sx={{ flex: 1, gap: 1 }}>
          {navItems.map(({ sectionLabel, items }, index) => (
            <Stack key={sectionLabel}>
              <Stack sx={{ overflow: 'hidden', position: 'relative', pb: 1 }}>
                <Typography
                  variant='caption'
                  sx={{
                    display: index === 0 ? 'none' : 'block',
                    color: (theme) => theme.palette.accent.main,
                    transform: isSideNavBarOpen
                      ? 'translateX(3px)'
                      : 'translateX(100px)',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    transition: 'transform 0.3s',
                  }}
                >
                  {sectionLabel}
                </Typography>
                <Stack
                  sx={{
                    width: 60,
                    top: 9,
                    display: index === 0 ? 'none' : 'block',
                    borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                    transform: isSideNavBarOpen
                      ? 'translateX(-100px)'
                      : 'translateX(0)',
                    position: 'absolute',
                    transition: 'transform 0.3s',
                  }}
                />
              </Stack>
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
                          pl: isSideNavBarOpen ? 1.2 : 1.4,
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
          right: 12,
          bottom: 12,
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
