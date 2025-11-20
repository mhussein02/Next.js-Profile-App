import { NextResponse } from "next/server";
import { sql, mapRow, NeonProfileRow, Profile } from "@/lib/neon";

type Params = { params: { id: string } };

async function getExisting(id: number): Promise<Profile | null> {
  const rows = await sql<NeonProfileRow>`
    SELECT id, name, title, bio, image_url
    FROM profiles
    WHERE id = ${id}
  `;
  if (!rows.length) return null;
  return mapRow(rows[0]);
}

export async function GET(_: Request, { params }: Params) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const profile = await getExisting(id);
  if (!profile) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ data: profile }, { status: 200 });
}

export async function DELETE(_: Request, { params }: Params) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const rows = await sql<NeonProfileRow>`
    DELETE FROM profiles
    WHERE id = ${id}
    RETURNING id, name, title, bio, image_url
  `;
  if (!rows.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const profile = mapRow(rows[0]);
  return NextResponse.json({ data: profile }, { status: 200 });
}

export async function PATCH(req: Request, { params }: Params) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const current = await getExisting(id);
  if (!current) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const name =
    typeof body.name === "string" && body.name.trim()
      ? body.name.trim()
      : current.name;

  const title =
    typeof body.title === "string" && body.title.trim()
      ? body.title.trim()
      : current.title;

  const bio =
    typeof body.bio === "string"
      ? body.bio
      : current.bio;

  const imageUrl =
    typeof body.imageUrl === "string"
      ? body.imageUrl
      : current.imageUrl;

  if (!name || !title) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const rows = await sql<NeonProfileRow>`
    UPDATE profiles
    SET name = ${name},
        title = ${title},
        bio = ${bio},
        image_url = ${imageUrl}
    WHERE id = ${id}
    RETURNING id, name, title, bio, image_url
  `;

  const updated = mapRow(rows[0]);
  return NextResponse.json({ data: updated }, { status: 200 });
}
