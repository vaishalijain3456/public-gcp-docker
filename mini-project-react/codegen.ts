import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // Day 8 -- this tool reads our GraphQL server's live setup and auto-
  // writes matching code for us, so we don't type it by hand. The server
  // must be running (`npm run dev` in ../graphql-server) for this to work.
  schema: "http://localhost:4000/graphql",
  documents: ["src/**/*.{js,jsx}"],
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
