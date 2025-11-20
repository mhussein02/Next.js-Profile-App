"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: number;
};

export default function ProfileActions({ id }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    const ok = window.confirm("Delete this profile?");
    if (!ok) return;

    setPending(true);
    setError(null);

    try {
      const res = await fetch(`/api/neon-profiles/${id}`, {
        method: "DELETE"
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setError(json?.error || "Delete failed");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Delete failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="profile-actions">
      <Link href={`/profile/${id}/edit`} className="btn">
        Edit
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={pending}
        className="btn danger"
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
