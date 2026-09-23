import React, { useState, useEffect, useRef, useCallback } from "react";
import { Locale, GenderTrack } from "../types";
import { AuraMaxEmblem, AuraMaxWordmark } from "./AuraMaxLogo";
import {
  ArrowRight,
  ArrowLeft,
  Globe,
  Lock,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Scan,
  Brain,
  CalendarDays,
  Activity,
  TrendingUp,
  RefreshCw,
  Sun,
  Moon,
  Target,
  Clock,
  Wallet,
  Sliders,
  Eye,
  Zap,
  ShieldCheck,
  Crown,
  HelpCircle,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

interface LandingPageProps {
  locale: Locale;
  onSetLocale: (locale: Locale) => void;
  onStartFree: () => void;
  onSelectPathDirectly?: (track: GenderTrack) => void;
}

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook                                                */
/* ------------------------------------------------------------------ */
function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Hero product visualization                                         */
/* ------------------------------------------------------------------ */
const HeroVisual: React.FC<{ isRtl: boolean }> = ({ isRtl }) => {
  return (
    <div className="relative w-full max-w-md mx-auto" data-reveal>
      {/* Outer frame */}
      <div className="relative rounded-[2rem] bg-gradient-to-b from-[#18181b] to-[#0f0f11] border border-[#27272a] p-5 shadow-2xl overflow-hidden">
        {/* Subtle top sheen */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/40 to-transparent" />

        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <AuraMaxEmblem width={20} height={20} glow={true} />
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#a1a1aa]">AURA MAX</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#71717a] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isRtl ? "اليوم" : "Today"}</span>
          </div>
        </div>

        {/* Plan title */}
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#22d3ee] mb-1">
            {isRtl ? "خطة التحول" : "Your transformation plan"}
          </div>
          <div className="text-lg font-bold text-[#f4f4f5] font-display leading-tight">
            {isRtl ? "نحت الفك ونقاء البشرة" : "Facial structure & skin clarity"}
          </div>
        </div>

        {/* Progress ring */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-16 h-16 shrink-0">
            <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="#27272a" strokeWidth="4" fill="none" />
              <circle
                cx="32" cy="32" r="28"
                stroke="#22d3ee"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="176"
                strokeDashoffset="38"
                className="hero-ring-fill"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-black text-[#f4f4f5] font-display">78%</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[10px] text-[#71717a] font-semibold uppercase tracking-wider">
              {isRtl ? "نسبة الالتزام الأسبوعي" : "Weekly consistency"}
            </div>
            <div className="text-xs text-[#a1a1aa] mt-0.5">
              {isRtl ? "5 من 7 أيام مكتملة" : "5 of 7 days completed"}
            </div>
          </div>
        </div>

        {/* Today's actions */}
        <div className="space-y-2.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#71717a] mb-1">
            {isRtl ? "3 مهام لهدفك" : "3 actions for your goal"}
          </div>
          {[
            { icon: Sun, label: isRtl ? "روتين العناية الصباحي" : "Morning skincare", time: "5m", done: true },
            { icon: Sliders, label: isRtl ? "روتين التهذيب" : "Grooming routine", time: "3m", done: true },
            { icon: Activity, label: isRtl ? "تمرين الثقة 10 دقائق" : "10-minute confidence practice", time: "10m", done: false },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                item.done
                  ? "bg-[#111113] border-[#27272a]"
                  : "bg-[#111113] border-[#22d3ee]/30"
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                item.done ? "bg-emerald-500/10" : "bg-[#22d3ee]/10"
              }`}>
                {item.done ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <item.icon className="w-3.5 h-3.5 text-[#22d3ee]" />
                )}
              </div>
              <span className={`flex-1 text-xs font-semibold ${
                item.done ? "text-[#71717a] line-through" : "text-[#f4f4f5]"
              }`}>
                {item.label}
              </span>
              <span className="text-[10px] text-[#71717a] font-mono">{item.time}</span>
            </div>
          ))}
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#27272a]">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#22d3ee]" />
            <span className="text-xs font-bold text-[#f4f4f5]">+30 XP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#71717a] font-semibold uppercase tracking-wider">
              {isRtl ? "السلسلة" : "Streak"}
            </span>
            <span className="text-xs font-bold text-[#f4f4f5]">{isRtl ? "يوم ٧" : "Day 7"}</span>
          </div>
        </div>
      </div>

      {/* Floating accent badge */}
      <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-[#22d3ee] text-[#09090b] text-[10px] font-black uppercase tracking-wider shadow-lg shadow-[#22d3ee]/20 hero-badge-float">
        {isRtl ? "مباشر" : "Live preview"}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */
const Section: React.FC<{
  id?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, children, className = "" }) => (
  <section
    id={id}
    className={`px-5 sm:px-8 max-w-6xl mx-auto w-full border-t border-[#27272a]/60 py-20 sm:py-28 ${className}`}
  >
    {children}
  </section>
);

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-[11px] font-bold text-[#22d3ee] uppercase tracking-[0.18em] mb-3" data-reveal>
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export const LandingPage: React.FC<LandingPageProps> = ({
  locale,
  onSetLocale,
  onStartFree,
  onSelectPathDirectly,
}) => {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleFaq = (idx: number) => setOpenFaqIndex(openFaqIndex === idx ? null : idx);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* ---------------- FAQ data ---------------- */
  const faqItems = [
    {
      q: isRtl ? "ما هو أورا ماكس؟" : "What is Aura Max?",
      a: isRtl
        ? "أورا ماكس منظومة تحول شخصي تبدأ بالمظهر (الوجه، البشرة، الشعر، التهذيب، الأسلوب) وتتوسع مستقبلاً نحو الأداء، الحضور، والمسار المهني. تقيّم وضعك الحالي، تبني خطة مخصصة، وتتابع تحولك يوماً بيوم."
        : "Aura Max is a personal transformation platform that starts with appearance — face, skin, hair, grooming, style — and expands toward performance, presence, and career. It assesses where you are, builds a plan around you, and tracks your daily progress.",
    },
    {
      q: isRtl ? "هل أورا ماكس مخصص للمظهر فقط؟" : "Is Aura Max only for appearance?",
      a: isRtl
        ? "المظهر هو نقطة البداية الحالية. الأداء والحضور والمسار المهني هي الاتجاه المستقبلي للمنصة، وليست متاحة بالكامل اليوم."
        : "Appearance is the current starting point. Performance, presence, and career are the future direction of the platform — not fully available today.",
    },
    {
      q: isRtl ? "هل يستخدم الفحص الذكاء الاصطناعي؟" : "Does the scan use AI?",
      a: isRtl
        ? "يستخدم الفحص تحليلاً قائماً على معالم الوجه وميزات مستخرجة من الصورة مع توصيات مخصصة ونتائج مراعية لمستوى الثقة. الذكاء الاصطناعي اختياري حيثما أمكن."
        : "The scan uses landmark-based analysis and image-derived features with personalized recommendations and confidence-aware results. AI is optional where possible.",
    },
    {
      q: isRtl ? "هل أحتاج إلى حساب؟" : "Do I need an account?",
      a: isRtl
        ? "يمكنك البدء مجاناً دون بطاقة ائتمان. إنشاء حساب يتيح حفظ تقدمك ومزامنة خططك عبر الأجهزة."
        : "You can start free without a credit card. Creating an account lets you save your progress and sync plans across devices.",
    },
    {
      q: isRtl ? "هل الذكاء الاصطناعي مطلوب؟" : "Is AI required?",
      a: isRtl
        ? "لا. محرك التوصيات الأساسي وخطط التحول مبنية على قواعد حتمية تعمل بدون اتصال. الذكاء الاصطناعي ميزة اختيارية لإرشاد أعمق."
        : "No. The core recommendation engine and transformation plans are built on deterministic rules that work offline. AI is an optional layer for deeper guidance.",
    },
    {
      q: isRtl ? "هل تُخزّن صورتي؟" : "Is my image stored?",
      a: isRtl
        ? "يبدأ الفحص على جهازك. نحن نقلل من البيانات الشخصية غير الضرورية ونحافظ على حساسية معلوماتك. يمكنك تصدير بياناتك أو مسحها في أي وقت."
        : "Your scan starts on your device. We minimize unnecessary personal data and keep sensitive information protected. You can export or delete your data anytime.",
    },
    {
      q: isRtl ? "هل توجد خطة مجانية؟" : "Is there a free plan?",
      a: isRtl
        ? "نعم. الخطة المجانية تشمل التقييم الأساسي، الخطة الشخصية، المهام اليومية، وتتبع التقدم. لا نشعر أن الخطة المجانية مقصودة عمداً."
        : "Yes. The free plan includes basic assessment, a personal plan, daily actions, and progress tracking. We don't intentionally cripple the free experience.",
    },
  ];

  /* ---------------- The System loop steps ---------------- */
  const loopSteps = [
    { icon: Scan, title: isRtl ? "قيّم" : "Assess", desc: isRtl ? "ابدأ بفهم أين أنت الآن." : "Start by understanding where you are." },
    { icon: Brain, title: isRtl ? "افهم" : "Understand", desc: isRtl ? "نتائج مراعية للثقة تشرح نقاط القوة ومجالات التركيز." : "Confidence-aware results explain strengths and focus areas." },
    { icon: Target, title: isRtl ? "خطط" : "Plan", desc: isRtl ? "خطة مبنية حول وقتك وميزانيتك وأهدافك." : "A plan built around your time, budget, and goals." },
    { icon: Zap, title: isRtl ? "تصرف" : "Act", desc: isRtl ? "مهام يومية واضحة تعرف ماذا تفعل ولماذا." : "Clear daily actions so you always know what to do and why." },
    { icon: Activity, title: isRtl ? "تابع" : "Track", desc: isRtl ? "تابع سلوكك وتحولك، ليس مجرد رقم." : "Track your behavior and transformation, not just a score." },
    { icon: RefreshCw, title: isRtl ? "كيّف" : "Adapt", desc: isRtl ? "خطتك تتغير عندما تتغير أهدافك وعاداتك وتقدمك." : "Your plan changes when your goals, habits, or progress change." },
  ];

  /* ---------------- Personalization dimensions ---------------- */
  const personalizationDims = [
    { icon: Target, label: isRtl ? "الأهداف" : "Goal", value: isRtl ? "تحسين المظهر" : "Improve appearance" },
    { icon: Clock, label: isRtl ? "الوقت" : "Time", value: isRtl ? "15 دقيقة/يوم" : "15 min/day" },
    { icon: Wallet, label: isRtl ? "الميزانية" : "Budget", value: isRtl ? "منخفضة" : "Low" },
    { icon: Sliders, label: isRtl ? "التفضيلات" : "Preferences", value: isRtl ? "طبيعي، بسيط" : "Natural, minimal" },
    { icon: Activity, label: isRtl ? "الحالة الحالية" : "Current state", value: isRtl ? "بداية الأسبوع 2" : "Starting week 2" },
  ];

  /* ---------------- Appearance categories ---------------- */
  const appearanceCategories = [
    { icon: Scan, title: isRtl ? "الوجه" : "Face", desc: isRtl ? "تحليل قائم على المعالم لفهم بنية وجهك." : "Landmark-based analysis to understand your facial structure." },
    { icon: Sparkles, title: isRtl ? "البشرة" : "Skin", desc: isRtl ? "تقييم ميزات مستخرجة من الصورة لحاجز بشرتك." : "Image-derived features assessing your skin barrier." },
    { icon: Activity, title: isRtl ? "الشعر" : "Hair", desc: isRtl ? "توصيات إطار وتصفيف تناسب بنية وجهك." : "Framing and styling recommendations suited to your structure." },
    { icon: Sliders, title: isRtl ? "التهذيب" : "Grooming", desc: isRtl ? "روتين تهذيب مخصص لملامحك." : "A grooming routine tailored to your features." },
    { icon: Eye, title: isRtl ? "الأسلوب" : "Style", desc: isRtl ? "إرشادات أسلوب تكمّل صورتك العامة." : "Style guidance that complements your overall look." },
  ];

  /* ---------------- Adaptation weeks ---------------- */
  const adaptationWeeks = [
    {
      week: 1,
      title: isRtl ? "الأسبوع ١" : "Week 1",
      actions: isRtl ? ["غسول صباحي", "واقي شمس", "ترطيب مسائي"] : ["Morning cleanser", "Sunscreen", "Evening moisturizer"],
    },
    {
      week: 2,
      title: isRtl ? "الأسبوع ٢" : "Week 2",
      actions: isRtl ? ["+ تدليك لمفاوي", "+ تمرين قامة"] : ["+ Lymphatic massage", "+ Posture drill"],
    },
    {
      week: 3,
      title: isRtl ? "الأسبوع ٣" : "Week 3",
      actions: isRtl ? ["+ سيروم فيتامين C", "− غسول مزدوج"] : ["+ Vitamin C serum", "− Double cleanse"],
    },
    {
      week: 4,
      title: isRtl ? "الأسبوع ٤" : "Week 4",
      actions: isRtl ? ["تكيف تلقائي حسب التزامك", "تركيز على نقاط الضعف"] : ["Auto-adapted to adherence", "Focus on weak areas"],
    },
  ];

  /* ---------------- Vision dimensions ---------------- */
  const visionDimensions = [
    { label: isRtl ? "المظهر" : "Appearance", status: "current", desc: isRtl ? "نقطة البداية الحالية" : "Current starting point" },
    { label: isRtl ? "الأداء" : "Performance", status: "future", desc: isRtl ? "الاتجاه المستقبلي" : "Future direction" },
    { label: isRtl ? "الحضور" : "Presence", status: "future", desc: isRtl ? "الاتجاه المستقبلي" : "Future direction" },
    { label: isRtl ? "المسار المهني" : "Career", status: "future", desc: isRtl ? "الاتجاه المستقبلي" : "Future direction" },
  ];

  return (
    <div
      className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col relative selection:bg-[#22d3ee]/20 selection:text-[#22d3ee] overflow-x-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] max-w-[120vw] h-[500px] bg-gradient-to-b from-[#22d3ee]/5 via-[#6366f1]/3 to-transparent blur-[180px] pointer-events-none -z-10"
      />

      {/* ───────── Header ───────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#09090b]/85 backdrop-blur-xl border-b border-[#27272a]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 sm:px-8 py-3.5">
          <div className="flex items-center gap-2.5 select-none">
            <AuraMaxEmblem width={30} height={30} concept="concept-a" glow={true} />
            <AuraMaxWordmark size="sm" />
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#a1a1aa]">
            <button onClick={() => scrollToSection("system")} className="hover:text-[#f4f4f5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-[#22d3ee]">
              {isRtl ? "كيف يعمل" : "How It Works"}
            </button>
            <button onClick={() => scrollToSection("personalization")} className="hover:text-[#f4f4f5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-[#22d3ee]">
              {isRtl ? "التخصيص" : "Personalization"}
            </button>
            <button onClick={() => scrollToSection("appearance")} className="hover:text-[#f4f4f5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-[#22d3ee]">
              {isRtl ? "المظهر" : "Appearance"}
            </button>
            <button onClick={() => scrollToSection("pricing")} className="hover:text-[#f4f4f5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-[#22d3ee]">
              {isRtl ? "الأسعار" : "Pricing"}
            </button>
            <button onClick={() => scrollToSection("faq")} className="hover:text-[#f4f4f5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-[#22d3ee]">
              {isRtl ? "الأسئلة" : "FAQ"}
            </button>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onSetLocale(locale === "en" ? "ar" : "en")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#18181b] border border-[#27272a] hover:border-[#22d3ee]/40 text-xs font-semibold text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/40"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span>{locale === "en" ? "العربية" : "EN"}</span>
            </button>
            <button
              onClick={onStartFree}
              className="px-4 py-2 rounded-xl bg-[#f4f4f5] text-[#09090b] text-xs font-bold transition-all hover:bg-white active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/50 whitespace-nowrap"
            >
              {isRtl ? "ابدأ مجاناً" : "Start Free"}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* ═══════════════════ SECTION 1 — HERO ═══════════════════ */}
        <section className="relative pt-16 sm:pt-24 pb-20 px-5 sm:px-8 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div className="flex flex-col items-start text-start">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181b] border border-[#27272a] text-[11px] font-medium text-[#a1a1aa] mb-7"
                data-reveal
              >
                <span className="w-2 h-2 rounded-full bg-[#22d3ee]" />
                <span>{isRtl ? "منظومة التحول الشخصي" : "Personal Transformation Platform"}</span>
              </div>

              <h1
                className="text-[2.75rem] sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#f4f4f5] font-display leading-[1.05] mb-6 max-w-xl text-balance"
                data-reveal
              >
                {isRtl ? "اصنع نسختك الأفضل." : "Build your best version."}
              </h1>

              <p
                className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-md mb-9"
                data-reveal
              >
                {isRtl
                  ? "قيّم أين أنت. احصل على خطة مبنية حولك. اتخذ إجراءً. تابع تحولك."
                  : "Assess where you are. Get a plan built around you. Take action. Track your transformation."}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto" data-reveal>
                <button
                  onClick={onStartFree}
                  className="w-full sm:w-auto min-h-[48px] px-8 rounded-xl bg-[#f4f4f5] text-[#09090b] text-sm font-bold flex items-center justify-center gap-2 hover:bg-white active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/50"
                >
                  <span>{isRtl ? "ابدأ مجاناً" : "Start Free"}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection("system")}
                  className="w-full sm:w-auto min-h-[48px] px-7 rounded-xl bg-transparent border border-[#27272a] hover:border-[#3f3f46] text-sm font-semibold text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/40"
                >
                  {isRtl ? "شاهد كيف يعمل" : "See How It Works"}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-8 text-xs text-[#71717a]" data-reveal>
                <span>{isRtl ? "فحص خاص على الجهاز" : "On-device private scan"}</span>
                <span aria-hidden="true" className="text-[#3f3f46]">·</span>
                <span>{isRtl ? "خطط قابلة للتنفيذ" : "Actionable plans"}</span>
                <span aria-hidden="true" className="text-[#3f3f46]">·</span>
                <span>{isRtl ? "لا تتطلب بطاقة ائتمان" : "No credit card required"}</span>
              </div>
            </div>

            {/* Right: product visual */}
            <div className="relative" data-reveal>
              <HeroVisual isRtl={isRtl} />
            </div>
          </div>
        </section>

        {/* ═══════════════════ SECTION 2 — THE SYSTEM ═══════════════════ */}
        <Section id="system">
          <div className="max-w-2xl mb-14">
            <SectionLabel>{isRtl ? "المنظومة" : "The System"}</SectionLabel>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f4f5] font-display leading-tight mb-4" data-reveal>
              {isRtl ? "التحول يحتاج منظومة." : "Transformation needs a system."}
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed" data-reveal>
              {isRtl
                ? "ست مراحل متصلة — وليست ست بطاقات منفصلة — تبقيك دائماً على المسار الصحيح."
                : "Six connected stages — not six separate cards — that keep you on track at every step."}
            </p>
          </div>

          {/* Connected loop */}
          <div className="relative" data-reveal>
            {/* Horizontal connecting line (desktop) */}
            <div className="hidden lg:block absolute top-[2.75rem] left-0 right-0 h-px bg-gradient-to-r from-[#22d3ee]/10 via-[#22d3ee]/30 to-[#22d3ee]/10" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-3">
              {loopSteps.map((step, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Node */}
                  <div className="relative w-[5.5rem] h-[5.5rem] rounded-2xl bg-[#18181b] border border-[#27272a] flex items-center justify-center mb-4 transition-all duration-200 group-hover:border-[#22d3ee]/40 group-hover:bg-[#111113]">
                    <step.icon className="w-6 h-6 text-[#22d3ee]" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#09090b] border border-[#27272a] flex items-center justify-center text-[9px] font-mono font-bold text-[#71717a]">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#f4f4f5] font-display mb-1">{step.title}</h3>
                  <p className="text-[11px] text-[#a1a1aa] leading-relaxed max-w-[10rem]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══════════════════ SECTION 3 — PERSONALIZATION ═══════════════════ */}
        <Section id="personalization">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionLabel>{isRtl ? "التخصيص" : "Personalization"}</SectionLabel>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f4f5] font-display leading-tight mb-4" data-reveal>
                {isRtl ? "مبني حولك." : "Built around you."}
              </h2>
              <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed mb-8" data-reveal>
                {isRtl
                  ? "تتكيف أورا ماكس مع أهدافك ووقتك وميزانيتك وتفضيلاتك وحالتك الحالية — لتضمن استمرارية حقيقية."
                  : "Aura Max adapts to your goals, time, budget, preferences, and current state — to ensure lasting consistency."}
              </p>

              <div className="space-y-2.5" data-reveal>
                {personalizationDims.map((dim, i) => (
                  <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl bg-[#18181b] border border-[#27272a]">
                    <div className="w-9 h-9 rounded-lg bg-[#111113] flex items-center justify-center shrink-0">
                      <dim.icon className="w-4 h-4 text-[#22d3ee]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-[#a1a1aa]">{dim.label}</span>
                      <span className="text-xs font-bold text-[#f4f4f5]">{dim.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Adaptation output card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#18181b] border border-[#27272a] shadow-xl" data-reveal>
              <div className="flex items-center justify-between pb-4 border-b border-[#27272a] mb-5">
                <span className="text-xs font-bold text-[#f4f4f5] uppercase tracking-wider">
                  {isRtl ? "تكيّف فوري" : "Live adaptation"}
                </span>
                <span className="text-[10px] text-[#22d3ee] font-mono font-bold">Rules Engine</span>
              </div>

              <div className="space-y-3 mb-5">
                {personalizationDims.slice(0, 3).map((dim, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#111113] border border-[#27272a]">
                    <span className="text-xs text-[#a1a1aa]">{dim.label}</span>
                    <span className="text-xs font-semibold text-[#f4f4f5]">{dim.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#111113] border border-[#22d3ee]/20">
                <div className="text-xs font-bold text-[#22d3ee] mb-2">
                  {isRtl ? "خطتك تتكيف مع واقعك." : "Your plan adapts around your reality."}
                </div>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  {isRtl
                    ? "3 مهام يومية عالية التأثير: تنظيف صباحي لطيف (3د)، ترطيب حاجز البشرة (2د)، تصحيح القامة (5د)."
                    : "3 high-leverage daily actions: gentle morning cleanse (3m), barrier hydration (2m), posture correction (5m)."}
                </p>
              </div>

              <button
                onClick={onStartFree}
                className="w-full mt-5 min-h-[44px] py-3 rounded-xl bg-[#f4f4f5] text-[#09090b] text-xs font-bold transition-all hover:bg-white active:scale-95 cursor-pointer"
              >
                {isRtl ? "خصص خطتك" : "Customize your plan"}
              </button>
            </div>
          </div>
        </Section>

        {/* ═══════════════════ SECTION 4 — APPEARANCE ═══════════════════ */}
        <Section id="appearance">
          <div className="max-w-2xl mb-14">
            <SectionLabel>{isRtl ? "المظهر" : "Appearance"}</SectionLabel>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f4f5] font-display leading-tight mb-4" data-reveal>
              {isRtl ? "ابدأ بمظهرك." : "Start with how you look."}
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed" data-reveal>
              {isRtl
                ? "صورة أوضح عن أين أنت، وما الذي تعمل عليه تالياً."
                : "A clearer picture of where you are, and what to work on next."}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" data-reveal>
            {appearanceCategories.map((cat, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#22d3ee]/30 transition-colors flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#111113] flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-[#22d3ee]" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-bold text-[#f4f4f5] font-display">{cat.title}</h3>
                <p className="text-[11px] text-[#a1a1aa] leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>

          {/* Scan interface preview */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#18181b] border border-[#27272a] shadow-xl" data-reveal>
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold text-[#f4f4f5] uppercase tracking-wider">
                {isRtl ? "واجهة الفحص" : "Scan interface"}
              </span>
              <span className="text-[10px] text-[#71717a] font-mono">
                {isRtl ? "تحليل قائم على المعالم" : "Landmark-based analysis"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Scan placeholder */}
              <div className="relative aspect-square rounded-2xl bg-[#111113] border border-[#27272a] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-[#22d3ee]/5 to-transparent" />
                {/* Face landmark grid */}
                <div className="relative w-3/4 h-3/4">
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#22d3ee]/20" />
                  <div className="absolute top-[30%] left-[30%] w-2 h-2 rounded-full bg-[#22d3ee]/60 animate-pulse" />
                  <div className="absolute top-[30%] right-[30%] w-2 h-2 rounded-full bg-[#22d3ee]/60 animate-pulse" />
                  <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#22d3ee]/60 animate-pulse" />
                  <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#22d3ee]/60 animate-pulse" />
                  <div className="absolute inset-x-[15%] top-[20%] h-px bg-[#22d3ee]/15" />
                  <div className="absolute inset-x-[15%] bottom-[20%] h-px bg-[#22d3ee]/15" />
                </div>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-[#71717a] font-medium">
                  {isRtl ? "معالم مستخرجة من الصورة" : "Image-derived landmarks"}
                </span>
              </div>

              {/* Results */}
              <div className="md:col-span-2 space-y-3">
                {[
                  { label: isRtl ? "شكل الوجه" : "Face shape", value: isRtl ? "بيضاوي" : "Oval", conf: 92 },
                  { label: isRtl ? "حاجز البشرة" : "Skin barrier", value: isRtl ? "جيد" : "Good", conf: 78 },
                  { label: isRtl ? "إطار الشعر" : "Hair framing", value: isRtl ? "متوازن" : "Balanced", conf: 85 },
                ].map((r, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#111113] border border-[#27272a]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#a1a1aa]">{r.label}</span>
                      <span className="text-xs font-bold text-[#f4f4f5]">{r.value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-[#27272a] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#22d3ee] to-[#818cf8] transition-all duration-700"
                          style={{ width: `${r.conf}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#71717a] font-mono w-8 text-end">{r.conf}%</span>
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-[#71717a] leading-relaxed pt-1">
                  {isRtl
                    ? "نتائج مراعية لمستوى الثقة. توصيات مخصصة. لا ندعي دقة علمية مطلقة."
                    : "Confidence-aware results. Personalized recommendations. We don't claim absolute scientific certainty."}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══════════════════ SECTION 5 — DAILY TRANSFORMATION ═══════════════════ */}
        <Section id="daily">
          <div className="max-w-2xl mb-14">
            <SectionLabel>{isRtl ? "التحول اليومي" : "Daily Transformation"}</SectionLabel>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f4f5] font-display leading-tight mb-4" data-reveal>
              {isRtl ? "اعرف ماذا تفعل اليوم." : "Know what to do today."}
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed" data-reveal>
              {isRtl
                ? "أورا ماكس ليست مجرد ماسح ضوئي. إنها منظومة يعود إليها الناس كل يوم."
                : "Aura Max is not just a scanner. It's a system people return to every day."}
            </p>
          </div>

          {/* Today screen mockup */}
          <div className="max-w-md mx-auto w-full" data-reveal>
            <div className="rounded-[2rem] bg-gradient-to-b from-[#18181b] to-[#0f0f11] border border-[#27272a] p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <AuraMaxEmblem width={18} height={18} />
                  <span className="text-[11px] font-bold tracking-[0.18em] text-[#a1a1aa]">AURA MAX</span>
                </div>
                <span className="text-[10px] text-[#71717a]">{isRtl ? "اليوم" : "Today"}</span>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-wider text-[#22d3ee] mb-3">
                {isRtl ? "3 مهام لهدفك" : "3 actions for your goal"}
              </div>

              <div className="space-y-2.5">
                {[
                  { icon: Sun, label: isRtl ? "روتين العناية الصباحي" : "Morning skincare", time: "5 min", xp: "+20", done: true },
                  { icon: Sliders, label: isRtl ? "روتين التهذيب" : "Grooming routine", time: "3 min", xp: "+15", done: true },
                  { icon: Activity, label: isRtl ? "تمرين الثقة 10 دقائق" : "10-minute confidence practice", time: "10 min", xp: "+30", done: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border ${
                      item.done ? "bg-[#111113] border-[#27272a]" : "bg-[#111113] border-[#22d3ee]/30"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      item.done ? "bg-emerald-500/10" : "bg-[#22d3ee]/10"
                    }`}>
                      {item.done ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <item.icon className="w-4 h-4 text-[#22d3ee]" strokeWidth={1.5} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-bold ${item.done ? "text-[#71717a] line-through" : "text-[#f4f4f5]"}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-[#71717a]">{item.time} · {item.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#27272a]">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#22d3ee]" />
                  <span className="text-xs font-bold text-[#f4f4f5]">+30 XP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#71717a] uppercase tracking-wider font-semibold">
                    {isRtl ? "السلسلة" : "Streak"}
                  </span>
                  <span className="text-xs font-bold text-[#f4f4f5]">{isRtl ? "يوم ٧" : "Day 7"}</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══════════════════ SECTION 6 — PROGRESS ═══════════════════ */}
        <Section id="progress">
          <div className="max-w-2xl mb-14">
            <SectionLabel>{isRtl ? "التقدم" : "Progress"}</SectionLabel>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f4f5] font-display leading-tight mb-4" data-reveal>
              {isRtl ? "شاهد تقدمك، ليس مجرد نتيجتك." : "See your progress, not just your score."}
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed" data-reveal>
              {isRtl
                ? "التقدم يدور حول السلوك والتحول — وليس حول رقم واحد في المنتصف."
                : "Progress is about behavior and transformation — not a single number in the middle."}
            </p>
          </div>

          {/* Progress visualization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-reveal>
            {/* Weekly actions chart */}
            <div className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#a1a1aa] mb-4">
                {isRtl ? "الأفعال الأسبوعية" : "Weekly actions"}
              </div>
              <div className="flex items-end justify-between gap-2 h-24">
                {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-[#22d3ee]/30 to-[#22d3ee] transition-all duration-700"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[9px] text-[#71717a] font-mono">
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Consistency ring */}
            <div className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a] flex flex-col items-center justify-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#a1a1aa] mb-3">
                {isRtl ? "الاستمرارية" : "Consistency"}
              </div>
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="34" stroke="#27272a" strokeWidth="5" fill="none" />
                  <circle
                    cx="40" cy="40" r="34"
                    stroke="#22d3ee"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="214"
                    strokeDashoffset="47"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-black text-[#f4f4f5] font-display">78%</span>
                </div>
              </div>
              <div className="text-[10px] text-[#71717a] mt-2">{isRtl ? "آخر 7 أيام" : "Last 7 days"}</div>
            </div>

            {/* Completed goals */}
            <div className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#a1a1aa] mb-4">
                {isRtl ? "أهداف مكتملة" : "Completed goals"}
              </div>
              <div className="space-y-2.5">
                {[
                  { label: isRtl ? "روتين البشرة الصباحي" : "Morning skincare routine", done: true },
                  { label: isRtl ? "تصحيح القامة" : "Posture correction", done: true },
                  { label: isRtl ? "إطار الشعر" : "Hair framing", done: false },
                ].map((g, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      g.done ? "bg-emerald-500/20" : "border border-[#27272a]"
                    }`}>
                      {g.done && <Check className="w-2.5 h-2.5 text-emerald-400" />}
                    </div>
                    <span className={`text-xs ${g.done ? "text-[#a1a1aa] line-through" : "text-[#f4f4f5]"}`}>
                      {g.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline strip */}
          <div className="mt-6 p-5 rounded-2xl bg-[#18181b] border border-[#27272a]" data-reveal>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#a1a1aa] mb-4">
              {isRtl ? "قبل / بعد — خط زمني" : "Before / after — timeline"}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-1">
                <div className="text-[10px] text-[#71717a]">{isRtl ? "الأسبوع ١" : "Week 1"}</div>
                <div className="h-2 rounded-full bg-[#27272a]" />
              </div>
              <ArrowIcon className="w-4 h-4 text-[#22d3ee] shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="text-[10px] text-[#71717a]">{isRtl ? "الأسبوع ٤" : "Week 4"}</div>
                <div className="h-2 rounded-full bg-gradient-to-r from-[#22d3ee]/40 to-[#22d3ee]" />
              </div>
              <ArrowIcon className="w-4 h-4 text-[#22d3ee] shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="text-[10px] text-[#71717a]">{isRtl ? "الأسبوع ٨" : "Week 8"}</div>
                <div className="h-2 rounded-full bg-gradient-to-r from-[#22d3ee] to-[#818cf8]" />
              </div>
            </div>
          </div>
        </Section>

        {/* ═══════════════════ SECTION 7 — ADAPTATION ═══════════════════ */}
        <Section id="adaptation">
          <div className="max-w-2xl mb-14">
            <SectionLabel>{isRtl ? "التكيف" : "Adaptation"}</SectionLabel>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f4f5] font-display leading-tight mb-4" data-reveal>
              {isRtl ? "خطتك تتطور معك." : "Your plan evolves with you."}
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed" data-reveal>
              {isRtl
                ? "يجب أن تتغير خطتك عندما تتغير أهدافك أو عاداتك أو وقتك أو تقدمك."
                : "Your plan should change when your goals, habits, time, or progress change."}
            </p>
          </div>

          {/* Week-by-week flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-reveal>
            {adaptationWeeks.map((wk, i) => (
              <div key={i} className="relative">
                {i < adaptationWeeks.length - 1 && (
                  <div className="hidden lg:block absolute top-[3.5rem] -right-2 z-10">
                    <ArrowRight className="w-4 h-4 text-[#22d3ee]/30" />
                  </div>
                )}
                <div className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#22d3ee]/20 transition-colors h-full">
                  <div className="text-[10px] font-mono font-bold text-[#22d3ee] mb-3">{wk.title}</div>
                  <div className="space-y-2">
                    {wk.actions.map((action, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs">
                        <span className={`w-1 h-1 rounded-full shrink-0 ${
                          action.startsWith("+") ? "bg-emerald-400" :
                          action.startsWith("−") ? "bg-orange-400" :
                          "bg-[#71717a]"
                        }`} />
                        <span className={`${
                          action.startsWith("+") ? "text-emerald-400/90" :
                          action.startsWith("−") ? "text-orange-400/90" :
                          "text-[#a1a1aa]"
                        }`}>
                          {action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#71717a] mt-6 text-center max-w-lg mx-auto" data-reveal>
            {isRtl
              ? "تكيّف تلقائي: إضافة عناصر جديدة (+)، إزالة ما لا يناسب (−)، وتركيز على نقاط الضعف — حسب سلوكك الفعلي."
              : "Auto-adaptation: adding new elements (+), removing what doesn't fit (−), and focusing on weak areas — based on your actual behavior."}
          </p>
        </Section>

        {/* ═══════════════════ SECTION 8 — THE BIGGER VISION ═══════════════════ */}
        <Section id="vision">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <SectionLabel>{isRtl ? "الرؤية الأكبر" : "The Bigger Vision"}</SectionLabel>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f4f5] font-display leading-tight mb-4" data-reveal>
              {isRtl ? "منصة واحدة. كل بُعد من نموك." : "One platform. Every dimension of your growth."}
            </h2>
          </div>

          {/* Vertical dimension flow */}
          <div className="max-w-sm mx-auto space-y-2" data-reveal>
            {visionDimensions.map((dim, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-full p-5 rounded-2xl border flex items-center justify-between transition-all ${
                    dim.status === "current"
                      ? "bg-[#18181b] border-[#22d3ee]/40 shadow-lg shadow-[#22d3ee]/5"
                      : "bg-[#111113] border-[#27272a]"
                  }`}
                >
                  <span className={`text-base font-bold font-display ${
                    dim.status === "current" ? "text-[#f4f4f5]" : "text-[#71717a]"
                  }`}>
                    {dim.label}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    dim.status === "current" ? "text-[#22d3ee]" : "text-[#3f3f46]"
                  }`}>
                    {dim.status === "current"
                      ? (isRtl ? "متاح الآن" : "Available now")
                      : (isRtl ? "قريباً" : "Coming soon")
                    }
                  </span>
                </div>
                {i < visionDimensions.length - 1 && (
                  <div className="w-px h-8 bg-gradient-to-b from-[#22d3ee]/30 to-[#27272a]" />
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-[#71717a] mt-8 text-center max-w-md mx-auto" data-reveal>
            {isRtl
              ? "المظهر هو نقطة البداية الحالية. الأبعاد الأخرى هي الاتجاه المستقبلي — وليست متاحة بالكامل اليوم."
              : "Appearance is the current starting point. The other dimensions are the future direction — not fully available today."}
          </p>
        </Section>

        {/* ═══════════════════ SECTION 9 — PRIVACY ═══════════════════ */}
        <Section id="privacy">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#18181b] border border-[#27272a] flex items-center justify-center mx-auto mb-5" data-reveal>
              <ShieldCheck className="w-5 h-5 text-[#22d3ee]" strokeWidth={1.5} />
            </div>
            <SectionLabel>{isRtl ? "الخصوصية" : "Privacy"}</SectionLabel>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f4f5] font-display leading-tight mb-4" data-reveal>
              {isRtl ? "تحولك ملكك." : "Your transformation is yours."}
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed max-w-xl mx-auto mb-10" data-reveal>
              {isRtl
                ? "نقلل من البيانات الشخصية غير الضرورية. نحافظ على حساسية معلوماتك. الذكاء الاصطناعي اختياري حيثما أمكن. أنت تتحكم في بياناتك."
                : "We minimize unnecessary personal data. We keep sensitive information protected. AI is optional where possible. You control your data."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-start" data-reveal>
              {[
                { icon: Lock, title: isRtl ? "تقليل البيانات" : "Minimize data", desc: isRtl ? "نجمع ما يلزم لعمل المنصة فقط." : "We collect only what the platform needs to function." },
                { icon: ShieldCheck, title: isRtl ? "حماية المعلومات الحساسة" : "Protect sensitive info", desc: isRtl ? "معلوماتك الحساسة محمية وبأمان." : "Your sensitive information stays protected." },
                { icon: Sliders, title: isRtl ? "ذكاء اصطناعي اختياري" : "AI is optional", desc: isRtl ? "الذكاء الاصطناعي اختياري حيثما أمكن." : "AI features are opt-in wherever possible." },
                { icon: Check, title: isRtl ? "أنت تتحكم" : "You control your data", desc: isRtl ? "صدّر أو امسح بياناتك في أي وقت." : "Export or delete your data anytime." },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] flex items-start gap-3">
                  <item.icon className="w-4 h-4 text-[#22d3ee] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <div className="text-xs font-bold text-[#f4f4f5] mb-0.5">{item.title}</div>
                    <p className="text-[11px] text-[#a1a1aa] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══════════════════ SECTION 10 — FREE / PREMIUM ═══════════════════ */}
        <Section id="pricing">
          <div className="max-w-2xl mb-14">
            <SectionLabel>{isRtl ? "الأسعار" : "Plans"}</SectionLabel>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f4f5] font-display leading-tight mb-4" data-reveal>
              {isRtl ? "ابدأ مجاناً. وسّع عندما تكون جاهزاً." : "Start free. Go deeper when you're ready."}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" data-reveal>
            {/* Free */}
            <div className="p-7 rounded-3xl bg-[#18181b] border border-[#27272a] flex flex-col">
              <div className="text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-2">
                {isRtl ? "مجاني" : "Free"}
              </div>
              <div className="text-2xl font-black text-[#f4f4f5] font-display mb-1">
                {isRtl ? "ابدأ تحولك" : "Start your transformation"}
              </div>
              <div className="text-3xl font-black text-[#f4f4f5] font-display mb-6 mt-2">
                <span className="text-lg text-[#a1a1aa]">$0</span>
              </div>

              <div className="space-y-3 flex-1">
                {[
                  isRtl ? "تقييم أساسي" : "Basic assessment",
                  isRtl ? "خطة شخصية" : "Personal plan",
                  isRtl ? "مهام يومية" : "Daily actions",
                  isRtl ? "تتبع التقدم" : "Progress tracking",
                  isRtl ? "إرشاد ذكاء اصطناعي محدود" : "Limited AI guidance",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#22d3ee] shrink-0" strokeWidth={2} />
                    <span className="text-xs text-[#a1a1aa]">{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onStartFree}
                className="w-full mt-6 min-h-[48px] py-3.5 rounded-xl bg-[#f4f4f5] text-[#09090b] text-sm font-bold transition-all hover:bg-white active:scale-95 cursor-pointer"
              >
                {isRtl ? "ابدأ مجاناً" : "Start Free"}
              </button>
            </div>

            {/* Premium */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#1a1a1f] to-[#18181b] border border-[#22d3ee]/20 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/40 to-transparent" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/20 text-[#22d3ee] text-[10px] font-bold uppercase tracking-wider mb-2 w-fit">
                <Crown className="w-3 h-3" />
                <span>{isRtl ? "بريميوم" : "Premium"}</span>
              </div>
              <div className="text-2xl font-black text-[#f4f4f5] font-display mb-1">
                {isRtl ? "تعمق أكثر" : "Go deeper"}
              </div>
              <div className="text-3xl font-black text-[#f4f4f5] font-display mb-6 mt-2">
                <span className="text-lg text-[#a1a1aa]">$</span>
                <span>—</span>
                <span className="text-sm text-[#71717a] ml-1">{isRtl ? "قريباً" : "soon"}</span>
              </div>

              <div className="space-y-3 flex-1">
                {[
                  isRtl ? "تخصيص متقدم" : "Advanced personalization",
                  isRtl ? "خطط تكيّفية" : "Adaptive plans",
                  isRtl ? "رؤى أعمق" : "Deeper insights",
                  isRtl ? "سجل متقدم" : "Advanced history",
                  isRtl ? "ميزات ذكاء اصطناعي متقدمة" : "Advanced AI features",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#22d3ee] shrink-0" strokeWidth={2} />
                    <span className="text-xs text-[#a1a1aa]">{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onStartFree}
                className="w-full mt-6 min-h-[48px] py-3.5 rounded-xl bg-transparent border border-[#27272a] hover:border-[#22d3ee]/40 text-[#a1a1aa] hover:text-[#f4f4f5] text-sm font-bold transition-colors cursor-pointer"
              >
                {isRtl ? "ابدأ مجاناً أولاً" : "Start free first"}
              </button>
            </div>
          </div>

          <p className="text-[11px] text-[#71717a] mt-5 text-center" data-reveal>
            {isRtl ? "لا تتطلب بطاقة ائتمان. لا ضغط للبيع. لا إلحاح." : "No credit card required. No pressure. No urgency tactics."}
          </p>
        </Section>

        {/* ═══════════════════ SECTION 11 — FAQ ═══════════════════ */}
        <Section id="faq">
          <div className="max-w-2xl mb-12">
            <SectionLabel>{isRtl ? "الأسئلة الشائعة" : "FAQ"}</SectionLabel>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f4f4f5] font-display leading-tight" data-reveal>
              {isRtl ? "أسئلة وإجابات واضحة." : "Clear, honest answers."}
            </h2>
          </div>

          <div className="max-w-3xl space-y-3" data-reveal>
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#18181b] border border-[#27272a] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-start flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/30 rounded-2xl"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#f4f4f5]">{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#22d3ee] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#a1a1aa] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-[#a1a1aa] leading-relaxed border-t border-[#27272a]/50">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* ═══════════════════ FINAL CTA ═══════════════════ */}
        <section className="px-5 sm:px-8 max-w-4xl mx-auto w-full py-24 sm:py-32 text-center">
          <div data-reveal>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#f4f4f5] font-display leading-[1.1] mb-5 text-balance">
              {isRtl ? "لا تحتاج نسخة مثالية من نفسك." : "You don't need a perfect version of yourself."}
            </h2>
            <p className="text-base sm:text-xl text-[#a1a1aa] leading-relaxed max-w-xl mx-auto mb-9">
              {isRtl ? "تحتاج منظومة يمكنك اتباعها." : "You need a system you can follow."}
            </p>
            <button
              onClick={onStartFree}
              className="inline-flex items-center gap-2 min-h-[52px] px-10 rounded-xl bg-[#f4f4f5] text-[#09090b] text-base font-bold hover:bg-white active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/50"
            >
              <span>{isRtl ? "ابدأ مجاناً" : "Start Free"}</span>
              <ArrowIcon className="w-5 h-5" />
            </button>
            <div className="text-[11px] text-[#71717a] mt-4">
              {isRtl ? "لا بطاقة ائتمان · ابدأ في أقل من دقيقة" : "No credit card · Start in under a minute"}
            </div>
          </div>
        </section>
      </main>

      {/* ───────── Footer ───────── */}
      <footer className="border-t border-[#27272a] py-12 px-5 sm:px-8 bg-[#09090b]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <AuraMaxEmblem width={24} height={24} glow={false} />
              <AuraMaxWordmark size="sm" />
            </div>

            {/* Links */}
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#71717a]">
              <button onClick={() => scrollToSection("system")} className="hover:text-[#f4f4f5] transition-colors cursor-pointer">
                {isRtl ? "كيف يعمل" : "How It Works"}
              </button>
              <button onClick={() => scrollToSection("privacy")} className="hover:text-[#f4f4f5] transition-colors cursor-pointer">
                {isRtl ? "الخصوصية" : "Privacy"}
              </button>
              <button onClick={() => scrollToSection("pricing")} className="hover:text-[#f4f4f5] transition-colors cursor-pointer">
                {isRtl ? "الأسعار" : "Terms"}
              </button>
              <button onClick={() => scrollToSection("faq")} className="hover:text-[#f4f4f5] transition-colors cursor-pointer">
                {isRtl ? "الأسئلة" : "FAQ"}
              </button>
            </nav>

            {/* Language + socials */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-[#71717a]">
                <Globe className="w-3.5 h-3.5" />
                <button onClick={() => onSetLocale("en")} className={`hover:text-[#f4f4f5] transition-colors cursor-pointer ${locale === "en" ? "text-[#f4f4f5]" : ""}`}>English</button>
                <span className="text-[#3f3f46]">·</span>
                <button onClick={() => onSetLocale("ar")} className={`hover:text-[#f4f4f5] transition-colors cursor-pointer ${locale === "ar" ? "text-[#f4f4f5]" : ""}`}>العربية</button>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[#71717a] hover:text-[#f4f4f5] hover:border-[#27272a] transition-colors cursor-pointer">
                  <Twitter className="w-3.5 h-3.5" />
                </span>
                <span className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[#71717a] hover:text-[#f4f4f5] hover:border-[#27272a] transition-colors cursor-pointer">
                  <Instagram className="w-3.5 h-3.5" />
                </span>
                <span className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[#71717a] hover:text-[#f4f4f5] hover:border-[#27272a] transition-colors cursor-pointer">
                  <Youtube className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#71717a]">
            <span>© 2026 Aura Max. {isRtl ? "جميع الحقوق محفوظة." : "All rights reserved."}</span>
            <span>{isRtl ? "منظومة التحول الشخصي" : "Personal Transformation Platform"}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
