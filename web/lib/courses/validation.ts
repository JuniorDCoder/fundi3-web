import {
  COURSE_LANGUAGE_MODES,
  COURSE_LEVELS,
  COURSE_STATUSES,
  LESSON_TYPES,
  type CourseLanguageMode,
  type CourseLevel,
  type CourseStatus,
  type CourseLessonInput,
  type CourseModuleInput,
  type CourseTreeInput,
  type LessonType,
} from "./types";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

type ParseResult =
  | { ok: true; value: CourseTreeInput }
  | { ok: false; error: string };

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  if (!value.every((item) => typeof item === "string")) return null;
  return value.map((item) => item.trim()).filter(Boolean);
}

function asEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
): T | null {
  return typeof value === "string" &&
    (allowed as readonly string[]).includes(value)
    ? (value as T)
    : null;
}

function parseLesson(
  raw: unknown,
  fallbackPosition: number,
): CourseLessonInput | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;

  if (!isNonEmptyString(r.titleEn) || !isNonEmptyString(r.titleFr)) return null;

  const lessonType = asEnum<LessonType>(r.lessonType, LESSON_TYPES);
  if (!lessonType) return null;

  const videoUrl =
    typeof r.videoUrl === "string" && r.videoUrl.trim()
      ? r.videoUrl.trim()
      : null;

  return {
    id: typeof r.id === "string" && r.id.trim() ? r.id.trim() : undefined,
    titleEn: r.titleEn.trim(),
    titleFr: r.titleFr.trim(),
    durationLabel: asString(r.durationLabel).trim(),
    lessonType,
    contentEn: asString(r.contentEn),
    contentFr: asString(r.contentFr),
    videoUrl,
    position: typeof r.position === "number" ? r.position : fallbackPosition,
  };
}

function parseModule(
  raw: unknown,
  fallbackPosition: number,
): CourseModuleInput | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;

  if (!isNonEmptyString(r.titleEn) || !isNonEmptyString(r.titleFr)) return null;

  const lessonsRaw = Array.isArray(r.lessons) ? r.lessons : [];
  const lessons: CourseLessonInput[] = [];
  for (let i = 0; i < lessonsRaw.length; i++) {
    const lesson = parseLesson(lessonsRaw[i], i);
    if (!lesson) return null;
    lessons.push(lesson);
  }

  return {
    id: typeof r.id === "string" && r.id.trim() ? r.id.trim() : undefined,
    titleEn: r.titleEn.trim(),
    titleFr: r.titleFr.trim(),
    position: typeof r.position === "number" ? r.position : fallbackPosition,
    lessons,
  };
}

/**
 * Validates a "save whole tree" payload from the admin course editor.
 * Accepts every field the schema supports — bilingual text, pricing, tags,
 * outcomes, modules and lessons — and rejects the request as a whole if any
 * nested piece is malformed (the editor always submits the full tree).
 */
export function parseCourseTreeInput(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "invalid_body" };
  }
  const r = body as Record<string, unknown>;

  const slug = asString(r.slug).trim().toLowerCase();
  if (!SLUG_PATTERN.test(slug)) {
    return { ok: false, error: "invalid_slug" };
  }

  if (!isNonEmptyString(r.titleEn) || !isNonEmptyString(r.titleFr)) {
    return { ok: false, error: "missing_title" };
  }
  if (
    !isNonEmptyString(r.descriptionEn) ||
    !isNonEmptyString(r.descriptionFr)
  ) {
    return { ok: false, error: "missing_description" };
  }

  const level = asEnum<CourseLevel>(r.level, COURSE_LEVELS);
  if (!level) return { ok: false, error: "invalid_level" };

  const language =
    asEnum<CourseLanguageMode>(r.language, COURSE_LANGUAGE_MODES) ?? "both";
  const status = asEnum<CourseStatus>(r.status, COURSE_STATUSES) ?? "draft";

  const isFree = r.isFree !== false;
  let priceUsd: number | null = null;
  if (!isFree) {
    if (
      typeof r.priceUsd !== "number" ||
      !Number.isFinite(r.priceUsd) ||
      r.priceUsd < 0
    ) {
      return { ok: false, error: "invalid_price" };
    }
    priceUsd = Math.round(r.priceUsd * 100) / 100;
  }

  const gradientFrom = asString(r.gradientFrom, "#0F6E56").trim();
  const gradientTo = asString(r.gradientTo, "#1D9E75").trim();
  if (
    !HEX_COLOR_PATTERN.test(gradientFrom) ||
    !HEX_COLOR_PATTERN.test(gradientTo)
  ) {
    return { ok: false, error: "invalid_gradient" };
  }

  const tags = asStringArray(r.tags);
  const outcomesEn = asStringArray(r.outcomesEn);
  const outcomesFr = asStringArray(r.outcomesFr);
  if (tags === null || outcomesEn === null || outcomesFr === null) {
    return { ok: false, error: "invalid_list_field" };
  }

  const modulesRaw = Array.isArray(r.modules) ? r.modules : [];
  const modules: CourseModuleInput[] = [];
  for (let i = 0; i < modulesRaw.length; i++) {
    const parsedModule = parseModule(modulesRaw[i], i);
    if (!parsedModule) return { ok: false, error: "invalid_module" };
    modules.push(parsedModule);
  }

  const thumbnailUrl =
    typeof r.thumbnailUrl === "string" && r.thumbnailUrl.trim()
      ? r.thumbnailUrl.trim()
      : null;

  return {
    ok: true,
    value: {
      id: typeof r.id === "string" && r.id.trim() ? r.id.trim() : undefined,
      slug,
      titleEn: (r.titleEn as string).trim(),
      titleFr: (r.titleFr as string).trim(),
      descriptionEn: (r.descriptionEn as string).trim(),
      descriptionFr: (r.descriptionFr as string).trim(),
      longDescriptionEn: asString(r.longDescriptionEn).trim(),
      longDescriptionFr: asString(r.longDescriptionFr).trim(),
      level,
      language,
      status,
      isFree,
      priceUsd,
      isAfrican: r.isAfrican === true,
      durationLabel: asString(r.durationLabel).trim(),
      gradientFrom,
      gradientTo,
      thumbnailUrl,
      tags,
      outcomesEn,
      outcomesFr,
      position: typeof r.position === "number" ? r.position : 0,
      modules,
    },
  };
}
