import { Quest, ScanResult, Challenge, LeaderboardUser, RoutineGuide, UserProfile } from "../types";
import { FACE_SHAPE_PRESETS } from "./faceShapeData";

export const INITIAL_USER: UserProfile = {
  name: "Omar Al-Shakh",
  username: "@omar_glow",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  level: 7,
  xp: 3420,
  nextLevelXp: 3500,
  streakDays: 14,
  glowScore: 84,
  potentialScore: 94,
  scansCount: 4,
  joinedDate: "August 2024",
  unlockedBadges: [
    "Gonial Pioneer",
    "Glass Skin Master",
    "14-Day Streak Hero",
    "Posture Sentinel",
    "Debloat Champion"
  ]
};

export const INITIAL_QUESTS: Quest[] = [
  {
    id: "q-ice-roll",
    title: {
      en: "Ice Roller / Cold Water Plunge (2 Mins)",
      ar: "تدليك بالثلج أو غمر الوجه بالماء البارد (دقيقتين)"
    },
    category: "morning",
    xp: 60,
    completed: true,
    frequency: "daily",
    description: {
      en: "Constricts facial capillaries, reduces morning periorbital edema, and tightens pores immediately.",
      ar: "يساعد في تضييق الأوعية الدقيقة، تخفيف انتفاخ الصباح حول العينين وشد المسام فوراً."
    },
    iconName: "snowflake"
  },
  {
    id: "q-spf",
    title: {
      en: "Broad-Spectrum SPF 50+ Application",
      ar: "وضع واقي شمس واسع المدى SPF 50+"
    },
    category: "morning",
    xp: 50,
    completed: true,
    frequency: "daily",
    description: {
      en: "Shields dermal collagen & elastin from photoaging and UV fragmentation.",
      ar: "حماية ألياف الكولاجين والإيلاستين من التفكك والتجاعيد الناتجة عن الأشعة فوق البنفسجية."
    },
    iconName: "sun"
  },
  {
    id: "q-vitc",
    title: {
      en: "10% Vitamin C + Hyaluronic Serum",
      ar: "سيروم فيتامين C بتركيز 10% مع الهيالورونيك"
    },
    category: "morning",
    xp: 50,
    completed: false,
    frequency: "daily",
    description: {
      en: "Neutralizes reactive oxygen species and accelerates natural collagen synthesis.",
      ar: "مكافحة الشوارد الحرة وتفتيح البشرة وتنشيط بناء الكولاجين الطبيعي."
    },
    iconName: "droplets"
  },
  {
    id: "q-chin-tucks",
    title: {
      en: "Chin Tucks & Posture Reset (3x15 Reps)",
      ar: "تمرين شد الذقن (Chin Tucks) وضبط الرقبة (3x15)"
    },
    category: "anytime",
    xp: 75,
    completed: true,
    frequency: "daily",
    description: {
      en: "Corrects forward head tilt ('tech neck'), revealing your mandibular jawline sharpness.",
      ar: "يعالج انحناء الرقبة الناتج عن الهواتف ويبرز زاوية الفك السفلي بحدة."
    },
    iconName: "user-check"
  },
  {
    id: "q-mewing",
    title: {
      en: "Orthotropic Tongue Posture (Mewing Check)",
      ar: "وضعية اللسان السليمة بسقف الحلق (Mewing)"
    },
    category: "anytime",
    xp: 60,
    completed: false,
    frequency: "daily",
    description: {
      en: "Posterior tongue suction against hard & soft palate. Lips sealed, nasal breathing only.",
      ar: "إلصاق اللسان بالكامل في سقف الحلق مع التنفس من الأنف وإطباق الشفتين."
    },
    iconName: "sparkles"
  },
  {
    id: "q-water",
    title: {
      en: "3 Liters Hydration + Pink Salt Electrolytes",
      ar: "شرب 3 لترات ماء مع كهارل متوازنة"
    },
    category: "anytime",
    xp: 50,
    completed: false,
    frequency: "daily",
    description: {
      en: "Flushes intracellular water retention that causes facial bloating.",
      ar: "يطرد احتباس السوائل الخلوي الذي يسبب انتفاخ الوجه وضياع الملامح."
    },
    iconName: "glass-water"
  },
  {
    id: "q-retinol",
    title: {
      en: "Night Retinoid & Ceramide Barrier Cream",
      ar: "تطبيق كريم الريتينول ومرطب السيراميد الليلي"
    },
    category: "evening",
    xp: 70,
    completed: false,
    frequency: "daily",
    description: {
      en: "Increases cellular turnover by 3x and rebuilds lipid moisture barrier.",
      ar: "يحفز تجديد خلايا البشرة 3 أضعاف ويعيد بناء الحاجز الدهني الواقي."
    },
    iconName: "moon"
  },
  {
    id: "q-guasha",
    title: {
      en: "Gua Sha / Lymphatic Jaw Sculpting (5 Mins)",
      ar: "تدليك الغوا شا لنحت وتصريف سوائل الفك (5 دقائق)"
    },
    category: "evening",
    xp: 65,
    completed: false,
    frequency: "daily",
    description: {
      en: "Drains sluggish lymphatic fluids from masseters to cervical lymph nodes.",
      ar: "تصريف السوائل اللمفاوية الراكدة من عضلة الفك إلى الغدد اللمفاوية في الرقبة."
    },
    iconName: "gem"
  },
  {
    id: "q-sleep",
    title: {
      en: "Slightly Elevated Head Sleep (7.5+ Hrs)",
      ar: "نوم 7.5+ ساعات مع رفع الرأس بزاوية طفيفة"
    },
    category: "evening",
    xp: 80,
    completed: false,
    frequency: "daily",
    description: {
      en: "Prevents overnight fluid pooling under eyes and maximizes growth hormone release.",
      ar: "يمنع تجمع السوائل تحت العينين أثناء الليل ويعزز إفراز هرمون النمو."
    },
    iconName: "bed"
  }
];

