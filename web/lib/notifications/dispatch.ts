import type { SupabaseClient } from "@supabase/supabase-js";
import type { Lang } from "@/lib/i18n";
import { getNotificationPreferences } from "@/lib/user/preferences";
import { sendMail } from "@/lib/email/mailer";
import { walletSendEmail, walletReceiveEmail } from "@/lib/email/templates";
import { sendExpoPushNotifications } from "@/lib/push/expo";
import { getPushTokensForUser, removePushTokens } from "@/lib/push/tokens";
import { buildMessages } from "./messages";
import type { NotificationEvent } from "./types";

/**
 * Single entry point for notifying a user of a wallet/certificate event:
 * records an in-app notification, sends a push notification (if the user has
 * a registered device), and — for wallet events — sends an email if the user
 * hasn't opted out. Every step is best-effort and never throws, matching the
 * non-blocking notification pattern used elsewhere (e.g. certificate emails).
 */
export async function notifyUser(
  admin: SupabaseClient,
  userId: string,
  userEmail: string | null,
  event: NotificationEvent,
  lang: Lang = "en",
): Promise<void> {
  const messages = buildMessages(event);

  try {
    const { error } = await admin.from("notifications").insert({
      user_id: userId,
      type: event.type,
      title_en: messages.titleEn,
      title_fr: messages.titleFr,
      body_en: messages.bodyEn,
      body_fr: messages.bodyFr,
      data: event,
    });
    if (error) throw error;
  } catch (err) {
    console.error("[notify] failed to insert in-app notification:", err);
  }

  try {
    const tokens = await getPushTokensForUser(admin, userId);
    if (tokens.length > 0) {
      const title = lang === "fr" ? messages.titleFr : messages.titleEn;
      const body = lang === "fr" ? messages.bodyFr : messages.bodyEn;
      const results = await sendExpoPushNotifications(
        tokens.map((token) => ({ to: token, title, body, data: { type: event.type } })),
      );
      const stale = results.filter((r) => r.deviceNotRegistered).map((r) => r.token);
      if (stale.length > 0) await removePushTokens(admin, stale);
    }
  } catch (err) {
    console.error("[notify] failed to send push notification:", err);
  }

  if (event.type === "certificate_minted" || !userEmail) return;

  try {
    const prefs = await getNotificationPreferences(admin, userId);
    if (!prefs.emailWalletActivity) return;

    const template =
      event.type === "wallet_send"
        ? walletSendEmail(lang, event.amountSol, event.recipient, event.explorerUrl)
        : walletReceiveEmail(lang, event.amountSol, event.sender, event.explorerUrl);

    await sendMail({ to: userEmail, ...template });
  } catch (err) {
    console.error("[notify] failed to send wallet activity email:", err);
  }
}
