import { sql } from "@/lib/neon";
import { notFound } from "next/navigation";

type ProfileRow = {
  id: number;
  name: string;
  title: string;
  bio: string | null;
  image_url: string | null;
};

type Props = {
  params: { id: string };
};

async function getProfile(id: number): Promise<ProfileRow | null> {
  const rows = await sql<ProfileRow[]>`
    SELECT id, name, title, bio, image_url
    FROM profiles
    WHERE id = ${id}
  `;
  if (!rows.length) return null;
  return rows[0];
}

export async function generateMetadata({ params }: Props) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return { title: "Profile not found" };
  }
  const profile = await getProfile(id);
  if (!profile) {
    return { title: "Profile not found" };
  }
  return {
    title: `${profile.name} • Profile`
  };
}

export default async function ProfileDetailPage({ params }: Props) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    notFound();
  }

  const profile = await getProfile(id);
  if (!profile) {
    notFound();
  }

  return (
    <div className="container">
      <h1 className="h1">{profile.name}</h1>
      <p className="title">{profile.title}</p>
      <div style={{ marginTop: 16, display: "flex", gap: 24 }}>
        {profile.image_url && (
          <img
            src={profile.image_url}
            alt={profile.name}
            style={{ maxWidth: 240, borderRadius: 16, objectFit: "cover" }}
          />
        )}
        <p style={{ maxWidth: 480 }}>
          {profile.bio || "No bio provided yet for this profile."}
        </p>
      </div>
    </div>
  );
}
