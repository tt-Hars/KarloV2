import { Request, Response } from 'express';
import { getCollection } from './db';
import { v4 as uuidv4 } from 'uuid';

const getPagination = (req: Request) => {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    return { limit, offset };
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
 * Get Following Feed items (Mocked for now)
 * @param req
 * @param res
 */
export const getFollowingFeed = async (req: Request, res: Response) => {
  try {
    const collection = getCollection();
    const { limit, offset } = getPagination(req);

    // MOCK: Assuming the current user follows these authors
    // In the future, fetch this list from a social graph service
    const mockedFollowedUsers = [
        { _id: 'user-id-1', name: 'Jane Doe' },
        { _id: 'user-id-2', name: 'John Smith' },
        { _id: 'user-id-3', name: 'TechGuru' }
    ];

    const followedIds = mockedFollowedUsers.map(u => u._id);
    const followedNames = mockedFollowedUsers.map(u => u.name);

    // Filter posts where author.name is in the followed list OR author._id is in the followed list
    const feedItems = await collection.find(
        {
            $or: [
                { "author._id": { $in: followedIds } },
                { "author.name": { $in: followedNames } }
            ]
        },
        { limit, skip: offset }
    ).toArray();

    // Fallback if no followed content found, just to show something in the UI for demo
    if (feedItems.length === 0 && offset === 0) {
        // Return nothing so the UI shows "You are not following anyone" or similar
        res.status(200).json([]);
        return;
    }

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
    const { type, content, mediaUrl, aspectRatio, author } = req.body;

    if (!content && !mediaUrl) {
       res.status(400).json({ message: 'Content or Media URL is required' });
       return;
    }

    const collection = getCollection();
    const newItem = {
      _id: uuidv4(),
      type: type || 'text',
      content,
      mediaUrl,
      aspectRatio,
      // Ensure author has name and id. In production, 'author' should come from req.user
      author: author || { name: 'Anonymous', _id: 'anon' },
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
