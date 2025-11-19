import { NextResponse } from "next/server";
import { profiles, findIndexById, Profile } from "../../_data";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const item = profiles.find(p => p.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: item }, { status: 200 });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const idx = findIndexById(id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const [removed] = profiles.splice(idx, 1);
  return NextResponse.json({ data: removed }, { status: 200 });
}

export async function PUT(req: Request, ctx: { params: { id: string } }) {
  return update(req, ctx);
}

export async function PATCH(req: Request, ctx: { params: { id: string } }) {
  return update(req, ctx);
}

async function update(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const idx = findIndexById(id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  let body: Partial<Profile>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const current = profiles[idx];
  const next: Profile = {
    id: current.id,
    name: typeof body.name === "string" && body.name.trim() ? body.name.trim() : current.name,
    major: typeof body.major === "string" && body.major.trim() ? body.major.trim() : current.major,
    year: body.year !== undefined ? Number(body.year) : current.year,
    gpa: body.gpa !== undefined ? Number(body.gpa) : current.gpa
  };
  if (!next.name || !next.major || !Number.isInteger(next.year) || next.year < 1 || next.year > 4 || Number.isNaN(next.gpa) || next.gpa < 0 || next.gpa > 4) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }
  profiles[idx] = next;
  return NextResponse.json({ data: next }, { status: 200 });
}
