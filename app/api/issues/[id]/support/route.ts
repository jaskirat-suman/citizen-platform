import { db } from "../../../../lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("SUPPORT API CALLED");
  try {
    const { id } = await params;
    const issueId = Number(id);

    if (!Number.isInteger(issueId)) {
      return Response.json(
        { success: false, error: "Invalid issue ID." },
        { status: 400 }
      );
    }

    const issues = await db.orm.public.Issue
      .select(
        "id",
        "title",
        "supporters"
      )
      .all();

    const issue = issues.find((item) => item.id === issueId);

    if (!issue) {
      return Response.json(
        { success: false, error: "Issue not found." },
        { status: 404 }
      );
    }
const issueTable = db.sql.public.issues;

const query = db.raw.sql`
  UPDATE "issues"
  SET "supporters" = "supporters" + 1
  WHERE "id" = ${issueId}
  RETURNING "id", "title", "supporters"
`
  .returnsRow({
    id: issueTable.columns.id,
    title: issueTable.columns.title,
    supporters: issueTable.columns.supporters,
  })
  .build();

const [updatedIssue] = await db.runtime().query(query);
console.log("SUPPORT UPDATED:", updatedIssue);

    return Response.json({
      success: true,
      issue: updatedIssue,
    });
  } catch (error) {
    console.error("Support update failed:", error);

    return Response.json(
      {
        success: false,
        error: "Could not support this issue.",
      },
      { status: 500 }
    );
  }
}
