import styled from '@emotion/styled';
import { Grid, Typography, Fade } from '@mui/material';
import { moduleDetails } from '@karlo/modules-shared-constants';
import {TileCard} from '../tile-card/tile-card';
import { motion } from 'framer-motion';

/* eslint-disable-next-line */
export interface WelcomeProps {}

const StyledWelcome = styled.div`
  color: hotPink;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Welcome(props: WelcomeProps) {
  const data = categoricalClassification(moduleDetails);

  return (
    <StyledWelcome>
      <Grid container spacing={5} component={motion.div} variants={container} initial="hidden" animate="show">
      {Object.entries(data).map(([category, items]) => (
        <Grid item xs={12} key={category} component={motion.div} variants={itemAnim}>
          <Typography textTransform='capitalize' px={2} variant="h4" color="secondary" gutterBottom>
            {category}
          </Typography>
          <Grid container spacing={3}>
            {items.map(({ route, label, content }) => (
              <Grid item xs={12} sm={6} md={4} key={route} component={motion.div} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
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
