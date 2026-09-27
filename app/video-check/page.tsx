"use client";

import { useEffect, useState } from "react";

/**
 * Hidden self-diagnosis page for the homepage background video.
 * Open /video-check on a machine where the video is not playing and it
 * prints a plain-English verdict. Not linked anywhere; noindexed via
 * the robots meta below (client component, so set via useEffect).
 */
export default function VideoCheckPage() {
  const [lines, setLines] = useState<string[]>(["Running checks…"]);
  const [verdict, setVerdict] = useState<string>("");

  useEffect(() => {
    document.title = "Video check";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    const out: string[] = [];
    const log = (s: string) => {
      out.push(s);
      setLines([...out]);
    };

    (async () => {
      log(`Browser: ${navigator.userAgent}`);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      log(
        reduce
          ? "Reduce motion: ON — this computer asks websites not to play moving backgrounds"
          : "Reduce motion: off"
      );

      const v = document.createElement("video");
      const canH264 = v.canPlayType('video/mp4; codecs="avc1.640028"');
      log(`Can play the video format (H.264): ${canH264 || "NO"}`);

      log("Downloading a piece of the video…");
      let fetched = false;
      try {
        const r = await fetch("/video/hero.mp4", {
          headers: { Range: "bytes=0-200000" },
        });
        fetched = r.ok || r.status === 206;
        log(`Video file reachable: ${fetched ? "yes" : `NO (status ${r.status})`}`);
      } catch {
        log("Video file reachable: NO (network error)");
      }

      log("Trying to actually play it…");
      v.src = "/video/hero.mp4";
      v.muted = true;
      v.setAttribute("muted", "");
      v.setAttribute("playsinline", "");
      v.style.cssText = "position:fixed;width:1px;height:1px;opacity:0";
      document.body.appendChild(v);
      const played = await new Promise<string>((resolve) => {
        const timer = setTimeout(() => resolve("TIMED OUT after 10s"), 10000);
        v.addEventListener("error", () =>
          resolve(`FAILED (error code ${v.error?.code})`)
        );
        v.addEventListener("timeupdate", () => {
          if (v.currentTime > 0.5) {
            clearTimeout(timer);
            resolve("YES — video plays on this computer");
          }
        });
        v.play().catch((e) => {
          clearTimeout(timer);
          resolve(`Autoplay blocked: ${e?.name ?? "unknown"}`);
        });
      });
      log(`Playback: ${played}`);
      v.remove();

      if (reduce) {
        setVerdict(
          "VERDICT: This computer has 'reduce motion' (animation effects) turned OFF in its system accessibility settings, so the website deliberately shows the still photo instead of the moving video. The website is working correctly. To see the video on this machine: Windows Settings → Accessibility → Visual effects → turn ON Animation effects, then refresh."
        );
      } else if (played.startsWith("YES")) {
        setVerdict(
          "VERDICT: The video plays fine on this computer. If the homepage still looks static, do a hard refresh (Ctrl+F5) and check again."
        );
      } else {
        setVerdict(
          `VERDICT: The video cannot play on this computer (${played}). Screenshot this page and send it to David.`
        );
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-5 py-32 font-mono text-sm">
      <h1 className="text-xl font-bold">AOCA video check</h1>
      <ul className="mt-6 space-y-2">
        {lines.map((l) => (
          <li key={l} className="border-l-2 border-navy-200 pl-3">
            {l}
          </li>
        ))}
      </ul>
      {verdict && (
        <p className="mt-8 border-2 border-brand bg-brand/5 p-4 text-base font-semibold">
          {verdict}
        </p>
      )}
    </div>
  );
}
