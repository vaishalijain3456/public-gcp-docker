import { gql } from "@apollo/client";

// Day 8 -- a reusable list of user fields, so any part of the app that
// shows a user (UsersList, a post's author, etc.) asks for the same
// fields in one place instead of repeating them.
export const USER_PROFILE_FIELDS = gql`
  fragment UserProfileFields on User {
    id
    name
    email
  }
`;

// Reusable fragment for a post "card" -- the fields needed to render a post
// summary, shared across queries, mutation results, and subscription payloads.
export const POST_CARD_FIELDS = gql`
  fragment PostCardFields on Post {
    id
    title
    content
    published
    author {
      ...UserProfileFields
    }
  }
  ${USER_PROFILE_FIELDS}
`;
