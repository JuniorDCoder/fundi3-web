/**
 * Minimal client for Expo's push notification API. No SDK needed — Expo's
 * push service is a plain HTTPS endpoint.
 * https://docs.expo.dev/push-notifications/sending-notifications/
 */

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

export interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  sound?: "default" | null;
}

interface ExpoPushTicket {
  status: "ok" | "error";
  id?: string;
  message?: string;
  details?: { error?: string };
}

export interface ExpoPushResult {
  token: string;
  ok: boolean;
  /** Set when Expo reports the token is no longer valid and should be pruned. */
  deviceNotRegistered: boolean;
}

/**
 * Sends a batch of push notifications via Expo's push API. Best-effort —
 * never throws. Returns per-token results so callers can prune stale tokens.
 */
export async function sendExpoPushNotifications(messages: ExpoPushMessage[]): Promise<ExpoPushResult[]> {
  if (messages.length === 0) return [];

  try {
    const res = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
      },
      body: JSON.stringify(messages.map((m) => ({ ...m, sound: m.sound ?? "default" }))),
    });

    const json = await res.json().catch(() => null);
    const tickets: ExpoPushTicket[] = json?.data ?? [];

    return messages.map((m, i) => {
      const ticket = tickets[i];
      const deviceNotRegistered = ticket?.status === "error" && ticket?.details?.error === "DeviceNotRegistered";
      return { token: m.to, ok: ticket?.status === "ok", deviceNotRegistered };
    });
  } catch (err) {
    console.error("[push:expo] failed to send push notifications:", err);
    return messages.map((m) => ({ token: m.to, ok: false, deviceNotRegistered: false }));
  }
}
