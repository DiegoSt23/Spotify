import { Stack, Typography, Chip, Button } from '@mui/material';
import { Link as Routerlink } from 'react-router-dom';
import { useLanguage } from '@hooks/common';

interface FeaturedArtistProps {
  data: { name: string; id: string }[];
}

export const FeaturedArtists = ({ data = [] }: FeaturedArtistProps) => {
  const { t } = useLanguage('artists');

  if (data.length < 2) return null;

  return (
    <Stack gap={1}>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
        <Typography variant='h6'>{t('featuredArtists')}</Typography>
        <Chip
          label={data.length}
          size='small'
          sx={{ color: (theme) => theme.palette.accent.main }}
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          overflow: 'auto',
        }}
      >
        {data.map(({ name, id }) => (
          <Button
            key={id}
            variant='outlined'
            component={Routerlink}
            to={`/artist/${id}`}
            sx={{ whiteSpace: 'nowrap', minWidth: 'max-content' }}
          >
            {name}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};
