import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material';
import {
  SpaceDashboard,
  Search,
  AccountCircle,
  MusicNote,
  BarChart,
} from '@mui/icons-material';

export const useMobileNavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();

  const navItems = [
    {
      icon: <SpaceDashboard />,
      isActive: pathname === '/home',
      onClick: () => navigate('/home'),
    },
    {
      icon: <BarChart />,
      isActive: pathname === '/stats',
      onClick: () => navigate('/stats'),
    },
    {
      icon: <Search />,
      isActive: pathname === '/search',
      onClick: () => navigate('/search'),
    },
    {
      icon: <MusicNote />,
      isActive: pathname === '/songs',
      onClick: () => navigate('/songs'),
    },
    {
      icon: <AccountCircle />,
      isActive: pathname === '/profile',
      onClick: () => navigate('/profile'),
    },
  ];

  return {
    navItems,
    theme,
  };
};
