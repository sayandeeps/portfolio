import { notFound } from "next/navigation";
import { signIn, signOut } from "./actions";
import { hasSession, trackerPassword } from "./auth";
import TrackerBoard from "./TrackerBoard";
import { starterProjects, teesverseLaunchPlan } from "./backlog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Project tracker",
  robots: { index: false, follow: false },
};

export default function TrackerPage({ searchParams }) {
  const password = trackerPassword();
  if (!password) notFound();

  const authenticated = hasSession(password);

  return (
    <main id="main" className="mx-auto max-w-content px-6 py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-section font-semibold">Project tracker</h1>
        {authenticated && (
          <form action={signOut}>
            <button className="btn-ghost">Sign out</button>
          </form>
        )}
      </div>
      {authenticated ? (
        <TrackerBoard starterProjects={starterProjects} launchPlan={teesverseLaunchPlan} databaseEnabled={Boolean(process.env.DATABASE_URL)} />
      ) : (
        <form action={signIn} className="card mt-8 grid max-w-sm gap-4 p-6">
          <label className="grid gap-2">
            Password
            <input className="rounded-lg border bg-surface2 p-3" name="password"
              type="password" autoComplete="current-password" required maxLength={256} />
          </label>
          {searchParams.login === "failed" && <p role="alert">Incorrect password.</p>}
          <button className="btn-primary justify-center">Sign in</button>
        </form>
      )}
    </main>
  );
}
