import { NextRequest, NextResponse } from "next/server";
import { commitFiles, readRepoJson } from "@/lib/github";

export const runtime = "nodejs";

const SECTIONS = ["team", "stats", "offices"] as const;
type Section = (typeof SECTIONS)[number];

function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
  return `tel:${digits}`;
}

/** Save a client-edited site section (team / stats / offices). */
export async function POST(req: NextRequest) {
  try {
    const { password, section, data } = (await req.json()) as {
      password: string;
      section: Section;
      data: unknown[];
    };

    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }
    if (!SECTIONS.includes(section) || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // light shape validation + normalisation
    let clean: unknown[];
    if (section === "team") {
      clean = (data as { name?: string; role?: string; cred?: string }[])
        .map((m) => ({
          name: (m.name ?? "").trim(),
          role: (m.role ?? "").trim(),
          cred: (m.cred ?? "").trim(),
        }))
        .filter((m) => m.name);
    } else if (section === "stats") {
      clean = (data as { value?: string; label?: string }[])
        .map((s) => ({
          value: (s.value ?? "").trim(),
          label: (s.label ?? "").trim(),
        }))
        .filter((s) => s.value && s.label);
    } else {
      clean = (
        data as {
          name?: string;
          address?: string[] | string;
          phone?: string;
          email?: string;
        }[]
      )
        .map((o) => {
          const address = Array.isArray(o.address)
            ? o.address
            : String(o.address ?? "")
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean);
          const phone = (o.phone ?? "").trim();
          return {
            name: (o.name ?? "").trim(),
            address,
            phone,
            phoneHref: telHref(phone),
            email: (o.email ?? "").trim(),
          };
        })
        .filter((o) => o.name && o.phone);
    }

    if (clean.length === 0) {
      return NextResponse.json(
        { error: "Nothing valid to save — check the fields" },
        { status: 400 }
      );
    }

    const overrides = (await readRepoJson("content/overrides.json")) as Record<
      string,
      unknown
    >;
    overrides[section] = clean;

    const commit = await commitFiles(`Update ${section} via admin`, [
      {
        path: "content/overrides.json",
        utf8: JSON.stringify(overrides, null, 2) + "\n",
      },
    ]);
    return NextResponse.json({ ok: true, commit });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unexpected error" },
      { status: 500 }
    );
  }
}