export const INITIAL_SCAN: ScanResult = {
  id: "scan-baseline",
  date: "Today, 07:30 AM",
  overallScore: 84,
  potentialScore: 94,
  imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
  gonialAngle: "123° (Sharp)",
  jawlineScore: 86,
  symmetryScore: 88,
  skinScore: 79,
  canthalTilt: "+3.8° (Positive)",
  facialThirds: "32% Upper / 34% Mid / 34% Lower",
  metrics: [
    {
      name: { en: "Gonial Jawline Angle", ar: "زاوية الفك السفلي (Gonial)" },
      score: 86,
      target: 95,
      unit: "°",
      status: { en: "High Definition", ar: "تحديد حاد وممتاز" },
      feedback: {
        en: "Clean jawline slope with distinct separation between mandibular ramus and neck.",
        ar: "خط فك حاد ومتميز مع فصل واضح بين عظم الفك وعضلات الرقبة."
      }
    },
    {
      name: { en: "Eye Canthal Tilt & Orbitals", ar: "ميلان العينين وتجويف المحجر" },
      score: 91,
      target: 95,
      status: { en: "Positive Tilt", ar: "ميلان إيجابي جذاب" },
      feedback: {
        en: "Lateral canthus rests 2.5mm higher than medial canthus, giving alert, masculine hunter eyes.",
        ar: "الزاوية الخارجية للعين أعلى من الداخلية، مما يمنح مظهراً حاداً ومشدوداً."
      }
    },
    {
      name: { en: "Facial Horizontal Thirds", ar: "تناسق الأثلاث الأفقية للوجه" },
      score: 88,
      target: 95,
      status: { en: "Golden Ratio (1:1:1)", ar: "متناسق مع النسبة الذهبية" },
      feedback: {
        en: "Forehead, mid-face, and lower jaw third are within 2% of the ideal equal proportions.",
        ar: "الجبهة ووسط الوجه والفك السفلي تقع ضمن تفاوت 2% فقط من التساوي المثالي."
      }
    },
    {
      name: { en: "Dermal Clarity & Radiance", ar: "نقاء ونضارة البشرة" },
      score: 76,
      target: 92,
      status: { en: "Good, Dehydration Visible", ar: "جيد، مع جفاف سطحي خفيف" },
      feedback: {
        en: "Good texture uniformity. Minor epidermal dryness on cheeks and slight under-eye dark rings.",
        ar: "الملمس موحد، مع حاجة لترطيب إضافي عند الخدين وعلاج هالات خفيفة."
      }
    },
    {
      name: { en: "Cheekbone & Midface Projection", ar: "بروز عظام الخد والوجه الأوسط" },
      score: 83,
      target: 90,
      status: { en: "Strong Zygomatic Arch", ar: "بروز عظمي بارز ومتناسق" },
      feedback: {
        en: "Zygomatic prominence provides natural hollow cheeks beneath when water retention is low.",
        ar: "عظام الخد عريضة وتوفر تجويفاً جمالياً طبيعياً تحتها مع قلة السوائل."
      }
    },
    {
      name: { en: "Forward Head Posture Angle", ar: "زاوية استقامة الرقبة والرأس" },
      score: 79,
      target: 95,
      status: { en: "3.5° Forward Tilt", ar: "انحناء طفيف للأمام 3.5 درجات" },
      feedback: {
        en: "Mild forward carriage softens the submental triangle. Responded well to chin tucks.",
        ar: "الانحناء للأمام يخفي جزءاً من حدة الذقن، وتمرين Chin Tucks سيعالجه بسرعة."
      }
    }
  ],
  strengths: [
    {
      en: "Positive canthal tilt (+3.8°) creates sharp, commanding orbital aesthetics.",
      ar: "ميلان عيني إيجابي (+3.8 درجات) يمنح مظهراً واثقاً وجذاباً للعينين."
    },
    {
      en: "Well-developed chin projection (mentum) with no retrognathia or recession.",
      ar: "بروز ممتاز لعظم الذقن دون أي تراجع في الفك السفلي."
    },
    {
      en: "Symmetrical lip-to-nose ratio following the classic golden mask template.",
      ar: "تناسق مثالي بين عرض الشفتين وقاعدة الأنف وفق النسبة الذهبية."
    }
  ],
  improvements: [
    {
      en: "Mild submental fluid retention hiding 10% of gonial angle sharpness.",
      ar: "احتباس سوائل خفيف تحت الذقن يخفي قرابة 10% من حدة زاوية الفك."
    },
    {
      en: "Slight periorbital dark circles from insufficient REM sleep / screen fatigue.",
      ar: "هالات داكنة خفيفة تحت العينين بسبب إجهاد الشاشات أو جودة النوم."
    },
    {
      en: "Cheekbone dermal hydration could be boosted for a continuous light bounce reflection.",
      ar: "تحتاج منطقة الوجنتين لترطيب إضافي لعكس الإضاءة الطبيعية ونضارة متألقة."
    }
  ],
  customRoutine: {
    morning: [
      {
        en: "2-minute cold plunge or frozen roller along the mandibular edge.",
        ar: "تمرير مكعب ثلج أو رولر مجمد على حافة الفك السفلي لمدة دقيقتين."
      },
      {
        en: "Apply 10% pure L-Ascorbic Acid (Vitamin C) followed by SPF 50.",
        ar: "تطبيق سيروم فيتامين C النقي 10% يليه واقي شمس SPF 50."
      },
      {
        en: "Perform 15 wall-assisted chin tucks to lengthen the deep cervical flexors.",
        ar: "15 تكراراً لتمرين شد الذقن على الجدار لتقوية عضلات الرقبة العميقة."
      }
    ],
    evening: [
      {
        en: "5-minute Gua Sha lymphatic sweep from chin up to mastoid process.",
        ar: "تدليك الغوا شا لمدة 5 دقائق من منتصف الذقن نحو خلف الأذن."
      },
      {
        en: "0.05% encapsulated retinol layer with peptide rich barrier cream.",
        ar: "كريم ريتينول 0.05% مع مرطب غني بالببتيدات لتعزيز إنتاج الكولاجين."
      },
      {
        en: "Maintain strict nasal breathing through sleep with optimal neck support.",
        ar: "الحرص على التنفس من الأنف تماماً أثناء النوم مع وسادة مريحة للرقبة."
      }
    ]
  },
  detectedGender: "male",
  faceShape: FACE_SHAPE_PRESETS.oval.analysis,
  maleHairstyles: FACE_SHAPE_PRESETS.oval.maleHairstyles,
  femaleHairstyles: FACE_SHAPE_PRESETS.oval.femaleHairstyles,
  beardStyles: FACE_SHAPE_PRESETS.oval.beardStyles,
  stylesToAvoid: FACE_SHAPE_PRESETS.oval.stylesToAvoid,
  immediateGlowUpTips: FACE_SHAPE_PRESETS.oval.immediateGlowUpTips,
  visualizedAfterUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
  transformationNotes: [
    { en: "High-volume textured quiff creates vertical contrast and balances forehead thirds.", ar: "تسريحة كويف مموجة تمنح تبايناً رأسياً وتوازن أثلاث الجبهة." },
    { en: "Precision 3-day designer stubble contours mandibular border with dark contrast.", ar: "لحية 3 أيام مصممة تحدد حافة الفك السفلي بتباين داكن وجذاب." },
    { en: "Lymphatic drainage and cold compress reduced cheek puffiness by 25%.", ar: "التصريف اللمفاوي والكمادات الباردة خفضت انتفاخ الخدود بـ 25%." },
    { en: "Dewy, glass skin hydration reflection focused on zygomatic bone apex.", ar: "انعكاس إشراقة زجاجية نضرة على قمة عظام الوجنتين." }
  ]
};

