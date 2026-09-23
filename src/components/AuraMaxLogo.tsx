import React from "react";

interface AuraMaxLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  showWordmark?: boolean;
  layout?: "horizontal" | "vertical";
  glow?: boolean;
  className?: string;
}

export const AuraMaxEmblem: React.FC<{
  width?: number;
  height?: number;
  glow?: boolean;
  className?: string;
}> = ({ width = 42, height = 42, glow = true, className = "" }) => {
  const filterId = React.useId();
  const gradAId = React.useId();
  const gradRingId = React.useId();
  const gradGlowId = React.useId();

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
      style={{
        filter: glow
          ? "drop-shadow(0 0 12px rgba(34,211,238,0.45)) drop-shadow(0 0 20px rgba(99,102,241,0.35))"
          : undefined,
      }}
    >
      <defs>
        {/* Main "A" gradient: Cyan to Indigo */}
        <linearGradient
          id={gradAId}
          x1="22"
          y1="20"
          x2="98"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="35%" stopColor="#38bdf8" />
          <stop offset="70%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* Orbital Ring gradient */}
        <linearGradient
          id={gradRingId}
          x1="15"
          y1="75"
          x2="105"
          y2="35"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="45%" stopColor="#38bdf8" />
          <stop offset="75%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* Subtle radial inner glow */}
        <radialGradient
          id={gradGlowId}
          cx="60"
          cy="60"
          r="45"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#6366f1" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
        </radialGradient>

        {/* Outer ambient glow filter */}
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient background aura sphere */}
      <circle cx="60" cy="60" r="50" fill={`url(#${gradGlowId})`} />

      {/* Back section of the Orbital Ring (passes behind the right leg of A) */}
      <path
        d="M 68 58 C 82 55 96 52 100 45 C 103 40 98 35 88 36 C 78 37 66 43 56 50"
        fill="none"
        stroke={`url(#${gradRingId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* The Central Iconic "A" Glyph */}
      <g filter={`url(#${filterId})`}>
        {/* Outer triangular form with sharp cyber cuts */}
        <path
          d="
            M 60 16
            L 89 82
            L 73 82
            L 64.5 61
            L 47.5 61
            L 50 54
            L 62 54
            L 60 48
            L 60 28
            Z
          "
          fill="none"
        />
        {/* Solid unified 'A' body */}
        <path
          d="
            M 60 16
            C 58.8 16 57.8 16.8 57.2 18.2
            L 28 82
            C 27.5 83.2 28.2 84.5 29.5 84.5
            L 42 84.5
            C 43.1 84.5 44 83.8 44.4 82.8
            L 50.8 66
            L 69.2 66
            L 75.6 82.8
            C 76 83.8 76.9 84.5 78 84.5
            L 90.5 84.5
            C 91.8 84.5 92.5 83.2 92 82
            L 62.8 18.2
            C 62.2 16.8 61.2 16 60 16
            Z
            M 60 34
            L 66.8 55
            L 53.2 55
            Z
          "
          fill={`url(#${gradAId})`}
        />
      </g>

      {/* Front section of the Orbital Ring (sweeps across front of left leg) */}
      <path
        d="M 24 72 C 34 70 48 64 68 57 C 82 52 94 48 99 44 C 102 41 100 37 92 38 C 84 39 72 45 60 52"
        fill="none"
        stroke={`url(#${gradRingId})`}
        strokeWidth="4.2"
        strokeLinecap="round"
      />

      {/* Dynamic orbital highlight cusp */}
      <path
        d="M 28 71.2 C 38 68.8 52 63 68 57.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Apex gleam star */}
      <circle cx="60" cy="18" r="1.8" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
};

export const AuraMaxLogo: React.FC<AuraMaxLogoProps> = ({
  size = "md",
  showWordmark = true,
  layout = "horizontal",
  glow = true,
  className = "",
}) => {
  const dimensions = React.useMemo(() => {
    if (typeof size === "number") {
      return { px: size, text: "text-lg", subtext: "text-[9px]", gap: "gap-2" };
    }
    switch (size) {
      case "xs":
        return { px: 26, text: "text-sm", subtext: "text-[8px]", gap: "gap-1.5" };
      case "sm":
        return { px: 32, text: "text-base", subtext: "text-[9px]", gap: "gap-2" };
      case "md":
        return { px: 42, text: "text-xl", subtext: "text-[10px]", gap: "gap-2.5" };
      case "lg":
        return { px: 56, text: "text-2xl", subtext: "text-xs", gap: "gap-3" };
      case "xl":
        return { px: 76, text: "text-3xl", subtext: "text-sm", gap: "gap-4" };
      default:
        return { px: 42, text: "text-xl", subtext: "text-[10px]", gap: "gap-2.5" };
    }
  }, [size]);

  const isVertical = layout === "vertical";

  return (
    <div
      className={`inline-flex ${
        isVertical ? "flex-col items-center text-center" : "items-center"
      } ${dimensions.gap} select-none group ${className}`}
    >
      {/* Emblem with hover micro-interaction */}
      <div className="relative flex items-center justify-center">
        <AuraMaxEmblem
          width={dimensions.px}
          height={dimensions.px}
          glow={glow}
          className="group-hover:scale-105 group-hover:rotate-1 transition-all duration-300 ease-out"
        />
      </div>

      {/* Luxurious Typography Wordmark */}
      {showWordmark && (
        <div className={`flex flex-col ${isVertical ? "items-center" : "items-start"}`}>
          <div className="flex items-center tracking-[0.2em] font-display font-extrabold leading-tight">
            {/* "AURA" in pure Ice/White */}
            <span className={`${dimensions.text} text-[#f4f4f5] transition-colors group-hover:text-white`}>
              AURA
            </span>
            {/* Space */}
            <span className="w-1.5" />
            {/* "MAX" with Electric Cyan to Indigo Gradient */}
            <span
              className={`${dimensions.text} bg-gradient-to-r from-[#22d3ee] via-[#38bdf8] to-[#6366f1] bg-clip-text text-transparent font-black drop-shadow-[0_0_8px_rgba(34,211,238,0.35)]`}
            >
              MAX
            </span>
          </div>

          {/* Subtitle / Clinical aesthetic indicator */}
          <span
            className={`${dimensions.subtext} tracking-[0.25em] uppercase text-slate-400 font-mono font-semibold transition-colors group-hover:text-slate-300`}
          >
            AESTHETICS &bull; ENGINE
          </span>
        </div>
      )}
    </div>
  );
};
