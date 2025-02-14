import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

interface TrackAlbumCellProps {
  name: string;
  id: string;
}

export const TrackAlbumCell = ({ name, id }: TrackAlbumCellProps) => (
  <Link to={`/albums/${id}`} component={RouterLink} underline='hover'>
    {name}
  </Link>
);
