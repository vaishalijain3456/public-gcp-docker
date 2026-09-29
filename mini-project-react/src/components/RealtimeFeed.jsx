import { useState } from "react";
import { gql } from "@apollo/client";
import { useSubscription } from "@apollo/client/react";
// Day 8 -- shared post fields (see fragments.js).
import { POST_CARD_FIELDS } from "../graphql/fragments.js";

// Day 7 -- this "question" is a bit different: instead of asking once,
// it stays open and waits for new posts to arrive live, over a
// WebSocket connection (see apolloClient.js).
const POST_CREATED = gql`
  subscription OnPostCreated {
    postCreated {
      ...PostCardFields
    }
  }
  ${POST_CARD_FIELDS}
`;

// Day 7 -- this shows a live-updating list of new posts. Anyone with
// this page open sees a new post appear the instant someone creates it,
// with no need to refresh the page.
export function RealtimeFeed() {
  const [feed, setFeed] = useState([]);

  // Every time a new post arrives, add it to the top of our list.
  const { error } = useSubscription(POST_CREATED, {
    onData: ({ data }) => {
      const post = data?.data?.postCreated;
      if (post) setFeed((prev) => [post, ...prev]);
    },
  });

  return (
    <div>
      <p style={{ fontSize: "0.85em", color: "#888" }}>
        Live over WebSocket (graphql-ws) -- create a post above and watch it
        appear here instantly, pushed from the server.
      </p>
      {error && <p role="alert">Subscription error: {error.message}</p>}
      {feed.length === 0 && !error && <p>Waiting for new posts...</p>}
      <ul>
        {feed.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> by {post.author.name} — {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
