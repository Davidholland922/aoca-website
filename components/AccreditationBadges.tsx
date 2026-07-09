import Image from "next/image";

/** Official accreditation & membership logos (client-supplied, July 2026). */
const badges = [
  {
    src: "/images/accreditations/engineers-ireland.png",
    alt: "Engineers Ireland — Corporate Member",
    label: "Corporate Member of Engineers Ireland",
  },
  {
    src: "/images/accreditations/nsai-iso9001.jpg",
    alt: "NSAI Certified — ISO 9001:2015 Quality",
    label: "ISO9001 Certification with NSAI",
  },
  {
    src: "/images/accreditations/ife.png",
    alt: "The Institution of Fire Engineers — Republic of Ireland Branch",
    label: "Member of the Institute of Fire Engineers",
  },
  {
    src: "/images/accreditations/phai.webp",
    alt: "Passive House Association of Ireland",
    label: "Member of Passive House Association of Ireland",
  },
  {
    src: "/images/accreditations/greencert.jpg",
    alt: "GreenCert — Certification of Green Education Centers in Europe",
    label: "Green Cert Registered",
  },
];

export default function AccreditationBadges({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 ${
        compact ? "" : "gap-4"
      }`}
    >
      {badges.map((b) => (
        <div
          key={b.label}
          className="flex h-full flex-col items-center justify-between gap-3 border border-navy-100 bg-white p-5 text-center"
        >
          <span className="flex min-h-[4rem] items-center justify-center">
            <Image
              src={b.src}
              alt={b.alt}
              width={220}
              height={110}
              className="max-h-16 w-auto max-w-full object-contain"
            />
          </span>
          <p className="text-xs font-medium leading-snug text-navy-600">
            {b.label}
          </p>
        </div>
      ))}
    </div>
  );
}
