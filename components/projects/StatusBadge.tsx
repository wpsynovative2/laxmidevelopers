import { statusMeta, type ProjectStatus } from "@/lib/projects";

interface StatusBadgeProps {
  status: ProjectStatus;
  /** `solid` reads on photography, `soft` on light panels. */
  tone?: "solid" | "soft";
  className?: string;
}

export function StatusBadge({ status, tone = "soft", className = "" }: StatusBadgeProps) {
  const meta = statusMeta[status];

  if (tone === "solid") {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full bg-ink-900/70 px-3.5 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-cream-50 uppercase backdrop-blur-sm ${className}`}
      >
        <span aria-hidden="true" className={`size-1.5 rounded-full ${meta.dot} ${status === "ongoing" ? "animate-pulse" : ""}`} />
        {meta.label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.68rem] font-semibold tracking-[0.16em] uppercase ring-1 ring-inset ${meta.chip} ${className}`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}
