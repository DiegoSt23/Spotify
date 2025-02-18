import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

interface TrackLinkProps {
  name: string;
  path: string;
  id: string;
}

export const TrackLink = ({ name, path, id }: TrackLinkProps) => (
  <Link to={`/${path}/${id}`} component={RouterLink} underline='hover'>
    {name}
  </Link>
);
