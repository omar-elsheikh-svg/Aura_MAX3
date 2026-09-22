import React, { useState } from "react";
import { Locale, GenderTrack } from "../types";
import { AuraMaxEmblem } from "./AuraMaxLogo";
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
  Check
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

  return (
    <div 
      className="min-h-screen bg-[#08090C] text-[#F4F7FA] flex flex-col relative selection:bg-[#42E8FF]/20 selection:text-[#42E8FF]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Ambient Lighting (Obsidian Wellness) */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] max-w-[100vw] h-[500px] bg-gradient-to-b from-[#42E8FF]/8 via-[#8B5CF6]/5 to-transparent blur-[160px] pointer-events-none -z-10" 
      />

      {/* Top Bar Contract: 3 zones (Brand wordmark, Nav links, 1-2 Primary actions) */}
      <header className="sticky top-0 z-40 bg-[#08090C]/90 backdrop-blur-md border-b border-[#1E232E] px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-2.5">
            <AuraMaxEmblem width={30} height={30} glow={false} />
            <span className="font-extrabold text-base sm:text-lg tracking-[0.16em] text-[#F4F7FA] font-display">
              AURA MAX
            </span>
          </div>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#A5AEBC]">
            <button 
              onClick={() => scrollToSection("how-it-works")}
              className="hover:text-[#F4F7FA] transition-colors cursor-pointer"
            >
              {isRtl ? "كيف يعمل؟" : "How It Works"}
            </button>
            <button 
              onClick={() => scrollToSection("dimensions")}
              className="hover:text-[#F4F7FA] transition-colors cursor-pointer"
            >
              {isRtl ? "أبعاد الخطة" : "Transformation"}
            </button>
            <button 
              onClick={() => scrollToSection("privacy")}
              className="hover:text-[#F4F7FA] transition-colors cursor-pointer"
            >
              {isRtl ? "الخصوصية أولاً" : "Privacy First"}
            </button>
            <button 
              onClick={() => scrollToSection("faq")}
              className="hover:text-[#F4F7FA] transition-colors cursor-pointer"
            >
              {isRtl ? "الأسئلة الشائعة" : "FAQ"}
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSetLocale(locale === "en" ? "ar" : "en")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111318] border border-[#252A33] hover:border-[#42E8FF]/40 text-xs font-semibold text-[#A5AEBC] hover:text-[#F4F7FA] transition-all cursor-pointer"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#42E8FF]" />
              <span>{locale === "en" ? "العربية" : "EN"}</span>
            </button>

            <button
              onClick={onStartFree}
              className="px-4 py-2 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold transition-all shadow-[0_0_20px_rgba(66,232,255,0.25)] active:scale-95 cursor-pointer whitespace-nowrap"
            >
              {isRtl ? "ابدأ مجاناً" : "Start Free"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* Section 1: Hero */}
        <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111318] border border-[#252A33] text-xs font-medium text-[#A5AEBC] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#42E8FF]" />
            <span>
              {isRtl 
                ? "منظومة التحول الشخصي المخصصة لك" 
                : "Personal Transformation System Built Around You"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F4F7FA] font-display leading-[1.15] mb-5 max-w-3xl text-balance">
            {isRtl ? "اصنع نسختك الأفضل." : "Build your best version."}
          </h1>

          <p className="text-base sm:text-lg text-[#A5AEBC] leading-relaxed max-w-2xl mb-8">
            {isRtl
              ? "قيّم ملامحك بدقة بيومترية محلية. احصل على خطة تحول مخصصة لوقتك وميزانيتك. اتخذ خطوات يومية وتابع تحولك الحقيقي."
              : "Assess where you are. Get a personalized plan built around your goals, time, and budget. Take daily action. Track your transformation."}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={onStartFree}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-sm font-extrabold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(66,232,255,0.3)] hover:brightness-110 active:scale-98 transition-all cursor-pointer"
            >
              <span>{isRtl ? "ابدأ مجاناً الآن" : "Start Free"}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#111318] hover:bg-[#171A21] border border-[#252A33] text-sm font-semibold text-[#A5AEBC] hover:text-[#F4F7FA] transition-all cursor-pointer"
            >
              {isRtl ? "اكتشف كيف يعمل" : "See How It Works"}
            </button>
          </div>

          <div className="flex items-center gap-6 mt-8 text-xs text-[#6B7484]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#42E8FF]" />
              {isRtl ? "معالجة محلية في جهازك" : "On-device local processing"}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#8B5CF6]" />
              {isRtl ? "لا نخزن صور وجهك" : "No raw face storage"}
            </span>
            <span>·</span>
            <span>
              {isRtl ? "خطة علمية محددة" : "Rules-based plans"}
            </span>
          </div>
        </section>

        {/* Section 2: Interactive / Demo Aura Overview (Preview only, explicitly labeled) */}
        <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <div className="rounded-2xl bg-[#111318] border border-[#252A33] p-6 sm:p-8 relative overflow-hidden">
            {/* Clear preview disclaimer flag */}
            <div className="flex items-center justify-between pb-6 border-b border-[#252A33] mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#42E8FF] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC]">
                  {isRtl ? "معاينة نموذج النتيجة — هذا مثال توضيحي" : "Product Preview — Visual Example"}
                </span>
              </div>
              <span className="text-xs text-[#6B7484]">
                {isRtl ? "ليس تقييماً حقيقياً لوجهك بعد" : "Sample output framework"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Score Preview */}
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#08090C] border border-[#252A33]">
                <span className="text-xs font-medium text-[#A5AEBC] mb-1">
                  {isRtl ? "تقدير التناسق الجمالي" : "Aesthetic Insight Score"}
                </span>
                <div className="text-5xl font-black text-[#F4F7FA] font-display my-2">
                  86<span className="text-xl text-[#6B7484]">/100</span>
                </div>
                <div className="text-xs text-[#42E8FF] font-semibold">
                  {isRtl ? "تناسق هيكلي متقدم" : "High Structural Harmony"}
                </div>
                <div className="text-[11px] text-[#6B7484] mt-2">
                  {isRtl ? "تقدير غير طبي مبني على القياسات النسبية" : "Non-medical aesthetic metric estimation"}
                </div>
              </div>

              {/* Insights List Preview */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#F4F7FA]">
                  {isRtl ? "أبرز نقاط التناسق" : "Key Strengths Identified"}
                </div>
                <div className="p-3 rounded-lg bg-[#08090C] border border-[#252A33] text-xs text-[#A5AEBC] flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#42E8FF] shrink-0 mt-0.5" />
                  <span>{isRtl ? "زاوية فك حادة 121.5° مع مسافة عنقية ممتازة" : "Defined 121.5° gonial angle with strong cervical alignment"}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#08090C] border border-[#252A33] text-xs text-[#A5AEBC] flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#42E8FF] shrink-0 mt-0.5" />
                  <span>{isRtl ? "سحبة عينين يقظة وإيجابية (+4.2° Canthal Tilt)" : "Positive orbital canthal tilt (+4.2°) providing alert presence"}</span>
                </div>
              </div>

              {/* Action Preview */}
              <div className="flex flex-col justify-between h-full p-4 rounded-xl bg-[#08090C] border border-[#252A33]">
                <div>
                  <div className="text-xs font-bold text-[#F4F7FA] mb-1">
                    {isRtl ? "الخطوة التالية الموصى بها" : "Recommended Transformation"}
                  </div>
                  <p className="text-xs text-[#A5AEBC] leading-relaxed mb-4">
                    {isRtl 
                      ? "خطة 7 أيام لطرد احتباس السوائل حول الفك، وحماية البشرة بواقي SPF 50+ يومي."
                      : "7-day debloat protocol targeting submental facial edema and daily barrier hydration."}
                  </p>
                </div>
                <button
                  onClick={onStartFree}
                  className="w-full py-2.5 rounded-lg bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>{isRtl ? "ابنِ خطتك الشخصية" : "Build My Plan"}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How It Works (The 4-Step Core Loop) */}
        <section id="how-it-works" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F7FA] font-display mb-3">
              {isRtl ? "كيف تعمل المنظومة؟" : "How the Transformation Loop Works"}
            </h2>
            <p className="text-sm text-[#A5AEBC]">
              {isRtl 
                ? "من التقييم الأولي إلى العادة اليومية، مصممة لتحقيق نتائج مستدامة دون تعقيد."
                : "From assessment to daily habit, engineered for real results without overwhelming your schedule."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: isRtl ? "التقييم البيومتري" : "Assess Biometrics",
                desc: isRtl 
                  ? "فحص فوري لزوايا الفك، تناسق الملامح، وشكل الوجه محلياً داخل متصفحك."
                  : "Instant on-device scan measuring mandibular angle, symmetry, and proportions.",
              },
              {
                step: "02",
                title: isRtl ? "بناء الخطة" : "Deterministic Plan",
                desc: isRtl
                  ? "توليد خطة عملية محددة بناءً على هدفك ووقتك (5 أو 15 أو 30 دقيقة يومياً)."
                  : "Rules engine builds a tailored protocol matching your available time and budget.",
              },
              {
                step: "03",
                title: isRtl ? "المهام اليومية" : "Daily Quests",
                desc: isRtl
                  ? "3 إلى 5 مهام واضحة ومباشرة مع شرح الفائدة ومؤقت دقيق."
                  : "3-5 high-leverage daily actions with duration, purpose, and streak tracking.",
              },
              {
                step: "04",
                title: isRtl ? "المراجعة والتكيف" : "Review & Adapt",
                desc: isRtl
                  ? "مراجعة أسبوعية تعدل الخطة تلقائياً إذا كانت صعبة أو سهلة لضمان استمرارك."
                  : "Weekly review adapts your routine based on real adherence and progress.",
              },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl bg-[#111318] border border-[#252A33] flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#42E8FF] mb-2 block">
                    {item.step}
                  </span>
                  <h3 className="text-sm font-bold text-[#F4F7FA] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A5AEBC] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Personalization Dimensions */}
        <section id="dimensions" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F7FA] font-display mb-3">
              {isRtl ? "أبعاد التطوير المتاحة" : "Personalization Dimensions"}
            </h2>
            <p className="text-sm text-[#A5AEBC]">
              {isRtl 
                ? "اختر هدفك الأساسي ليركز البرنامج فقط على ما يهمك ويوفر أعلى عائد جمالي."
                : "Choose what matters to you. Your plan focuses strictly on high-impact interventions."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: isRtl ? "عظام الوجه والفك" : "Facial Architecture",
                tag: isRtl ? "الفك والرقبة" : "Jaw & Neck",
                desc: isRtl 
                  ? "طرد السوائل المحتبسة، تمرين Chin Tucks، ووضعية اللسان السليمة (Mewing)."
                  : "Sodium debloat protocols, cervical posture conditioning, and palatal tongue rest.",
              },
              {
                title: isRtl ? "صحة ونضارة البشرة" : "Dermal Health & Clarity",
                tag: isRtl ? "حماية ونقاء" : "SPF & Barrier",
                desc: isRtl 
                  ? "واقي شمس واسع المدى SPF 50+، تنظيف مزدوج، ودعم حاجز السيراميد الطبيعي."
                  : "Broad-spectrum SPF 50+, double-cleansing routines, and ceramide barrier support.",
              },
              {
                title: isRtl ? "تسريحة وكثافة الشعر" : "Hairstyle & Scalp",
                tag: isRtl ? "تأطير الملامح" : "Framing",
                desc: isRtl 
                  ? "قصات متوازنة مع شكل الوجه وتدليك تنشيط البصيلات بزيوت طبيعية مدروسة."
                  : "Haircuts engineered for your face shape proportions and scalp follicle health.",
              },
              {
                title: isRtl ? "تحديد اللحية والحواجب" : "Grooming & Eyebrows",
                tag: isRtl ? "التباين والتناسق" : "Contrast",
                desc: isRtl 
                  ? "تحديد خط الرقبة بدقة 3-4 ملم وتمشيط الحواجب للأعلى لرفع زاوية العين."
                  : "Precision neckline fading for jaw contrast and 45° eyebrow grooming.",
              },
              {
                title: isRtl ? "استقامة القامة والهيبة" : "Postural Poise & Presence",
                tag: isRtl ? "الاستقامة" : "Spinal Poise",
                desc: isRtl 
                  ? "فرد الأكتاف وتصحيح انحناء الرقبة للأمام لتعزيز طول العنق وبروز الملامح."
                  : "Thoracic alignment drills eliminating forward head carriage.",
              },
              {
                title: isRtl ? "مسارات مخصصة للجنسين" : "Dual Pathway Architecture",
                tag: isRtl ? "أورا ماكس وفيم" : "Max & Fem",
                desc: isRtl 
                  ? "Aura Max للرجال (هندسة الفك والحلاقة) و Aura Fem للنساء (التناغم والبشرة الزجاجية)."
                  : "Dedicated tracks with identical biometric technology tailored to your aesthetic goals.",
              },
            ].map((card, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-xl bg-[#111318] border border-[#252A33] hover:border-[#42E8FF]/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-[#F4F7FA]">{card.title}</h3>
                  <span className="text-[10px] font-semibold text-[#42E8FF] px-2 py-0.5 rounded bg-[#42E8FF]/10">
                    {card.tag}
                  </span>
                </div>
                <p className="text-xs text-[#A5AEBC] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Privacy Message */}
        <section id="privacy" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto w-full">
          <div className="p-8 rounded-2xl bg-[#111318] border border-[#252A33] flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-[#42E8FF]/10 text-[#42E8FF] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1 text-start">
              <h2 className="text-lg font-bold text-[#F4F7FA] mb-2">
                {isRtl ? "خصوصية وجهك مضمونة هندسياً" : "Privacy First by Architectural Design"}
              </h2>
              <p className="text-xs sm:text-sm text-[#A5AEBC] leading-relaxed">
                {isRtl 
                  ? "نقوم بمعالجة الفحص داخل متصفحك مباشرة. لا نرفع ولا نخزن صور وجهك الأصلية في خوادمنا على الإطلاق. ما يتم حفظه في خطتك هو فقط الأبعاد الهندسية المشتقة (مثل قياس زاوية الفك أو شكل الوجه)، ولك الحق الكامل في حذفها بنقرة واحدة."
                  : "We analyze your facial landmarks locally on your device. Raw facial photos are never stored or uploaded by default. Only derived geometric metrics (such as jaw angle or face shape classification) are saved to build your plan, and you can delete your data at any time."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: FAQ */}
        <section id="faq" className="py-16 px-4 sm:px-6 max-w-3xl mx-auto w-full">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F7FA] font-display mb-2">
              {isRtl ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
            <p className="text-xs sm:text-sm text-[#A5AEBC]">
              {isRtl ? "كل ما تود معرفته عن المنظومة والخطط والخصوصية" : "Everything you need to know before starting."}
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: isRtl ? "هل التقييم طبي أم علمي قاطع؟" : "Is the Aura Score a medical or scientific diagnosis?",
                a: isRtl
                  ? "لا. تقييم أورا هو تقدير جمالي نسبي غير طبي. يهدف لمساعدتك على تحديد عادات العناية والاستقامة المناسبة، وليس مقياساً لقيمتك الإنسانية أو بديلاً عن استشارة الطبيب المختص."
                  : "No. The Aura Score is an aesthetic estimate based on geometric proportions and lifestyle indicators. It is not a medical diagnosis or a measure of personal worth, but a practical baseline for healthy grooming and posture.",
              },
              {
                q: isRtl ? "هل الفحص والخطط مجانية؟" : "Is Aura Max free to use?",
                a: isRtl
                  ? "نعم، الفحص الأساسي، التقييم، وتوليد الخطة الشخصية، ومتابعة المهام اليومية ونقاط الاستمرارية متاحة مجاناً بالكامل. نوفر اشتراكاً إضافياً اختيارياً لمن يرغب في التوسع واستشارات المدرب المتقدمة."
                  : "Yes. Basic biometric scan, plan generation, daily quests, streak tracking, and knowledge protocols are 100% free. Premium is an optional layer for users wanting deeper adaptive plan progression and advanced coaching.",
              },
              {
                q: isRtl ? "كيف تتكيف خطتي أسبوعياً؟" : "How does my transformation plan adapt?",
                a: isRtl
                  ? "في نهاية كل أسبوع، يقوم محرك القواعد بفحص نسبة إتمامك للمهام. إذا واجهت صعوبة في الروتين المسائي مثلاً، يتم تبسيطه تلقائياً لضمان عدم الانقطاع."
                  : "At the end of each week, the Rules Engine checks your real completion rate. If you consistently skip evening tasks, your plan automatically simplifies them to lock in foundational habits without burnout.",
              },
              {
                q: isRtl ? "هل أحتاج إلى شراء منتجات باهظة؟" : "Do I need expensive products or procedures?",
                a: isRtl
                  ? "إطلاقاً. معظم التحول الجمالي الطبيعي يبدأ من عادات مجانية: ضبط وضعية اللسان والرقبة، شرب الماء وطرد السوائل، النوم المنتظم، وواقي شمس بسيط."
                  : "Absolutely not. Over 80% of natural aesthetic optimization comes from zero-cost habits: correct tongue posture, sodium reduction, hydration, deep restorative sleep, and wall alignment drills.",
              },
            ].map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-xl bg-[#111318] border border-[#252A33] overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-start flex items-center justify-between text-sm font-semibold text-[#F4F7FA] hover:text-[#42E8FF] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#42E8FF] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#A5AEBC] shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-[#A5AEBC] leading-relaxed border-t border-[#252A33]/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Final CTA */}
        <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto w-full text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#111318] to-[#0D0F14] border border-[#252A33] relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F7FA] font-display mb-3">
              {isRtl ? "ابدأ رحلة تحولك الشخصية اليوم" : "Start Your Personal Transformation Today"}
            </h2>
            <p className="text-sm text-[#A5AEBC] max-w-xl mx-auto mb-8">
              {isRtl 
                ? "فحص سريع في 60 ثانية، بدون تسجيل مسبق، وخطة تحول مصممة خصيصاً لك."
                : "A 60-second assessment, zero upfront registration barrier, and a deterministic plan built around your life."}
            </p>
            <button
              onClick={onStartFree}
              className="px-8 py-3.5 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-sm font-extrabold inline-flex items-center gap-2 shadow-[0_0_30px_rgba(66,232,255,0.35)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <span>{isRtl ? "ابدأ مجاناً الآن" : "Start Free Now"}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E232E] py-8 px-4 sm:px-8 text-center text-xs text-[#6B7484]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#F4F7FA]">AURA MAX</span>
            <span>·</span>
            <span>{isRtl ? "منظومة التحول الشخصي" : "Personal Transformation Platform"}</span>
          </div>
          <div>
            © {new Date().getFullYear()} Aura Max. {isRtl ? "جميع الحقوق محفوظة." : "All rights reserved. Non-medical aesthetic assessment."}
          </div>
        </div>
      </footer>
    </div>
  );
};
