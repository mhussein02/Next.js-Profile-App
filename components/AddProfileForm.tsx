"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddProfileForm.module.css";

type FormValues = {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
};

type Props = {
  mode?: "create" | "edit";
  profileId?: number;
  initialValues?: FormValues;
};

export default function AddProfileForm({
  mode = "create",
  profileId,
  initialValues
}: Props) {
  const [values, setValues] = useState<FormValues>(
    initialValues || {
      name: "",
      title: "",
      bio: "",
      imageUrl: ""
    }
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setPending(true);

    try {
      const endpoint =
        mode === "edit" && profileId != null
          ? `/api/neon-profiles/${profileId}`
          : "/api/neon-profiles";

      const method =
        mode === "edit" && profileId != null ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Request failed");
      } else {
        setSuccess(mode === "edit" ? "Profile updated" : "Profile added");
        if (mode === "create") {
          setValues({ name: "", title: "", bio: "", imageUrl: "" });
        }
        if (mode === "edit" && profileId != null) {
          router.push(`/profile/${profileId}`);
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch {
      setError("Request failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="bio">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={values.bio}
          onChange={handleChange}
          className={styles.textarea}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="imageUrl">
          Image URL
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <button
        type="submit"
        disabled={pending}
        className={styles.submit}
      >
        {pending
          ? "Saving..."
          : mode === "edit"
          ? "Save changes"
          : "Add profile"}
      </button>
    </form>
  );
}
