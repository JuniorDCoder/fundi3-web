"use client";

import { usePathname } from "next/navigation";

/**
 * The fixed public Navbar needs `pt-14 md:pt-16` on <main> to avoid overlap.
 * /admin renders its own full-height shell (no fixed navbar) — skip the offset there.
 */
export function SiteMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return <main className={isAdmin ? "" : "pt-14 md:pt-16"}>{children}</main>;
}
