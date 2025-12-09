import { getFeed, createFeedItem, getFeedItem, likeFeedItem } from './controller';
import { getCollection } from './db';
import { Request, Response } from 'express';

jest.mock('./db');

describe('Feeds Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  let mockCollection: any;

  beforeEach(() => {
    req = {};
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
    it('should return a list of feed items', async () => {
      const mockItems = [{ id: '1', content: 'test' }];
      mockCollection.toArray.mockResolvedValue(mockItems);

      await getFeed(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    it('should handle errors', async () => {
      mockCollection.toArray.mockRejectedValue(new Error('DB Error'));

      await getFeed(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'DB Error' });
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
