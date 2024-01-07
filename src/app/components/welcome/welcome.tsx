import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';
import { TilesList } from '@karlo/modules/shared/ui';
import { moduleDetails } from 'src/app/moduleDetails';

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
  listOfRoutes: Array<{ route: string; meta: string[] }>
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
  return categories;
}

export function Welcome(props: WelcomeProps) {
  const categoryRoutes = Object.values(categoricalClassification(moduleDetails));
  const categoryKeys = Object.keys(categoricalClassification(moduleDetails));

  return (
    <StyledWelcome>
      <Grid
        container
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        flexDirection='column'
        spacing={10}
      >
        {categoryRoutes.map((category, index) => (
          <Grid item sx={{paddingTop: '15px !important'}} xs={12} key={index} display='flex' flexDirection='column'>
            <Typography variant='h4' my='1rem'>{categoryKeys[index]}</Typography>
            <TilesList routes={category}></TilesList>
          </Grid>
        ))}
      </Grid>
    </StyledWelcome>
  );
}

export default Welcome;
