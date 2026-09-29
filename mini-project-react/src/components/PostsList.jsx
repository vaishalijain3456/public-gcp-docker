import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
// Day 8 -- a shared list of post fields, used here and in a few other
// places, so we don't have to type the same fields again and again.
import { POST_CARD_FIELDS } from "../graphql/fragments.js";
// Day 9 -- a loading placeholder shown while we wait for data.
import { ListSkeleton } from "./Skeleton.jsx";

// This is shared with CreatePostForm.jsx (Day 7) so it can update this
// exact same list after adding a new post.
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      ...PostCardFields
    }
  }
  ${POST_CARD_FIELDS}
`;

// Day 6 -- this fetches the list of posts and shows it on the page.
export function PostsList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  // Day 9 -- show a loading placeholder instead of just "Loading posts...".
  if (loading) return <ListSkeleton rows={4} />;
  if (error) return <p role="alert">Error loading posts: {error.message}</p>;

  return (
    <ul>
      {data.posts.map((post) => (
        <li key={post.id}>
          <strong>{post.title}</strong> by {post.author.name} — {post.content}
        </li>
      ))}
    </ul>
  );
}
