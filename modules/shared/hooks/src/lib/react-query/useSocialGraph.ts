import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const GRAPHQL_URL = '/graphql';

interface FollowData {
  following: { id: string }[];
}

export const useFollowingList = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['following', userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await axios.post(GRAPHQL_URL, {
        query: `
          query GetFollowing($userId: ID!) {
            following(userId: $userId) {
              id
            }
          }
        `,
        variables: { userId }
      });
      if (response.data.errors) throw new Error(response.data.errors[0].message);
      return response.data.data.following.map((u: any) => u.id) as string[];
    },
    enabled: !!userId,
    staleTime: 60000, // 1 minute
    retry: 1
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, targetId }: { userId: string; targetId: string }) => {
      const response = await axios.post(GRAPHQL_URL, {
        query: `
          mutation Follow($userId: ID!, $targetId: ID!) {
            follow(userId: $userId, targetId: $targetId)
          }
        `,
        variables: { userId, targetId }
      });
      if (response.data.errors) throw new Error(response.data.errors[0].message);
      return response.data.data.follow;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['following', variables.userId] });
    }
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, targetId }: { userId: string; targetId: string }) => {
      const response = await axios.post(GRAPHQL_URL, {
        query: `
          mutation Unfollow($userId: ID!, $targetId: ID!) {
            unfollow(userId: $userId, targetId: $targetId)
          }
        `,
        variables: { userId, targetId }
      });
      if (response.data.errors) throw new Error(response.data.errors[0].message);
      return response.data.data.unfollow;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['following', variables.userId] });
    }
  });
};
