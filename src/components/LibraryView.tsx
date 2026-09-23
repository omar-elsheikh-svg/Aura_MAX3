import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Clock, 
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";
import { Locale, RoutineGuide, GenderTrack } from "../types";
import { translations } from "../i18n/translations";
import { ROUTINE_GUIDES } from "../data/initialData";
import { FEMALE_ROUTINE_GUIDES } from "../data/femaleBeautyData";

interface LibraryViewProps {
  locale: Locale;
  genderTrack?: GenderTrack;
  onAddGuideToQuests?: (guideTitle: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ 
  locale, 
  genderTrack = "male",
  onAddGuideToQuests 
}) => {
  const t = translations[locale];
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const isFemale = genderTrack === "female";

  const [activeCat, setActiveCat] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(isFemale ? "fem-rg-glass" : "rg-debloat");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setExpandedId(isFemale ? "fem-rg-glass" : "rg-debloat");
    setActiveCat("all");
  }, [genderTrack, isFemale]);

  const categories = isFemale ? [
    { id: "all", label: isRtl ? "الكل" : "All" },
    { id: "skin", label: isRtl ? "البشرة الزجاجية" : "Glass Skin & Barrier" },
    { id: "sculpt", label: isRtl ? "نحت الوجه والخدود" : "Facial Sculpt & Gua Sha" },
    { id: "posture", label: isRtl ? "الرقبة الملكية والاستقامة" : "Swan Neck & Poise" },
    { id: "nutrition", label: isRtl ? "التغذية والتوهج الهرموني" : "Hormonal Glow" },
  ] : [
    { id: "all", label: isRtl ? "الكل" : "All" },
    { id: "jawline", label: isRtl ? "الفك والملامح" : "Jawline Architecture" },
    { id: "skin", label: isRtl ? "نقاء البشرة" : "Skin Clarity" },
    { id: "nutrition", label: isRtl ? "طرد السوائل والترطيب" : "Debloating & Hydration" },
    { id: "posture", label: isRtl ? "استقامة القامة" : "Posture & Poise" },
  ];

  const sourceGuides = isFemale ? FEMALE_ROUTINE_GUIDES : ROUTINE_GUIDES;

  const filteredGuides = sourceGuides.filter((g) => {
    const matchesCat = activeCat === "all" || g.category === activeCat;
    const title = g.title[locale].toLowerCase();
    const sub = g.subtitle[locale].toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || title.includes(query) || sub.includes(query);
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div 
      className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#18181b] border border-[#27272a] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#22d3ee] uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isRtl ? "المكتبة العلمية والبروتوكولات" : "Knowledge System"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f4f4f5] font-display">
            {isRtl ? "دليل التحول الشامل" : "Science-Backed Transformation Library"}
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] mt-0.5">
            {isRtl 
              ? "بروتوكولات سريرية مجربة لتحسين هندسة الفك، نضارة البشرة، وتأطير الشعر." 
              : "Actionable editorial protocols covering facial contouring, dermal health, and structural framing."}
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#71717a] absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRtl ? "بحث في البروتوكولات..." : "Search protocols..."}
            className="w-full ps-9 pe-3 py-2 rounded-xl bg-[#111113] border border-[#27272a] text-xs text-[#f4f4f5] focus:outline-none focus:border-[#22d3ee]"
          />
        </div>
      </div>

      {/* 2. Category Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeCat === c.id
                ? "bg-[#18181b] text-[#22d3ee] border border-[#27272a] shadow-xs"
                : "text-[#a1a1aa] hover:text-[#f4f4f5]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 3. Responsive Guides List */}
      <div className="space-y-4">
        {filteredGuides.map((g) => {
          const isExpanded = expandedId === g.id;
          return (
            <div
              key={g.id}
              className="rounded-3xl bg-[#18181b] border border-[#27272a] overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleExpand(g.id)}
                className="w-full p-6 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-[#27272a]/40 transition-colors focus-visible:outline-none"
                aria-expanded={isExpanded}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#111113] text-[#22d3ee] border border-[#27272a] font-bold uppercase">
                      {g.category}
                    </span>
                    <span className="text-xs text-[#71717a] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#22d3ee]" />
                      <span>{g.duration}</span>
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#f4f4f5] font-display">
                    {g.title[locale]}
                  </h3>
                  <p className="text-xs text-[#a1a1aa]">
                    {g.subtitle[locale]}
                  </p>
                </div>

                <div className="shrink-0 p-2 rounded-xl bg-[#111113] text-[#a1a1aa]">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-6 pt-0 space-y-5 border-t border-[#27272a]/50 animate-in fade-in duration-200">
                  {/* Scientific Rationale */}
                  <div className="p-4 rounded-2xl bg-[#111113] border border-[#27272a] space-y-1.5 mt-4">
                    <div className="text-[11px] font-bold text-[#22d3ee] uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{isRtl ? "الأساس العلمي والفسيولوجي" : "Scientific Mechanism"}</span>
                    </div>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed">
                      {g.scienceNote[locale]}
                    </p>
                  </div>

                  {/* Step-by-Step execution */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#f4f4f5]">
                      {isRtl ? "خطوات التطبيق العملي" : "Step-by-Step Execution"}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      {g.steps.map((st, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#111113] border border-[#27272a] space-y-1">
                          <span className="text-xs font-mono font-bold text-[#22d3ee]">
                            Step {idx + 1}
                          </span>
                          <div className="text-xs font-bold text-[#f4f4f5]">{st.title[locale]}</div>
                          <p className="text-[11px] text-[#a1a1aa] leading-relaxed">{st.detail[locale]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Takeaway */}
                  <div className="p-4 rounded-2xl bg-[#18181b] border border-[#22d3ee]/25 flex items-center justify-between gap-4">
                    <div className="text-xs text-[#a1a1aa]">
                      <strong className="text-[#22d3ee]">{isRtl ? "البروتوكول: " : "Protocol: "}</strong>
                      {g.scienceNote[locale]}
                    </div>

                    {onAddGuideToQuests && (
                      <button
                        onClick={() => onAddGuideToQuests(g.title[locale])}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#22d3ee] hover:opacity-95 text-[#09090b] text-xs font-bold shrink-0 cursor-pointer shadow-xs transition-all"
                      >
                        {isRtl ? "إضافة لمهامي اليوم" : "Add to Today"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
