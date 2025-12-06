import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { moduleDetails } from '@karlo/modules-shared-constants';
import {TileCard} from '../tile-card/tile-card';

/* eslint-disable-next-line */
export interface WelcomeProps {}

const StyledWelcome = styled.div`
  color: hotPink;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function categoricalClassification(
  listOfRoutes: Array<{ route: string; meta: string[]; label?: string; content?: string; cta?: string }>
): Record<string, Array<{ route: string; label?: string; content?: string; cta?: string }>> {
  const categories: Record<string, Array<{ route: string; label?: string; content?: string; cta?: string }>> = {};

  for (const route of listOfRoutes) {
    for (const category of route.meta) {
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push({
        route: route.route,
        label: route.label || route.route.replace('_', ''), // Fallback
        content: route.content || '',
        cta: route.cta || 'Go'
      });
    }
  }
  return categories;
}

export function Welcome(props: WelcomeProps) {
  const data = categoricalClassification(moduleDetails);

  return (
    <StyledWelcome>
      <Grid container spacing={5}>
      {Object.entries(data).map(([category, items]) => (
        <Grid item xs={12} key={category}>
          <Typography textTransform='capitalize' px={2} variant="h4" color="secondary" gutterBottom>
            {category}
          </Typography>
          <Grid container spacing={3}>
            {items.map(({ route, label, content }) => (
              <Grid item xs={12} sm={6} md={4} key={route}>
                <TileCard
                  label={label || ''}
                  content={content || ''}
                  route={route}
                ></TileCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
    </StyledWelcome>
  );
}

export default Welcome;
