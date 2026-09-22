import React, { useState } from "react";
import { 
  Locale, 
  GenderTrack, 
  UserProfile, 
  ScanResult, 
  TransformationPlan,
  WeeklyReview 
} from "../types";
import { adaptTransformationPlan } from "../services/rulesEngine";
import { 
  TrendingUp, 
  Flame, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Camera, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  ArrowLeft,
  Sliders,
  RefreshCw,
  Trophy,
  History,
  ShieldCheck,
  X
} from "lucide-react";

interface ProgressViewProps {
  locale: Locale;
  genderTrack: GenderTrack;
  userProfile: UserProfile;
  scansHistory: ScanResult[];
  activePlan?: TransformationPlan | null;
  onInitiateScan: () => void;
  onPlanAdapted?: (adapted: TransformationPlan) => void;
  onOpenChallenges: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  locale,
  genderTrack,
  userProfile,
  scansHistory,
  activePlan,
  onInitiateScan,
  onPlanAdapted,
  onOpenChallenges,
}) => {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeSubTab, setActiveSubTab] = useState<"overview" | "history">("overview");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewFeedback, setReviewFeedback] = useState<"too_hard" | "just_right" | "too_easy">("just_right");
  const [reviewCompleted, setReviewCompleted] = useState(false);
  const [adaptationSummary, setAdaptationSummary] = useState<{ en: string; ar: string } | null>(null);

  // Compute adherence rate estimate
  const adherenceRate = Math.min(100, Math.round((userProfile.streakDays / 7) * 85) || 75);

  const handleExecuteWeeklyReview = () => {
    if (activePlan && onPlanAdapted) {
      const result = adaptTransformationPlan(activePlan, {
        adherenceRate,
        skippedHabitsCount: reviewFeedback === "too_hard" ? 3 : 0,
        userFeedback: reviewFeedback,
      });
      onPlanAdapted(result.adaptedPlan);
      setAdaptationSummary(result.changeSummary);
    }
    setReviewCompleted(true);
  };

  return (
    <div 
      className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Header and Subtabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E232E]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] font-display">
            {isRtl ? "مؤشرات التحول والتقدم" : "Transformation Progress"}
          </h1>
          <p className="text-xs text-[#A5AEBC] mt-0.5">
            {isRtl 
              ? "متابعة دقيقة للاستمرارية، الفحوصات الدورية، وتكيف الخطة الأسبوعي." 
              : "Track discipline metrics, authentic scan progression, and weekly adaptation."}
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#111318] border border-[#252A33] self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab("overview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeSubTab === "overview" 
                ? "bg-[#171A21] text-[#42E8FF] shadow-sm" 
                : "text-[#A5AEBC] hover:text-[#F4F7FA]"
            }`}
          >
            {isRtl ? "نظرة عامة" : "Overview"}
          </button>
          <button
            onClick={() => setActiveSubTab("history")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeSubTab === "history" 
                ? "bg-[#171A21] text-[#42E8FF] shadow-sm" 
                : "text-[#A5AEBC] hover:text-[#F4F7FA]"
            }`}
          >
            {isRtl ? "سجل الفحوصات" : "Scan History"}
          </button>
        </div>
      </div>

      {activeSubTab === "overview" ? (
        <div className="space-y-6">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Streak */}
            <div className="p-5 rounded-2xl bg-[#111318] border border-[#252A33] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#8B5CF6]" />
                  <span>{isRtl ? "أيام الالتزام" : "Consistency"}</span>
                </span>
                <div className="text-3xl font-black text-[#F4F7FA] font-display my-2">
                  {userProfile.streakDays} <span className="text-xs text-[#A5AEBC] font-normal">{isRtl ? "يوم" : "Days"}</span>
                </div>
              </div>
              <p className="text-xs text-[#A5AEBC]">
                {isRtl ? "أطول سلسلة استمرارية دون انقطاع." : "Active unbroken daily streak."}
              </p>
            </div>

            {/* Adherence Rate */}
            <div className="p-5 rounded-2xl bg-[#111318] border border-[#252A33] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#42E8FF]" />
                  <span>{isRtl ? "معدل الالتزام الأسبوعي" : "Weekly Adherence"}</span>
                </span>
                <div className="text-3xl font-black text-[#F4F7FA] font-display my-2">
                  {adherenceRate}%
                </div>
              </div>
              <p className="text-xs text-[#A5AEBC]">
                {isRtl ? "نسبة إتمام المهام المجدولة في خطتك." : "Completion rate of scheduled plan actions."}
              </p>
            </div>

            {/* Total XP & Level */}
            <div className="p-5 rounded-2xl bg-[#111318] border border-[#252A33] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{isRtl ? "رتبة التحول" : "Tier & Experience"}</span>
                </span>
                <div className="text-3xl font-black text-[#F4F7FA] font-display my-2">
                  {userProfile.level} <span className="text-xs text-[#A5AEBC] font-normal">({userProfile.xp} XP)</span>
                </div>
              </div>
              <p className="text-xs text-[#A5AEBC]">
                {isRtl ? "تكتسب الخبرة بإتمام المهام والفحوصات." : "Earned through verified habit execution."}
              </p>
            </div>
          </div>

          {/* Weekly Review Callout Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#111318] to-[#171A21] border border-[#252A33] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#42E8FF] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isRtl ? "مراجعة نهاية الأسبوع والتكيف" : "Weekly Review & Adaptation"}</span>
              </span>
              <h2 className="text-lg font-bold text-[#F4F7FA]">
                {isRtl ? "كيف سارت خطتك هذا الأسبوع؟" : "How did your transformation go this week?"}
              </h2>
              <p className="text-xs text-[#A5AEBC] max-w-xl">
                {isRtl 
                  ? "قم بالمراجعة الأسبوعية ليقوم محرك القواعد بتعديل روتينك الصباحي والمسائي تلقائياً."
                  : "Complete your review to let the Rules Engine calibrate routine complexity based on your feedback."}
              </p>
            </div>

            <button
              onClick={() => {
                setReviewCompleted(false);
                setShowReviewModal(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(66,232,255,0.2)] active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <span>{isRtl ? "بدء المراجعة الأسبوعية" : "Start Weekly Review"}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Behavioral Challenges Shortcut */}
          <div className="p-5 rounded-2xl bg-[#111318] border border-[#252A33] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#F4F7FA]">
                  {isRtl ? "سبرنتات وتحديات العادات" : "Behavioral Sprint Challenges"}
                </h3>
                <p className="text-xs text-[#A5AEBC]">
                  {isRtl ? "تحدي 7 أيام لطرد السوائل، 14 يوماً للاستقامة، و21 يوماً للبشرة الزجاجية." : "Focus sprints: 7-Day Debloat, 14-Day Posture, 21-Day Glass Skin."}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenChallenges}
              className="px-4 py-2 rounded-xl bg-[#171A21] hover:bg-[#252A33] border border-[#252A33] text-xs font-bold text-[#F4F7FA] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{isRtl ? "عرض التحديات" : "View Sprints"}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Scan History Subtab */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#F4F7FA] uppercase tracking-wider">
              {isRtl ? "سجل الفحوصات البيومترية الحقيقية" : "Verified Transformation Scan Log"}
            </h2>
            <button
              onClick={onInitiateScan}
              className="px-3 py-1.5 rounded-lg bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{isRtl ? "فحص جديد" : "Log New Scan"}</span>
            </button>
          </div>

          {scansHistory.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#111318] border border-[#252A33] text-center space-y-3">
              <Camera className="w-8 h-8 text-[#6B7484] mx-auto" />
              <div className="text-sm font-bold text-[#F4F7FA]">
                {isRtl ? "لا توجد فحوصات سابقة محفوظة بعد" : "No scans logged yet"}
              </div>
              <p className="text-xs text-[#A5AEBC] max-w-sm mx-auto">
                {isRtl 
                  ? "أجرِ فحصك البيومتري الأول لتسجيل خط الأساس وبدء متابعة تطور ملامحك." 
                  : "Perform your first scan to establish your baseline and begin tracking facial harmony changes."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {scansHistory.map((scan, idx) => (
                <div 
                  key={scan.id || idx}
                  className="p-5 rounded-2xl bg-[#111318] border border-[#252A33] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#08090C] border border-[#252A33] flex flex-col items-center justify-center shrink-0">
                      <span className="text-base font-black text-[#42E8FF] font-display leading-none">
                        {scan.overallScore}
                      </span>
                      <span className="text-[9px] text-[#6B7484] mt-0.5">SCORE</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#F4F7FA]">
                          {isRtl ? `فحص #${scansHistory.length - idx}` : `Scan #${scansHistory.length - idx}`}
                        </span>
                        <span className="text-[10px] text-[#6B7484] flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{scan.date}</span>
                        </span>
                      </div>
                      <div className="text-xs text-[#A5AEBC] mt-0.5 flex items-center gap-3">
                        <span>{isRtl ? "زاوية الفك:" : "Jaw:"} {scan.gonialAngle}</span>
                        <span>·</span>
                        <span>{isRtl ? "تناسق الملامح:" : "Symmetry:"} {scan.symmetryScore}%</span>
                        <span>·</span>
                        <span>{isRtl ? "النضارة:" : "Skin:"} {scan.skinScore}/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-[#6B7484] text-start sm:text-end">
                    {scan.notes ? scan.notes[locale] : (isRtl ? "فحص بيومتري موثق" : "Verified scan")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Weekly Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#111318] border border-[#252A33] rounded-3xl p-6 relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 end-5 p-1.5 rounded-lg bg-[#171A21] text-[#A5AEBC] hover:text-[#F4F7FA] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!reviewCompleted ? (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#171A21] text-xs font-semibold text-[#42E8FF] mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>{isRtl ? "المعايرة الأسبوعية" : "Weekly Calibration"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#F4F7FA] font-display">
                    {isRtl ? "كيف كانت وتيرة خطتك هذا الأسبوع؟" : "Calibrate Next Week's Transformation"}
                  </h3>
                  <p className="text-xs text-[#A5AEBC] mt-1 leading-relaxed">
                    {isRtl 
                      ? "إجابتك تضبط محرك القواعد ليعدل كثافة الروتين الصباحي والمسائي بما يناسب جدولك الفعلي." 
                      : "Your feedback directs the Rules Engine to simplify or progress your routine."}
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: "too_hard" as const,
                      label: isRtl ? "كانت المهام صعبة / ضيقة الوقت" : "Too demanding / Missed evening tasks",
                      desc: isRtl ? "محرك القواعد سيبسط الخطة إلى 5 دقائق أساسية لتثبيت الالتزام." : "Rules engine will streamline to core 5-min foundation habits.",
                    },
                    {
                      id: "just_right" as const,
                      label: isRtl ? "الوتيرة ممتازة ومتوازنة" : "Balanced & Sustainable",
                      desc: isRtl ? "الحفاظ على نفس التوازن مع تعميق التدريب." : "Maintain current protocols and lock in muscle memory.",
                    },
                    {
                      id: "too_easy" as const,
                      label: isRtl ? "سهلة جداً، جاهز للتحدي الأكبر" : "Too easy / Ready to advance",
                      desc: isRtl ? "إضافة بروتوكولات تدليك ونحت متقدمة لتسريع النتائج." : "Add advanced sculpting progression protocols.",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setReviewFeedback(opt.id)}
                      className={`w-full p-4 rounded-xl border text-start transition-all cursor-pointer ${
                        reviewFeedback === opt.id
                          ? "bg-[#171A21] border-[#42E8FF] shadow-[0_0_12px_rgba(66,232,255,0.15)]"
                          : "bg-[#08090C] border-[#252A33] hover:border-[#42E8FF]/40"
                      }`}
                    >
                      <div className={`text-xs font-bold mb-1 ${
                        reviewFeedback === opt.id ? "text-[#42E8FF]" : "text-[#F4F7FA]"
                      }`}>
                        {opt.label}
                      </div>
                      <div className="text-[11px] text-[#A5AEBC] leading-relaxed">
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleExecuteWeeklyReview}
                  className="w-full py-3 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold transition-all cursor-pointer"
                >
                  {isRtl ? "تطبيق التعديلات على خطة الأسبوع الجديد" : "Apply Calibration & Update Plan"}
                </button>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#42E8FF] mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-[#F4F7FA]">
                  {isRtl ? "تمت معايرة خطتك بنجاح!" : "Plan Calibrated Successfully!"}
                </h3>
                {adaptationSummary && (
                  <p className="text-xs text-[#A5AEBC] max-w-sm mx-auto leading-relaxed">
                    {adaptationSummary[locale]}
                  </p>
                )}
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold transition-colors cursor-pointer"
                >
                  {isRtl ? "العودة للوحة التقدم" : "Return to Progress"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
