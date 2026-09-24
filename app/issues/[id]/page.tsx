import Header from "../../components/Header";
import { db } from "../../lib/db";

type IssuePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function IssuePage({ params }: IssuePageProps) {
  const { id } = await params;

  const issueId = Number(id);

  const issues = await db.orm.public.Issue
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

  const issue = issues.find((item) => item.id === issueId);

  if (!issue) {
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
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <p style={{ fontSize: "14px", fontWeight: 600 }}>
            ISSUE NOT FOUND
          </p>

          <h1
            style={{
              fontSize: "clamp(48px, 7vw, 80px)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              margin: "20px 0",
            }}
          >
            We couldn't find
            <br />
            that issue.
          </h1>

          <a
            href="/issues"
            style={{
              display: "inline-block",
              background: "#111",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "999px",
              padding: "14px 22px",
              fontWeight: 600,
            }}
          >
            Explore Issues
          </a>
        </section>
      </main>
    );
  }

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
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <a
          href="/issues"
          style={{
            display: "inline-block",
            color: "#666",
            textDecoration: "none",
            fontSize: "14px",
            marginBottom: "32px",
          }}
        >
          ← Back to Explore
        </a>

        <div
          style={{
            fontSize: "13px",
            fontWeight: 600,
            marginBottom: "12px",
          }}
        >
          {issue.category.toUpperCase()}

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "#111",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 700,
              marginTop: "12px",
              marginLeft: "12px",
            }}
          >
            {issue.status}
          </div>
        </div>

        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 80px)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            margin: "0 0 24px",
          }}
        >
          {issue.title}
        </h1>

        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.6,
            color: "#555",
            maxWidth: "750px",
          }}
        >
          {issue.description}
        </p>

        <div
          style={{
            marginTop: "40px",
            padding: "24px",
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: "24px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            LOCATION
          </p>

          <p
            style={{
              margin: 0,
              color: "#555",
              lineHeight: 1.6,
            }}
          >
            {issue.locality}, {issue.city}, {issue.district},{" "}
            {issue.state}, {issue.country}
          </p>
        </div>

        <div
          style={{
            marginTop: "16px",
            padding: "24px",
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: "24px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            STATUS
          </p>

          <p
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {issue.status}
          </p>
        </div>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            padding: "24px",
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: "24px",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              COMMUNITY SUPPORT
            </p>

            <p
              style={{
                margin: "8px 0 0",
                color: "#555",
              }}
            >
              {issue.supporters} people support this issue
            </p>
          </div>

          <button
            type="button"
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "16px 28px",
              fontWeight: 600,
              fontSize: "15px",
              whiteSpace: "nowrap",
            }}
          >
            Support This Issue
          </button>
        </div>

        <section
          style={{
            marginTop: "64px",
            padding: "40px",
            background: "#111",
            color: "#fff",
            borderRadius: "28px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            COMMUNITY DISCUSSION
          </p>

          <h2
            style={{
              fontSize: "36px",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Join the conversation.
          </h2>

          <p
            style={{
              color: "#aaa",
              lineHeight: 1.6,
              marginTop: "16px",
            }}
          >
            Comments, updates, and community discussion will appear here.
          </p>
        </section>
      </section>
    </main>
  );
}
