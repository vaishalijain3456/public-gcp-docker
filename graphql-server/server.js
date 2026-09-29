import { createSchema, createYoga, createPubSub } from "graphql-yoga";
import { createServer } from "node:http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

const users = [
  { id: "1", name: "Vaishali", email: "vaishali@example.com", createdAt: new Date().toISOString() },
  { id: "2", name: "Ritu Jain", email: "ritu@example.com", createdAt: new Date().toISOString() },
];

const posts = [
  { id: "1", title: "Hello GraphQL", content: "First post", published: true, createdAt: new Date().toISOString(), authorId: "1" },
  { id: "2", title: "Apollo Client + React", content: "Wiring up useQuery/useMutation", published: false, createdAt: new Date().toISOString(), authorId: "2" },
  { id: "3", title: "Fragments 101", content: "Sharing fields across operations", published: true, createdAt: new Date().toISOString(), authorId: "1" },
  { id: "4", title: "Pagination Patterns", content: "Cursor vs offset", published: true, createdAt: new Date().toISOString(), authorId: "2" },
  { id: "5", title: "Error Handling", content: "Global vs local error links", published: false, createdAt: new Date().toISOString(), authorId: "1" },
  { id: "6", title: "Directives", content: "@include and @skip", published: true, createdAt: new Date().toISOString(), authorId: "2" },
  { id: "7", title: "Code Generation", content: "Typed hooks from schema", published: true, createdAt: new Date().toISOString(), authorId: "1" },
  { id: "8", title: "Subscriptions Recap", content: "Real-time over WebSockets", published: false, createdAt: new Date().toISOString(), authorId: "2" },
];

let nextPostId = posts.length + 1;

// Day 7 -- this is a live message channel. When a post is created, we
// announce it here, and anyone listening (Subscription.postCreated) gets
// told right away.
const pubsub = createPubSub();
const POST_CREATED = "POST_CREATED";

const typeDefs = /* GraphQL */ `
  # Day 5 -- this describes what data our app has: Users, Posts, and the
  # questions (queries) you can ask about them.
  scalar DateTime

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: DateTime!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    createdAt: DateTime!
    author: User!
  }

  # Day 8 -- these types let us send posts in small pages (a few at a
  # time) instead of all at once, for the "Load more" button below.
  type PostEdge {
    cursor: ID!
    node: Post!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: ID
  }

  type PostConnection {
    edges: [PostEdge!]!
    pageInfo: PageInfo!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
    postsFeed(first: Int!, after: ID): PostConnection!
  }

  input CreatePostInput {
    title: String!
    content: String!
    authorId: ID!
  }

  input UpdatePostInput {
    title: String
    content: String
    published: Boolean
  }

  # Day 6 -- createPost lets the app add a new post.
  # Day 9 -- updatePost and deletePost let the app change or remove a post.
  # Together with reading posts, this gives full Create/Read/Update/Delete.
  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): ID!
  }

  # Day 7 -- this lets the app "listen" for new posts as they happen.
  type Subscription {
    postCreated: Post!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_parent, { id }) => users.find((u) => u.id === id),
    posts: () => posts,
    post: (_parent, { id }) => posts.find((p) => p.id === id),
    // Day 8 -- `after` is the id of the last post the app already has.
    // We just cut the list right after that post and send the next bit.
    postsFeed: (_parent, { first, after }) => {
      let startIndex = 0;
      if (after) {
        const idx = posts.findIndex((p) => p.id === after);
        startIndex = idx >= 0 ? idx + 1 : 0;
      }
      const slice = posts.slice(startIndex, startIndex + first);
      const edges = slice.map((post) => ({ cursor: post.id, node: post }));
      return {
        edges,
        pageInfo: {
          hasNextPage: startIndex + first < posts.length,
          endCursor: edges.length ? edges[edges.length - 1].cursor : null,
        },
      };
    },
  },
  Mutation: {
    // Day 6 -- this adds a new post.
    // Day 7 -- it also announces the new post on the live channel, so
    // every open app sees it show up right away.
    createPost: (_parent, { input }) => {
      const author = users.find((u) => u.id === input.authorId);
      if (!author) {
        throw new Error(`No user found with id ${input.authorId}`);
      }
      const post = {
        id: String(nextPostId++),
        title: input.title,
        content: input.content,
        published: false,
        createdAt: new Date().toISOString(),
        authorId: input.authorId,
      };
      posts.push(post);
      pubsub.publish(POST_CREATED, { postCreated: post });
      return post;
    },
    // Day 9 -- this changes an existing post's details.
    updatePost: (_parent, { id, input }) => {
      const post = posts.find((p) => p.id === id);
      if (!post) {
        throw new Error(`No post found with id ${id}`);
      }
      if (input.title !== undefined) post.title = input.title;
      if (input.content !== undefined) post.content = input.content;
      if (input.published !== undefined) post.published = input.published;
      return post;
    },
    // Day 9 -- this removes a post. It sends back just the id, so the
    // app knows which post to remove from its own list without asking
    // the server for the whole list again.
    deletePost: (_parent, { id }) => {
      const index = posts.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error(`No post found with id ${id}`);
      }
      posts.splice(index, 1);
      return id;
    },
  },
  // Day 7 -- everyone listening to this gets told the instant a new post
  // is created above.
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.subscribe(POST_CREATED),
    },
  },
  Post: {
    author: (post) => users.find((u) => u.id === post.authorId),
  },
  User: {
    posts: (user) => posts.filter((p) => p.authorId === user.id),
  },
};

const schema = createSchema({ typeDefs, resolvers });

// Day 11 -- this reads which websites are allowed to call our server from
// a setting (CORS_ORIGIN) instead of a fixed value in the code. You can
// list more than one website, separated by commas. If nothing is set, it
// allows any website, same as before.
const corsOriginEnv = process.env.CORS_ORIGIN || "*";
// If the setting is just "*", keep it as plain text meaning "allow
// everyone". Turning it into a list here would actually mean "only allow
// a website literally named *", which is not what we want.
const allowedOrigins =
  corsOriginEnv === "*" ? "*" : corsOriginEnv.split(",").map((origin) => origin.trim());

const yoga = createYoga({
  schema,
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
  },
});

const httpServer = createServer(yoga);
const PORT = process.env.PORT || 4000;

// Day 7 -- this sets up a live connection (WebSocket) on the same
// address as our normal server, so both normal requests and live
// updates work from the one address.
const wsServer = new WebSocketServer({ server: httpServer, path: yoga.graphqlEndpoint });
useServer({ schema }, wsServer);

httpServer.listen(PORT, () => {
  console.log(`GraphQL server ready at http://localhost:${PORT}${yoga.graphqlEndpoint}`);
  console.log(`GraphQL subscriptions ready at ws://localhost:${PORT}${yoga.graphqlEndpoint}`);
});
