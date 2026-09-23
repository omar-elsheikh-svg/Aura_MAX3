import React, { useState } from "react";
import { Locale, GenderTrack } from "../types";
import { AuraMaxEmblem, AuraMaxWordmark } from "./AuraMaxLogo";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  Sliders, 
  Activity, 
  Calendar, 
  Zap, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Lock,
  Layers,
  Award,
  Crown,
  Flame,
  Check,
  Clock,
  Target
} from "lucide-react";

interface LandingPageProps {
  locale: Locale;
  onSetLocale: (locale: Locale) => void;
  onStartFree: () => void;
  onSelectPathDirectly?: (track: GenderTrack) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  locale,
  onSetLocale,
  onStartFree,
  onSelectPathDirectly,
}) => {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqItems = [
    {
      q: isRtl ? "ما الذي يحلله فحص أورا ماكس؟" : "What does Aura Max analyze?",
      a: isRtl 
        ? "يحلل الفحص التناسق الهندسي للوجه (شكل الوجه، استقامة الفك، تماثل الملامح)، صحة وحاجز البشرة، وتناسب قصة الشعر وتصفيفه مع بنية الوجه العامة."
        : "Aura Max evaluates facial architecture (face shape, jawline symmetry, proportions), skin barrier health, and hair/grooming framing suited to your bone structure."
    },
    {
      q: isRtl ? "هل الفحص يحترم الخصوصية؟" : "Is the scan private?",
      a: isRtl
        ? "نعم، الفحص يبدأ على جهازك مباشرة. تُحسب النقاط البيومترية محلياً في متصفحك. لا يتم بيع بياناتك أو مشاركتها مع أطراف خارجية."
        : "Yes. Your scan starts on your device. Geometric analysis happens client-side in your browser. Your images and biometric data are never sold or shared."
    },
    {
      q: isRtl ? "هل الذكاء الاصطناعي مطلوب لاستخدام المنصة؟" : "Is AI required to use Aura Max?",
      a: isRtl
        ? "كلا. محرك التوصيات الأساسي وخطط التحول مبنية على خوارزميات حتمية (Deterministic Rules) مثبتة جمالياً وتعمل حتى في حال انقطاع الاتصال."
        : "No. The core transformation engine and daily routines rely on deterministic, science-backed protocols that work reliably even offline."
    },
    {
      q: isRtl ? "هل نتيجة أورا (Aura Score) مقياس علمي؟" : "Is Aura Score scientific?",
      a: isRtl
        ? "نتيجة أورا هي مؤشر تناسق هندسي وعناية شخصية يجمع بين استقامة الملامح، نضارة البشرة، والالتزام بالعادات. الهدف منها تتبع تحولك الشخصي وليس مقارنتك بالآخرين."
        : "The Aura Score is an objective index tracking facial symmetry, skin clarity, and habit adherence over time. It is designed to measure your personal growth, not public competition."
    },
    {
      q: isRtl ? "هل يمكنني استخدام المنصة مجاناً؟" : "Can I use Aura Max for free?",
      a: isRtl
        ? "نعم بالكامل. يمكنك إجراء الفحص، وتحديد أهدافك، والحصول على خطة يومية للمهام الصباحية والمسائية مجاناً وبلا رسوم خفية."
        : "Yes, completely. You can take biometric scans, configure personalized daily protocols, and track streaks and XP with zero cost."
    },
    {
      q: isRtl ? "ما الذي تقدمه ترقية Premium؟" : "What does Premium include?",
      a: isRtl
        ? "تقدم النسخة المتقدمة إمكانية تتبع أهداف متعددة بالتوازي، وتكيّفاً ذكياً مستمراً للخطط، وتحليلات معمقة، وتوصيات متقدمة من المدرب الذكي."
        : "Premium unlocks multi-goal concurrent protocols, automatic plan adaptations based on missed routines, deep biometrics reports, and unlimited AI Coach insights."
    }
  ];

  return (
    <div 
      className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col relative selection:bg-[#22d3ee]/20 selection:text-[#22d3ee]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Ambient Lighting (Obsidian Wellness) */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] max-w-[100vw] h-[450px] bg-gradient-to-b from-[#22d3ee]/6 via-[#6366f1]/4 to-transparent blur-[160px] pointer-events-none -z-10" 
      />

      {/* Top Bar Contract: 3 zones */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-[#27272a] px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2.5 select-none">
            <AuraMaxEmblem width={32} height={32} concept="concept-a" glow={true} />
            <AuraMaxWordmark size="sm" />
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#a1a1aa]">
            <button 
              onClick={() => scrollToSection("how-it-works")}
              className="hover:text-[#f4f4f5] transition-colors cursor-pointer"
            >
              {isRtl ? "كيف يعمل؟" : "How It Works"}
            </button>
            <button 
              onClick={() => scrollToSection("personalization")}
              className="hover:text-[#f4f4f5] transition-colors cursor-pointer"
            >
              {isRtl ? "التخصيص" : "Personalization"}
            </button>
            <button 
              onClick={() => scrollToSection("today-preview")}
              className="hover:text-[#f4f4f5] transition-colors cursor-pointer"
            >
              {isRtl ? "روتين اليوم" : "Daily Protocol"}
            </button>
            <button 
              onClick={() => scrollToSection("privacy")}
              className="hover:text-[#f4f4f5] transition-colors cursor-pointer"
            >
              {isRtl ? "الخصوصية" : "Privacy"}
            </button>
            <button 
              onClick={() => scrollToSection("faq")}
              className="hover:text-[#f4f4f5] transition-colors cursor-pointer"
            >
              {isRtl ? "الأسئلة الشائعة" : "FAQ"}
            </button>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSetLocale(locale === "en" ? "ar" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181b] border border-[#27272a] hover:border-[#22d3ee]/40 text-xs font-semibold text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span>{locale === "en" ? "العربية" : "EN"}</span>
            </button>

            <button
              onClick={onStartFree}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#22d3ee] text-[#09090b] text-xs font-bold transition-all shadow-[0_0_20px_rgba(34,211,238,0.25)] active:scale-95 cursor-pointer whitespace-nowrap"
            >
              {isRtl ? "ابدأ مجاناً" : "Start Free"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Section 1: Hero */}
        <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181b] border border-[#27272a] text-xs font-medium text-[#a1a1aa] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22d3ee]" />
            <span>
              {isRtl 
                ? "منظومة التحول الشخصي المعتمدة" 
                : "Personal Transformation Platform"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#f4f4f5] font-display leading-[1.12] mb-6 max-w-4xl text-balance">
            {isRtl ? "اصنع نسختك الأفضل." : "Build your best version."}
          </h1>

          <p className="text-base sm:text-xl text-[#a1a1aa] leading-relaxed max-w-3xl mb-9">
            {isRtl
              ? "قيّم ملامحك، احصل على خطة تحول مخصصة لوقتك وميزانيتك، اتخذ خطوات يومية، وتابع تحولك الحقيقي خطوة بخطوة."
              : "Assess where you are, get a plan built around you, take action, and track your transformation."}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={onStartFree}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#22d3ee] text-[#09090b] text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.25)] active:scale-98 transition-all cursor-pointer"
            >
              <span>{isRtl ? "ابدأ مجاناً" : "Start Free"}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-sm font-semibold text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer"
            >
              {isRtl ? "شاهد كيف يعمل" : "See How It Works"}
            </button>
          </div>

          {/* Clean Unboxed Trust Marker */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 text-xs text-[#71717a]">
            <span>{isRtl ? "فحص فوري على الجهاز" : "On-device private scan"}</span>
            <span aria-hidden="true">·</span>
            <span>{isRtl ? "خطط حتمية قابلة للتنفيذ" : "Deterministic actionable plans"}</span>
            <span aria-hidden="true">·</span>
            <span>{isRtl ? "مسار مخصص للرجال والنساء" : "Men & Women Tracks"}</span>
          </div>
        </section>

        {/* Section 2: Authentic Product Dashboard Preview */}
        <section className="px-4 sm:px-6 max-w-6xl mx-auto w-full pb-20">
          <div className="rounded-3xl bg-[#18181b] border border-[#27272a] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#27272a] mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a1a1aa]">
                  {isRtl ? "معاينة لوحة التحول" : "Transformation Dashboard Preview"}
                </span>
              </div>
              <span className="text-xs text-[#71717a]">
                {isRtl ? "الأسبوع 3 · نسبة التزام 78%" : "Week 3 · 78% Consistency"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1: Aura Overview */}
              <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272a] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#a1a1aa] mb-1">
                    {isRtl ? "نتيجة أورا الحالية" : "Aura Score"}
                  </div>
                  <div className="flex items-baseline gap-3 my-2">
                    <span className="text-5xl font-black text-[#22d3ee] font-display">82</span>
                    <span className="text-xs text-emerald-400 font-semibold">+4.5 {isRtl ? "هذا الشهر" : "this month"}</span>
                  </div>
                  
                  <div className="space-y-3 mt-4 pt-4 border-t border-[#27272a]">
                    <div>
                      <div className="text-[11px] font-bold text-[#a1a1aa] uppercase tracking-wider mb-1">
                        {isRtl ? "نقاط القوة" : "Strong Areas"}
                      </div>
                      <div className="text-xs text-[#f4f4f5]">
                        {isRtl ? "كثافة الشعر · استقامة القامة" : "Hair Framing · Postural Alignment"}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-[#a1a1aa] uppercase tracking-wider mb-1">
                        {isRtl ? "مجالات التركيز" : "Focus Areas"}
                      </div>
                      <div className="text-xs text-[#22d3ee]">
                        {isRtl ? "حاجز البشرة · طرد السوائل الصباحي" : "Skin Consistency · Morning Debloat"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#27272a]">
                  <div className="text-xs text-[#a1a1aa]">
                    {isRtl ? "الهدف الرئيسي: نحت الفك ونقاء البشرة" : "Primary Goal: Facial Structure & Glass Skin"}
                  </div>
                </div>
              </div>

              {/* Column 2: Today's Action */}
              <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272a] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">
                      {isRtl ? "مهام اليوم" : "Today's Protocol"}
                    </span>
                    <span className="text-xs font-bold text-[#22d3ee]">2/3 Done</span>
                  </div>

                  <div className="space-y-2.5 mt-3">
                    <div className="p-3 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <div>
                          <div className="text-xs font-bold text-[#f4f4f5] line-through text-[#71717a]">
                            {isRtl ? "غسول لطيف وترطيب فوري" : "Gentle Cleanser & Barrier Hydration"}
                          </div>
                          <div className="text-[10px] text-[#71717a]">5 min · +20 XP</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <div>
                          <div className="text-xs font-bold text-[#f4f4f5] line-through text-[#71717a]">
                            {isRtl ? "واقي شمس SPF 50+" : "Mineral SPF 50+ Application"}
                          </div>
                          <div className="text-[10px] text-[#71717a]">2 min · +15 XP</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#18181b] border border-[#22d3ee]/40 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full border border-[#22d3ee]" />
                        <div>
                          <div className="text-xs font-bold text-[#22d3ee]">
                            {isRtl ? "تدليك التصريف اللمفاوي المسائي" : "Evening Lymphatic Drainage"}
                          </div>
                          <div className="text-[10px] text-[#a1a1aa]">4 min · +30 XP</div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#22d3ee]/10 text-[#22d3ee] font-bold">
                        {isRtl ? "التالي" : "Next"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-xs text-[#a1a1aa]">
                  <span>{isRtl ? "الوقت المتبقي: 4 دقائق" : "Est. remaining: 4 min"}</span>
                  <span className="font-semibold text-[#f4f4f5]">85 XP Earned</span>
                </div>
              </div>

              {/* Column 3: Transformation Progress */}
              <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272a] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider mb-3">
                    {isRtl ? "مؤشرات التحول" : "Consistency & Evolution"}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#18181b] border border-[#27272a]">
                      <div className="text-[10px] text-[#71717a] font-semibold">{isRtl ? "سلسلة الالتزام" : "Streak"}</div>
                      <div className="text-xl font-bold text-[#f4f4f5] font-display mt-0.5">14 Days</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#18181b] border border-[#27272a]">
                      <div className="text-[10px] text-[#71717a] font-semibold">{isRtl ? "المستوى" : "Level"}</div>
                      <div className="text-xl font-bold text-[#818cf8] font-display mt-0.5">Level 4</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#18181b] border border-[#27272a] space-y-1.5">
                    <div className="text-[11px] font-bold text-[#f4f4f5]">
                      {isRtl ? "ملاحظة التكيف الأسبوعي" : "Weekly Plan Adaptation"}
                    </div>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed">
                      {isRtl 
                        ? "لاحظنا التزامك الصباحي الكامل، لذا دمجنا بروتوكول الرقبة الملكية دون زيادة الوقت الكلي." 
                        : "Morning consistency reached 100%. Protocol adapted to add posture drills without extra time."}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={onStartFree}
                  className="mt-4 w-full py-2.5 rounded-xl bg-[#22d3ee] hover:bg-[#38bdf8] text-[#09090b] text-xs font-bold transition-all text-center cursor-pointer shadow-md shadow-[#22d3ee]/20"
                >
                  {isRtl ? "ابدأ خطتك المشابهة" : "Build Your Plan"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How It Works */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full border-t border-[#27272a]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-wider mb-2">
              {isRtl ? "خطوات التحول" : "The Transformation Loop"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f4f4f5] font-display">
              {isRtl ? "كيف يعمل أورا ماكس؟" : "How Aura Max Works"}
            </h2>
            <p className="text-sm text-[#a1a1aa] mt-2">
              {isRtl 
                ? "منهجية واضحة ومباشرة تجيب دائماً عن سؤالك: ماذا علي أن أفعل الآن؟" 
                : "A disciplined five-step loop engineered so you always know what to do next."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: "01",
                title: isRtl ? "التقييم" : "Assess",
                desc: isRtl 
                  ? "فحص محلي سريع يحدد شكل الوجه، زاوية الفك، وتناسق الملامح." 
                  : "Private on-device scan detecting face shape, jawline, and symmetry."
              },
              {
                step: "02",
                title: isRtl ? "التخصيص" : "Personalize",
                desc: isRtl 
                  ? "تحديد أولوياتك بحسب وقتك المتاح (5 إلى 30 دقيقة) وميزانيتك." 
                  : "Tailor your routine to your exact time budget and preferred investment."
              },
              {
                step: "03",
                title: isRtl ? "التنفيذ اليومي" : "Take Action",
                desc: isRtl 
                  ? "بروتوكولات يومية واضحة للصباح والمساء مع شروحات علمية موجزة." 
                  : "Crystal-clear morning and evening quests with actionable rationale."
              },
              {
                step: "04",
                title: isRtl ? "المتابعة" : "Track",
                desc: isRtl 
                  ? "متابعة الاستمرارية، اكتساب نقاط XP، وتوثيق الفحوصات الدورية." 
                  : "Monitor authentic streaks, XP progression, and genuine milestone scans."
              },
              {
                step: "05",
                title: isRtl ? "التكيف" : "Adapt",
                desc: isRtl 
                  ? "مراجعة أسبوعية تعدل الخطة بحسب سلوكك الحقيقي دون تعقيد." 
                  : "Weekly reviews automatically adjust routine steps based on your adherence."
              },
            ].map((item) => (
              <div 
                key={item.step}
                className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#22d3ee]/30 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#22d3ee] mb-3 block">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold text-[#f4f4f5] font-display mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Personalization Dimensions */}
        <section id="personalization" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full border-t border-[#27272a]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-wider mb-2">
                {isRtl ? "خطة مبنية حولك أنت" : "Precision Personalization"}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f4f4f5] font-display leading-tight mb-4">
                {isRtl ? "الخطة تتكيف مع حياتك، وليس العكس." : "Your plan adapts to your life, not the other way around."}
              </h2>
              <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6">
                {isRtl
                  ? "لا نلزمك بروتين مستحيل من 15 خطوة. محرك القواعد في أورا ماكس يضبط الخطوات بناءً على 5 عوامل رئيسية حتى تضمن الاستمرارية الفعلية."
                  : "We reject unrealistic 15-step routines. The Aura Max Rules Engine configures protocols based on five realistic dimensions to build lasting transformation habits."}
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: isRtl ? "الأهداف (Goals)" : "Target Goals",
                    desc: isRtl ? "الفك، البشرة، الشعر، الحواجب، أو استقامة القامة." : "Jawline definition, skin barrier, hair framing, or posture."
                  },
                  {
                    title: isRtl ? "الوقت (Time Budget)" : "Time Budget",
                    desc: isRtl ? "من 5 دقائق فقط وحتى 30 دقيقة يومياً." : "From 5-minute quick stacks to 30-minute deep rituals."
                  },
                  {
                    title: isRtl ? "الميزانية (Budget Level)" : "Budget Level",
                    desc: isRtl ? "حلول طبيعية مجانية 100%، أساسية، أو متقدمة." : "100% free natural techniques, minimal stacks, or premium."
                  },
                  {
                    title: isRtl ? "التفضيلات (Preferences)" : "Preferences",
                    desc: isRtl ? "مسار الرجال (Aura Max) أو مسار النساء (Aura Fem)." : "Dedicated Men's (Max) and Women's (Fem) tracks."
                  },
                  {
                    title: isRtl ? "معدل التقدم (Progress Adherence)" : "Adherence Progress",
                    desc: isRtl ? "تقليص الخطوات تلقائياً عند ضيق الوقت لتفادي الانقطاع." : "Automatic protocol reduction when life gets busy to protect your streak."
                  },
                ].map((dim, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#18181b] border border-[#27272a] flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#22d3ee] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#f4f4f5]">{dim.title}</div>
                      <div className="text-xs text-[#a1a1aa] mt-0.5">{dim.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual preview card */}
            <div className="p-6 rounded-3xl bg-[#18181b] border border-[#27272a] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
                <span className="text-xs font-bold text-[#f4f4f5]">
                  {isRtl ? "محاكاة التخصيص الفوري" : "Live Adaptation Simulation"}
                </span>
                <span className="text-xs text-[#22d3ee] font-mono font-bold">Rules Engine v2</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#111113] border border-[#27272a] flex justify-between items-center">
                  <span className="text-[#a1a1aa]">{isRtl ? "الوقت المتاح:" : "Time Budget:"}</span>
                  <span className="font-semibold text-[#f4f4f5]">{isRtl ? "15 دقيقة / يوم" : "15 min / day"}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#111113] border border-[#27272a] flex justify-between items-center">
                  <span className="text-[#a1a1aa]">{isRtl ? "الميزانية المحددة:" : "Budget Choice:"}</span>
                  <span className="font-semibold text-emerald-400">{isRtl ? "مجاني 100% (طبيعي)" : "100% Free (Natural)"}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#111113] border border-[#27272a] flex justify-between items-center">
                  <span className="text-[#a1a1aa]">{isRtl ? "التركيز الرئيسي:" : "Primary Focus:"}</span>
                  <span className="font-semibold text-[#22d3ee]">{isRtl ? "طرد السوائل واستقامة الرقبة" : "Debloating & Posture"}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#111113] border border-[#22d3ee]/20 space-y-2">
                <div className="text-xs font-bold text-[#22d3ee]">
                  {isRtl ? "الخطة الناتجة:" : "Generated Protocol Output:"}
                </div>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  {isRtl
                    ? "3 مهام يومية سريعة: تصريف لمفاوي صباحي (3 دقائق)، شرب 500 مل ماء ليمون (دقيقة واحدة)، وتصحيح انحناء الرقبة (5 دقائق)."
                    : "3 high-leverage daily quests: Morning lymphatic flush (3m), hydration priming (1m), and thoracic decompression (5m)."}
                </p>
              </div>

              <button
                onClick={onStartFree}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#22d3ee] text-[#09090b] text-xs font-bold transition-all text-center cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              >
                {isRtl ? "خصص خطتك الآن" : "Customize Your Plan"}
              </button>
            </div>
          </div>
        </section>

        {/* Section 5: Today Protocol Deep Dive */}
        <section id="today-preview" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full border-t border-[#27272a]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-wider mb-2">
              {isRtl ? "روتين التحول اليومي" : "Daily Transformation Loop"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f4f4f5] font-display">
              {isRtl ? "ماذا عليّ أن أفعل اليوم؟" : "Here is what I should do today."}
            </h2>
            <p className="text-sm text-[#a1a1aa] mt-2">
              {isRtl 
                ? "كل مهمة تجيب بوضوح عن: ماذا تفعل، ولماذا، وكم تستغرق، وما المكافأة." 
                : "Every quest clearly communicates: what to do, why it matters, how long it takes, and the reward."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                time: "Morning · 5 min",
                title: isRtl ? "غسول خفيف وتدليك الفك" : "Cold Water Splash & Jaw Debloat",
                why: isRtl ? "تنشيط الأوعية الدموية وتصريف احتباس السوائل بعد النوم." : "Stimulates lymphatic drainage to reveal mandibular definition upon waking.",
                xp: "+20 XP",
              },
              {
                time: "Afternoon · 2 min",
                title: isRtl ? "ترطيب وحماية الحاجز SPF 50+" : "SPF 50+ Sun Protection Reapplication",
                why: isRtl ? "حماية ألياف الكولاجين من التكسر والحفاظ على مرونة الجلد." : "Shields skin elastin and collagen fibers against photoaging.",
                xp: "+15 XP",
              },
              {
                time: "Evening · 4 min",
                title: isRtl ? "استطالة الرقبة والعمود الفقري" : "Cervical & Thoracic Posture Reset",
                why: isRtl ? "تصحيح انحناء الرأس للأمام الناتج عن استخدام الشاشات." : "Counteracts forward head posture to elevate jaw angle and presence.",
                xp: "+25 XP",
              },
            ].map((q, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a] flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#a1a1aa] mb-2 font-mono">
                    <span>{q.time}</span>
                    <span className="text-[#22d3ee] font-bold">{q.xp}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#f4f4f5] mb-2">{q.title}</h3>
                  <div className="text-xs text-[#71717a] mb-1 font-semibold uppercase tracking-wider">
                    {isRtl ? "لماذا هذه الخطوة مهمة:" : "Why this matters:"}
                  </div>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">{q.why}</p>
                </div>

                <div className="pt-3 border-t border-[#27272a] flex items-center justify-between">
                  <span className="text-[11px] text-[#71717a]">{isRtl ? "بروتوكول علمي مبسط" : "Verified Protocol"}</span>
                  <span className="text-xs font-bold text-[#22d3ee]">{isRtl ? "جاهز للتنفيذ" : "Ready"}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Privacy First */}
        <section id="privacy" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto w-full border-t border-[#27272a] text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#18181b] border border-[#27272a] text-[#22d3ee] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-wider mb-2">
            {isRtl ? "خصوصية بدون تنازل" : "Privacy by Design"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f4f4f5] font-display mb-4">
            {isRtl ? "فحصك يبدأ على جهازك مباشرة." : "Your scan starts on your device."}
          </h2>
          <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed max-w-2xl mx-auto mb-8">
            {isRtl
              ? "نحن نؤمن بأن تقييم الملامح الشخصية مسألة خاصة جداً. تُحلل أبعاد وجهك محلياً في متصفحك دون إرسال صورك إلى خوادم خارجية للمتاجرة بها."
              : "We believe biometric transformation is deeply personal. Your facial geometric measurements are computed locally on your device without storing or selling your photos."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-start">
            <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a]">
              <div className="text-xs font-bold text-[#f4f4f5] mb-1">
                {isRtl ? "معالجة محلية" : "Local Browser Processing"}
              </div>
              <p className="text-xs text-[#a1a1aa]">
                {isRtl ? "حساب الزوايا والنسب يتم في بيئة المتصفح الآمنة." : "Face geometry is calculated on-device without cloud upload."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a]">
              <div className="text-xs font-bold text-[#f4f4f5] mb-1">
                {isRtl ? "تخزين محلي مشفر" : "Zero Data Resale"}
              </div>
              <p className="text-xs text-[#a1a1aa]">
                {isRtl ? "سجل عاداتك وفحوصاتك محفوظ في ذاكرة جهازك." : "We never sell biometric profiles or share data with brokers."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a]">
              <div className="text-xs font-bold text-[#f4f4f5] mb-1">
                {isRtl ? "تحكم كامل" : "Full Export & Deletion"}
              </div>
              <p className="text-xs text-[#a1a1aa]">
                {isRtl ? "يمكنك تصدير بياناتك أو مسحها بالكامل بنقرة واحدة." : "Export or wipe all local data anytime directly from settings."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Premium Value */}
        <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto w-full border-t border-[#27272a]">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#18181b] border border-[#6366f1]/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/30 text-[#818cf8] text-xs font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5" />
                <span>{isRtl ? "ترقية أورا بريميوم" : "Aura Max Premium"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f4f4f5] font-display">
                {isRtl ? "لأولئك الذين يريدون تعميق التحول." : "For those committed to deeper transformation."}
              </h2>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">
                {isRtl 
                  ? "النسخة الأساسية مجانية بالكامل. تفتح ترقية Premium تكيّفاً ذكياً مستمراً للخطط، ومتابعة أهداف متعددة، وتقارير تفصيلية مع مدرب الذكاء الاصطناعي."
                  : "The core platform is completely free. Premium unlocks dynamic weekly plan adaptation, multi-goal tracking, deep biometrics reports, and the AI Coach."}
              </p>

              <div className="grid grid-cols-2 gap-2.5 text-xs text-[#f4f4f5] pt-2">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#818cf8]" />
                  <span>{isRtl ? "تكيّف أسبوعي تلقائي" : "Adaptive weekly plans"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#818cf8]" />
                  <span>{isRtl ? "مدرب ذكي متصل بخطتك" : "Contextual AI Coach"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#818cf8]" />
                  <span>{isRtl ? "أهداف متعددة بالتوازي" : "Multi-goal protocols"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#818cf8]" />
                  <span>{isRtl ? "سبرنتات عادات متقدمة" : "Advanced sprint rewards"}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto text-center md:text-end">
              <button
                onClick={onStartFree}
                className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#818cf8] hover:opacity-95 text-white text-xs font-bold transition-all shadow-[0_0_25px_rgba(99,102,241,0.3)] active:scale-95 cursor-pointer"
              >
                {isRtl ? "استكشف الخطة المجانية أولاً" : "Start Free First"}
              </button>
              <div className="text-[11px] text-[#71717a] mt-2">
                {isRtl ? "لا يتطلب بطاقة ائتمان للبدء" : "No credit card required"}
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: FAQ Accordion */}
        <section id="faq" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto w-full border-t border-[#27272a]">
          <div className="text-center mb-12">
            <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-wider mb-2">
              {isRtl ? "إجابات واضحة" : "Transparent Answers"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f4f4f5] font-display">
              {isRtl ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-[#18181b] border border-[#27272a] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-start flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#f4f4f5]">
                      {item.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#22d3ee] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#a1a1aa] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed border-t border-[#27272a]/50">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#27272a] py-10 px-4 sm:px-8 bg-[#09090b] text-xs text-[#71717a]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AuraMaxEmblem width={22} height={22} glow={false} />
            <span className="font-bold text-[#a1a1aa]">AURA MAX</span>
            <span>·</span>
            <span>{isRtl ? "منظومة التحول الشخصي" : "Personal Transformation Platform"}</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onStartFree} className="hover:text-[#f4f4f5] transition-colors cursor-pointer">
              {isRtl ? "ابدأ الآن" : "Start Free"}
            </button>
            <span>·</span>
            <button onClick={() => scrollToSection("privacy")} className="hover:text-[#f4f4f5] transition-colors cursor-pointer">
              {isRtl ? "سياسة الخصوصية" : "Privacy"}
            </button>
            <span>·</span>
            <button onClick={() => scrollToSection("faq")} className="hover:text-[#f4f4f5] transition-colors cursor-pointer">
              {isRtl ? "الأسئلة" : "FAQ"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
