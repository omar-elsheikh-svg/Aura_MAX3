import React, { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  Plus, 
  Sparkles, 
  Sun, 
  Moon, 
  Zap, 
  Award,
  Clock,
  ShieldAlert,
  X,
  Droplets,
  Layers,
  Check,
  Bell,
  BellRing
} from "lucide-react";
import { Locale, Quest, GenderTrack } from "../types";
import { translations } from "../i18n/translations";
import { getLevelData } from "../utils/levelService";
import { fireMicroConfetti } from "../utils/confettiService";
import { Crown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface QuestsViewProps {
  locale: Locale;
  genderTrack?: GenderTrack;
  quests: Quest[];
  onToggleQuest: (id: string) => void;
  onAddQuest: (newQuest: Omit<Quest, "id" | "completed">) => void;
  streakDays: number;
  level?: number;
  xp?: number;
  nextLevelXp?: number;
  onTriggerLevelUpPreview?: () => void;
  onOpenSettings?: () => void;
  notificationsEnabled?: boolean;
}

export const QuestsView: React.FC<QuestsViewProps> = ({
  locale,
  genderTrack = "male",
  quests,
  onToggleQuest,
  onAddQuest,
  streakDays,
  level = 7,
  xp = 3420,
  nextLevelXp = 3500,
  onTriggerLevelUpPreview,
  onOpenSettings,
  notificationsEnabled = false,
}) => {
  const t = translations[locale];
  const isRtl = locale === "ar";
  const isFemale = genderTrack === "female";
  const levelData = getLevelData(xp);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"morning" | "evening" | "anytime">("morning");
  const [newXp, setNewXp] = useState(50);
  const [newDesc, setNewDesc] = useState("");

  // Water / Debloat hydration tracker state (persisted in local state)
  const [waterCount, setWaterCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("aura_water_count");
      return saved ? parseInt(saved, 10) : 4;
    } catch {
      return 4;
    }
  });

  const [addedPresetKey, setAddedPresetKey] = useState<string | null>(null);

  const completedQuests = quests.filter((q) => q.completed);
  const totalXpEarned = completedQuests.reduce((acc, q) => acc + q.xp, 0);
  const completionRate = Math.round((completedQuests.length / quests.length) * 100) || 0;

  const morningQuests = quests.filter((q) => q.category === "morning");
  const eveningQuests = quests.filter((q) => q.category === "evening");
  const anytimeQuests = quests.filter((q) => q.category === "anytime");

  const updateWater = (delta: number) => {
    setWaterCount((prev) => {
      const next = Math.max(0, Math.min(12, prev + delta));
      try {
        localStorage.setItem("aura_water_count", String(next));
      } catch {}
      return next;
    });
  };

  const handleCreateQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddQuest({
      title: { en: newTitle, ar: newTitle },
      category: newCategory,
      xp: newXp,
      frequency: "daily",
      description: {
        en: newDesc || "Custom personal daily looksmaxing quest.",
        ar: newDesc || "مهمة عناية وتطوير شخصية مخصصة."
      },
      iconName: "sparkles"
    });

    setNewTitle("");
    setNewDesc("");
    setShowAddModal(false);
  };

  // Preset protocol stacks tailored to gender track
  const presetStacks = isFemale ? [
    {
      key: "glass_skin",
      title: isRtl ? "بروتوكول البشرة الزجاجية وترميم الحاجز" : "Korean Glass Skin & Barrier Architecture",
      desc: isRtl ? "خلاصة التخمير + سيروم ببتيد + واقي شمس معدني + سيراميد" : "Ferment Essence + Multi-Peptide Glaze + SPF 50 + Ceramide Lock",
      quests: [
        {
          title: { en: "15% Pure Vitamin C + Hyaluronic Acid Glaze", ar: "سيروم فيتامين C النقي 15% مع الهيالورونيك لنضارة زجاجية" },
          category: "morning" as const,
          xp: 50,
          description: { en: "Neutralizes environmental free radicals and delivers radiant light reflection.", ar: "مضاد أكسدة قوي يوحد لون البشرة ويمنح انعكاساً مشرقاً كالمرآة." },
          iconName: "sparkles"
        },
        {
          title: { en: "Invisible Broad-Spectrum SPF 50+ Dermal Shield", ar: "واقي شمس واسع المدى SPF 50+ لحماية الكولاجين" },
          category: "morning" as const,
          xp: 50,
          description: { en: "Protects collagen elastin network from UV fragmentation and pigmentation.", ar: "يحمي شبكة الكولاجين ويمنع التصبغات والتجاعيد المبكرة." },
          iconName: "sun"
        },
        {
          title: { en: "Evening Double Cleanse & Quad-Ceramide Repair", ar: "التنظيف المزدوج المسائي مع مركب السيراميد المرمم" },
          category: "evening" as const,
          xp: 65,
          description: { en: "Dissolves SPF and pollutants while reinforcing lipid moisture barrier.", ar: "يذيب الشوائب دون تجريد حاجز البشرة ويرمم طبقات الترطيب." },
          iconName: "moon"
        }
      ]
    },
    {
      key: "guasha_sculpt",
      title: isRtl ? "نحت الوجنتين وتصريف السائل اللمفاوي" : "Zygomatic Gua Sha & Lymphatic Cheek Sculpt",
      desc: isRtl ? "تدليك الغوا شا + زيت السكوالين + كمادات باردة للعينين" : "Rose Quartz Gua Sha + Squalane Oil + Cryo Eye Drainage",
      quests: [
        {
          title: { en: "3-Minute Rose Quartz Gua Sha Cheek Sweep", ar: "تدليك الغوا شا لنحت الوجنتين وتصريف السوائل (3 دقائق)" },
          category: "morning" as const,
          xp: 75,
          description: { en: "Upward sweeps along zygomatic bone drain fluid stagnation to reveal cheekbones.", ar: "مسح للأعلى على طول عظام الوجنتين لرفع الخدود وإبراز النحت الطبيعي." },
          iconName: "sparkles"
        },
        {
          title: { en: "Cryo Ice Spoon Periorbital De-puff", ar: "تصريف وانتفاخ محيط العينين بالملاعق المثلجة" },
          category: "morning" as const,
          xp: 50,
          description: { en: "Smooth gentle glide from inner eye out to temple to enhance canthal tilt.", ar: "سحب لطيف من زاوية العين الداخلية للخارج لتحسين سحبة العينين." },
          iconName: "droplets"
        },
        {
          title: { en: "Mulberry Silk Pillowcase & Overnight Lip Mask", ar: "النوم على وسادة حرير التوت ومرطب الشفاه المغذي" },
          category: "evening" as const,
          xp: 45,
          description: { en: "Eliminates sleep creases and prevents fine periorbital friction lines.", ar: "يمنع تجاعيد النوم الناتجة عن احتكاك الوسادة ويحافظ على ترطيب الشفاه." },
          iconName: "moon"
        }
      ]
    },
    {
      key: "swan_posture",
      title: isRtl ? "استقامة الرقبة الملكية وأناقة عظام الترقوة" : "Swan Neck, Clavicle Grace & Cervical Reset",
      desc: isRtl ? "شد الرقبة على الجدار + فتح الأكتاف والترقوة + وضعية الهاتف" : "Wall Alignment Chin Tucks + Clavicle Chest Opener + Screen Eye Level",
      quests: [
        {
          title: { en: "Swan Neck & Cervical Wall Reset (3 sets x 15)", ar: "تمرين إطالة الرقبة على الجدار (3 مجموعات × 15 تكراراً)" },
          category: "morning" as const,
          xp: 60,
          description: { en: "Lengthens cervical silhouette and corrects tech-neck compression.", ar: "يطيل مظهر الرقبة ويصحح انحناء الهاتف للأمام." },
          iconName: "crosshair"
        },
        {
          title: { en: "Clavicle & Shoulder Blade Opening Stretches", ar: "تمرين فتح الصدر وإبراز عظام الترقوة" },
          category: "anytime" as const,
          xp: 55,
          description: { en: "Opens the thoracic chest and defines the elegant clavicle line.", ar: "يفتح القفص الصدري ويبرز عظام الترقوة بنعومة وأناقة فائقة." },
          iconName: "userCheck"
        }
      ]
    }
  ] : [
    {
      key: "jawline",
      title: t.quests.presetJawline,
      desc: isRtl ? "ميونج متقدم + شد الذقن + تدليك الحافة السفلية" : "Hard Mewing + Chin Tucks + Mandibular Sweep",
      quests: [
        {
          title: { en: "Doorway Chin Tucks (3 sets x 15 reps)", ar: "تمرين شد الذقن والرقبة (3 مجموعات × 15 تكراراً)" },
          category: "morning" as const,
          xp: 60,
          description: { en: "Counters forward head posture to dramatically sharpen the jaw-neck angle.", ar: "يعالج ميلان الرقبة للأمام ويحدد زاوية الفك مع الرقبة." },
          iconName: "crosshair"
        },
        {
          title: { en: "Continuous Mewing (Suction Hold)", ar: "تطبيق وضعية الميونج (إلصاق اللسان بسقف الحلق)" },
          category: "anytime" as const,
          xp: 75,
          description: { en: "Tongue rested firmly against the palate for maxillary and cheekbone support.", ar: "تثبيت ثلثي اللسان في سقف الحلق لدعم عظام الفك والوجنتين." },
          iconName: "zap"
        },
        {
          title: { en: "Ice Roll / Gua Sha Contour Sweep", ar: "تدليك حافة الفك بحجر الغوا شا أو الثلج" },
          category: "evening" as const,
          xp: 50,
          description: { en: "Upward strokes towards lymph nodes to eliminate submental puffiness.", ar: "حركات تصريف لمفاوي للأعلى نحو العقد اللمفاوية لشد محيط الفك." },
          iconName: "shield"
        }
      ]
    },
    {
      key: "skin",
      title: t.quests.presetSkin,
      desc: isRtl ? "واقي شمس + ريتينول + ترطيب مضاد للأكسدة" : "Broad-spectrum SPF 50 + Retinol + Ceramide Shield",
      quests: [
        {
          title: { en: "Broad Spectrum SPF 50+ Matte Shield", ar: "وضع واقي شمس SPF 50+ خالي من اللمعان" },
          category: "morning" as const,
          xp: 50,
          description: { en: "Shields against UV collagen fragmentation and premature laxity.", ar: "يحمي ألياف الكولاجين من التكسر والتصبغات الناتجة عن الشمس." },
          iconName: "sun"
        },
        {
          title: { en: "10% Vitamin C + Hyaluronic Glass Serum", ar: "سيروم فيتامين C وحمض الهيالورونيك" },
          category: "morning" as const,
          xp: 50,
          description: { en: "Potent topical antioxidant stack for clear, light-reflective skin tone.", ar: "مضادات أكسدة مركزة تعطي توهجاً وعكساً نقياً للضوء." },
          iconName: "sparkles"
        },
        {
          title: { en: "Evening Retinol / Barrier Repair Cream", ar: "كريم ريتينول مسائي مع مرطب السيراميد" },
          category: "evening" as const,
          xp: 60,
          description: { en: "Accelerates cell turnover and boosts epidermal density while sleeping.", ar: "يسرع تجدد خلايا البشرة ويزيد كثافتها أثناء النوم العميق." },
          iconName: "moon"
        }
      ]
    },
    {
      key: "debloat",
      title: t.quests.presetDebloat,
      desc: isRtl ? "طرد الصوديوم المحتبس + ثلج صباحي + تنفس أنفي" : "Electrolyte Balance + Cold Compress + 100% Nasal Breathing",
      quests: [
        {
          title: { en: "Cold Water Face Immersion / Ice Cube", ar: "غمر الوجه بالماء المثلج أو مكعب ثلج (دقيقتين)" },
          category: "morning" as const,
          xp: 50,
          description: { en: "Rapid vasoconstriction to eliminate morning cheek and eye puffiness.", ar: "انقباض فوري للأوعية لإزالة الانتفاخ الصباحي من الخدود وتحت العينين." },
          iconName: "droplets"
        },
        {
          title: { en: "Low Sodium & Potassium Rich Lunch", ar: "وجبة غنية بالبوتاسيوم ومنخفضة الصوديوم" },
          category: "anytime" as const,
          xp: 60,
          description: { en: "Flushes intracellular water retention to unveil cheekbone hollows.", ar: "يساعد على طرد السوائل المحتبسة لإظهار تجاويف الخدود الطبيعية." },
          iconName: "flame"
        },
        {
          title: { en: "Strict Nasal Breathing & Mouth Tape Check", ar: "التنفس الأنفي التام مع شريط النوم الفموي" },
          category: "evening" as const,
          xp: 65,
          description: { en: "Prevents mouth breathing laxity, dry lips, and submental sagging overnight.", ar: "يمنع التنفس من الفم وترهل زاوية الفك وجفاف الشفاه أثناء النوم." },
          iconName: "shieldCheck"
        }
      ]
    }
  ];

  const handleApplyPreset = (stack: typeof presetStacks[0]) => {
    stack.quests.forEach((q) => {
      onAddQuest({
        title: q.title,
        category: q.category,
        xp: q.xp,
        frequency: "daily",
        description: q.description,
        iconName: q.iconName
      });
    });

    setAddedPresetKey(stack.key);
    setTimeout(() => setAddedPresetKey(null), 3000);
  };

  const renderQuestSection = (
    title: string,
    icon: React.ReactNode,
    items: Quest[],
    colorClass: string
  ) => {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="text-sm font-bold text-[#f4f4f5] tracking-wide">
              {title}
            </h3>
          </div>
          <span className="text-xs font-mono text-[#a1a1aa]">
            {items.filter((i) => i.completed).length} / {items.length}
          </span>
        </div>

        <div className="space-y-2.5">
          {items.map((quest) => {
            const isDone = quest.completed;
            return (
              <div
                key={quest.id}
                onClick={(e) => {
                  if (!isDone) {
                    try {
                      fireMicroConfetti(
                        e.clientX ? e.clientX / window.innerWidth : 0.5,
                        e.clientY ? e.clientY / window.innerHeight : 0.6
                      );
                    } catch {}
                  }
                  onToggleQuest(quest.id);
                }}
                className={`group p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 cursor-pointer select-none ${
                  isDone
                    ? "bg-[#09090b]/80 border-emerald-500/30 opacity-80"
                    : "bg-[#18181b] hover:bg-[#1f1f23] border-[#27272a] hover:border-[#22d3ee]/40 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button className="mt-0.5 text-[#a1a1aa] group-hover:text-[#22d3ee] transition-colors cursor-pointer">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#71717a] hover:text-[#22d3ee]" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <h4
                      className={`text-xs sm:text-sm font-bold transition-all ${
                        isDone
                          ? "text-[#71717a] line-through"
                          : "text-[#f4f4f5] group-hover:text-[#22d3ee]"
                      }`}
                    >
                      {quest.title[locale]}
                    </h4>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed line-clamp-2">
                      {quest.description[locale]}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#6366f1]/15 border border-[#6366f1]/30 text-[#818cf8] text-xs font-mono font-bold shadow-sm shadow-[#6366f1]/10">
                  <Zap className="w-3.5 h-3.5 fill-[#818cf8]" />
                  <span>+{quest.xp}</span>
                </div>
              </div>
            );
          })}

          {items.length === 0 && (
            <div className="p-4 rounded-2xl border border-dashed border-[#27272a] text-center text-xs text-[#71717a]">
              {isRtl ? "لا توجد مهام في هذا القسم حالياً." : "No quests active in this section."}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Title & Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/30 text-[#818cf8] text-xs font-bold tracking-wider uppercase mb-2 shadow-[0_0_12px_rgba(99,102,241,0.15)]">
            <Flame className="w-3.5 h-3.5 fill-[#fb923c] text-[#fb923c]" />
            <span>{t.quests.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f4f4f5] font-display">
            {t.quests.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1 max-w-xl">
            {t.quests.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#22d3ee] text-[#09090b] font-extrabold text-xs shadow-lg shadow-[#22d3ee]/20 transition-all cursor-pointer active:scale-95 hover:brightness-110"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>{t.quests.addCustom}</span>
        </button>
      </div>

      {/* Level Progression & Aesthetic Tier Ascension Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#18181b] via-[#111113] to-[#18181b] border border-[#27272a] hover:border-[#22d3ee]/30 p-5 sm:p-6 shadow-[0_0_30px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300">
        {/* Subtle Ambient Radial Lighting */}
        <div 
          aria-hidden="true" 
          className="absolute top-0 right-0 w-72 h-72 bg-[#22d3ee]/5 blur-3xl pointer-events-none -z-10" 
        />
        <div 
          aria-hidden="true" 
          className="absolute bottom-0 left-0 w-72 h-72 bg-[#6366f1]/5 blur-3xl pointer-events-none -z-10" 
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Animated Level Icon Badge */}
            <div className="relative shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-b from-[#1f1f23] to-[#09090b] border border-[#22d3ee]/40 shadow-[0_0_20px_rgba(34,211,238,0.2)] flex flex-col items-center justify-center select-none">
              <span className="text-xl leading-none">{levelData.tierInfo.badge}</span>
              <span className="text-[10px] font-mono font-black text-[#22d3ee] mt-0.5">
                LVL {levelData.level}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-[#818cf8] uppercase tracking-wider">
                  {t.quests.tierLabel || "Aura Tier"}:
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#f4f4f5] font-display">
                  {levelData.tierInfo.title[locale]}
                </h3>
              </div>
              <p className="text-xs text-[#a1a1aa] max-w-md">
                {levelData.tierInfo.auraDescription[locale]}
              </p>
            </div>
          </div>

          {/* Quick Preview Celebration FX Button */}
          {onTriggerLevelUpPreview && (
            <button
              onClick={onTriggerLevelUpPreview}
              className="self-start sm:self-center flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#111113] hover:bg-[#1f1f23] border border-[#22d3ee]/30 hover:border-[#22d3ee] text-[#22d3ee] text-xs font-bold transition-all shadow-sm shadow-[#22d3ee]/10 active:scale-95 cursor-pointer"
              title={t.quests.previewLevelUp || "Preview Level-Up FX"}
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{t.quests.previewLevelUp || "Preview Level-Up FX"}</span>
            </button>
          )}
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#e4e4e7] font-semibold flex items-center gap-1.5">
              <span>{xp.toLocaleString()} XP</span>
              <span className="text-[#71717a] font-normal">/</span>
              <span className="text-[#a1a1aa] font-normal">{levelData.nextLevelXp.toLocaleString()} XP</span>
            </span>
            <span className="text-[#22d3ee] font-bold">
              {levelData.progressPercent}%
            </span>
          </div>

          <div className="relative w-full h-2.5 bg-[#09090b] rounded-full overflow-hidden border border-[#27272a]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelData.progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#22d3ee] rounded-full relative"
            >
              {/* Shimmer overlay line */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-pulse" />
            </motion.div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#a1a1aa]">
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <Zap className="w-3 h-3" />
              <span>
                {t.quests.xpNeeded
                  ? t.quests.xpNeeded.replace("{xp}", String(levelData.xpRemaining)).replace("{next}", String(levelData.level + 1))
                  : `${levelData.xpRemaining} XP needed to reach Level ${levelData.level + 1}`}
              </span>
            </span>
            <span className="font-mono text-[#71717a]">
              Next: Level {levelData.level + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Progress & Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#18181b] rounded-2xl p-4 border border-[#27272a]">
          <span className="text-[11px] uppercase font-bold text-[#a1a1aa]">
            {t.quests.completedCount}
          </span>
          <div className="text-xl font-extrabold text-[#f4f4f5] mt-1 font-display">
            {completedQuests.length} <span className="text-xs text-[#a1a1aa] font-normal">/ {quests.length}</span>
          </div>
          <div className="w-full h-1.5 bg-[#111113] rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-[#22d3ee] to-[#6366f1] rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        <div className="bg-[#18181b] rounded-2xl p-4 border border-[#27272a]">
          <span className="text-[11px] uppercase font-bold text-[#a1a1aa]">
            {t.quests.earnedToday}
          </span>
          <div className="text-xl font-extrabold text-[#818cf8] mt-1 font-display flex items-center gap-1.5">
            <Zap className="w-5 h-5 fill-[#818cf8]" />
            <span>+{totalXpEarned} XP</span>
          </div>
          <span className="text-[10px] text-[#71717a] block mt-1">
            {completionRate}% {isRtl ? "معدل الإنجاز" : "completed"}
          </span>
        </div>

        <div className="bg-[#18181b] rounded-2xl p-4 border border-[#27272a]">
          <span className="text-[11px] uppercase font-bold text-[#a1a1aa]">
            {t.app.streak}
          </span>
          <div className="text-xl font-extrabold text-[#f4f4f5] mt-1 font-display flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-[#fb923c] fill-[#fb923c]" />
            <span>{streakDays} {isRtl ? "أيام" : "Days"}</span>
          </div>
          <span className="text-[10px] text-emerald-400 block mt-1">
            {isRtl ? "السلسلة محمية" : "Streak Protected"}
          </span>
        </div>

        <div className="bg-[#18181b] rounded-2xl p-4 border border-[#27272a]">
          <span className="text-[11px] uppercase font-bold text-[#a1a1aa]">
            {isRtl ? "انضباط الأورا" : "Aura Discipline"}
          </span>
          <div className="text-xl font-extrabold text-[#22d3ee] mt-1 font-display">
            {completionRate === 100 ? "MAX (100%)" : `${completionRate}%`}
          </div>
          <span className="text-[10px] text-[#a1a1aa] block mt-1">
            {completionRate === 100 ? (isRtl ? "اكتمل الروتين بالكامل" : "All rituals completed") : (isRtl ? "قيد التنفيذ اليومي" : "In progress today")}
          </span>
        </div>
      </div>

      {/* Daily Quest Browser Notifications Reminder Banner */}
      {onOpenSettings && (
        <div className="bg-[#18181b] hover:bg-[#1f1f23] border border-[#27272a] hover:border-[#22d3ee]/30 transition-all rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
              notificationsEnabled 
                ? "bg-[#22d3ee]/15 border border-[#22d3ee]/40 text-[#22d3ee] shadow-[0_0_15px_rgba(34,211,238,0.2)]" 
                : "bg-[#111113] border border-[#27272a] text-[#a1a1aa]"
            }`}>
              {notificationsEnabled ? <BellRing className="w-5 h-5 text-[#22d3ee] animate-pulse" /> : <Bell className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#f4f4f5] font-display">
                  {t.settings.notificationsSection}
                </h3>
                {notificationsEnabled ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {t.settings.granted}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#111113] text-[#71717a] border border-[#27272a]">
                    {isRtl ? "غير مفعل" : "Disabled"}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#a1a1aa] mt-0.5 max-w-lg leading-relaxed">
                {t.settings.notificationsDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSettings}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-sm ${
              notificationsEnabled
                ? "bg-[#111113] hover:bg-[#1f1f23] text-[#e4e4e7] border border-[#27272a] hover:border-[#22d3ee]/40"
                : "bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#22d3ee] text-[#09090b] hover:opacity-95 shadow-[#22d3ee]/20"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{notificationsEnabled ? (isRtl ? "إعدادات التذكير" : "Notification Settings") : (isRtl ? "تفعيل التنبيهات" : "Enable Daily Reminders")}</span>
          </button>
        </div>
      )}

      {/* Hydration & Debloat Counter Card */}
      <div className="bg-gradient-to-br from-[#18181b] via-[#111113] to-[#18181b] rounded-3xl p-5 border border-[#22d3ee]/20 shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#22d3ee]/15 border border-[#22d3ee]/40 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5 text-[#22d3ee]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#f4f4f5] font-display">
                {t.quests.waterTitle}
              </h3>
              <p className="text-xs text-[#a1a1aa] mt-0.5 max-w-md">
                {t.quests.waterSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="text-end">
              <div className="text-lg font-black text-[#22d3ee] font-mono">
                {waterCount} / 8 <span className="text-xs text-[#a1a1aa] font-normal">{t.quests.glasses}</span>
              </div>
              <span className="text-[10px] text-[#a1a1aa]">
                {waterCount >= 8 ? (isRtl ? "طرد الصوديوم مثالي" : "Debloat Target Achieved") : (isRtl ? "متبقي لتصريف السوائل" : "Keep drinking to debloat")}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-[#09090b] p-1 rounded-xl border border-[#27272a]">
              <button
                onClick={() => updateWater(-1)}
                className="w-8 h-8 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-[#e4e4e7] font-bold flex items-center justify-center transition-colors text-sm cursor-pointer"
              >
                -
              </button>
              <button
                onClick={() => updateWater(1)}
                className="w-8 h-8 rounded-lg bg-[#22d3ee] hover:bg-[#38bdf8] text-[#09090b] font-bold flex items-center justify-center transition-colors text-sm cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Glasses Visual Meter */}
        <div className="grid grid-cols-8 gap-1.5 mt-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx < waterCount ? "bg-[#22d3ee] shadow-sm shadow-[#22d3ee]/50" : "bg-[#27272a]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Preset Protocol Stacks Bar (One-click installation of proven routines) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#22d3ee]" />
          <h3 className="text-sm font-bold text-[#f4f4f5] tracking-wide uppercase">
            {t.quests.presetStacksTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {presetStacks.map((stack) => {
            const isAdded = addedPresetKey === stack.key;
            return (
              <div
                key={stack.key}
                className="bg-[#18181b] rounded-2xl p-4 border border-[#27272a] hover:border-[#22d3ee]/30 flex flex-col justify-between gap-3 transition-colors"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#f4f4f5]">
                    {stack.title}
                  </h4>
                  <p className="text-[11px] text-[#a1a1aa] mt-1 leading-relaxed">
                    {stack.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleApplyPreset(stack)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isAdded
                      ? "bg-emerald-500 text-[#09090b]"
                      : "bg-[#111113] hover:bg-[#1f1f23] text-[#22d3ee] border border-[#22d3ee]/30 shadow-sm"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{isRtl ? "تمت الإضافة بنجاح!" : "Stack Added!"}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t.quests.addPresetBtn}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rituals Sections */}
      <div className="space-y-8">
        {renderQuestSection(
          t.quests.morningHeader,
          <Sun className="w-4 h-4 text-[#22d3ee]" />,
          morningQuests,
          "text-[#22d3ee]"
        )}

        {renderQuestSection(
          t.quests.eveningHeader,
          <Moon className="w-4 h-4 text-[#818cf8]" />,
          eveningQuests,
          "text-[#818cf8]"
        )}

        {renderQuestSection(
          t.quests.anytimeHeader,
          <Clock className="w-4 h-4 text-emerald-400" />,
          anytimeQuests,
          "text-emerald-400"
        )}
      </div>

      {/* Add Custom Quest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18181b] w-full max-w-md rounded-3xl border border-[#27272a] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#f4f4f5] font-display">
                {t.quests.customModalTitle}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#a1a1aa] hover:text-[#f4f4f5] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuest} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">
                  {t.quests.customTitleLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isRtl ? "مثال: تدليك الرقبة لمدة 3 دقائق" : "e.g. 3-Min Neck Extension Stretch"}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3 py-2 text-[#f4f4f5] focus:outline-none focus:border-[#22d3ee]"
                />
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">
                  {t.quests.customCatLabel}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3 py-2 text-[#f4f4f5] focus:outline-none focus:border-[#22d3ee]"
                >
                  <option value="morning">{t.quests.morningHeader}</option>
                  <option value="evening">{t.quests.eveningHeader}</option>
                  <option value="anytime">{t.quests.anytimeHeader}</option>
                </select>
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">
                  {t.quests.customXpLabel}
                </label>
                <input
                  type="number"
                  min="20"
                  max="150"
                  step="10"
                  value={newXp}
                  onChange={(e) => setNewXp(Number(e.target.value))}
                  className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3 py-2 text-[#f4f4f5] focus:outline-none focus:border-[#22d3ee]"
                />
              </div>

              <div>
                <label className="block text-[#e4e4e7] font-semibold mb-1">
                  {isRtl ? "الوصف والهدف" : "Description / Purpose"}
                </label>
                <textarea
                  rows={2}
                  placeholder={isRtl ? "ما هو التأثير الجمالي لهذه المهمة؟" : "What aesthetic benefit does this ritual bring?"}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3 py-2 text-[#f4f4f5] focus:outline-none focus:border-[#22d3ee]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-[#a1a1aa] hover:text-[#f4f4f5] cursor-pointer"
                >
                  {t.quests.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#22d3ee] text-[#09090b] font-bold shadow-md shadow-[#22d3ee]/20 cursor-pointer hover:brightness-110"
                >
                  {t.quests.customAddBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
