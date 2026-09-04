import { trustPoints } from "@/lib/site";
import { Icon } from "../ui/Icon";

/**
 * Slow ticker of promises under the hero. The list is rendered twice so the
 * -50% keyframe loops seamlessly; the duplicate is hidden from assistive tech.
 */
export function TrustMarquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {trustPoints.map((point) => (
        <li key={point} className="flex items-center gap-3 px-7 py-4 text-[0.8rem] font-medium tracking-wide whitespace-nowrap text-cream-100">
          <Icon name="check" className="size-4 shrink-0 text-gold-500" />
          {point}
          <span aria-hidden="true" className="ml-7 size-1 rounded-full bg-cream-200/25" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-cream-200/10 bg-forest-800">
      <div className="flex w-max motion-safe:animate-marquee motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
