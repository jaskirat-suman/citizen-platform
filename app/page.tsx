import Header from "./components/Header";
export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f7",
        padding: "32px",
      }}
    >
      <Header />
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          minHeight: "80vh",
          paddingTop: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            fontWeight: 600,
            marginBottom: "24px",
          }}
        >
          Citizen Platform
        </p>

        <h1
          style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            maxWidth: "900px",
            margin: "0 0 32px",
          }}
        >
          Make your community
          <br />
          impossible to ignore.
        </h1>

        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.5,
            color: "#555",
            maxWidth: "650px",
            marginBottom: "40px",
          }}
        >
          Report local problems, bring people together, and help
          communities get the attention they deserve.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <a
  href="/report"
  style={{
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    padding: "16px 28px",
    fontWeight: 600,
    textDecoration: "none",
  }}
>
  Report an Issue
</a>

          <a
  href="/issues"
  style={{
    background: "#fff",
    color: "#111",
    border: "1px solid #ddd",
    borderRadius: "999px",
    padding: "16px 28px",
    fontWeight: 600,
    textDecoration: "none",
  }}
>
  Explore Issues
</a>
        </div>
      </section>
      <section
  style={{
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "80px 0",
  }}
>
  <p
    style={{
      fontSize: "14px",
      fontWeight: 600,
      marginBottom: "16px",
    }}
  >
    HOW IT WORKS
  </p>

  <h2
    style={{
      fontSize: "clamp(40px, 6vw, 64px)",
      lineHeight: 1.05,
      letterSpacing: "-0.04em",
      margin: 0,
      maxWidth: "800px",
    }}
  >
    One place to report,
    <br />
    discuss, and support.
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "16px",
      marginTop: "48px",
    }}
  >
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: "24px",
        padding: "28px",
      }}
    >
      <strong>01 — Report</strong>
      <p style={{ color: "#666", lineHeight: 1.6 }}>
        Tell your community about a problem that needs attention.
      </p>
    </div>

    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: "24px",
        padding: "28px",
      }}
    >
      <strong>02 — Support</strong>
      <p style={{ color: "#666", lineHeight: 1.6 }}>
        Show that other people are affected by the same issue.
      </p>
    </div>

    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: "24px",
        padding: "28px",
      }}
    >
      <strong>03 — Discuss</strong>
      <p style={{ color: "#666", lineHeight: 1.6 }}>
        Share information and discuss possible solutions with your community.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}