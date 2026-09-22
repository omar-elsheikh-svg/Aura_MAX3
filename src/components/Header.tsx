import React from "react";
import { Sparkles, Flame, Globe, Camera, Zap, Bell, Settings, Crown, User } from "lucide-react";
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
  nextLevelXp,
  activeTab,
  setActiveTab,
  onQuickScan,
  onOpenSettings,
  onLevelClick,
  notificationsEnabled = false,
}) => {
  const t = translations[locale];
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
    <header className="sticky top-0 z-40 bg-[#08090C]/90 backdrop-blur-md border-b border-[#1E232E] px-4 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
        >
          <div className="relative shrink-0 flex items-center justify-center">
            <AuraMaxEmblem
              width={34}
              height={34}
              glow={true}
              className="group-hover:scale-105 transition-transform"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-black text-base sm:text-lg tracking-[0.16em] text-[#F4F7FA] font-display">
                AURA
              </span>
              <span className={`font-black text-base sm:text-lg tracking-[0.12em] ${
                isFemale ? "text-[#8B5CF6]" : "text-[#42E8FF]"
              }`}>
                {isFemale ? "FEM" : "MAX"}
              </span>
            </div>
            <span className="text-[8px] font-mono tracking-[0.2em] text-[#A5AEBC] uppercase hidden sm:block mt-0.5 font-semibold">
              TRANSFORMATION SYSTEM
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#111318] p-1 rounded-xl border border-[#252A33]">
          {navItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-[#171A21] text-[#42E8FF] shadow-sm font-bold border border-[#252A33]"
                    : "text-[#A5AEBC] hover:text-[#F4F7FA] hover:bg-[#161922]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Action Widgets */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Gender Track Quick Switcher */}
          <button
            onClick={toggleGender}
            title={isFemale 
              ? (isRtl ? "التبديل إلى مسار الرجال" : "Switch to Men's track") 
              : (isRtl ? "التبديل إلى مسار النساء" : "Switch to Women's track")
            }
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border border-[#252A33] bg-[#111318] hover:border-[#42E8FF]/40 text-[#F4F7FA] transition-all cursor-pointer"
          >
            {isFemale ? (
              <>
                <Crown className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span className="hidden sm:inline">{isRtl ? "مسار النساء" : "Aura Fem"}</span>
              </>
            ) : (
              <>
                <Flame className="w-3.5 h-3.5 text-[#42E8FF]" />
                <span className="hidden sm:inline">{isRtl ? "مسار الرجال" : "Aura Max"}</span>
              </>
            )}
          </button>

          {/* Day Streak Pill */}
          <div 
            title={`${streakDays} ${isRtl ? "أيام التزام" : "Days streak"}`}
            className="flex items-center gap-1.5 bg-[#111318] border border-[#252A33] px-2.5 py-1 rounded-full text-xs font-bold text-[#8B5CF6] cursor-default"
          >
            <Flame className="w-4 h-4 text-[#8B5CF6] fill-[#8B5CF6]" />
            <span>{streakDays}</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-[#111318] hover:bg-[#171A21] border border-[#252A33] hover:border-[#42E8FF]/40 text-[#A5AEBC] hover:text-[#F4F7FA] px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#42E8FF]" />
            <span>{locale === "en" ? "العربية" : "EN"}</span>
          </button>

          {/* New Scan CTA Button */}
          <button
            onClick={onQuickScan}
            className="flex items-center gap-1.5 font-extrabold text-xs px-3.5 py-1.5 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] shadow-[0_0_15px_rgba(66,232,255,0.2)] active:scale-95 transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isRtl ? "فحص جديد" : "Scan"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
