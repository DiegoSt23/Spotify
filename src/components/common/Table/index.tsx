import { MouseEvent } from 'react';
import { DataGrid, type DataGridProps } from '@mui/x-data-grid';

interface TableProps extends DataGridProps {
  onRowRightClick: (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    id: string
  ) => void;
}

export const Table = ({ onRowRightClick, ...props }: TableProps) => (
  <DataGrid
    {...props}
    slotProps={{
      ...props.slotProps,
      loadingOverlay: {
        noRowsVariant: 'skeleton',
      },
      row: {
        onContextMenu: (event) => {
          const id = event.currentTarget.getAttribute('data-id') ?? '';
          onRowRightClick(event, id);
        },
      },
    }}
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
);
