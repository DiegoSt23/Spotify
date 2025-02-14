import { DataGrid, type DataGridProps } from '@mui/x-data-grid';
import { Stack } from '@mui/material';

export const Table = (props: DataGridProps) => (
  <Stack sx={{ flex: 1 }}>
    <DataGrid
      {...props}
      sx={{
        '&.MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-columnHeader': {
          border: 'none !important',
          outline: 'none !important',
          fontSize: 14,
          '&:last-child .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
        },
        '& .MuiDataGrid-row': {
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          '&:last-child': {
            borderBottom: 'none',
          },
        },
        '& .MuiDataGrid-cell': {
          border: 'none',
          fontSize: 14,
          '&:focus-within': {
            outline: 'none !important',
          },
        },
        '&::-webkit-scrollbar': {
          width: { xs: 6, md: 8 },
        },
        '&::-webkit-scrollbar-track': {
          background: (theme) => theme.palette.background.paper,
          borderRadius: 10,
        },
        '&::-webkit-scrollbar-thumb': {
          background: (theme) => theme.palette.divider,
          borderRadius: 10,
        },
        ...props?.sx,
      }}
    />
  </Stack>
);
