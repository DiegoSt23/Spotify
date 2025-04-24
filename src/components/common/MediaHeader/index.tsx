import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Link,
  Skeleton,
  type Theme,
} from '@mui/material';

type Owner = {
  name?: string;
  id?: string;
  path?: string;
};

interface MediaHeaderProps {
  cover?: string;
  title?: string;
  owner?: Owner[];
  details?: string | ReactNode;
  isSmartphone?: boolean;
  isArtist?: boolean;
  actions?: {
    icon: ReactNode;
    onClick: () => void;
    description?: string;
    disabled?: boolean;
  }[];
  isLoading?: boolean;
}

const actionButtonStyle = {
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
  width: { xs: 50, sm: 40 },
  height: { xs: 50, sm: 40 },
};

const skeletonButtonStyle = {
  width: { xs: 50, sm: 40 },
  height: { xs: 50, sm: 40 },
};

export const MediaHeader = ({
  cover,
  title,
  owner,
  details,
  isSmartphone,
  isArtist,
  actions,
  isLoading,
}: MediaHeaderProps) => (
  <Stack
    sx={{
      flexDirection: { sm: 'row' },
      alignItems: { xs: 'center', sm: 'inherit' },
      gap: 3,
    }}
  >
    {isLoading ? (
      <Skeleton
        variant={isArtist ? 'circular' : 'rounded'}
        width={isSmartphone ? '100%' : 300}
        height={300}
      />
    ) : (
      <Card
        variant='outlined'
        sx={{
          borderRadius: isArtist && !isSmartphone ? '100%' : undefined,
          width: isSmartphone ? '100%' : 300,
          height: isSmartphone ? 'auto' : 300,
        }}
      >
        <Avatar
          src={cover}
          alt={title}
          variant={
            isArtist ? (isSmartphone ? 'square' : 'circular') : 'rounded'
          }
          sx={{
            width: isSmartphone ? '100%' : 300,
            height: isSmartphone ? 'auto' : 300,
          }}
        />
      </Card>
    )}
    <Stack
      sx={{
        flex: 1,
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Stack sx={{ textAlign: { xs: 'center', sm: 'start' } }}>
        <Typography
          variant={
            isSmartphone ? (isArtist ? 'h4' : 'h5') : isArtist ? 'h3' : 'h4'
          }
        >
          {isLoading ? <Skeleton width={250} /> : title}
        </Typography>
        {owner && owner.length && (
          <Stack
            sx={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            {owner.map(({ name, id, path }, index) => (
              <Link
                key={id}
                to={name === 'Various Artists' ? '' : path || ''}
                component={RouterLink}
                underline={name === 'Various Artists' ? 'none' : 'hover'}
                sx={{
                  pointerEvents: name === 'Various Artists' ? 'none' : 'auto',
                }}
              >
                <Typography
                  variant={isSmartphone ? 'h6' : 'h5'}
                  sx={{ color: (theme) => theme.palette.accent.main }}
                >
                  {isLoading ? <Skeleton width={150} /> : name}
                  {index !== owner.length - 1 && (
                    <Typography sx={{ mr: 0.5 }} component='span'>
                      ,
                    </Typography>
                  )}
                </Typography>
              </Link>
            ))}
          </Stack>
        )}
        {details &&
          (typeof details === 'string' ? (
            <Typography
              variant='subtitle2'
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              {isLoading ? <Skeleton /> : details}
            </Typography>
          ) : (
            details
          ))}
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: { xs: 2, sm: 1 },
          justifyContent: { xs: 'center', sm: 'flex-start' },
        }}
      >
        {actions?.length
          ? !isLoading
            ? actions?.map(
                ({ icon, onClick, description, disabled }, index) => (
                  <Tooltip
                    key={index}
                    title={description}
                    arrow
                  >
                    <IconButton
                      sx={actionButtonStyle}
                      onClick={onClick}
                      disabled={disabled}
                    >
                      {icon}
                    </IconButton>
                  </Tooltip>
                )
              )
            : [1, 2, 3].map((_, index) => (
                <Skeleton
                  key={index}
                  variant='circular'
                  sx={skeletonButtonStyle}
                />
              ))
          : null}
      </Stack>
    </Stack>
  </Stack>
);
