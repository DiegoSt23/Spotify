import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface GridProps {
  children: ReactNode;
  rowGap?: number;
  columnGap?: number;
  minColumnWidth?: number;
  carousell?: boolean;
}

export const Grid = ({
  children,
  rowGap = 2,
  columnGap = 2,
  minColumnWidth = 150,
  carousell,
}: GridProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: { xs: carousell ? 'flex' : 'grid', sm: 'grid' },
        overflow: 'auto',
        gridTemplateRows: 'auto',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))`,
        rowGap: rowGap,
        columnGap: columnGap,
      }}
    >
      {children}
    </Box>
  );
};
