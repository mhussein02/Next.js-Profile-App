import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";

type NeonProfileRow = {
  id: number;
  name: string;
  title: string;
  bio: string | null;
  image_url: string | null;
};

type Profile = {
  id: number;
  name: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
};

function mapRow(row: NeonProfileRow): Profile {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    description: row.bio,
    imageUrl: row.image_url
  };
}

export async function GET() {
  const result = (await sql`
    SELECT id, name, title, bio, image_url
    FROM profiles
    ORDER BY id DESC
  `) as NeonProfileRow[];

  const data = result.map(mapRow);
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(req: Request) {
  let body: any;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const bio = typeof body.bio === "string" ? body.bio.trim() : "";
  const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";

  if (!name || !title) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const result = (await sql`
    INSERT INTO profiles (name, title, bio, image_url)
    VALUES (${name}, ${title}, ${bio}, ${imageUrl})
    RETURNING id, name, title, bio, image_url
  `) as NeonProfileRow[];

  const profile = mapRow(result[0]);
  return NextResponse.json({ data: profile }, { status: 201 });
}
