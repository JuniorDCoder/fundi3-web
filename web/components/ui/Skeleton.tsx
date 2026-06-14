interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Base shimmer block — a glass surface with a soft light band sweeping across it.
 * Compose larger skeleton layouts (below) out of this single primitive so every
 * loading state in the app shares the same shimmer rhythm and brand surface.
 */
export function Skeleton({ className = "", style }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-white/5 ${className}`} style={style}>
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

const GLASS = { backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#1E2E28" } as const;

// ─── Course catalog ───────────────────────────────────────────────────────────

/** Mirrors CourseCard's shape: gradient banner, title, description lines, badges, footer. */
export function SkeletonCourseCard() {
  return (
    <div className="flex flex-col rounded-2xl border overflow-hidden" style={GLASS}>
      <Skeleton className="h-28 rounded-none" />
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-20 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/** Grid of skeleton course cards — drop-in placeholder for CourseGrid while the catalog loads. */
export function SkeletonCourseGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCourseCard key={i} />
      ))}
    </div>
  );
}

// ─── Course detail ────────────────────────────────────────────────────────────

/** Mirrors the course detail hero (title/description/badges/CTA + stat list) and curriculum modules. */
export function SkeletonCourseDetail() {
  return (
    <div className="pt-28 pb-16" style={{ backgroundColor: "#0A0F0E" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-24 mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 items-start">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-10 w-full max-w-lg" />
            <Skeleton className="h-10 w-2/3 max-w-md" />
            <div className="space-y-2 max-w-2xl pt-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
            <Skeleton className="h-12 w-48 rounded-xl mt-2" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-40 rounded-2xl" />
            <div className="rounded-2xl border divide-y overflow-hidden" style={GLASS}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3.5" style={{ borderColor: "#1E2E28" }}>
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3.5 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-5">
          <Skeleton className="h-8 w-72" />
          {Array.from({ length: 3 }).map((_, mi) => (
            <div key={mi} className="rounded-2xl border overflow-hidden" style={GLASS}>
              <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "#1E2E28" }}>
                <Skeleton className="w-7 h-7 rounded-full shrink-0" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="divide-y" style={{ borderColor: "#1E2E28" }}>
                {Array.from({ length: 3 }).map((_, li) => (
                  <div key={li} className="flex items-center justify-between gap-4 px-5 py-3.5">
                    <Skeleton className="h-3.5 w-56" />
                    <Skeleton className="h-3.5 w-12" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Lesson player ────────────────────────────────────────────────────────────

/** Mirrors LessonPlayer's top bar + sidebar + article shape while the lesson loads. */
export function SkeletonLesson() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0F0E" }}>
      <div className="sticky top-0 z-30 backdrop-blur-md border-b" style={{ backgroundColor: "rgba(10,15,14,0.85)", borderColor: "#1E2E28" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-9 w-32 rounded-xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <div className="hidden lg:block space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-xl" />
          ))}
        </div>

        <div className="space-y-6">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-9 w-2/3" />
          <div className="space-y-3 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="h-44 w-full rounded-2xl mt-4" />
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

/** Mirrors StatCard — icon chip + value + label. */
export function SkeletonStatCard() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4">
      <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-14" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

/** Mirrors CourseProgressCard — banner thumbnail, title + progress bar, continue button. */
export function SkeletonCourseProgressCard() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-5">
      <Skeleton className="w-full sm:w-32 h-20 sm:h-16 rounded-xl shrink-0" />
      <div className="flex-1 min-w-0 space-y-2.5">
        <Skeleton className="h-4 w-2/3 max-w-xs" />
        <Skeleton className="h-1.5 w-full max-w-xs rounded-full" />
        <Skeleton className="h-3 w-28" />
      </div>
      <Skeleton className="h-10 w-36 rounded-xl shrink-0" />
    </div>
  );
}

// ─── Certificates ─────────────────────────────────────────────────────────────

/** Mirrors CertRow — icon chip, title/meta lines, action button row. */
export function SkeletonCertCard() {
  return (
    <div
      className="rounded-2xl border p-5 flex items-center gap-5"
      style={{ borderColor: "rgba(239,159,39,0.12)", backgroundColor: "rgba(239,159,39,0.03)" }}
    >
      <Skeleton className="w-11 h-11 rounded-xl shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-4 w-1/2 max-w-xs" />
        <Skeleton className="h-3 w-40" />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}

// ─── Admin tables & forms ─────────────────────────────────────────────────────

/** Generic skeleton table rows — used by admin list pages (admins, courses) while data loads. */
export function SkeletonTableRows({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="divide-y divide-white/5">
      {Array.from({ length: rows }).map((_, ri) => (
        <div key={ri} className="flex items-center gap-6 px-5 py-4">
          {Array.from({ length: columns }).map((_, ci) => (
            <Skeleton key={ci} className={ci === 0 ? "h-3.5 w-40" : "h-3.5 flex-1 max-w-[120px]"} />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Generic skeleton form — labeled field placeholders, used by the admin course editor while it loads. */
export function SkeletonForm({ fields = 5 }: { fields?: number }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-5">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}
