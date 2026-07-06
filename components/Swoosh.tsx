import clsx from "clsx";

/**
 * Brand rule: the AOCA logo's baseline-and-swoosh, used as the underline
 * beneath headings site-wide (replaces the plain red bar).
 */
export default function Swoosh({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 76 12"
      className={clsx("mt-4 h-[11px] w-[76px]", className)}
      aria-hidden
      fill="none"
    >
      {/* baseline, echoing the underline in the wordmark */}
      <path
        d="M1 10.5H49"
        stroke={light ? "#e05563" : "#c8202f"}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* rising swoosh from the A */}
      <path
        d="M10 10.5C30 10.5 48 9 73 1.5"
        stroke={light ? "#e05563" : "#c8202f"}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
