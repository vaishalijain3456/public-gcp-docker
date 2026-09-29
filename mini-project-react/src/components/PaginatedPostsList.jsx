import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
// Day 8 -- shared post fields (see fragments.js).
import { POST_CARD_FIELDS } from "../graphql/fragments.js";

const PAGE_SIZE = 3;

// Day 8 -- this asks for posts in small pages. `after` tells the server
// "give me the posts that come after this one", matching how the
// server's postsFeed is built.
const GET_POSTS_FEED = gql`
  query GetPostsFeed($first: Int!, $after: ID) {
    postsFeed(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...PostCardFields
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${POST_CARD_FIELDS}
`;

// Day 8 -- this fetches posts only when we ask for them (first page when
// the page opens, then one more page each time "Load more" is clicked),
// instead of fetching everything right away.
export function PaginatedPostsList() {
  const [items, setItems] = useState([]);
  const [pageInfo, setPageInfo] = useState({ hasNextPage: false, endCursor: null });

  // We watch for new data to arrive and then add it to our list below.
  const [loadPosts, { data, loading, error }] = useLazyQuery(GET_POSTS_FEED, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!data?.postsFeed) return;
    setItems((prev) => [...prev, ...data.postsFeed.edges.map((e) => e.node)]);
    setPageInfo(data.postsFeed.pageInfo);
  }, [data]);

  // Load the first page on mount.
  useEffect(() => {
    loadPosts({ variables: { first: PAGE_SIZE, after: null } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLoadMore() {
    loadPosts({ variables: { first: PAGE_SIZE, after: pageInfo.endCursor } });
  }

  return (
    <div>
      <ul>
        {items.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> by {post.author.name} — {post.content}
          </li>
        ))}
      </ul>
      {error && <p role="alert">Error loading posts: {error.message}</p>}
      {pageInfo.hasNextPage && (
        <button type="button" onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
      {!pageInfo.hasNextPage && items.length > 0 && <p>No more posts.</p>}
    </div>
  );
}
