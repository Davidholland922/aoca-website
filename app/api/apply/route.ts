import { NextRequest, NextResponse } from "next/server";
import { vaultReady } from "@/lib/vault";
import {
  MAX_CV_BYTES,
  checkChallenge,
  cleanFilename,
  issueChallenge,
  purgeExpired,
  saveApplication,
  sniffCv,
  type Application,
} from "@/lib/applications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Job applications with a CV upload.
 *
 * GET  hands the page a signed challenge.
 * POST accepts the application. In order, it checks: the request came from
 * this site, the hidden trap field is empty, the challenge is genuine, old
 * enough and solved, hCaptcha passes (when this site's own keys are set), the
 * fields are sane, and the file really is a PDF or Word document under the
 * size limit. Only then is anything stored, encrypted, in the private vault.
 */
const noStore = { "Cache-Control": "no-store" };
const bad = (error: string, status = 400) => NextResponse.json({ error }, { status, headers: noStore });

// soft per-instance limiter; the challenge and captcha are the real gates
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 10;
}

function sameSite(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const host = new URL(origin).host;
    return host === req.headers.get("host") || host === "www.aoca.ie" || host === "aoca.ie";
  } catch {
    return false;
  }
}

async function captchaPasses(token: string, ip: string) {
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) return null; // this site's own keys are not set yet
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  if (process.env.HCAPTCHA_SITEKEY) body.set("sitekey", process.env.HCAPTCHA_SITEKEY);
  try {
    const r = await fetch("https://api.hcaptcha.com/siteverify", { method: "POST", body, cache: "no-store" });
    return !!((await r.json()) as { success?: boolean }).success;
  } catch {
    return false;
  }
}

export async function GET() {
  if (!vaultReady()) return bad("Applications are not available right now.", 503);
  return NextResponse.json(issueChallenge(), { headers: noStore });
}

export async function POST(req: NextRequest) {
  if (!vaultReady()) return bad("Applications are not available right now.", 503);
  if (!sameSite(req)) return bad("Please apply from the careers page.", 403);
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return bad("Too many applications from this connection. Please try again later.", 429);
  if (Number(req.headers.get("content-length") ?? 0) > MAX_CV_BYTES + 200_000) {
    return bad("That file is too large. The limit is 4 MB.", 413);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return bad("The upload did not arrive in one piece. Please try again.");
  }
  const text = (k: string, max: number) => String(form.get(k) ?? "").replace(/\u0000/g, "").trim().slice(0, max);

  // hidden trap field: tell the bot it worked and store nothing
  if (text("website", 200)) return NextResponse.json({ ok: true, ref: "RECEIVED" }, { headers: noStore });

  const challenge = checkChallenge(text("token", 400), text("nonce", 20));
  if (!challenge.ok) return bad("This form has expired. Please reload the page and try again.", 400);

  const captcha = await captchaPasses(text("h-captcha-response", 8000), ip);
  if (captcha === false) return bad("Please tick the “I am human” box and try again.", 400);

  const name = text("name", 120);
  const email = text("email", 200);
  const phone = text("phone", 40);
  const role = text("role", 160);
  const message = text("message", 2000);
  if (name.length < 2) return bad("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return bad("Please enter a valid email address.");
  if (!role) return bad("Please choose the role you are applying for.");
  if (text("consent", 5) !== "yes") return bad("Please confirm you are happy for us to hold your application.");

  const file = form.get("cv");
  if (!(file instanceof File) || file.size === 0) return bad("Please attach your CV.");
  if (file.size > MAX_CV_BYTES) return bad("That file is too large. The limit is 4 MB.", 413);
  const cv = Buffer.from(await file.arrayBuffer());
  const kind = sniffCv(cv, file.name);
  if (!kind) return bad("Please attach your CV as a PDF or Word document.");

  const app: Application = {
    id: challenge.id,
    at: new Date().toISOString(),
    name,
    email,
    phone,
    role,
    message,
    file: { name: cleanFilename(file.name, kind.ext), type: kind.type, size: cv.length },
    captchaVerified: captcha === true,
  };
  if (!(await saveApplication(app, cv))) {
    return bad("This application was already sent. Reload the page to send another.", 409);
  }
  void purgeExpired().catch(() => 0);

  return NextResponse.json({ ok: true, ref: app.id.slice(0, 8).toUpperCase() }, { headers: noStore });
}
