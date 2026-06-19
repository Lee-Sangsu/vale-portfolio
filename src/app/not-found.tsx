import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          background: "#f4f1ea",
          color: "#161412",
          minHeight: "100dvh",
          margin: 0,
          display: "grid",
          placeItems: "center",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontSize: "0.75rem",
              opacity: 0.5,
              marginBottom: "1rem",
            }}
          >
            404
          </p>
          <h1
            style={{
              fontFamily: "ui-serif, Georgia, serif",
              fontSize: "clamp(2rem, 6vw, 4rem)",
              lineHeight: 1.05,
              margin: 0,
              marginBottom: "1.5rem",
            }}
          >
            Not in the archive.
          </h1>
          <Link href="/" style={{ color: "inherit" }}>
            ← Back home
          </Link>
        </div>
      </body>
    </html>
  );
}