export const CHALLENGES: Challenge[] = [
  {
    id: "c-jawline",
    title: {
      en: "30-Day Chiseled Jawline Sprint",
      ar: "تحدي الـ 30 يوماً لنحت زاوية الفك"
    },
    description: {
      en: "Transform facial definition through targeted debloating, masseter balance, chin tucks, and non-stop tongue posture.",
      ar: "نحت زوايا الفك عبر التخلص من السوائل، موازنة عضلات المضغ، تمارين الرقبة ووضعية اللسان السليمة."
    },
    durationDays: 30,
    currentDay: 14,
    participants: 14820,
    badgeName: "Mandibular Titan",
    rewardXp: 1200,
    joined: true,
    category: "jawline",
    tasksSummary: {
      en: "Daily: 3x15 chin tucks, 2-min ice roll, 3L water, strict nasal breathing.",
      ar: "يومياً: 3 مجموعات شد الذقن، تدليك بالثلج، 3 لتر ماء، وتنفس أنفي مستمر."
    }
  },
  {
    id: "c-skin",
    title: {
      en: "21-Day Glass Skin Dermal Reset",
      ar: "تحدي الـ 21 يوماً للبشرة الزجاجية والنضارة"
    },
    description: {
      en: "Eradicate micro-inflammation, fade hyperpigmentation, and achieve mirror-like light reflection with active dermatological stacks.",
      ar: "القضاء على الالتهابات المجهرية، توحيد لون البشرة، وتحقيق نضارة زجاجية تعكس الضوء بروتين مدروس."
    },
    durationDays: 21,
    currentDay: 8,
    participants: 9640,
    badgeName: "Dermal Luminary",
    rewardXp: 950,
    joined: true,
    category: "skin",
    tasksSummary: {
      en: "Daily: Vitamin C morning, SPF 50 re-application, Retinol evening, 0 dairy sugars.",
      ar: "يومياً: فيتامين C صباحاً، تجديد واقي الشمس، ريتينول ليلاً، والابتعاد عن السكريات المصنعة."
    }
  },
  {
    id: "c-posture",
    title: {
      en: "14-Day Forward Head & Neck Reset",
      ar: "تحدي الـ 14 يوماً لاستقامة الرقبة والأكتاف"
    },
    description: {
      en: "Eliminate tech-neck posture. Lengthen the neck visual profile and reveal maximum mandibular jawline distinction.",
      ar: "التخلص من انحناء الرقبة الناتج عن الهواتف. إطالة مظهر الرقبة وإبراز خط الفك بأقصى حدة."
    },
    durationDays: 14,
    currentDay: 4,
    participants: 7210,
    badgeName: "Cervical Alignment",
    rewardXp: 700,
    joined: false,
    category: "posture",
    tasksSummary: {
      en: "Daily: Doorway pec stretches, wall chin tucks, eye-level screen height.",
      ar: "يومياً: إطالات الصدر، شد الذقن على الجدار، ورفع الشاشات لمستوى العينين."
    }
  },
  {
    id: "c-debloat",
    title: {
      en: "7-Day Zero-Bloat Facial Flush",
      ar: "تحدي الـ 7 أيام لتصريف سوائل الوجه بالكامل"
    },
    description: {
      en: "Rapidly empty facial extracellular fluid pools using a high potassium-to-sodium ratio and dandelion tea.",
      ar: "تفريغ سريع ومثبت لسوائل الوجه المحتبسة عبر رفع نسبة البوتاسيوم وشرب شاي الهندباء والماء."
    },
    durationDays: 7,
    currentDay: 0,
    participants: 18450,
    badgeName: "Zero-Bloat Master",
    rewardXp: 500,
    joined: false,
    category: "lifestyle",
    tasksSummary: {
      en: "Daily: <1500mg sodium, 4L water, 4000mg potassium, 20-min sauna/sweat.",
      ar: "يومياً: أقل من 1500مغ صوديوم، 4 لتر ماء، أطعمة غنية بالبوتاسيوم، وجلسة ساونا/تعرق."
    }
  }
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    id: "u-1",
    rank: 1,
    name: "Tariq Al-Mansoor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    glowScore: 95,
    streakDays: 62,
    xp: 14850,
    tier: "Ascended"
  },
  {
    id: "u-2",
    rank: 2,
    name: "Alexander Vance",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
    glowScore: 93,
    streakDays: 48,
    xp: 12400,
    tier: "Ascended"
  },
  {
    id: "u-3",
    rank: 3,
    name: "Youssef Zaki",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    glowScore: 91,
    streakDays: 39,
    xp: 10920,
    tier: "Diamond"
  },
  {
    id: "u-4",
    rank: 4,
    name: "Julian Thorne",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    glowScore: 89,
    streakDays: 31,
    xp: 8850,
    tier: "Diamond"
  },
  {
    id: "u-5",
    rank: 5,
    name: "Omar Al-Shakh (You)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    glowScore: 84,
    streakDays: 14,
    xp: 3420,
    tier: "Platinum",
    isCurrentUser: true
  },
  {
    id: "u-6",
    rank: 6,
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
    glowScore: 83,
    streakDays: 12,
    xp: 3100,
    tier: "Platinum"
  },
  {
    id: "u-7",
    rank: 7,
    name: "Zayd Nour",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    glowScore: 81,
    streakDays: 9,
    xp: 2650,
    tier: "Gold"
  }
];

