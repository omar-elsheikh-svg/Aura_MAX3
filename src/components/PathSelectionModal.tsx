import React from "react";
import { Locale, GenderTrack } from "../types";
import { AuraMaxEmblem } from "./AuraMaxLogo";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Flame, 
  Crown, 
  Check, 
  ShieldCheck 
} from "lucide-react";

interface PathSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  onSelectTrack: (track: GenderTrack) => void;
}

export const PathSelectionModal: React.FC<PathSelectionModalProps> = ({
  isOpen,
  onClose,
  locale,
  onSelectTrack,
}) => {
  if (!isOpen) return null;

  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div 
        role="dialog"
        aria-modal="true"
        className="w-full max-w-2xl bg-[#08090C] border border-[#252A33] rounded-3xl p-6 sm:p-8 relative shadow-2xl flex flex-col text-start"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 end-5 p-2 rounded-xl bg-[#111318] border border-[#252A33] text-[#A5AEBC] hover:text-[#F4F7FA] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111318] border border-[#252A33] text-xs font-semibold text-[#42E8FF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRtl ? "تخصيص المسار" : "Choose Your Path"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] font-display mb-2">
            {isRtl ? "اختر مسار تطويرك" : "Select Your Track"}
          </h2>
          <p className="text-xs sm:text-sm text-[#A5AEBC]">
            {isRtl 
              ? "يحدد هذا الخيار خوارزميات التوصيات ونوعية التمارين المناسبة لملامحك." 
              : "This personalizes your facial analysis, haircuts, skincare protocols, and daily quests."}
          </p>
        </div>

        {/* Dual Track Cards - Unified Obsidian Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Track 1: Aura Max (Men) */}
          <div
            onClick={() => onSelectTrack("male")}
            className="group p-6 rounded-2xl bg-[#111318] hover:bg-[#171A21] border border-[#252A33] hover:border-[#42E8FF]/60 cursor-pointer transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#42E8FF]">
                  <Flame className="w-4 h-4 text-[#42E8FF]" />
                  <span>Aura Max</span>
                </span>
                <span className="text-[10px] text-[#A5AEBC]">
                  {isRtl ? "مسار الرجال" : "Men's Track"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#F4F7FA] mb-2 group-hover:text-[#42E8FF] transition-colors">
                {isRtl ? "العناية بالرجل وهندسة الفك" : "Mandibular Architecture & Grooming"}
              </h3>
              <p className="text-xs text-[#A5AEBC] leading-relaxed mb-4">
                {isRtl 
                  ? "تركيز على زاوية الفك وتحديد الذقن، تشذيب شعر الوجه، قصات الشعر المناسبة، واستقامة الرقبة."
                  : "Sharpened jawline angles, neckline trimming guides, fade haircuts, and postural alignment."}
              </p>
              <div className="space-y-2 text-xs text-[#A5AEBC]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#42E8FF]" />
                  <span>{isRtl ? "تحليل شكل الوجه وزاوية الفك" : "Face shape & jawline architecture"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#42E8FF]" />
                  <span>{isRtl ? "قصات شعر وتشذيب لحية مخصص" : "Tailored haircuts & beard styling"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#252A33] flex items-center justify-between text-xs font-bold text-[#42E8FF] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
              <span>{isRtl ? "اختيار مسار الرجال" : "Select Men's Track"}</span>
              <ArrowIcon className="w-4 h-4" />
            </div>
          </div>

          {/* Track 2: Aura Fem (Women) */}
          <div
            onClick={() => onSelectTrack("female")}
            className="group p-6 rounded-2xl bg-[#111318] hover:bg-[#171A21] border border-[#252A33] hover:border-[#8B5CF6]/60 cursor-pointer transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#8B5CF6]">
                  <Crown className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Aura Fem</span>
                </span>
                <span className="text-[10px] text-[#A5AEBC]">
                  {isRtl ? "مسار النساء" : "Women's Track"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#F4F7FA] mb-2 group-hover:text-[#8B5CF6] transition-colors">
                {isRtl ? "نضارة البشرة والتناسق الملامحي" : "Glass Skin & Aesthetic Harmony"}
              </h3>
              <p className="text-xs text-[#A5AEBC] leading-relaxed mb-4">
                {isRtl 
                  ? "تركيز على نقاء البشرة الزجاجية، تدليك نحت الخدود (Gua Sha)، سحبة العينين والحواجب، والرقبة الملكية."
                  : "Glass skin barrier protocols, cheekbone sculpting, brow framing, and swan neck posture."}
              </p>
              <div className="space-y-2 text-xs text-[#A5AEBC]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>{isRtl ? "بروتوكولات نضارة وترميم الحاجز" : "Ceramide barrier & glass skin"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>{isRtl ? "نحت ملامح طبيعي وتمارين استقامة" : "Lymphatic contouring & swan neck"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#252A33] flex items-center justify-between text-xs font-bold text-[#8B5CF6] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
              <span>{isRtl ? "اختيار مسار النساء" : "Select Women's Track"}</span>
              <ArrowIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Quiet Privacy Note */}
        <div className="p-3.5 rounded-xl bg-[#111318] border border-[#252A33] flex items-center gap-2 text-xs text-[#6B7484]">
          <ShieldCheck className="w-4 h-4 text-[#42E8FF] shrink-0" />
          <span>
            {isRtl 
              ? "يمكنك تغيير مسارك أو إعادة ضبط تفضيلاتك في أي وقت بسهولة من شريط التطبيق العلوي." 
              : "You can switch tracks or adjust your preferences at any time in the app header."}
          </span>
        </div>
      </div>
    </div>
  );
};
