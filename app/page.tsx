import { sql } from "@/lib/neon";
import FetchedSection from "@/components/FetchedSection";

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

export const metadata = {
  title: "Profile App"
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

async function getProfiles(): Promise<Profile[]> {
  const result = (await sql`
    SELECT id, name, title, bio, image_url
    FROM profiles
    ORDER BY id DESC
  `) as NeonProfileRow[];

  return result.map(mapRow);
}

export default async function Page() {
  const profiles = await getProfiles();

  return (
    <div className="container">
      <h1 className="h1">Profiles</h1>
      <FetchedSection data={profiles} />
    </div>
  );
}
