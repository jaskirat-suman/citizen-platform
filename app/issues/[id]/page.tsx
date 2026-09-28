export const dynamic = "force-dynamic";
import Header from "../../components/Header";
import SupportButton from "../../components/SupportButton";
import { db } from "../../lib/db";
import CommentForm from "../../components/CommentForm";

type IssuePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function IssuePage({ params }: IssuePageProps) {
  const { id } = await params;

  const issueId = Number(id);
  const issueTable = db.sql.public.issues;

  const query = db.raw.sql`
    SELECT
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
    FROM "issues"
    WHERE "id" = ${issueId}
    LIMIT 1
  `
    .returnsRow({
      id: issueTable.columns.id,
      title: issueTable.columns.title,
      category: issueTable.columns.category,
      description: issueTable.columns.description,
      country: issueTable.columns.country,
      state: issueTable.columns.state,
      district: issueTable.columns.district,
      city: issueTable.columns.city,
      locality: issueTable.columns.locality,
      supporters: issueTable.columns.supporters,
      comments: issueTable.columns.comments,
      status: issueTable.columns.status,
    })
    .build();

  const [issue] = await db.runtime().query(query);
const commentsTable = db.sql.public.comments;

const commentsQuery = db.raw.sql`
  SELECT
    "id",
    "issueId",
    "name",
    "content"
  FROM "comments"
  WHERE "issueId" = ${issueId}
  ORDER BY "id" DESC
`
  .returnsRow({
    id: commentsTable.columns.id,
    issueId: commentsTable.columns.issueId,
    name: commentsTable.columns.name,
    content: commentsTable.columns.content,
  })
  .build();

const comments = await db.runtime().query(commentsQuery);
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
    gap: "7px",
    padding: "8px 14px",
    borderRadius: "999px",
    background:
      issue.status === "Resolved"
        ? "#e8f7ee"
        : issue.status === "In Progress"
          ? "#fff4d6"
          : issue.status === "Acknowledged"
            ? "#e8f0ff"
            : issue.status === "Under Review"
              ? "#f0eafa"
              : "#f1f1f1",
    color:
      issue.status === "Resolved"
        ? "#176b3a"
        : issue.status === "In Progress"
          ? "#8a5a00"
          : issue.status === "Acknowledged"
            ? "#2456a6"
            : issue.status === "Under Review"
              ? "#6941a5"
              : "#555",
    fontSize: "12px",
    fontWeight: 700,
    marginTop: "12px",
    marginLeft: "12px",
  }}
>
  <span
    style={{
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: "currentColor",
    }}
  />
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
            marginTop: "56px",
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
      <span
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
  }}
>
  <span
    aria-hidden="true"
    style={{
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#111",
      display: "inline-block",
    }}
  />
  LOCATION
</span>
          </p>
          <p
  style={{
    margin: "0 0 16px",
    color: "#888",
    fontSize: "14px",
    lineHeight: 1.5,
  }}
>
  This issue was reported in the following area.
</p>

        <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  }}
>
  {[
    issue.locality,
    issue.city,
    issue.district,
    issue.state,
    issue.country,
  ].map(
    (location, index) =>
      location && (
        <span
          key={`${location}-${index}`}
          style={{
            padding: "9px 14px",
            background: "#f5f5f7",
            borderRadius: "999px",
            color: "#444",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          {location}
        </span>
      )
  )}
</div>
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
alignItems: "flex-start",
justifyContent: "space-between",
gap: "16px",
flexWrap: "wrap",
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
    color: "#777",
    fontSize: "14px",
    lineHeight: 1.5,
    maxWidth: "360px",
  }}
>
  Show your support for this issue and help bring more attention to it.
</p>

           
          </div>

          <SupportButton
  issueId={issue.id}
  supporters={issue.supporters}
/>
        </div>

        <section
          style={{
            marginTop: "64px",
            padding: "clamp(24px, 5vw, 40px)",
            background: "#111",
            color: "#fff",
            borderRadius: "28px",
          }}
        >
<h2
            style={{
              fontSize: "clamp(30px, 5vw, 42px)",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Join the conversation.
          </h2>
          <p
  style={{
    margin: "8px 0 0",
    maxWidth: "620px",
    color: "#aaa",
    lineHeight: 1.6,
  }}
>
  Share an update, your experience, or useful information that could help the community understand this issue.
</p>
          <CommentForm issueId={issue.id} />
          <p
  style={{
    margin: "36px 0 12px",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#aaa",
  }}
>
  Comments
</p>
          <div
  style={{
    marginTop: "24px",
    display: "grid",
  gap: "16px",
  }}
>
  {comments.length === 0 ? (
 <div
  style={{
    padding: "24px",
    border: "1px dashed rgba(255,255,255,0.16)",
    borderRadius: "18px",
    color: "#aaa",
  }}
>
  <div
  style={{
    padding: "24px",
    border: "1px dashed rgba(255,255,255,0.16)",
    borderRadius: "18px",
    color: "#aaa",
  }}
>
  <p
    style={{
      margin: 0,
      fontSize: "15px",
      fontWeight: 600,
      color: "#ddd",
    }}
  >
    No comments yet.
  </p>

  <p
    style={{
      margin: "6px 0 0",
      lineHeight: 1.6,
    }}
  >
    Be the first person to share an update or perspective.
  </p>
</div>

  <p
    style={{
      margin: "6px 0 0",
      lineHeight: 1.6,
    }}
  >
    Be the first person to share an update or perspective.
  </p>
</div>
  ) : (
    comments.map((comment) => (
      <div
        key={comment.id}
       style={{
  padding: "22px",
  background: "rgba(255, 255, 255, 0.07)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "20px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
}}
      >
        <p
  style={{
    margin: "0 0 4px",
    fontSize: "15px",
    fontWeight: 700,
    letterSpacing: "-0.01em",
  }}
>
  {comment.name}
</p>

        <p
          style={{
            margin: "8px 0 0",
            color: "#ddd",
            lineHeight: 1.6,
          }}
        >
          {comment.content}
        </p>
      </div>
      
    ))
  )}
</div>


        
        </section>
      </section>
    </main>
  );
}
