# Portfolio and tracker handoff

Repository: [sayandeeps/portfolio](https://github.com/sayandeeps/portfolio), branch `main`.
Production: [portfolio](https://sayandeep.vercel.app), [private tracker](https://sayandeep.vercel.app/tracker).
Hosting: Vercel project `sayandeeps-projects/portfolio`, Node.js 22, connected to GitHub `main`.

## Product decisions

- The public portfolio presents Sayandeep's 5G Core test automation work at Telaverge and his transition toward data engineering with Python and SQL. The homepage has a black-and-green palette and a layered, interactive hero portrait.
- The private tracker is a single-owner board. It supports projects, ideas, descriptions, categories, statuses, priorities, due dates, and dated progress updates. Starter records are delivered only after authentication.
- Keep the current password login. `TRACKER_PASSWORD` is a server-only Vercel Production secret and must be at least 20 characters. The protected route returns 404 if the secret is absent or too short. Never put credentials in Git or any `NEXT_PUBLIC_*` variable.
- A deployment without `DATABASE_URL` uses the original AES-GCM-encrypted browser storage. Its local key is `portfolio-tracker-encrypted-v1`. The tracker password derives the old encryption key, so password rotation before migration can make that copy unreadable.
- With `DATABASE_URL`, the server stores the board in Neon Postgres. For this single-owner board, the implementation uses one checked JSONB row in `portfolio_tracker_board`, instead of separate project and update tables. It preserves the existing board shape and saves projects and their updates atomically. The server checks the signed tracker session on every database action. The Postgres row contains readable project data for database administrators.
- Writes include the last loaded revision. If another device saves first, the stale write is rejected and the UI asks the user to reload. Import uses a single insert with conflict protection. The browser copy remains untouched.

## Persistent storage setup

Production resource: `portfolio-tracker` on Neon Free, in Washington, D.C. (`iad1`). Vercel connected it to the portfolio Production environment and created the sensitive `DATABASE_URL` variable.

1. In Vercel's Storage or Marketplace, provision or connect a Neon Postgres database to the existing `portfolio` project. Select **Production** for the connection. Review the provider plan and permissions before provisioning.
2. Verify the connection created a server-side `DATABASE_URL` under Production. Use a dedicated database or branch for this tracker. The connection role needs permission to create the tracker table on first use. The application creates it under a transaction-scoped advisory lock.
3. Redeploy `main`. Environment changes apply to newly created deployments.
4. On the browser containing the existing tracker entries, sign in and choose **Import this browser’s board**. Project IDs and update timestamps carry over. If no browser has existing work, **Start with default projects** creates the board.
5. Verify the entry and update counts, then sign in on another browser and confirm a harmless edit is visible after a reload. Keep the original browser copy until verification is done.

The first import creates the single shared board. Other browsers then load the database copy. Existing independent browser boards are not merged automatically. If the wrong browser initializes the board, stop and preserve both copies before attempting a manual merge. After migration, changing the tracker password does not affect the data saved in Postgres.

## Verification and recovery

- Use `npm run build` before pushing.
- With no database URL, verify sign-in and the encrypted browser copy still load. With a database URL, verify unauthorized actions fail, the first setup works, a repeated initialization creates no duplicate, and a stale revision cannot overwrite newer data.
- Verify the Vercel deployment is Ready and Current before testing the production domain.
- A database failure surfaces an error in database mode and never switches silently to local writes. Removing the Production `DATABASE_URL` and redeploying restores the previous browser-storage route. Postgres edits remain in the database and will not appear in the old browser snapshot.
- For future recovery, use the database provider's backup or restore capabilities. The current app does not implement an export or a merge UI.

## Change log

| Commit or stage | Change |
| --- | --- |
| `74349ea` | Redesigned the portfolio around 5G Core engineering, added the restored portrait, and replaced the placeholder CV with a contact link. |
| Vercel setup | Connected GitHub `main` to the existing portfolio project, moved its runtime from Node.js 18 to 22, and deployed to the existing production domain. |
| `c0747f4` | Added password login and encrypted browser storage to the tracker. Removed unavailable links from the public portfolio. |
| GitHub cleanup | Made 59 repositories private as a backlog. At verification, 11 public repositories remained, including 8 forks. No repositories were deleted. |
| `c055abf` | Added nine authenticated starter projects across GitHub cleanup, data engineering, applied AI, and personal interests. |
| `9c124b1` | Added editing, priorities, due dates, a blocked status, status filtering, and timestamped progress notes. Updated the black-and-green theme and data engineering career copy. |
| Postgres persistence | Added database mode, a one-time browser import, revision-checked writes, and this handoff. Database mode activates after the environment variable is connected and deployed. |
| Project details dialog | Compact public project cards open the stack, features, and available links in a native dialog on the same page. |
| Tracker project dialog | The private board opens projects in a modal with editing, status, priority, due date, and activity. |

## Production migration record

- Vercel deployed code commit `be2c50d` to Production as deployment `CkpHTfCLEbT9nXNsBZorDfnEbbcw`.
- The original signed-in browser offered its encrypted board for import. The import succeeded with nine projects. A fresh page load showed the database-backed board with all nine projects and no setup prompt.
- The source browser copy was retained. A separate-device sign-in and a concurrent-write exercise have not yet been tested in Production.
