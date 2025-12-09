import { Request, Response } from 'express';
import { getCollection } from './db';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get feed items
 * @param req
 * @param res
 */
export const getFeed = async (req: Request, res: Response) => {
  try {
    const collection = getCollection();
    // Simple pagination could be added here
    const limit = 20;
    const feedItems = await collection.find({}, { limit }).toArray();

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
      author: author || { name: 'Anonymous' }, // In a real app, get this from auth token
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
