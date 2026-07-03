import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="blueprint bg-navy-950">
      <div className="container-site flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 max-w-xl text-4xl font-semibold text-white sm:text-5xl">
          This page didn&apos;t pass inspection.
        </h1>
        <div className="rule" />
        <p className="mt-6 max-w-md text-lg text-navy-100">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="btn-primary mt-10">
          <ArrowLeft size={16} aria-hidden />
          Back to home
        </Link>
      </div>
    </section>
  );
}
