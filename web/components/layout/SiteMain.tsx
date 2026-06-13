"use client";

import { usePathname } from "next/navigation";
import { isChromeHidden } from "@/lib/layout/chrome";

/**
 * The fixed public Navbar needs `pt-14 md:pt-16` on <main> to avoid overlap.
 * /admin, /embed and /connect render their own full-height shells (no fixed
 * navbar) — skip the offset there.
 */
export function SiteMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return <main className={isChromeHidden(pathname) ? "" : "pt-14 md:pt-16"}>{children}</main>;
}
