import React, { ReactNode, useMemo } from 'react';
import { useTheme, useMediaQuery, Breakpoint } from '@mui/material';
import { KarloBox } from './KarloBox';

export interface KarloMasonryProps {
  children: ReactNode;
  columns?: number | Partial<Record<Breakpoint, number>>;
  spacing?: number;
}

export const KarloMasonry = ({ children, columns = 1, spacing = 2 }: KarloMasonryProps) => {
  const theme = useTheme();

  // Determine current column count based on breakpoints
  const matchXl = useMediaQuery(theme.breakpoints.up('xl'));
  const matchLg = useMediaQuery(theme.breakpoints.up('lg'));
  const matchMd = useMediaQuery(theme.breakpoints.up('md'));
  const matchSm = useMediaQuery(theme.breakpoints.up('sm'));

  const currentColumns = useMemo(() => {
    if (typeof columns === 'number') return columns;

    // Check from largest to smallest to find the active breakpoint value
    if (matchXl && columns.xl !== undefined) return columns.xl;
    if (matchLg && columns.lg !== undefined) return columns.lg;
    if (matchMd && columns.md !== undefined) return columns.md;
    if (matchSm && columns.sm !== undefined) return columns.sm;
    if (columns.xs !== undefined) return columns.xs;

    return 1;
  }, [columns, matchXl, matchLg, matchMd, matchSm]);

  // Distribute children into columns
  const columnBuckets = useMemo(() => {
    const buckets = Array.from({ length: currentColumns }, () => [] as ReactNode[]);
    const kids = React.Children.toArray(children);

    kids.forEach((child, index) => {
      buckets[index % currentColumns].push(child);
    });
    return buckets;
  }, [children, currentColumns]);

  return (
    <KarloBox display="flex" flexDirection="row" gap={spacing} width="100%">
      {columnBuckets.map((bucket, colIndex) => (
        <KarloBox
          key={colIndex}
          display="flex"
          flexDirection="column"
          gap={spacing}
          flex={1}
          minWidth={0}
        >
          {bucket}
        </KarloBox>
      ))}
    </KarloBox>
  );
};
