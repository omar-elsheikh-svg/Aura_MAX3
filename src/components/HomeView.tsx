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
  Camera, 
  Bot, 
  BookOpen, 
  Trophy, 
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  ChevronRight
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
  onOpenProducts,
  onInitiateScan,
}) => {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const isFemale = genderTrack === "female";

  const completedCount = todayQuests.filter((q) => q.completed).length;
  const totalCount = todayQuests.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div 
      className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. Header / Greeting Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111318] border border-[#252A33] relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Glow ambient background */}
        <div 
          aria-hidden="true" 
          className="absolute -top-12 -right-12 w-64 h-64 bg-[#42E8FF]/10 rounded-full blur-3xl pointer-events-none" 
        />

        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#171A21] border border-[#252A33] text-[11px] font-bold text-[#42E8FF] uppercase tracking-wider">
              {isFemale ? "Aura Fem Track" : "Aura Max Track"}
            </span>
            <span className="text-xs text-[#6B7484]">
              {isRtl ? "المستوى" : "Level"} {userProfile.level} · {userProfile.xp} XP
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] font-display">
            {isRtl ? "مرحباً بك مجدداً" : "Welcome Back"}
          </h1>

          <p className="text-xs sm:text-sm text-[#A5AEBC] max-w-md leading-relaxed">
            {activePlan 
              ? activePlan.summary[locale]
              : isRtl 
                ? "ابدأ بفحص ملامحك لإنشاء خطة تحول يومية مخصصة لوقتك وميزانيتك."
                : "Complete a biometric scan to generate your custom daily transformation plan."}
          </p>
        </div>

        {/* Action button */}
        <div className="z-10 shrink-0">
          <button
            onClick={() => onNavigateTab("today")}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(66,232,255,0.25)] active:scale-95 transition-all cursor-pointer"
          >
            <span>{isRtl ? "عرض مهام اليوم" : "Go to Today's Tasks"}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Today's Plan Progress Widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Today's Tasks Summary */}
        <div 
          onClick={() => onNavigateTab("today")}
          className="p-5 rounded-2xl bg-[#111318] border border-[#252A33] hover:border-[#42E8FF]/40 transition-colors cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC]">
                {isRtl ? "مهام اليوم" : "Today's Protocol"}
              </span>
              <span className="text-xs font-bold text-[#42E8FF]">
                {completedCount}/{totalCount}
              </span>
            </div>

            <div className="w-full bg-[#171A21] h-2 rounded-full overflow-hidden mb-3">
              <div 
                className="bg-gradient-to-r from-[#42E8FF] to-[#38BDF8] h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>

            <p className="text-xs text-[#A5AEBC]">
              {completedCount === totalCount && totalCount > 0
                ? (isRtl ? "تم إكمال جميع بروتوكولات اليوم! حافظ على هذا الزخم." : "All actions complete for today! Keep the momentum.")
                : (isRtl ? `متبقي ${totalCount - completedCount} مهام لإكمال هدف اليوم.` : `${totalCount - completedCount} actions remaining today.`)}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#252A33] flex items-center justify-between text-xs font-bold text-[#42E8FF]">
            <span>{isRtl ? "فتح مهام اليوم" : "Open Today"}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Streak & Consistency */}
        <div className="p-5 rounded-2xl bg-[#111318] border border-[#252A33] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC]">
                {isRtl ? "سلسلة الاستمرارية" : "Discipline Streak"}
              </span>
              <Flame className="w-4 h-4 text-[#8B5CF6] fill-[#8B5CF6]" />
            </div>

            <div className="text-3xl font-black text-[#F4F7FA] font-display my-1">
              {userProfile.streakDays} <span className="text-xs text-[#A5AEBC] font-normal">{isRtl ? "يوم متواصل" : "Days Active"}</span>
            </div>

            <p className="text-xs text-[#A5AEBC]">
              {isRtl 
                ? "الالتزام اليومي يحمي تقدمك ويطور الذاكرة العضلية للعادات." 
                : "Daily consistency builds irreversible facial and dermal discipline."}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#252A33] text-xs text-[#6B7484] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#42E8FF]" />
            <span>{isRtl ? "الاستمرارية أهم من الشدة" : "Consistency beats intensity"}</span>
          </div>
        </div>

        {/* Aura Biometrics Summary */}
        <div 
          onClick={onInitiateScan}
          className="p-5 rounded-2xl bg-[#111318] border border-[#252A33] hover:border-[#42E8FF]/40 transition-colors cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC]">
                {isRtl ? "تقدير التناسق" : "Aesthetic Score"}
              </span>
              <Camera className="w-4 h-4 text-[#42E8FF]" />
            </div>

            <div className="text-3xl font-black text-[#F4F7FA] font-display my-1">
              {userProfile.glowScore || 85}<span className="text-xs text-[#6B7484] font-normal">/100</span>
            </div>

            <p className="text-xs text-[#A5AEBC]">
              {isRtl 
                ? "مبني على الفحص البيومتري المحلي. قم بفحص دوري لتحديث خطتك." 
                : "Derived from on-device scan metrics. Scan regularly to adapt your plan."}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#252A33] flex items-center justify-between text-xs font-bold text-[#42E8FF]">
            <span>{isRtl ? "إجراء فحص جديد" : "New Biometric Scan"}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 3. High-Leverage Secondary Hubs */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC]">
          {isRtl ? "أدوات الدعم والتطوير" : "Transformation Hubs"}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* AI Coach */}
          <button
            onClick={onOpenCoach}
            className="p-4 rounded-xl bg-[#111318] border border-[#252A33] hover:border-[#8B5CF6]/50 text-start transition-all cursor-pointer group"
          >
            <Bot className="w-5 h-5 text-[#8B5CF6] mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-[#F4F7FA] mb-0.5">
              {isRtl ? "المدرب الذكي" : "AI Coach"}
            </div>
            <div className="text-[10px] text-[#A5AEBC] line-clamp-1">
              {isRtl ? "استشارات مخصصة" : "Ask questions"}
            </div>
          </button>

          {/* Library */}
          <button
            onClick={onOpenLibrary}
            className="p-4 rounded-xl bg-[#111318] border border-[#252A33] hover:border-[#42E8FF]/50 text-start transition-all cursor-pointer group"
          >
            <BookOpen className="w-5 h-5 text-[#42E8FF] mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-[#F4F7FA] mb-0.5">
              {isRtl ? "مكتبة البروتوكولات" : "Protocols"}
            </div>
            <div className="text-[10px] text-[#A5AEBC] line-clamp-1">
              {isRtl ? "أدلة العناية المثبتة" : "Evidence-based guides"}
            </div>
          </button>

          {/* Challenges */}
          <button
            onClick={onOpenChallenges}
            className="p-4 rounded-xl bg-[#111318] border border-[#252A33] hover:border-amber-400/50 text-start transition-all cursor-pointer group"
          >
            <Trophy className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-[#F4F7FA] mb-0.5">
              {isRtl ? "تحديات العادات" : "Challenges"}
            </div>
            <div className="text-[10px] text-[#A5AEBC] line-clamp-1">
              {isRtl ? "سبرنت 7 و 14 يوماً" : "Behavior sprints"}
            </div>
          </button>

          {/* Curated Products */}
          <button
            onClick={() => onNavigateTab("profile")}
            className="p-4 rounded-xl bg-[#111318] border border-[#252A33] hover:border-emerald-400/50 text-start transition-all cursor-pointer group"
          >
            <ShoppingBag className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-[#F4F7FA] mb-0.5">
              {isRtl ? "المنتجات المعتمدة" : "Products"}
            </div>
            <div className="text-[10px] text-[#A5AEBC] line-clamp-1">
              {isRtl ? "ترشيحات مستقلة" : "Curated tools & SPF"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
