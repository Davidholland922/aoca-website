import { NextRequest, NextResponse } from "next/server";
import { commitFiles, readRepoJson } from "@/lib/github";

export const runtime = "nodejs";

const SECTIONS = [
  "team", "stats", "offices", "about", "jobs", "featured", "banners",
  "timeline", "contactKeys", "mission", "hero", "sectorText", "values",
  "accreditations", "testimonials",
] as const;
type Section = (typeof SECTIONS)[number];

// sections that may legitimately be saved as an empty list
const MAY_BE_EMPTY: Section[] = ["jobs", "featured", "contactKeys"];

function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
  return `tel:${digits}`;
}

/** Save a client-edited site section. */
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
    if (!SECTIONS.includes(section) || !Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    let clean: unknown[];
    if (section === "team") {
      clean = (
        data as {
          name?: string;
          role?: string;
          cred?: string;
          bio?: string;
          photo?: string;
        }[]
      )
        .map((m) => ({
          name: (m.name ?? "").trim(),
          role: (m.role ?? "").trim(),
          cred: (m.cred ?? "").trim(),
          // keep the bios and headshots that live on the website
          ...(m.bio?.trim() ? { bio: m.bio.trim() } : {}),
          ...(m.photo ? { photo: m.photo } : {}),
        }))
        .filter((m) => m.name);
    } else if (section === "timeline") {
      clean = (
        data as {
          year?: string;
          title?: string;
          text?: string;
          image?: string;
          clipping?: string;
        }[]
      )
        .map((m) => ({
          year: (m.year ?? "").trim(),
          title: (m.title ?? "").trim(),
          text: (m.text ?? "").trim(),
          // photos stay attached to their milestone through edits
          ...(m.image ? { image: m.image } : {}),
          ...(m.clipping ? { clipping: m.clipping } : {}),
        }))
        .filter((m) => m.year && m.title && m.text);
    } else if (section === "contactKeys") {
      // Web3Forms access keys are UUIDs; anything else is a paste mistake
      const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const rows = (data as { inbox?: string; accessKey?: string }[]).map(
        (k) => ({
          inbox: (k.inbox ?? "").trim(),
          accessKey: (k.accessKey ?? "").trim(),
        })
      );
      const badKey = rows.find((k) => k.accessKey && !uuid.test(k.accessKey));
      if (badKey) {
        return NextResponse.json(
          {
            error:
              "That doesn't look like a Web3Forms access key — it should look like 1a2b3c4d-1234-1234-1234-123456abcdef. Copy it exactly from web3forms.com.",
          },
          { status: 400 }
        );
      }
      clean = rows.filter(
        (k) => ["ie", "uk"].includes(k.inbox) && k.accessKey
      );
    } else if (section === "banners") {
      clean = (data as { key?: string; title?: string; body?: string }[])
        .map((b) => ({
          key: (b.key ?? "").trim(),
          title: (b.title ?? "").trim(),
          body: (b.body ?? "").trim(),
        }))
        .filter(
          (b) => ["home", "projects"].includes(b.key) && b.title && b.body
        );
    } else if (section === "stats") {
      clean = (data as { value?: string; label?: string }[])
        .map((s) => ({
          value: (s.value ?? "").trim(),
          label: (s.label ?? "").trim(),
        }))
        .filter((s) => s.value && s.label);
    } else if (section === "offices") {
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
    } else if (section === "hero") {
      clean = (data as string[]).map((p) => String(p).trim()).slice(0, 3);
      if (clean.length !== 3 || clean.some((p) => !p)) {
        return NextResponse.json(
          { error: "All three hero lines are required" },
          { status: 400 }
        );
      }
    } else if (section === "sectorText") {
      clean = (data as { slug?: string; title?: string; blurb?: string }[])
        .map((s) => ({
          slug: (s.slug ?? "").trim(),
          title: (s.title ?? "").trim(),
          blurb: (s.blurb ?? "").trim(),
        }))
        .filter((s) => s.slug && s.title && s.blurb);
    } else if (section === "values") {
      clean = (data as { title?: string; body?: string }[])
        .map((v) => ({
          title: (v.title ?? "").trim(),
          body: (v.body ?? "").trim(),
        }))
        .filter((v) => v.title && v.body);
    } else if (section === "accreditations") {
      clean = (data as string[]).map((p) => String(p).trim()).filter(Boolean);
    } else if (section === "testimonials") {
      clean = (
        data as {
          quote?: string;
          author?: string;
          role?: string;
          company?: string;
          logo?: string;
          logoTall?: boolean;
        }[]
      )
        .map((x) => ({
          quote: (x.quote ?? "").trim(),
          author: (x.author ?? "").trim(),
          role: (x.role ?? "").trim(),
          ...(x.company?.trim() ? { company: x.company.trim() } : {}),
          // logos stay attached to their testimonial through edits
          ...(x.logo ? { logo: x.logo } : {}),
          ...(x.logoTall ? { logoTall: true } : {}),
        }))
        .filter((x) => x.quote && x.author);
    } else if (section === "mission") {
      clean = (data as string[]).map((p) => String(p).trim()).slice(0, 2);
      if (clean.some((p) => !p)) {
        return NextResponse.json(
          { error: "Both mission lines are required" },
          { status: 400 }
        );
      }
    } else if (section === "about") {
      clean = (data as string[]).map((p) => String(p).trim()).filter(Boolean);
    } else if (section === "jobs") {
      clean = (
        data as {
          title?: string;
          location?: string;
          type?: string;
          summary?: string;
        }[]
      )
        .map((j) => ({
          title: (j.title ?? "").trim(),
          location: (j.location ?? "").trim(),
          type: (j.type ?? "").trim(),
          summary: (j.summary ?? "").trim(),
        }))
        .filter((j) => j.title);
    } else {
      // featured: list of project slugs
      clean = (data as string[]).map((s) => String(s).trim()).filter(Boolean);
    }

    if (clean.length === 0 && !MAY_BE_EMPTY.includes(section)) {
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
