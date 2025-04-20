import styled from '@emotion/styled';
import { Box, Button, Grid, Link, Paper, Theme, Typography, makeStyles } from '@mui/material';
import { moduleDetails } from 'src/app/moduleDetails';
import {TileCard} from '@karlo/modules/shared/ui';
import { useEffect } from 'react';

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
  listOfRoutes: Array<{ route: string; meta: string[] }>,
): Record<string, Array<{ route: string }>> {
  const categories: Record<string, Array<{ route: string }>> = {};
  const seenCategories: Set<string> = new Set<string>();
  for (const route of listOfRoutes) {
    for (const category of route.meta) {
      if (!seenCategories.has(category)) {
        categories[category] = [];
        seenCategories.add(category);
      }
      categories[category].push({ route: route.route });
    }
  }
  console.log(categories);
  return categories;
}

export function Welcome(props: WelcomeProps) {
  const categoryRoutes = Object.values(
    categoricalClassification(moduleDetails),
  );
  const categoryKeys = Object.keys(categoricalClassification(moduleDetails));

  const data = {
    "entertainment": [
      { "route": "_watch", "label": "Watch", "content": "Watch your favorite shows and movies.", "cta": "Watch Now" },
      { "route": "_listen", "label": "Listen", "content": "Listen to music, podcasts, and audiobooks.", "cta": "Listen Now" },
      { "route": "_feed", "label": "Feed", "content": "Explore social media feeds and trending content.", "cta": "Explore Feed" }
    ],
    "productivity": [
      { "route": "_write", "label": "Write", "content": "Write articles, stories, and notes.", "cta": "Start Writing" },
      { "route": "_read", "label": "Read", "content": "Read articles, books, and news.", "cta": "Start Reading" },
      { "route": "_plan", "label": "Plan", "content": "Plan your tasks, projects, and goals.", "cta": "Start Planning" }
    ],
    "market place": [
      { "route": "_shop", "label": "Shop", "content": "Discover and shop for clothing, electronics, and more.", "cta": "Shop Now" }
    ]
  };

  useEffect(() => {
    const getProfile = async () => {
      const profile = await (await fetch('/api/v1/users/profile', {
        method: 'GET',
        credentials: 'include'
      })).json();
      console.log(profile);
    }
    getProfile();
  }, []);

  

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
                <TileCard label={label} content={content} route={route}></TileCard>
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
