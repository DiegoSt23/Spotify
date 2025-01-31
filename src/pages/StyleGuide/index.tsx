import {
  Stack,
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  TextField,
  LinearProgress,
} from '@mui/material';

export const StyleGuide = () => (
  <Stack
    gap={3}
    sx={{ padding: { xs: 2, sm: 6 }, maxWidth: 1200, margin: 'auto' }}
  >
    <Typography variant='h3' textAlign='center'>
      Style Guide
    </Typography>
    <Card variant='outlined'>
      <CardHeader title='Typography' />
      <CardContent>
        <Stack gap={2}>
          <Typography variant='h1'>h1</Typography>
          <Typography variant='h2'>Heading h2</Typography>
          <Typography variant='h3'>Heading h3</Typography>
          <Typography variant='h4'>Heading h4</Typography>
          <Typography variant='h5'>Heading h5</Typography>
          <Typography variant='h6'>Heading h6</Typography>
          <Typography variant='subtitle1'>Subtitle 1</Typography>
          <Typography variant='subtitle2'>Subtitle 2</Typography>
          <Typography variant='body1'>
            body1: Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            voluptate repudiandae, quis modi nisi magnam iure odit eos nobis
            error explicabo eveniet quia atque iusto facilis, consectetur
            tempore, assumenda cumque! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Qui voluptate repudiandae, quis modi nisi magnam
            iure odit eos nobis error explicabo eveniet quia atque iusto
            facilis, consectetur tempore, assumenda cumque!
          </Typography>
          <Typography variant='body2'>
            body2: Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Magnam sapiente, eligendi accusantium, commodi nesciunt dolorem, sit
            molestiae repellat nostrum alias optio modi odio animi mollitia quos
            labore dolores amet accusamus? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Magnam sapiente, eligendi accusantium,
            commodi nesciunt dolorem, sit molestiae repellat nostrum alias optio
            modi odio animi mollitia quos labore dolores amet accusamus?
          </Typography>
          <Typography variant='caption'>Caption</Typography>
        </Stack>
      </CardContent>
    </Card>
    <Card variant='outlined'>
      <CardHeader title='Button' />
      <CardContent>
        <Stack gap={2}>
          <Button variant='contained'>Click</Button>
          <Button variant='outlined'>Click</Button>
          <Button variant='text'>Click</Button>
        </Stack>
      </CardContent>
    </Card>
    <Card variant='outlined'>
      <CardHeader title='Switch' />
      <CardContent>
        <Stack gap={1}>
          <FormControlLabel control={<Switch />} label='' />
          <FormControlLabel control={<Switch />} label='With label' />
        </Stack>
      </CardContent>
    </Card>
    <Card variant='outlined'>
      <CardHeader title='Text Input' />
      <CardContent>
        <Stack gap={2}>
          <TextField label='Label' />
          <TextField label='Label' helperText='Helper text' />
          {/* <TextField label='Error' error helperText="Error helper text" /> */}
        </Stack>
      </CardContent>
    </Card>
    <Card variant='outlined'>
      <CardHeader title='Modal' />
      <CardContent>
        <Button variant='contained'>Open Modal</Button>
      </CardContent>
    </Card>
    <Card variant='outlined'>
      <CardHeader title='Progress' />
      <CardContent>
        <Stack gap={3}>
          <LinearProgress variant='determinate' value={50} />
        </Stack>
      </CardContent>
    </Card>
  </Stack>
);
