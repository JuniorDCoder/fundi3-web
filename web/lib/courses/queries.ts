import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  CodeLanguage,
  CourseLevel,
  CourseLanguageMode,
  CourseStatus,
  CourseTreeInput,
  DbCourse,
  DbCourseLesson,
  DbCourseModule,
  DbQuizQuestion,
  LessonType,
} from "./types";

// ─── Row → domain mapping (DB is snake_case, app is camelCase) ───────────────

interface CourseRow {
  id: string;
  slug: string;
  title_en: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
  long_description_en: string;
  long_description_fr: string;
  level: string;
  language: string;
  status: string;
  is_free: boolean;
  price_usd: number | string | null;
  is_african: boolean;
  duration_label: string;
  gradient_from: string;
  gradient_to: string;
  thumbnail_url: string | null;
  tags: string[] | null;
  outcomes_en: string[] | null;
  outcomes_fr: string[] | null;
  position: number;
  created_by: string | null;
  tutor_id: string | null;
  commission_rate: number | string;
  created_at: string;
  updated_at: string;
  course_modules?: ModuleRow[] | null;
}

interface ModuleRow {
  id: string;
  course_id: string;
  title_en: string;
  title_fr: string;
  position: number;
  created_at: string;
  updated_at: string;
  course_lessons?: LessonRow[] | null;
}

interface QuizQuestionRow {
  id: string;
  lesson_id: string;
  question_en: string;
  question_fr: string;
  options_en: string[] | null;
  options_fr: string[] | null;
  correct_index: number;
  explanation_en: string;
  explanation_fr: string;
  position: number;
  created_at: string;
  updated_at: string;
}

interface LessonRow {
  id: string;
  module_id: string;
  title_en: string;
  title_fr: string;
  duration_label: string;
  lesson_type: string;
  content_en: string;
  content_fr: string;
  video_url: string | null;
  code_language: string | null;
  code_starter_en: string | null;
  code_starter_fr: string | null;
  position: number;
  created_at: string;
  updated_at: string;
  quiz_questions?: QuizQuestionRow[] | null;
}

const COURSE_TREE_SELECT =
  "*, course_modules(*, course_lessons(*, quiz_questions(*)))";

