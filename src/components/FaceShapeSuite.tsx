import React, { useState } from "react";
import { 
  Sparkles, 
  Scissors, 
  User, 
  Flame, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Check, 
  Wand2, 
  Layers, 
  ChevronRight, 
  ShieldCheck, 
  Sliders, 
  ExternalLink,
  Info,
  Maximize2
} from "lucide-react";
import { 
  Locale, 
  ScanResult, 
  FaceShapeType, 
  HairstyleRecommendation, 
  BeardRecommendation, 
  EyebrowRecommendation,
  GlowUpImmediateTip,
  GenderTrack
} from "../types";
import { FACE_SHAPE_PRESETS } from "../data/faceShapeData";
import { FEMALE_EYEBROW_PRESETS } from "../data/femaleBeautyData";
import { translations } from "../i18n/translations";

interface FaceShapeSuiteProps {
  locale: Locale;
  scanResult: ScanResult;
  genderTrack?: GenderTrack;
  onOpenVisualizer: (opts?: { gender?: "male" | "female"; hairstyleId?: string; beardId?: string }) => void;
  onOverrideFaceShape?: (shape: FaceShapeType) => void;
}

export const FaceShapeSuite: React.FC<FaceShapeSuiteProps> = ({
  locale,
  scanResult,
  genderTrack,
  onOpenVisualizer,
  onOverrideFaceShape,
}) => {
  const isRtl = locale === "ar";
  const t = translations[locale];

  // Current Face Shape (from scan or fallback)
  const detectedShape: FaceShapeType = scanResult.faceShape?.shape || "oval";
  const [selectedShape, setSelectedShape] = useState<FaceShapeType>(detectedShape);

  // Active Gender Tab
  const [activeGender, setActiveGender] = useState<"male" | "female">(
    genderTrack || scanResult.detectedGender || "male"
  );

  React.useEffect(() => {
    if (genderTrack) {
      setActiveGender(genderTrack);
    }
  }, [genderTrack]);

  // Immediate Glow-Up Active Filter
  const [activeTipCategory, setActiveTipCategory] = useState<string>("all");
  const [completedTips, setCompletedTips] = useState<Record<string, boolean>>({});

  // Active preset based on selected shape
  const currentPreset = FACE_SHAPE_PRESETS[selectedShape] || FACE_SHAPE_PRESETS.oval;
  const analysis = scanResult.faceShape?.shape === selectedShape && scanResult.faceShape 
    ? scanResult.faceShape 
    : currentPreset.analysis;

  const maleHairstyles = (scanResult.faceShape?.shape === selectedShape && scanResult.maleHairstyles?.length)
    ? scanResult.maleHairstyles
    : currentPreset.maleHairstyles;

  const femaleHairstyles = (scanResult.faceShape?.shape === selectedShape && scanResult.femaleHairstyles?.length)
    ? scanResult.femaleHairstyles
    : currentPreset.femaleHairstyles;

  const beardStyles = (scanResult.faceShape?.shape === selectedShape && scanResult.beardStyles?.length)
    ? scanResult.beardStyles
    : currentPreset.beardStyles;

  const eyebrowStyles: EyebrowRecommendation[] = (scanResult.faceShape?.shape === selectedShape && scanResult.eyebrowStyles?.length)
    ? scanResult.eyebrowStyles
    : (FEMALE_EYEBROW_PRESETS[selectedShape] || FEMALE_EYEBROW_PRESETS.oval);

  const stylesToAvoid = (scanResult.faceShape?.shape === selectedShape && scanResult.stylesToAvoid)
    ? scanResult.stylesToAvoid
    : currentPreset.stylesToAvoid;

  const glowUpTips = (scanResult.faceShape?.shape === selectedShape && scanResult.immediateGlowUpTips?.length)
    ? scanResult.immediateGlowUpTips
    : currentPreset.immediateGlowUpTips;

  const allShapes: FaceShapeType[] = ["oval", "square", "round", "heart", "diamond", "oblong"];

  const handleShapeChange = (shape: FaceShapeType) => {
    setSelectedShape(shape);
    if (onOverrideFaceShape) {
      onOverrideFaceShape(shape);
    }
  };

  const toggleTip = (id: string) => {
    setCompletedTips(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredTips = activeTipCategory === "all" 
    ? glowUpTips 
    : glowUpTips.filter(tip => tip.category === activeTipCategory);

  return (
    <div className="space-y-6">
      
      {/* 1. HERO FACE SHAPE DIAGNOSIS CARD */}
      <div className="bg-[#18181b] rounded-3xl p-6 border border-[#27272a] shadow-xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#22d3ee]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#27272a]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#22d3ee]/20 text-[#22d3ee] border border-[#22d3ee]/40">
                {isRtl ? "تشخيص شكل الوجه بالذكاء الاصطناعي" : "AI Face Shape Diagnosis"}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                {analysis.confidence || 94}% {isRtl ? "دقة التطابق" : "Confidence"}
              </span>
            </div>

            <h3 className="text-2xl font-black text-[#f4f4f5] font-display flex items-center gap-2">
              <span>{analysis.name[locale]}</span>
            </h3>

            <p className="text-xs text-[#a1a1aa] mt-1 max-w-xl leading-relaxed">
              {analysis.description[locale]}
            </p>
          </div>

          {/* Makeover Visualizer Primary Trigger Button */}
          <button
            onClick={() => onOpenVisualizer({ gender: activeGender })}
            className="shrink-0 min-h-[48px] py-3 px-5 rounded-2xl bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#22d3ee] hover:opacity-95 text-[#09090b] font-extrabold text-xs shadow-xl shadow-[#22d3ee]/20 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Wand2 className="w-4 h-4" />
            <span>{isRtl ? "معاينة المظهر بالتحول الكامل" : "Visualize Full Makeover"}</span>
          </button>
        </div>

        {/* Shape Switcher Selector */}
        <div className="pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">
              {isRtl ? "استكشاف أشكال الوجوه الأخرى" : "Explore Other Face Shapes"}
            </span>
            <span className="text-[11px] font-mono text-[#22d3ee]">
              {selectedShape.toUpperCase()} ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {allShapes.map((shapeKey) => {
              const p = FACE_SHAPE_PRESETS[shapeKey];
              const isSelected = selectedShape === shapeKey;
              return (
                <button
                  key={shapeKey}
                  onClick={() => handleShapeChange(shapeKey)}
                  className={`min-h-[48px] py-2 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#22d3ee]/20 border-[#22d3ee] text-[#22d3ee] shadow-md shadow-[#22d3ee]/20"
                      : "bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#f4f4f5] hover:border-[#3f3f46]"
                  }`}
                >
                  <div className="text-[11px] font-extrabold capitalize">{shapeKey}</div>
                  <div className="text-[9px] text-[#71717a] truncate">{p.analysis.name[locale]}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Proportions Breakdown & Key Principle Grid */}
        <div className="mt-4 pt-4 border-t border-[#27272a] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* Proportions */}
          <div className="bg-[#111113] p-4 rounded-2xl border border-[#27272a]">
            <div className="font-bold text-[#22d3ee] mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>{isRtl ? "النسب الهندسية للهيكل العظمي" : "Geometric Facial Proportions"}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] border-b border-[#27272a] pb-1.5">
                <span className="text-[#a1a1aa]">{isRtl ? "نسبة الطول للعرض" : "Length-to-Width Ratio"}</span>
                <span className="font-mono font-bold text-[#f4f4f5]">{analysis.proportions.lengthToWidthRatio}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] border-b border-[#27272a] pb-1.5">
                <span className="text-[#a1a1aa]">{isRtl ? "عرض الجبهة" : "Forehead Breadth"}</span>
                <span className="text-[#f4f4f5] text-end">{analysis.proportions.foreheadWidth[locale]}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] border-b border-[#27272a] pb-1.5">
                <span className="text-[#a1a1aa]">{isRtl ? "بروز عظام الخد" : "Cheekbone Prominence"}</span>
                <span className="text-[#f4f4f5] text-end">{analysis.proportions.cheekboneWidth[locale]}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#a1a1aa]">{isRtl ? "شكل خط الفك" : "Mandibular Contour"}</span>
                <span className="text-[#f4f4f5] text-end">{analysis.proportions.jawlineWidth[locale]}</span>
              </div>
            </div>
          </div>

          {/* Key Principle */}
          <div className="bg-[#111113] p-4 rounded-2xl border border-[#6366f1]/30 flex flex-col justify-between">
            <div>
              <div className="font-bold text-[#818cf8] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isRtl ? "القاعدة الذهبية لتوازن الملامح" : "Golden Balancing Principle"}</span>
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                {analysis.keyBalancingPrinciple[locale]}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-[11px] text-[#71717a]">
              <span>{isRtl ? "التناسق الجمالي" : "Aesthetic Harmony"}</span>
              <span className="text-emerald-400 font-bold">100% {isRtl ? "طبيعي وغير جراحي" : "Non-Invasive"}</span>
            </div>
          </div>

        </div>

      </div>

      {/* 2. GENDER TABS FOR HAIRSTYLES & BEARD RECOMMENDATIONS */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-extrabold text-[#f4f4f5] font-display flex items-center gap-2">
              <Scissors className="w-5 h-5 text-[#22d3ee]" />
              <span>{isRtl ? "التسريحات المثالية لقصة وجهك" : "Optimal Hairstyles for Your Face Shape"}</span>
            </h3>
            <p className="text-xs text-[#a1a1aa]">
              {isRtl 
                ? "قصات مصممة هندسياً لإبراز مميزات وجهك ومعالجة أبعاد الجبهة والفك" 
                : "Engineered haircuts to balance your forehead, cheekbones, and mandibular angle"}
            </p>
          </div>

          {/* Gender Switch Buttons */}
          <div className="flex items-center bg-[#111113] p-1 rounded-2xl border border-[#27272a] shrink-0">
            <button
              onClick={() => setActiveGender("male")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeGender === "male"
                  ? "bg-[#22d3ee] text-black shadow-md shadow-[#22d3ee]/20"
                  : "text-[#71717a] hover:text-[#f4f4f5]"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{isRtl ? "قصات رجالية ولحى" : "Men's Cuts & Beard"}</span>
            </button>

            <button
              onClick={() => setActiveGender("female")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeGender === "female"
                  ? "bg-[#ec4899] text-black shadow-md shadow-[#ec4899]/20"
                  : "text-[#71717a] hover:text-[#f4f4f5]"
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>{isRtl ? "تسريحات نسائية" : "Women's Hairstyles"}</span>
            </button>
          </div>
        </div>

        {/* Hairstyle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(activeGender === "male" ? maleHairstyles : femaleHairstyles).map((cut, idx) => (
            <div
              key={cut.id || idx}
              className="bg-[#18181b] rounded-2xl p-5 border border-[#27272a] hover:border-[#22d3ee]/40 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#6366f1]/20 text-[#818cf8] border border-[#6366f1]/30">
                    {cut.tag[locale]}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[#71717a] bg-[#111113] px-2 py-0.5 rounded border border-[#27272a]">
                    {cut.length}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-[#f4f4f5] font-display group-hover:text-[#22d3ee] transition-colors mb-2">
                  {cut.name[locale]}
                </h4>

                {/* Why It Works */}
                <div className="space-y-2 text-xs text-[#a1a1aa] mb-4">
                  <div className="bg-[#111113] p-3 rounded-xl border border-[#27272a]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#22d3ee] block mb-1">
                      {isRtl ? "لماذا تناسب شكل وجهك؟" : "Why it works for you:"}
                    </span>
                    <p className="text-[11px] leading-relaxed text-[#a1a1aa]">
                      {cut.whyItWorks[locale]}
                    </p>
                  </div>

                  {/* Styling tip */}
                  <div className="p-2.5 rounded-xl bg-[#111113] border border-[#27272a]">
                    <span className="text-[10px] font-bold text-[#71717a] block mb-0.5">
                      💡 {isRtl ? "نصيحة التصفيف" : "Styling Tip"}:
                    </span>
                    <p className="text-[11px] text-[#a1a1aa] leading-snug">
                      {cut.stylingTip[locale]}
                    </p>
                  </div>

                  {/* Product */}
                  <div className="text-[10px] text-[#71717a] flex items-center gap-1.5 pt-1">
                    <span className="text-[#818cf8] font-bold">✨ {isRtl ? "المنتج المقترح:" : "Product:"}</span>
                    <span className="text-[#f4f4f5]">{cut.productRecommendation[locale]}</span>
                  </div>
                </div>
              </div>

              {/* Try in Visualizer CTA */}
              <button
                onClick={() => onOpenVisualizer({ gender: activeGender, hairstyleId: cut.id })}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-[#111113] hover:bg-[#22d3ee]/20 text-[#22d3ee] hover:text-[#f4f4f5] border border-[#22d3ee]/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{isRtl ? "معاينة التسريحة عليّ" : "Simulate on My Face"}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BEARD RECOMMENDATIONS (For Men) / EYEBROW & HARMONY (For Women) */}
      {activeGender === "male" ? (
        <div className="bg-[#18181b] rounded-3xl p-6 border border-[#27272a] shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-[#818cf8] bg-[#6366f1]/15 border border-[#6366f1]/30">
                  {isRtl ? "تصميم ونحت اللحية" : "Beard Architecture"}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-[#f4f4f5] font-display mt-1 flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#fb923c]" />
                <span>{isRtl ? "تنسيقات اللحية المناسبة لخط الفك والذقن" : "Optimal Beard Styles for Your Jawline"}</span>
              </h3>
              <p className="text-xs text-[#a1a1aa]">
                {isRtl 
                  ? "اللحية هي المكياج الطبيعي للرجل لتصحيح عيوب الزوايا أو إبراز عظام الفك" 
                  : "Aesthetic beard geometry acts as facial contouring to sharpen your mandible"}
              </p>
            </div>

            <button
              onClick={() => onOpenVisualizer({ gender: "male" })}
              className="shrink-0 py-2 px-4 rounded-xl bg-[#6366f1]/20 hover:bg-[#6366f1]/30 text-[#818cf8] border border-[#6366f1]/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>{isRtl ? "معاينة اللحية في الاستوديو" : "Test Beard in Studio"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {beardStyles.map((beard, idx) => (
              <div
                key={beard.id || idx}
                className="bg-[#111113] rounded-2xl p-4 border border-[#27272a] hover:border-[#6366f1]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#818cf8] bg-[#6366f1]/10 border border-[#6366f1]/20">
                      {beard.tag[locale]}
                    </span>
                    <span className="text-[10px] font-mono text-[#71717a] uppercase">
                      {beard.lengthCategory}
                    </span>
                  </div>

                  <h4 className="text-xs font-extrabold text-[#f4f4f5] font-display mb-1.5">
                    {beard.name[locale]}
                  </h4>

                  <p className="text-[11px] text-[#a1a1aa] leading-relaxed mb-3">
                    {beard.whyItWorks[locale]}
                  </p>

                  <div className="space-y-2 text-[11px] bg-[#09090b] p-3 rounded-xl border border-[#27272a]">
                    <div>
                      <span className="text-[#22d3ee] font-bold block text-[10px] uppercase">
                        📏 {isRtl ? "دليل التشذيب" : "Trimming Guide"}:
                      </span>
                      <span className="text-[#a1a1aa] leading-snug">{beard.trimmingGuide[locale]}</span>
                    </div>

                    <div>
                      <span className="text-[#818cf8] font-bold block text-[10px] uppercase">
                        📐 {isRtl ? "خط الرقبة (Neckline)" : "Neckline Placement"}:
                      </span>
                      <span className="text-[#a1a1aa] leading-snug">{beard.necklineTip[locale]}</span>
                    </div>

                    {beard.avoidTip && (
                      <div className="text-rose-400 text-[10px]">
                        ⚠️ <strong>{isRtl ? "احذر:" : "Avoid:"}</strong> {beard.avoidTip[locale]}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onOpenVisualizer({ gender: "male", beardId: beard.id })}
                  className="w-full mt-3 py-1.5 rounded-lg bg-[#18181b] hover:bg-[#6366f1]/20 text-[#818cf8] text-[11px] font-bold transition-colors"
                >
                  {isRtl ? "تجربة هذه اللحية" : "Try This Beard"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-[#18181b] rounded-3xl p-6 border border-[#27272a] shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-[#ec4899] bg-[#ec4899]/15 border border-[#ec4899]/30">
                  {isRtl ? "هندسة الحواجب وتأطير العيون" : "Eyebrow & Canthal Tilt Architecture"}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-[#f4f4f5] font-display mt-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ec4899]" />
                <span>{isRtl ? "رسمة وتصميم الحواجب المثالية لقصة وجهك" : "Ideal Eyebrow Framing for Facial Harmony"}</span>
              </h3>
              <p className="text-xs text-[#a1a1aa]">
                {isRtl 
                  ? "الحواجب هي الإطار الحقيقي للوجه: قوس دقيق يرفع زاوية العين (Canthal Tilt) ويوازن أبعاد الجبهة" 
                  : "Eyebrows frame facial proportions: calibrated arches lift eye canthal tilt and balance midface symmetry"}
              </p>
            </div>

            <button
              onClick={() => onOpenVisualizer({ gender: "female" })}
              className="shrink-0 py-2 px-4 rounded-xl bg-[#ec4899]/20 hover:bg-[#ec4899]/30 text-[#ec4899] border border-[#ec4899]/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>{isRtl ? "معاينة اللوك في الاستوديو" : "Test Look in Studio"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eyebrowStyles.map((brow, idx) => (
              <div
                key={brow.id || idx}
                className="bg-[#111113] rounded-2xl p-5 border border-[#27272a] hover:border-[#ec4899]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#ec4899] bg-[#ec4899]/10 border border-[#ec4899]/20">
                      {brow.tag[locale]}
                    </span>
                    <span className="text-[10px] font-mono text-[#71717a] uppercase">
                      {brow.styleCategory}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-[#f4f4f5] font-display mb-1.5">
                    {brow.name[locale]}
                  </h4>

                  <p className="text-[11px] text-[#a1a1aa] leading-relaxed mb-3">
                    {brow.whyItWorks[locale]}
                  </p>

                  <div className="space-y-2.5 text-[11px] bg-[#09090b] p-3 rounded-xl border border-[#27272a]">
                    <div>
                      <span className="text-[#ec4899] font-bold block text-[10px] uppercase">
                        ✍️ {isRtl ? "دليل الرسم والتشكيل" : "Shaping & Precision Guide"}:
                      </span>
                      <span className="text-[#a1a1aa] leading-snug">{brow.shapingGuide[locale]}</span>
                    </div>

                    <div>
                      <span className="text-[#818cf8] font-bold block text-[10px] uppercase">
                        👁️ {isRtl ? "سحبة العينين (Canthal Tilt)" : "Optical Canthal Tilt Lift"}:
                      </span>
                      <span className="text-[#a1a1aa] leading-snug">{brow.canthalTiltTip[locale]}</span>
                    </div>

                    {brow.avoidTip && (
                      <div className="text-rose-400 text-[10px]">
                        ⚠️ <strong>{isRtl ? "تجنبي:" : "Avoid:"}</strong> {brow.avoidTip[locale]}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onOpenVisualizer({ gender: "female" })}
                  className="w-full mt-3 py-2 rounded-lg bg-[#18181b] hover:bg-[#ec4899]/20 text-[#ec4899] text-xs font-bold transition-colors"
                >
                  {isRtl ? "معاينة هذا الحاجب عليّ" : "Simulate Eyebrows on Me"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. STYLES TO AVOID (PREVENTION OF AESTHETIC DISTORTION) */}
      <div className="bg-[#18181b] border border-rose-500/30 rounded-3xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <h4 className="text-sm font-extrabold text-rose-300 font-display">
            {isRtl ? "تسريحات وتفاصيل يجب تجنبها لشكل وجهك" : "Styles to Strictly Avoid (Geometric Conflicts)"}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {activeGender === "male" ? (
            <>
              {/* Men Avoid Hair */}
              <div className="bg-[#111113] p-3.5 rounded-xl border border-rose-500/20">
                <span className="font-bold text-rose-400 block mb-1 text-[11px] uppercase">
                  {isRtl ? "للرجال (شعر)" : "Men's Hair Conflicts"}:
                </span>
                <ul className="space-y-1.5 text-[#a1a1aa] text-[11px]">
                  {stylesToAvoid.menHairstyles.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{item[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Beard Avoid */}
              <div className="bg-[#111113] p-3.5 rounded-xl border border-rose-500/20">
                <span className="font-bold text-rose-400 block mb-1 text-[11px] uppercase">
                  {isRtl ? "اللحى الخاطئة" : "Beard Shaping Conflicts"}:
                </span>
                <ul className="space-y-1.5 text-[#a1a1aa] text-[11px]">
                  {stylesToAvoid.beards.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{item[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* General Tip */}
              <div className="bg-[#111113] p-3.5 rounded-xl border border-rose-500/20 flex flex-col justify-center">
                <span className="font-bold text-rose-400 block mb-1 text-[11px] uppercase">
                  {isRtl ? "قاعدة الفك والرقبة" : "Mandibular Principle"}:
                </span>
                <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                  {isRtl 
                    ? "تجنب أي قصة تنتهي عند أعرض نقطة في فكك دون تدرج لوني لأنها تطمس خط الفك الحاد." 
                    : "Never end your hair bulk directly at your widest jawline axis without a fade gradient."}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Women Avoid Hair */}
              <div className="bg-[#111113] p-3.5 rounded-xl border border-rose-500/20">
                <span className="font-bold text-rose-400 block mb-1 text-[11px] uppercase">
                  {isRtl ? "للنساء (شعر وقصات)" : "Women's Hair Conflicts"}:
                </span>
                <ul className="space-y-1.5 text-[#a1a1aa] text-[11px]">
                  {stylesToAvoid.womenHairstyles.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{item[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eyebrows Avoid */}
              <div className="bg-[#111113] p-3.5 rounded-xl border border-rose-500/20">
                <span className="font-bold text-rose-400 block mb-1 text-[11px] uppercase">
                  {isRtl ? "رسمات الحواجب الخاطئة" : "Eyebrow Shaping Conflicts"}:
                </span>
                <ul className="space-y-1.5 text-[#a1a1aa] text-[11px]">
                  {(stylesToAvoid.eyebrows && stylesToAvoid.eyebrows.length > 0
                    ? stylesToAvoid.eyebrows
                    : [
                        { en: "High exaggerated sharp arches that stretch vertical proportions.", ar: "الأقواس الحادة المبالغ فيها التي تزيد من طول الوجه." },
                        { en: "Overly plucked pencil-thin brows that age orbital frame.", ar: "الحواجب الرفيعة جداً التي تُظهر محيط العينين أكبر سناً." }
                      ]
                  ).map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{item[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feminine Harmony Tip */}
              <div className="bg-[#111113] p-3.5 rounded-xl border border-rose-500/20 flex flex-col justify-center">
                <span className="font-bold text-rose-400 block mb-1 text-[11px] uppercase">
                  {isRtl ? "قاعدة التناغم الأنثوي" : "Harmony Principle"}:
                </span>
                <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                  {isRtl 
                    ? "تجنبي الحواجب التي ينزل طرفها الخارجي دون مستوى بدايتها، لأن ذلك يقلب ميلان العينين إلى سلبي ويعطي مظهراً متعباً." 
                    : "Never allow brow tails to drop lower than the brow heads, which induces a tired negative canthal tilt look."}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 5. IMMEDIATE GLOW-UP TIPS (1-3 MIN PROTOCOLS) */}
      <div className="bg-[#18181b] rounded-3xl p-6 border border-[#27272a] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-[#22d3ee] bg-[#22d3ee]/15 border border-[#22d3ee]/30">
                1-3 MIN PROTOCOLS
              </span>
              <span className="text-xs text-[#71717a] font-mono">
                {Object.values(completedTips).filter(Boolean).length}/{glowUpTips.length} {isRtl ? "تم إنجازها" : "done"}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-[#f4f4f5] font-display mt-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#22d3ee]" />
              <span>{isRtl ? "خطوات التحول الجمالي الفوري (Immediate Glow-Up)" : "Immediate Glow-Up Action Tips"}</span>
            </h3>
            <p className="text-xs text-[#a1a1aa]">
              {isRtl 
                ? "إجراءات سريعة تحدث تأثيراً بصرياً واضحاً في دقائق دون أي مواد ضارة أو تدخل جراحي" 
                : "Actionable micro-routines that produce immediate optical refinement within 3 minutes"}
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {[
              { id: "all", label: isRtl ? "الكل" : "All" },
              { id: "debloat", label: isRtl ? "إزالة الانتفاخ" : "Debloat" },
              { id: "brows", label: isRtl ? "الحواجب" : "Brows" },
              { id: "posture", label: isRtl ? "الميونج والرقبة" : "Posture/Mewing" },
              { id: "skin", label: isRtl ? "البشرة الزجاجية" : "Glass Skin" },
              { id: "hair", label: isRtl ? "رفع الشعر" : "Hair Lift" },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTipCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                  activeTipCategory === cat.id
                    ? "bg-[#22d3ee] text-black shadow-md shadow-[#22d3ee]/20"
                    : "bg-[#111113] text-[#71717a] hover:text-[#f4f4f5] border border-[#27272a]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tips List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTips.map((tip) => {
            const isDone = !!completedTips[tip.id];
            return (
              <div
                key={tip.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDone
                    ? "bg-emerald-950/20 border-emerald-500/40"
                    : "bg-[#111113] border-[#27272a] hover:border-[#22d3ee]/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#22d3ee] bg-[#22d3ee]/10 px-2 py-0.5 rounded-full border border-[#22d3ee]/20">
                      <Clock className="w-3 h-3" />
                      <span>{tip.timeMinutes} {isRtl ? "دقائق" : "mins"}</span>
                    </span>

                    <button
                      onClick={() => toggleTip(tip.id)}
                      className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                        isDone
                          ? "bg-emerald-500 text-black border-emerald-400"
                          : "bg-[#18181b] text-[#71717a] border-[#27272a] hover:text-[#f4f4f5]"
                      }`}
                    >
                      {isDone ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>{isRtl ? "تم التطبيق" : "Completed"}</span>
                        </>
                      ) : (
                        <span>{isRtl ? "تطبيق الآن" : "Mark as Done"}</span>
                      )}
                    </button>
                  </div>

                  <h4 className="text-xs font-bold text-[#f4f4f5] font-display mb-1.5">
                    {tip.title[locale]}
                  </h4>

                  <p className="text-[11px] text-[#a1a1aa] leading-relaxed mb-3">
                    {tip.instructions[locale]}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#27272a] text-[10px] flex flex-col gap-1">
                  <div className="text-emerald-400 font-semibold flex items-start gap-1">
                    <span>⚡</span>
                    <span><strong>{isRtl ? "الفائدة الفورية:" : "Instant Effect:"}</strong> {tip.instantBenefit[locale]}</span>
                  </div>
                  {tip.scienceNote && (
                    <div className="text-[#71717a] italic">
                      🔬 {tip.scienceNote[locale]}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
