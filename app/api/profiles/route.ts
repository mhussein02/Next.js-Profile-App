import { NextResponse } from "next/server";
import { profiles, Profile } from "../_data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const major = searchParams.get("major");
  const year = searchParams.get("year");
  const q = searchParams.get("q");
  let data = profiles.slice();
  if (major) data = data.filter(p => p.major.toLowerCase() === major.toLowerCase());
  if (year) {
    const y = Number(year);
    data = data.filter(p => p.year === y);
  }
  if (q) {
    const s = q.toLowerCase();
    data = data.filter(p => p.name.toLowerCase().includes(s));
  }
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(req: Request) {
  let body: Partial<Profile>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const major = typeof body.major === "string" ? body.major.trim() : "";
  const year = typeof body.year === "number" ? body.year : Number(body.year);
  const gpa = typeof body.gpa === "number" ? body.gpa : Number(body.gpa);
  if (!name || !major || !Number.isInteger(year) || year < 1 || year > 4 || Number.isNaN(gpa) || gpa < 0 || gpa > 4) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }
  const id = Date.now();
  const item: Profile = { id, name, major, year, gpa };
  profiles.unshift(item);
  return NextResponse.json({ data: item }, { status: 201 });
}
