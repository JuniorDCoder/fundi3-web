import type { Lang } from "@/lib/i18n";

export function parseLang(value: unknown): Lang {
  return value === "fr" ? "fr" : "en";
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const messages = {
  invalidEmail: {
    en: "Please enter a valid email address.",
    fr: "Veuillez entrer une adresse email valide.",
  },
  weakPassword: {
    en: "Password must be at least 8 characters.",
    fr: "Le mot de passe doit contenir au moins 8 caractères.",
  },
  emailInUse: {
    en: "An account with this email already exists. Try signing in instead.",
    fr: "Un compte existe déjà avec cet email. Essayez de vous connecter.",
  },
  signupFailed: {
    en: "We couldn't create your account. Please try again.",
    fr: "Impossible de créer votre compte. Veuillez réessayer.",
  },
  emailSendFailed: {
    en: "Your account was created but we couldn't send the verification email. Use \"Resend\" to try again.",
    fr: "Votre compte a été créé mais l'email de vérification n'a pas pu être envoyé. Utilisez « Renvoyer » pour réessayer.",
  },
  invalidCode: {
    en: "That code is invalid or has expired. Request a new one and try again.",
    fr: "Ce code est invalide ou a expiré. Demandez-en un nouveau et réessayez.",
  },
  invalidCredentials: {
    en: "Incorrect email or password.",
    fr: "Email ou mot de passe incorrect.",
  },
  missingFields: {
    en: "Please fill in all required fields.",
    fr: "Veuillez remplir tous les champs requis.",
  },
  notAuthenticated: {
    en: "You must be signed in to do that.",
    fr: "Vous devez être connecté pour faire cela.",
  },
  invalidRefreshToken: {
    en: "Your session has expired. Please sign in again.",
    fr: "Votre session a expiré. Veuillez vous reconnecter.",
  },
  serverError: {
    en: "Something went wrong. Please try again.",
    fr: "Une erreur est survenue. Veuillez réessayer.",
  },
} as const;

export type MessageKey = keyof typeof messages;

export function authMessage(key: MessageKey, lang: Lang): string {
  return messages[key][lang];
}
