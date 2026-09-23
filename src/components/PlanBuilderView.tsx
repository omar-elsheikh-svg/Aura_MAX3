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
  Info,
  Zap
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

  // Step 1: Personalization questions, Step 2: Generated Personal Plan
  const [step, setStep] = useState<1 | 2>(1);

  const [primaryGoal, setPrimaryGoal] = useState<UserGoal>(
    scanResult?.jawlineScore && scanResult.jawlineScore < 85 ? "face" : "skin"
  );
  const [timeBudget, setTimeBudget] = useState<TimeBudget>("15m");
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>("free");

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
      className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Header breadcrumb */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#252A33]">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
            step === 1 ? "bg-[#42E8FF] text-[#08090C]" : "bg-[#171A21] text-[#10B981]"
          }`}>
            {step === 1 ? "1" : "✓"}
          </span>
          <span className={step === 1 ? "text-[#F4F7FA]" : "text-[#A5AEBC]"}>
            {isRtl ? "تخصيص الخطة" : "Personalization"}
          </span>
          <span className="text-[#6B7484]">/</span>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
            step === 2 ? "bg-[#42E8FF] text-[#08090C]" : "bg-[#171A21] text-[#6B7484]"
          }`}>
            2
          </span>
          <span className={step === 2 ? "text-[#F4F7FA]" : "text-[#6B7484]"}>
            {isRtl ? "خطتك الشخصية" : "Personal Plan"}
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
        /* STEP 1: Quick Personalization */
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] font-display mb-2">
              {isRtl ? "تخصيص خطتك في 3 أسئلة بسيطة" : "Build Your Personal Plan"}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { 
                  id: "face" as UserGoal, 
                  label: isRtl ? "هندسة الفك والوجه" : "Facial Structure & Jaw",
                  desc: isRtl ? "طرد السوائل واستقامة الرقبة" : "Debloating & gonial definition"
                },
                { 
                  id: "skin" as UserGoal, 
                  label: isRtl ? "نقاء ونضارة البشرة" : "Skin Clarity & Barrier",
                  desc: isRtl ? "حماية كولاجين وترطيب عميق" : "SPF 50+ & ceramide hydration"
                },
                { 
                  id: "hair" as UserGoal, 
                  label: isRtl ? "قصة الشعر والتأطير" : "Haircut Framing & Volume",
                  desc: isRtl ? "قصات مناسبة لشكل الوجه" : "Face-shape tailored styling"
                },
                { 
                  id: "grooming" as UserGoal, 
                  label: isRtl ? "التشذيب والحواجب" : "Precision Grooming",
                  desc: isRtl ? "تحديد اللحية أو سحبة الحواجب" : "Beard neckline & brow framing"
                },
                { 
                  id: "style" as UserGoal, 
                  label: isRtl ? "استقامة القامة والهيبة" : "Postural Poise",
                  desc: isRtl ? "تصحيح الرقبة وفرد الأكتاف" : "Cervical & thoracic alignment"
                },
              ].map((item) => {
                const isSelected = primaryGoal === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setPrimaryGoal(item.id)}
                    className={`p-4 rounded-2xl text-start transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-[#171A21] border-[#42E8FF] shadow-xs"
                        : "bg-[#111318] border-[#252A33] hover:border-[#42E8FF]/30"
                    }`}
                  >
                    <div className="text-xs font-bold text-[#F4F7FA] mb-1">{item.label}</div>
                    <div className="text-[11px] text-[#A5AEBC]">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Time Budget */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#42E8FF]" />
              <span>{isRtl ? "2. كم من الوقت تستطيع تخصيصه يومياً؟" : "2. Daily time investment"}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { 
                  id: "5m" as TimeBudget, 
                  label: isRtl ? "سريع (5 دقائق)" : "Micro Stack (5m)", 
                  desc: isRtl ? "خطوات أساسية سريعة ومباشرة" : "High-leverage essential actions" 
                },
                { 
                  id: "15m" as TimeBudget, 
                  label: isRtl ? "متوازن (15 دقيقة)" : "Balanced Ritual (15m)", 
                  desc: isRtl ? "المسار الموصى به لمعظم المستخدمين" : "Recommended for sustainable habit" 
                },
                { 
                  id: "30m" as TimeBudget, 
                  label: isRtl ? "مكثف (30 دقيقة)" : "Deep Transformation (30m)", 
                  desc: isRtl ? "روتين شامل مع تمارين نحت واستطالة" : "Comprehensive sculpting & drills" 
                },
              ].map((item) => {
                const isSelected = timeBudget === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setTimeBudget(item.id)}
                    className={`p-4 rounded-2xl text-start transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-[#171A21] border-[#42E8FF] shadow-xs"
                        : "bg-[#111318] border-[#252A33] hover:border-[#42E8FF]/30"
                    }`}
                  >
                    <div className="text-xs font-bold text-[#F4F7FA] mb-1">{item.label}</div>
                    <div className="text-[11px] text-[#A5AEBC]">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: Budget Level */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC] flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#42E8FF]" />
              <span>{isRtl ? "3. مستوى الاستثمار المادي المفضل" : "3. Budget level"}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { 
                  id: "free" as BudgetLevel, 
                  label: isRtl ? "مجاني 100% (طبيعي)" : "Zero-Cost (Natural)", 
                  desc: isRtl ? "تدليك يدوي، ماء مثلج، تمارين قامة" : "Manual massage, cold water, posture drills" 
                },
                { 
                  id: "minimal" as BudgetLevel, 
                  label: isRtl ? "أساسي وميسور" : "Minimal Budget", 
                  desc: isRtl ? "غسول لطيف + واقي شمس موثوق" : "Gentle cleanser + reliable SPF 50+" 
                },
                { 
                  id: "premium" as BudgetLevel, 
                  label: isRtl ? "متقدم ومتكامل" : "Comprehensive Stack", 
                  desc: isRtl ? "سيرومات ببتيدات وحجر غوا شا" : "Peptide serums + Gua Sha / Trimmer" 
                },
              ].map((item) => {
                const isSelected = budgetLevel === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setBudgetLevel(item.id)}
                    className={`p-4 rounded-2xl text-start transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-[#171A21] border-[#42E8FF] shadow-xs"
                        : "bg-[#111318] border-[#252A33] hover:border-[#42E8FF]/30"
                    }`}
                  >
                    <div className="text-xs font-bold text-[#F4F7FA] mb-1">{item.label}</div>
                    <div className="text-[11px] text-[#A5AEBC]">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleGeneratePlan}
              className="w-full py-4 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(66,232,255,0.25)] active:scale-98 transition-all cursor-pointer"
            >
              <span>{isRtl ? "توليد خطتي الشخصية" : "Generate My Personal Plan"}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: Generated Personal Plan View (Section 17 Requirements) */
        generatedPlan && (
          <div className="space-y-8">
            {/* Top Card: Your Personal Plan & Primary Goal */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111318] border border-[#252A33] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#42E8FF] uppercase tracking-wider flex items-center gap-1.5">
                  <BookmarkCheck className="w-4 h-4 text-[#42E8FF]" />
                  <span>{isRtl ? "خطتك الشخصية المعتمدة" : "Your Personal Plan"}</span>
                </span>
                <span className="text-xs text-[#6B7484]">
                  {timeBudget} / day · {budgetLevel}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] font-display">
                  {generatedPlan.summary[locale]}
                </h2>
                <div className="flex items-center gap-2 mt-2 text-xs text-[#A5AEBC]">
                  <span className="font-semibold text-[#F4F7FA]">
                    {isRtl ? "الهدف الأساسي:" : "Primary Goal:"}
                  </span>
                  <span>{primaryGoal.toUpperCase()}</span>
                  <span aria-hidden="true">·</span>
                  <span>{isRtl ? "محرك القواعد الحتمية" : "Deterministic Engine"}</span>
                </div>
              </div>

              {/* Priority Objectives (This Week) */}
              <div className="p-4 rounded-2xl bg-[#171A21] border border-[#252A33] space-y-2 mt-4">
                <div className="text-xs font-bold text-[#F4F7FA] flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#42E8FF]" />
                  <span>{isRtl ? "أولويات هذا الأسبوع (1-3 أهداف):" : "This Week's Priority Objectives:"}</span>
                </div>
                <p className="text-xs text-[#A5AEBC] leading-relaxed">
                  {generatedPlan.weeklyObjective[locale]}
                </p>
              </div>
            </div>

            {/* Daily Protocol: Morning / Evening */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#F4F7FA] font-display">
                {isRtl ? "البروتوكول اليومي الموصى به" : "Daily Protocol"}
              </h3>

              {/* Morning Protocol */}
              <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F4F7FA]">
                  <Sun className="w-4 h-4 text-[#F59E0B]" />
                  <span>{isRtl ? "الروتين الصباحي (Morning Protocol)" : "Morning Protocol"}</span>
                </div>

                <div className="space-y-2.5">
                  {generatedPlan.dailyMorningQuests.map((q) => (
                    <div key={q.id} className="p-3.5 rounded-xl bg-[#171A21] border border-[#252A33] flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-[#F4F7FA]">{q.title[locale]}</div>
                        <div className="text-[11px] text-[#A5AEBC] mt-0.5">{q.description[locale]}</div>
                      </div>
                      <div className="text-end shrink-0">
                        <div className="text-xs font-bold text-[#42E8FF]">+{q.xp} XP</div>
                        <div className="text-[10px] text-[#6B7484]">{q.durationMinutes || 4} min</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evening Protocol */}
              <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F4F7FA]">
                  <Moon className="w-4 h-4 text-[#8B5CF6]" />
                  <span>{isRtl ? "الروتين المسائي (Evening Protocol)" : "Evening Protocol"}</span>
                </div>

                <div className="space-y-2.5">
                  {generatedPlan.dailyEveningQuests.map((q) => (
                    <div key={q.id} className="p-3.5 rounded-xl bg-[#171A21] border border-[#252A33] flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-[#F4F7FA]">{q.title[locale]}</div>
                        <div className="text-[11px] text-[#A5AEBC] mt-0.5">{q.description[locale]}</div>
                      </div>
                      <div className="text-end shrink-0">
                        <div className="text-xs font-bold text-[#8B5CF6]">+{q.xp} XP</div>
                        <div className="text-[10px] text-[#6B7484]">{q.durationMinutes || 5} min</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Action CTA: START DAY 1 */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button
                onClick={handleStartDayOne}
                className="w-full sm:flex-1 py-4 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(66,232,255,0.25)] active:scale-98 transition-all cursor-pointer"
              >
                <span>{isRtl ? "اعتماد الخطة والبدء باليوم الأول" : "Start Day 1"}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#111318] hover:bg-[#171A21] border border-[#252A33] text-xs font-semibold text-[#A5AEBC] hover:text-[#F4F7FA] cursor-pointer"
              >
                {isRtl ? "تعديل الإعدادات" : "Adjust Inputs"}
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};
