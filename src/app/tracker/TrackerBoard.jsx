"use client";

import { useEffect, useState } from "react";

import { decryptEntries, encryptEntries } from "./actions";

const storageKey = "portfolio-tracker-encrypted-v1";
const statuses = ["Idea", "In progress", "Ready", "Published"];
const categories = ["GitHub cleanup", "Data engineering", "Applied AI", "Fun", "Personal"];
const field = "rounded-lg border bg-surface2 px-3 py-2 text-content";

export default function TrackerBoard({ starterProjects }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const encoded = localStorage.getItem(storageKey);
        if (encoded === null) {
          localStorage.setItem(storageKey, await encryptEntries(starterProjects));
          setItems(starterProjects);
          return;
        }

        const stored = await decryptEntries(encoded);
        if (!Array.isArray(stored)) throw new Error("Invalid tracker data");
        setItems(stored);
      } catch {
        setError("Could not open the tracker entries. Sign in again and retry.");
      }
    }
    load();
  }, [starterProjects]);

  async function save(next) {
    setSaving(true);
    try {
      localStorage.setItem(storageKey, await encryptEntries(next));
      setItems(next);
      setError("");
      return true;
    } catch {
      setError("This browser could not save your changes.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function add(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = data.get("title").trim();
    if (!title) return;

    const item = {
      id: crypto.randomUUID(),
      title,
      category: data.get("category"),
      notes: data.get("notes").trim(),
      status: statuses[0],
    };

    if (await save([...items, item])) form.reset();
  }

  return (
    <>
      <p className="mt-4 text-content-muted">Entries are encrypted and saved in this browser. Clearing site data or changing the tracker password makes them unavailable.</p>
      {error && <p className="mt-4" role="alert">{error}</p>}
      {items === null ? null : (
        <>
          <form onSubmit={add} className="card mt-8 grid gap-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">Project or idea
                <input name="title" className={field} required maxLength={120} />
              </label>
              <label className="grid gap-2">Category
                <select name="category" className={field}>
                  {categories.map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>
            </div>
            <label className="grid gap-2">Notes
              <textarea name="notes" className={field} rows={3} maxLength={2000} />
            </label>
            <button disabled={saving} className="btn-primary justify-self-start">Add to tracker</button>
          </form>

          {items.length === 0 && <p className="mt-8 text-content-muted">No projects or ideas yet.</p>}
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.id} className="card min-w-0 p-5">
                <p className="text-sm text-ember">{item.category}</p>
                <h2 className="mt-2 break-words text-lg font-semibold">{item.title}</h2>
                {item.notes && <p className="mt-2 whitespace-pre-wrap break-words text-content-muted">{item.notes}</p>}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <select
                    aria-label={`Status for ${item.title}`}
                    className={field}
                    disabled={saving}
                    value={item.status}
                    onChange={(event) => save(items.map((entry) =>
                      entry.id === item.id ? { ...entry, status: event.target.value } : entry
                    ))}
                  >
                    {statuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                  <button
                    className="btn-ghost"
                    disabled={saving}
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Remove “${item.title}” from the tracker?`)) {
                        save(items.filter((entry) => entry.id !== item.id));
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
