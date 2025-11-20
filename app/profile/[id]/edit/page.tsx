import { notFound } from "next/navigation";
import AddProfileForm from "@/components/AddProfileForm";
import { sql, mapRow } from "@/lib/neon";

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

export default async function EditProfilePage({ params }: Params) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const profile = await getProfileById(id);
  if (!profile) notFound();

  return (
    <main className="container">
      <h1>Edit profile</h1>
      <AddProfileForm
        mode="edit"
        profileId={profile.id}
        initialValues={{
          name: profile.name,
          title: profile.title,
          bio: profile.bio,
          imageUrl: profile.imageUrl,
        }}
      />
    </main>
  );
}
