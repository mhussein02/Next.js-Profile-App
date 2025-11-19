"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProfilePage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const res = await fetch("/api/neon-profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, title, bio, imageUrl })
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to add profile");
      return;
    }

    setSuccess("Profile added");
    setName("");
    setTitle("");
    setBio("");
    setImageUrl("");
    setTimeout(() => {
      router.push("/");
    }, 600);
  };

  return (
    <div className="container">
      <h1 className="h1">Add Profile</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420 }}
      >
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          required
          style={{
            padding: 8,
            borderRadius: 8,
            border: "1px solid #555",
            background: "transparent",
            color: "inherit"
          }}
        />
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={{
            padding: 8,
            borderRadius: 8,
            border: "1px solid #555",
            background: "transparent",
            color: "inherit"
          }}
        />
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          placeholder="Bio"
          rows={4}
          style={{
            padding: 8,
            borderRadius: 8,
            border: "1px solid #555",
            background: "transparent",
            color: "inherit"
          }}
        />
        <input
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="Image URL"
          style={{
            padding: 8,
            borderRadius: 8,
            border: "1px solid #555",
            background: "transparent",
            color: "inherit"
          }}
        />
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #777",
            background: "transparent",
            cursor: "pointer"
          }}
        >
          {submitting ? "Saving..." : "Add Profile"}
        </button>
        {error && <p className="error">{error}</p>}
        {success && <p className="info">{success}</p>}
      </form>
    </div>
  );
}
