import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String
    # Add other user fields as needed
  }

  type Query {
    following(userId: ID!): [User]
    followers(userId: ID!): [User]
  }

  # Mutation to follow/unfollow could be added here
  type Mutation {
    follow(userId: ID!, targetId: ID!): Boolean
    unfollow(userId: ID!, targetId: ID!): Boolean
  }
`;
