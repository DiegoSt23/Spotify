import { Stack } from '@mui/material';
import logo from '@assets/svg/Full_Logo_White_RGB.svg';
import { useGetCurrentUserTopItems } from '@hooks/users';
import { Page } from '@components/layout';

export const Home = () => {
  const { data } = useGetCurrentUserTopItems();

  return (
    <Page title='Home' >
      <Stack
        sx={{
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1,
          backgroundColor: (theme) => theme.palette.accent.main,
        }}
      >
        <img width={300} height="auto" src={logo} alt='logo' />
      </Stack>
    </Page>
  );
};
