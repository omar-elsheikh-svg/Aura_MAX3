import React from "react";
import { Locale, GenderTrack } from "../types";
import { AuraMaxLogo } from "./AuraMaxLogo";
import { 
  Sparkles, 
  Flame, 
  Crown, 
  Scan, 
  Camera, 
  Sliders, 
  Compass, 
  Bot, 
  Award, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Globe,
  Scissors
} from "lucide-react";

interface GenderGatewayLandingProps {
  locale: Locale;
  onSetLocale: (locale: Locale) => void;
  onSelectTrack: (track: GenderTrack) => void;
}

export const GenderGatewayLanding: React.FC<GenderGatewayLandingProps> = ({
  locale,
  onSetLocale,
  onSelectTrack,
}) => {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div 
      className="min-h-screen bg-[#08090C] text-[#F4F7FA] flex flex-col relative overflow-x-hidden selection:bg-[#42E8FF]/20"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Lighting Gradients */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-1/4 w-[600px] max-w-[100vw] h-[450px] bg-gradient-to-b from-[#42E8FF]/10 via-[#8B5CF6]/5 to-transparent blur-[160px] pointer-events-none -z-10" 
      />
      <div 
        aria-hidden="true" 
        className="fixed top-10 right-1/4 w-[600px] max-w-[100vw] h-[450px] bg-gradient-to-b from-[#F472B6]/10 via-[#EC4899]/5 to-transparent blur-[160px] pointer-events-none -z-10" 
      />

      {/* Top Bar with Brand and Language Switch */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <AuraMaxLogo size={36} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-[#F4F7FA]">AURA MAX</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">
                Aesthetics Engine
              </span>
            </div>
            <p className="text-[11px] text-[#A0AEC0]">
              {isRtl ? "منظومة علوم الجمال والهندسة الحيوية للملامح" : "Facial Geometry & Aesthetic Potential Science"}
            </p>
          </div>
        </div>

        {/* Language Switcher */}
        <button
          onClick={() => onSetLocale(locale === "en" ? "ar" : "en")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111318] border border-[#232734] hover:border-[#42E8FF]/40 text-xs font-semibold text-[#A0AEC0] hover:text-[#F4F7FA] transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-[#42E8FF]" />
          <span>{locale === "en" ? "العربية" : "English"}</span>
        </button>
      </header>

      {/* Hero Welcome */}
      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-16 flex flex-col items-center justify-center text-center">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-white/80 mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#42E8FF] animate-pulse" />
          <span>
            {isRtl 
              ? "مخصص علمياً لاحتياجات كل جنس بدقة متناهية" 
              : "Scientifically Tailored Biometric Aesthetic Architectures"}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight sm:leading-tight mb-4">
          <span className="text-white">
            {isRtl ? "اختر مسار التطوير الجمالي" : "Choose Your Aesthetic"}
          </span>{" "}
          <span className="bg-gradient-to-r from-[#42E8FF] via-[#A78BFA] to-[#F472B6] bg-clip-text text-transparent">
            {isRtl ? "المناسب لك" : "Evolution Pathway"}
          </span>
        </h1>

        <p className="max-w-2xl text-sm sm:text-base text-[#A0AEC0] mb-10 leading-relaxed">
          {isRtl
            ? "يقدم أورا ماكس تجربة مخصصة بالكامل: مسار هندسة الفك والعناية المركزة للرجال، ومسار التناغم الأنثوي والبشرة الزجاجية للنساء، مع نفس الأدوات والتقنيات البيومترية الفائقة."
            : "Aura Max provides fully tailored aesthetic engineering: Chiseled jawline architecture and precision grooming for men, or feminine harmony, glass skin and facial sculpting for women."}
        </p>

        {/* Dual Pathway Interactive Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card A: MALE GROOMING & JAWLINE */}
          <div 
            id="pathway-male-card"
            onClick={() => onSelectTrack("male")}
            className="group relative rounded-3xl bg-[#0D0F14] border border-[#232734] hover:border-[#42E8FF]/60 p-6 sm:p-8 text-start transition-all duration-300 hover:shadow-[0_0_40px_rgba(66,232,255,0.15)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#42E8FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#42E8FF]/10 text-[#42E8FF] border border-[#42E8FF]/20 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#42E8FF]" />
                  <span>{isRtl ? "مسار الرجال" : "Men's Track"}</span>
                </span>
                <span className="text-xs font-semibold text-[#A0AEC0] group-hover:text-[#42E8FF] transition-colors">
                  {isRtl ? "هندسة الفك والحلاقة" : "Grooming & Jawline"}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] mb-2 group-hover:text-[#42E8FF] transition-colors">
                {isRtl ? "العناية بالرجل وهندسة خط الفك" : "Men's Grooming & Jawline Architecture"}
              </h2>
              <p className="text-xs sm:text-sm text-[#A0AEC0] mb-6 leading-relaxed">
                {isRtl 
                  ? "تركيز كامل على حدة زاوية الفك (Gonial Angle)، تسريحات الفيد، تشذيب اللحية، تنحيف الوجه، ووضعية اللسان والرقبة."
                  : "Dedicated focus on mandibular sharpness (120°-125° gonial angle), fade haircuts, designer beard architecture, and orthotropic mewing."}
              </p>

              {/* Highlights List */}
              <div className="space-y-2.5 mb-8">
                {[
                  { 
                    en: "Mandibular Gonial Angle & Ramus Height (468 Biometric Points)", 
                    ar: "قياس دقيق لزاوية الفك وبروز الذقن واستقامة الرقبة" 
                  },
                  { 
                    en: "Precision Beard Trimming & Clipper mm Guides", 
                    ar: "دليل تشذيب وتحديد اللحية حسب مقاييس الشفرة المليمترية" 
                  },
                  { 
                    en: "Fade, Quiff & Pompadour Cut Architecture", 
                    ar: "تسريحات شعر رجالية هندسية متوافقة مع شكل الوجه" 
                  },
                  { 
                    en: "Morning Ice Plunge, Mewing & Retinol Skincare Stacks", 
                    ar: "بروتوكول الصدمة الباردة والميويينغ والعناية الرجالية بالبشرة" 
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E2E8F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#42E8FF] shrink-0 mt-0.5" />
                    <span>{item[locale]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              id="select-male-track-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelectTrack("male");
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#42E8FF] to-[#38BDF8] text-[#08090C] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(66,232,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>{isRtl ? "دخول مسار العناية بالرجل" : "Enter Men's Grooming"}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Card B: FEMALE LOOKSMAXING & HARMONY */}
          <div 
            id="pathway-female-card"
            onClick={() => onSelectTrack("female")}
            className="group relative rounded-3xl bg-[#0D0F14] border border-[#232734] hover:border-[#F472B6]/60 p-6 sm:p-8 text-start transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,114,182,0.18)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#F472B6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F472B6]/10 text-[#F472B6] border border-[#F472B6]/20 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-[#F472B6]" />
                  <span>{isRtl ? "مسار النساء" : "Women's Track"}</span>
                </span>
                <span className="text-xs font-semibold text-[#A0AEC0] group-hover:text-[#F472B6] transition-colors">
                  {isRtl ? "الجمال والتناغم الأنثوي" : "Beauty & Harmony"}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] mb-2 group-hover:text-[#F472B6] transition-colors">
                {isRtl ? "الجمال الأنثوي، البشرة الزجاجية والتناغم" : "Women's Looksmaxing, Beauty & Harmony"}
              </h2>
              <p className="text-xs sm:text-sm text-[#A0AEC0] mb-6 leading-relaxed">
                {isRtl 
                  ? "تركيز على النضارة الزجاجية (Glass Skin)، نحت الوجنتين بالغوا شا، سحبة العينين (Canthal Tilt)، وقصات تأطير الملامح."
                  : "Tailored focus on Korean glass skin radiance, Gua Sha lymphatic sculpting, eye canthal tilt elevation, and face-framing cuts."}
              </p>

              {/* Highlights List */}
              <div className="space-y-2.5 mb-8">
                {[
                  { 
                    en: "Zygomatic Cheek Apex, Eye Canthal Tilt & Facial Thirds", 
                    ar: "قياس بروز عظام الوجنتين وسحبة العينين والنسبة الذهبية للأنوثة" 
                  },
                  { 
                    en: "Tailored Eyebrow Architecture & Spoolie Arch Lift Guides", 
                    ar: "تصميم ورسم الحواجب وسحبة العينين بحسب شكل الوجه" 
                  },
                  { 
                    en: "Face-Framing Butterfly Layers, Bobs & Curtain Bangs", 
                    ar: "قصات شعر أنثوية تأطر الملامح وتمنح انسيابية جذابة" 
                  },
                  { 
                    en: "Gua Sha Lymphatic Drain, Peptide Glaze & Swan Neck Grace", 
                    ar: "تدليك الغوا شا الصباحي، ترميم حاجز البشرة، واستقامة الرقبة الملكية" 
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E2E8F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#F472B6] shrink-0 mt-0.5" />
                    <span>{item[locale]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              id="select-female-track-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelectTrack("female");
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F472B6] to-[#EC4899] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(244,114,182,0.3)] hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>{isRtl ? "دخول مسار الجمال الأنثوي" : "Enter Women's Looksmaxing"}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Matrix Confirmation Banner */}
        <div className="w-full max-w-4xl p-6 rounded-2xl bg-[#111318]/90 border border-[#232734] backdrop-blur-md">
          <div className="text-xs uppercase tracking-wider font-bold text-[#A0AEC0] mb-4 text-center">
            {isRtl 
              ? "نفس الميزات والتقنيات البيومترية المتقدمة متوفرة في كلا المسارين" 
              : "Identical Suite of Advanced Biometric Features Built for Both Tracks"}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-start">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5">
              <Scan className="w-4 h-4 text-[#42E8FF] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[#F4F7FA]">{isRtl ? "فحص بيومتري للوجه" : "468-Mesh Face Scan"}</div>
                <div className="text-[10px] text-[#A0AEC0]">{isRtl ? "كاميرا حية وتحليل ذكي" : "Realtime AI Vision"}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5">
              <Sliders className="w-4 h-4 text-[#A78BFA] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[#F4F7FA]">{isRtl ? "استوديو المقارنة والتحول" : "Before/After Studio"}</div>
                <div className="text-[10px] text-[#A0AEC0]">{isRtl ? "سلايدر تفاعلي 50/50" : "Interactive Split Slider"}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5">
              <Bot className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[#F4F7FA]">{isRtl ? "مدرب أورا الذكي" : "AI Aesthetic Coach"}</div>
                <div className="text-[10px] text-[#A0AEC0]">{isRtl ? "استشارات مخصصة" : "Gemini 3.8 Flash Engine"}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5">
              <Award className="w-4 h-4 text-[#F472B6] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[#F4F7FA]">{isRtl ? "المهام والتحديات" : "Daily Quests & Sprints"}</div>
                <div className="text-[10px] text-[#A0AEC0]">{isRtl ? "روتين علمي ونقاط XP" : "Routines & Progression"}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-[11px] text-[#A0AEC0]">
              {isRtl 
                ? "يمكنك تغيير المسار في أي وقت من شريط التنقل العلوي أو الإعدادات بنقرة واحدة."
                : "You can easily switch between Men's and Women's tracks at any time from the top header or settings."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
