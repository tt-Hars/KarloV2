export const BASE_PATH = '/api/v1/feed';

const ROUTE_CONSTANTS = {
  GET_FEED: `${BASE_PATH}`, // Keeping for backward compatibility if needed, or mapping to explore
  GET_EXPLORE_FEED: `${BASE_PATH}/explore`,
  GET_FOLLOWING_FEED: `${BASE_PATH}/following`,
  GET_USER_POSTS_FEED: `${BASE_PATH}/myposts`,
  CREATE_FEED_ITEM: `${BASE_PATH}`,
  GET_FEED_ITEM: `${BASE_PATH}/:id`,
  LIKE_FEED_ITEM: `${BASE_PATH}/:id/like`,
};

export default ROUTE_CONSTANTS;
