export interface LevelTierInfo {
  title: { en: string; ar: string };
  badge: string;
  color: string;
  glowColor: string;
  auraDescription: { en: string; ar: string };
}

export const XP_PER_LEVEL = 500;

export const LEVEL_TIERS: Record<number, LevelTierInfo> = {
  1: {
    title: { en: "Aura Initiate", ar: "مبتدئ الأورا" },
    badge: "🌱",
    color: "#94a3b8",
    glowColor: "rgba(148, 163, 184, 0.4)",
    auraDescription: {
      en: "First steps into non-invasive aesthetic habit stacking.",
      ar: "الخطوات الأولى في بناء عادات التناسق والجمال الطبيعي."
    }
  },
  2: {
    title: { en: "Dermal Novice", ar: "نحات البشرة" },
    badge: "✨",
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    auraDescription: {
      en: "Consistent sun shield and cellular hydration established.",
      ar: "ترسيخ حماية البشرة والترطيب الخلوي المستمر."
    }
  },
  3: {
    title: { en: "Jawline Striker", ar: "محدد الفك" },
    badge: "⚡",
    color: "#22d3ee",
    glowColor: "rgba(34, 211, 238, 0.45)",
    auraDescription: {
      en: "Mandibular angle definition taking shape via disciplined mewing.",
      ar: "بروز زاوية الفك السفلي بفضل الاستمرار في وضعية الميونج."
    }
  },
  4: {
    title: { en: "Posture Sentinel", ar: "حارس القوام" },
    badge: "🛡️",
    color: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.45)",
    auraDescription: {
      en: "Cervical spine alignment reducing forward head tilt.",
      ar: "استقامة الفقرات العنقية وتراجع ميلان الرقبة للأمام."
    }
  },
  5: {
    title: { en: "Symmetry Artisan", ar: "فنان التناظر" },
    badge: "💎",
    color: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.45)",
    auraDescription: {
      en: "Balanced facial thirds and controlled masticatory symmetry.",
      ar: "توازن الثلث السفلي والأوسط للوجه مع تماثل عضلات الفك."
    }
  },
  6: {
    title: { en: "Biometric Prodigy", ar: "النخبة البيومترية" },
    badge: "🔮",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.45)",
    auraDescription: {
      en: "Submental puffiness eliminated through disciplined lymphatic flush.",
      ar: "اختفاء انتفاخ أسفل الذقن بفضل التصريف اللمفاوي المنتظم."
    }
  },
  7: {
    title: { en: "Glow Specialist", ar: "أخصائي التوهج" },
    badge: "🔥",
    color: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.45)",
    auraDescription: {
      en: "Light-reflective skin barrier and hollow cheekbone clarity.",
      ar: "بشرة زجاجية عاكسة للضوء مع وضوح تجويف الخدين الطبيعي."
    }
  },
  8: {
    title: { en: "Ascended Aesthetician", ar: "خبير الأورا المتألق" },
    badge: "👑",
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.5)",
    auraDescription: {
      en: "Elite mastery over daily rituals, sleep quality, and facial biomechanics.",
      ar: "إتقان فائق للطقوس اليومية، جودة النوم، وميكانيكا عضلات الوجه."
    }
  },
  9: {
    title: { en: "Apex Titan", ar: "قمة الجاذبية والتناسق" },
    badge: "⚡",
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.5)",
    auraDescription: {
      en: "Near-flawless facial thirds harmony and sharp gonial definition.",
      ar: "تناغم مثالي في مقاييس الوجه وزاوية فك حادة ومنحوتة."
    }
  },
  10: {
    title: { en: "Aura Immortal", ar: "أسطورة الأورا الخالدة" },
    badge: "🌟",
    color: "#22d3ee",
    glowColor: "rgba(34, 211, 238, 0.6)",
    auraDescription: {
      en: "Peak aesthetic potential unlocked through unwavering dedication.",
      ar: "تحقيق أقصى إمكانات الجمال والجاذبية الطبيعية بدون انقطاع."
    }
  }
};

export function getTierInfo(level: number): LevelTierInfo {
  if (LEVEL_TIERS[level]) {
    return LEVEL_TIERS[level];
  }
  if (level > 10) {
    return {
      title: { en: `Aura Grandmaster Lv.${level}`, ar: `أستاذ الأورا الأعظم رتبة ${level}` },
      badge: "⚜️",
      color: "#22d3ee",
      glowColor: "rgba(34, 211, 238, 0.6)",
      auraDescription: {
        en: "Transcendental discipline in daily looksmaxing and wellness.",
        ar: "انضباط أسطوري واستمرارية استثنائية في العناية والتطوير."
      }
    };
  }
  return LEVEL_TIERS[1];
}

export interface LevelData {
  level: number;
  nextLevelXp: number;
  currentLevelBaseXp: number;
  xpIntoCurrentLevel: number;
  xpRequiredForCurrentLevel: number;
  progressPercent: number;
  xpRemaining: number;
  tierInfo: LevelTierInfo;
}

/**
 * Calculates current level, progression percentage, and XP boundaries.
 * Level 1: 0 - 500 XP
 * Level 2: 500 - 1000 XP
 * ...
 * Level 7: 3000 - 3500 XP (3420 XP -> 84% progress, 80 XP to Level 8)
 * Level 8: 3500 - 4000 XP
 */
export function getLevelData(totalXp: number): LevelData {
  const level = Math.max(1, Math.floor(totalXp / XP_PER_LEVEL) + 1);
  const currentLevelBaseXp = (level - 1) * XP_PER_LEVEL;
  const nextLevelXp = level * XP_PER_LEVEL;
  const xpIntoCurrentLevel = Math.max(0, totalXp - currentLevelBaseXp);
  const xpRequiredForCurrentLevel = nextLevelXp - currentLevelBaseXp;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((xpIntoCurrentLevel / xpRequiredForCurrentLevel) * 100))
  );
  const xpRemaining = Math.max(0, nextLevelXp - totalXp);

  return {
    level,
    nextLevelXp,
    currentLevelBaseXp,
    xpIntoCurrentLevel,
    xpRequiredForCurrentLevel,
    progressPercent,
    xpRemaining,
    tierInfo: getTierInfo(level),
  };
}
