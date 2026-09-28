import Header from "../../components/Header";
import IssueCard from "../../components/IssueCard";
import { db } from "../../lib/db";

export default async function EducationPage() {
  const allIssues = await db.orm.public.Issue
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

  const issues = allIssues.filter(
    (issue) => issue.category === "Education"
  );

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
          EDUCATION
        </p>

        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 80px)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            margin: "0 0 24px",
          }}
        >
          Education
          <br />
          matters.
        </h1>

        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.5,
            color: "#555",
            maxWidth: "650px",
          }}
        >
          Report problems affecting schools, educational
          facilities, learning environments, and access to
          education in your community.
        </p>

        <section style={{ marginTop: "64px" }}>
          {issues.length === 0 ? (
            <div
              style={{
                background: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "28px",
                padding: "40px",
              }}
            >
              <h2 style={{ marginTop: 0 }}>
                No education issues yet.
              </h2>

              <p
                style={{
                  color: "#666",
                  lineHeight: 1.6,
                }}
              >
                Be the first person to report an education
                problem in your community.
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
            <div
              style={{
                display: "grid",
                gap: "20px",
              }}
            >
              {issues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={{
                    ...issue,
                    status: issue.status as
                      | "Reported"
                      | "Under Review"
                      | "Acknowledged"
                      | "In Progress"
                      | "Resolved",
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}