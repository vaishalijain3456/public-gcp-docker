import { gql } from "@apollo/client";
import { ApolloProvider, useQuery } from "@apollo/client/react";
import { externalApolloClient } from "../externalApolloClient.js";
import { ListSkeleton } from "../components/Skeleton.jsx";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries(filter: { code: { in: ["IN", "US", "GB", "JP", "BR"] } }) {
      code
      name
      emoji
      capital
    }
  }
`;

function CountriesList() {
  // Day 9 -- this question goes to the outside website's server
  // (externalApolloClient below), not to our own server.
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <ListSkeleton rows={5} />;
  if (error) return <p role="alert">Error loading countries: {error.message}</p>;

  return (
    <ul>
      {data.countries.map((c) => (
        <li key={c.code}>
          {c.emoji} <strong>{c.name}</strong> — capital: {c.capital}
        </li>
      ))}
    </ul>
  );
}

// Day 9 -- this is the "/external-api" page. It talks to a real website
// on the internet instead of our own server, just to show that our app
// can work with any GraphQL server, not only ours.
export function ExternalApiPage() {
  return (
    <section style={{ textAlign: "left", maxWidth: 480, margin: "2rem auto" }}>
      <h2>Day 9 — External API Integration</h2>
      <p style={{ fontSize: "0.85em", color: "#888" }}>
        Live query against a hosted, third-party GraphQL API
        (countries.trevorblades.com) -- not our own graphql-server.
      </p>
      <ApolloProvider client={externalApolloClient}>
        <CountriesList />
      </ApolloProvider>
    </section>
  );
}
