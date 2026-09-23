import React from "react";

export type LogoOption = "concept-a" | "concept-b" | "concept-c";

interface AuraMaxLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  concept?: LogoOption;
  showWordmark?: boolean;
  layout?: "horizontal" | "vertical";
  glow?: boolean;
  track?: "male" | "female";
  monochrome?: boolean;
  className?: string;
}

/**
 * OPTION A: The Ascendant Crest (Geometric "A" with Elevation Crescent)
 * Pure, high-precision vector emblem strictly matching the brand reference:
 * Architectural A-frame with dual parallel left rail, sharp apex, notched right foot,
 * and an upward-sweeping elevation crescent. Clean solid geometry without any dots.
 */
export const AuraMaxAscendantMark: React.FC<{
  size?: number;
  track?: "male" | "female";
  monochrome?: boolean;
  glow?: boolean;
  className?: string;
}> = ({ size = 36, track = "male", monochrome = false, glow = false, className = "" }) => {
  const isFemale = track === "female";
  const gradId = React.useId();
  const swooshGradId = React.useId();

  // Dynamic stroke/fill colors
  const primaryColor = monochrome ? "#FFFFFF" : isFemale ? "#c084fc" : "#FFFFFF";
  const accentColor = monochrome ? "#FFFFFF" : isFemale ? "#f472b6" : "#38bdf8";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
      style={{
        filter: glow
          ? isFemale
            ? "drop-shadow(0 0 6px rgba(192,132,252,0.25))"
            : "drop-shadow(0 0 6px rgba(56,189,248,0.25))"
          : undefined,
      }}
    >
      <defs>
        {!monochrome && (
          <>
            <linearGradient id={gradId} x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              {isFemale ? (
                <>
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="60%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#818cf8" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#e0f2fe" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </>
              )}
            </linearGradient>

            <linearGradient id={swooshGradId} x1="20" y1="80" x2="80" y2="25" gradientUnits="userSpaceOnUse">
              {isFemale ? (
                <>
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#fb7185" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#818cf8" />
                </>
              )}
            </linearGradient>
          </>
        )}
      </defs>

      {/* 1. Outer Left Diagonal Leg (Apex to bottom-left) */}
      <path
        d="
          M 44 14
          L 12 86
          L 18 86
          L 48 19
          L 44 14
          Z
        "
        fill={monochrome ? "#FFFFFF" : `url(#${gradId})`}
      />

      {/* 2. Inner Left Parallel Rail */}
      <path
        d="
          M 26 86
          L 41 52
          L 46 54
          L 31.5 86
          Z
        "
        fill={monochrome ? "#FFFFFF" : `url(#${gradId})`}
      />

      {/* 3. Right Diagonal Leg with Horizontal Base Foot & Inner Chamfer */}
      <path
        d="
          M 44 14
          L 48 19
          L 77 81
          L 63 81
          L 55 64
          L 59 62
          L 66 77
          L 78 77
          L 82 86
          L 58 86
          L 58 81
          L 44 14
          Z
        "
        fill={monochrome ? "#FFFFFF" : `url(#${gradId})`}
      />

      {/* 4. The Dynamic Ascendant Swoosh (Sweeping contour wing with crisp cut terminal) */}
      <path
        d="
          M 26 84
          C 34 76, 44 68, 54 60
          C 64 52, 73 43, 76 28
          L 81 29
          C 78 46, 68 56, 57 65
          C 46 74, 34 82, 26 87
          Z
        "
        fill={monochrome ? "#FFFFFF" : `url(#${swooshGradId})`}
      />
    </svg>
  );
};

/**
 * OPTION B: The Radiant Halo (High-End Editorial / Abstract Glow Mark)
 */
