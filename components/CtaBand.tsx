import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import AWatermark from "@/components/AWatermark";
import Swoosh from "@/components/Swoosh";

export default function CtaBand({
  title = "Talk to an engineer, not a switchboard.",
  body = "Tell us what you're planning and we'll give you a straight view on feasibility, cost and programme — before you commit.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="blueprint relative overflow-hidden bg-navy-950">
      <AWatermark />
      <div className="container-site section relative">
        <Reveal>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                {title}
              </h2>
              <Swoosh />
              <p className="mt-5 text-lg text-navy-100">{body}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Start a conversation
                <ArrowRight size={16} aria-hidden />
              </Link>
              <a href={site.phoneHref} className="btn-outline-light">
                <Phone size={16} aria-hidden />
                {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
