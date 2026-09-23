import React, { useState, useEffect } from "react";
import { 
  Bell, 
  BellRing, 
  BellOff, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Check, 
  Flame, 
  Info, 
  ExternalLink,
  Crown,
  RotateCcw,
  User
} from "lucide-react";
import { Locale, Quest, GenderTrack } from "../types";
import { translations } from "../i18n/translations";
import { 
  NotificationSettings, 
  loadNotificationSettings, 
  saveNotificationSettings, 
  isNotificationSupported, 
  getNotificationPermission, 
  requestNotificationPermission, 
  sendTestQuestNotification,
  sendQuestReminderNotification 
} from "../utils/notificationService";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  quests: Quest[];
  onShowToast: (msg: string) => void;
  genderTrack?: GenderTrack;
  onChangeGenderTrack?: (track: GenderTrack) => void;
  onResetGenderTrack?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  locale,
  quests,
  onShowToast,
  genderTrack = "male",
  onChangeGenderTrack,
  onResetGenderTrack,
}) => {
  const t = translations[locale];
  const isRtl = locale === "ar";

  const [settings, setSettings] = useState<NotificationSettings>(loadNotificationSettings);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default");
  const [isRequesting, setIsRequesting] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      setSettings(loadNotificationSettings());
      setPermission(getNotificationPermission());
      try {
        setIsInIframe(window.self !== window.top);
      } catch {
        setIsInIframe(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const supported = isNotificationSupported();
  const pendingQuests = quests.filter((q) => !q.completed);

  const handleToggle = async () => {
    if (!supported) {
      onShowToast(t.settings.unsupported);
      return;
    }

    if (!settings.enabled) {
      // User is enabling notifications
      setIsRequesting(true);
      const perm = await requestNotificationPermission();
      setPermission(perm);
      setIsRequesting(false);

      if (perm === "granted") {
        const updated = { ...settings, enabled: true };
        setSettings(updated);
        saveNotificationSettings(updated);
        onShowToast(t.settings.savedToast);
        // Send immediate welcoming confirmation test
        sendTestQuestNotification(locale);
      } else if (perm === "denied") {
        const updated = { ...settings, enabled: false };
        setSettings(updated);
        saveNotificationSettings(updated);
        onShowToast(t.settings.deniedHelp);
      }
    } else {
      // User is disabling
      const updated = { ...settings, enabled: false };
      setSettings(updated);
      saveNotificationSettings(updated);
      onShowToast(locale === "ar" ? "تم إيقاف التنبيهات" : "Notifications disabled");
    }
  };

  const handleTimeSlotChange = (slot: "morning" | "evening" | "custom") => {
    const updated: NotificationSettings = {
      ...settings,
      timeSlot: slot,
      customTime: slot === "morning" ? "09:00" : slot === "evening" ? "20:00" : settings.customTime,
    };
    setSettings(updated);
    saveNotificationSettings(updated);
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...settings, customTime: e.target.value };
    setSettings(updated);
    saveNotificationSettings(updated);
  };

  const handleStreakAlertToggle = () => {
    const updated = { ...settings, streakAlert: !settings.streakAlert };
    setSettings(updated);
    saveNotificationSettings(updated);
  };

  const handleSendTest = () => {
    if (!supported) {
      onShowToast(t.settings.unsupported);
      return;
    }

    if (permission !== "granted") {
      onShowToast(t.settings.testFailed);
      return;
    }

    const success = sendQuestReminderNotification(quests, locale);
    if (!success) {
      // If no pending quests or other check, fallback to general test
      sendTestQuestNotification(locale);
    }
    onShowToast(t.settings.testSentSuccess);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-[#18181b] border border-[#27272a] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#27272a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#22d3ee]/10 border border-[#22d3ee]/30 flex items-center justify-center shadow-lg shadow-[#22d3ee]/10 text-[#22d3ee] shrink-0">
              <BellRing className="w-5 h-5 text-[#22d3ee]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#f4f4f5] font-display">
                {t.settings.title}
              </h2>
              <p className="text-xs text-[#a1a1aa] mt-0.5">
                {t.settings.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#71717a] hover:text-[#f4f4f5] hover:bg-[#111113] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Aesthetic Track & Switcher */}
        <div className="bg-[#111113] rounded-2xl p-4 sm:p-5 border border-[#27272a] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                genderTrack === "female"
                  ? "bg-[#ec4899]/15 border-[#ec4899]/40 text-[#ec4899]"
                  : "bg-[#22d3ee]/15 border-[#22d3ee]/40 text-[#22d3ee]"
              }`}>
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#f4f4f5]">
                  {isRtl ? "مسار التناسق والجمال النشط" : "Active Aesthetic Track"}
                </h3>
                <p className="text-[11px] text-[#a1a1aa]">
                  {genderTrack === "female" 
                    ? (isRtl ? "Aura Fem: جمال أنثوي، بشرة زجاجية، ونحت ملامح" : "Aura Fem: Dermal Glow, Zygomatic Sculpt & Harmony")
                    : (isRtl ? "Aura Max: عناية الرجل، خط الفك، وهندسة العظام" : "Aura Max: Mandibular Ramus, Hunter Eyes & Debloat")
                  }
                </p>
              </div>
            </div>

            {onResetGenderTrack && (
              <button
                onClick={onResetGenderTrack}
                title={isRtl ? "إعادة تعيين وبدء بوابة الاختيار" : "Reset & Return to Gateway"}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-[#f4f4f5] border border-[#27272a] text-[11px] font-semibold transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isRtl ? "إعادة تعيين" : "Reset Track"}</span>
              </button>
            )}
          </div>

          {onChangeGenderTrack && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#27272a]">
              <button
                onClick={() => onChangeGenderTrack("male")}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  genderTrack === "male"
                    ? "bg-[#22d3ee]/15 border-[#22d3ee]/60 text-[#22d3ee] shadow-sm shadow-[#22d3ee]/20"
                    : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#f4f4f5] hover:border-[#3f3f46]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#22d3ee]" />
                <span>{isRtl ? "Aura Max (رجالي)" : "Aura Max (Men)"}</span>
              </button>

              <button
                onClick={() => onChangeGenderTrack("female")}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  genderTrack === "female"
                    ? "bg-[#ec4899]/15 border-[#ec4899]/60 text-[#ec4899] shadow-sm shadow-[#ec4899]/20"
                    : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#f4f4f5] hover:border-[#3f3f46]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
                <span>{isRtl ? "Aura Fem (نسائي)" : "Aura Fem (Women)"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Master Toggle Card */}
        <div className="bg-[#111113] rounded-2xl p-5 border border-[#27272a] space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                settings.enabled 
                  ? "bg-[#22d3ee]/20 text-[#22d3ee] border border-[#22d3ee]/40 shadow-sm shadow-[#22d3ee]/20" 
                  : "bg-[#18181b] text-[#71717a] border border-[#27272a]"
              }`}>
                {settings.enabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#f4f4f5]">
                  {t.settings.enableToggle}
                </h3>
                <p className="text-xs text-[#a1a1aa] mt-0.5">
                  {t.settings.enableToggleDesc}
                </p>
              </div>
            </div>

            {/* Toggle Switch Button */}
            <button
              onClick={handleToggle}
              disabled={isRequesting}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                settings.enabled ? "bg-gradient-to-r from-[#6366f1] to-[#22d3ee] shadow-[0_0_12px_rgba(34,211,238,0.4)]" : "bg-[#27272a]"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-[#09090b] shadow-lg ring-0 transition duration-200 ease-in-out ${
                  settings.enabled
                    ? isRtl ? "-translate-x-5" : "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Browser Permission State Bar */}
          <div className="pt-3 border-t border-[#27272a] flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-[#a1a1aa] font-medium">
              {t.settings.permissionStatus}:
            </span>

            {permission === "granted" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.settings.granted}</span>
              </span>
            )}

            {permission === "denied" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 font-bold text-[11px]">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>{t.settings.denied}</span>
              </span>
            )}

            {permission === "default" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#22d3ee]/15 border border-[#22d3ee]/30 text-[#22d3ee] font-bold text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#22d3ee]" />
                <span>{t.settings.defaultPermission}</span>
              </span>
            )}

            {permission === "unsupported" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-[#71717a] font-bold text-[11px]">
                <Info className="w-3.5 h-3.5 text-[#71717a]" />
                <span>{t.settings.unsupported}</span>
              </span>
            )}
          </div>

          {/* Denied Help Banner */}
          {permission === "denied" && (
            <div className="bg-rose-500/10 rounded-xl p-3 border border-rose-500/20 text-xs text-rose-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {t.settings.deniedHelp}
              </p>
            </div>
          )}

          {/* Iframe Notice for Preview Environments */}
          {isInIframe && (
            <div className="bg-[#18181b] rounded-xl p-3 border border-[#27272a] text-[11px] text-[#a1a1aa] flex items-start gap-2">
              <Info className="w-4 h-4 text-[#22d3ee] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {t.settings.iframeNotice}
              </p>
            </div>
          )}
        </div>

        {/* Schedule & Timing Options */}
        {settings.enabled && (
          <div className="bg-[#111113] rounded-2xl p-5 border border-[#27272a] space-y-4 animate-in fade-in duration-300">
            <div>
              <h3 className="text-sm font-bold text-[#f4f4f5]">
                {t.settings.reminderSchedule}
              </h3>
              <p className="text-xs text-[#a1a1aa] mt-0.5">
                {t.settings.notificationsDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleTimeSlotChange("morning")}
                className={`p-3 rounded-xl border text-xs font-bold transition-all text-start flex flex-col gap-1 ${
                  settings.timeSlot === "morning"
                    ? "bg-[#22d3ee]/15 border-[#22d3ee]/50 text-[#22d3ee] shadow-sm shadow-[#22d3ee]/10"
                    : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#f4f4f5]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#f4f4f5] font-semibold">{isRtl ? "صباحاً" : "Morning"}</span>
                  {settings.timeSlot === "morning" && <Check className="w-3.5 h-3.5 text-[#22d3ee]" />}
                </div>
                <span className="text-[11px] font-mono text-[#a1a1aa]">09:00 AM</span>
              </button>

              <button
                type="button"
                onClick={() => handleTimeSlotChange("evening")}
                className={`p-3 rounded-xl border text-xs font-bold transition-all text-start flex flex-col gap-1 ${
                  settings.timeSlot === "evening"
                    ? "bg-[#22d3ee]/15 border-[#22d3ee]/50 text-[#22d3ee] shadow-sm shadow-[#22d3ee]/10"
                    : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#f4f4f5]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#f4f4f5] font-semibold">{isRtl ? "مساءً" : "Evening"}</span>
                  {settings.timeSlot === "evening" && <Check className="w-3.5 h-3.5 text-[#22d3ee]" />}
                </div>
                <span className="text-[11px] font-mono text-[#a1a1aa]">08:00 PM</span>
              </button>

              <button
                type="button"
                onClick={() => handleTimeSlotChange("custom")}
                className={`p-3 rounded-xl border text-xs font-bold transition-all text-start flex flex-col gap-1 ${
                  settings.timeSlot === "custom"
                    ? "bg-[#22d3ee]/15 border-[#22d3ee]/50 text-[#22d3ee] shadow-sm shadow-[#22d3ee]/10"
                    : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#f4f4f5]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#f4f4f5] font-semibold">{t.settings.timeCustom}</span>
                  {settings.timeSlot === "custom" && <Check className="w-3.5 h-3.5 text-[#22d3ee]" />}
                </div>
                <span className="text-[11px] font-mono text-[#a1a1aa]">{settings.customTime}</span>
              </button>
            </div>

            {settings.timeSlot === "custom" && (
              <div className="flex items-center gap-3 pt-2">
                <Clock className="w-4 h-4 text-[#22d3ee]" />
                <label className="text-xs text-[#a1a1aa] font-medium">{t.settings.timeCustom}:</label>
                <input
                  type="time"
                  value={settings.customTime}
                  onChange={handleCustomTimeChange}
                  className="bg-[#18181b] border border-[#27272a] rounded-xl px-3 py-1.5 text-xs text-[#f4f4f5] font-mono focus:border-[#22d3ee] focus:outline-none"
                />
              </div>
            )}

            {/* Streak Preservation Switch */}
            <div className="pt-3 border-t border-[#27272a] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-[#fb923c]" />
                <div>
                  <h4 className="text-xs font-bold text-[#f4f4f5]">
                    {t.settings.streakAlertTitle}
                  </h4>
                  <p className="text-[11px] text-[#a1a1aa]">
                    {t.settings.streakAlertDesc}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.streakAlert}
                onChange={handleStreakAlertToggle}
                className="w-4 h-4 accent-[#22d3ee] rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Real-time Preview of Notification Card */}
        <div className="bg-[#111113] rounded-2xl p-4 sm:p-5 border border-[#27272a] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#22d3ee]" />
              {t.settings.pendingPreviewTitle}
            </span>
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-[#22d3ee]/15 text-[#22d3ee] border border-[#22d3ee]/30">
              {pendingQuests.length} {isRtl ? "مهمة متبقية" : "Pending"}
            </span>
          </div>

          {/* Sample Notification Bubble */}
          <div className="bg-[#18181b] rounded-2xl p-3.5 border border-[#27272a] flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#22d3ee] flex items-center justify-center text-[#09090b] font-black text-xs shrink-0 shadow-md shadow-[#22d3ee]/20">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-[#f4f4f5] truncate font-display">
                  {isRtl ? `تذكير أورا ماكس: لديك ${pendingQuests.length} مهام معلقة` : `AURA MAX: ${pendingQuests.length} pending daily quests`}
                </span>
                <span className="text-[10px] text-[#71717a] font-mono">now</span>
              </div>
              <p className="text-[11px] text-[#a1a1aa] mt-1 leading-relaxed line-clamp-2">
                {pendingQuests.length > 0
                  ? pendingQuests.slice(0, 3).map((q) => q.title[locale]).join(" • ")
                  : t.settings.noPending}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleSendTest}
            disabled={!supported || permission !== "granted"}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-[#a1a1aa] bg-[#111113] hover:bg-[#27272a] border border-[#27272a] hover:border-[#22d3ee]/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#22d3ee]" />
            <span>{t.settings.sendTest}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-[#6366f1] to-[#22d3ee] hover:opacity-95 text-[#09090b] shadow-lg shadow-[#22d3ee]/25 transition-all cursor-pointer ml-auto"
          >
            {t.settings.saveButton}
          </button>
        </div>
      </div>
    </div>
  );
};
