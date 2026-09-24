import Header from "../../components/Header";
import { db } from "../../lib/db";
import IssueCard from "../../components/IssueCard";

export default async function WaterSanitationPage() {
  const waterIssues = await db.orm.public.Issue
    .select(
      "id",
      "title",
      "category",
      "description",
      "country",
      "state",
      "district",
      "city",
      "locality",
      "supporters",
      "comments",
      "status"
    )
    .all();

  const filteredIssues = waterIssues.filter(
    (issue) => issue.category === "Water & Sanitation"
  );

  const issueCardData = filteredIssues.map((issue) => ({
    id: String(issue.id),
    title: issue.title,
    category: issue.category,
    description: issue.description,
    country: issue.country,
    state: issue.state,
    district: issue.district,
    city: issue.city,
    locality: issue.locality,
    supporters: issue.supporters,
    comments: issue.comments,
    status: issue.status as
      | "Reported"
      | "Under Review"
      | "Acknowledged"
      | "In Progress"
      | "Resolved",
  }));

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f7",
        padding: "140px 32px 80px",
      }}
    >
      <Header />

      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            fontWeight: 600,
            marginBottom: "20px",
          }}
        >
          WATER & SANITATION
        </p>

        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 80px)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            margin: "0 0 24px",
          }}
        >
          Water and
          <br />
          sanitation matter.
        </h1>

        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.5,
            color: "#555",
            maxWidth: "700px",
          }}
        >
          Explore community-reported problems involving
          drinking water, drainage, sewage, and waste.
        </p>

        <div
          style={{
            display: "grid",
            gap: "20px",
            marginTop: "64px",
          }}
        >
          {issueCardData.length === 0 ? (
            <div
              style={{
                background: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "28px",
                padding: "32px",
              }}
            >
              <h2 style={{ marginTop: 0 }}>
                No water or sanitation issues yet.
              </h2>

              <p style={{ color: "#666", lineHeight: 1.6 }}>
                Be the first person to report a water or
                sanitation problem in your community.
              </p>

              <a
                href="/report"
                style={{
                  display: "inline-block",
                  marginTop: "12px",
                  background: "#111",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "999px",
                  padding: "14px 22px",
                  fontWeight: 600,
                }}
              >
                Report an Issue
              </a>
            </div>
          ) : (
            issueCardData.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
