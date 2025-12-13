import { resolvers } from './resolvers';
import { getFollowersCollection, getFollowingCollection } from './db';

// Mock DB module
jest.mock('./db', () => ({
  getFollowersCollection: jest.fn(),
  getFollowingCollection: jest.fn(),
}));

describe('Social Graph Resolvers', () => {
  let mockFollowersCollection: any;
  let mockFollowingCollection: any;

  beforeEach(() => {
    mockFollowersCollection = {
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn(),
      insertOne: jest.fn(),
      deleteOne: jest.fn(),
      findOne: jest.fn(),
    };
    mockFollowingCollection = {
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn(),
      insertOne: jest.fn(),
      deleteOne: jest.fn(),
      findOne: jest.fn(),
    };

    (getFollowersCollection as jest.Mock).mockReturnValue(mockFollowersCollection);
    (getFollowingCollection as jest.Mock).mockReturnValue(mockFollowingCollection);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Query', () => {
    it('following returns list of user IDs being followed', async () => {
      const userId = 'user1';
      const mockEdges = [{ followingId: 'user2' }, { followingId: 'user3' }];
      mockFollowingCollection.toArray.mockResolvedValue(mockEdges);

      const result = await resolvers.Query.following(null, { userId });

      expect(getFollowingCollection).toHaveBeenCalled();
      expect(mockFollowingCollection.find).toHaveBeenCalledWith({ userId });
      expect(result).toEqual([{ id: 'user2' }, { id: 'user3' }]);
    });

    it('followers returns list of followers', async () => {
      const userId = 'user1';
      const mockEdges = [{ followerId: 'userA' }, { followerId: 'userB' }];
      mockFollowersCollection.toArray.mockResolvedValue(mockEdges);

      const result = await resolvers.Query.followers(null, { userId });

      expect(getFollowersCollection).toHaveBeenCalled();
      expect(mockFollowersCollection.find).toHaveBeenCalledWith({ userId });
      expect(result).toEqual([{ id: 'userA' }, { id: 'userB' }]);
    });
  });

  describe('Mutation', () => {
    it('follow adds entries to both collections', async () => {
      const userId = 'user1';
      const targetId = 'user2';
      const context = { userId: 'user1' };

      const result = await resolvers.Mutation.follow(null, { userId, targetId }, context);

      expect(getFollowingCollection).toHaveBeenCalled();
      expect(getFollowersCollection).toHaveBeenCalled();

      expect(mockFollowingCollection.insertOne).toHaveBeenCalledWith(expect.objectContaining({
        userId,
        followingId: targetId
      }));

      expect(mockFollowersCollection.insertOne).toHaveBeenCalledWith(expect.objectContaining({
        userId: targetId,
        followerId: userId
      }));

      expect(result).toBe(true);
    });

    it('unfollow removes entries from both collections', async () => {
      const userId = 'user1';
      const targetId = 'user2';
      const context = { userId: 'user1' };

      const result = await resolvers.Mutation.unfollow(null, { userId, targetId }, context);

      expect(mockFollowingCollection.deleteOne).toHaveBeenCalledWith({ userId, followingId: targetId });
      expect(mockFollowersCollection.deleteOne).toHaveBeenCalledWith({ userId: targetId, followerId: userId });

      expect(result).toBe(true);
    });

    it('follow throws if userId does not match context', async () => {
      const userId = 'user1';
      const targetId = 'user2';
      const context = { userId: 'differentUser' };

      await expect(resolvers.Mutation.follow(null, { userId, targetId }, context))
        .rejects
        .toThrow("Not authorized to follow on behalf of another user");
    });
  });
});
