import {
  Stack,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  useColorScheme,
} from '@mui/material';
import { Contrast, Translate, Speaker } from '@mui/icons-material';
import { Page } from '@components/layout';
import { SettingsSection } from '@components/settings';
import { useLanguage } from '@hooks/language';

export const Settings = () => {
  const { mode, setMode } = useColorScheme();
  const { t } = useLanguage('settings');

  if (!mode) {
    return null;
  }

  const settingsData = [
    {
      title: t('soundQuality.title'),
      description: t('soundQuality.description'),
      longDescription: t('soundQuality.longDescription'),
      icon: <Speaker sx={{ fill: (theme) => theme.palette.accent.main }} />,
      children: (
        <RadioGroup
          value={mode}
          defaultValue='system'
          onChange={(_, newValue) =>
            setMode(newValue as 'system' | 'light' | 'dark')
          }
          sx={{ mb: 0, pb: 0 }}
        >
          <FormControlLabel value='system' control={<Radio />} label='92kbps' />
          <FormControlLabel value='light' control={<Radio />} label='128kbps' />
          <FormControlLabel value='dark' control={<Radio />} label='320kbps' />
        </RadioGroup>
      ),
    },
    {
      title: t('theme.title'),
      description: t('theme.description'),
      longDescription: t('theme.longDescription'),
      icon: <Contrast sx={{ fill: (theme) => theme.palette.accent.main }} />,
      children: (
        <RadioGroup
          value={mode}
          defaultValue='system'
          onChange={(_, newValue) =>
            setMode(newValue as 'system' | 'light' | 'dark')
          }
          sx={{ mb: 0, pb: 0 }}
        >
          <FormControlLabel
            value='system'
            control={<Radio />}
            label={t('theme.options.system')}
          />
          <FormControlLabel
            value='light'
            control={<Radio />}
            label={t('theme.options.light')}
          />
          <FormControlLabel
            value='dark'
            control={<Radio />}
            label={t('theme.options.dark')}
          />
        </RadioGroup>
      ),
    },
    {
      title: t('language.title'),
      description: t('language.description'),
      longDescription: t('language.longDescription'),
      icon: <Translate sx={{ fill: (theme) => theme.palette.accent.main }} />,
      children: (
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value='english'
          onChange={(e) => console.log(e.target.value)}
        >
          <MenuItem value='system'>{t('language.options.system')}</MenuItem>
          <MenuItem value='english'>{t('language.options.english')}</MenuItem>
          <MenuItem value='spanish'>{t('language.options.spanish')}</MenuItem>
        </Select>
      ),
    },
  ];

  return (
    <Page title={t('pageTitle')}>
      <Stack gap={3}>
        {settingsData?.map((data, index) => (
          <>
            {index !== 0 && <Divider />}
            <SettingsSection key={data.title} {...data} />
          </>
        ))}
      </Stack>
    </Page>
  );
};
