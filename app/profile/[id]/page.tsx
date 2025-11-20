import { notFound } from "next/navigation";
import { sql, mapRow } from "@/lib/neon";
import ProfileActions from "@/components/ProfileActions";

type Params = {
  params: {
    id: string;
  };
};

export const dynamic = "force-dynamic";

async function getProfileById(id: number) {
  const rows = await sql`
    SELECT id, name, title, bio, image_url
    FROM profiles
    WHERE id = ${id}
    LIMIT 1
  `;

  if (!rows.length) return null;
  return mapRow(rows[0]);
}

export async function generateMetadata({ params }: Params) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return { title: "Profile" };
  }

  const profile = await getProfileById(id);
  if (!profile) {
    return { title: "Profile" };
  }

  return {
    title: `${profile.name} | Profile`,
  };
}

export default async function ProfileDetailPage({ params }: Params) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const profile = await getProfileById(id);
  if (!profile) notFound();

  return (
    <main className="container">
      <div className="grid">
        <div className="card">
          {profile.imageUrl && (
            <img
              src={profile.imageUrl}
              alt={profile.name}
              className="profile-image"
            />
          )}
          <h1 className="name">{profile.name}</h1>
          <p className="title">{profile.title}</p>
          {profile.bio && <p className="desc">{profile.bio}</p>}
        </div>

        {/* Edit / Delete buttons component */}
        <ProfileActions id={profile.id} />
      </div>
    </main>
  );
}
