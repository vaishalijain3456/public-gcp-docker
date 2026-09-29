import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Day 9 -- this is a second, separate connection, on purpose different
// from apolloClient.js (which talks to our own server). This one points
// at a real public website's GraphQL API (a free Countries API, no
// login needed) to show it can connect to any GraphQL server.
export const externalApolloClient = new ApolloClient({
  link: new HttpLink({ uri: "https://countries.trevorblades.com/graphql" }),
  cache: new InMemoryCache(),
});
