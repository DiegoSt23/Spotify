import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import {
  MusicNote,
  LibraryMusic,
  QueueMusic,
  PeopleAlt,
} from '@mui/icons-material';
import { useLanguage } from '@hooks/common';
import { Page } from '@components/layout';

export const CurrentUserLibrary = () => {
  const navigate = useNavigate();
  const { t } = useLanguage('library');
  const libraryData = [
    {
      title: t('songs.title'),
      description: t('songs.description'),
      icon: <MusicNote sx={{ fill: (theme) => theme.palette.accent.main }} />,
      onClick: () => navigate('saved-songs'),
    },
    {
      title: t('albums.title'),
      description: t('albums.description'),
      icon: (
        <LibraryMusic sx={{ fill: (theme) => theme.palette.accent.main }} />
      ),
      onClick: () => navigate('saved-albums'),
    },
    {
      title: t('artists.title'),
      description: t('artists.description'),
      icon: <PeopleAlt sx={{ fill: (theme) => theme.palette.accent.main }} />,
      onClick: () => navigate('followed-artists'),
    },
    {
      title: t('playlists.title'),
      description: t('playlists.description'),
      icon: <QueueMusic sx={{ fill: (theme) => theme.palette.accent.main }} />,
      onClick: () => navigate('playlists'),
    },
  ];

  return (
    <Page title='Library'>
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto',
          gridTemplateColumns: `repeat(auto-fill, minmax(${250}px, 1fr))`,
          rowGap: 2,
          columnGap: 2,
        }}
      >
        {libraryData.map(({ title, description, icon, onClick }) => (
          <Card variant='outlined' sx={{ width: '100%' }}>
            <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
              <CardContent sx={{ height: '100%' }}>
                <Stack gap={1}>
                  {icon}
                  <Typography variant='h5'>{title}</Typography>
                  <Typography color='textSecondary'>{description}</Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Page>
  );
};
