import { db } from "../../../../lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const issueId = Number(id);

    if (!Number.isInteger(issueId)) {
      return Response.json(
        {
          success: false,
          error: "Invalid issue ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const name = String(body.name || "").trim();
    const content = String(body.content || "").trim();

    if (name.length > 80) {
  return Response.json(
    {
      success: false,
      error: "Name must be 80 characters or less.",
    },
    { status: 400 }
  );
}
    if (!name || !content) {
      return Response.json(
        {
          success: false,
          error: "Name and comment are required.",
        },
        { status: 400 }
      );
    }

  if (content.length < 2) {
  return Response.json(
    {
      success: false,
      error: "Comment must be at least 2 characters.",
    },
    { status: 400 }
  );
}

if (content.length > 2000) {
  return Response.json(
    {
      success: false,
      error: "Comment must be 2,000 characters or less.",
    },
    { status: 400 }
  );
}

const issues = await db.orm.public.Issue
      .select("id")
      .all();

    const issue = issues.find((item) => item.id === issueId);

    if (!issue) {
      return Response.json(
        {
          success: false,
          error: "Issue not found.",
        },
        { status: 404 }
      );
    }

    const commentsTable = db.sql.public.comments;

    const query = db.raw.sql`
      INSERT INTO "comments"
        ("issueId", "name", "content")
      VALUES
        (${issueId}, ${name}, ${content})
     RETURNING
  "id",
  "issueId",
  "name",
  "content"
    `
      .returnsRow({
        id: commentsTable.columns.id,
        issueId: commentsTable.columns.issueId,
        name: commentsTable.columns.name,
        content: commentsTable.columns.content,
      })
      .build();

    const [comment] = await db.runtime().query(query);

    return Response.json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error("Comment creation failed:", error);

    return Response.json(
      {
        success: false,
        error: "Could not create comment.",
      },
      { status: 500 }
    );
  }
}