import {
  Stack,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import { GitHub, LinkedIn, Launch } from '@mui/icons-material';
import { useLanguage } from '@hooks/language';
// import { useGetAccessToken } from '@hooks/auth';
import fullLogo from '@assets/svg/Full_Logo_Green_RGB.svg';
import headphones from '@assets/img/headphones-2.jpg';

export const Login = () => {
  const { t } = useLanguage('login');
  // useGetAccessToken();

  const handleNavigateLogin = () => {
    window.location.href = 'http://localhost:8888';
  };

  return (
    <Stack sx={{ flexDirection: 'row' }}>
      <Stack
        sx={{
          width: '50%',
          height: '100dvh',
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <img
          src={headphones}
          alt='Spotify'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Stack>
      <Stack
        sx={{
          width: { xs: '100%', md: '50%' },
          flex: 1,
          gap: 4,
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 2, sm: 5 },
        }}
      >
        <Stack
          sx={{
            maxWidth: 500,
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Card variant='outlined'>
            <CardContent>
              <Stack gap={3} pt={2}>
                <Stack alignItems='center'>
                  <img src={fullLogo} alt='Spotify' width={200} />
                </Stack>
                <Typography variant='h4' textAlign='center'>
                  {t('welcome')}
                </Typography>
                <Typography>{t('description')}</Typography>
                <Button variant='contained' onClick={handleNavigateLogin}>
                  {t('loginButton')}
                </Button>
                <Stack
                  sx={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton>
                    <GitHub />
                  </IconButton>
                  <IconButton>
                    <LinkedIn />
                  </IconButton>
                  <IconButton>
                    <Launch />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};
