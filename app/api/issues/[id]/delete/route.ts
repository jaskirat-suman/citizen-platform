import { db } from "../../../../lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const issueId = Number(id);

    if (!Number.isInteger(issueId)) {
      return Response.json(
        { success: false, error: "Invalid issue ID." },
        { status: 400 }
      );
    }

    const issueTable = db.sql.public.issues;

    const query = db.raw.sql`
      DELETE FROM "issues"
      WHERE "id" = ${issueId}
      RETURNING "id", "title"
    `
      .returnsRow({
        id: issueTable.columns.id,
        title: issueTable.columns.title,
      })
      .build();

    const [deletedIssue] = await db.runtime().query(query);

    if (!deletedIssue) {
      return Response.json(
        { success: false, error: "Issue not found." },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      issue: deletedIssue,
    });
  } catch (error) {
    console.error("Issue deletion failed:", error);

    return Response.json(
      {
        success: false,
        error: "Could not delete issue.",
      },
      { status: 500 }
    );
  }
}