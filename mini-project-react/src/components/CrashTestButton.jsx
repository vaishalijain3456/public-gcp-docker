import { useState } from "react";

// Day 9 -- this button breaks the page on purpose, just to prove our
// "Something went wrong" safety net (ErrorBoundary.jsx) really works.
// Clicking it doesn't crash right away -- it crashes on the next
// re-draw of the page, which is the kind of crash the safety net catches.
function Bomb() {
  throw new Error("Deliberate test error from CrashTestButton");
}

export function CrashTestButton() {
  const [armed, setArmed] = useState(false);
  if (armed) return <Bomb />;
  return (
    <button type="button" onClick={() => setArmed(true)}>
      Crash this page (test ErrorBoundary)
    </button>
  );
}
