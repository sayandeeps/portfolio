"use client";

import { useEffect, useRef, useState } from "react";
import { decryptEntries, encryptEntries } from "./actions";
import { getBoard, initializeBoard, saveBoard } from "./database";

const storageKey = "portfolio-tracker-encrypted-v1";
const statuses = ["Idea", "In progress", "Blocked", "Ready", "Published"];
const categories = ["GitHub cleanup", "Data engineering", "Applied AI", "Fun", "Personal"];
const priorities = ["Low", "Normal", "High"];
const field = "w-full rounded-lg border bg-surface2 px-3 py-2 text-content";

function ProjectFields({ item }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          Project or idea
          <input name="title" className={field} defaultValue={item?.title} required maxLength={120} />
        </label>
        <label className="grid gap-2">
          Category
          <select name="category" className={field} defaultValue={item?.category}>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <label className="grid gap-2">
          Priority
          <select name="priority" className={field} defaultValue={item?.priority ?? "Normal"}>
            {priorities.map((priority) => <option key={priority}>{priority}</option>)}
          </select>
        </label>
        <label className="grid gap-2">
          Due date
          <input name="dueDate" type="date" className={field} defaultValue={item?.dueDate} />
        </label>
      </div>
      <label className="grid gap-2">
        Notes
        <textarea name="notes" className={field} rows={3} maxLength={2000} defaultValue={item?.notes} />
      </label>
    </>
  );
}

function projectFields(form) {
  const data = new FormData(form);
  return {
    title: data.get("title").trim(),
    category: data.get("category"),
    priority: data.get("priority"),
    dueDate: data.get("dueDate"),
    notes: data.get("notes").trim(),
  };
}

