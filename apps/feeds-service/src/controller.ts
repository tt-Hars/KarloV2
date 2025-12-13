import { Request, Response } from 'express';
import { getCollection } from './db';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const getPagination = (req: Request) => {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    return { limit, offset };
}

const SOCIAL_GRAPH_URL = process.env.SOCIAL_GRAPH_SERVICE_URL || 'http://127.0.0.1:3336/graphql';
// Auth Service URL - default to localhost:3333 if not set
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://127.0.0.1:3333';

const fetchFollowingIds = async (userId: string): Promise<string[]> => {
    const MAX_RETRIES = 3;
    let attempts = 0;

    while (attempts < MAX_RETRIES) {
        try {
            const response = await axios.post(SOCIAL_GRAPH_URL, {
                query: `
                    query GetFollowing($userId: ID!) {
                        following(userId: $userId) {
                            id
                        }
                    }
                `,
                variables: { userId }
            });

            if (response.data.errors) {
                console.error('GraphQL Errors:', response.data.errors);
                return [];
            }

            return response.data.data.following.map((u: any) => u.id);
        } catch (error: any) {
            attempts++;
            console.error(`Error fetching following list (Attempt ${attempts}/${MAX_RETRIES}):`, error.message);

            if (attempts >= MAX_RETRIES) {
                return [];
            }
            // Simple backoff
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    return [];
}

const fetchUserDetails = async (userId: string) => {
    try {
        // Call Auth Service to get user details
        const response = await axios.get(`${AUTH_SERVICE_URL}/api/v1/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return { name: 'Anonymous', _id: userId };
    }
}

/**
 * Get feed items (Universal/Generic)
 * @param req
 * @param res
 */
export const getFeed = async (req: Request, res: Response) => {
  return getExploreFeed(req, res);
};

/**
 * Get Explore Feed items (Universal/Recommended)
 * @param req
 * @param res
 */
export const getExploreFeed = async (req: Request, res: Response) => {
  try {
    const collection = getCollection();
    const { limit, offset } = getPagination(req);

    // In a real explore feed, this would be a vector search or personalized recommendation
    const feedItems = await collection.find({}, { limit, skip: offset }).toArray();

    res.status(200).json(feedItems);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get Following Feed items
 * @param req
 * @param res
 */
export const getFollowingFeed = async (req: Request, res: Response) => {
  try {
    const collection = getCollection();
    const { limit, offset } = getPagination(req);

    // Get userId from trusted header (injected by gateway)
    // Fallback to query param only for backward compatibility or dev testing,
    // but in production, we should rely on the secure header.
    const userId = (req.headers['x-user-id'] as string) || (req.query.userId as string);
    console.log("Fetching following feed for userId:::::::::", userId);
    if (!userId) {
        // If no user is logged in, return empty or 401. For now, empty.
        res.status(200).json([]);
        return;
    }

    // Fetch followed user IDs from Social Graph Service
    const followedIds = await fetchFollowingIds(userId);

    if (followedIds.length === 0) {
        res.status(200).json([]);
        return;
    }

    // Filter posts where author._id is in the followed list
    // Note: We are no longer filtering by name as IDs are more reliable
    const feedItems = await collection.find(
        { "author._id": { $in: followedIds } },
        { limit, skip: offset, sort: { createdAt: -1 } } // Added sort by date desc
    ).toArray();

    res.status(200).json(feedItems);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get User's Own Posts
 * @param req
 * @param res
 */
export const getUserPostsFeed = async (req: Request, res: Response) => {
  try {
    const collection = getCollection();
    const { limit, offset } = getPagination(req);

    const userId = req.query.userId as string;

    if (!userId) {
         // Fallback or error if userId is strictly required.
         // For now, return empty or generic if missing to avoid crashing.
         res.status(400).json({ message: 'User ID is required' });
         return;
    }

    // Filter by the user's ID
    const feedItems = await collection.find(
        { "author._id": userId },
        { limit, skip: offset }
    ).toArray();

    res.status(200).json(feedItems);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create a new feed item
 * @param req
 * @param res
 */
export const createFeedItem = async (req: Request, res: Response) => {
  try {
    const { type, content, mediaUrl, aspectRatio } = req.body;

    // Identify user from trusted header
    const userId = (req.headers['x-user-id'] as string) || (req.query.userId as string);
    console.log("Creating feed item for userId:::::::::", userId);

    if (!content && !mediaUrl) {
       res.status(400).json({ message: 'Content or Media URL is required' });
       return;
    }

    // Hydrate author details
    let author = { name: 'Anonymous', _id: userId || 'anon' };
    if (userId) {
        const userDetails = await fetchUserDetails(userId);
        if (userDetails) {
            author = { name: userDetails.name, _id: userDetails._id };
        }
    }

    const collection = getCollection();
    const newItem = {
      _id: uuidv4(),
      type: type || 'text',
      content,
      mediaUrl,
      aspectRatio,
      author,
      stats: {
        likes: 0,
        comments: 0,
        shares: 0
      },
      createdAt: new Date().toISOString()
    };

    await collection.insertOne(newItem);
    res.status(201).json(newItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a single feed item
 * @param req
 * @param res
 */
export const getFeedItem = async (req: Request, res: Response) => {
  try {
    const collection = getCollection();
    const item = await collection.findOne({ _id: req.params.id });

    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Like a feed item
 * @param req
 * @param res
 */
export const likeFeedItem = async (req: Request, res: Response) => {
    try {
        const collection = getCollection();
        const result = await collection.updateOne(
            { _id: req.params.id },
            { $inc: { "stats.likes": 1 } }
        );

        if (result.matchedCount > 0) {
             res.status(200).json({ message: 'Liked' });
        } else {
             res.status(404).json({ message: 'Item not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
