import React, { useState } from "react";
import { 
  Locale, 
  GenderTrack, 
  Quest, 
  TransformationPlan 
} from "../types";
import { 
  CheckCircle2, 
  Circle, 
  Sun, 
  Moon, 
  Clock, 
  Droplets, 
  Flame, 
  Sparkles, 
  Info, 
  Plus, 
  X,
  ChevronDown,
  ChevronUp,
  Target,
  ShieldCheck
} from "lucide-react";

interface TodayViewProps {
  locale: Locale;
  genderTrack: GenderTrack;
  activePlan?: TransformationPlan | null;
  quests: Quest[];
  onToggleQuest: (id: string) => void;
  onAddCustomQuest: (quest: Omit<Quest, "id" | "completed">) => void;
  streakDays: number;
  xp: number;
}

export const TodayView: React.FC<TodayViewProps> = ({
  locale,
  genderTrack,
  activePlan,
  quests,
  onToggleQuest,
  onAddCustomQuest,
  streakDays,
  xp,
}) => {
  const isRtl = locale === "ar";
  const isFemale = genderTrack === "female";

  const [expandedQuestId, setExpandedQuestId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"morning" | "evening" | "anytime">("morning");
  const [newDuration, setNewDuration] = useState(3);
  const [newDesc, setNewDesc] = useState("");

  // Hydration state
  const [waterGlasses, setWaterGlasses] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("aura_water_glasses");
      return saved ? parseInt(saved, 10) : 4;
    } catch {
      return 4;
    }
  });

  const updateWater = (delta: number) => {
    const next = Math.max(0, Math.min(12, waterGlasses + delta));
    setWaterGlasses(next);
    try {
      localStorage.setItem("aura_water_glasses", String(next));
    } catch {}
  };

  const completedCount = quests.filter((q) => q.completed).length;
  const totalCount = quests.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const morningQuests = quests.filter((q) => q.category === "morning");
  const eveningQuests = quests.filter((q) => q.category === "evening");
  const anytimeQuests = quests.filter((q) => q.category === "anytime");

  const handleCreateQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddCustomQuest({
      title: { en: newTitle, ar: newTitle },
      category: newCategory,
      xp: 40,
      frequency: "daily",
      durationMinutes: newDuration,
      description: {
        en: newDesc || "Custom self-improvement protocol.",
        ar: newDesc || "بروتوكول تطوير شخصي مخصص.",
      },
      iconName: newCategory === "morning" ? "sun" : newCategory === "evening" ? "moon" : "zap",
    });

    setNewTitle("");
    setNewDesc("");
    setShowAddModal(false);
  };

  return (
    <div 
      className="max-w-3xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. Today's Mission & Adherence Card */}
      <div className="p-6 rounded-2xl bg-[#111318] border border-[#252A33] relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-[#252A33] mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#42E8FF]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F4F7FA]">
              {isRtl ? "هدف اليوم الرئيسي" : "Today's Primary Focus"}
            </span>
          </div>
          <span className="text-xs font-bold text-[#42E8FF]">
            {completedCount}/{totalCount} {isRtl ? "مكتملة" : "Completed"} ({progressPercent}%)
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#F4F7FA] font-display">
            {activePlan 
              ? activePlan.weeklyObjective[locale]
              : isRtl 
                ? "إتمام بروتوكول طرد السوائل واستقامة الرقبة" 
                : "Execute morning debloat and postural alignment"}
          </h1>
          <p className="text-xs text-[#A5AEBC]">
            {isRtl 
              ? "ركز على الإتقان وليس السرعة. العادات الصباحية تحفز الطاقة، والمسائية تؤسس للتعافي الخلوي."
              : "Focus on precision over rush. Morning routines stimulate lymphatic flow; evening routines prime cellular recovery."}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#171A21] h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#42E8FF] to-[#38BDF8] h-full rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>

      {/* 2. Hydration & Debloat Widget */}
      <div className="p-4 rounded-xl bg-[#111318] border border-[#252A33] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#42E8FF]/10 text-[#42E8FF] flex items-center justify-center shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#F4F7FA]">
              {isRtl ? "شرب الماء وطرد الصوديوم" : "Hydration & Debloat Counter"}
            </div>
            <div className="text-[11px] text-[#A5AEBC]">
              {waterGlasses}/8 {isRtl ? "أكواب ماء اليوم" : "Glasses logged today"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => updateWater(-1)}
            disabled={waterGlasses <= 0}
            className="w-8 h-8 rounded-lg bg-[#171A21] border border-[#252A33] text-xs font-bold text-[#A5AEBC] hover:text-[#F4F7FA] disabled:opacity-30 cursor-pointer"
          >
            -
          </button>
          <span className="text-xs font-mono font-bold text-[#F4F7FA] w-5 text-center">
            {waterGlasses}
          </span>
          <button
            onClick={() => updateWater(1)}
            disabled={waterGlasses >= 12}
            className="w-8 h-8 rounded-lg bg-[#42E8FF]/20 border border-[#42E8FF]/40 text-xs font-bold text-[#42E8FF] hover:bg-[#42E8FF]/30 disabled:opacity-30 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {/* 3. Action Groups: Morning, Evening, Anytime */}
      <div className="space-y-6">
        {/* Morning Protocol */}
        {morningQuests.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#A5AEBC] uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Sun className="w-4 h-4" />
                <span>{isRtl ? "الروتين الصباحي" : "Morning Protocol"}</span>
              </span>
              <span className="text-[11px] text-[#6B7484]">
                {morningQuests.filter((q) => q.completed).length}/{morningQuests.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {morningQuests.map((quest) => {
                const isExpanded = expandedQuestId === quest.id;
                return (
                  <div
                    key={quest.id}
                    className={`rounded-xl border transition-all ${
                      quest.completed
                        ? "bg-[#111318]/50 border-[#252A33] opacity-75"
                        : "bg-[#111318] border-[#252A33] hover:border-[#42E8FF]/40"
                    }`}
                  >
                    <div className="p-4 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <button
                          onClick={() => onToggleQuest(quest.id)}
                          className="mt-0.5 shrink-0 cursor-pointer"
                          aria-label={quest.completed ? "Mark incomplete" : "Mark complete"}
                        >
                          {quest.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-[#42E8FF] fill-[#42E8FF]/20" />
                          ) : (
                            <Circle className="w-5 h-5 text-[#6B7484] hover:text-[#42E8FF] transition-colors" />
                          )}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${
                              quest.completed ? "line-through text-[#A5AEBC]" : "text-[#F4F7FA]"
                            }`}>
                              {quest.title[locale]}
                            </span>
                            {quest.durationMinutes && (
                              <span className="text-[10px] text-[#6B7484] flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{quest.durationMinutes}m</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#A5AEBC] mt-1 leading-relaxed">
                            {quest.description[locale]}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono font-bold text-[#42E8FF]">
                          +{quest.xp} XP
                        </span>
                        {quest.whyItMatters && (
                          <button
                            onClick={() => setExpandedQuestId(isExpanded ? null : quest.id)}
                            className="p-1 text-[#6B7484] hover:text-[#A5AEBC] cursor-pointer"
                            title="Why this matters"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                    </div>

                    {isExpanded && quest.whyItMatters && (
                      <div className="px-4 pb-3.5 pt-1 text-xs text-[#A5AEBC] border-t border-[#252A33]/50 flex items-start gap-2 bg-[#08090C]/50">
                        <Info className="w-4 h-4 text-[#42E8FF] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#F4F7FA] block mb-0.5">
                            {isRtl ? "الفائدة العلمية والجمالية:" : "Aesthetic Rationale:"}
                          </span>
                          <span>{quest.whyItMatters[locale]}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Evening Protocol */}
        {eveningQuests.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#A5AEBC] uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-[#8B5CF6]">
                <Moon className="w-4 h-4" />
                <span>{isRtl ? "الروتين المسائي" : "Evening Protocol"}</span>
              </span>
              <span className="text-[11px] text-[#6B7484]">
                {eveningQuests.filter((q) => q.completed).length}/{eveningQuests.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {eveningQuests.map((quest) => {
                const isExpanded = expandedQuestId === quest.id;
                return (
                  <div
                    key={quest.id}
                    className={`rounded-xl border transition-all ${
                      quest.completed
                        ? "bg-[#111318]/50 border-[#252A33] opacity-75"
                        : "bg-[#111318] border-[#252A33] hover:border-[#8B5CF6]/40"
                    }`}
                  >
                    <div className="p-4 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <button
                          onClick={() => onToggleQuest(quest.id)}
                          className="mt-0.5 shrink-0 cursor-pointer"
                          aria-label={quest.completed ? "Mark incomplete" : "Mark complete"}
                        >
                          {quest.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-[#8B5CF6] fill-[#8B5CF6]/20" />
                          ) : (
                            <Circle className="w-5 h-5 text-[#6B7484] hover:text-[#8B5CF6] transition-colors" />
                          )}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${
                              quest.completed ? "line-through text-[#A5AEBC]" : "text-[#F4F7FA]"
                            }`}>
                              {quest.title[locale]}
                            </span>
                            {quest.durationMinutes && (
                              <span className="text-[10px] text-[#6B7484] flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{quest.durationMinutes}m</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#A5AEBC] mt-1 leading-relaxed">
                            {quest.description[locale]}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono font-bold text-[#8B5CF6]">
                          +{quest.xp} XP
                        </span>
                        {quest.whyItMatters && (
                          <button
                            onClick={() => setExpandedQuestId(isExpanded ? null : quest.id)}
                            className="p-1 text-[#6B7484] hover:text-[#A5AEBC] cursor-pointer"
                            title="Why this matters"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                    </div>

                    {isExpanded && quest.whyItMatters && (
                      <div className="px-4 pb-3.5 pt-1 text-xs text-[#A5AEBC] border-t border-[#252A33]/50 flex items-start gap-2 bg-[#08090C]/50">
                        <Info className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#F4F7FA] block mb-0.5">
                            {isRtl ? "الفائدة العلمية والجمالية:" : "Aesthetic Rationale:"}
                          </span>
                          <span>{quest.whyItMatters[locale]}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Anytime / Weekly Habits */}
        {anytimeQuests.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#A5AEBC] uppercase tracking-wider">
              <span>{isRtl ? "عادات أسبوعية مرنة" : "Weekly Maintenance"}</span>
              <span className="text-[11px] text-[#6B7484]">
                {anytimeQuests.filter((q) => q.completed).length}/{anytimeQuests.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {anytimeQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`rounded-xl border p-4 flex items-start justify-between gap-3 transition-all ${
                    quest.completed
                      ? "bg-[#111318]/50 border-[#252A33] opacity-75"
                      : "bg-[#111318] border-[#252A33]"
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() => onToggleQuest(quest.id)}
                      className="mt-0.5 shrink-0 cursor-pointer"
                    >
                      {quest.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#6B7484] hover:text-emerald-400 transition-colors" />
                      )}
                    </button>
                    <div>
                      <div className={`text-sm font-bold ${
                        quest.completed ? "line-through text-[#A5AEBC]" : "text-[#F4F7FA]"
                      }`}>
                        {quest.title[locale]}
                      </div>
                      <p className="text-xs text-[#A5AEBC] mt-1">
                        {quest.description[locale]}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">
                    +{quest.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Custom Protocol Action */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-[#111318] hover:bg-[#171A21] border border-[#252A33] text-xs font-semibold text-[#A5AEBC] hover:text-[#F4F7FA] flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-[#42E8FF]" />
          <span>{isRtl ? "إضافة بروتوكول مخصص" : "Add Custom Habit"}</span>
        </button>
      </div>

      {/* Custom Protocol Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#111318] border border-[#252A33] rounded-2xl p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 end-4 p-1.5 rounded-lg bg-[#171A21] text-[#A5AEBC] hover:text-[#F4F7FA] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-[#F4F7FA] mb-4">
              {isRtl ? "إضافة بروتوكول جديد" : "Add Custom Protocol"}
            </h3>

            <form onSubmit={handleCreateQuest} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#A5AEBC] block mb-1">
                  {isRtl ? "عنوان العادة" : "Habit Name"}
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={isRtl ? "مثال: تدليك الرقبة بالزيت" : "e.g., Neck alignment check"}
                  className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#252A33] text-sm text-[#F4F7FA] focus:outline-none focus:border-[#42E8FF]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#A5AEBC] block mb-1">
                    {isRtl ? "التوقيت" : "Time of Day"}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#252A33] text-xs text-[#F4F7FA] focus:outline-none focus:border-[#42E8FF]"
                  >
                    <option value="morning">{isRtl ? "صباحي" : "Morning"}</option>
                    <option value="evening">{isRtl ? "مسائي" : "Evening"}</option>
                    <option value="anytime">{isRtl ? "في أي وقت" : "Anytime"}</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#A5AEBC] block mb-1">
                    {isRtl ? "المدة (بالدقائق)" : "Duration (min)"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={newDuration}
                    onChange={(e) => setNewDuration(parseInt(e.target.value, 10) || 3)}
                    className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#252A33] text-xs text-[#F4F7FA] focus:outline-none focus:border-[#42E8FF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#A5AEBC] block mb-1">
                  {isRtl ? "شرح موجز (اختياري)" : "Brief Description (Optional)"}
                </label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#252A33] text-xs text-[#F4F7FA] focus:outline-none focus:border-[#42E8FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold transition-colors cursor-pointer"
              >
                {isRtl ? "حفظ البروتوكول" : "Save Protocol"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
