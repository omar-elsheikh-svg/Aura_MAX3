import React, { useState } from "react";
import { 
  LineChart, 
  TrendingUp, 
  Award, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  CheckCircle2,
  Sliders,
  Flame,
  Camera,
  Layers,
  Info
} from "lucide-react";
import { Locale, ScanResult, UserProfile, GenderTrack } from "../types";
import { translations } from "../i18n/translations";

interface TimelineViewProps {
  locale: Locale;
  genderTrack?: GenderTrack;
  userProfile: UserProfile;
  scansHistory: ScanResult[];
  onInitiateScan: () => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  locale,
  genderTrack = "male",
  userProfile,
  scansHistory,
  onInitiateScan,
}) => {
  const t = translations[locale];
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [sliderPos, setSliderPos] = useState(50);

  // Pick genuine user baseline and latest scan if available
  const hasMultipleScans = scansHistory && scansHistory.length >= 2;
  const latestScan = scansHistory && scansHistory.length > 0 ? scansHistory[0] : null;
  const baselineScan = scansHistory && scansHistory.length > 0 ? scansHistory[scansHistory.length - 1] : null;

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    let pos = ((clientX - rect.left) / rect.width) * 100;
    if (pos < 5) pos = 5;
    if (pos > 95) pos = 95;
    setSliderPos(pos);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      handleSliderMove(e.clientX, rect);
    }
  };

  return (
    <div 
      className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/30 text-[#22d3ee] text-xs font-bold tracking-wider uppercase">
          <LineChart className="w-3.5 h-3.5" />
          <span>{isRtl ? "سجل التحول الحقيقي" : "Authentic History"}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#f4f4f5] tracking-tight font-display">
          {isRtl ? "الخط الزمني للتحول الشخصي" : "Personal Transformation Timeline"}
        </h1>
        <p className="text-sm text-[#a1a1aa] leading-relaxed">
          {isRtl 
            ? "سجل توثيقي حقيقي لفحوصاتك والتزامك اليومي دون أي مقارنات وهمية أو صور مصطنعة." 
            : "A verified record of your actual assessment metrics, habit consistency, and milestones over time."}
        </p>
      </div>

      {/* Visual Scan Comparison (Only shown if genuine user scans exist) */}
      {hasMultipleScans && latestScan?.imageUrl && baselineScan?.imageUrl && (
        <div className="p-6 rounded-3xl bg-[#18181b] border border-[#27272a] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#a1a1aa] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span>{isRtl ? "مقارنة الفحص الأول بالأخير" : "Baseline vs Latest Scan Comparison"}</span>
            </span>
            <div className="flex items-center gap-3 text-xs text-[#71717a]">
              <span>{isRtl ? "خط الأساس:" : "Baseline:"} {baselineScan.date}</span>
              <span>·</span>
              <span>{isRtl ? "الأخير:" : "Latest:"} {latestScan.date}</span>
            </div>
          </div>

          <div
            className="relative w-full max-w-xl mx-auto aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-[#27272a] select-none cursor-ew-resize touch-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* Latest Scan (Underneath) */}
            <img
              src={latestScan.imageUrl}
              alt="Latest Scan"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-3 end-3 px-2.5 py-1 rounded-lg bg-[#09090b]/80 backdrop-blur-md text-[10px] font-bold text-[#22d3ee] border border-[#27272a]">
              {isRtl ? "الفحص الأخير" : "Latest"} ({latestScan.overallScore}/100)
            </div>

            {/* Baseline Scan (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={baselineScan.imageUrl}
                alt="Baseline Scan"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
              />
              <div className="absolute bottom-3 start-3 px-2.5 py-1 rounded-lg bg-[#09090b]/80 backdrop-blur-md text-[10px] font-bold text-[#a1a1aa] border border-[#27272a]">
                {isRtl ? "خط الأساس" : "Baseline"} ({baselineScan.overallScore}/100)
              </div>
            </div>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#22d3ee] shadow-[0_0_10px_#22d3ee] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#09090b] border-2 border-[#22d3ee] flex items-center justify-center text-[10px] font-mono font-bold text-[#22d3ee]">
                ↔
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#111113] border border-[#27272a] text-[11px] text-[#71717a] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#22d3ee] shrink-0" />
            <span>
              {isRtl 
                ? "ملاحظة: تختلف زوايا الإضاءة والوضعية بين الفحوصات. تُستخدم الصور كمرجع بصري شخصي فقط."
                : "Note: Variations in lighting and camera distance affect facial photos. Used strictly for personal visual reference."}
            </span>
          </div>
        </div>
      )}

      {/* Scans Timeline List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#f4f4f5] uppercase tracking-wider">
            {isRtl ? "محطات التقييم المسجلة" : "Logged Assessment Milestones"}
          </h2>
          <button
            onClick={onInitiateScan}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#22d3ee] hover:opacity-95 text-[#09090b] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isRtl ? "تسجيل فحص جديد" : "Log New Scan"}</span>
          </button>
        </div>

        {scansHistory && scansHistory.length > 0 ? (
          <div className="space-y-3">
            {scansHistory.map((scan, idx) => (
              <div
                key={scan.id || idx}
                className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#111113] border border-[#27272a] flex flex-col items-center justify-center shrink-0">
                    <span className="text-base font-black text-[#22d3ee] font-display leading-none">
                      {scan.overallScore}
                    </span>
                    <span className="text-[9px] text-[#71717a] mt-0.5">SCORE</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#f4f4f5]">
                        {isRtl ? `فحص #${scansHistory.length - idx}` : `Scan #${scansHistory.length - idx}`}
                      </span>
                      <span className="text-[10px] text-[#71717a] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{scan.date}</span>
                      </span>
                    </div>

                    <div className="text-xs text-[#a1a1aa] mt-0.5 flex flex-wrap items-center gap-3">
                      <span>{isRtl ? "زاوية الفك:" : "Jaw:"} {scan.gonialAngle}</span>
                      <span>·</span>
                      <span>{isRtl ? "التناسق:" : "Symmetry:"} {scan.symmetryScore}%</span>
                      <span>·</span>
                      <span>{isRtl ? "البشرة:" : "Skin:"} {scan.skinScore}/100</span>
                      <span>·</span>
                      <span>{isRtl ? "شكل الوجه:" : "Shape:"} {scan.faceShape?.name[locale] || scan.faceShape?.shape || "Oval"}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#71717a]">
                  {scan.notes ? scan.notes[locale] : (isRtl ? "فحص بيومتري موثق" : "Verified scan")}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-[#18181b] border border-[#27272a] text-center space-y-3">
            <Camera className="w-10 h-10 text-[#71717a] mx-auto" />
            <h3 className="text-base font-bold text-[#f4f4f5]">
              {isRtl ? "لا توجد فحوصات مسجلة بعد" : "No Transformation Scans Yet"}
            </h3>
            <p className="text-xs text-[#a1a1aa] max-w-sm mx-auto">
              {isRtl 
                ? "ابدأ بفحصك الأول لحفظ خط الأساس، وسيبدأ خطك الزمني بتسجيل كل تطور بيومتري حقيقي." 
                : "Complete your initial scan to establish your baseline. Your timeline will reflect your genuine habit progress."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
