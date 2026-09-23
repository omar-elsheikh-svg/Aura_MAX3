import React, { useState, useRef } from "react";
import { 
  X, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  Sliders, 
  Smartphone, 
  Square, 
  Award,
  Layers,
  RefreshCw
} from "lucide-react";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { Locale, ScanResult, UserProfile, GenderTrack } from "../types";
import { translations } from "../i18n/translations";
import { AuraMaxEmblem } from "./AuraMaxLogo";

interface SocialStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  scanResult: ScanResult;
  userProfile?: UserProfile;
  genderTrack?: GenderTrack;
}

type CardFormat = "story" | "square";
type CardTheme = "umax" | "cyber" | "luxury" | "stealth";
type PrivacyMode = "full" | "censor" | "mesh" | "silhouette";
type TraitMode = "masculine" | "feminine" | "harmony";

export const SocialStoryModal: React.FC<SocialStoryModalProps> = ({
  isOpen,
  onClose,
  locale,
  scanResult,
  userProfile,
  genderTrack,
}) => {
  const t = translations[locale];
  const isRtl = locale === "ar";
  const st = t.socialStory;
  const isFemale = genderTrack === "female" || userProfile?.genderTrack === "female" || scanResult?.detectedGender === "female";

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Customization state - Defaults to authentic Umax emerald theme
  const [format, setFormat] = useState<CardFormat>("story");
  const [theme, setTheme] = useState<CardTheme>("umax");
  const [privacy, setPrivacy] = useState<PrivacyMode>("full");
  const [traitMode, setTraitMode] = useState<TraitMode>(isFemale ? "feminine" : "masculine");
  const [viralHook, setViralHook] = useState<string>(
    isFemale
      ? (isRtl ? "استخدمي Aura Fem لإبراز تناسق ونعومة ملامحك" : "Use Aura Fem to unlock peak feminine radiance")
      : (isRtl ? "استخدم Aura Max لتصبح أكثر جاذبية وحدة" : "Use Aura Max to become more attractive")
  );

  React.useEffect(() => {
    if (isFemale && traitMode === "masculine") {
      setTraitMode("feminine");
    } else if (!isFemale && traitMode === "feminine") {
      setTraitMode("masculine");
    }
  }, [isFemale]);
  
  // Toggles for biometric and visual elements
  const [showTierBadge, setShowTierBadge] = useState<boolean>(true);
  const [showBiometrics, setShowBiometrics] = useState<boolean>(true);
  const [showPotentialDelta, setShowPotentialDelta] = useState<boolean>(true);
  const [showStoreBadge, setShowStoreBadge] = useState<boolean>(true);

  // Export states
  const [isExporting, setIsExporting] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [shareSuccessToast, setShareSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  // Trigger celebratory confetti
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#10b981", "#22d3ee", "#6366f1", "#fb923c"],
      });
    } catch (e) {
      // Ignore if confetti fails
    }
  };

  // Convert HTML DOM to PNG Data URL
  const generatePngData = async (): Promise<string | null> => {
    if (!cardRef.current) return null;
    try {
      // Render at 2.5x pixel ratio for crystal clear text on mobile displays
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2.5,
        cacheBust: true,
        quality: 0.98,
        filter: (node) => {
          return !node.classList?.contains("no-export");
        }
      });
      return dataUrl;
    } catch (err) {
      console.warn("Failed to render story card at 2.5x, trying 1.5x fallback:", err);
      try {
        const fallbackUrl = await toPng(cardRef.current, {
          pixelRatio: 1.5,
          cacheBust: false,
          quality: 0.92,
        });
        return fallbackUrl;
      } catch (err2) {
        console.error("Story card export failed completely:", err2);
        return null;
      }
    }
  };

  // Download High-Resolution Image
  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const dataUrl = await generatePngData();
      if (!dataUrl) {
        setShareSuccessToast(isRtl ? "تعذر إنشاء البطاقة، يرجى المحاولة ثانية" : "Could not generate card. Please retry.");
        setTimeout(() => setShareSuccessToast(null), 4000);
        return;
      }

      // Convert dataUrl to Blob URL for maximum mobile browser compatibility
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.download = `${isFemale ? "AuraFem" : "AuraMax"}_Rating_${scanResult.overallScore}_${theme}.png`;
      link.href = blobUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);

      fireConfetti();
      setShareSuccessToast(st.downloadSuccess);
      setTimeout(() => setShareSuccessToast(null), 4000);
    } catch (err) {
      console.error("Download error:", err);
      setShareSuccessToast(isRtl ? "حدث خطأ أثناء التنزيل" : "Error downloading card");
      setTimeout(() => setShareSuccessToast(null), 3500);
    } finally {
      setIsExporting(false);
    }
  };

  // Native Web Share API (TikTok, Instagram Stories, WhatsApp, AirDrop)
  const handleNativeShare = async () => {
    setIsExporting(true);
    try {
      const dataUrl = await generatePngData();
      if (!dataUrl) return;

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `AuraMax_Rating_${scanResult.overallScore}.png`, {
        type: "image/png",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Aura Max Biometric Rating",
          text: `${viralHook} • Overall: ${scanResult.overallScore}/100 • Potential: ${scanResult.potentialScore}/100 #auramax #looksmax #glowup`,
        });
        fireConfetti();
      } else if (navigator.share) {
        await navigator.share({
          title: "My Aura Max Biometric Rating",
          text: `${viralHook} • Overall: ${scanResult.overallScore}/100 • Potential: ${scanResult.potentialScore}/100 #auramax #looksmax #glowup`,
          url: window.location.href,
        });
      } else {
        handleDownload();
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Share error:", err);
      }
    } finally {
      setIsExporting(false);
    }
  };

  // Copy Image to Clipboard (for pasting directly as an Instagram Story Sticker)
  const handleCopyImage = async () => {
    setIsExporting(true);
    try {
      const dataUrl = await generatePngData();
      if (!dataUrl) return;
      const blob = await (await fetch(dataUrl)).blob();

      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        const item = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);
        setCopiedImage(true);
        fireConfetti();
        setShareSuccessToast(st.copyImageSuccess);
        setTimeout(() => {
          setCopiedImage(false);
          setShareSuccessToast(null);
        }, 4500);
      } else {
        handleDownload();
      }
    } catch (err) {
      console.error("Copy image error:", err);
      handleDownload();
    } finally {
      setIsExporting(false);
    }
  };

  // Copy Viral Caption to Clipboard
  const handleCopyCaption = () => {
    const appBrand = isFemale ? "Aura Fem AI 🌸" : "Aura Max AI ⚡";
    const hashtags = isFemale
      ? "#aurafem #beauty #glowup #facialharmony #glassskin #femininiaesthetics"
      : "#auramax #looksmax #glowup #facialharmony #huntereyes";
    const text = `${viralHook}\n\nOverall: ${scanResult.overallScore}/100\nPotential: ${scanResult.potentialScore}/100\nSkin: ${scanResult.skinScore}/100\nJawline: ${scanResult.jawlineScore}/100\n\nScanned with ${appBrand} ${hashtags}`;
    navigator.clipboard.writeText(text);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 3000);
  };

  // Calculated trait score
  const traitScore = Math.min(
    99,
    Math.round(scanResult.jawlineScore * 0.55 + scanResult.overallScore * 0.45)
  );

  const traitLabel =
    traitMode === "feminine"
      ? (isRtl ? "الأنوثة والجاذبية" : "Femininity")
      : traitMode === "harmony"
      ? (isRtl ? "التناسق الجمالي" : "Facial harmony")
      : (isRtl ? "الحدة والذكورية" : "Masculinity");

  // Determine Tier Info
  const getTierInfo = (score: number) => {
    if (score >= 90) {
      return {
        badge: "APEX TIER • TOP 1%",
        color: "text-[#22c55e] border-[#22c55e]/50 bg-black/80",
        barColor: "bg-[#22c55e]",
      };
    }
    if (score >= 80) {
      return {
        badge: "ELITE HARMONY • TOP 5%",
        color: "text-[#22d3ee] border-[#22d3ee]/50 bg-black/80",
        barColor: "bg-[#22c55e]",
      };
    }
    return {
      badge: "PRIME POTENTIAL • TOP 15%",
      color: "text-[#84cc16] border-[#84cc16]/50 bg-black/80",
      barColor: "bg-[#84cc16]",
    };
  };

  const tier = getTierInfo(scanResult.overallScore);

  // Theme Styling Presets
  const getThemeStyles = () => {
    switch (theme) {
      case "cyber":
        return {
          cardBg: "bg-[#09090b]",
          cardBorder: "border-[#27272a]",
          barTrack: "bg-[#27272a]",
          barFill: "bg-[#22d3ee]",
          barFillSecondary: "bg-[#38bdf8]",
          accentText: "text-[#22d3ee]",
          accentColor: "#22d3ee",
          glow: "rgba(34, 211, 238, 0.15)",
        };
      case "luxury":
        return {
          cardBg: "bg-[#0E0C09]",
          cardBorder: "border-[#2A2318]",
          barTrack: "bg-[#272118]",
          barFill: "bg-[#F59E0B]",
          barFillSecondary: "bg-[#D97706]",
          accentText: "text-[#F59E0B]",
          accentColor: "#F59E0B",
          glow: "rgba(245, 158, 11, 0.15)",
        };
      case "stealth":
        return {
          cardBg: "bg-[#0B0C0E]",
          cardBorder: "border-[#22242B]",
          barTrack: "bg-[#23252E]",
          barFill: "bg-white",
          barFillSecondary: "bg-slate-300",
          accentText: "text-white",
          accentColor: "#FFFFFF",
          glow: "rgba(255, 255, 255, 0.1)",
        };
      case "umax":
      default:
        // Authentic Umax Onyx & Neon Green Signature Look
        return {
          cardBg: "bg-[#0b0b0e]",
          cardBorder: "border-[#1c1c24]",
          barTrack: "bg-[#24242c]",
          barFill: "bg-[#22c55e]",
          barFillSecondary: "bg-[#84cc16]",
          accentText: "text-[#22c55e]",
          accentColor: "#22c55e",
          glow: "rgba(34, 197, 94, 0.15)",
        };
    }
  };

  const ts = getThemeStyles();

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div 
        className="w-full max-w-5xl bg-[#18181b] border border-[#27272a] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row my-auto max-h-[96vh]"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Header Bar for Mobile */}
        <div className="lg:hidden p-4 border-b border-[#27272a] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#f4f4f5] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#22d3ee]" />
              <span>{st.modalTitle}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#111113] text-[#a1a1aa] hover:text-[#f4f4f5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LEFT COLUMN: Interactive Customization Controls */}
        <div className="w-full lg:w-96 p-5 sm:p-6 overflow-y-auto border-b lg:border-b-0 lg:border-r border-[#27272a] space-y-4 bg-[#111113]">
          {/* Desktop Title Header */}
          <div className="hidden lg:block space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#22d3ee]/15 border border-[#22d3ee]/30 text-[#22d3ee]">
              <Sparkles className="w-3 h-3" />
              <span>{st.triggerBadge}</span>
            </div>
            <h3 className="text-lg font-extrabold text-[#f4f4f5] font-display">
              {st.modalTitle}
            </h3>
            <p className="text-xs text-[#a1a1aa]">
              {st.modalSubtitle}
            </p>
          </div>

          {/* 1. Format Switcher: 9:16 Story vs 1:1 Square */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#f4f4f5] uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span>{isRtl ? "أبعاد البطاقة" : "Card Format"}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormat("story")}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  format === "story"
                    ? "bg-[#22d3ee]/15 border-[#22d3ee] text-[#22d3ee] shadow-md shadow-[#22d3ee]/20"
                    : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#f4f4f5]"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>{st.formatStory}</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat("square")}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  format === "square"
                    ? "bg-[#22d3ee]/15 border-[#22d3ee] text-[#22d3ee] shadow-md shadow-[#22d3ee]/20"
                    : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#f4f4f5]"
                }`}
              >
                <Square className="w-4 h-4" />
                <span>{st.formatPost}</span>
              </button>
            </div>
          </div>

          {/* 2. Aesthetic Theme Presets */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#f4f4f5] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span>{isRtl ? "طابع التصميم والألوان" : "Visual Theme"}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "umax", name: st.themeUmax, color: "from-[#22c55e] to-[#16a34a]" },
                { id: "cyber", name: st.themeNeon, color: "from-[#22d3ee] to-[#6366f1]" },
                { id: "luxury", name: st.themeLuxury, color: "from-[#fb923c] to-[#d97706]" },
                { id: "stealth", name: st.themeStealth, color: "from-white to-zinc-400" },
              ].map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setTheme(th.id as CardTheme)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                    theme === th.id
                      ? "bg-[#18181b] border-[#22d3ee]/70 text-[#f4f4f5] shadow-lg"
                      : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#f4f4f5]"
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-tr ${th.color} shrink-0 shadow-sm`} />
                  <span className="truncate">{th.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Trait Mode (Masculinity / Femininity / Harmony) - Better than Umax */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#f4f4f5] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span>{st.traitTitle}</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "masculine", label: st.traitMasculine },
                { id: "feminine", label: st.traitFeminine },
                { id: "harmony", label: st.traitHarmony },
              ].map((tm) => (
                <button
                  key={tm.id}
                  type="button"
                  onClick={() => setTraitMode(tm.id as TraitMode)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border text-center transition-all cursor-pointer truncate ${
                    traitMode === tm.id
                      ? "bg-[#22d3ee]/15 border-[#22d3ee] text-[#22d3ee]"
                      : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#f4f4f5]"
                  }`}
                >
                  {tm.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Privacy & Photo Presentation Style */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#f4f4f5] uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#fb923c]" />
              <span>{st.privacyTitle}</span>
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: "full", label: st.privacyFull },
                { id: "censor", label: st.privacyCensor },
                { id: "mesh", label: st.privacyMesh },
                { id: "silhouette", label: st.privacySilhouette },
              ].map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPrivacy(pm.id as PrivacyMode)}
                  className={`py-1.5 px-2.5 rounded-lg text-[11px] font-medium border text-center transition-all cursor-pointer ${
                    privacy === pm.id
                      ? "bg-[#18181b] border-[#22d3ee]/60 text-[#f4f4f5] font-bold"
                      : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#f4f4f5]"
                  }`}
                >
                  {pm.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Viral Hook Tagline Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#f4f4f5] uppercase tracking-wider">
                {st.hookTitle}
              </label>
            </div>
            <input
              type="text"
              value={viralHook}
              onChange={(e) => setViralHook(e.target.value)}
              placeholder={st.hookPlaceholder}
              className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-3 py-2 text-xs text-[#f4f4f5] focus:outline-none focus:border-[#22d3ee]"
            />
            {/* Quick hook presets */}
            <div className="flex flex-wrap gap-1 pt-1">
              {[
                "Use Aura Max to become more attractive",
                "My 30-Day Aura Max glowup",
                "Rate my facial harmony 1-10",
              ].map((phrase, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setViralHook(phrase)}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-[#a1a1aa] hover:text-[#f4f4f5] cursor-pointer"
                >
                  {phrase.slice(0, 25)}...
                </button>
              ))}
            </div>
          </div>

          {/* 6. Elite Toggles (Better than Umax) */}
          <div className="space-y-1.5 pt-2 border-t border-[#27272a]">
            <label className="text-xs font-bold text-[#f4f4f5] uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span>{st.highlightsTitle}</span>
            </label>
            <div className="space-y-1 text-xs text-[#a1a1aa]">
              <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 cursor-pointer">
                <span>{st.tierBadgeToggle}</span>
                <input
                  type="checkbox"
                  checked={showTierBadge}
                  onChange={(e) => setShowTierBadge(e.target.checked)}
                  className="rounded accent-[#22d3ee] w-4 h-4 cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 cursor-pointer">
                <span>{st.biometricTagsToggle}</span>
                <input
                  type="checkbox"
                  checked={showBiometrics}
                  onChange={(e) => setShowBiometrics(e.target.checked)}
                  className="rounded accent-[#22d3ee] w-4 h-4 cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 cursor-pointer">
                <span>{st.potentialDeltaToggle}</span>
                <input
                  type="checkbox"
                  checked={showPotentialDelta}
                  onChange={(e) => setShowPotentialDelta(e.target.checked)}
                  className="rounded accent-[#22d3ee] w-4 h-4 cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 cursor-pointer">
                <span>{st.storeBadgeToggle}</span>
                <input
                  type="checkbox"
                  checked={showStoreBadge}
                  onChange={(e) => setShowStoreBadge(e.target.checked)}
                  className="rounded accent-[#22d3ee] w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Share Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-[#27272a]">
            {/* Primary Download Button */}
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#22d3ee] hover:opacity-95 text-[#09090b] font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#22d3ee]/20 active:scale-98 transition-all cursor-pointer"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{st.generating}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{st.downloadBtn}</span>
                </>
              )}
            </button>

            {/* Direct Share to Instagram / TikTok */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleNativeShare}
                disabled={isExporting}
                className="py-2.5 px-3 rounded-xl bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-[#f4f4f5] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#22d3ee]" />
                <span className="truncate">{st.shareNativeBtn}</span>
              </button>

              <button
                onClick={handleCopyImage}
                disabled={isExporting}
                className="py-2.5 px-3 rounded-xl bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-[#f4f4f5] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedImage ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isRtl ? "تم النسخ!" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#22d3ee]" />
                    <span className="truncate">{st.copyImageBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* Copy Viral Caption Button */}
            <button
              onClick={handleCopyCaption}
              className="w-full py-2 px-3 rounded-xl bg-transparent hover:bg-white/5 border border-dashed border-[#27272a] text-[#a1a1aa] hover:text-[#f4f4f5] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedCaption ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{st.captionCopied}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#fb923c]" />
                  <span>{st.copyCaptionBtn}</span>
                </>
              )}
            </button>

            {/* Feedback notification toast */}
            {shareSuccessToast && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 shrink-0" />
                <span>{shareSuccessToast}</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Live Responsive Preview (The Canvas Target) */}
        <div className="flex-1 bg-[#09090b] p-3 sm:p-6 flex flex-col items-center justify-center relative overflow-y-auto">
          {/* Top Close Button for Desktop */}
          <button
            onClick={onClose}
            className="hidden lg:flex absolute top-5 right-5 text-[#a1a1aa] hover:text-[#f4f4f5] p-2 rounded-full bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] transition-colors z-30 cursor-pointer"
            title={st.close}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Preview Container Container */}
          <div className="w-full flex items-center justify-center py-2">
            {/* The Actual Story Card Node (Captured by html-to-image) */}
            <div
              ref={cardRef}
              dir="ltr" // Clean LTR typography for international viral aesthetics
              className={`relative overflow-hidden bg-black text-white flex flex-col justify-between select-none shadow-2xl transition-all duration-300 ${
                format === "story"
                  ? "w-[340px] sm:w-[370px] min-h-[660px] sm:min-h-[700px] p-5 sm:p-6 rounded-[40px]" // 9:16 Story format
                  : "w-[340px] sm:w-[410px] min-h-[380px] sm:min-h-[440px] p-5 sm:p-6 rounded-[36px]" // 1:1 Square format
              }`}
              style={{
                boxShadow: `0 25px 60px rgba(0, 0, 0, 0.95)`,
              }}
            >
              {/* Subtle Luxury Atmospheric Vignette */}
              <div
                className="absolute inset-0 bg-radial from-transparent via-transparent to-black pointer-events-none opacity-90"
              />

              {/* 1. TOP HEADER: Ratings */}
              <div className="relative z-10 text-center pt-1 pb-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                  Ratings
                </h2>
              </div>

              {/* 2. OVERLAPPING AVATAR & MATTE CARD */}
              <div className="relative z-10 w-full flex flex-col items-center my-auto">
                {/* Circular Portrait Avatar (Overlapping Top of Card) */}
                <div className="relative z-20 -mb-14">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-[4px] border-[#0c0d12] shadow-2xl relative bg-[#10121a]">
                    {privacy === "silhouette" ? (
                      <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#0b0c10] to-[#1a1d26] flex flex-col items-center justify-center text-center p-2">
                        <AuraMaxEmblem width={46} height={46} glow={true} />
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#22C55E] mt-1.5 font-bold">
                          BIOMETRIC
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-full relative">
                        {(() => {
                          const rawImg = scanResult.imageUrl || (isFemale
                            ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                            : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80");
                          const safeImg = rawImg.startsWith("http") ? `/api/proxy-image?url=${encodeURIComponent(rawImg)}` : rawImg;
                          return (
                            <img
                              src={safeImg}
                              alt="Face Scan"
                              crossOrigin="anonymous"
                              className="w-full h-full object-cover"
                            />
                          );
                        })()}

                        {/* TikTok Censor Bar Overlay */}
                        {privacy === "censor" && (
                          <div className="absolute top-[35%] inset-x-0 h-5 bg-black/95 border-y border-white/20 flex items-center justify-center shadow-lg">
                            <span className="text-[7px] font-black tracking-widest uppercase text-white font-mono">
                              &bull; CLASSIFIED &bull;
                            </span>
                          </div>
                        )}

                        {/* Cyber Mesh Polygon Grid Overlay */}
                        {privacy === "mesh" && (
                          <div className="absolute inset-0 bg-[#22C55E]/10 mix-blend-overlay flex items-center justify-center pointer-events-none">
                            <svg className="w-full h-full opacity-60" viewBox="0 0 100 100">
                              <polygon points="50,15 75,35 65,70 35,70 25,35" fill="none" stroke="#22C55E" strokeWidth="1" strokeDasharray="2 2" />
                              <line x1="50" y1="15" x2="50" y2="85" stroke="#22C55E" strokeWidth="0.8" />
                              <line x1="30" y1="42" x2="70" y2="42" stroke="#22C55E" strokeWidth="0.8" />
                              <circle cx="50" cy="50" r="3" fill="#22C55E" />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Elite Tier Ribbon (Better than Umax) */}
                  {showTierBadge && (
                    <div className="absolute -bottom-1.5 inset-x-0 flex justify-center z-30">
                      <span className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border shadow-xl backdrop-blur-md ${tier.color}`}>
                        {tier.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* The Iconic Matte Black Card */}
                <div className={`w-full ${ts.cardBg} border ${ts.cardBorder} rounded-[32px] sm:rounded-[36px] pt-16 pb-5 px-5 sm:px-6 relative z-10 shadow-2xl`}>
                  {/* 2 Columns x 3 Rows Metrics Grid */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {/* Row 1, Col 1: Overall */}
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-slate-300">
                        Overall
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mt-0.5">
                        {scanResult.overallScore}
                      </span>
                      <div className={`w-full h-2.5 sm:h-3 ${ts.barTrack} rounded-full overflow-hidden mt-1.5 p-0.5`}>
                        <div
                          className={`h-full rounded-full ${ts.barFill} transition-all duration-500`}
                          style={{ width: `${scanResult.overallScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Row 1, Col 2: Potential */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-medium text-slate-300">
                          Potential
                        </span>
                        {showPotentialDelta && (
                          <span className={`text-[10px] font-bold ${ts.accentText}`}>
                            +{scanResult.potentialScore - scanResult.overallScore}
                          </span>
                        )}
                      </div>
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mt-0.5">
                        {scanResult.potentialScore}
                      </span>
                      <div className={`w-full h-2.5 sm:h-3 ${ts.barTrack} rounded-full overflow-hidden mt-1.5 p-0.5`}>
                        <div
                          className={`h-full rounded-full ${ts.barFill} transition-all duration-500`}
                          style={{ width: `${scanResult.potentialScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Row 2, Col 1: Masculinity / Femininity / Harmony */}
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-slate-300 truncate">
                        {traitLabel}
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mt-0.5">
                        {traitScore}
                      </span>
                      <div className={`w-full h-2.5 sm:h-3 ${ts.barTrack} rounded-full overflow-hidden mt-1.5 p-0.5`}>
                        <div
                          className={`h-full rounded-full ${ts.barFill} transition-all duration-500`}
                          style={{ width: `${traitScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Row 2, Col 2: Skin quality */}
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-slate-300">
                        Skin quality
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mt-0.5">
                        {scanResult.skinScore}
                      </span>
                      <div className={`w-full h-2.5 sm:h-3 ${ts.barTrack} rounded-full overflow-hidden mt-1.5 p-0.5`}>
                        <div
                          className={`h-full rounded-full ${ts.barFill} transition-all duration-500`}
                          style={{ width: `${scanResult.skinScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Row 3, Col 1: Jawline */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-medium text-slate-300">
                          Jawline
                        </span>
                        {showBiometrics && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            {scanResult.gonialAngle || "121°"}
                          </span>
                        )}
                      </div>
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mt-0.5">
                        {scanResult.jawlineScore}
                      </span>
                      <div className={`w-full h-2.5 sm:h-3 ${ts.barTrack} rounded-full overflow-hidden mt-1.5 p-0.5`}>
                        <div
                          className={`h-full rounded-full ${ts.barFill} transition-all duration-500`}
                          style={{ width: `${scanResult.jawlineScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Row 3, Col 2: Cheekbones */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-medium text-slate-300">
                          Cheekbones
                        </span>
                        {showBiometrics && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            {scanResult.canthalTilt || "+4°"}
                          </span>
                        )}
                      </div>
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mt-0.5">
                        {scanResult.symmetryScore}
                      </span>
                      <div className={`w-full h-2.5 sm:h-3 ${ts.barTrack} rounded-full overflow-hidden mt-1.5 p-0.5`}>
                        <div
                          className={`h-full rounded-full ${ts.barFill} transition-all duration-500`}
                          style={{ width: `${scanResult.symmetryScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Watermark at bottom of card */}
                  <div className="flex items-center justify-center gap-1.5 mt-5 text-slate-500 text-xs font-semibold lowercase tracking-wider">
                    <AuraMaxEmblem width={13} height={13} />
                    <span>{isFemale ? "aurafem" : "auramax"}</span>
                  </div>
                </div>
              </div>

              {/* 3. CARD FOOTER: PROMO CALLOUT + APP STORE BANNER + VIRAL HOOK */}
              {format === "story" && (
                <div className="relative z-10 pt-4 pb-1 space-y-3">
                  {/* Callout Text */}
                  <div className="text-center text-[10.5px] font-extrabold uppercase tracking-widest text-slate-200">
                    GET YOUR RATINGS + GLOWUP WITH {isFemale ? "AURA FEM" : "AURA MAX"} APP
                  </div>

                  {/* App Store Download Banner */}
                  {showStoreBadge && (
                    <div className="w-full bg-[#18181b] border border-[#27272a] rounded-2xl p-2.5 sm:p-3 flex items-center justify-between shadow-xl">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#09090b] border border-[#27272a] flex items-center justify-center p-1 shadow-md shrink-0">
                          <AuraMaxEmblem width={24} height={24} glow={true} />
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-bold text-white">
                            {isFemale ? "Aura Fem - Radiance & Glow" : "Aura Max - Become Elite"}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {isFemale ? "Get your beauty ratings" : "Get your ratings"}
                          </div>
                          <div className="text-[9px] font-semibold text-amber-400 font-mono mt-0.5">
                            ★★★★★ 50K
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-1.5 rounded-full bg-[#1b253b] text-[#38bdf8] font-bold text-xs uppercase tracking-wide shadow-sm">
                        Open
                      </div>
                    </div>
                  )}

                  {/* Viral Hook Line */}
                  <div className="text-center font-bold text-base sm:text-lg text-white tracking-tight leading-snug">
                    {viralHook}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Helper Text */}
          <div className="text-center text-xs text-slate-400 mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {isRtl 
                ? "جاهز للنشر مباشرة على ستوري تيك توك وإنستغرام أو الحفظ كصورة بجودة فائقة"
                : "Optimized for TikTok & Instagram Story upload or sticker paste"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
