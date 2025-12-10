import { getFollowersCollection, getFollowingCollection } from './db';

// Placeholder for fetching full user details.
// In a real microservice architecture, we might need to call Auth Service or User Service
// to get user details (name, avatar, etc) given a list of IDs.
// For now, we return User objects with just IDs, as the Social Graph only knows about IDs.
// The frontend or a gateway aggregation layer would typically hydrate this data.
// OR we can store minimal user data (snapshot) in the edge/relationship.

const getUserDetails = async (userId: string) => {
    // This is where we'd fetch user details.
    // For this implementation, we simply return the ID.
    return { id: userId, username: "User " + userId };
}

export const resolvers = {
  Query: {
    following: async (_: any, { userId }: { userId: string }) => {
      const collection = getFollowingCollection();
      // Find all entries where user_id is the follower
      const edges = await collection.find({ userId: userId }).toArray();
      // extracting the 'followingId' from the edges
      const users = edges.map((edge: any) => ({ id: edge.followingId }));
      return users;
    },
    followers: async (_: any, { userId }: { userId: string }) => {
      const collection = getFollowersCollection();
      // Find all entries where target_id is the user
      // Schema: userId (the person being followed), followerId (the person following)
      const edges = await collection.find({ userId: userId }).toArray();
      const users = edges.map((edge: any) => ({ id: edge.followerId }));
      return users;
    },
  },
  Mutation: {
    follow: async (_: any, { userId, targetId }: { userId: string, targetId: string }, context: any) => {
      // Security Check: Ensure the actor is the authenticated user
      if (context.userId && context.userId !== userId) {
          throw new Error("Not authorized to follow on behalf of another user");
      }

      const followingColl = getFollowingCollection();
      const followersColl = getFollowersCollection();

      // Check if already following to prevent duplicates
      const existing = await followingColl.findOne({ userId, followingId: targetId });
      if (existing) {
        return true; // Already following
      }

      const timestamp = new Date().toISOString();

      // Add to following table: User A follows User B
      await followingColl.insertOne({
          userId: userId,
          followingId: targetId,
          timestamp
      });

      // Add to followers table: User B is followed by User A
      await followersColl.insertOne({
          userId: targetId,
          followerId: userId,
          timestamp
      });

      return true;
    },
    unfollow: async (_: any, { userId, targetId }: { userId: string, targetId: string }, context: any) => {
       // Security Check: Ensure the actor is the authenticated user
       if (context.userId && context.userId !== userId) {
           throw new Error("Not authorized to unfollow on behalf of another user");
       }

       const followingColl = getFollowingCollection();
       const followersColl = getFollowersCollection();

       await followingColl.deleteOne({ userId: userId, followingId: targetId });
       await followersColl.deleteOne({ userId: targetId, followerId: userId });

       return true;
    }
  }
};
