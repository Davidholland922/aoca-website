import { createHash, randomBytes } from "crypto";
import { sign, safeEqual, vaultDelete, vaultGet, vaultList, vaultPut } from "@/lib/vault";

/** Job applications: types, limits, the anti-bot challenge and storage. */
export const RETENTION_DAYS = 365;
export const MAX_CV_BYTES = 4 * 1024 * 1024; // the hosting accepts 4.5 MB per request
export const POW_BITS = 15; // about a second of work in a browser
const MIN_AGE_MS = 4_000; // nobody fills the form in under four seconds
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

export type Application = {
  id: string;
  at: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  file: { name: string; type: string; size: number };
  /** true when hCaptcha was verified by this server */
  captchaVerified: boolean;
};

// ---- challenge -------------------------------------------------------------
// The page asks for a challenge when it loads. It is signed, so it cannot be
// forged; it carries a timestamp, so it cannot be used instantly or after two
// hours; it needs a small proof of work, so mass submission costs real CPU;
// and its id becomes the storage path, which refuses to be written twice, so
// one challenge can only ever produce one application.

export function issueChallenge() {
  const body = `${randomBytes(16).toString("hex")}.${Date.now()}`;
  return { token: `${body}.${sign(body)}`, bits: POW_BITS };
}

function leadingZeroBits(buf: Buffer) {
  let n = 0;
  for (const byte of buf) {
    if (byte === 0) { n += 8; continue; }
    n += Math.clz32(byte) - 24;
    break;
  }
  return n;
}

export function checkChallenge(token: string, nonce: string): { ok: true; id: string } | { ok: false; why: string } {
  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, why: "malformed" };
  const [id, ts, mac] = parts;
  if (!/^[0-9a-f]{32}$/.test(id) || !safeEqual(mac, sign(`${id}.${ts}`))) return { ok: false, why: "signature" };
  const age = Date.now() - Number(ts);
  if (!(age >= MIN_AGE_MS)) return { ok: false, why: "too fast" };
  if (age > MAX_AGE_MS) return { ok: false, why: "expired" };
  if (!/^\d{1,12}$/.test(nonce)) return { ok: false, why: "nonce" };
  const digest = createHash("sha256").update(`${token}:${nonce}`).digest();
  if (leadingZeroBits(digest) < POW_BITS) return { ok: false, why: "work" };
  return { ok: true, id };
}

// ---- file checks -----------------------------------------------------------
// The browser's stated type is not trusted. The first bytes of the file decide.

export function sniffCv(buf: Buffer, filename: string): { ext: "pdf" | "docx" | "doc"; type: string } | null {
  const lower = filename.toLowerCase();
  if (buf.subarray(0, 5).toString("latin1") === "%PDF-" && lower.endsWith(".pdf")) {
    return { ext: "pdf", type: "application/pdf" };
  }
  // .docx is a zip archive that contains a word/ folder
  if (buf.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04])) && lower.endsWith(".docx")) {
    if (buf.includes(Buffer.from("word/")) && buf.includes(Buffer.from("[Content_Types].xml"))) {
      return { ext: "docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };
    }
    return null;
  }
  // legacy .doc (OLE compound file)
  if (buf.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) && lower.endsWith(".doc")) {
    return { ext: "doc", type: "application/msword" };
  }
  return null;
}

export function cleanFilename(name: string, ext: string) {
  const base = name.replace(/\.[^.]*$/, "").normalize("NFKD").replace(/[^\w\- ]+/g, "").trim().replace(/\s+/g, "-").slice(0, 60) || "cv";
  return `${base}.${ext}`;
}

// ---- storage ---------------------------------------------------------------
const recordPath = (id: string) => `applications/${id}/record`;
const cvPath = (id: string) => `applications/${id}/cv`;

/** Returns false when this challenge has already been used. */
export async function saveApplication(app: Application, cv: Buffer) {
  try {
    await vaultPut(cvPath(app.id), cv); // refuses to overwrite: single use
  } catch {
    return false;
  }
  await vaultPut(recordPath(app.id), Buffer.from(JSON.stringify(app)));
  return true;
}

/** Deletes anything older than the retention period. Safe to call often. */
export async function purgeExpired() {
  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
  const old = (await vaultList("applications/")).filter((b) => b.uploadedAt.getTime() < cutoff);
  await vaultDelete(old.map((b) => b.pathname));
  return old.length;
}

export async function listApplications(): Promise<Application[]> {
  await purgeExpired().catch(() => 0);
  const records = (await vaultList("applications/"))
    .filter((b) => b.pathname.endsWith("/record"))
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
    .slice(0, 200);
  const out = await Promise.all(
    records.map(async (r) => {
      try {
        const buf = await vaultGet(r.pathname);
        return buf ? (JSON.parse(buf.toString("utf8")) as Application) : null;
      } catch {
        return null;
      }
    })
  );
  return out.filter((a): a is Application => !!a);
}

export async function getCv(id: string) {
  if (!/^[0-9a-f]{32}$/.test(id)) return null;
  const rec = await vaultGet(recordPath(id));
  const cv = await vaultGet(cvPath(id));
  if (!rec || !cv) return null;
  return { app: JSON.parse(rec.toString("utf8")) as Application, cv };
}

export async function deleteApplication(id: string) {
  if (!/^[0-9a-f]{32}$/.test(id)) return;
  await vaultDelete([recordPath(id), cvPath(id)]);
}
