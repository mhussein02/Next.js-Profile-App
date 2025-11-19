export const metadata = {
  title: "About • Profile App"
};

export default function AboutPage() {
  return (
    <div className="container">
      <h1 className="h1">About This App</h1>
      <p style={{ maxWidth: 600, marginTop: 16 }}>
        This profile app is built with Next.js App Router and uses a Neon Postgres database
        to store and display user profiles. You can add new profiles from the Add Profile page,
        view them on the homepage, and open details for each profile.
      </p>
    </div>
  );
}
