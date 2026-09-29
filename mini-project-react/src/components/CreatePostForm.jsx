import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { GET_POSTS } from "./PostsList.jsx";
// Day 8 -- shared post fields (see fragments.js).
import { POST_CARD_FIELDS } from "../graphql/fragments.js";

// Day 6 -- this sends a new post to the server to be saved.
const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostCardFields
    }
  }
  ${POST_CARD_FIELDS}
`;

const AUTHORS = [
  { id: "1", name: "Vaishali", email: "vaishali@example.com" },
  { id: "2", name: "Ritu Jain", email: "ritu@example.com" },
];

export function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("1");

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    // Day 7 -- show the new post on screen right away, before the
    // server even replies, using a short-lived temporary id.
    optimisticResponse: (vars) => ({
      createPost: {
        __typename: "Post",
        id: `temp-${Date.now()}`,
        title: vars.input.title,
        content: vars.input.content,
        published: false,
        author: AUTHORS.find((a) => a.id === vars.input.authorId)
          ? { __typename: "User", ...AUTHORS.find((a) => a.id === vars.input.authorId) }
          : { __typename: "User", id: vars.input.authorId, name: "Unknown", email: "" },
      },
    }),
    // Day 7 -- add the new post to our saved list of posts ourselves,
    // instead of asking the server for the whole list again. This runs
    // twice: once for our "instant" guess, and once for the real answer
    // -- so we remove the temporary guess once the real post arrives.
    update(cache, { data }) {
      const newPost = data?.createPost;
      if (!newPost) return;

      const existing = cache.readQuery({ query: GET_POSTS });
      if (!existing) return;

      const withoutOptimistic = existing.posts.filter((p) => !p.id.startsWith("temp-"));
      const alreadyPresent = withoutOptimistic.some((p) => p.id === newPost.id);

      cache.writeQuery({
        query: GET_POSTS,
        data: {
          posts: alreadyPresent ? withoutOptimistic : [...withoutOptimistic, newPost],
        },
      });
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await createPost({ variables: { input: { title, content, authorId } } });
    setTitle("");
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
        {AUTHORS.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Create Post"}
      </button>
      {/* Day 6 -- show a clear message if saving the post failed. */}
      {error && <p role="alert">Error creating post: {error.message}</p>}
    </form>
  );
}
