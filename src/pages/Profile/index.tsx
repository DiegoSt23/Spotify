import { Stack, Avatar, Typography, Skeleton, Button } from '@mui/material';
// import { useStore } from '@store/index';
import { useGetCurrentUserData } from '@hooks/users';
import { Page } from '@components/layout';

export const Profile = () => {
  // const data = useStore((state) => state.data);
  const { data, isFetching } = useGetCurrentUserData();
  const details = [
    { label: 'Country', value: data?.country || 'N/A' },
    { label: 'Followers', value: data?.followers?.total ?? 0 },
    { label: 'Following', value: data?.artists?.total ?? 0 },
  ]

  return (
    <Page title='Profile'>
      <Stack alignItems='center' gap={2} textAlign='center'>
        {isFetching ? (
          <>
            <Skeleton
              animation='wave'
              variant='circular'
              width={150}
              height={150}
            />
            <Skeleton
              animation='wave'
              variant='rounded'
              width={250}
              height={50}
              sx={{ mt: 2 }}
            />
            <Skeleton
              animation='wave'
              variant='rounded'
              width={150}
              height={50}
            />
          </>
        ) : (
          <>
            <Avatar
              alt={data?.display_name}
              src={data?.images?.[0]?.url}
              sx={{ width: 150, height: 150 }}
            />
            <Typography variant='h2'>{data?.display_name}</Typography>
            <Stack sx={{ flexDirection: 'row', gap: 3 }}>
              {details?.map((detail) => (
                <Stack key={detail.label} sx={{ alignItems: 'center' }}>
                  <Typography
                    sx={{ color: (theme) => theme.palette.text.disabled }}
                  >
                    {detail.label}
                  </Typography>
                  <Typography
                    component='span'
                    fontWeight={700}
                    variant='subtitle1'
                    sx={{ color: (theme) => theme.palette.accent.main }}
                  >
                    {detail.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Button variant='contained'>Logout</Button>
          </>
        )}
      </Stack>
    </Page>
  );
};
