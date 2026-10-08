import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { get, put } from "@vercel/blob";
import { safeEqual } from "@/lib/vault";

/**
 * One gate for every /api/admin route.
 *
 * The admin area is protected by a single shared password, so guessing has
 * to be made impractical. Wrong passwords are counted in the private store
 * (so the count survives across servers) and the gate closes:
 *   - for one address after 8 wrong passwords in 15 minutes;
 *   - for everyone after 40 wrong passwords in an hour, for 15 minutes.
 * A correct password is compared in constant time. Every failure also waits
 * a moment before answering.
 */
const WINDOW_MS = 15 * 60 * 1000;
const PER_IP = 8;
const GLOBAL_WINDOW_MS = 60 * 60 * 1000;
const GLOBAL = 40;
const STATE = "auth/failed-logins";

type Fail = { t: number; ip: string };

const ipOf = (req: NextRequest) =>
  createHash("sha256")
    .update((req.headers.get("x-real-ip") || (req.headers.get("x-forwarded-for") ?? "").split(",")[0] || "unknown").trim())
    .digest("hex")
    .slice(0, 16);

async function readFails(): Promise<Fail[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const res = await get(STATE, { access: "private", useCache: false });
    if (!res?.stream) return [];
    const list = JSON.parse(await new Response(res.stream).text()) as Fail[];
    const cutoff = Date.now() - GLOBAL_WINDOW_MS;
    return Array.isArray(list) ? list.filter((f) => f.t > cutoff) : [];
  } catch {
    return [];
  }
}

async function writeFails(list: Fail[]) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    await put(STATE, JSON.stringify(list.slice(-400)), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
  } catch {
    /* counting is best effort; the password check itself never depends on it */
  }
}

const deny = (error: string, status: number) =>
  NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } });

/**
 * Returns null when the password is right, otherwise the response to send.
 * `expected` defaults to ADMIN_PASSWORD.
 */
export async function adminGate(
  req: NextRequest,
  password: unknown,
  expected: string | undefined = process.env.ADMIN_PASSWORD
): Promise<NextResponse | null> {
  if (!expected) return deny("Wrong password", 401);
  const ip = ipOf(req);
  const fails = await readFails();
  const now = Date.now();
  const mine = fails.filter((f) => f.ip === ip && f.t > now - WINDOW_MS).length;
  if (mine >= PER_IP || fails.length >= GLOBAL) {
    return deny("Too many wrong passwords. Please wait 15 minutes and try again.", 429);
  }
  if (typeof password === "string" && password.length > 0 && password.length <= 200 && safeEqual(password, expected)) {
    return null;
  }
  await Promise.all([writeFails([...fails, { t: now, ip }]), new Promise((r) => setTimeout(r, 600))]);
  return deny("Wrong password", 401);
}