export const AuraMaxHaloMark: React.FC<{
  size?: number;
  track?: "male" | "female";
  glow?: boolean;
  className?: string;
}> = ({ size = 36, track = "male", glow = false, className = "" }) => {
  const isFemale = track === "female";
  const gradRingA = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-all duration-300 ${className}`}
      style={{
        filter: glow
          ? isFemale
            ? "drop-shadow(0 0 6px rgba(236,72,153,0.20))"
            : "drop-shadow(0 0 6px rgba(34,211,238,0.20))"
          : undefined,
      }}
    >
      <defs>
        <linearGradient id={gradRingA} x1="10" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isFemale ? "#f43f5e" : "#22d3ee"} />
          <stop offset="50%" stopColor={isFemale ? "#c084fc" : "#6366f1"} />
          <stop offset="100%" stopColor={isFemale ? "#818cf8" : "#3b82f6"} />
        </linearGradient>
      </defs>

      {/* Exterior Radiant Aura Ring */}
      <circle
        cx="50"
        cy="50"
        r="36"
        stroke={`url(#${gradRingA})`}
        strokeWidth="4"
        strokeDasharray="150 25 40 15"
        strokeLinecap="round"
      />

      {/* Inner Prism */}
      <polygon
        points="50,28 64,60 36,60"
        fill="none"
        stroke={`url(#${gradRingA})`}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * OPTION C: Sleek Telemetry Monogram (Linear / Whoop Inspired)
 */
export const AuraMaxTelemetryMark: React.FC<{
  size?: number;
  track?: "male" | "female";
  glow?: boolean;
  className?: string;
}> = ({ size = 36, track = "male", glow = false, className = "" }) => {
  const isFemale = track === "female";
  const gradId = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-all duration-300 ${className}`}
      style={{
        filter: glow
          ? isFemale
            ? "drop-shadow(0 0 6px rgba(192,132,252,0.18))"
            : "drop-shadow(0 0 6px rgba(34,211,238,0.18))"
          : undefined,
      }}
    >
      <defs>
        <linearGradient id={gradId} x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isFemale ? "#f472b6" : "#22d3ee"} />
          <stop offset="100%" stopColor={isFemale ? "#818cf8" : "#6366f1"} />
        </linearGradient>
      </defs>

      <polygon
        points="50,12 85,32 85,68 50,88 15,68 15,32"
        fill="#111113"
        stroke={`url(#${gradId})`}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <path
        d="M 50 26 L 70 72 L 60 72 L 55 60 L 45 60 L 40 72 L 30 72 Z M 50 38 L 47 52 L 53 52 Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
};

/**
 * Universal Wordmark for Aura Max / Aura Fem
 * Rendered in high-precision modern typography matching the reference vector:
 * "AURA" in pure white (#f4f4f5) + "MAX" / "FEM" in electric track accent or pure white.
 */
export const AuraMaxWordmark: React.FC<{
  track?: "male" | "female";
  size?: "sm" | "md" | "lg" | "xl";
  monochrome?: boolean;
  className?: string;
}> = ({ track = "male", size = "md", monochrome = false, className = "" }) => {
  const isFemale = track === "female";

  const sizeStyles = React.useMemo(() => {
    switch (size) {
      case "sm":
        return { text: "text-base sm:text-lg", spacing: "tracking-[0.14em]" };
      case "md":
        return { text: "text-lg sm:text-xl", spacing: "tracking-[0.16em]" };
      case "lg":
        return { text: "text-2xl sm:text-3xl", spacing: "tracking-[0.18em]" };
      case "xl":
        return { text: "text-3xl sm:text-4xl", spacing: "tracking-[0.2em]" };
      default:
        return { text: "text-lg sm:text-xl", spacing: "tracking-[0.16em]" };
    }
  }, [size]);

  return (
    <div className={`flex items-baseline select-none font-display font-extrabold ${sizeStyles.text} ${className}`}>
      {/* "AURA" in pure Obsidian Ice White */}
      <span className={`${sizeStyles.spacing} text-[#f4f4f5] transition-colors`}>
        AURA
      </span>
      <span className="w-2" aria-hidden="true" />
      {/* "MAX" or "FEM" */}
      <span
        className={`${sizeStyles.spacing} font-black transition-colors ${
          monochrome
            ? "text-[#f4f4f5]"
            : isFemale
              ? "text-[#c084fc]"
              : "text-[#38bdf8]"
        }`}
      >
        {isFemale ? "FEM" : "MAX"}
      </span>
    </div>
  );
};

/**
 * Primary AuraMaxEmblem used throughout headers, cards, and avatars.
 * Strictly solid vector geometry without any dots or secondary circles.
 */
export const AuraMaxEmblem: React.FC<{
  width?: number;
  height?: number;
  track?: "male" | "female";
  concept?: LogoOption;
  monochrome?: boolean;
  glow?: boolean;
  className?: string;
}> = ({
  width = 30,
  height,
  track = "male",
  concept = "concept-a",
  monochrome = false,
  glow = false,
  className = "",
}) => {
  const size = height || width;

  switch (concept) {
    case "concept-b":
      return <AuraMaxHaloMark size={size} track={track} glow={glow} className={className} />;
    case "concept-c":
      return <AuraMaxTelemetryMark size={size} track={track} glow={glow} className={className} />;
    case "concept-a":
    default:
      return (
        <AuraMaxAscendantMark
          size={size}
          track={track}
          monochrome={monochrome}
          glow={glow}
          className={className}
        />
      );
  }
};

/**
 * Comprehensive Composite Logo (Mark + Wordmark)
 */
export const AuraMaxLogo: React.FC<AuraMaxLogoProps> = ({
  size = "md",
  concept = "concept-a",
  showWordmark = true,
  layout = "horizontal",
  glow = false,
  track = "male",
  monochrome = false,
  className = "",
}) => {
  const dimensions = React.useMemo(() => {
    if (typeof size === "number") {
      return { px: size, wordmarkSize: "md" as const, gap: "gap-2.5" };
    }
    switch (size) {
      case "xs":
        return { px: 22, wordmarkSize: "sm" as const, gap: "gap-1.5" };
      case "sm":
        return { px: 26, wordmarkSize: "sm" as const, gap: "gap-2" };
      case "md":
        return { px: 32, wordmarkSize: "md" as const, gap: "gap-2.5" };
      case "lg":
        return { px: 44, wordmarkSize: "lg" as const, gap: "gap-3.5" };
      case "xl":
        return { px: 60, wordmarkSize: "xl" as const, gap: "gap-4" };
      default:
        return { px: 32, wordmarkSize: "md" as const, gap: "gap-2.5" };
    }
  }, [size]);

  const isVertical = layout === "vertical";

  return (
    <div
      className={`inline-flex ${
        isVertical ? "flex-col items-center text-center" : "items-center"
      } ${dimensions.gap} select-none group ${className}`}
    >
      <AuraMaxEmblem
        width={dimensions.px}
        track={track}
        concept={concept}
        monochrome={monochrome}
        glow={glow}
        className="group-hover:scale-105 transition-transform duration-300 ease-out"
      />

      {showWordmark && (
        <AuraMaxWordmark
          track={track}
          size={dimensions.wordmarkSize}
          monochrome={monochrome}
        />
      )}
    </div>
  );
};
