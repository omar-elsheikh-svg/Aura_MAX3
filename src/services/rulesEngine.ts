import { 
  GenderTrack, 
  UserGoal, 
  TimeBudget, 
  BudgetLevel, 
  TransformationPlan, 
  Quest, 
  ScanResult, 
  WeeklyReview 
} from "../types";

export interface PlanGenerationInput {
  genderTrack: GenderTrack;
  primaryGoal: UserGoal;
  secondaryGoal?: UserGoal;
  timeBudget: TimeBudget;
  budgetLevel: BudgetLevel;
  scanResult?: ScanResult | null;
}

export function generateTransformationPlan(input: PlanGenerationInput): TransformationPlan {
  const { genderTrack, primaryGoal, secondaryGoal, timeBudget, budgetLevel, scanResult } = input;
  const isFemale = genderTrack === "female";

  // Calculate estimated daily time in minutes
  const dailyMinutes = timeBudget === "5m" ? 5 : timeBudget === "15m" ? 15 : 30;

  // Plan titles & weekly objectives according to primary goal
  const planDefinitions: Record<UserGoal, {
    title: { en: string; ar: string };
    summary: { en: string; ar: string };
    weeklyObjective: { en: string; ar: string };
    prioritizationReason: { en: string; ar: string };
  }> = {
    face: {
      title: {
        en: isFemale ? "Facial Sculpting & Lymphatic Harmony" : "Mandibular Definition & Structural Alignment",
        ar: isFemale ? "نحت ملامح الوجه والتصريف اللمفاوي" : "تحديد خط الفك واستقامة الرقبة",
      },
      summary: {
        en: isFemale 
          ? "Target submental debloating, high cheekbone drainage, and swan neck alignment to accentuate feminine contours."
          : "Focus on reducing sodium retention, conditioning cervical posture (chin tucks), and proper palatal tongue rest (mewing).",
        ar: isFemale
          ? "التركيز على طرد احتباس السوائل وتدليك الوجنتين واستقامة الرقبة الملكية لإبراز التناسق الأنثوي الطبيعي."
          : "التركيز على خفض احتباس الصوديوم، وتدريب استقامة الرقبة (Chin Tucks)، ووضعية اللسان السليمة بسقف الحلق.",
      },
      weeklyObjective: {
        en: isFemale ? "Complete 7 days of morning rose quartz gua sha & debloat hydration." : "Execute daily chin tucks (3x15) and continuous palatal tongue posture.",
        ar: isFemale ? "إتمام 7 أيام من تدليك الغوا شا الصباحي وشرب الماء المتوازن لطرد الانتفاخ." : "تنفيذ تمرين Chin Tucks يومياً وتثبيت وضعية اللسان الصحيحة بسقف الفم.",
      },
      prioritizationReason: {
        en: scanResult 
          ? `Selected based on your ${scanResult.gonialAngle} gonial measurement and ${scanResult.jawlineScore}/100 jaw definition insight.`
          : "Directly addresses submental puffiness and structural posture for immediate non-invasive impact.",
        ar: scanResult
          ? `تم تحديده وفقاً لزاوية الفك المقاسة (${scanResult.gonialAngle}) ومؤشر تحديد الملامح (${scanResult.jawlineScore}/100).`
          : "يعالج انتفاخ الوجه واستقامة الرقبة بشكل فوري ومستدام دون تدخلات جراحية.",
      },
    },
    skin: {
      title: {
        en: isFemale ? "Korean Glass Skin & Barrier Restoration" : "Skin Clarity & Dermal Protection Stack",
        ar: isFemale ? "البشرة الزجاجية وترميم الحاجز الواقي" : "نقاء البشرة وحماية الكولاجين",
      },
      summary: {
        en: isFemale
          ? "Hydration layering with ferment essences, barrier peptides, and non-greasy broad spectrum SPF 50+."
          : "Core dermal triad: gentle morning cleanse, daily matte SPF 50+, and evening micro-retinol cell turnover.",
        ar: isFemale
          ? "ترطيب طبقي بمستخلصات التخمير والببتيدات مع حماية فائقة من الشمس بواقي SPF 50+ خفيف."
          : "الثلاثي الجلدي الأساسي: غسول لطيف، واقي شمس SPF 50+ يومي غير لامع، وريتينول خفيف مساءً.",
      },
      weeklyObjective: {
        en: "Consistent daily morning SPF 50+ application and double cleansing in the evening.",
        ar: "المواظبة اليومية على واقي الشمس SPF 50+ صباحاً والتنظيف المزدوج مساءً.",
      },
      prioritizationReason: {
        en: scanResult
          ? `Tailored to your dermal score of ${scanResult.skinScore}/100 and environmental hydration balance.`
          : "Protects collagen against photo-aging and establishes high surface reflectance.",
        ar: scanResult
          ? `مخصص بناءً على تقييم نضارة البشرة (${scanResult.skinScore}/100) والحفاظ على توازن الرطوبة.`
          : "يحمي ألياف الكولاجين من التلف الضوئي ويمنح البشرة لمعاناً صحياً طبيعياً.",
      },
    },
    hair: {
      title: {
        en: isFemale ? "Feminine Hair Volume & Scalp Density" : "Hairstyle Framing & Density Optimization",
        ar: isFemale ? "كثافة الشعر وتأطير الملامح الأنثوية" : "هندسة تسريحة الشعر وتكثيف الفروة",
      },
      summary: {
        en: isFemale
          ? "Scalp micro-circulation massage, rosemary oil pre-wash rituals, and face-framing butterfly cut styling."
          : "Scalp stimulation, low-heat matte styling matching facial shape proportions, and natural rosemary extracts.",
        ar: isFemale
          ? "تدليك تنشيط الفروة، وزيت إكليل الجبل قبل الاستحمام، وقصات تأطير الملامح المنسدلة."
          : "تنشيط البصيلات، واستخدام مصففات مات طبيعية تناسب شكل الجمجمة ومقاييس الوجه.",
      },
      weeklyObjective: {
        en: "Perform 3x weekly scalp tension release massage and adopt appropriate face shape styling.",
        ar: "تنفيذ تدليك الفروة 3 مرات أسبوعياً واعتماد تسريحة شعر متوازنة مع شكل الوجه.",
      },
      prioritizationReason: {
        en: "Frames upper facial third proportions and creates instant vertical harmony.",
        ar: "يوازن أبعاد الثلث العلوي للوجه ويمنح تأطيراً جمالياً متناسقاً فورياً.",
      },
    },
    grooming: {
      title: {
        en: isFemale ? "Eyebrow Architecture & Eye Poise" : "Precision Mandibular Beard & Eyebrow Architecture",
        ar: isFemale ? "هندسة الحواجب وإبراز سحبة العينين" : "تحديد اللحية الرجولية وهندسة الحواجب",
      },
      summary: {
        en: isFemale
          ? "Feathered brow arch lift, spoolie brushing, and cold spoon orbital drainage to elevate canthal tilt perception."
          : "Sharp 3-4mm beard neckline fading to reinforce gonial angle contrast and upward eyebrow grooming.",
        ar: isFemale
          ? "رفع قوس الحاجب الطبيعي، تمشيط الشعيرات للأعلى، والتبريد الموضعي لإبراز سحبة العينين."
          : "تحديد خط الرقبة للحية بدقة بـ 3-4 ملم لإبراز زاوية الفك، وتمشيط الحواجب بزاوية 45°.",
      },
      weeklyObjective: {
        en: isFemale ? "Practice daily upward brow lift grooming and cold orbital drainage." : "Maintain razor-clean neckline 2 finger-widths above Adam's apple twice weekly.",
        ar: isFemale ? "تمشيط الحواجب الصباحي وتدليك محيط العين البارد يومياً." : "الحفاظ على تحديد دقيق للحية أعلى تفاحة آدم بإصبعين مرتين أسبوعياً.",
      },
      prioritizationReason: {
        en: "Grooming provides the highest return on contrast and perceived symmetry in minutes.",
        ar: "العناية والتحديد توفر أعلى تباين بصري وتحسن التناسق الملحوظ في دقائق معدودة.",
      },
    },
    style: {
      title: {
        en: isFemale ? "Postural Poise & Harmonious Aesthetic" : "Cervical Alignment & Aesthetic Presence",
        ar: isFemale ? "الاستقامة الملكية والجاذبية الشاملة" : "استقامة القامة وحضور الهيبة الرجولية",
      },
      summary: {
        en: isFemale
          ? "Wall posture drills to open thoracic cage, collarbone accentuation, and graceful neck elongation."
          : "Correction of forward head posture, opening thoracic chest width, and commanding calm eye contact.",
        ar: isFemale
          ? "تمارين استقامة الظهر على الجدار، إبراز عظام الترقوة، واستطالة الرقبة الملكية الرشيقة."
          : "تصحيح ميلان الرأس للأمام، فرد الأكتاف لزيادة عرض الصدر، والنظرة الواثقة المستقرة.",
      },
      weeklyObjective: {
        en: "Do 3 minutes of wall posture check every morning and evening.",
        ar: "تطبيق فحص استقامة الظهر على الجدار لمدة 3 دقائق صباحاً ومساءً.",
      },
      prioritizationReason: {
        en: "Posture directly dictates jawline projection and neck-to-jaw cervicofacial angle.",
        ar: "استقامة الرقبة والعمود الفقري تحدد بروز خط الفك وتزيل الترهل البصري أسفل الذقن.",
      },
    },
  };

  const def = planDefinitions[primaryGoal] || planDefinitions.face;

  // Build Morning Quests tailored to time budget & primary goal
  const morningQuests: Quest[] = [];
  const eveningQuests: Quest[] = [];

  // Goal-specific quest generation
  if (primaryGoal === "face") {
    morningQuests.push({
      id: "quest-face-morning-1",
      title: {
        en: isFemale ? "3-Min Rose Quartz Gua Sha Sculpt" : "Ice Cold Water Facial Plunge (90s)",
        ar: isFemale ? "تدليك الوجنتين بحجر الغوا شا (3 دقائق)" : "صدمة الوجه بالماء البارد والثلج (90 ثانية)",
      },
      category: "morning",
      xp: 50,
      completed: false,
      frequency: "daily",
      durationMinutes: 3,
      goalCategory: "face",
      iconName: "droplets",
      description: {
        en: isFemale
          ? "Glide upward along zygomatic bone toward the temples to drain nocturnal lymph."
          : "Submerge face in cold water to immediately constrict capillary blood vessels and tighten facial fascia.",
        ar: isFemale
          ? "تمرير حجر الغوا شا بحركات للأعلى باتجاه الصدغين لتصريف احتباس السائل اللمفاوي الصباحي."
          : "تغطيس الوجه بالماء البارد والثلج لشد الأنسجة الرخوة وتنشيط الدورة الدموية الفورية.",
      },
      whyItMatters: {
        en: "Removes morning facial edema and sharpens the mandibular boundary.",
        ar: "يطرد انتفاخ الوجه الصباحي ويبرز حدود عظام الفك والخدين بوضوح.",
      },
    });

    morningQuests.push({
      id: "quest-face-morning-2",
      title: {
        en: "Cervical Alignment Drills (Chin Tucks)",
        ar: "تمارين استقامة الرقبة (Chin Tucks)",
      },
      category: "morning",
      xp: 40,
      completed: false,
      frequency: "daily",
      durationMinutes: 2,
      goalCategory: "face",
      iconName: "shield",
      description: {
        en: "3 sets of 12 reps pulling the chin back horizontally without tilting the head down.",
        ar: "3 مجموعات × 12 تكراراً لسحب الذقن أفقياً للخلف لتقوية عضلات الرقبة العميقة.",
      },
      whyItMatters: {
        en: "Elevates the hyoid bone to pull up submental skin and define the jawline.",
        ar: "يرفع عظمة اللسان للأعلى مما يشد ترهل أسفل الذقن ويبرز زاوية الفك.",
      },
    });

    eveningQuests.push({
      id: "quest-face-evening-1",
      title: {
        en: "Palatal Tongue Rest (Mewing Routine)",
        ar: "تثبيت وضعية اللسان في سقف الحلق (Mewing)",
      },
      category: "evening",
      xp: 50,
      completed: false,
      frequency: "daily",
      durationMinutes: 3,
      goalCategory: "face",
      iconName: "moon",
      description: {
        en: "Swallow and keep entire tongue suctioned to the roof of your mouth, teeth gently touching, nose breathing only.",
        ar: "الصق كامل سطح اللسان بسقف الحلق مع إطباق الشفتين والتنفس من الأنف طوال فترة الاسترخاء والنوم.",
      },
      whyItMatters: {
        en: "Supports midface bone architecture and prevents mouth-breathing facial narrowing.",
        ar: "يدعم عظام منتصف الوجه ويمنع الاستطالة غير المرغوبة الناتجة عن التنفس الفموي.",
      },
    });
  } else if (primaryGoal === "skin") {
    morningQuests.push({
      id: "quest-skin-morning-1",
      title: {
        en: "Broad Spectrum SPF 50+ Shield",
        ar: "واقي شمس واسع المدى SPF 50+",
      },
      category: "morning",
      xp: 50,
      completed: false,
      frequency: "daily",
      durationMinutes: 2,
      goalCategory: "skin",
      iconName: "sun",
      description: {
        en: "Apply two finger lengths of broad-spectrum SPF 50+ across face and neck.",
        ar: "تطبيق مقدار إصبعين كاملين من واقي الشمس واسع المدى على الوجه والرقبة.",
      },
      whyItMatters: {
        en: "Non-negotiable foundation: blocks 98% of UV rays that break down dermal collagen.",
        ar: "حجر الزاوية لكل عناية: يحمي 98% من الكولاجين من التلف الضوئي والتصبغات.",
      },
    });

    morningQuests.push({
      id: "quest-skin-morning-2",
      title: {
        en: isFemale ? "Hydrating Multi-Peptide Serum" : "Antioxidant Vitamin C 10%",
        ar: isFemale ? "سيروم الببتيدات والترطيب العميق" : "سيروم فيتامين C مضاد الأكسدة",
      },
      category: "morning",
      xp: 40,
      completed: false,
      frequency: "daily",
      durationMinutes: 2,
      goalCategory: "skin",
      iconName: "droplets",
      description: {
        en: isFemale
          ? "Gently press peptide glaze onto damp skin to lock in moisture."
          : "Apply 4-5 drops of L-ascorbic acid to clean skin before sunscreen.",
        ar: isFemale
          ? "توزيع سيروم الببتيدات على بشرة رطبة خفيفة لمنح النضارة الزجاجية."
          : "توزيع 4 قطرات من فيتامين C على بشرة نظيفة قبل واقي الشمس.",
      },
      whyItMatters: {
        en: "Neutralizes oxidative free radicals and promotes luminous dermal reflection.",
        ar: "يعادل الجذور الحرة المسببة للإجهاد التأكسدي ويمنح الوجه إشراقة متجانسة.",
      },
    });

    eveningQuests.push({
      id: "quest-skin-evening-1",
      title: {
        en: "Gentle Evening Double Cleanse",
        ar: "تنظيف البشرة المسائي المزدوج",
      },
      category: "evening",
      xp: 50,
      completed: false,
      frequency: "daily",
      durationMinutes: 3,
      goalCategory: "skin",
      iconName: "moon",
      description: {
        en: "First wash with oil/micellar cleanser to melt SPF, followed by a gentle foaming wash.",
        ar: "غسيل زيتي أو ماء ميسيلار لإذابة واقي الشمس والدهون، يليه غسول رغوي مائي لطيف.",
      },
      whyItMatters: {
        en: "Clears pores completely without stripping the lipid barrier.",
        ar: "ينقي المسام بعمق دون تجريد الحاجز الواقي الطبيعي للبشرة من دهونه المفيدة.",
      },
    });
  } else {
    // General / Grooming / Hair / Style default quests
    morningQuests.push({
      id: "quest-gen-morning-1",
      title: {
        en: isFemale ? "Eyebrow Spoolie Brush & Arch Lift" : "45° Eyebrow Groom & Stubble Check",
        ar: isFemale ? "تمشيط الحواجب ورفع القوس الطبيعي" : "تمشيط الحواجب وتحديد خط اللحية",
      },
      category: "morning",
      xp: 40,
      completed: false,
      frequency: "daily",
      durationMinutes: 2,
      goalCategory: "grooming",
      iconName: "sun",
      description: {
        en: isFemale
          ? "Brush brow hairs upward at 45° to naturally lift the perceived eye canthal angle."
          : "Brush brows upward and inspect neckline boundary for crisp mandibular contrast.",
        ar: isFemale
          ? "تمشيط شعيرات الحاجب بزاوية 45° للأعلى لمنح العين سحبة مرفوعة وجذابة."
          : "تمشيط الحواجب للأعلى والتأكد من نظافة خط الرقبة للحية لإبراز زاوية الفك.",
      },
      whyItMatters: {
        en: "Shapes upper orbital symmetry instantly.",
        ar: "يبرز تناسق محيط العينين والنظرة الواثقة بدقيقة واحدة.",
      },
    });

    morningQuests.push({
      id: "quest-gen-morning-2",
      title: {
        en: "Morning Debloat Hydration (750ml)",
        ar: "شرب 750 مل ماء صباحي لطرد الأملاح",
      },
      category: "morning",
      xp: 40,
      completed: false,
      frequency: "daily",
      durationMinutes: 1,
      goalCategory: "face",
      iconName: "droplets",
      description: {
        en: "Drink a large glass of water with a pinch of sea salt or lemon to activate kidney sodium excretion.",
        ar: "شرب كوبين من الماء مع رشة ليمون لتنشيط طرد الصوديوم الزائد المتسبب بانتفاخ الوجه.",
      },
      whyItMatters: {
        en: "Flushes interstitial fluid pooling from your cheeks.",
        ar: "يصرف السوائل المحتبسة في الخدين وتحت العينين بشكل طبيعي.",
      },
    });

    eveningQuests.push({
      id: "quest-gen-evening-1",
      title: {
        en: "Postural Spine Alignment & Silk Rest",
        ar: "تمرين استقامة العمود الفقري والاسترخاء",
      },
      category: "evening",
      xp: 50,
      completed: false,
      frequency: "daily",
      durationMinutes: 3,
      goalCategory: "style",
      iconName: "moon",
      description: {
        en: "Stand against a wall (heels, glutes, shoulders, head flat) for 2 minutes to reset muscle memory.",
        ar: "الوقوف مستقيماً على الجدار (الكعب، الأكتاف، ومؤخرة الرأس تلامس الحائط) لدقيقتين.",
      },
      whyItMatters: {
        en: "Reprograms spinal posture and prevents nocturnal airway collapse.",
        ar: "يعيد ضبط توازن القامة ويمنع ضيق المجرى التنفسي أثناء النوم.",
      },
    });
  }

  // Weekly quests
  const weeklyQuests: Quest[] = [
    {
      id: "quest-weekly-1",
      title: {
        en: isFemale ? "Weekly Silk Scalp & Hair Treatment" : "Precision Mandibular Neckline Trim",
        ar: isFemale ? "جلسة العناية الأسبوعية بفروة الرأس والشعر" : "تشذيب دقيق لخط الرقبة وزاوية اللحية",
      },
      category: "anytime",
      xp: 100,
      completed: false,
      frequency: "weekly",
      durationMinutes: 10,
      goalCategory: "grooming",
      iconName: "shield",
      description: {
        en: isFemale 
          ? "Pre-shampoo scalp massage with rosemary oil to stimulate hair follicle micro-circulation."
          : "Use a precision trimmer with a 2-finger guide above the thyroid cartilage to create a razor-sharp shadow.",
        ar: isFemale
          ? "تدليك الفروة بزيت طبيعي قبل الغسيل لتنشيط البصيلات وتحفيز كثافة الشعر."
          : "تحديد خط اللحية السفلي بدقة أعلى تفاحة آدم بإصبعين لمنح الفك ظلاً بارزاً وحاداً.",
      },
      whyItMatters: {
        en: "Keeps aesthetic geometry maintained at peak weekly consistency.",
        ar: "يحافظ على الحدود الجمالية للمظهر بأعلى دقة أسبوعية.",
      },
    },
  ];

  return {
    id: `plan-${Date.now()}`,
    createdAt: new Date().toISOString(),
    genderTrack,
    primaryGoal,
    secondaryGoal,
    timeBudget,
    budgetLevel,
    title: def.title,
    summary: def.summary,
    weeklyObjective: def.weeklyObjective,
    prioritizationReason: def.prioritizationReason,
    estimatedDailyMinutes: dailyMinutes,
    dailyMorningQuests: morningQuests,
    dailyEveningQuests: eveningQuests,
    weeklyQuests,
    status: "active",
  };
}

