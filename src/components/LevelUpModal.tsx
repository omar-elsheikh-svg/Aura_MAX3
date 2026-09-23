import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  X, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Award, 
  ArrowUpRight, 
  Crown,
  Volume2
} from "lucide-react";
import { Locale } from "../types";
import { translations } from "../i18n/translations";
import { getTierInfo } from "../utils/levelService";
import { fireLevelUpConfetti, playLevelUpSound, fireMicroConfetti } from "../utils/confettiService";
import { AuraMaxEmblem } from "./AuraMaxLogo";

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  previousLevel: number;
  newLevel: number;
  totalXp: number;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onClose,
  locale,
  previousLevel,
  newLevel,
  totalXp,
}) => {
  const t = translations[locale];
  const isRtl = locale === "ar";
  const tierInfo = getTierInfo(newLevel);

  // Trigger celebration sounds & confetti on open
  useEffect(() => {
    if (isOpen) {
      fireLevelUpConfetti();
      playLevelUpSound();
    }
  }, [isOpen]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleClaim = () => {
    fireMicroConfetti(0.5, 0.6);
    onClose();
  };

  const handleCelebrateAgain = () => {
    fireLevelUpConfetti();
    playLevelUpSound();
  };

  const perkList = [
    {
      icon: <Zap className="w-4 h-4 text-[#22d3ee]" />,
      title: isRtl ? "+150 طاقة أورا واستيعاب قصوى" : "+150 Max Aura Capacity",
      desc: isRtl ? "زيادة حد نقاط الانضباط اليومية" : "Expanded daily aesthetic points capacity",
      color: "#22d3ee",
    },
    {
      icon: <Crown className="w-4 h-4 text-[#fb923c]" />,
      title: isRtl ? "رتبة جمالية جديدة غير مقفلة" : "New Aesthetic Tier Unlocked",
      desc: tierInfo.title[locale],
      color: "#fb923c",
    },
    {
      icon: <Flame className="w-4 h-4 text-[#818cf8]" />,
      title: isRtl ? "مضاعف 5% لنقاط السلسلة" : "5% Streak XP Multiplier",
      desc: isRtl ? "مكافآت أكبر لكل مهمة تنجزها" : "Enhanced reward on subsequent quests",
      color: "#818cf8",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#10b981]" />,
      title: isRtl ? "درع حماية الانضباط" : "Aura Discipline Shield",
      desc: isRtl ? "حماية مضاعفة لسجل التوهج" : "Fortified daily streak preservation",
      color: "#10b981",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* Backdrop Blur & Ambient Dark Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#09090b]/85 backdrop-blur-xl -z-10 cursor-pointer"
          />

          {/* Glowing Radial Light Orbs */}
          <div 
            aria-hidden="true" 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#22d3ee]/20 via-[#6366f1]/20 to-transparent blur-[120px] pointer-events-none -z-10" 
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#18181b]/95 border border-[#27272a] rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(34,211,238,0.18)] overflow-hidden"
          >
            {/* Top Accent Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#22d3ee] via-[#6366f1] to-[#fb923c]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 rounded-xl bg-[#111113] hover:bg-[#27272a] text-[#71717a] hover:text-[#f4f4f5] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Re-celebrate FX Trigger */}
            <button
              onClick={handleCelebrateAgain}
              className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#111113] hover:bg-[#27272a] text-[#a1a1aa] hover:text-[#22d3ee] text-xs font-semibold transition-colors cursor-pointer"
              title={isRtl ? "إعادة تشغيل الاحتفال" : "Re-trigger confetti"}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span className="text-[11px] font-mono hidden sm:inline">
                {isRtl ? "احتفال" : "Confetti"}
              </span>
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              {/* Emblem & Radiating Shockwave Ring */}
              <div className="relative flex items-center justify-center my-4">
                {/* Pulsing Aura Rings */}
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.35, 0.7, 0.35],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-36 h-36 rounded-full border border-[#22d3ee]/30 blur-sm pointer-events-none"
                />
                <motion.div
                  animate={{
                    scale: [1.1, 1.4, 1.1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                  className="absolute w-44 h-44 rounded-full border border-[#6366f1]/30 blur-md pointer-events-none"
                />

                {/* Level Up Badge Centerpiece */}
                <div className="relative z-10 w-28 h-28 rounded-3xl bg-gradient-to-b from-[#18181b] to-[#09090b] border-2 border-[#22d3ee]/60 shadow-[0_0_35px_rgba(34,211,238,0.35)] flex flex-col items-center justify-center p-2">
                  <span className="text-2xl select-none">{tierInfo.badge}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#22d3ee] font-bold">
                      LVL
                    </span>
                    <motion.span
                      key={newLevel}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="text-3xl font-black text-[#f4f4f5] font-display"
                    >
                      {newLevel}
                    </motion.span>
                  </div>

                  {previousLevel > 0 && previousLevel !== newLevel && (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>{previousLevel} &rarr; {newLevel}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Celebration Headers */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/30 text-[#22d3ee] text-xs font-bold tracking-widest uppercase mb-2 shadow-[0_0_12px_rgba(34,211,238,0.15)]">
                <Sparkles className="w-3.5 h-3.5 fill-[#22d3ee]" />
                <span>{isRtl ? "ترقية المستوى!" : "LEVEL UP REACHED!"}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#f4f4f5] font-display">
                {tierInfo.title[locale]}
              </h2>

              <p className="text-xs sm:text-sm text-[#a1a1aa] mt-2 max-w-sm leading-relaxed">
                {tierInfo.auraDescription[locale]}
              </p>

              {/* Total XP Highlight */}
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111113] border border-[#27272a] text-xs">
                <Zap className="w-3.5 h-3.5 text-[#818cf8] fill-[#818cf8]" />
                <span className="text-[#a1a1aa] font-medium">
                  {isRtl ? "إجمالي الخبرة المكتسبة:" : "Total Aesthetic XP:"}
                </span>
                <span className="font-mono font-bold text-[#f4f4f5]">
                  {totalXp.toLocaleString()} XP
                </span>
              </div>

              {/* Unlocked Perks Grid */}
              <div className="w-full mt-6 space-y-2 text-start">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a1a1aa] px-1 block">
                  {isRtl ? "مكافآت الترقية المكتسبة" : "Ascension Rewards Unlocked"}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {perkList.map((perk, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="p-3 rounded-2xl bg-[#111113]/80 border border-[#27272a] flex items-start gap-2.5"
                    >
                      <div className="p-1.5 rounded-xl bg-[#18181b] shrink-0 border border-[#27272a]">
                        {perk.icon}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-[#f4f4f5] truncate">
                          {perk.title}
                        </h4>
                        <p className="text-[11px] text-[#a1a1aa] truncate mt-0.5">
                          {perk.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Claim Button */}
              <div className="w-full mt-6 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleClaim}
                  className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#22d3ee] hover:opacity-95 text-[#09090b] font-black text-sm tracking-wide shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-[#09090b]" />
                  <span>
                    {isRtl ? "استلام المكافآت والمتابعة" : "Claim Rewards & Ascend"}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
