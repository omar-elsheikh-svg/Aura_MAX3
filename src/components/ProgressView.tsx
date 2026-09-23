import React, { useState } from "react";
import { 
  Locale, 
  GenderTrack, 
  UserProfile, 
  ScanResult, 
  TransformationPlan,
  WeeklyReview 
} from "../types";
import { 
  TrendingUp, 
  Calendar, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Sliders, 
  Camera,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

interface ProgressViewProps {
  locale: Locale;
  genderTrack: GenderTrack;
  userProfile: UserProfile;
  scansHistory: ScanResult[];
  activePlan?: TransformationPlan | null;
  onInitiateScan: () => void;
  onAdjustPlan: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  locale,
  userProfile,
  scansHistory,
  activePlan,
  onInitiateScan,
  onAdjustPlan,
}) => {
  const isRtl = locale === "ar";
  const [sliderPos, setSliderPos] = useState(50);
  const [showAdaptiveToast, setShowAdaptiveToast] = useState(false);

  const baselineScan = scansHistory[scansHistory.length - 1];
  const latestScan = scansHistory[0];
  const hasMultipleScans = scansHistory.length >= 2;

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos(Math.round((x / rect.width) * 100));
  };

  const handleAdjustPlanClick = () => {
    setShowAdaptiveToast(true);
    if (onAdjustPlan) {
      onAdjustPlan();
    }
  };

  return (
    <div 
      className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#22d3ee] uppercase tracking-wider mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{isRtl ? "سجل التحول والالتزام" : "Transformation History"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f4f4f5] font-display">
            {isRtl ? "التقدم والمراجعة الأسبوعية" : "Progress & Weekly Review"}
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] mt-0.5">
            {isRtl 
              ? "سجل توثيقي حقيقي لالتزامك اليومي وفحوصاتك دون مقارنات وهمية." 
              : "An authentic record of your habit adherence and biometric milestones over time."}
          </p>
        </div>

        <button
          onClick={onInitiateScan}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#22d3ee] hover:opacity-95 text-[#09090b] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_16px_rgba(99,102,241,0.35)] active:scale-95 transition-all self-start sm:self-auto"
        >
          <Camera className="w-3.5 h-3.5 text-[#09090b]" />
          <span>{isRtl ? "إجراء فحص متابعة" : "Log Milestone Scan"}</span>
        </button>
      </div>

      {/* 2. Responsive 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: KPI METRICS & AUTHENTIC SCAN TIMELINE (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div 
              className="p-4 rounded-2xl border border-[#27272a] relative overflow-hidden"
              style={{ background: "linear-gradient(155deg, #18181b, #1c1230)" }}
            >
              <div className="flex items-center gap-1.5 text-[11px] text-[#a1a1aa]">
                <div className="flame-anim">
                  <Flame className="w-3.5 h-3.5 text-[#fb923c] glow-flame" />
                </div>
                <span>{isRtl ? "أيام الالتزام" : "Streak"}</span>
              </div>
              <div className="text-2xl font-black text-[#f4f4f5] font-display mt-1">
                {userProfile.streakDays}d
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#18181b] border border-[#27272a]">
              <div className="flex items-center gap-1 text-[11px] text-[#a1a1aa]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                <span>{isRtl ? "نسبة الأسبوع" : "Weekly Rate"}</span>
              </div>
              <div className="text-2xl font-black text-[#10b981] font-display mt-1">
                78%
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#18181b] border border-[#27272a]">
              <div className="flex items-center gap-1 text-[11px] text-[#a1a1aa]">
                <Trophy className="w-3.5 h-3.5 text-[#818cf8]" />
                <span>{isRtl ? "المستوى" : "Level"}</span>
              </div>
              <div className="text-2xl font-black text-[#818cf8] font-display mt-1">
                Lvl {userProfile.level}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#18181b] border border-[#27272a]">
              <div className="flex items-center gap-1 text-[11px] text-[#a1a1aa]">
                <Sparkles className="w-3.5 h-3.5 text-[#22d3ee]" />
                <span>{isRtl ? "نقاط XP" : "Total XP"}</span>
              </div>
              <div className="text-2xl font-black text-[#f4f4f5] font-display mt-1">
                {userProfile.xp}
              </div>
            </div>
          </div>

          {/* Authentic Baseline vs Latest Comparison Slider */}
          {hasMultipleScans && latestScan?.imageUrl && baselineScan?.imageUrl ? (
            <div className="p-6 rounded-3xl bg-[#18181b] border border-[#27272a] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a1a1aa] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#22d3ee]" />
                  <span>{isRtl ? "مقارنة خط الأساس بالفحص الأخير" : "Baseline vs Latest Scan Comparison"}</span>
                </span>
                <span className="text-xs text-[#71717a]">
                  {baselineScan.date} → {latestScan.date}
                </span>
              </div>

              {/* Slider Viewport */}
              <div 
                className="relative w-full aspect-4/3 rounded-2xl overflow-hidden select-none cursor-ew-resize bg-black border border-[#27272a]"
                onMouseMove={(e) => {
                  if (e.buttons === 1) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    handleSliderMove(e.clientX, rect);
                  }
                }}
                onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleSliderMove(e.touches[0].clientX, rect);
                }}
              >
                {/* Latest Scan (Under) */}
                <img 
                  src={latestScan.imageUrl} 
                  alt="Latest scan" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Baseline Scan (Over with Clip) */}
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img 
                    src={baselineScan.imageUrl} 
                    alt="Baseline scan" 
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: "100%", height: "100%" }}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Divider Line */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#09090b] border-2 border-[#22d3ee] flex items-center justify-center text-[10px] text-[#22d3ee]">
                    ↔
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-xs text-[#a1a1aa]">
                <span>{isRtl ? "◀ خط الأساس" : "◀ Baseline"}</span>
                <span className="text-[11px] text-[#71717a]">{isRtl ? "اسحب الشريط للمقارنة" : "Drag slider to compare"}</span>
                <span>{isRtl ? "الفحص الأخير ▶" : "Latest Scan ▶"}</span>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-[#18181b] border border-[#27272a] text-center space-y-3">
              <Camera className="w-8 h-8 text-[#22d3ee] mx-auto opacity-70" />
              <h3 className="text-sm font-bold text-[#f4f4f5]">
                {isRtl ? "أضف فحصين لتفعيل المقارنة البصرية" : "Log 2 Scans to Unlock Visual Comparison"}
              </h3>
              <p className="text-xs text-[#a1a1aa] max-w-md mx-auto">
                {isRtl 
                  ? "قم بإجراء فحص متابعة بعد أسبوعين من الالتزام بالروتين لعرض التغير الحقيقي في تماثل الملامح ونقاء البشرة." 
                  : "Complete a follow-up scan after 14 days of protocol adherence to compare facial symmetry side-by-side."}
              </p>
            </div>
          )}

          {/* Verified Scans Log */}
          <div className="p-6 rounded-3xl bg-[#18181b] border border-[#27272a] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#a1a1aa]">
              {isRtl ? "سجل الفحوصات الموثقة" : "Documented Scans History"}
            </h3>

            <div className="space-y-2.5">
              {scansHistory.map((scan, idx) => (
                <div 
                  key={scan.id} 
                  className="p-3.5 rounded-xl bg-[#111113] border border-[#27272a] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-black shrink-0 border border-[#27272a]">
                      {scan.imageUrl ? (
                        <img src={scan.imageUrl} alt="scan thumb" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-[#71717a]">#</div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#f4f4f5]">
                        {idx === 0 
                          ? (isRtl ? "الفحص الأخير" : "Latest Scan") 
                          : (isRtl ? `فحص مرحلي #${scansHistory.length - idx}` : `Milestone #${scansHistory.length - idx}`)}
                      </div>
                      <div className="text-[10px] text-[#71717a]">{scan.date}</div>
                    </div>
                  </div>

                  <div className="text-end">
                    <div className="text-sm font-bold text-[#22d3ee] font-display">
                      {scan.overallScore} <span className="text-[10px] text-[#a1a1aa]">Aura</span>
                    </div>
                    <div className="text-[10px] text-[#10b981]">
                      {isRtl ? "تماثل " : "Symmetry "} {scan.symmetryScore}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: WEEKLY REVIEW CARD & ADAPTIVE PLAN (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* WEEKLY REVIEW CARD */}
          <div className="p-6 rounded-3xl bg-[#18181b] border border-[#22d3ee]/30 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <span className="text-xs font-bold text-[#22d3ee] uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{isRtl ? "المراجعة الأسبوعية" : "Weekly Review"}</span>
              </span>
              <span className="text-xs text-[#10b981] font-bold">Week 3</span>
            </div>

            {/* Metric 1: Actions completed */}
            <div className="p-4 rounded-2xl bg-[#111113] border border-[#27272a] flex items-center justify-between">
              <div>
                <div className="text-[11px] text-[#a1a1aa]">{isRtl ? "المهام المنفذة هذا الأسبوع" : "Weekly Protocol Adherence"}</div>
                <div className="text-xl font-bold text-[#f4f4f5] font-display mt-0.5">
                  14 / 18 {isRtl ? "مهمة مكتملة" : "actions completed"}
                </div>
              </div>
              <span className="text-xs font-bold text-[#10b981]">78%</span>
            </div>

            {/* Metric 2: Strongest Habit */}
            <div className="p-4 rounded-2xl bg-[#111113] border border-[#27272a] space-y-1">
              <div className="text-[11px] font-bold text-[#10b981] uppercase tracking-wider">
                {isRtl ? "أقوى عادة لديك" : "Strongest Habit"}
              </div>
              <div className="text-xs font-semibold text-[#f4f4f5]">
                {isRtl ? "الروتين الصباحي وطرد السوائل (100% التزام)" : "Morning Hydration & Debloat (100% adherence)"}
              </div>
            </div>

            {/* Metric 3: Needs Attention */}
            <div className="p-4 rounded-2xl bg-[#111113] border border-[#27272a] space-y-1">
              <div className="text-[11px] font-bold text-[#fb923c] uppercase tracking-wider">
                {isRtl ? "تحتاج إلى انتباه" : "Needs Attention"}
              </div>
              <div className="text-xs font-semibold text-[#f4f4f5]">
                {isRtl ? "استقامة الرقبة المسائية (تخطي مرتين)" : "Evening Cervical Spine Reset (skipped 2 times)"}
              </div>
            </div>

            {/* Metric 4: Next Focus */}
            <div className="p-4 rounded-2xl bg-[#111113] border border-[#27272a] space-y-1">
              <div className="text-[11px] font-bold text-[#22d3ee] uppercase tracking-wider">
                {isRtl ? "التركيز القادم للأسبوع الجديد" : "Next Focus"}
              </div>
              <div className="text-xs font-semibold text-[#f4f4f5]">
                {isRtl ? "تقليص خطوات المساء لضمان الاستمرارية" : "Streamline evening protocol into 2 high-impact steps"}
              </div>
            </div>

            {/* CTA: Adjust My Plan */}
            <button
              onClick={handleAdjustPlanClick}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#22d3ee] hover:opacity-95 text-[#09090b] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(99,102,241,0.35)] active:scale-98 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#09090b]" />
              <span>{isRtl ? "تعديل وتكييف خطتي (Adjust My Plan)" : "Adjust My Plan"}</span>
            </button>
          </div>

          {/* Adaptive Toast Feedback */}
          {showAdaptiveToast && (
            <div className="p-4 rounded-2xl bg-[#111113] border border-[#10b981]/50 text-xs space-y-1 animate-in fade-in duration-200">
              <div className="font-bold text-[#10b981] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isRtl ? "تم تكييف الخطة بذكاء" : "Protocol Adapted Automatically"}</span>
              </div>
              <p className="text-[#a1a1aa] leading-relaxed">
                {isRtl 
                  ? "لاحظنا تفضيلك للروتين الصباحي السريع، لذا قمنا بدمج استطالة الرقبة في روتين الصباح وتقليص المساء من 4 خطوات إلى خطوتين لحماية سلسلة التزامك."
                  : "We noticed you consistently skip evening steps. We've reduced your evening protocol from 4 steps to 2, shifting high-leverage posture drills into your 100%-consistent morning stack."}
              </p>
            </div>
          )}

          {/* Streak Protection Tip */}
          <div className="p-4 rounded-2xl bg-[#18181b] border border-[#27272a] text-xs text-[#a1a1aa] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#818cf8] shrink-0 mt-0.5" />
            <span>
              {isRtl 
                ? "قاعدة أورا: الانضباط البسيط يومياً يتفوق دائماً على الجهد المكثف المتقطع." 
                : "Aura discipline rule: 5 minutes of daily consistency compounds faster than erratic 45-minute sessions."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
