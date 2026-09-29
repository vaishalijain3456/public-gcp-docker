import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout.jsx'
import { ListSkeleton } from './components/Skeleton.jsx'

// Day 13 -- Each page loads only when you visit it, instead of loading
// all pages at once. This makes the app open faster. These pages use
// named exports, so we wrap them to look like default exports.
const HomePage = lazy(() => import('./pages/HomePage.jsx').then((m) => ({ default: m.HomePage })))
const CrudPage = lazy(() => import('./pages/CrudPage.jsx').then((m) => ({ default: m.CrudPage })))
const ExternalApiPage = lazy(() =>
  import('./pages/ExternalApiPage.jsx').then((m) => ({ default: m.ExternalApiPage }))
)

// Day 9 -- This sets up the app's pages and menu. The Home page ("/")
// shows the old content. CRUD ("/crud") and External API ("/external-api")
// are new pages added in Day 9.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<ListSkeleton />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/crud"
            element={
              <Suspense fallback={<ListSkeleton />}>
                <CrudPage />
              </Suspense>
            }
          />
          <Route
            path="/external-api"
            element={
              <Suspense fallback={<ListSkeleton />}>
                <ExternalApiPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
