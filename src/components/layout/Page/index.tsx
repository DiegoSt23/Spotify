import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

interface PageProps {
  children: ReactNode;
  title?: string | ReactNode;
  headerElement?: ReactNode;
  hideHeaderBorder?: boolean;
}

export const Page = ({
  title,
  children,
  headerElement,
  hideHeaderBorder,
}: PageProps) => {
  const { pathname } = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollTop = useRef(0);
  const stackRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const scrollTop = stackRef?.current?.scrollTop;

    if (!scrollTop) return;

    if (scrollTop > lastScrollTop.current) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }

    lastScrollTop.current = scrollTop;
  };

  useEffect(() => {
    const stackElement = stackRef?.current;

    if (!stackElement) return;

    stackElement.addEventListener('scroll', handleScroll);

    return () => {
      stackElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setShowHeader(true);
  }, [pathname]);

  return (
    <Stack
      ref={stackRef}
      sx={{
        height: '100%',
        overflow: 'auto',
        // '&::-webkit-scrollbar': {
        //   width: { xs: 6, md: 8 },
        // },
        // '&::-webkit-scrollbar-track': {
        //   background: (theme) => theme.palette.background.paper,
        //   borderRadius: 10,
        // },
        // '&::-webkit-scrollbar-thumb': {
        //   background: (theme) => theme.palette.divider,
        //   borderRadius: 10,
        // },
      }}
    >
      {(title || headerElement) && (
        <Stack
          sx={{
            width: '100%',
            position: 'sticky',
            top: 0,
            zIndex: 99,
            transform: showHeader ? 'translateY(-1px)' : 'translateY(-100%)',
            transition: 'transform 0.3s',
            backgroundColor: (theme) => theme.palette.background.paper,
            borderBottom: (theme) =>
              hideHeaderBorder ? 'none' : `1px solid ${theme.palette.divider}`,
            flexDirection: 'row',
            justifyContent: title ? 'space-between' : 'flex-end',
            alignItems: 'center',
            minHeight: 60,
          }}
        >
          {title &&
            (typeof title === 'string' ? (
              <Typography variant='h6' noWrap>
                {title}
              </Typography>
            ) : (
              title
            ))}
          {headerElement ?? null}
        </Stack>
      )}
      <Stack
        sx={{
          flex: 1,
          pt: !title && !headerElement ? 2 : 3,
          pb: 2,
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};
