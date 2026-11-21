import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "portfolio-tracker";
const sessionSeconds = 8 * 60 * 60;

export function trackerPassword() {
  const password = process.env.TRACKER_PASSWORD;
  return password?.length >= 20 ? password : null;
}

export function validPassword(input, password) {
  if (typeof input !== "string" || input.length > 256) return false;
  const digest = (value) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(input), digest(password));
}

function sign(expiry, password) {
  return createHmac("sha256", password).update(`tracker-session:${expiry}`).digest("hex");
}

export function hasSession(password) {
  const session = cookies().get(cookieName)?.value;
  const match = /^(\d{13})\.([a-f0-9]{64})$/.exec(session ?? "");
  if (!match || Number(match[1]) <= Date.now()) return false;

  return timingSafeEqual(
    Buffer.from(match[2], "hex"),
    Buffer.from(sign(match[1], password), "hex")
  );
}

export function startSession(password) {
  const expiry = String(Date.now() + sessionSeconds * 1000);
  cookies().set(cookieName, `${expiry}.${sign(expiry, password)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/tracker",
    maxAge: sessionSeconds,
  });
}

export function endSession() {
  cookies().set(cookieName, "", { path: "/tracker", maxAge: 0 });
}
