import React from "react";
import { 
  Locale, 
  GenderTrack, 
  UserProfile, 
  TransformationPlan, 
  Quest, 
  NavTab 
} from "../types";
import { AuraMaxEmblem } from "./AuraMaxLogo";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Flame, 
  Target, 
  Clock, 
  CheckCircle2, 
  Circle,
  Camera, 
  Bot, 
  BookOpen, 
  Trophy, 
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon,
  Zap,
  Check
} from "lucide-react";

interface HomeViewProps {
  locale: Locale;
  genderTrack: GenderTrack;
  userProfile: UserProfile;
  activePlan?: TransformationPlan | null;
  todayQuests: Quest[];
  onNavigateTab: (tab: NavTab) => void;
  onOpenCoach: () => void;
  onOpenLibrary: () => void;
  onOpenChallenges: () => void;
  onOpenProducts?: () => void;
  onInitiateScan: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  locale,
  genderTrack,
  userProfile,
  activePlan,
  todayQuests,
  onNavigateTab,
  onOpenCoach,
  onOpenLibrary,
  onOpenChallenges,
  onInitiateScan,
}) => {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const isFemale = genderTrack === "female";

  const completedCount = todayQuests.filter((q) => q.completed).length;
  const totalCount = todayQuests.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const nextPendingQuest = todayQuests.find((q) => !q.completed) || todayQuests[0];

  // Dynamic greeting based on current local hour
  const hour = new Date().getHours();
  const greeting = hour < 12 
    ? (isRtl ? "صباح الخير" : "Good morning") 
    : hour < 18 
      ? (isRtl ? "طاب مساؤك" : "Good afternoon") 
      : (isRtl ? "مساء الخير" : "Good evening");

  return (
    <div 
      className="max-w-6xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. Command Center Greeting Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111318] border border-[#252A33] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs text-[#A5AEBC]">
            <span className="font-semibold text-[#42E8FF] uppercase tracking-wider">
              {isFemale ? "Aura Fem Track" : "Aura Max Track"}
            </span>
            <span aria-hidden="true">·</span>
            <span>{isRtl ? "الأسبوع 3" : "Week 3"}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#10B981] font-semibold">{isRtl ? "78% التزام" : "78% consistency"}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F4F7FA] font-display">
            {greeting}, {userProfile.name || (isRtl ? "مستخدم أورا" : "Aura User")}
          </h1>

          <p className="text-xs sm:text-sm text-[#A5AEBC] leading-relaxed">
            {activePlan 
              ? activePlan.summary[locale]
              : isRtl 
                ? "ابدأ بفحص ملامحك لإنشاء خطة تحول يومية مخصصة لوقتك وميزانيتك."
                : "Your daily protocol is active. Keep your focus on consistency to build lasting habits."}
          </p>
        </div>

        {/* Primary CTA Button */}
        <div className="z-10 shrink-0 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigateTab("today")}
            className="px-6 py-3.5 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(66,232,255,0.25)] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>{isRtl ? "تنفيذ مهام اليوم" : "Open Today's Protocol"}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
          
          <button
            onClick={onInitiateScan}
            className="px-4 py-3.5 rounded-xl bg-[#171A21] hover:bg-[#1E232E] border border-[#252A33] text-xs font-semibold text-[#A5AEBC] hover:text-[#F4F7FA] transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4 text-[#42E8FF]" />
            <span>{isRtl ? "فحص جديد" : "Scan"}</span>
          </button>
        </div>
      </div>

      {/* 2. Responsive 2-Column Command Center (Eliminating Desktop Void) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: TODAY'S FOCUS & PROTOCOL & INSIGHT (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* TODAY'S FOCUS HERO CARD */}
          {nextPendingQuest && (
            <div className="p-6 rounded-3xl bg-[#111318] border border-[#42E8FF]/30 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-[#252A33] mb-4">
                <span className="text-xs font-bold text-[#42E8FF] uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>{isRtl ? "التركيز الحالي لليوم" : "Today's Focus"}</span>
                </span>
                <span className="text-xs font-bold text-[#42E8FF]">
                  +{nextPendingQuest.xp} XP
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#F4F7FA] font-display">
                  {nextPendingQuest.title[locale]}
                </h2>
                <p className="text-xs text-[#A5AEBC] leading-relaxed">
                  {nextPendingQuest.description[locale]}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#6B7484] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{nextPendingQuest.durationMinutes || 4} min</span>
                </span>

                <button
                  onClick={() => onNavigateTab("today")}
                  className="px-4 py-2 rounded-lg bg-[#42E8FF] text-[#08090C] text-xs font-bold flex items-center gap-1.5 hover:bg-[#38BDF8] transition-colors cursor-pointer"
                >
                  <span>{isRtl ? "إتمام المهمة" : "Complete Action"}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TODAY'S PROTOCOL LIST (Section 18) */}
          <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#252A33]">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#F4F7FA]">
                  {isRtl ? "مهام اليوم (Today)" : "Today's Quests"}
                </h3>
                <span className="text-xs text-[#A5AEBC]">
                  {completedCount} / {totalCount} {isRtl ? "مكتملة" : "completed"}
                </span>
              </div>

              <button
                onClick={() => onNavigateTab("today")}
                className="text-xs text-[#42E8FF] hover:underline font-semibold cursor-pointer"
              >
                {isRtl ? "عرض الكل" : "View All"}
              </button>
            </div>

            {/* Quests Preview Items */}
            <div className="space-y-2.5">
              {todayQuests.slice(0, 3).map((q) => (
                <div 
                  key={q.id}
                  onClick={() => onNavigateTab("today")}
                  className="p-3.5 rounded-xl bg-[#171A21] border border-[#252A33] hover:border-[#42E8FF]/40 transition-colors cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    {q.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#6B7484] shrink-0" />
                    )}
                    <div>
                      <div className={`text-xs font-bold ${q.completed ? "text-[#6B7484] line-through" : "text-[#F4F7FA]"}`}>
                        {q.title[locale]}
                      </div>
                      <div className="text-[10px] text-[#A5AEBC]">
                        {q.category} · {q.durationMinutes || 4} min
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#42E8FF] shrink-0">
                    +{q.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* INSIGHT CARD (One useful personalized insight) */}
          <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isRtl ? "فكرة ورؤية اليوم الجمالية" : "Today's Insight"}</span>
            </div>

            <h4 className="text-base font-bold text-[#F4F7FA]">
              {isFemale 
                ? (isRtl ? "ترطيب البشرة فورا بعد الغسول يضاعف امتصاص السيروم" : "Damp skin increases ceramide serum penetration by 3x")
                : (isRtl ? "استقامة العنق تبرز زاوية الفك طبيعياً دون مجهود" : "Cervical spine alignment naturally elevates gonial jaw definition")}
            </h4>

            <p className="text-xs text-[#A5AEBC] leading-relaxed">
              {isFemale
                ? (isRtl ? "تطبيق حمض الهيالورونيك على بشرة ندية يحبس الرطوبة ويمنع الجفاف السطحي طوال اليوم." : "Applying hydrators onto slightly damp skin seals deep transepidermal moisture.")
                : (isRtl ? "تصحيح انحناء الرأس للأمام يشد عضلات الفك السفلية ويقلل من مظهر الذقن المزدوج في غضون ثوانٍ." : "Counteracting forward head tilt tightens submental tissue and clarifies jaw contour instantly.")}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: PROGRESS SNAPSHOT & EXPLORE SECTIONS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* PROGRESS SNAPSHOT */}
          <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#252A33]">
              <span className="text-xs font-bold text-[#A5AEBC] uppercase tracking-wider">
                {isRtl ? "مؤشرات التقدم" : "Progress Snapshot"}
              </span>
              <button 
                onClick={() => onNavigateTab("progress")}
                className="text-xs text-[#42E8FF] hover:underline cursor-pointer"
              >
                {isRtl ? "التفاصيل" : "Details"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#171A21] border border-[#252A33]">
                <div className="flex items-center gap-1.5 text-[11px] text-[#A5AEBC]">
                  <Flame className="w-3.5 h-3.5 text-[#42E8FF]" />
                  <span>{isRtl ? "أيام الالتزام" : "Streak"}</span>
                </div>
                <div className="text-2xl font-black text-[#F4F7FA] font-display mt-1">
                  {userProfile.streakDays}d
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#171A21] border border-[#252A33]">
                <div className="flex items-center gap-1.5 text-[11px] text-[#A5AEBC]">
                  <Trophy className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>{isRtl ? "المستوى" : "Level"}</span>
                </div>
                <div className="text-2xl font-black text-[#8B5CF6] font-display mt-1">
                  {userProfile.level}
                </div>
              </div>
            </div>

            {/* Consistency Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A5AEBC]">{isRtl ? "إنجاز مهام اليوم" : "Daily Completion"}</span>
                <span className="font-bold text-[#F4F7FA]">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#171A21] h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#42E8FF] to-[#38BDF8] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* EXPLORE MODULES (Section 18: Skin, Hair, Grooming, Style) */}
          <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] space-y-4">
            <div className="text-xs font-bold text-[#A5AEBC] uppercase tracking-wider pb-3 border-b border-[#252A33]">
              {isRtl ? "استكشف الأبعاد الجمالية" : "Explore Dimensions"}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { 
                  name: isRtl ? "صحة البشرة" : "Skin Barrier", 
                  desc: isRtl ? "نضارة وترميم" : "Hydration & SPF",
                  tab: "library" as NavTab
                },
                { 
                  name: isRtl ? "قصات الشعر" : "Hair Framing", 
                  desc: isRtl ? "حسب شكل الوجه" : "Shape cuts",
                  tab: "scan" as NavTab
                },
                { 
                  name: isRtl ? "التشذيب الدقيق" : "Grooming", 
                  desc: isRtl ? "تحديد وحواجب" : "Neckline & brows",
                  tab: "library" as NavTab
                },
                { 
                  name: isRtl ? "استقامة القامة" : "Postural Poise", 
                  desc: isRtl ? "انحناء الرقبة" : "Cervical reset",
                  tab: "challenges" as NavTab
                },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigateTab(item.tab)}
                  className="p-3 rounded-xl bg-[#171A21] hover:bg-[#1E232E] border border-[#252A33] text-start transition-colors cursor-pointer"
                >
                  <div className="text-xs font-bold text-[#F4F7FA]">{item.name}</div>
                  <div className="text-[10px] text-[#A5AEBC] mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* CONTEXTUAL SHORTCUTS: AI Coach & Challenges */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onOpenCoach}
              className="p-4 rounded-2xl bg-[#111318] border border-[#252A33] hover:border-[#8B5CF6]/50 transition-colors text-start cursor-pointer"
            >
              <Bot className="w-4 h-4 text-[#8B5CF6] mb-2" />
              <div className="text-xs font-bold text-[#F4F7FA]">{isRtl ? "المدرب الذكي" : "AI Coach"}</div>
              <div className="text-[10px] text-[#A5AEBC] mt-0.5">{isRtl ? "استفسارات سريعة" : "Contextual help"}</div>
            </button>

            <button
              onClick={onOpenChallenges}
              className="p-4 rounded-2xl bg-[#111318] border border-[#252A33] hover:border-[#42E8FF]/50 transition-colors text-start cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-[#42E8FF] mb-2" />
              <div className="text-xs font-bold text-[#F4F7FA]">{isRtl ? "سبرنتات العادات" : "Challenges"}</div>
              <div className="text-[10px] text-[#A5AEBC] mt-0.5">{isRtl ? "حماية الاستمرارية" : "Consistency"}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
