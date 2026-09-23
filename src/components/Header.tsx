import React from "react";
import { Flame, Globe, Camera, Settings, Zap } from "lucide-react";
import { Locale, NavTab, GenderTrack } from "../types";
import { AuraMaxEmblem, AuraMaxWordmark } from "./AuraMaxLogo";

interface HeaderProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  genderTrack: GenderTrack;
  onChangeGenderTrack?: (track: GenderTrack) => void;
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

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  const handlePrestigeClick = () => {
    if (onLevelClick) {
      onLevelClick();
    } else {
      setActiveTab("profile");
    }
  };

  const navItems: { id: NavTab; label: string }[] = [
    { id: "home", label: isRtl ? "الرئيسية" : "Home" },
    { id: "today", label: isRtl ? "اليوم" : "Today" },
    { id: "scan", label: isRtl ? "الفحص" : "Scan" },
    { id: "progress", label: isRtl ? "التقدم" : "Progress" },
    { id: "profile", label: isRtl ? "حسابي" : "Profile" },
  ];

  return (
    <header className="sticky top-0 z-40 h-14 bg-[#09090b]/80 backdrop-blur-md border-b border-[#27272a]/50 px-4 lg:px-8 transition-all relative flex items-center">
      {/* Specular Top Rim Lighting Effect */}
      <div 
        aria-hidden="true" 
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" 
      />

      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Zone 1: Responsive Brand Display (Icon only on mobile <sm, Icon + Wordmark on sm+) */}
        <button 
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group text-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#22d3ee] shrink-0"
          aria-label="Aura Max Home"
        >
          <div className="shrink-0 flex items-center justify-center">
            <AuraMaxEmblem
              width={30}
              height={30}
              track={genderTrack}
              concept="concept-a"
              glow={false}
              className="group-hover:scale-105 transition-transform shrink-0"
            />
          </div>

          {/* Wordmark: Hidden on mobile (<sm), shown on desktop (sm+) */}
          <AuraMaxWordmark
            track={genderTrack}
            size="sm"
            className="hidden sm:flex"
          />
        </button>

        {/* Zone 2: Segmented Navigation Bar (Desktop md+) */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-white/[0.02] rounded-xl border border-white/[0.06] backdrop-blur-sm shadow-inner">
          {navItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-white/[0.08] text-[#22d3ee] shadow-xs font-bold border border-white/[0.08]"
                    : "text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Obsidian Precision Status & Actions Cluster */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Prestige Telemetry: Streak & Level Unified Capsule */}
          <button
            onClick={handlePrestigeClick}
            className="flex items-center gap-2 px-2.5 sm:px-3 h-9 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#22d3ee]/40 hover:bg-white/[0.05] transition-all text-xs cursor-pointer select-none group active:scale-95"
            title={`${streakDays} ${isRtl ? "أيام التزام" : "Days streak"} · Level ${level} (${xp} XP)`}
          >
            {/* Streak Counter */}
            <div className="flex items-center gap-1">
              <div className="flame-anim shrink-0">
                <Flame className="w-3.5 h-3.5 text-[#fb923c]" style={{ filter: "drop-shadow(0 0 6px rgba(251,146,60,0.6))" }} />
              </div>
              <span className="font-mono font-bold text-[#f4f4f5] text-xs">{streakDays}d</span>
            </div>

            <span className="w-px h-3.5 bg-white/10" aria-hidden="true" />

            {/* Level Badge */}
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#22d3ee] group-hover:scale-110 transition-transform" />
              <span className="font-mono font-semibold text-[#a1a1aa] group-hover:text-[#22d3ee] text-[11px] transition-colors">
                L{level}
              </span>
            </div>
          </button>

          {/* Language Switcher Capsule */}
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center gap-1 px-2.5 sm:px-3 h-9 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#22d3ee]/40 text-xs font-mono font-bold text-[#22d3ee] transition-all cursor-pointer select-none active:scale-95"
            aria-label="Toggle language"
            title={locale === "en" ? "تبديل إلى العربية" : "Switch to English"}
          >
            <Globe className="w-3.5 h-3.5 text-[#22d3ee]/80" />
            <span>{locale === "en" ? "AR" : "EN"}</span>
          </button>

          {/* Quick Scan CTA (Desktop lg+) */}
          <button
            onClick={onQuickScan}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 h-9 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#22d3ee] hover:brightness-110 text-[#09090b] text-xs font-bold transition-all shadow-[0_0_14px_rgba(34,211,238,0.22)] active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Camera className="w-3.5 h-3.5 text-[#09090b]" />
            <span>{isRtl ? "فحص جديد" : "Quick Scan"}</span>
          </button>

          {/* Settings Control Button */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 text-[#a1a1aa] hover:text-[#f4f4f5] transition-all cursor-pointer select-none active:scale-95"
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
