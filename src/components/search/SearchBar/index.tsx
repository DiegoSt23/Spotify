import { useState, useEffect, type ChangeEvent } from 'react';
import {
  Stack,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Search as SearchIcon, Clear, FilterList } from '@mui/icons-material';

interface SearchBarProps {
  onChange: (val: string) => void;
  isFetched: boolean;
}

export const SearchBar = ({ onChange, isFetched }: SearchBarProps) => {
  const [localInputValue, setLocalInputValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalInputValue(event.target.value);
  };

  const handleInputClear = () => setLocalInputValue('');

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      onChange(localInputValue);
    }, 500);

    return () => clearTimeout(delayInputTimeoutId);
  }, [localInputValue, onChange]);

  return (
    <Stack
      sx={{
        flex: 1,
        // minHeight: 70,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <TextField
        value={localInputValue}
        onChange={handleInputChange}
        placeholder='Search...'
        size='small'
        fullWidth
        autoFocus
        slotProps={{
          input: {
            startAdornment: (
              <SearchIcon sx={{ width: 20, height: 20, mr: 1 }} />
            ),
            endAdornment: localInputValue && isFetched && (
              <IconButton size='small' edge='end'>
                <Clear
                  sx={{ width: 16, height: 16 }}
                  onClick={handleInputClear}
                />
              </IconButton>
            ),
          },
        }}
      />
      <Tooltip title='Advanced filtering' placement='bottom-start' arrow>
        <IconButton>
          <FilterList />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};