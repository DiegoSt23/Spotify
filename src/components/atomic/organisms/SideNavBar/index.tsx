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
        width: expanded ? 250 : 55,
        height: '100%',
        padding: expanded ? '1.5rem 1rem 0rem 0rem' : '1.5rem 0rem 0rem 0rem',
        position: 'relative',
        transition: 'all 0.3s',
      }}
    >
      <Stack sx={{ flex: 1, gap: 2 }}>
        <Stack
          sx={{
            pl: expanded ? 2.5 : 0.6,
            pb: 5.5,
            transition: 'all 0.3s',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Stack sx={{ position: 'absolute' }}>
            <img src={fullLogo} alt='logo' width={155} />
          </Stack>
        </Stack>
        {navItems.map(({ sectionLabel, items }) => (
          <Stack key={sectionLabel}>
            <Stack sx={{ overflow: 'hidden', position: 'relative', pb: 1 }}>
              <Typography
                variant='caption'
                sx={{
                  pl: 9,
                  color: (theme) => theme.palette.accent.main,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s',
                }}
              >
                {sectionLabel}
              </Typography>
              <Stack
                sx={{
                  width: 60,
                  borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                  position: 'absolute',
                  top: 9,
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
                        borderRadius: expanded ? '0rem 1rem 1rem 0rem' : 0,
                        pl: expanded ? 8.5 : 1.6,
                        borderLeft: (theme) =>
                          isActive
                            ? `3px solid ${theme.palette.accent.main}`
                            : '3px solid transparent',
                        transition: 'all 0.3s',
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
      <IconButton
        size='small'
        sx={{
          position: 'absolute',
          backgroundColor: (theme) => theme.palette.background.paper,
          right: -18,
          bottom: 20,
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
