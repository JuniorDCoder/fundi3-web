#!/usr/bin/env node
// One-off bootstrap: seeds complete bilingual courses into the catalog.
//
//   node scripts/seed-courses/index.mjs
//
// Needs SUPABASE_SERVICE_ROLE_KEY (loaded from .env.local) — same service-role
// client used by lib/supabase/admin.ts. Safe to re-run: courses are matched by
// slug and skipped if they already exist (delete the row first to reseed).

import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

import { njangiOnSolana } from "./njangi-solana.mjs";
import { defiFundamentals } from "./defi-fundamentals.mjs";
import { nftsAndOwnership } from "./nft-ownership.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", "..", ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const COURSES = [njangiOnSolana, defiFundamentals, nftsAndOwnership];

async function insertCourse(course, position) {
  const { data: existing, error: existingError } = await admin
    .from("courses")
    .select("id")
    .eq("slug", course.slug)
    .maybeSingle();
  if (existingError) throw existingError;

  if (existing) {
    console.log(`↷ Skipping "${course.titleEn}" (slug "${course.slug}" already exists)`);
    return;
  }

  const { data: courseRow, error: courseError } = await admin
    .from("courses")
    .insert({
      slug: course.slug,
      title_en: course.titleEn,
      title_fr: course.titleFr,
      description_en: course.descriptionEn,
      description_fr: course.descriptionFr,
      long_description_en: course.longDescriptionEn,
      long_description_fr: course.longDescriptionFr,
      level: course.level,
      language: course.language,
      status: "published",
      is_free: true,
      price_usd: null,
      is_african: course.isAfrican ?? true,
      duration_label: course.durationLabel,
      gradient_from: course.gradientFrom,
      gradient_to: course.gradientTo,
      tags: course.tags,
      outcomes_en: course.outcomesEn,
      outcomes_fr: course.outcomesFr,
      position,
    })
    .select("id")
    .single();
  if (courseError) throw courseError;

  const courseId = courseRow.id;
  let lessonCount = 0;

  for (let mi = 0; mi < course.modules.length; mi++) {
    const moduleInput = course.modules[mi];
    const { data: moduleRow, error: moduleError } = await admin
      .from("course_modules")
      .insert({
        course_id: courseId,
        title_en: moduleInput.titleEn,
        title_fr: moduleInput.titleFr,
        position: mi,
      })
      .select("id")
      .single();
    if (moduleError) throw moduleError;

    for (let li = 0; li < moduleInput.lessons.length; li++) {
      const lesson = moduleInput.lessons[li];
      const { data: lessonRow, error: lessonError } = await admin
        .from("course_lessons")
        .insert({
          module_id: moduleRow.id,
          title_en: lesson.titleEn,
          title_fr: lesson.titleFr,
          duration_label: lesson.durationLabel,
          lesson_type: lesson.lessonType,
          content_en: lesson.contentEn,
          content_fr: lesson.contentFr,
          video_url: lesson.videoUrl ?? null,
          code_language: lesson.codeLanguage ?? null,
          code_starter_en: lesson.codeStarterEn ?? null,
          code_starter_fr: lesson.codeStarterFr ?? null,
          position: li,
        })
        .select("id")
        .single();
      if (lessonError) throw lessonError;
      lessonCount++;

      if (lesson.quizQuestions?.length) {
        const { error: quizError } = await admin.from("quiz_questions").insert(
          lesson.quizQuestions.map((q, qi) => ({
            lesson_id: lessonRow.id,
            question_en: q.questionEn,
            question_fr: q.questionFr,
            options_en: q.optionsEn,
            options_fr: q.optionsFr,
            correct_index: q.correctIndex,
            explanation_en: q.explanationEn,
            explanation_fr: q.explanationFr,
            position: qi,
          })),
        );
        if (quizError) throw quizError;
      }
    }
  }

  console.log(
    `✓ Seeded "${course.titleEn}" — ${course.modules.length} modules, ${lessonCount} lessons (slug: ${course.slug})`,
  );
}

const { data: existingCourses, error: countError } = await admin.from("courses").select("position").order("position", { ascending: false }).limit(1);
if (countError) throw countError;
let nextPosition = existingCourses?.length ? existingCourses[0].position + 1 : 0;

for (const course of COURSES) {
  await insertCourse(course, nextPosition);
  nextPosition++;
}

console.log("Done.");
