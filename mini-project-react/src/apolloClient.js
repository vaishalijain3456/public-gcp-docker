import { ApolloClient, InMemoryCache, HttpLink, split, ApolloLink } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors, CombinedProtocolErrors } from "@apollo/client/errors";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const GRAPHQL_URI = import.meta.env.VITE_GRAPHQL_URI || "http://localhost:4000/graphql";
const GRAPHQL_WS_URI = import.meta.env.VITE_GRAPHQL_WS_URI || GRAPHQL_URI.replace(/^http/, "ws");

// Day 8 -- one shared place that watches EVERY request our app makes,
// and logs any error it sees. Each part of the app still shows its own
// error message to the user (see UsersList/PostsList) -- this is just
// for us to see every error in one place too.
const errorLink = new ErrorLink(({ error, operation }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error] op=${operation.operationName} message="${message}" path=${path} locations=${JSON.stringify(locations)}`
      )
    );
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) =>
      console.error(
        `[Protocol error] op=${operation.operationName} message="${message}" extensions=${JSON.stringify(extensions)}`
      )
    );
  } else {
    console.error(`[Network error] op=${operation.operationName}:`, error);
  }
});

// Day 6 -- the normal connection to our server, used for regular
// questions and save requests.
const httpLink = new HttpLink({ uri: GRAPHQL_URI });

// Day 7 -- a second, live connection, used only for "keep me updated"
// requests (subscriptions).
const wsLink = new GraphQLWsLink(
  createClient({ url: GRAPHQL_WS_URI })
);

// Day 7 -- send "keep me updated" requests over the live connection, and
// send everything else over the normal connection.
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Day 6 -- this is our app's connection to the server, used everywhere
// via ApolloProvider in main.jsx. The error-watcher (Day 8) checks every
// request first, before it goes out over the normal or live connection
// (Day 7).
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, splitLink]),
  cache: new InMemoryCache(),
});
