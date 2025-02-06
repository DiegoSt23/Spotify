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
  const { expanded, handleExpand, navItems } = useSideNavBar();

  return (
    <Stack
      sx={{
        width: expanded ? 200 : 60,
        height: '100%',
        padding: expanded ? '1rem' : '1rem 0.4rem 1rem 0.4rem',
        position: 'relative',
        transition: 'all 0.3s',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 1,
        willChange: 'width',
      }}
    >
      <Stack sx={{ flex: 1, gap: 3 }}>
        <Stack
          sx={{
            maxWidth: expanded ? 200 : 55,
            transform: expanded ? 'translateX(-2px)' : 'translateX(1px)',
            transition: 'all 0.3s',
            overflow: 'hidden',
          }}
        >
          <img src={fullLogo} alt='logo' width={155} />
        </Stack>
        <Stack sx={{ flex: 1, gap: 1 }}>
          {navItems.map(({ sectionLabel, items }) => (
            <Stack key={sectionLabel}>
              <Stack sx={{ overflow: 'hidden', position: 'relative', pb: 1 }}>
                <Typography
                  variant='caption'
                  sx={{
                    color: (theme) => theme.palette.accent.main,
                    transform: expanded
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
                    borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                    transform: expanded
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
                      disableHoverListener={expanded}
                      arrow
                    >
                      <ListItemButton
                        disableGutters
                        selected={isActive}
                        onClick={onClick}
                        sx={{
                          borderRadius: 1,
                          pl: expanded ? 1.2 : 1.4,
                          transition: 'all 0.3s',
                          overflow: 'hidden',
                          willChange: 'width',
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
                          {expanded && (
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
        sx={{
          position: 'absolute',
          backgroundColor: (theme) => theme.palette.background.paper,
          right: 12,
          bottom: 12,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          transform: expanded ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.3s',
        }}
      >
        <ChevronRight onClick={handleExpand} />
      </IconButton>
    </Stack>
  );
};
