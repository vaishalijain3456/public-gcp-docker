import { Link, Outlet } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary.jsx";

// Day 9 -- this is the menu bar shown on every page, plus the safety net
// (ErrorBoundary) around the page content, so a bug in one page doesn't
// break the whole app.
export function Layout() {
  return (
    <>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #ddd" }}>
        <Link to="/">Home</Link>
        <Link to="/crud">CRUD</Link>
        <Link to="/external-api">External API</Link>
      </nav>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  );
}
