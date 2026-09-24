import { db } from "../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

const issue = await db.orm.public.Issue
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
  .create({
      title: body.title,
      category: body.category,
      description: body.description,
      country: body.country || "India",
      state: body.state,
      district: body.district,
      city: body.city,
      locality: body.locality,
    });

    return Response.json({ success: true, issue });
  } catch (error) {
    console.error("Issue creation failed:", error);

    return Response.json(
      { success: false, error: "Could not create issue." },
      { status: 500 }
    );
  }
}