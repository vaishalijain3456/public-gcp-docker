import { UsersList } from '../components/UsersList.jsx'
import { PostsList } from '../components/PostsList.jsx'
import { CreatePostForm } from '../components/CreatePostForm.jsx'
import { RealtimeFeed } from '../components/RealtimeFeed.jsx'
import { PaginatedPostsList } from '../components/PaginatedPostsList.jsx'
import { UserDetailToggle } from '../components/UserDetailToggle.jsx'

// Day 9 -- this page holds all the older demo content from Days 4, 6, 7,
// and 8. It didn't change -- it just moved here when Day 9 added proper
// pages and a menu (see App.jsx). This is the "/" (home) page.
export function HomePage() {
  return (
    <section id="graphql-demo" style={{ textAlign: 'left', maxWidth: 480, margin: '2rem auto' }}>
      <h2>Day 4 Mini Project — deployed to Firebase Hosting via Cloud Build CI/CD</h2>

      <h2>Day 6 — Apollo Client + GraphQL</h2>
      <h3>Users</h3>
      <UsersList />
      <h3>Posts</h3>
      <PostsList />
      <h3>Create Post</h3>
      <CreatePostForm />

      <h2>Day 7 — Real-time Feed (WebSocket Subscription)</h2>
      <RealtimeFeed />

      <h2>Day 8 — Pagination &amp; Directives</h2>
      <h3>Paginated Posts (useLazyQuery + cursor)</h3>
      <PaginatedPostsList />
      <h3>User Detail (conditional @include directive)</h3>
      <UserDetailToggle />
    </section>
  )
}