/**
 * Rules Engine for Weekly Adaptation:
 * Checks completion history and automatically simplifies or advances routines.
 */
export function adaptTransformationPlan(
  currentPlan: TransformationPlan,
  weeklyReview: { adherenceRate: number; skippedHabitsCount: number; userFeedback?: "too_hard" | "just_right" | "too_easy" }
): { adaptedPlan: TransformationPlan; changeSummary: { en: string; ar: string } } {
  const { adherenceRate, userFeedback } = weeklyReview;
  let changeSummary = {
    en: "Plan maintained with your current consistent momentum.",
    ar: "تم الحفاظ على الخطة الحالية مع استمرار زخمك الإيجابي.",
  };

  const updatedMorning = [...currentPlan.dailyMorningQuests];
  const updatedEvening = [...currentPlan.dailyEveningQuests];

  if (adherenceRate < 50 || userFeedback === "too_hard") {
    // Simplify evening and morning tasks: cap to 1 essential quest each
    if (updatedMorning.length > 1) updatedMorning.pop();
    if (updatedEvening.length > 1) updatedEvening.pop();
    changeSummary = {
      en: "We streamlined your daily actions to essential 5-minute foundational habits to lock in consistency.",
      ar: "قمنا بتبسيط مهامك اليومية للتركيز على العادات الأساسية في 5 دقائق لتثبيت الاستمرارية.",
    };
  } else if (adherenceRate >= 85 || userFeedback === "too_easy") {
    // Progress to advanced routine
    changeSummary = {
      en: "Exceptional 85%+ consistency! Added advanced progression protocols for accelerated transformation.",
      ar: "التزام استثنائي تجاوز 85%! تمت إضافة بروتوكولات متقدمة لتسريع وتيرة التحول الإيجابي.",
    };
  }

  const adaptedPlan: TransformationPlan = {
    ...currentPlan,
    dailyMorningQuests: updatedMorning,
    dailyEveningQuests: updatedEvening,
    status: "adapted",
  };

  return { adaptedPlan, changeSummary };
}
