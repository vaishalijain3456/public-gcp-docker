import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

// Day 8 -- this one question can ask for less or more information,
// based on the checkbox below. When the checkbox is off, the server
// doesn't even send email/posts -- it's not just hidden on the screen,
// it's genuinely not sent at all.
const GET_USER_DETAIL = gql`
  query GetUserDetail($id: ID!, $withDetails: Boolean!) {
    user(id: $id) {
      id
      name
      email @include(if: $withDetails)
      posts @include(if: $withDetails) {
        id
        title
      }
    }
  }
`;

export function UserDetailToggle() {
  const [userId, setUserId] = useState("1");
  const [withDetails, setWithDetails] = useState(false);

  const { loading, error, data } = useQuery(GET_USER_DETAIL, {
    variables: { id: userId, withDetails },
  });

  return (
    <div>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="1">Vaishali</option>
        <option value="2">Ritu Jain</option>
      </select>
      <label style={{ marginLeft: "0.5rem" }}>
        <input
          type="checkbox"
          checked={withDetails}
          onChange={(e) => setWithDetails(e.target.checked)}
        />
        {" "}Show details (email + posts)
      </label>

      {loading && <p>Loading...</p>}
      {error && <p role="alert">Error: {error.message}</p>}
      {data?.user && (
        <ul>
          <li>id: {data.user.id}</li>
          <li>name: {data.user.name}</li>
          {withDetails && <li>email: {data.user.email}</li>}
          {withDetails && <li>posts: {data.user.posts.map((p) => p.title).join(", ") || "(none)"}</li>}
        </ul>
      )}
    </div>
  );
}
