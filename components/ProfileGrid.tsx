import Card from "./Card";

type Profile = {
  id: number;
  name: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
};

type Props = {
  profiles: Profile[];
};

export default function ProfileGrid({ profiles }: Props) {
  if (!profiles.length) {
    return <p className="info">No profiles found.</p>;
  }

  return (
    <div
      style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20
      }}
    >
      {profiles.map(profile => (
        <Card key={profile.id} {...profile} />
      ))}
    </div>
  );
}
