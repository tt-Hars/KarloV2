import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import ROUTE_CONSTANTS, { BASE_PATH } from './constants/routes';
import {
  getFeed,
  getExploreFeed,
  getFollowingFeed,
  getUserPostsFeed,
  createFeedItem,
  getFeedItem,
  likeFeedItem
} from './controller';
import { correlationIdMiddleware, Logger, withLogging } from '@karlo/logging';

dotenv.config();

const LOGGING_SERVICE_URL = process.env.LOGGING_SERVICE_URL || 'http://localhost:3337/logs';
const logger = new Logger('feeds-service', LOGGING_SERVICE_URL);

const app = express();

app.use(correlationIdMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors()); // Allow CORS for now, can be restricted later

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
// Note: Specific routes must come before generic parameter routes
app.get(ROUTE_CONSTANTS.GET_EXPLORE_FEED, withLogging(logger, 'getExploreFeed', getExploreFeed));
app.get(ROUTE_CONSTANTS.GET_FOLLOWING_FEED, withLogging(logger, 'getFollowingFeed', getFollowingFeed));
app.get(ROUTE_CONSTANTS.GET_USER_POSTS_FEED, withLogging(logger, 'getUserPostsFeed', getUserPostsFeed));

app.get(ROUTE_CONSTANTS.GET_FEED, withLogging(logger, 'getFeed', getFeed)); // Kept for generic access or backward compatibility
app.post(ROUTE_CONSTANTS.CREATE_FEED_ITEM, withLogging(logger, 'createFeedItem', createFeedItem));
app.get(ROUTE_CONSTANTS.GET_FEED_ITEM, withLogging(logger, 'getFeedItem', getFeedItem));
app.post(ROUTE_CONSTANTS.LIKE_FEED_ITEM, withLogging(logger, 'likeFeedItem', likeFeedItem));

// Health check
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to Feeds Service' });
});

const port = Number(process.env.FEEDS_SERVICE_PORT) || 3335;

app.use(notFound);
app.use(errorHandler);

// Ensure the server listens in all environments when run directly (e.g. by PM2)
if (require.main === module) {
  const server = app.listen(port, '127.0.0.1', () => {
    console.log(`Feeds Service listening at http://127.0.0.1:${port}/`);
  });
  server.on('error', console.error);
}

export const handler = serverless(app, {
    basePath: '/.netlify/functions/feeds'
});
