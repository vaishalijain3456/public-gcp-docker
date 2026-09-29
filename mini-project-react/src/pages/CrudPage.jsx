import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_POSTS } from "../components/PostsList.jsx";
import { CreatePostForm } from "../components/CreatePostForm.jsx";
import { ListSkeleton } from "../components/Skeleton.jsx";
import { CrashTestButton } from "../components/CrashTestButton.jsx";
import { POST_CARD_FIELDS } from "../graphql/fragments.js";

// Day 9 -- this changes a post's title/content. Because it asks for the
// same fields as our other post lists, Apollo automatically updates this
// post everywhere it's shown -- we don't have to do that ourselves here.
const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      ...PostCardFields
    }
  }
  ${POST_CARD_FIELDS}
`;

// Day 9 -- this deletes a post. It only sends back the deleted post's id
// (there's no post left to send back), so we have to remove it from our
// list ourselves in the `update` function below.
const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

function EditablePostRow({ post }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const [updatePost, { loading: saving, error: saveError }] = useMutation(UPDATE_POST);
  const [deletePost, { loading: deleting, error: deleteError }] = useMutation(DELETE_POST, {
    update(cache) {
      const existing = cache.readQuery({ query: GET_POSTS });
      if (!existing) return;
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: existing.posts.filter((p) => p.id !== post.id) },
      });
    },
  });

  async function handleSave() {
    await updatePost({ variables: { id: post.id, input: { title, content } } });
    setEditing(false);
  }

  if (editing) {
    return (
      <li>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="button" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        {saveError && <p role="alert">Error saving: {saveError.message}</p>}
      </li>
    );
  }

  return (
    <li>
      <strong>{post.title}</strong> by {post.author.name} — {post.content}{" "}
      <button type="button" onClick={() => setEditing(true)}>Edit</button>{" "}
      <button type="button" onClick={() => deletePost({ variables: { id: post.id } })} disabled={deleting}>
        {deleting ? "Deleting..." : "Delete"}
      </button>
      {deleteError && <p role="alert">Error deleting: {deleteError.message}</p>}
    </li>
  );
}

// Day 9 -- this is the "/crud" page. It lets you Create, Read, Update,
// and Delete posts, all in one place.
export function CrudPage() {
  const { loading, error, data } = useQuery(GET_POSTS);

  return (
    <section style={{ textAlign: "left", maxWidth: 480, margin: "2rem auto" }}>
      <h2>Day 9 — Full CRUD</h2>

      <h3>Create</h3>
      <CreatePostForm />

      <h3>Read / Update / Delete</h3>
      {loading && <ListSkeleton rows={4} />}
      {error && <p role="alert">Error loading posts: {error.message}</p>}
      {data && (
        <ul>
          {data.posts.map((post) => (
            <EditablePostRow key={post.id} post={post} />
          ))}
        </ul>
      )}

      <h3>Error Boundary</h3>
      <CrashTestButton />
    </section>
  );
}
