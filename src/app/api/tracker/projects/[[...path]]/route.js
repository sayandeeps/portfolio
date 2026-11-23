import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { getBoard, saveBoard } from "../../../../tracker/board-store";
import { categories, priorities, statuses } from "../../../../tracker/project-options";

export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store" };

function respond(data, status = 200) {
  return Response.json(data, { status, headers });
}

function fail(status, error) {
  return respond({ error }, status);
}

function authorized(request) {
  const authorization = request.headers.get("Authorization");
  const token = process.env.TRACKER_API_TOKEN;
  if (!token || token.length < 32 || !authorization || authorization.length > 512) return false;
  const digest = (value) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(authorization), digest(`Bearer ${token}`));
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function projectFields(body) {
  const { title, category, status = "Idea", priority = "Normal", dueDate = "", notes = "" } = body;
  if (typeof title !== "string" || !title.trim() || title.length > 120 ||
      !categories.includes(category) || !statuses.includes(status) || !priorities.includes(priority) ||
      typeof notes !== "string" || notes.length > 2000 ||
      typeof dueDate !== "string" || (dueDate && !validDate(dueDate))) return null;
  return { title: title.trim(), category, status, priority, dueDate, notes: notes.trim() };
}

async function handle(request, { params }) {
  if (!authorized(request)) return fail(401, "Tracker authentication required");

  const [id, collection, updateId, extra] = params.path ?? [];
  if (extra || (collection && collection !== "updates")) return fail(404, "Endpoint not found");
  const method = request.method;

  try {
    const board = await getBoard();
    if (!board) return fail(409, "Initialize the board in the tracker first");
    const { entries, revision } = board;
    const project = id ? entries.find((entry) => entry.id === id) : null;
    if (id && !project) return fail(404, "Project not found");
    const updates = project?.updates ?? [];
    const activity = updateId ? updates.find((entry) => entry.id === updateId) : null;
    if (updateId && !activity) return fail(404, "Update not found");

    if (method === "GET") {
      if (!id) return respond({ projects: entries, revision });
      if (!collection) return respond({ project, revision });
      return respond(activity ? { update: activity, revision } : { updates, revision });
    }

    const expected = request.headers.get("If-Match");
    if (expected !== null && expected !== `"${revision}"`) {
      return fail(409, "Board changed. Fetch the current revision and retry.");
    }

    let body = {};
    if (method !== "DELETE") {
      if (!request.headers.get("Content-Type")?.startsWith("application/json")) {
        return fail(415, "Use application/json");
      }
      const raw = await request.text();
      if (raw.length > 16000) return fail(413, "Request body too large");
      try {
        body = JSON.parse(raw);
      } catch {
        return fail(400, "Invalid JSON");
      }
      if (!body || typeof body !== "object" || Array.isArray(body)) return fail(400, "Expected an object");
    }

    let next;
    let result;
    if (!id && method === "POST") {
      const fields = projectFields(body);
      if (!fields) return fail(400, "Invalid project fields");
      const created = { id: randomUUID(), ...fields, updates: [] };
      next = [...entries, created];
      result = { project: created };
    } else if (id && !collection && method === "PUT") {
      const fields = projectFields(body);
      if (!fields) return fail(400, "Invalid project fields");
      const modified = { ...project, ...fields };
      next = entries.map((entry) => entry.id === id ? modified : entry);
      result = { project: modified };
    } else if (id && !collection && method === "DELETE") {
      next = entries.filter((entry) => entry.id !== id);
    } else if (collection && ((!updateId && method === "POST") || (updateId && ["PUT", "DELETE"].includes(method)))) {
      let updated;
      if (method === "DELETE") {
        updated = updates.filter((entry) => entry.id !== updateId);
      } else {
        const { message } = body;
        if (typeof message !== "string" || !message.trim() || message.length > 2000) {
          return fail(400, "Invalid update message");
        }
        const entry = activity
          ? { ...activity, message: message.trim() }
          : { id: randomUUID(), message: message.trim(), date: new Date().toISOString() };
        updated = activity ? updates.map((existing) => existing.id === updateId ? entry : existing) : [entry, ...updates];
        result = { update: entry };
      }
      next = entries.map((entry) => entry.id === id ? { ...project, updates: updated } : entry);
    } else {
      return fail(405, "Method not allowed");
    }

    const saved = await saveBoard(next, revision);
    if (!saved) return fail(409, "Board changed. Fetch the current revision and retry.");
    if (method === "DELETE") return new Response(null, { status: 204, headers });
    return respond({ ...result, revision: saved.revision }, method === "POST" ? 201 : 200);
  } catch {
    return fail(503, "Tracker storage is unavailable");
  }
}

export { handle as GET, handle as POST, handle as PUT, handle as DELETE };
