import { Stack, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@hooks/language';

export const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useLanguage('notFound');

  return (
    <Stack
      sx={{
        height: '100dvh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Typography variant='h1'>404</Typography>
      <Typography variant='subtitle1'>{t('title')}</Typography>
      <Typography sx={{ color: (theme) => theme.palette.text.disabled }}>
        {t('description')}
      </Typography>
      <Button
        variant='contained'
        onClick={() => navigate('/home')}
        sx={{ mt: 3 }}
      >
        {t('back')}
      </Button>
    </Stack>
  );
};
