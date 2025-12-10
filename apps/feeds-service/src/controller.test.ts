import { getFeed, getExploreFeed, getFollowingFeed, getUserPostsFeed, createFeedItem, getFeedItem, likeFeedItem } from './controller';
import { getCollection } from './db';
import { Request, Response } from 'express';
import axios from 'axios';

jest.mock('./db');
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Feeds Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  let mockCollection: any;

  beforeEach(() => {
    req = { query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    mockCollection = {
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn(),
      insertOne: jest.fn(),
      findOne: jest.fn(),
      updateOne: jest.fn(),
    };
    (getCollection as jest.Mock).mockReturnValue(mockCollection);
  });

  describe('getFeed', () => {
    it('should act as explore feed', async () => {
      const mockItems = [{ id: '1', content: 'test' }];
      mockCollection.toArray.mockResolvedValue(mockItems);

      await getFeed(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });
  });

  describe('getExploreFeed', () => {
    it('should return a list of explore items', async () => {
      const mockItems = [{ id: '1', content: 'explore content' }];
      mockCollection.toArray.mockResolvedValue(mockItems);

      await getExploreFeed(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    it('should handle pagination', async () => {
        req.query = { limit: '10', offset: '5' };
        mockCollection.toArray.mockResolvedValue([]);

        await getExploreFeed(req as Request, res as Response);

        expect(mockCollection.find).toHaveBeenCalledWith({}, expect.objectContaining({ limit: 10, skip: 5 }));
    });
  });

  describe('getFollowingFeed', () => {
    it('should return a list of following items', async () => {
      req.query = { userId: '123' }; // Simulate logged in user
      // Mock social graph response
      mockedAxios.post.mockResolvedValue({
        data: {
            data: {
                following: [{ id: 'friend1' }]
            }
        }
      });

      const mockItems = [{ id: '1', content: 'following content', author: { _id: 'friend1' } }];
      mockCollection.toArray.mockResolvedValue(mockItems);

      await getFollowingFeed(req as Request, res as Response);

      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockCollection.find).toHaveBeenCalledWith(
          expect.objectContaining({ "author._id": { $in: ['friend1'] } }),
          expect.anything()
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    it('should return empty list if user follows no one', async () => {
      req.query = { userId: '123' };
      mockedAxios.post.mockResolvedValue({
        data: {
            data: {
                following: []
            }
        }
      });

      await getFollowingFeed(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
      // Should not call DB if no followers
      expect(mockCollection.find).not.toHaveBeenCalled();
    });

    it('should return empty if no userId provided', async () => {
      req.query = {}; // No userId

      await getFollowingFeed(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe('getUserPostsFeed', () => {
    it('should return a list of user posts when userId is provided', async () => {
      req.query = { userId: '123' };
      const mockItems = [{ id: '1', content: 'my content', author: { _id: '123' } }];
      mockCollection.toArray.mockResolvedValue(mockItems);

      await getUserPostsFeed(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    it('should return 400 when userId is missing', async () => {
      req.query = {}; // No userId

      await getUserPostsFeed(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User ID is required' });
    });

    it('should handle pagination', async () => {
        req.query = { userId: '123', limit: '10', offset: '5' };
        mockCollection.toArray.mockResolvedValue([]);

        await getUserPostsFeed(req as Request, res as Response);

        expect(mockCollection.find).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ limit: 10, skip: 5 }));
    });
  });


  describe('createFeedItem', () => {
    it('should create a feed item', async () => {
      req.body = { content: 'New Post', type: 'text' };
      mockCollection.insertOne.mockResolvedValue({ insertedId: '123' });

      await createFeedItem(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        content: 'New Post',
        type: 'text'
      }));
    });

    it('should return 400 if content/media is missing', async () => {
      req.body = {};

      await createFeedItem(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('getFeedItem', () => {
    it('should return a single item', async () => {
      req.params = { id: '1' };
      const mockItem = { _id: '1', content: 'test' };
      mockCollection.findOne.mockResolvedValue(mockItem);

      await getFeedItem(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });

    it('should return 404 if not found', async () => {
      req.params = { id: '1' };
      mockCollection.findOne.mockResolvedValue(null);

      await getFeedItem(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

   describe('likeFeedItem', () => {
    it('should like an item', async () => {
      req.params = { id: '1' };
      mockCollection.updateOne.mockResolvedValue({ matchedCount: 1 });

      await likeFeedItem(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockCollection.updateOne).toHaveBeenCalledWith(
          { _id: '1' },
          { $inc: { "stats.likes": 1 } }
      );
    });

    it('should return 404 if item not found to like', async () => {
      req.params = { id: '1' };
      mockCollection.updateOne.mockResolvedValue({ matchedCount: 0 });

      await likeFeedItem(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
