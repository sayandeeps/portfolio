import "server-only";
import { neon } from "@neondatabase/serverless";

let schemaReady;

function connection() {
  if (!process.env.DATABASE_URL) throw new Error("Tracker database is unavailable");
  return neon(process.env.DATABASE_URL);
}

async function ensureSchema(sql) {
  if (!schemaReady) {
    schemaReady = sql.transaction([
      sql`SELECT pg_advisory_xact_lock(43819721)`,
      sql`CREATE TABLE IF NOT EXISTS portfolio_tracker_board (
        id integer PRIMARY KEY CHECK (id = 1),
        revision integer NOT NULL DEFAULT 1,
        entries jsonb NOT NULL CHECK (jsonb_typeof(entries) = 'array'),
        updated_at timestamptz NOT NULL DEFAULT now()
      )`,
    ]).catch((error) => {
      schemaReady = undefined;
      throw error;
    });
  }
  await schemaReady;
}

function serialize(entries) {
  if (!Array.isArray(entries)) throw new Error("Invalid tracker entries");
  const ids = new Set();
  for (const item of entries) {
    if (!item || typeof item.id !== "string" || typeof item.title !== "string" ||
        typeof item.status !== "string" || typeof item.category !== "string" ||
        ids.has(item.id) || (item.updates !== undefined && !Array.isArray(item.updates))) {
      throw new Error("Invalid tracker entries");
    }
    ids.add(item.id);
  }
  const json = JSON.stringify(entries);
  if (Buffer.byteLength(json) > 512_000) throw new Error("Tracker storage limit exceeded");
  return json;
}

export async function getBoard() {
  const sql = connection();
  await ensureSchema(sql);
  const [board] = await sql`SELECT entries, revision FROM portfolio_tracker_board WHERE id = 1`;
  return board ?? null;
}

export async function initializeBoard(entries) {
  const sql = connection();
  const json = serialize(entries);
  await ensureSchema(sql);
  const [board] = await sql`
    INSERT INTO portfolio_tracker_board (id, entries)
    VALUES (1, ${json}::jsonb)
    ON CONFLICT (id) DO NOTHING
    RETURNING entries, revision
  `;
  return { board: board ?? await getBoard(), created: Boolean(board) };
}

export async function saveBoard(entries, expectedRevision) {
  const sql = connection();
  if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1) {
    throw new Error("Invalid tracker revision");
  }
  const json = serialize(entries);
  await ensureSchema(sql);
  const [board] = await sql`
    UPDATE portfolio_tracker_board
    SET entries = ${json}::jsonb, revision = revision + 1, updated_at = now()
    WHERE id = 1 AND revision = ${expectedRevision}
    RETURNING revision
  `;
  return board ?? null;
}
