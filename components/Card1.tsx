import Link from "next/link";

type CardProps = {
  id: number;
  name: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
};

export default function Card({ id, name, title, description, imageUrl }: CardProps) {
  return (
    <Link
      href={`/profile/${id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 16,
        border: "1px solid #333",
        padding: 16,
        textDecoration: "none",
        gap: 8
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 12 }}
        />
      )}
      <h2 style={{ fontSize: 20, fontWeight: 600 }}>{name}</h2>
      <p style={{ opacity: 0.8 }}>{title}</p>
      {description && (
        <p style={{ fontSize: 14, opacity: 0.8 }}>
          {description.length > 120 ? description.slice(0, 117) + "..." : description}
        </p>
      )}
    </Link>
  );
}
