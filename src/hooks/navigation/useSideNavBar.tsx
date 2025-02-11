import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material';
import {
  SpaceDashboard,
  Search,
  Settings,
  Info,
  AccountCircle,
  MusicNote,
  LibraryMusic,
  QueueMusic,
  Mic,
  PeopleAlt,
  BarChart,
} from '@mui/icons-material';
import { useLanguage } from '@hooks/language';
import { useStore } from '@store/index';

export const useSideNavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useLanguage('sideNavBar');
  const { isSideNavBarOpen, toggleSideNavBar } = useStore();
  const theme = useTheme();

  const navItems = [
    {
      sectionLabel: t('navItems.main.sectionLabel'),
      items: [
        {
          label: t('navItems.main.items.home'),
          icon: <SpaceDashboard />,
          isActive: pathname === '/home',
          onClick: () => navigate('/home'),
        },
        {
          label: t('navItems.main.items.search'),
          icon: <Search />,
          isActive: pathname === '/search',
          onClick: () => navigate('/search'),
        },
        {
          label: t('navItems.main.items.stats'),
          icon: <BarChart />,
          isActive: pathname === '/stats',
          onClick: () => navigate('/stats'),
        },
      ],
    },
    {
      sectionLabel: t('navItems.myMusic.sectionLabel'),
      items: [
        {
          label: t('navItems.myMusic.items.songs'),
          icon: <MusicNote />,
          isActive: pathname === '/songs',
          onClick: () => navigate('/songs'),
        },
        {
          label: t('navItems.myMusic.items.artists'),
          icon: <PeopleAlt />,
          isActive: pathname === '/artists',
          onClick: () => navigate('/artists'),
        },
        {
          label: t('navItems.myMusic.items.albums'),
          icon: <LibraryMusic />,
          isActive: pathname === '/albums',
          onClick: () => navigate('/albums'),
        },
        {
          label: t('navItems.myMusic.items.playlists'),
          icon: <QueueMusic />,
          isActive: pathname === '/playlists',
          onClick: () => navigate('/playlists'),
        },
        {
          label: t('navItems.myMusic.items.podcasts'),
          icon: <Mic />,
          isActive: pathname === '/podcasts',
          onClick: () => navigate('/podcasts'),
        },
      ],
    },
    {
      sectionLabel: t('navItems.general.sectionLabel'),
      items: [
        {
          label: t('navItems.general.items.profile'),
          icon: <AccountCircle />,
          isActive: pathname === '/profile',
          onClick: () => navigate('/profile'),
        },
        {
          label: t('navItems.general.items.about'),
          icon: <Info />,
          isActive: pathname === '/about',
          onClick: () => navigate('/about'),
        },
        {
          label: t('navItems.general.items.settings'),
          icon: <Settings />,
          isActive: pathname === '/settings',
          onClick: () => navigate('/settings'),
        },
      ],
    },
  ];

  const handleExpand = () => {
    toggleSideNavBar(!isSideNavBarOpen);
  };

  return {
    isSideNavBarOpen,
    handleExpand,
    navItems,
    theme,
  };
};
