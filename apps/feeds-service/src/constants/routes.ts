export const BASE_PATH = '/api/v1/feed';

const ROUTE_CONSTANTS = {
  GET_FEED: `${BASE_PATH}`,
  CREATE_FEED_ITEM: `${BASE_PATH}`,
  GET_FEED_ITEM: `${BASE_PATH}/:id`,
  LIKE_FEED_ITEM: `${BASE_PATH}/:id/like`,
};

export default ROUTE_CONSTANTS;
