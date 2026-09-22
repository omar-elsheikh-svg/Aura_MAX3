import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Dna,
  Clock,
  ArrowRight
} from "lucide-react";
import { Locale, RoutineGuide, GenderTrack } from "../types";
import { translations } from "../i18n/translations";
import { ROUTINE_GUIDES } from "../data/initialData";
import { FEMALE_ROUTINE_GUIDES } from "../data/femaleBeautyData";

interface LibraryViewProps {
  locale: Locale;
  genderTrack?: GenderTrack;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ locale, genderTrack = "male" }) => {
  const t = translations[locale];
  const isRtl = locale === "ar";
  const isFemale = genderTrack === "female";

  const [activeCat, setActiveCat] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(isFemale ? "fem-rg-glass" : "rg-debloat");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setExpandedId(isFemale ? "fem-rg-glass" : "rg-debloat");
    setActiveCat("all");
  }, [genderTrack, isFemale]);

  const categories = isFemale ? [
    { id: "all", label: t.library.categoryAll },
    { id: "skin", label: isRtl ? "البشرة الزجاجية" : "Glass Skin & Barrier" },
    { id: "sculpt", label: isRtl ? "نحت الوجه والخدود" : "Facial Sculpt & Gua Sha" },
    { id: "posture", label: isRtl ? "الرقبة الملكية والاستقامة" : "Swan Neck & Poise" },
    { id: "nutrition", label: isRtl ? "التغذية والتوهج الهرموني" : "Hormonal Glow" },
  ] : [
    { id: "all", label: t.library.categoryAll },
    { id: "jawline", label: t.library.categoryJawline },
    { id: "skin", label: t.library.categorySkin },
    { id: "nutrition", label: t.library.categoryNutrition },
    { id: "posture", label: t.library.categoryPosture },
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
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Header & Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#42E8FF]/10 border border-[#42E8FF]/30 text-[#42E8FF] text-xs font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(66,232,255,0.15)]">
          <BookOpen className="w-3.5 h-3.5 text-[#42E8FF]" />
          <span>{t.library.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F4F7FA] tracking-tight font-display">
          {t.library.title}
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          {t.library.subtitle}
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCat === c.id
                  ? "bg-gradient-to-r from-[#42E8FF] to-[#38bdf8] text-[#08090C] shadow-md shadow-[#42E8FF]/20"
                  : "bg-[#111318] text-slate-400 hover:text-slate-200 border border-[#1E232E]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative max-w-md mx-auto">
          <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isRtl ? "right-3" : "left-3"}`} />
          <input
            type="text"
            placeholder={isRtl ? "ابحث في البروتوكولات والنصائح..." : "Search protocols, mewing, debloat..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-[#111318] border border-[#1E232E] rounded-2xl py-2.5 text-xs text-[#F4F7FA] placeholder-slate-500 focus:outline-none focus:border-[#42E8FF] ${
              isRtl ? "pr-9 pl-4" : "pl-9 pr-4"
            }`}
          />
        </div>
      </div>

      {/* Guides List */}
      <div className="space-y-4">
        {filteredGuides.map((guide) => {
          const isExpanded = expandedId === guide.id;
          return (
            <div
              key={guide.id}
              className={`bg-[#111318] rounded-3xl border transition-all duration-200 overflow-hidden ${
                isExpanded ? "border-[#42E8FF]/40 shadow-xl shadow-[#42E8FF]/5" : "border-[#1E232E] hover:border-slate-600"
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => toggleExpand(guide.id)}
                className="p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#08090C] border border-[#1E232E] text-[10px] font-bold uppercase text-[#8B5CF6] font-mono">
                      {guide.category}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#42E8FF]" />
                      <span>{guide.duration}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-[#F4F7FA] font-display">
                    {guide.title[locale]}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                    {guide.subtitle[locale]}
                  </p>
                </div>

                <button className="p-2 rounded-xl bg-[#08090C] border border-[#1E232E] text-slate-400 hover:text-[#42E8FF] mt-1 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-1 border-t border-[#1E232E] space-y-6">
                  {/* Physiological Science Mechanism */}
                  <div className="bg-[#08090C] rounded-2xl p-4 border border-[#42E8FF]/20 shadow-sm shadow-[#42E8FF]/5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#42E8FF] uppercase tracking-wider mb-1.5 font-mono">
                      <Dna className="w-4 h-4 text-[#42E8FF]" />
                      <span>{t.library.scienceBasis}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {guide.scienceNote[locale]}
                    </p>
                  </div>

                  {/* Execution Steps */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      {t.library.executionSteps}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {guide.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="bg-[#08090C] rounded-2xl p-4 border border-[#1E232E] space-y-1"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#42E8FF]/15 border border-[#42E8FF]/30 text-[#42E8FF] text-[10px] font-black flex items-center justify-center font-mono shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-[#F4F7FA]">
                              {step.title[locale]}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed pl-7 rtl:pr-7 rtl:pl-0">
                            {step.detail[locale]}
                          </p>
                        </div>
                      ))}
                    </div>
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
