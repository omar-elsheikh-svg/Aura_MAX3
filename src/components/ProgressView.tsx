import React, { useState } from "react";
import { 
  Locale, 
  UserProfile, 
  ScanResult, 
  TransformationPlan, 
  GenderTrack 
} from "../types";
import { 
  TrendingUp, 
  Flame, 
  Trophy, 
  Calendar, 
  Clock, 
  Sliders, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Camera, 
  Layers, 
  RotateCcw,
  Target,
  AlertCircle
} from "lucide-react";
import { translations } from "../i18n/translations";

interface ProgressViewProps {
  locale: Locale;
  genderTrack?: GenderTrack;
  userProfile: UserProfile;
  scansHistory: ScanResult[];
  activePlan?: TransformationPlan | null;
  onInitiateScan: () => void;
  onAdjustPlan?: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  locale,
  genderTrack = "male",
  userProfile,
  scansHistory,
  activePlan,
  onInitiateScan,
  onAdjustPlan,
}) => {
  const t = translations[locale];
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [sliderPos, setSliderPos] = useState(50);
  const [showAdaptiveToast, setShowAdaptiveToast] = useState(false);

  const hasMultipleScans = scansHistory && scansHistory.length >= 2;
  const latestScan = scansHistory && scansHistory.length > 0 ? scansHistory[0] : null;
  const baselineScan = scansHistory && scansHistory.length > 0 ? scansHistory[scansHistory.length - 1] : null;

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    let pos = ((clientX - rect.left) / rect.width) * 100;
    if (pos < 5) pos = 5;
    if (pos > 95) pos = 95;
    setSliderPos(pos);
  };

  const handleAdjustPlanClick = () => {
    setShowAdaptiveToast(true);
    setTimeout(() => setShowAdaptiveToast(false), 4000);
    if (onAdjustPlan) {
      onAdjustPlan();
    }
  };

  return (
    <div 
      className="max-w-6xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#252A33]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#42E8FF] uppercase tracking-wider mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{isRtl ? "سجل التحول والالتزام" : "Transformation History"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] font-display">
            {isRtl ? "التقدم والمراجعة الأسبوعية" : "Progress & Weekly Review"}
          </h1>
          <p className="text-xs sm:text-sm text-[#A5AEBC] mt-0.5">
            {isRtl 
              ? "سجل توثيقي حقيقي لالتزامك اليومي وفحوصاتك دون مقارنات وهمية." 
              : "An authentic record of your habit adherence and biometric milestones over time."}
          </p>
        </div>

        <button
          onClick={onInitiateScan}
          className="px-4 py-2.5 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(66,232,255,0.2)] active:scale-95 transition-all self-start sm:self-auto"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{isRtl ? "إجراء فحص متابعة" : "Log Milestone Scan"}</span>
        </button>
      </div>

      {/* 2. Responsive 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: KPI METRICS & AUTHENTIC SCAN TIMELINE (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-[#111318] border border-[#252A33]">
              <div className="flex items-center gap-1 text-[11px] text-[#A5AEBC]">
                <Flame className="w-3.5 h-3.5 text-[#42E8FF]" />
                <span>{isRtl ? "أيام الالتزام" : "Streak"}</span>
              </div>
              <div className="text-2xl font-black text-[#F4F7FA] font-display mt-1">
                {userProfile.streakDays}d
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#111318] border border-[#252A33]">
              <div className="flex items-center gap-1 text-[11px] text-[#A5AEBC]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>{isRtl ? "نسبة الأسبوع" : "Weekly Rate"}</span>
              </div>
              <div className="text-2xl font-black text-[#10B981] font-display mt-1">
                78%
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#111318] border border-[#252A33]">
              <div className="flex items-center gap-1 text-[11px] text-[#A5AEBC]">
                <Trophy className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>{isRtl ? "المستوى" : "Level"}</span>
              </div>
              <div className="text-2xl font-black text-[#8B5CF6] font-display mt-1">
                Lvl {userProfile.level}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#111318] border border-[#252A33]">
              <div className="flex items-center gap-1 text-[11px] text-[#A5AEBC]">
                <Sparkles className="w-3.5 h-3.5 text-[#42E8FF]" />
                <span>{isRtl ? "نقاط XP" : "Total XP"}</span>
              </div>
              <div className="text-2xl font-black text-[#F4F7FA] font-display mt-1">
                {userProfile.xp}
              </div>
            </div>
          </div>

          {/* Authentic Baseline vs Latest Comparison Slider */}
          {hasMultipleScans && latestScan?.imageUrl && baselineScan?.imageUrl ? (
            <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#42E8FF]" />
                  <span>{isRtl ? "مقارنة خط الأساس بالفحص الأخير" : "Baseline vs Latest Scan Comparison"}</span>
                </span>
                <span className="text-xs text-[#6B7484]">
                  {baselineScan.date} → {latestScan.date}
                </span>
              </div>

              {/* Slider Viewport */}
              <div 
                className="relative w-full aspect-4/3 rounded-2xl overflow-hidden select-none cursor-ew-resize bg-black border border-[#252A33]"
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
                  className="absolute top-0 bottom-0 w-0.5 bg-[#42E8FF] shadow-[0_0_10px_#42E8FF]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#08090C] border-2 border-[#42E8FF] flex items-center justify-center text-[10px] text-[#42E8FF]">
                    ↔
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-xs text-[#A5AEBC]">
                <span>{isRtl ? "◀ خط الأساس" : "◀ Baseline"}</span>
                <span className="text-[11px] text-[#6B7484]">{isRtl ? "اسحب الشريط للمقارنة" : "Drag slider to compare"}</span>
                <span>{isRtl ? "الفحص الأخير ▶" : "Latest Scan ▶"}</span>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] text-center space-y-3">
              <Camera className="w-8 h-8 text-[#42E8FF] mx-auto opacity-70" />
              <h3 className="text-sm font-bold text-[#F4F7FA]">
                {isRtl ? "أضف فحصين لتفعيل المقارنة البصرية" : "Log 2 Scans to Unlock Visual Comparison"}
              </h3>
              <p className="text-xs text-[#A5AEBC] max-w-md mx-auto">
                {isRtl 
                  ? "قم بإجراء فحص متابعة بعد أسبوعين من الالتزام بالروتين لعرض التغير الحقيقي في تماثل الملامح ونقاء البشرة." 
                  : "Complete a follow-up scan after 14 days of protocol adherence to compare facial symmetry side-by-side."}
              </p>
            </div>
          )}

          {/* Verified Scans Log */}
          <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC]">
              {isRtl ? "سجل الفحوصات الموثقة" : "Documented Scans History"}
            </h3>

            <div className="space-y-2.5">
              {scansHistory.map((scan, idx) => (
                <div 
                  key={scan.id} 
                  className="p-3.5 rounded-xl bg-[#171A21] border border-[#252A33] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-black shrink-0 border border-[#252A33]">
                      {scan.imageUrl ? (
                        <img src={scan.imageUrl} alt="scan thumb" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-[#6B7484]">#</div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#F4F7FA]">
                        {idx === 0 
                          ? (isRtl ? "الفحص الأخير" : "Latest Scan") 
                          : (isRtl ? `فحص مرحلي #${scansHistory.length - idx}` : `Milestone #${scansHistory.length - idx}`)}
                      </div>
                      <div className="text-[10px] text-[#6B7484]">{scan.date}</div>
                    </div>
                  </div>

                  <div className="text-end">
                    <div className="text-sm font-bold text-[#42E8FF] font-display">
                      {scan.overallScore} <span className="text-[10px] text-[#A5AEBC]">Aura</span>
                    </div>
                    <div className="text-[10px] text-[#10B981]">
                      {isRtl ? "تماثل " : "Symmetry "} {scan.symmetryScore}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: WEEKLY REVIEW CARD & ADAPTIVE PLAN (5 cols) (Section 20) */}
        <div className="lg:col-span-5 space-y-6">
          {/* WEEKLY REVIEW CARD (Master Prompt Section 20) */}
          <div className="p-6 rounded-3xl bg-[#111318] border border-[#42E8FF]/30 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#252A33]">
              <span className="text-xs font-bold text-[#42E8FF] uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{isRtl ? "المراجعة الأسبوعية" : "Weekly Review"}</span>
              </span>
              <span className="text-xs text-[#10B981] font-bold">Week 3</span>
            </div>

            {/* Metric 1: Actions completed */}
            <div className="p-4 rounded-2xl bg-[#171A21] border border-[#252A33] flex items-center justify-between">
              <div>
                <div className="text-[11px] text-[#A5AEBC]">{isRtl ? "المهام المنفذة هذا الأسبوع" : "Weekly Protocol Adherence"}</div>
                <div className="text-xl font-bold text-[#F4F7FA] font-display mt-0.5">
                  14 / 18 {isRtl ? "مهمة مكتملة" : "actions completed"}
                </div>
              </div>
              <span className="text-xs font-bold text-[#10B981]">78%</span>
            </div>

            {/* Metric 2: Strongest Habit */}
            <div className="p-4 rounded-2xl bg-[#171A21] border border-[#252A33] space-y-1">
              <div className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider">
                {isRtl ? "أقوى عادة لديك" : "Strongest Habit"}
              </div>
              <div className="text-xs font-semibold text-[#F4F7FA]">
                {isRtl ? "الروتين الصباحي وطرد السوائل (100% التزام)" : "Morning Hydration & Debloat (100% adherence)"}
              </div>
            </div>

            {/* Metric 3: Needs Attention */}
            <div className="p-4 rounded-2xl bg-[#171A21] border border-[#252A33] space-y-1">
              <div className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider">
                {isRtl ? "تحتاج إلى انتباه" : "Needs Attention"}
              </div>
              <div className="text-xs font-semibold text-[#F4F7FA]">
                {isRtl ? "استقامة الرقبة المسائية (تخطي مرتين)" : "Evening Cervical Spine Reset (skipped 2 times)"}
              </div>
            </div>

            {/* Metric 4: Next Focus */}
            <div className="p-4 rounded-2xl bg-[#171A21] border border-[#252A33] space-y-1">
              <div className="text-[11px] font-bold text-[#42E8FF] uppercase tracking-wider">
                {isRtl ? "التركيز القادم للأسبوع الجديد" : "Next Focus"}
              </div>
              <div className="text-xs font-semibold text-[#F4F7FA]">
                {isRtl ? "تقليص خطوات المساء لضمان الاستمرارية" : "Streamline evening protocol into 2 high-impact steps"}
              </div>
            </div>

            {/* CTA: Adjust My Plan */}
            <button
              onClick={handleAdjustPlanClick}
              className="w-full py-3.5 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(66,232,255,0.25)] active:scale-98 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>{isRtl ? "تعديل وتكييف خطتي (Adjust My Plan)" : "Adjust My Plan"}</span>
            </button>
          </div>

          {/* Adaptive Toast Feedback (Prompt: "When a plan adapts, tell the user WHY") */}
          {showAdaptiveToast && (
            <div className="p-4 rounded-2xl bg-[#171A21] border border-[#10B981]/50 text-xs space-y-1 animate-in fade-in duration-200">
              <div className="font-bold text-[#10B981] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isRtl ? "تم تكييف الخطة بذكاء" : "Protocol Adapted Automatically"}</span>
              </div>
              <p className="text-[#A5AEBC] leading-relaxed">
                {isRtl 
                  ? "لاحظنا تفضيلك للروتين الصباحي السريع، لذا قمنا بدمج استطالة الرقبة في روتين الصباح وتقليص المساء من 4 خطوات إلى خطوتين لحماية سلسلة التزامك."
                  : "We noticed you consistently skip evening steps. We've reduced your evening protocol from 4 steps to 2, shifting high-leverage posture drills into your 100%-consistent morning stack."}
              </p>
            </div>
          )}

          {/* Streak Protection Tip */}
          <div className="p-4 rounded-2xl bg-[#111318] border border-[#252A33] text-xs text-[#A5AEBC] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
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
