import type { Lang } from "@/lib/i18n";

const messages = {
  notAdminAccount: {
    en: "This account doesn't have admin access.",
    fr: "Ce compte n'a pas accès à l'administration.",
  },
  notAuthorized: {
    en: "You don't have permission to manage courses.",
    fr: "Vous n'avez pas la permission de gérer les cours.",
  },
  invalidCourse: {
    en: "Please check the course details — some required fields are missing or invalid.",
    fr: "Veuillez vérifier les détails du cours — certains champs requis sont manquants ou invalides.",
  },
  slugInUse: {
    en: "Another course already uses that slug. Choose a different one.",
    fr: "Un autre cours utilise déjà ce slug. Choisissez-en un autre.",
  },
  courseNotFound: {
    en: "That course doesn't exist or was already removed.",
    fr: "Ce cours n'existe pas ou a déjà été supprimé.",
  },
  lessonNotFound: {
    en: "That lesson doesn't exist or was already removed.",
    fr: "Cette leçon n'existe pas ou a déjà été supprimée.",
  },
  enrollmentFailed: {
    en: "We couldn't enroll you in this course. Please try again.",
    fr: "Impossible de vous inscrire à ce cours. Veuillez réessayer.",
  },
  progressUpdateFailed: {
    en: "We couldn't save your progress. Please try again.",
    fr: "Impossible d'enregistrer votre progression. Veuillez réessayer.",
  },
  noteSaveFailed: {
    en: "We couldn't save your note. Please try again.",
    fr: "Impossible d'enregistrer votre note. Veuillez réessayer.",
  },
  serverError: {
    en: "Something went wrong. Please try again.",
    fr: "Une erreur est survenue. Veuillez réessayer.",
  },
} as const;

export type CourseMessageKey = keyof typeof messages;

export function courseMessage(key: CourseMessageKey, lang: Lang): string {
  return messages[key][lang];
}
