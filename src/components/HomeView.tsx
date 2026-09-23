import React from "react";
import { 
  Locale, 
  GenderTrack, 
  UserProfile, 
  TransformationPlan, 
  Quest, 
  NavTab 
} from "../types";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Flame, 
  Target, 
  CheckCircle2, 
  Circle,
  Camera, 
  Bot, 
  Trophy, 
  Droplet,
  Scissors,
  Dumbbell,
  Shirt,
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
    ? (isRtl ? "صباح الخير" : "Welcome back") 
    : hour < 18 
      ? (isRtl ? "طاب مساؤك" : "Welcome back") 
      : (isRtl ? "مساء الخير" : "Welcome back");

  const userName = userProfile.name || (isRtl ? "عمر" : "Omar");
  const glowScore = userProfile.glowScore || 82;
  const streakDays = userProfile.streakDays || 14;

  const weeklyData = [40, 65, 50, 80, 60, 92, 75];
  const weekDays = isRtl ? ["ح", "ن", "ث", "ر", "خ", "ج", "س"] : ["M", "T", "W", "T", "F", "S", "S"];

  const focusAreas = [
    { label: isRtl ? "البشرة" : "Skin", value: 74, icon: Droplet },
    { label: isRtl ? "الشعر" : "Hair", value: 60, icon: Scissors },
    { label: isRtl ? "اللياقة" : "Fitness", value: 88, icon: Dumbbell },
    { label: isRtl ? "الأناقة" : "Style", value: 45, icon: Shirt },
  ];

  return (
    <div 
      className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. Command Center Greeting Header */}
      <div 
        className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#18181b] border border-[#27272a] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2 z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
            <span className="font-semibold text-[#22d3ee] uppercase tracking-wider">
              {isFemale ? "Aura Fem Track" : "Aura Max Track"}
            </span>
            <span aria-hidden="true">·</span>
            <span>{isRtl ? "الأسبوع 3" : "Week 3"}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#10b981] font-semibold">{isRtl ? "78% التزام" : "78% consistency"}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#f4f4f5] font-display">
            {greeting}, {userName}
          </h1>

          <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
            {activePlan 
              ? activePlan.summary[locale]
              : isRtl 
                ? "يلا نكمل مشوار التوهج بتاعك النهاردة"
                : "Let's keep that glow going today"}
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="z-10 shrink-0 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigateTab("today")}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#22d3ee] hover:opacity-95 text-[#09090b] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.35)] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>{isRtl ? "تنفيذ مهام اليوم" : "Open Today's Protocol"}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
          
          <button
            onClick={onInitiateScan}
            className="px-4 py-3.5 rounded-xl bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-xs font-semibold text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4 text-[#22d3ee]" />
            <span>{isRtl ? "فحص جديد" : "Scan"}</span>
          </button>
        </div>
      </div>

      {/* 2. Top Row (2 Equal Columns): Day Streak & Glow Score */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Day Streak Card */}
        <div 
          className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-[#27272a] min-h-[140px] sm:min-h-[150px] relative overflow-hidden shadow-xs"
          style={{ background: "linear-gradient(155deg, #18181b, #1c1230)" }}
        >
          <div className="flame-anim">
            <Flame 
              size={26} 
              color="#fb923c" 
              style={{ filter: "drop-shadow(0 0 8px rgba(251, 146, 60, 0.55))" }} 
            />
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-black text-[#f4f4f5] leading-none font-display">
              {streakDays}
            </p>
            <p className="text-xs mt-1.5 text-[#a1a1aa] font-medium">
              {isRtl ? "أيام متتالية" : "Day Streak"}
            </p>
          </div>
        </div>

        {/* Glow Score Card with Centered Circular Ring Indicator */}
        <div 
          className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center bg-[#18181b] border border-[#27272a] min-h-[140px] sm:min-h-[150px] relative overflow-hidden shadow-xs"
        >
          <div className="relative flex items-center justify-center">
            <svg width="84" height="84" viewBox="0 0 84 84">
              <defs>
                <linearGradient id="ringGradientHome" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <circle
                cx="42"
                cy="42"
                r="34"
                fill="none"
                stroke="#27272a"
                strokeWidth="7"
              />
              <circle
                cx="42"
                cy="42"
                r="34"
                fill="none"
                stroke="url(#ringGradientHome)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 34}
                strokeDashoffset={2 * Math.PI * 34 * (1 - glowScore / 100)}
                transform="rotate(-90 42 42)"
                style={{
                  transition: "stroke-dashoffset 700ms ease",
                  filter: "drop-shadow(0 0 6px rgba(34, 211, 238, 0.5))",
                }}
              />
            </svg>
            <span className="absolute text-xl sm:text-2xl font-extrabold text-[#f4f4f5] font-display">
              {glowScore}
            </span>
          </div>
          <p className="text-xs mt-2 text-center text-[#a1a1aa] font-medium">
            {isRtl ? "درجة التوهج" : "Glow Score"}
          </p>
        </div>
      </div>

      {/* 3. Middle Card (Full Width): Weekly Progress Chart */}
      <div className="w-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-[#18181b] border border-[#27272a] shadow-xs">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#f4f4f5]">
            {isRtl ? "التقدم الأسبوعي" : "Weekly Progress"}
          </h2>
          <span className="text-xs font-medium text-[#22d3ee]">
            {isRtl ? "أعلى بنسبة ١٢٪ عن الأسبوع السابق" : "12% higher than last week"}
          </span>
        </div>
        <div className="flex items-end justify-between gap-2 sm:gap-4 h-24 pt-2">
          {weeklyData.map((val, i) => {
            const isHighlight = i === 5;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full max-w-[32px] rounded-full transition-all duration-300"
                  style={{
                    height: `${val}%`,
                    background: "linear-gradient(to top, #6366f1, #22d3ee)",
                    opacity: isHighlight ? 1 : 0.55,
                    boxShadow: isHighlight ? "0 0 12px rgba(34, 211, 238, 0.55)" : "none",
                  }}
                />
                <span className={`text-[11px] font-medium ${isHighlight ? "text-[#22d3ee] font-bold" : "text-[#a1a1aa]"}`}>
                  {weekDays[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Focus Areas Section (Responsive 2-Column Layout) */}
      <div className="space-y-3 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#f4f4f5]">
            {isRtl ? "مجالات التركيز" : "Focus Areas"}
          </h2>
          <span className="text-[11px] text-[#a1a1aa]">
            {isRtl ? "تطور الأبعاد الجمالية" : "Aesthetic dimensions"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {focusAreas.map((area, i) => {
            const IconComponent = area.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-3.5 sm:p-4 bg-[#18181b] border border-[#27272a] flex flex-col justify-between shadow-xs"
              >
                <div className="flex items-center gap-2 mb-2.5 min-w-0">
                  <IconComponent className="w-4 h-4 text-[#818cf8] shrink-0" />
                  <span className="text-xs font-semibold text-[#f4f4f5] truncate">
                    {area.label}
                  </span>
                </div>

                <div className="w-full flex items-center gap-2 mt-auto">
                  <div className="w-full flex-1 rounded-full h-1.5 bg-[#27272a] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${area.value}%`,
                        background: "linear-gradient(90deg, #6366f1, #22d3ee)",
                      }}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-[#a1a1aa] shrink-0">
                    {area.value}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Secondary Performance Trackers (Today's Completion & Total XP) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Today's Protocol Completion */}
        <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between bg-[#18181b] border border-[#27272a] min-h-[140px] shadow-xs">
          <div className="flex items-center justify-between">
            <Target className="w-5 h-5 text-[#22d3ee]" />
            <span className="text-xs font-mono font-bold text-[#22d3ee]">
              {completedCount}/{totalCount}
            </span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-black text-[#f4f4f5] leading-none font-display">
                {progressPercent}%
              </p>
              <span className="text-[11px] text-[#10b981] font-semibold">
                {isRtl ? "قيد الإنجاز" : "On Track"}
              </span>
            </div>
            <div className="w-full bg-[#27272a] h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#6366f1] to-[#22d3ee] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-[#a1a1aa]">
              {isRtl ? "إنجاز مهام اليوم" : "Today's Completion"}
            </p>
          </div>
        </div>

        {/* Total XP / Tier */}
        <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between bg-[#18181b] border border-[#27272a] min-h-[140px] shadow-xs">
          <div className="flex items-center justify-between">
            <Trophy className="w-5 h-5 text-[#818cf8]" />
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#27272a] text-[#818cf8]">
              Level {userProfile.level}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-black text-[#f4f4f5] leading-none font-display">
              {userProfile.xp}
            </p>
            <p className="text-xs mt-1.5 text-[#a1a1aa] font-medium">
              {isRtl ? "إجمالي النقاط (XP)" : "Total XP Earned"}
            </p>
          </div>
        </div>
      </div>

      {/* 6. Today's Quest Hero Card */}
      {nextPendingQuest && (
        <div 
          className="rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#18181b] border border-[#27272a] shadow-xs"
          style={{
            borderInlineStartWidth: "4px",
            borderInlineStartColor: "#6366f1",
          }}
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div 
              className="flex items-center justify-center rounded-xl shrink-0 w-11 h-11 bg-[#1e293b]"
            >
              <Droplet className="w-5 h-5 text-[#22d3ee]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a1a1aa]">
                {isRtl ? "مهمة اليوم" : "Today's Quest"}
              </p>
              <p className="text-sm font-semibold text-[#f4f4f5] truncate mt-0.5">
                {nextPendingQuest.title[locale]}
              </p>
              <p className="text-xs text-[#a1a1aa] mt-0.5 line-clamp-1">
                {nextPendingQuest.description[locale]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
            <span className="text-xs font-mono font-bold text-[#22d3ee]">
              +{nextPendingQuest.xp} XP
            </span>
            <button
              onClick={() => onNavigateTab("today")}
              className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold border border-[#22d3ee] text-[#22d3ee] hover:bg-[#22d3ee] hover:text-[#09090b] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isRtl ? "تم الإنجاز" : "Mark as done"}</span>
            </button>
          </div>
        </div>
      )}

      {/* 7. Lower Section: Protocol Checklist & Aesthetic Exploration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Today's Protocol Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#18181b] border border-[#27272a] space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#f4f4f5]">
                  {isRtl ? "مهام اليوم (Today)" : "Today's Protocol"}
                </h3>
                <span className="text-xs text-[#a1a1aa]">
                  {completedCount} / {totalCount} {isRtl ? "مكتملة" : "completed"}
                </span>
              </div>

              <button
                onClick={() => onNavigateTab("today")}
                className="text-xs text-[#22d3ee] hover:underline font-semibold cursor-pointer"
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
                  className="p-3.5 rounded-xl bg-[#111113] border border-[#27272a] hover:border-[#22d3ee]/40 transition-colors cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {q.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#71717a] shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className={`text-xs font-bold truncate ${q.completed ? "text-[#71717a] line-through" : "text-[#f4f4f5]"}`}>
                        {q.title[locale]}
                      </div>
                      <div className="text-[10px] text-[#a1a1aa]">
                        {q.category} · {q.durationMinutes || 4} min
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#22d3ee] shrink-0">
                    +{q.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Insight, Explore Dimensions & Shortcuts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Personalized Insight Card */}
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#18181b] border border-[#27272a] space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#818cf8] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isRtl ? "فكرة ورؤية اليوم الجمالية" : "Today's Insight"}</span>
            </div>

            <h4 className="text-base font-bold text-[#f4f4f5]">
              {isFemale 
                ? (isRtl ? "ترطيب البشرة فورا بعد الغسول يضاعف امتصاص السيروم" : "Damp skin increases ceramide serum penetration by 3x")
                : (isRtl ? "استقامة العنق تبرز زاوية الفك طبيعياً دون مجهود" : "Cervical spine alignment naturally elevates gonial jaw definition")}
            </h4>

            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              {isFemale
                ? (isRtl ? "تطبيق حمض الهيالورونيك على بشرة ندية يحبس الرطوبة ويمنع الجفاف السطحي طوال اليوم." : "Applying hydrators onto slightly damp skin seals deep transepidermal moisture.")
                : (isRtl ? "تصحيح انحناء الرأس للأمام يشد عضلات الفك السفلية ويقلل من مظهر الذقن المزدوج في غضون ثوانٍ." : "Counteracting forward head tilt tightens submental tissue and clarifies jaw contour instantly.")}
            </p>
          </div>

          {/* Explore Dimensions */}
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#18181b] border border-[#27272a] space-y-4 shadow-xs">
            <div className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider pb-3 border-b border-[#27272a]">
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
                  className="p-3 rounded-xl bg-[#111113] hover:bg-[#27272a] border border-[#27272a] text-start transition-colors cursor-pointer"
                >
                  <div className="text-xs font-bold text-[#f4f4f5]">{item.name}</div>
                  <div className="text-[10px] text-[#a1a1aa] mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Contextual Shortcuts: AI Coach & Challenges */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onOpenCoach}
              className="p-4 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#818cf8]/50 transition-colors text-start cursor-pointer active:scale-98"
            >
              <Bot className="w-4 h-4 text-[#818cf8] mb-2" />
              <div className="text-xs font-bold text-[#f4f4f5]">{isRtl ? "المدرب الذكي" : "AI Coach"}</div>
              <div className="text-[10px] text-[#a1a1aa] mt-0.5">{isRtl ? "استفسارات سريعة" : "Contextual help"}</div>
            </button>

            <button
              onClick={onOpenChallenges}
              className="p-4 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#22d3ee]/50 transition-colors text-start cursor-pointer active:scale-98"
            >
              <Trophy className="w-4 h-4 text-[#22d3ee] mb-2" />
              <div className="text-xs font-bold text-[#f4f4f5]">{isRtl ? "سبرنتات العادات" : "Challenges"}</div>
              <div className="text-[10px] text-[#a1a1aa] mt-0.5">{isRtl ? "حماية الاستمرارية" : "Consistency"}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
