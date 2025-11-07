"use client";

type P = { error: Error; reset: () => void };

export default function Error({ error, reset }: P) {
  return (
    <div className="container">
      <h1 className="h1">Something went wrong</h1>
      <p className="error">{error?.message || "Error"}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
