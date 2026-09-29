import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
// Day 8 -- a shared list of user fields (id, name, email), so we don't
// repeat the same fields everywhere we need to show a user.
import { USER_PROFILE_FIELDS } from "../graphql/fragments.js";
// Day 9 -- a loading placeholder shown while we wait for data.
import { ListSkeleton } from "./Skeleton.jsx";

const GET_USERS = gql`
  query GetUsers {
    users {
      ...UserProfileFields
      posts {
        id
        title
      }
    }
  }
  ${USER_PROFILE_FIELDS}
`;

// Day 6 -- this fetches the list of users as soon as the page opens, and
// updates itself as loading finishes or an error happens.
export function UsersList() {
  const { loading, error, data } = useQuery(GET_USERS);

  // Day 9 -- show a loading placeholder instead of just "Loading users...".
  if (loading) return <ListSkeleton rows={2} />;
  if (error) return <p role="alert">Error loading users: {error.message}</p>;

  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong> ({user.email}) — {user.posts.length} post(s)
        </li>
      ))}
    </ul>
  );
}