function ProjectCard({ item, saving, update, remove }) {
  const [editing, setEditing] = useState(false);
  const [showUpdates, setShowUpdates] = useState(false);
  const updates = item.updates ?? [];

  async function edit(event) {
    event.preventDefault();
    const fields = projectFields(event.currentTarget);
    if (fields.title && await update(item.id, fields)) setEditing(false);
  }

  async function addUpdate(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const message = new FormData(form).get("message").trim();
    if (!message) return;
    const entry = { id: crypto.randomUUID(), message, date: new Date().toISOString() };
    if (await update(item.id, { updates: [entry, ...updates] })) form.reset();
  }

  return (
    <li className="card min-w-0 self-start p-5">
      {editing ? (
        <form onSubmit={edit} className="grid gap-4">
          <ProjectFields item={item} />
          <div className="flex flex-wrap gap-2">
            <button disabled={saving} className="btn-primary">Save changes</button>
            <button type="button" className="btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <p className="text-sm text-ember">{item.category}</p>
          <h2 className="mt-2 break-words text-lg font-semibold">{item.title}</h2>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-content-muted">
            <span>{item.priority ?? "Normal"} priority</span>
            {item.dueDate && <span>Due <time dateTime={item.dueDate}>{item.dueDate}</time></span>}
          </div>
          {item.notes && <p className="mt-3 whitespace-pre-wrap break-words text-content-muted">{item.notes}</p>}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <select
              aria-label={`Status for ${item.title}`}
              className={`${field} !w-auto`}
              disabled={saving}
              value={item.status}
              onChange={(event) => update(item.id, { status: event.target.value })}
            >
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
            <button className="btn-ghost" type="button" onClick={() => setEditing(true)}>Edit</button>
            <button
              className="btn-ghost"
              type="button"
              disabled={saving}
              onClick={() => {
                if (window.confirm(`Remove “${item.title}” and its updates?`)) remove(item.id);
              }}
            >
              Remove
            </button>
          </div>
        </>
      )}

      <div className="mt-5 border-t pt-4">
        <button
          type="button"
          aria-expanded={showUpdates}
          className="text-sm font-semibold text-ember"
          onClick={() => setShowUpdates(!showUpdates)}
        >
          {showUpdates ? "Hide progress updates" : `Progress updates (${updates.length})`}
        </button>
        {showUpdates && (
          <>
            <form onSubmit={addUpdate} className="mt-4 grid gap-2">
              <label className="grid gap-2">
                Progress update
                <textarea name="message" className={field} rows={2} required maxLength={2000} />
              </label>
              <button disabled={saving} className="btn-primary justify-self-start">Post update</button>
            </form>
            <ol className="mt-4 space-y-4">
              {updates.map((entry) => (
                <li className="border-l pl-3" key={entry.id}>
                  <time className="text-xs text-content-faint" dateTime={entry.date}>
                    {new Date(entry.date).toLocaleString()}
                  </time>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm text-content">{entry.message}</p>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </li>
  );
}

export default function TrackerBoard({ starterProjects, databaseEnabled }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [setup, setSetup] = useState(null);
  const loadedCiphertext = useRef(null);
  const revision = useRef(null);
  const writePending = useRef(false);

  useEffect(() => {
    async function load() {
      try {
        if (databaseEnabled) {
          const board = await getBoard();
          if (board) {
            revision.current = board.revision;
            setItems(board.entries);
          } else {
            const browserCopy = localStorage.getItem(storageKey);
            setSetup({ browserCopy });
          }
          return;
        }

        let encoded = localStorage.getItem(storageKey);
        if (encoded === null) {
          const initial = await encryptEntries(starterProjects);
          encoded = localStorage.getItem(storageKey);
          if (encoded === null) {
            encoded = initial;
            localStorage.setItem(storageKey, encoded);
          }
        }
        const stored = await decryptEntries(encoded);
        if (!Array.isArray(stored)) throw new Error("Invalid tracker data");
        loadedCiphertext.current = encoded;
        setItems(stored);
      } catch {
        setError("Could not open the tracker entries. Sign in again and retry.");
      }
    }
    load();
  }, [databaseEnabled, starterProjects]);

  async function save(next) {
    if (writePending.current) return false;
    writePending.current = true;
    setSaving(true);
    try {
      if (databaseEnabled) {
        const result = await saveBoard(next, revision.current);
        if (!result) {
          setError("The board changed on another device. Refresh before trying again.");
          return false;
        }
        revision.current = result.revision;
        setItems(next);
        setError("");
        return true;
      }

      const encoded = await encryptEntries(next);
      if (localStorage.getItem(storageKey) !== loadedCiphertext.current) {
        setError("Tracker entries changed in another tab. Refresh before trying again.");
        return false;
      }
      localStorage.setItem(storageKey, encoded);
      loadedCiphertext.current = encoded;
      setItems(next);
      setError("");
      return true;
    } catch {
      setError("Could not save your changes. Check that you are still signed in and try again.");
      return false;
    } finally {
      writePending.current = false;
      setSaving(false);
    }
  }

  async function setupBoard(browserCopy) {
    if (writePending.current) return;
    writePending.current = true;
    setSaving(true);
    try {
      const { board, created } = await initializeBoard(browserCopy);
      revision.current = board.revision;
      setItems(board.entries);
      setSetup(null);
      setError(created ? "" : "The database board was already created. Your browser copy is still saved locally.");
    } catch {
      setError("Could not create the database board. Check your connection and tracker password. Your browser copy is still saved.");
    } finally {
      writePending.current = false;
      setSaving(false);
    }
  }

  async function add(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = projectFields(form);
    if (!fields.title) return;
    const item = { id: crypto.randomUUID(), ...fields, status: "Idea", updates: [] };
    if (await save([...items, item])) form.reset();
  }

  const visible = items?.filter((item) => !statusFilter || item.status === statusFilter);

  return (
    <>
      <p className="mt-4 text-content-muted">
        {databaseEnabled
          ? "Projects and updates are stored in the tracker database and available wherever you sign in."
          : "Entries are encrypted and saved in this browser. Clearing site data or changing the tracker password makes them unavailable."}
      </p>
      {error && <p className="mt-4 text-ember" role="alert">{error}</p>}
      {setup && (
        <div className="card mt-8 grid max-w-xl gap-4 p-6">
          <h2 className="text-lg font-semibold text-ember">Set up your synced board</h2>
          {setup.browserCopy ? (
            <p className="text-content-muted">Import your projects and updates from this browser. The local copy stays here after import.</p>
          ) : (
            <p className="text-content-muted">If you already saved projects on another device, open the tracker there first to import them. Otherwise you can start with the default projects.</p>
          )}
          <button
            className="btn-primary justify-self-start"
            disabled={saving}
            onClick={() => setupBoard(setup.browserCopy)}
          >
            {setup.browserCopy ? "Import this browser’s board" : "Start with default projects"}
          </button>
        </div>
      )}
      {items && (
        <>
          <form onSubmit={add} className="card mt-8 grid gap-4 p-6">
            <h2 className="text-lg font-semibold text-ember">Add a project</h2>
            <ProjectFields />
            <button disabled={saving} className="btn-primary justify-self-start">Add to tracker</button>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-content-muted">{visible.length} of {items.length} projects</p>
            <label className="flex items-center gap-2 text-sm">
              Filter by status
              <select className={`${field} !w-auto`} value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="">All statuses</option>
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
          </div>
          {visible.length === 0 && <p className="mt-6 text-content-muted">No projects match this view.</p>}
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {visible.map((item) => (
              <ProjectCard
                key={item.id}
                item={item}
                saving={saving}
                update={(id, changes) => save(items.map((entry) => entry.id === id ? { ...entry, ...changes } : entry))}
                remove={(id) => save(items.filter((entry) => entry.id !== id))}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
}