export const ROUTINE_GUIDES: RoutineGuide[] = [
  {
    id: "rg-debloat",
    title: {
      en: "The Ultimate Facial Debloat Protocol",
      ar: "البروتوكول الشامل لتصريف انتفاخ الوجه"
    },
    subtitle: {
      en: "How to drop 2-3mm of facial water retention in 48 hours.",
      ar: "كيف تتخلص من 2 إلى 3 ملم من احتباس السوائل في الوجه خلال 48 ساعة."
    },
    category: "nutrition",
    duration: "48 Hours",
    scienceNote: {
      en: "Aldosterone hormone regulation controls how much sodium and water your facial subcutaneous fat holds. Increasing potassium to a 3:1 ratio against sodium reverses osmotic pressure, pulling fluid out into circulation.",
      ar: "هرمون الألدوستيرون يتحكم في كمية السوائل التي تحتفظ بها أنسجة الوجه. رفع نسبة البوتاسيوم إلى الصوديوم بنسبة 3 إلى 1 يعيد التوازن الأسموزي ويطرد الماء المحتبس سريعاً."
    },
    steps: [
      {
        title: { en: "Cap Sodium at 1,800mg", ar: "تحديد الصوديوم بأقل من 1800 مغ" },
        detail: {
          en: "Cut packaged foods, restaurant sauces, and cured meats. Use mineral pink Himalayan salt sparingly.",
          ar: "الابتعاد عن الأطعمة المعلبة والوجبات السريعة والصلصات الجاهزة، واستبدالها بالملح الصخري باعتدال."
        }
      },
      {
        title: { en: "Target 4,200mg Potassium", ar: "استهلاك 4200 مغ من البوتاسيوم يومياً" },
        detail: {
          en: "Consume 2 avocados, 1 cup cooked spinach, coconut water, and a baked sweet potato.",
          ar: "تناول حبتي أفوكادو، سبانخ مطهية، ماء جوز هند طبيعي، وبطاطا حلوة مشوية."
        }
      },
      {
        title: { en: "Hydration Surge (3.8 Liters)", ar: "شرب 3.8 لتر من الماء النقي" },
        detail: {
          en: "Counter-intuitively, dehydration causes your body to hoard fluid in the face. Abundant water intake turns on renal clearance.",
          ar: "قلة شرب الماء تدفع الجسم لحبس السوائل دفاعياً في الوجه. شرب كميات وفيرة يرسل إشارة للجسم بالتخلص من الفائض."
        }
      },
      {
        title: { en: "Morning Ice Face Dunk", ar: "غمر الوجه في وعاء ماء مثلج" },
        detail: {
          en: "Fill a bowl with cold water and 10 ice cubes. Dunk face for 3 sets of 15 seconds. Stimulates vagal tone and drains lymphatic fluid.",
          ar: "وعاء ماء بارد مع مكعبات ثلج، غمر الوجه 3 مرات لمدة 15 ثانية. ينشط العصب الحائر ويصرف السوائل المحتبسة فوراً."
        }
      }
    ]
  },
  {
    id: "rg-mewing",
    title: {
      en: "Orthotropic Tongue Posture & Mandibular Expansion",
      ar: "الدليل العلمي لوضعية اللسان (Mewing) وتوسيع الفك"
    },
    subtitle: {
      en: "The anatomical biomechanics of facial upswing and jawline projection.",
      ar: "الميكانيكا الحيوية لرفع عظام الوجه وبروز الفك السفلي بشكل طبيعي."
    },
    category: "jawline",
    duration: "Lifestyle Habit",
    scienceNote: {
      en: "The tongue is a powerful muscular hydrostat capable of exerting sustained upward pressure against the maxilla. Keeping the posterior third anchored elevates the hyoid bone, immediately tightening the submental neck hammock.",
      ar: "اللسان عضلة قوية قادرة على توليد ضغط مستمر يرفع الفك العلوي. تثبيت الثلث الخلفي من اللسان بسقف الحلق يرفع العظم اللامي فوراً ويشد جلد الرقبة المترهل."
    },
    steps: [
      {
        title: { en: "The 'Sing' / 'N' Sound Anchor", ar: "طريقة نطق حرف (N) لتثبيت اللسان" },
        detail: {
          en: "Make the 'NG' sound as in 'Sing'. Feel the back of your tongue press flat against your soft palate. Hold that suction.",
          ar: "انطق نهاية كلمة 'King' أو حرف النون في سقف الحلق؛ ستشعر بأن الجزء الخلفي من اللسان التصق تماماً بسقف الحلق. حافظ على هذا الشفط."
        }
      },
      {
        title: { en: "Lip Seal & Nasal Only Airway", ar: "إطباق الشفتين والتنفس الأنفي التام" },
        detail: {
          en: "Keep lips sealed effortlessly without tension. Never breathe through the mouth, as mouth breathing drops the jaw and narrows the palate.",
          ar: "إغلاق الشفتين دون شد. التنفس دائماً من الأنف، لأن التنفس الفموي يؤدي إلى تراجع الفك وضيق مجرى التنفس."
        }
      },
      {
        title: { en: "Chewing Tough Foods (Mastication)", ar: "مضغ الأطعمة الصلبة لتقوية العضلات" },
        detail: {
          en: "Incorporate mastic gum, raw carrots, and fibrous meats. Chew symmetrically on both sides to prevent asymmetry.",
          ar: "مضغ المستكة الطبيعية (Mastic Gum) أو الجزر النيء، مع المضغ المتساوي على الجهتين بالتناوب لتجنب عدم التناظر."
        }
      }
    ]
  },
  {
    id: "rg-glass-skin",
    title: {
      en: "The Glass Skin Dermal Stack",
      ar: "بروتوكول البشرة الزجاجية والنضارة الفائقة"
    },
    subtitle: {
      en: "Scientific layering of retinoids, antioxidants, and lipid barrier repair.",
      ar: "الترتيب العلمي لمضادات الأكسدة، مشتقات فيتامين A، وترميم حاجز البشرة."
    },
    category: "skin",
    duration: "Daily Routine",
    scienceNote: {
      en: "Skin texture reflects how light bounces off the stratum corneum. Micro-exfoliation plus intensive ceramide hydration smoothens the surface, creating specular reflection (glow) rather than diffuse scattering (dullness).",
      ar: "إشراقة البشرة تعتمد على زاوية انعكاس الضوء على الطبقة السطحية. إزالة الخلايا الميتة والترطيب العميق بالسيراميد يجعل البشرة كمرآة عاكسة للنور."
    },
    steps: [
      {
        title: { en: "Step 1: Double Cleanse (PM)", ar: "الخطوة 1: التنظيف المزدوج (مساءً)" },
        detail: {
          en: "Start with squalane or jojoba cleansing oil to dissolve sebum and sunscreen. Follow with a non-stripping gentle foaming cleanser.",
          ar: "البدء بزيت منظف خفيف لإذابة واقي الشمس والدهون العالقة، يليه غسول رغوي لطيف لا يجرد البشرة من رطوبتها."
        }
      },
      {
        title: { en: "Step 2: Actives Rotation", ar: "الخطوة 2: تناوب المواد الفعالة" },
        detail: {
          en: "AM: 10% Vitamin C + Ferulic acid to brighten. PM: Low dose Retinol (0.2%) or Tretinoin (0.025%) on alternate nights for collagen turnover.",
          ar: "صباحاً: فيتامين C بنسبة 10% لتفتيح البشرة. مساءً: ريتينول بتركيز خفيف أو تريتينوين ليالٍ متبادلة لتسريع تجدد الخلايا."
        }
      },
      {
        title: { en: "Step 3: Moisture Barrier Seal", ar: "الخطوة 3: حبس الرطوبة بالسيراميد" },
        detail: {
          en: "Apply a multi-ceramide moisturizer on slightly damp skin. Seal with a drop of rosehip or squalane oil if dry.",
          ar: "كريم يحتوي على 3 أنواع من السيراميد على بشرة رطبة قليلاً لحبس الرطوبة داخل المسام."
        }
      }
    ]
  },
  {
    id: "rg-posture",
    title: {
      en: "Cervical Spine & Jawline Realignment",
      ar: "استقامة فقرات الرقبة وبروز الفك"
    },
    subtitle: {
      en: "Fix tech neck and forward head posture to instantly reveal 15-20% more jawline.",
      ar: "معالجة انحناء الرقبة للهاتف لإبراز 15-20% إضافية من حدة الفك فوراً."
    },
    category: "posture",
    duration: "10 Mins Daily",
    scienceNote: {
      en: "For every inch your head moves forward, the cervical spine bears an extra 10 pounds of weight. This pulls the hyoid down and compresses the platysma muscle, hiding even low-bodyfat jawlines.",
      ar: "لكل 2.5 سم يميل فيها رأسك للأمام، يتحمل عنقك 4.5 كغم وزن إضافي، مما يرخي عضلة البلاتيسما ويخفي حافة الفك حتى لو كانت نسبة دهونك منخفضة."
    },
    steps: [
      {
        title: { en: "Wall Angels (2 Sets x 10)", ar: "تمرين Wall Angels (مجموعتين x 10)" },
        detail: {
          en: "Stand with heels, glutes, upper back, and head against a wall. Slide arms up and down keeping elbows touching wall.",
          ar: "قف مع ملامسة الظهر والرأس والجدار، وحرك الذراعين للأعلى والأسفل مع إبقاء الكوعين ملامسين للجدار."
        }
      },
      {
        title: { en: "Suboccipital Release", ar: "تدليك وإرخاء عضلات أسفل الجمجمة" },
        detail: {
          en: "Use two tennis balls or fingers at the base of your skull to gently massage tight neck extensors for 2 minutes.",
          ar: "تدليك خفيف أسفل قاعدة الجمجمة بأطراف الأصابع لتخفيف الشد الذي يسحب الرأس للأمام."
        }
      }
    ]
  }
];
