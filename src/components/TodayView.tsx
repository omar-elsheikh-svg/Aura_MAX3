import React, { useState } from "react";
import { 
  Locale, 
  Quest, 
  GenderTrack, 
  UserProfile 
} from "../types";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  Flame, 
  Sun, 
  Moon, 
  Droplets, 
  Plus, 
  Check, 
  Info,
  Layers,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { translations } from "../i18n/translations";

interface TodayViewProps {
  locale: Locale;
  genderTrack?: GenderTrack;
  userProfile: UserProfile;
  quests: Quest[];
  onToggleQuest: (questId: string) => void;
  onQuickAddCustomQuest?: (title: string, category: Quest["category"]) => void;
  onShowToast: (msg: string) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  locale,
  genderTrack = "male",
  userProfile,
  quests,
  onToggleQuest,
  onQuickAddCustomQuest,
  onShowToast,
}) => {
  const t = translations[locale];
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeFilter, setActiveFilter] = useState<"all" | "morning" | "evening">("all");
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customTitle, setCustomTitle] = useState("");

  const completedCount = quests.filter((q) => q.completed).length;
  const totalCount = quests.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredQuests = quests.filter((q) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "morning") return q.category === "morning" || q.category === "anytime";
    if (activeFilter === "evening") return q.category === "evening";
    return true;
  });

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    if (onQuickAddCustomQuest) {
      onQuickAddCustomQuest(customTitle.trim(), "anytime");
      setCustomTitle("");
      setShowAddCustom(false);
      onShowToast(isRtl ? "تمت إضافة العادة إلى مهام اليوم" : "Custom quest added to Today's protocol");
    }
  };

  return (
    <div 
      className="max-w-4xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. Header & Progress Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111318] border border-[#252A33] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#42E8FF] uppercase tracking-wider mb-1">
              <Sun className="w-3.5 h-3.5" />
              <span>{isRtl ? "بروتوكول اليوم" : "Today's Execution Protocol"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] font-display">
              {isRtl ? "المهام والروتين اليومي" : "Daily Quests & Routine"}
            </h1>
            <p className="text-xs text-[#A5AEBC] mt-0.5">
              {isRtl
                ? "أكمل خطواتك اليومية لترسيخ عادات التحول وحماية سلسلة الانضباط."
                : "Complete each action to reinforce sustainable habits and protect your streak."}
            </p>
          </div>

          <div className="text-start sm:text-end shrink-0">
            <div className="text-2xl font-black text-[#42E8FF] font-display">
              {completedCount} / {totalCount}
            </div>
            <div className="text-[11px] text-[#A5AEBC]">
              {progressPercent}% {isRtl ? "إنجاز اليوم" : "completed"}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#171A21] h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#42E8FF] to-[#38BDF8] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. Filter Tabs & Custom Add Button */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#111318] border border-[#252A33]">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeFilter === "all" ? "bg-[#171A21] text-[#42E8FF]" : "text-[#A5AEBC] hover:text-[#F4F7FA]"
            }`}
          >
            {isRtl ? "كل المهام" : "All Quests"}
          </button>
          <button
            onClick={() => setActiveFilter("morning")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeFilter === "morning" ? "bg-[#171A21] text-[#42E8FF]" : "text-[#A5AEBC] hover:text-[#F4F7FA]"
            }`}
          >
            {isRtl ? "الصباح" : "Morning"}
          </button>
          <button
            onClick={() => setActiveFilter("evening")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeFilter === "evening" ? "bg-[#171A21] text-[#42E8FF]" : "text-[#A5AEBC] hover:text-[#F4F7FA]"
            }`}
          >
            {isRtl ? "المساء" : "Evening"}
          </button>
        </div>

        <button
          onClick={() => setShowAddCustom(!showAddCustom)}
          className="px-3.5 py-1.5 rounded-xl bg-[#111318] hover:bg-[#171A21] border border-[#252A33] text-xs font-semibold text-[#A5AEBC] hover:text-[#F4F7FA] flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#42E8FF]" />
          <span>{isRtl ? "إضافة عادة" : "Add Habit"}</span>
        </button>
      </div>

      {/* Optional Custom Quest Input */}
      {showAddCustom && (
        <form onSubmit={handleAddCustom} className="p-4 rounded-2xl bg-[#111318] border border-[#42E8FF]/30 flex gap-2">
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder={isRtl ? "اسم العادة (مثال: شرب 500 مل ماء على الريق)" : "Habit name (e.g. 500ml cold water upon waking)"}
            className="flex-1 px-3 py-2 rounded-xl bg-[#171A21] border border-[#252A33] text-xs text-[#F4F7FA] focus:outline-none focus:border-[#42E8FF]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#42E8FF] text-[#08090C] text-xs font-bold hover:bg-[#38BDF8] cursor-pointer"
          >
            {isRtl ? "إضافة" : "Add"}
          </button>
        </form>
      )}

      {/* 3. Quest Cards Grid (Section 19: Title, Why this matters, Duration, XP, Complete Action) */}
      <div className="space-y-3">
        {filteredQuests.map((quest) => (
          <div
            key={quest.id}
            className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              quest.completed
                ? "bg-[#111318]/50 border-[#252A33] opacity-75"
                : "bg-[#111318] border-[#252A33] hover:border-[#42E8FF]/30"
            }`}
          >
            <div className="flex items-start gap-3.5">
              <button
                onClick={() => onToggleQuest(quest.id)}
                className="mt-0.5 cursor-pointer text-[#6B7484] hover:text-[#42E8FF] transition-colors focus-visible:outline-none"
                aria-label={quest.completed ? "Mark incomplete" : "Mark complete"}
              >
                {quest.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-bold ${quest.completed ? "text-[#6B7484] line-through" : "text-[#F4F7FA]"}`}>
                    {quest.title[locale]}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#171A21] text-[#A5AEBC] border border-[#252A33]">
                    {quest.category}
                  </span>
                </div>

                {/* Why this matters (Section 19) */}
                <p className="text-xs text-[#A5AEBC] leading-relaxed">
                  {quest.description[locale]}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-[#6B7484] pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#42E8FF]" />
                    <span>{quest.durationMinutes || 4} min</span>
                  </span>
                  <span>·</span>
                  <span className="text-[#42E8FF] font-bold font-mono">
                    +{quest.xp} XP
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action toggle button */}
            <div className="shrink-0 self-end sm:self-center">
              <button
                onClick={() => onToggleQuest(quest.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  quest.completed
                    ? "bg-[#171A21] text-[#A5AEBC] hover:bg-[#1E232E]"
                    : "bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] shadow-[0_0_15px_rgba(66,232,255,0.2)]"
                }`}
              >
                {quest.completed ? (isRtl ? "تمت المهمة ✓" : "Done ✓") : (isRtl ? "إتمام" : "Complete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
