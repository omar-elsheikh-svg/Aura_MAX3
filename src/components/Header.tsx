import React from "react";
import { Sparkles, Flame, Globe, Camera, Settings, Crown } from "lucide-react";
import { Locale, NavTab, GenderTrack } from "../types";
import { translations } from "../i18n/translations";
import { AuraMaxEmblem } from "./AuraMaxLogo";

interface HeaderProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  genderTrack: GenderTrack;
  onChangeGenderTrack: (track: GenderTrack) => void;
  streakDays: number;
  level: number;
  xp: number;
  nextLevelXp: number;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onQuickScan: () => void;
  onOpenSettings?: () => void;
  onLevelClick?: () => void;
  notificationsEnabled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  locale,
  setLocale,
  genderTrack,
  onChangeGenderTrack,
  streakDays,
  level,
  xp,
  activeTab,
  setActiveTab,
  onQuickScan,
  onOpenSettings,
  onLevelClick,
}) => {
  const isRtl = locale === "ar";
  const isFemale = genderTrack === "female";

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  const toggleGender = () => {
    onChangeGenderTrack(isFemale ? "male" : "female");
  };

  const navItems: { id: NavTab; label: string }[] = [
    { id: "home", label: isRtl ? "الرئيسية" : "Home" },
    { id: "today", label: isRtl ? "اليوم" : "Today" },
    { id: "scan", label: isRtl ? "الفحص" : "Scan" },
    { id: "progress", label: isRtl ? "التقدم" : "Progress" },
    { id: "profile", label: isRtl ? "حسابي" : "Profile" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-[#27272a] px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single Brand Wordmark */}
        <button 
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-2.5 cursor-pointer select-none group text-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#22d3ee]"
          aria-label="Aura Max Home"
        >
          <AuraMaxEmblem
            width={32}
            height={32}
            glow={false}
            className="group-hover:scale-105 transition-transform shrink-0"
          />
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-extrabold text-base tracking-[0.16em] text-[#f4f4f5] font-display">
              AURA
            </span>
            <span className="font-extrabold text-base tracking-[0.12em] text-[#22d3ee] font-display">
              {isFemale ? "FEM" : "MAX"}
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Clean Text Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-[#111113] rounded-xl border border-[#27272a]">
          {navItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#18181b] text-[#22d3ee] shadow-xs"
                    : "text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#18181b]/50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions & Utility Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Track Switcher */}
          <button
            onClick={toggleGender}
            title={isFemale 
              ? (isRtl ? "التبديل إلى مسار الرجال" : "Switch to Men's track") 
              : (isRtl ? "التبديل إلى مسار النساء" : "Switch to Women's track")
            }
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#27272a] bg-[#18181b] hover:border-[#22d3ee]/40 text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer min-h-[36px]"
          >
            {isFemale ? (
              <>
                <Crown className="w-3.5 h-3.5 text-[#818cf8]" />
                <span>{isRtl ? "مسار النساء" : "Aura Fem"}</span>
              </>
            ) : (
              <>
                <Flame className="w-3.5 h-3.5 text-[#fb923c] glow-flame" />
                <span>{isRtl ? "مسار الرجال" : "Aura Max"}</span>
              </>
            )}
          </button>

          {/* Streak Indicator (Unboxed, quiet metadata with flame) */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#a1a1aa] font-medium"
            title={`${streakDays} ${isRtl ? "أيام التزام" : "Days streak"}`}
          >
            <div className="flame-anim">
              <Flame className="w-4 h-4 text-[#fb923c] glow-flame" />
            </div>
            <span className="font-bold text-[#f4f4f5]">{streakDays}d</span>
          </div>

          {/* Language Switcher Pill matching shell: bg-[#18181b], border-[#27272a], color-[#22d3ee] */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#27272a] bg-[#18181b] hover:border-[#22d3ee]/50 text-xs font-semibold text-[#22d3ee] transition-colors cursor-pointer min-h-[36px]"
            aria-label="Toggle language"
            title={locale === "en" ? "تبديل إلى العربية" : "Switch to English"}
          >
            <Globe className="w-3.5 h-3.5 text-[#22d3ee]" />
            <span>{locale === "en" ? "AR" : "EN"}</span>
          </button>

          {/* Quick Scan CTA Button */}
          <button
            onClick={onQuickScan}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#22d3ee] hover:opacity-95 text-[#09090b] text-xs font-bold transition-all shadow-[0_0_16px_rgba(99,102,241,0.35)] active:scale-95 cursor-pointer whitespace-nowrap min-h-[36px]"
          >
            <Camera className="w-3.5 h-3.5 text-[#09090b]" />
            <span>{isRtl ? "فحص جديد" : "Quick Scan"}</span>
          </button>

          {/* Settings Icon */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#27272a] bg-[#18181b] hover:border-[#22d3ee]/40 text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer"
              aria-label="Open settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