function mapQuizQuestion(row: QuizQuestionRow): DbQuizQuestion {
  return {
    id: row.id,
    lessonId: row.lesson_id,
    questionEn: row.question_en,
    questionFr: row.question_fr,
    optionsEn: row.options_en ?? [],
    optionsFr: row.options_fr ?? [],
    correctIndex: row.correct_index,
    explanationEn: row.explanation_en,
    explanationFr: row.explanation_fr,
    position: row.position,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapLesson(row: LessonRow): DbCourseLesson {
  return {
    id: row.id,
    moduleId: row.module_id,
    titleEn: row.title_en,
    titleFr: row.title_fr,
    durationLabel: row.duration_label,
    lessonType: row.lesson_type as LessonType,
    contentEn: row.content_en,
    contentFr: row.content_fr,
    videoUrl: row.video_url,
    codeLanguage: row.code_language as CodeLanguage | null,
    codeStarterEn: row.code_starter_en,
    codeStarterFr: row.code_starter_fr,
    position: row.position,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    quizQuestions: [...(row.quiz_questions ?? [])]
      .sort((a, b) => a.position - b.position)
      .map(mapQuizQuestion),
  };
}

function mapModule(row: ModuleRow): DbCourseModule {
  return {
    id: row.id,
    courseId: row.course_id,
    titleEn: row.title_en,
    titleFr: row.title_fr,
    position: row.position,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lessons: (row.course_lessons ?? []).map(mapLesson),
  };
}

function mapCourse(row: CourseRow): DbCourse {
  return {
    id: row.id,
    slug: row.slug,
    titleEn: row.title_en,
    titleFr: row.title_fr,
    descriptionEn: row.description_en,
    descriptionFr: row.description_fr,
    longDescriptionEn: row.long_description_en,
    longDescriptionFr: row.long_description_fr,
    level: row.level as CourseLevel,
    language: row.language as CourseLanguageMode,
    status: row.status as CourseStatus,
    isFree: row.is_free,
    priceUsd: row.price_usd === null ? null : Number(row.price_usd),
    isAfrican: row.is_african,
    durationLabel: row.duration_label,
    gradientFrom: row.gradient_from,
    gradientTo: row.gradient_to,
    thumbnailUrl: row.thumbnail_url,
    tags: row.tags ?? [],
    outcomesEn: row.outcomes_en ?? [],
    outcomesFr: row.outcomes_fr ?? [],
    position: row.position,
    createdBy: row.created_by,
    tutorId: row.tutor_id ?? null,
    commissionRate: Number(row.commission_rate ?? 70),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    modules: (row.course_modules ?? []).map(mapModule),
  };
}

// ─── Public reads (anon/cookie client — RLS restricts to status='published') ─

export async function listPublishedCourses(supabase: SupabaseClient): Promise<DbCourse[]> {
  const { data, error } = await supabase
    .from("courses")
    .select(COURSE_TREE_SELECT)
    .eq("status", "published")
    .order("position", { ascending: true });

  if (error) throw error;
  return (data as CourseRow[] | null)?.map(mapCourse) ?? [];
}

export async function getPublishedCourseBySlug(
  supabase: SupabaseClient,
  slug: string,
): Promise<DbCourse | null> {
  const { data, error } = await supabase
    .from("courses")
    .select(COURSE_TREE_SELECT)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapCourse(data as CourseRow) : null;
}

/** Batch-fetches published courses by id — used to compose the dashboard's enrolled-courses view without N+1 requests. */
export async function getPublishedCoursesByIds(supabase: SupabaseClient, ids: string[]): Promise<DbCourse[]> {
  if (ids.length === 0) return [];

  const { data, error } = await supabase
    .from("courses")
    .select(COURSE_TREE_SELECT)
    .eq("status", "published")
    .in("id", ids);

  if (error) throw error;
  return (data as CourseRow[] | null)?.map(mapCourse) ?? [];
}

/**
 * Resolves a lesson to its parent course id + slug — lets lesson-scoped routes
 * (progress, notes) derive `courseId` server-side from just a `lessonId`,
 * without trusting a client-supplied value, and confirms the lesson belongs
 * to a published course (RLS already enforces this for the select itself).
 */
export async function getLessonCourseRef(
  supabase: SupabaseClient,
  lessonId: string,
): Promise<{ lessonId: string; courseId: string; courseSlug: string } | null> {
  const { data, error } = await supabase
    .from("course_lessons")
    .select("id, course_modules!inner(course_id, courses!inner(id, slug, status))")
    .eq("id", lessonId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const row = data as unknown as {
    id: string;
    course_modules: { course_id: string; courses: { id: string; slug: string; status: string } };
  };

  if (row.course_modules.courses.status !== "published") return null;

  return {
    lessonId: row.id,
    courseId: row.course_modules.course_id,
    courseSlug: row.course_modules.courses.slug,
  };
}

// ─── Admin reads (service-role client — bypasses RLS, sees every status) ─────

export async function listAllCourses(admin: SupabaseClient): Promise<DbCourse[]> {
  const { data, error } = await admin
    .from("courses")
    .select(COURSE_TREE_SELECT)
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as CourseRow[] | null)?.map(mapCourse) ?? [];
}

export async function listCoursesByTutor(admin: SupabaseClient, tutorId: string): Promise<DbCourse[]> {
  const { data, error } = await admin
    .from("courses")
    .select(COURSE_TREE_SELECT)
    .eq("tutor_id", tutorId)
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as CourseRow[] | null)?.map(mapCourse) ?? [];
}

export async function getCourseById(admin: SupabaseClient, id: string): Promise<DbCourse | null> {
  const { data, error } = await admin
    .from("courses")
    .select(COURSE_TREE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapCourse(data as CourseRow) : null;
}

export async function findCourseBySlug(admin: SupabaseClient, slug: string): Promise<DbCourse | null> {
  const { data, error } = await admin
    .from("courses")
    .select(COURSE_TREE_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapCourse(data as CourseRow) : null;
}

// ─── Admin writes ─────────────────────────────────────────────────────────────

const COURSE_COLUMNS = (input: CourseTreeInput, createdBy?: string | null) => ({
  slug: input.slug,
  title_en: input.titleEn,
  title_fr: input.titleFr,
  description_en: input.descriptionEn,
  description_fr: input.descriptionFr,
  long_description_en: input.longDescriptionEn,
  long_description_fr: input.longDescriptionFr,
  level: input.level,
  language: input.language,
  status: input.status,
  is_free: input.isFree,
  price_usd: input.isFree ? null : input.priceUsd,
  is_african: input.isAfrican,
  duration_label: input.durationLabel,
  gradient_from: input.gradientFrom,
  gradient_to: input.gradientTo,
  thumbnail_url: input.thumbnailUrl,
  tags: input.tags,
  outcomes_en: input.outcomesEn,
  outcomes_fr: input.outcomesFr,
  position: input.position,
  ...(createdBy !== undefined ? { created_by: createdBy } : {}),
  ...(input.tutorId !== undefined ? { tutor_id: input.tutorId } : {}),
  ...(input.commissionRate !== undefined ? { commission_rate: input.commissionRate } : {}),
});

/**
 * Replaces a course's entire content tree in one call: upserts the course row,
 * then drops and recreates every module/lesson beneath it. Keeps the admin
 * editor simple — it always submits the full tree rather than diffing nested
 * CRUD across three tables.
 */
export async function saveCourseTree(
  admin: SupabaseClient,
  input: CourseTreeInput,
  createdBy: string | null,
): Promise<DbCourse> {
  let courseId = input.id;

  if (courseId) {
    const { error } = await admin
      .from("courses")
      .update(COURSE_COLUMNS(input))
      .eq("id", courseId);
    if (error) throw error;
  } else {
    const { data, error } = await admin
      .from("courses")
      .insert(COURSE_COLUMNS(input, createdBy))
      .select("id")
      .single();
    if (error) throw error;
    courseId = data.id as string;
  }

  // Cascade delete clears course_lessons transitively via FK on delete cascade.
  const { error: deleteError } = await admin
    .from("course_modules")
    .delete()
    .eq("course_id", courseId);
  if (deleteError) throw deleteError;

  for (const moduleInput of input.modules) {
    const { data: moduleRow, error: moduleError } = await admin
      .from("course_modules")
      .insert({
        course_id: courseId,
        title_en: moduleInput.titleEn,
        title_fr: moduleInput.titleFr,
        position: moduleInput.position,
      })
      .select("id")
      .single();
    if (moduleError) throw moduleError;

    for (const lesson of moduleInput.lessons) {
      const { data: lessonRow, error: lessonError } = await admin
        .from("course_lessons")
        .insert({
          module_id: moduleRow.id as string,
          title_en: lesson.titleEn,
          title_fr: lesson.titleFr,
          duration_label: lesson.durationLabel,
          lesson_type: lesson.lessonType,
          content_en: lesson.contentEn,
          content_fr: lesson.contentFr,
          video_url: lesson.videoUrl,
          code_language: lesson.codeLanguage,
          code_starter_en: lesson.codeStarterEn || null,
          code_starter_fr: lesson.codeStarterFr || null,
          position: lesson.position,
        })
        .select("id")
        .single();
      if (lessonError) throw lessonError;

      if (lesson.quizQuestions.length > 0) {
        const { error: quizError } = await admin.from("quiz_questions").insert(
          lesson.quizQuestions.map((q, qi) => ({
            lesson_id: lessonRow.id as string,
            question_en: q.questionEn,
            question_fr: q.questionFr,
            options_en: q.optionsEn,
            options_fr: q.optionsFr,
            correct_index: q.correctIndex,
            explanation_en: q.explanationEn,
            explanation_fr: q.explanationFr,
            position: q.position ?? qi,
          })),
        );
        if (quizError) throw quizError;
      }
    }
  }

  const saved = await getCourseById(admin, courseId);
  if (!saved) throw new Error("course_not_found_after_save");
  return saved;
}

export async function deleteCourse(admin: SupabaseClient, id: string): Promise<void> {
  const { error } = await admin.from("courses").delete().eq("id", id);
  if (error) throw error;
}
