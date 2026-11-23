"use server";

import { hasSession, trackerPassword } from "./auth";
import { decryptEntries } from "./actions";
import { starterProjects } from "./backlog";
import * as store from "./board-store";

function requireSession() {
  const password = trackerPassword();
  if (!password || !hasSession(password)) throw new Error("Session expired");
}

export async function getBoard() {
  requireSession();
  return store.getBoard();
}

export async function initializeBoard(browserCopy = null) {
  requireSession();
  const entries = browserCopy === null ? starterProjects : await decryptEntries(browserCopy);
  return store.initializeBoard(entries);
}

export async function saveBoard(entries, expectedRevision) {
  requireSession();
  return store.saveBoard(entries, expectedRevision);
}
