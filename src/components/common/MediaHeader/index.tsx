import { ReactNode, useState } from 'react';
import {
  Card,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Dialog,
  DialogContent,
  type Theme,
} from '@mui/material';
import {
  PlayArrow,
  MoreVert,
  Favorite,
  FavoriteBorder,
  // QuestionMark,
} from '@mui/icons-material';
import { useLanguage } from '@hooks/language';

interface MediaHeaderProps {
  cover?: string;
  title?: string;
  owner?: string | string[];
  followers?: number;
  details?: string | ReactNode;
  description?: string;
  isSmartphone?: boolean;
  isArtist?: boolean;
  isSaved?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  onPlay?: () => void;
  onMore?: () => void;
}

const actionButtonStyle = {
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
  width: { xs: 50, sm: 40 },
  height: { xs: 50, sm: 40 },
};

export const MediaHeader = ({
  cover,
  title,
  owner,
  followers,
  details,
  description,
  isSmartphone,
  isArtist,
  isSaved,
  onAdd,
  onRemove,
  onPlay,
  onMore,
}: MediaHeaderProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage('mediaHeader');

  const handleDisplayDialog = () => setOpen((prev) => !prev);

  return (
    <>
      <Stack
        sx={{
          flexDirection: { sm: 'row' },
          alignItems: { xs: 'center', sm: 'inherit' },
          gap: 3,
        }}
      >
        <Card
          variant='outlined'
          sx={{ borderRadius: isArtist && !isSmartphone ? '100%' : undefined }}
        >
          <Avatar
            src={cover}
            alt={title}
            variant={
              isArtist ? (isSmartphone ? 'square' : 'circular') : 'rounded'
            }
            sx={{
              width: isArtist && isSmartphone ? '100%' : 300,
              height: isArtist && isSmartphone ? 'auto' : 300,
            }}
          />
        </Card>
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
              {title}
            </Typography>
            {owner && (
              <Typography
                variant={isSmartphone ? 'h6' : 'h5'}
                sx={{ color: (theme) => theme.palette.accent.main }}
              >
                {typeof owner === 'string' ? owner : owner?.join(', ')}
              </Typography>
            )}
            {followers && (
              <Stack
                sx={{
                  justifyContent: { xs: 'center', sm: 'start' },
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography
                  variant='subtitle2'
                  sx={{ color: (theme) => theme.palette.accent.main }}
                >
                  {new Intl.NumberFormat().format(followers)}
                </Typography>
                <Typography
                  variant='subtitle2'
                  sx={{ color: (theme) => theme.palette.text.disabled }}
                >
                  {t('followers')}
                </Typography>
              </Stack>
            )}
            {details &&
              (typeof details === 'string' ? (
                <Typography
                  variant='subtitle2'
                  sx={{ color: (theme) => theme.palette.text.disabled }}
                >
                  {details}
                </Typography>
              ) : (
                details
              ))}
          </Stack>
          {(onAdd || onPlay || onMore) && (
            <Stack
              sx={{
                flexDirection: 'row',
                gap: { xs: 2, sm: 1 },
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              {onAdd && onRemove && (
                <Tooltip title={isSaved ? t('remove') : t('add')} arrow>
                  <IconButton
                    sx={actionButtonStyle}
                    onClick={isSaved ? onRemove : onAdd}
                  >
                    {isSaved ? (
                      <Favorite
                        sx={{
                          fill: (theme) => theme.palette.accent.main,
                          width: 20,
                          height: 20,
                        }}
                      />
                    ) : (
                      <FavoriteBorder
                        sx={{
                          width: 20,
                          height: 20,
                        }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              )}
              {onPlay && (
                <IconButton sx={actionButtonStyle} onClick={onPlay}>
                  <PlayArrow />
                </IconButton>
              )}
              {/* {description && (
                <IconButton
                  sx={actionButtonStyle}
                  onClick={handleDisplayDialog}
                >
                  <QuestionMark />
                </IconButton>
              )} */}
              {onMore && (
                <IconButton sx={actionButtonStyle} onClick={onMore}>
                  <MoreVert />
                </IconButton>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
      <Dialog open={open} onClose={handleDisplayDialog}>
        <DialogContent>
          <Stack gap={2}>
            <Typography variant='h5'>{title}</Typography>
            <Typography sx={{ color: (theme) => theme.palette.text.disabled }}>
              {description}
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
