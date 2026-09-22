import React, { useState } from "react";
import { 
  Locale, 
  GenderTrack, 
  UserGoal, 
  TimeBudget, 
  BudgetLevel, 
  TransformationPlan, 
  ScanResult 
} from "../types";
import { generateTransformationPlan } from "../services/rulesEngine";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  DollarSign, 
  Target, 
  CheckCircle2, 
  Check, 
  Flame, 
  Sun, 
  Moon, 
  ShieldCheck, 
  BookmarkCheck,
  ChevronRight,
  Info
} from "lucide-react";

interface PlanBuilderViewProps {
  locale: Locale;
  genderTrack: GenderTrack;
  scanResult?: ScanResult | null;
  onPlanCreated: (plan: TransformationPlan) => void;
  onCancel: () => void;
}

export const PlanBuilderView: React.FC<PlanBuilderViewProps> = ({
  locale,
  genderTrack,
  scanResult,
  onPlanCreated,
  onCancel,
}) => {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Step in plan builder: 1 = Personalization Inputs, 2 = Generated Plan Review
  const [step, setStep] = useState<1 | 2>(1);

  // Quick Personalization inputs
  const [primaryGoal, setPrimaryGoal] = useState<UserGoal>(
    scanResult?.jawlineScore && scanResult.jawlineScore < 85 ? "face" : "skin"
  );
  const [timeBudget, setTimeBudget] = useState<TimeBudget>("15m");
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>("free");

  // Generated Plan
  const [generatedPlan, setGeneratedPlan] = useState<TransformationPlan | null>(null);

  const handleGeneratePlan = () => {
    const plan = generateTransformationPlan({
      genderTrack,
      primaryGoal,
      timeBudget,
      budgetLevel,
      scanResult,
    });
    setGeneratedPlan(plan);
    setStep(2);
  };

  const handleStartDayOne = () => {
    if (generatedPlan) {
      onPlanCreated(generatedPlan);
    }
  };

  return (
    <div 
      className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1E232E]">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#42E8FF] text-[#08090C] font-bold text-xs flex items-center justify-center">
            {step === 1 ? "1" : "✓"}
          </span>
          <span className="text-xs font-semibold text-[#F4F7FA]">
            {isRtl ? "تخصيص الخطة" : "Quick Personalization"}
          </span>
          <span className="text-[#6B7484]">→</span>
          <span className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center ${
            step === 2 ? "bg-[#42E8FF] text-[#08090C]" : "bg-[#171A21] text-[#A5AEBC]"
          }`}>
            2
          </span>
          <span className={`text-xs font-semibold ${step === 2 ? "text-[#F4F7FA]" : "text-[#6B7484]"}`}>
            {isRtl ? "خطة التحول المعتمدة" : "Personal Plan"}
          </span>
        </div>

        <button
          onClick={onCancel}
          className="text-xs text-[#6B7484] hover:text-[#A5AEBC] transition-colors cursor-pointer"
        >
          {isRtl ? "إلغاء" : "Cancel"}
        </button>
      </div>

      {step === 1 ? (
        /* STEP 1: Quick Personalization (Goal, Time, Budget) */
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] font-display mb-2">
              {isRtl ? "تخصيص خطتك في 3 أسئلة بسيطة" : "Personalize Your Transformation Plan"}
            </h1>
            <p className="text-xs sm:text-sm text-[#A5AEBC]">
              {isRtl 
                ? "يقوم محرك القواعد ببناء برنامج واقعي مخصص بناءً على وقتك المتاح وميزانيتك." 
                : "The Rules Engine crafts a realistic protocol built around your real schedule and budget."}
            </p>
          </div>

          {/* Question 1: Primary Goal */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#42E8FF]" />
              <span>{isRtl ? "1. ما هو هدفك الجمالي الأساسي؟" : "1. What is your primary focus area?"}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { 
                  id: "face" as UserGoal, 
                  label: isRtl ? "هندسة الفك والوجه" : "Facial Structure & Jaw",
                  desc: isRtl ? "طرد السوائل واستقامة الرقبة" : "Debloating & gonial definition"
                },
                { 
                  id: "skin" as UserGoal, 
                  label: isRtl ? "نقاء ونضارة البشرة" : "Glass Skin & Barrier",
                  desc: isRtl ? "حماية كولاجين وSPF 50+" : "SPF 50+ & peptide hydration"
                },
                { 
                  id: "hair" as UserGoal, 
                  label: isRtl ? "تسريحة وكثافة الشعر" : "Hair Density & Framing",
                  desc: isRtl ? "قصات مناسبة للوجه وتكثيف" : "Face-shape cuts & scalp health"
                },
                { 
                  id: "grooming" as UserGoal, 
                  label: isRtl ? "تحديد اللحية والحواجب" : "Precision Grooming",
                  desc: isRtl ? "تشذيب دقيق وسحبة العين" : "Neckline & brow architecture"
                },
                { 
                  id: "style" as UserGoal, 
                  label: isRtl ? "استقامة القامة والهيبة" : "Postural Alignment",
                  desc: isRtl ? "تصحيح الرقبة وفرد الأكتاف" : "Thoracic & cervical poise"
                },
              ].map((item) => {
                const isSelected = primaryGoal === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setPrimaryGoal(item.id)}
                    className={`p-3.5 rounded-xl border text-start transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#111318] border-[#42E8FF] shadow-[0_0_15px_rgba(66,232,255,0.15)]"
                        : "bg-[#111318]/60 border-[#252A33] hover:border-[#42E8FF]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${isSelected ? "text-[#42E8FF]" : "text-[#F4F7FA]"}`}>
                        {item.label}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#42E8FF]" />}
                    </div>
                    <p className="text-[11px] text-[#A5AEBC] leading-tight">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Time Available */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#42E8FF]" />
              <span>{isRtl ? "2. كم دقيقة تستطيع تخصيصها يومياً؟" : "2. How much time can you commit daily?"}</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { 
                  id: "5m" as TimeBudget, 
                  time: "5 min/day", 
                  label: isRtl ? "الحد الأساسي" : "Essential Micro",
                  desc: isRtl ? "عادتان أساسيتان فقط" : "2 core foundation habits"
                },
                { 
                  id: "15m" as TimeBudget, 
                  time: "15 min/day", 
                  label: isRtl ? "المسار الموصى به" : "Recommended",
                  desc: isRtl ? "روتين صباحي ومسائي متكامل" : "Balanced morning & evening"
                },
                { 
                  id: "30m" as TimeBudget, 
                  time: "30 min/day", 
                  label: isRtl ? "التحول المركز" : "Comprehensive",
                  desc: isRtl ? "بروتوكولات متقدمة وتدليك" : "Deep sculpt & full protocol"
                },
              ].map((item) => {
                const isSelected = timeBudget === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setTimeBudget(item.id)}
                    className={`p-3.5 rounded-xl border text-start transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#111318] border-[#42E8FF] shadow-[0_0_15px_rgba(66,232,255,0.15)]"
                        : "bg-[#111318]/60 border-[#252A33] hover:border-[#42E8FF]/40"
                    }`}
                  >
                    <div className="text-sm font-bold text-[#F4F7FA] mb-0.5">{item.time}</div>
                    <div className="text-[11px] font-semibold text-[#42E8FF]">{item.label}</div>
                    <div className="text-[10px] text-[#A5AEBC] mt-1">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: Budget Level */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC] flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#42E8FF]" />
              <span>{isRtl ? "3. ما هي ميزانيتك المفضلة؟" : "3. What is your preferred budget range?"}</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { 
                  id: "free" as BudgetLevel, 
                  level: isRtl ? "مجاني بالكامل ($0)" : "100% Free ($0)",
                  desc: isRtl ? "عادات منزلية، وضعية اللسان والماء" : "DIY home habits, mewing & ice"
                },
                { 
                  id: "essential" as BudgetLevel, 
                  level: isRtl ? "اقتصادي أساسي ($)" : "Essential ($)",
                  desc: isRtl ? "واقي شمس وغوا شا بسيط" : "Sunscreen + basic gua sha"
                },
                { 
                  id: "optimized" as BudgetLevel, 
                  level: isRtl ? "شامل متكامل ($$)" : "Optimized ($$)",
                  desc: isRtl ? "سيروم ببتيدات وماكينة تشذيب" : "Targeted serums & precision tools"
                },
              ].map((item) => {
                const isSelected = budgetLevel === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setBudgetLevel(item.id)}
                    className={`p-3.5 rounded-xl border text-start transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#111318] border-[#42E8FF] shadow-[0_0_15px_rgba(66,232,255,0.15)]"
                        : "bg-[#111318]/60 border-[#252A33] hover:border-[#42E8FF]/40"
                    }`}
                  >
                    <div className="text-xs font-bold text-[#F4F7FA] mb-1">{item.level}</div>
                    <div className="text-[10px] text-[#A5AEBC] leading-tight">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={handleGeneratePlan}
            className="w-full py-4 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-sm font-extrabold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(66,232,255,0.25)] active:scale-98 transition-all cursor-pointer"
          >
            <span>{isRtl ? "توليد خطة التحول الشخصية" : "Generate My Transformation Plan"}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      ) : generatedPlan ? (
        /* STEP 2: Personal Transformation Plan Review */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#111318] border border-[#252A33] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#252A33]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#42E8FF] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isRtl ? "خطتك المعتمدة — الأسبوع الأول" : "Approved Plan — Week 1"}</span>
              </span>
              <span className="text-xs text-[#A5AEBC] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#42E8FF]" />
                <span>{generatedPlan.estimatedDailyMinutes} {isRtl ? "دقيقة/يومياً" : "min/day"}</span>
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#F4F7FA] font-display mb-1">
                {generatedPlan.title[locale]}
              </h2>
              <p className="text-xs sm:text-sm text-[#A5AEBC] leading-relaxed">
                {generatedPlan.summary[locale]}
              </p>
            </div>

            {/* Prioritization rationale */}
            <div className="p-3.5 rounded-xl bg-[#08090C] border border-[#252A33] flex items-start gap-2.5 text-xs text-[#A5AEBC]">
              <Info className="w-4 h-4 text-[#42E8FF] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#F4F7FA] block mb-0.5">
                  {isRtl ? "سبب تحديد هذه الأولويات:" : "Why this is prioritized for you:"}
                </span>
                <span>{generatedPlan.prioritizationReason[locale]}</span>
              </div>
            </div>

            {/* Weekly Objective */}
            <div className="p-3.5 rounded-xl bg-[#08090C] border border-[#252A33] flex items-start gap-2.5 text-xs text-[#A5AEBC]">
              <Target className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#F4F7FA] block mb-0.5">
                  {isRtl ? "الهدف الأسبوعي الأول:" : "First Week Objective:"}
                </span>
                <span>{generatedPlan.weeklyObjective[locale]}</span>
              </div>
            </div>
          </div>

          {/* Daily Actions Breakdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#F4F7FA] uppercase tracking-wider">
              {isRtl ? "المهام اليومية المجدولة" : "Scheduled Daily Actions"}
            </h3>

            {/* Morning Quests */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#A5AEBC] flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>{isRtl ? "الروتين الصباحي" : "Morning Protocol"}</span>
              </div>
              {generatedPlan.dailyMorningQuests.map((q) => (
                <div key={q.id} className="p-3.5 rounded-xl bg-[#111318] border border-[#252A33] flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-[#F4F7FA] mb-1">{q.title[locale]}</div>
                    <div className="text-[11px] text-[#A5AEBC]">{q.description[locale]}</div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#42E8FF] shrink-0">
                    +{q.xp} XP
                  </span>
                </div>
              ))}
            </div>

            {/* Evening Quests */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#A5AEBC] flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>{isRtl ? "الروتين المسائي" : "Evening Protocol"}</span>
              </div>
              {generatedPlan.dailyEveningQuests.map((q) => (
                <div key={q.id} className="p-3.5 rounded-xl bg-[#111318] border border-[#252A33] flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-[#F4F7FA] mb-1">{q.title[locale]}</div>
                    <div className="text-[11px] text-[#A5AEBC]">{q.description[locale]}</div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#8B5CF6] shrink-0">
                    +{q.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary CTA: Start Day 1 */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setStep(1)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#111318] border border-[#252A33] text-xs font-semibold text-[#A5AEBC] hover:text-[#F4F7FA] transition-colors cursor-pointer"
            >
              {isRtl ? "تعديل التخصيص" : "Adjust Options"}
            </button>
            <button
              onClick={handleStartDayOne}
              className="w-full flex-1 py-3.5 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-sm font-extrabold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(66,232,255,0.3)] active:scale-98 transition-all cursor-pointer"
            >
              <span>{isRtl ? "اعتماد الخطة وبدء اليوم الأول" : "Start Day 1 Protocol"}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
