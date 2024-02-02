import styled from '@emotion/styled';
import { Grid } from '@mui/material';
// import TileCard from '../tile-card/tile-card';

/* eslint-disable-next-line */

export interface iModuleDetails {
  route: string;
  meta: Array<string>;
}

export interface iRoute {
  route: string;
}

export interface iCategoricalClassification {
  category: Array<string>;
}

export interface TilesListProps {
  routes: iRoute[];
}

const StyledTilesList = styled.div`
  color: pink;
`;

export function TilesList(props: TilesListProps) {
  const { routes } = props;
  return (
    <Grid container flexWrap="wrap" spacing={0}>
      {/* {routes.map((route) => (
        // <TileCard key={route.route} tileRoute={route.route}></TileCard>
      ))} */}
    </Grid>
  );
}

export default TilesList;
