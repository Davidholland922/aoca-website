"use client";

import { ArrowRight } from "lucide-react";

/** Scrolls to the application form and preselects the role. */
export default function ApplyButton({
  role,
  label,
  className = "btn-primary",
}: {
  role: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href="#apply"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("aoca:apply", { detail: role }))}
    >
      {label}
      <ArrowRight size={16} aria-hidden />
    </a>
  );
}
