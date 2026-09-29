// Day 9 -- a simple grey placeholder shown while a list is still
// loading, instead of just showing the plain word "Loading...".
export function ListSkeleton({ rows = 3 }) {
  return (
    <ul aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} style={{ listStyle: "none", marginBottom: 6 }}>
          <span
            style={{
              display: "inline-block",
              height: "1em",
              width: `${70 - i * 10}%`,
              background: "linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%)",
              backgroundSize: "200% 100%",
              animation: "skeleton-loading 1.2s ease-in-out infinite",
              borderRadius: 4,
            }}
          />
        </li>
      ))}
      <style>{`
        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </ul>
  );
}
