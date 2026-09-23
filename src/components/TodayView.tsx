import React, { useState } from "react";
import { Locale, GenderTrack, Quest, UserProfile } from "../types";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  Plus, 
  Calendar,
  Check, 
  Flame,
  Sun,
  Moon
} from "lucide-react";

interface TodayViewProps {
  locale: Locale;
  genderTrack: GenderTrack;
  userProfile?: UserProfile;
  quests: Quest[];
  onToggleQuest: (questId: string) => void;
  onQuickAddCustomQuest?: (title: string, category: "morning" | "evening" | "anytime") => void;
  onShowToast: (message: string) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  locale,
  quests,
  onToggleQuest,
  onQuickAddCustomQuest,
  onShowToast,
}) => {
  const isRtl = locale === "ar";
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
      className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. Header & Progress Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#18181b] border border-[#27272a] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#22d3ee] uppercase tracking-wider mb-1">
              <Sun className="w-3.5 h-3.5" />
              <span>{isRtl ? "بروتوكول اليوم" : "Today's Execution Protocol"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f4f4f5] font-display">
              {isRtl ? "المهام والروتين اليومي" : "Daily Quests & Routine"}
            </h1>
            <p className="text-xs text-[#a1a1aa] mt-0.5">
              {isRtl
                ? "أكمل خطواتك اليومية لترسيخ عادات التحول وحماية سلسلة الانضباط."
                : "Complete each action to reinforce sustainable habits and protect your streak."}
            </p>
          </div>

          <div className="text-start sm:text-end shrink-0">
            <div className="text-2xl font-black text-[#22d3ee] font-display">
              {completedCount} / {totalCount}
            </div>
            <div className="text-[11px] text-[#a1a1aa]">
              {progressPercent}% {isRtl ? "إنجاز اليوم" : "completed"}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#27272a] h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#6366f1] to-[#22d3ee] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. Filter Tabs & Custom Add Button */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#18181b] border border-[#27272a]">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeFilter === "all" ? "bg-[#27272a] text-[#22d3ee]" : "text-[#a1a1aa] hover:text-[#f4f4f5]"
            }`}
          >
            {isRtl ? "كل المهام" : "All Quests"}
          </button>
          <button
            onClick={() => setActiveFilter("morning")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeFilter === "morning" ? "bg-[#27272a] text-[#22d3ee]" : "text-[#a1a1aa] hover:text-[#f4f4f5]"
            }`}
          >
            {isRtl ? "الصباح" : "Morning"}
          </button>
          <button
            onClick={() => setActiveFilter("evening")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeFilter === "evening" ? "bg-[#27272a] text-[#22d3ee]" : "text-[#a1a1aa] hover:text-[#f4f4f5]"
            }`}
          >
            {isRtl ? "المساء" : "Evening"}
          </button>
        </div>

        <button
          onClick={() => setShowAddCustom(!showAddCustom)}
          className="px-3.5 py-1.5 rounded-xl bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-semibold text-[#a1a1aa] hover:text-[#f4f4f5] flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#22d3ee]" />
          <span>{isRtl ? "إضافة عادة" : "Add Habit"}</span>
        </button>
      </div>

      {/* Optional Custom Quest Input */}
      {showAddCustom && (
        <form onSubmit={handleAddCustom} className="p-4 rounded-2xl bg-[#18181b] border border-[#22d3ee]/40 flex gap-2">
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder={isRtl ? "اسم العادة (مثال: شرب 500 مل ماء على الريق)" : "Habit name (e.g. 500ml cold water upon waking)"}
            className="flex-1 px-3 py-2 rounded-xl bg-[#111113] border border-[#27272a] text-xs text-[#f4f4f5] focus:outline-none focus:border-[#22d3ee]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#22d3ee] text-[#09090b] text-xs font-bold hover:opacity-95 cursor-pointer"
          >
            {isRtl ? "إضافة" : "Add"}
          </button>
        </form>
      )}

      {/* 3. Quest Cards Grid */}
      <div className="space-y-3">
        {filteredQuests.map((quest) => (
          <div
            key={quest.id}
            className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              quest.completed
                ? "bg-[#18181b]/50 border-[#27272a] opacity-75"
                : "bg-[#18181b] border-[#27272a] hover:border-[#22d3ee]/35"
            }`}
            style={{
              borderInlineStartWidth: "3px",
              borderInlineStartColor: quest.completed ? "#27272a" : "#6366f1",
            }}
          >
            <div className="flex items-start gap-3.5">
              <button
                onClick={() => onToggleQuest(quest.id)}
                className="mt-0.5 cursor-pointer text-[#71717a] hover:text-[#22d3ee] transition-colors focus-visible:outline-none"
                aria-label={quest.completed ? "Mark incomplete" : "Mark complete"}
              >
                {quest.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-bold ${quest.completed ? "text-[#71717a] line-through" : "text-[#f4f4f5]"}`}>
                    {quest.title[locale]}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#111113] text-[#a1a1aa] border border-[#27272a]">
                    {quest.category}
                  </span>
                </div>

                {/* Why this matters */}
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  {quest.description[locale]}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-[#71717a] pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#22d3ee]" />
                    <span>{quest.durationMinutes || 4} min</span>
                  </span>
                  <span>·</span>
                  <span className="text-[#22d3ee] font-bold font-mono">
                    +{quest.xp} XP
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action toggle button */}
            <div className="shrink-0 self-end sm:self-center">
              <button
                onClick={() => onToggleQuest(quest.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  quest.completed
                    ? "bg-[#27272a] text-[#a1a1aa] hover:bg-[#3f3f46]"
                    : "border border-[#22d3ee] text-[#22d3ee] hover:bg-[#22d3ee] hover:text-[#09090b] shadow-[0_0_12px_rgba(34,211,238,0.2)]"
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
