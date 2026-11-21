"use server";

import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "node:crypto";
import { redirect } from "next/navigation";
import { endSession, hasSession, startSession, trackerPassword, validPassword } from "./auth";

export async function signIn(formData) {
  const password = trackerPassword();
  if (!password || !validPassword(formData.get("password"), password)) {
    redirect("/tracker?login=failed");
  }
  startSession(password);
  redirect("/tracker");
}

export async function signOut() {
  endSession();
  redirect("/tracker");
}

function dataKey() {
  const password = trackerPassword();
  if (!password || !hasSession(password)) throw new Error("Session expired");
  return createHmac("sha256", password).update("tracker-entries-v1").digest();
}

export async function encryptEntries(entries) {
  const json = JSON.stringify(entries);
  if (Buffer.byteLength(json) > 512_000) throw new Error("Tracker storage limit exceeded");
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", dataKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(json, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), ciphertext]).toString("base64url");
}

export async function decryptEntries(encoded) {
  if (typeof encoded !== "string" || encoded.length > 700_000) throw new Error("Invalid tracker data");
  const data = Buffer.from(encoded, "base64url");
  const decipher = createDecipheriv("aes-256-gcm", dataKey(), data.subarray(0, 12));
  decipher.setAuthTag(data.subarray(12, 28));
  return JSON.parse(Buffer.concat([decipher.update(data.subarray(28)), decipher.final()]).toString());
}
