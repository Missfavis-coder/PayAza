"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  seeAllHref?: string;
  seeAllLabel?: string;
}

export function SectionHeader({
  title,
  seeAllHref,
  seeAllLabel = "See all",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 mb-3">
      <h2 className="text-sm uppercase tracking-widest text-neutral-300 font-semibold">
        {title}
      </h2>
      {seeAllHref ? (
        <Link
          href={seeAllHref}
          className="inline-flex items-center gap-1 text-xs text-[#00CF7B] hover:underline"
        >
          {seeAllLabel}
          <ArrowRight size={12} />
        </Link>
      ) : null}
    </div>
  );
}
