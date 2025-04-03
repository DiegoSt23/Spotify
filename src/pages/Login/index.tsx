import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import { GitHub, LinkedIn, Launch } from '@mui/icons-material';
import { useLanguage } from '@hooks/language';
import { useGetAccessToken } from '@hooks/auth';
import fullLogo from '@assets/svg/Full_Logo_Green_RGB.svg';
import whiteHeadphones from '@assets/img/white-headphones.jpg';
import blackHeadphones from '@assets/img/black-headphones.jpg';

export const Login = () => {
  useGetAccessToken();
  const isDarkTheme = useTheme().palette.mode === 'dark';
  const navigate = useNavigate();
  const { t } = useLanguage('login');
  const accessToken = Cookies.get('token') || '';

  const handleNavigateLogin = () => {
    window.location.href = 'http://localhost:8888';
  };

  useEffect(() => {
    if (accessToken) {
     navigate('/home', { replace: true });
    }
  }, [accessToken, navigate]);

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100dvh',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 99,
          filter: 'blur(10px)',
        }}
      >
        <img
          src={isDarkTheme ? blackHeadphones : whiteHeadphones}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Stack>
      <Stack sx={{ padding: 2 }}>
        <Card
          sx={{
            boxShadow: 0,
            maxWidth: 500,
            position: 'relative',
            zIndex: 999,
          }}
        >
          <CardContent>
            <Stack gap={3} pt={2}>
              <Stack alignItems='center'>
                <img src={fullLogo} alt='Spotify' width={200} />
              </Stack>
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
  );
};
