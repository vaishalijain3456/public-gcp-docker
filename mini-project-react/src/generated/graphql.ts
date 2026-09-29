/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: unknown; output: unknown; }
};

export type CreatePostInput = {
  authorId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['ID']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges: Array<PostEdge>;
  pageInfo: PageInfo;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['ID']['output'];
  node: Post;
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts: Array<Post>;
  postsFeed: PostConnection;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostsFeedArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  postCreated: Post;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  posts: Array<Post>;
};

export type CreatePostInput = {
  authorId: string | number;
  content: string;
  title: string;
};

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { createPost: { id: string, title: string, content: string, published: boolean, author: { id: string, name: string, email: string } } };

export type GetPostsFeedQueryVariables = Exact<{
  first: number;
  after?: string | number | null | undefined;
}>;


export type GetPostsFeedQuery = { postsFeed: { edges: Array<{ cursor: string, node: { id: string, title: string, content: string, published: boolean, author: { id: string, name: string, email: string } } }>, pageInfo: { hasNextPage: boolean, endCursor: string | null } } };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { posts: Array<{ id: string, title: string, content: string, published: boolean, author: { id: string, name: string, email: string } }> };

export type OnPostCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnPostCreatedSubscription = { postCreated: { id: string, title: string, content: string, published: boolean, author: { id: string, name: string, email: string } } };

export type GetUserDetailQueryVariables = Exact<{
  id: string | number;
  withDetails: boolean;
}>;


export type GetUserDetailQuery = { user: { id: string, name: string, email?: string, posts?: Array<{ id: string, title: string }> } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { users: Array<{ id: string, name: string, email: string, posts: Array<{ id: string, title: string }> }> };

export type UserProfileFieldsFragment = { id: string, name: string, email: string };

export type PostCardFieldsFragment = { id: string, title: string, content: string, published: boolean, author: { id: string, name: string, email: string } };

export const UserProfileFieldsFragmentDoc = gql`
    fragment UserProfileFields on User {
  id
  name
  email
}
    `;
export const PostCardFieldsFragmentDoc = gql`
    fragment PostCardFields on Post {
  id
  title
  content
  published
  author {
    ...UserProfileFields
  }
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    ...PostCardFields
  }
}
    ${PostCardFieldsFragmentDoc}
${UserProfileFieldsFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const GetPostsFeedDocument = gql`
    query GetPostsFeed($first: Int!, $after: ID) {
  postsFeed(first: $first, after: $after) {
    edges {
      cursor
      node {
        ...PostCardFields
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${PostCardFieldsFragmentDoc}
${UserProfileFieldsFragmentDoc}`;

/**
 * __useGetPostsFeedQuery__
 *
 * To run a query within a React component, call `useGetPostsFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsFeedQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetPostsFeedQuery(baseOptions: Apollo.QueryHookOptions<GetPostsFeedQuery, GetPostsFeedQueryVariables> & ({ variables: GetPostsFeedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsFeedQuery, GetPostsFeedQueryVariables>(GetPostsFeedDocument, options);
      }
export function useGetPostsFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsFeedQuery, GetPostsFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsFeedQuery, GetPostsFeedQueryVariables>(GetPostsFeedDocument, options);
        }
// @ts-ignore
export function useGetPostsFeedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostsFeedQuery, GetPostsFeedQueryVariables>): Apollo.UseSuspenseQueryResult<GetPostsFeedQuery, GetPostsFeedQueryVariables>;
export function useGetPostsFeedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsFeedQuery, GetPostsFeedQueryVariables>): Apollo.UseSuspenseQueryResult<GetPostsFeedQuery | undefined, GetPostsFeedQueryVariables>;
export function useGetPostsFeedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsFeedQuery, GetPostsFeedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsFeedQuery, GetPostsFeedQueryVariables>(GetPostsFeedDocument, options);
        }
export type GetPostsFeedQueryHookResult = ReturnType<typeof useGetPostsFeedQuery>;
export type GetPostsFeedLazyQueryHookResult = ReturnType<typeof useGetPostsFeedLazyQuery>;
export type GetPostsFeedSuspenseQueryHookResult = ReturnType<typeof useGetPostsFeedSuspenseQuery>;
export type GetPostsFeedQueryResult = Apollo.QueryResult<GetPostsFeedQuery, GetPostsFeedQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts {
  posts {
    ...PostCardFields
  }
}
    ${PostCardFieldsFragmentDoc}
${UserProfileFieldsFragmentDoc}`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
// @ts-ignore
export function useGetPostsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>): Apollo.UseSuspenseQueryResult<GetPostsQuery, GetPostsQueryVariables>;
export function useGetPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>): Apollo.UseSuspenseQueryResult<GetPostsQuery | undefined, GetPostsQueryVariables>;
export function useGetPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const OnPostCreatedDocument = gql`
    subscription OnPostCreated {
  postCreated {
    ...PostCardFields
  }
}
    ${PostCardFieldsFragmentDoc}
${UserProfileFieldsFragmentDoc}`;

/**
 * __useOnPostCreatedSubscription__
 *
 * To run a query within a React component, call `useOnPostCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnPostCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnPostCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnPostCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnPostCreatedSubscription, OnPostCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnPostCreatedSubscription, OnPostCreatedSubscriptionVariables>(OnPostCreatedDocument, options);
      }
export type OnPostCreatedSubscriptionHookResult = ReturnType<typeof useOnPostCreatedSubscription>;
export type OnPostCreatedSubscriptionResult = Apollo.SubscriptionResult<OnPostCreatedSubscription>;
export const GetUserDetailDocument = gql`
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

/**
 * __useGetUserDetailQuery__
 *
 * To run a query within a React component, call `useGetUserDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *      withDetails: // value for 'withDetails'
 *   },
 * });
 */
export function useGetUserDetailQuery(baseOptions: Apollo.QueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables> & ({ variables: GetUserDetailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
      }
export function useGetUserDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
        }
// @ts-ignore
export function useGetUserDetailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>): Apollo.UseSuspenseQueryResult<GetUserDetailQuery, GetUserDetailQueryVariables>;
export function useGetUserDetailSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>): Apollo.UseSuspenseQueryResult<GetUserDetailQuery | undefined, GetUserDetailQueryVariables>;
export function useGetUserDetailSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
        }
export type GetUserDetailQueryHookResult = ReturnType<typeof useGetUserDetailQuery>;
export type GetUserDetailLazyQueryHookResult = ReturnType<typeof useGetUserDetailLazyQuery>;
export type GetUserDetailSuspenseQueryHookResult = ReturnType<typeof useGetUserDetailSuspenseQuery>;
export type GetUserDetailQueryResult = Apollo.QueryResult<GetUserDetailQuery, GetUserDetailQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    ...UserProfileFields
    posts {
      id
      title
    }
  }
}
    ${UserProfileFieldsFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
// @ts-ignore
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>): Apollo.UseSuspenseQueryResult<GetUsersQuery, GetUsersQueryVariables>;
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>): Apollo.UseSuspenseQueryResult<GetUsersQuery | undefined, GetUsersQueryVariables>;
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;