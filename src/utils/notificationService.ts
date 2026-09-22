import { Quest, Locale } from "../types";

export interface NotificationSettings {
  enabled: boolean;
  timeSlot: "morning" | "evening" | "custom";
  customTime: string; // "HH:MM"
  streakAlert: boolean;
  lastNotifiedDate?: string;
}

const STORAGE_KEY = "aura_max_notification_settings";

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: false,
  timeSlot: "morning",
  customTime: "09:00",
  streakAlert: true,
};

export const isNotificationSupported = (): boolean => {
  return typeof window !== "undefined" && "Notification" in window;
};

export const getNotificationPermission = (): NotificationPermission | "unsupported" => {
  if (!isNotificationSupported()) return "unsupported";
  return Notification.permission;
};

export const loadNotificationSettings = (): NotificationSettings => {
  if (typeof window === "undefined") return DEFAULT_NOTIFICATION_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_NOTIFICATION_SETTINGS;
    return { ...DEFAULT_NOTIFICATION_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_NOTIFICATION_SETTINGS;
  }
};

export const saveNotificationSettings = (settings: NotificationSettings): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error("Failed to save notification settings", err);
  }
};

export const requestNotificationPermission = async (): Promise<NotificationPermission | "unsupported"> => {
  if (!isNotificationSupported()) return "unsupported";

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.warn("Notification.requestPermission error (might be in an iframe):", err);
    return Notification.permission || "default";
  }
};

export const sendBrowserNotification = (
  title: string,
  options: NotificationOptions = {}
): boolean => {
  if (!isNotificationSupported()) return false;
  if (Notification.permission !== "granted") return false;

  try {
    const defaultIcon = typeof window !== "undefined" ? `${window.location.origin}/favicon.svg` : "/favicon.svg";
    const notification = new Notification(title, {
      icon: defaultIcon,
      badge: defaultIcon,
      tag: "aura-max-quest-reminder",
      ...options,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return true;
  } catch (err) {
    console.error("Error dispatching browser notification:", err);
    return false;
  }
};

export const sendQuestReminderNotification = (
  quests: Quest[],
  locale: Locale
): boolean => {
  const pending = quests.filter((q) => !q.completed);
  if (pending.length === 0) return false;

  const isAr = locale === "ar";
  const title = isAr
    ? `تذكير أورا ماكس: لديك ${pending.length} مهام معلقة اليوم ⚡`
    : `AURA MAX: You have ${pending.length} pending quests today ⚡`;

  const topQuests = pending
    .slice(0, 3)
    .map((q, i) => `${i + 1}. ${q.title[locale]}`)
    .join(" • ");

  const remainingMore = pending.length > 3 ? (isAr ? ` و +${pending.length - 3} أخرى` : ` and +${pending.length - 3} more`) : "";

  const body = isAr
    ? `حافظ على سلسلة التوهج والـ XP! البروتوكولات المتبقية: ${topQuests}${remainingMore}`
    : `Protect your streak & XP! Next up: ${topQuests}${remainingMore}`;

  return sendBrowserNotification(title, {
    body,
    tag: "aura-max-daily-pending-quests",
  });
};

export const sendTestQuestNotification = (locale: Locale): boolean => {
  const isAr = locale === "ar";
  const title = isAr
    ? "أورا ماكس: تجربة التنبيهات ناجحة! 🚀"
    : "AURA MAX: Notification Test Successful! 🚀";

  const body = isAr
    ? "ستصلك تنبيهات دورية لتذكيرك بمهام الـ Looksmaxing والبروتوكولات اليومية المعلقة."
    : "You will receive daily browser alerts to complete your pending aesthetic quests and preserve your streak.";

  return sendBrowserNotification(title, {
    body,
    tag: "aura-max-test-notification",
  });
};
