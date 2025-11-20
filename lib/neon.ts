import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL || "");

export type NeonProfileRow = {
  id: number;
  name: string;
  title: string;
  bio: string | null;
  image_url: string | null;
};

export type Profile = {
  id: number;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
};

// NOTE: Accept `any` to avoid TypeScript errors when Neon types rows
export function mapRow(row: any): Profile {
  const r = row as { [key: string]: any };

  return {
    id: Number(r.id),
    name: String(r.name),
    title: String(r.title),
    bio: (r.bio ?? "") as string,
    imageUrl: (r.image_url ?? "") as string
  };
}
