import { createCipheriv, createDecipheriv, createHmac, hkdfSync, randomBytes, timingSafeEqual } from "crypto";
import { del, get, list, put } from "@vercel/blob";

/**
 * Private, encrypted storage for personal data (job applications, CVs and
 * contact-form enquiries).
 *
 * Files live in a private Vercel Blob store in the Dublin region. Every file
 * is also encrypted here with AES-256-GCM before it leaves the server, so a
 * storage URL on its own is useless: reading anything needs both the store's
 * token and VAULT_KEY. Nothing personal is ever written to the git repository.
 */
const MAGIC = Buffer.from("AV1");

export function vaultReady() {
  return !!process.env.BLOB_READ_WRITE_TOKEN && !!process.env.VAULT_KEY;
}

function subkey(label: string) {
  const master = Buffer.from(process.env.VAULT_KEY ?? "", "base64");
  if (master.length < 32) throw new Error("VAULT_KEY is missing or too short");
  return Buffer.from(hkdfSync("sha256", master, Buffer.alloc(0), `aoca:${label}`, 32));
}

export function seal(plain: Buffer) {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", subkey("enc"), iv);
  const body = Buffer.concat([c.update(plain), c.final()]);
  return Buffer.concat([MAGIC, iv, c.getAuthTag(), body]);
}

export function unseal(sealed: Buffer) {
  if (sealed.length < 31 || !sealed.subarray(0, 3).equals(MAGIC)) throw new Error("Not a vault file");
  const d = createDecipheriv("aes-256-gcm", subkey("enc"), sealed.subarray(3, 15));
  d.setAuthTag(sealed.subarray(15, 31));
  return Buffer.concat([d.update(sealed.subarray(31)), d.final()]);
}

/** Store a file. Throws if the path already exists unless overwrite is set. */
export async function vaultPut(path: string, plain: Buffer, overwrite = false) {
  await put(path, seal(plain), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: overwrite,
    contentType: "application/octet-stream",
  });
}

export async function vaultGet(path: string): Promise<Buffer | null> {
  const res = await get(path, { access: "private", useCache: false });
  if (!res || !res.stream) return null;
  return unseal(Buffer.from(await new Response(res.stream).arrayBuffer()));
}

export async function vaultList(prefix: string) {
  const out: { pathname: string; uploadedAt: Date; size: number }[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    for (const b of page.blobs) out.push({ pathname: b.pathname, uploadedAt: new Date(b.uploadedAt), size: b.size });
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return out;
}

export async function vaultDelete(paths: string[]) {
  if (paths.length) await del(paths);
}

/** HMAC used for the upload challenge. */
export function sign(data: string) {
  return createHmac("sha256", subkey("mac")).update(data).digest("base64url");
}

/** Constant-time string comparison, for passwords and signatures. */
export function safeEqual(a: string, b: string) {
  const x = createHmac("sha256", "cmp").update(a).digest();
  const y = createHmac("sha256", "cmp").update(b).digest();
  return timingSafeEqual(x, y);
}
