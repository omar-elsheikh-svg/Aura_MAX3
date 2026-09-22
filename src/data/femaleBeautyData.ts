import { 
  FaceShapeType, 
  EyebrowRecommendation, 
  Quest, 
  Challenge, 
  RoutineGuide, 
  UserProfile, 
  ScanResult 
} from "../types";
import { FACE_SHAPE_PRESETS } from "./faceShapeData";

export const FEMALE_EYEBROW_PRESETS: Record<FaceShapeType, EyebrowRecommendation[]> = {
  oval: [
    {
      id: "fem-brow-oval-1",
      name: { en: "Soft Angled Feathered Arch", ar: "قوس ناعم بزاوية رقيقة وشعيرات مفرقة" },
      styleCategory: "arched",
      whyItWorks: {
        en: "Complements the natural oval equilibrium without elongating the forehead. Maintains classic harmony.",
        ar: "يتناغم مع التوازن البيضاوي الطبيعي دون إطالة الجبهة ويبرز جمال العينين الطبيعي."
      },
      shapingGuide: {
        en: "Start above inner canthus, peak the arch at 2/3 distance aligned with iris outer edge, gently taper tail.",
        ar: "البدء فوق زاوية العين الداخلية، رفع القوس عند ثلثي الحاجب بمحاذاة القزحية، ثم سحب الطرف بنعومة."
      },
      canthalTiltTip: {
        en: "Keep the tail tip slightly higher than the head to create a +3° to +5° optical canthal lift.",
        ar: "اجعلي طرف الحاجب أعلى بقليل من بدايته لمنح العينين سحبة جميلة ومظهر عين القطة المرفوعة."
      },
      avoidTip: {
        en: "Avoid excessively thin, over-plucked brows or dramatic aggressive sharp arches.",
        ar: "تجنبي الحواجب شديدة النحافة أو الأقواس الحادة المبالغ فيها."
      },
      tag: { en: "Classic Perfection", ar: "المثالية الكلاسيكية" }
    },
    {
      id: "fem-brow-oval-2",
      name: { en: "Laminated Fluffy Boy Brow", ar: "حاجب ممشط للأعلى (Laminated Fluffy)" },
      styleCategory: "feathered",
      whyItWorks: {
        en: "Draws attention to the upper orbital rim, adding effortless youthfulness and modern elegance.",
        ar: "يجذب الانتباه للأعلى ويمنح مظهراً مفعماً بالشباب والامتلاء الطبيعي العصري."
      },
      shapingGuide: {
        en: "Brush brow hairs upward with clear peptide gel. Fill sparse gaps with micro-stroke brow pen.",
        ar: "تمشيط الشعيرات للأعلى بجل الببتيد الشفاف وملء الفراغات بفرشاة دقيقة كالشعيرات الحقيقية."
      },
      canthalTiltTip: {
        en: "Angle outer third hairs at a 45° upward diagonal towards the temple.",
        ar: "توجيه الثلث الخارجي من الشعيرات قطرياً بزاوية 45° نحو الصدغ."
      },
      avoidTip: {
        en: "Avoid blocky heavy pomades that create a stamped, artificial appearance.",
        ar: "تجنبي الجل الداكن المصمت الذي يمنح مظهراً غير طبيعي."
      },
      tag: { en: "Youthful Lift", ar: "رفع وحيوية شبابية" }
    }
  ],
  square: [
    {
      id: "fem-brow-sq-1",
      name: { en: "Curved Soft High Arch", ar: "قوس مرتفع ومنحنٍ بنعومة" },
      styleCategory: "arched",
      whyItWorks: {
        en: "Curved brows soften the angular mandibular jawline and bring optical focus up to the eyes.",
        ar: "الخطوط المنحنية تخفف من حدة زاوية الفك المربع وتنقل التركيز البصري للأعلى نحو العينين."
      },
      shapingGuide: {
        en: "Create a rounded, high arch rather than a sharp point. Keep the body medium-thick.",
        ar: "ارسمي قوساً مستديراً ومرتفعاً بدلاً من الزاوية الحادة مع الحفاظ على كثافة متوسطة."
      },
      canthalTiltTip: {
        en: "A higher arch balances a strong chin, making the lower third appear softer.",
        ar: "القوس المرتفع يوازن الذقن العريض ويجعل الثلث السفلي من الوجه أكثر رقة ونعومة."
      },
      avoidTip: {
        en: "Avoid flat straight horizontal brows which make a square face appear wider.",
        ar: "تجنبي الحواجب المستقيمة الأفقية تماماً لأنها تجعل الوجه المربع يبدو أكثر عرضاً."
      },
      tag: { en: "Jawline Softener", ar: "تنعيم زوايا الفك" }
    },
    {
      id: "fem-brow-sq-2",
      name: { en: "Soft Feathered S-Shape", ar: "حاجب مموج رقيق (Soft S-Shape)" },
      styleCategory: "natural",
      whyItWorks: {
        en: "Subtle dips and lifts break up the angular symmetry of the square forehead and chin.",
        ar: "الانحناء الخفيف يكسر الخطوط المستقيمة للجبهة المربعة ويمنح أنوثة بالغة."
      },
      shapingGuide: {
        en: "Slight dip before a smooth feminine arch. Blend with a taupe powder for gradient softness.",
        ar: "انحناء لطيف يتبعه رفع ناعم، مع دمج بودرة الحواجب بتدرج لوني طبيعي."
      },
      canthalTiltTip: {
        en: "Extend the tail just past the outer corner to visually balance wide cheekbones.",
        ar: "مدي نهاية الحاجب قليلاً خلف زاوية العين لموازنة عرض عظام الوجنتين."
      },
      avoidTip: {
        en: "Never drop the tail lower than the front of the brow.",
        ar: "لا تدعي نهاية الحاجب تنزل تحت مستوى بدايته مطلقاً."
      },
      tag: { en: "Feminine Harmony", ar: "تناغم أنثوي" }
    }
  ],
  round: [
    {
      id: "fem-brow-rd-1",
      name: { en: "High Structured Sharp Arch", ar: "قوس هندسي مرتفع بحدة محددة" },
      styleCategory: "arched",
      whyItWorks: {
        en: "Adds vertical dimension and structure to a soft, rounded face. Lifts cheekbones instantly.",
        ar: "يمنح أبعاداً طولية وهيكلية للوجه المستدير ويرفع مظهر الوجنتين على الفور."
      },
      shapingGuide: {
        en: "Define a crisp peak above the outer edge of the pupil. Keep clean defined lines beneath the arch.",
        ar: "حددي قمة واضحة فوق الحافة الخارجية للبؤبؤ مع تنظيف أسفل القوس بخط مستقيم نظيف."
      },
      canthalTiltTip: {
        en: "Lifting the arch vertically elongates the upper face, counterbalancing full cheeks.",
        ar: "رفع القوس رأسياً يطيل الجزء العلوي من الوجه ويوازن امتلاء الخدود."
      },
      avoidTip: {
        en: "Strictly avoid rounded crescent-moon brows which mirror and exaggerate roundness.",
        ar: "تجنبي الحواجب الهلالية الدائرية تماماً لأنها تضاعف استدارة الوجه."
      },
      tag: { en: "Face Slimming", ar: "تنحيف الوجه" }
    },
    {
      id: "fem-brow-rd-2",
      name: { en: "Sculpted Angled Tail", ar: "حاجب بزاوية مائلة وطرف مسحوب" },
      styleCategory: "arched",
      whyItWorks: {
        en: "Angles introduce bone structure where soft tissue dominates.",
        ar: "الزوايا الواضحة تمنح إيحاءً بوجود بنية عظمية بارزة وتحدد الملامح."
      },
      shapingGuide: {
        en: "Emphasize the arch with micro-tweezing right beneath the highest point.",
        ar: "تنظيف دقيق أسفل أعلى نقطة بالحاجب لإظهار الفرق وإبراز النحت."
      },
      canthalTiltTip: {
        en: "Taper tail upwards toward the upper ear helix.",
        ar: "سحب نهاية الحاجب باتجاه أعلى صيوان الأذن لرفع الملامح."
      },
      avoidTip: {
        en: "Avoid thick, heavy blocky arches with no taper.",
        ar: "تجنبي الحواجب العريضة السميكة دون سحبة رفيعة في النهاية."
      },
      tag: { en: "Contour Illusion", ar: "إيحاء النحت" }
    }
  ],
  heart: [
    {
      id: "fem-brow-ht-1",
      name: { en: "Soft Low-Curved Arch", ar: "قوس منخفض مستدير بنعومة" },
      styleCategory: "natural",
      whyItWorks: {
        en: "Balances the wider forehead and draws eye attention away from a pointed chin.",
        ar: "يوازن عرض الجبهة ويصرف الانتباه عن حدة الذقن المدبب ليحقق توازناً ناعماً."
      },
      shapingGuide: {
        en: "Follow a gentle curve with a low-to-medium arch. Avoid sharp points.",
        ar: "اتباع منحنى لطيف بقوس منخفض إلى متوسط والابتعاد عن الزوايا الحادة."
      },
      canthalTiltTip: {
        en: "Keep tails delicate and soft to prevent widening the upper third.",
        ar: "اجعلي نهاية الحاجب ناعمة ورقيقة لمنع الإيحاء بزيادة عرض الجبهة."
      },
      avoidTip: {
        en: "Avoid aggressive high sharp arches that make the heart forehead appear larger.",
        ar: "تجنبي الأقواس المرتفعة الحادة التي تبرز كبر الجبهة في الوجه القلبي."
      },
      tag: { en: "Forehead Balancer", ar: "موازنة الجبهة" }
    }
  ],
  diamond: [
    {
      id: "fem-brow-dm-1",
      name: { en: "Curved Soft Rounded Arch", ar: "حاجب منحنٍ ناعم ممتد" },
      styleCategory: "natural",
      whyItWorks: {
        en: "Softens high wide zygomatic cheekbones and narrows the widest cross-section of the face.",
        ar: "ينعم بروز عظام الوجنتين العريضتين ويقلل من حدة تباين أبعاد الوجه الماسي."
      },
      shapingGuide: {
        en: "Round out the arch smoothly without sharp angles. Slightly lengthen the tail outwards.",
        ar: "تدوير القوس بسلاسة دون زوايا حادة، مع إطالة طرف الحاجب قليلاً للخارج."
      },
      canthalTiltTip: {
        en: "The extended tail visually broadens the forehead to match high cheekbones.",
        ar: "إطالة النهاية تمنح إيحاءً بتوازن عرض الجبهة مع الوجنتين البارزتين."
      },
      avoidTip: {
        en: "Avoid short brows that stop prematurely before the orbital corner.",
        ar: "تجنبي الحواجب القصيرة التي تنتهي قبل زاوية العين الخارجية."
      },
      tag: { en: "Cheekbone Harmony", ar: "تناغم الوجنتين" }
    }
  ],
  oblong: [
    {
      id: "fem-brow-ob-1",
      name: { en: "Straight Horizontal Natural Brow (Korean Softmax)", ar: "حاجب مستقيم طبيعي (تقنية السوفت ماكس الكورية)" },
      styleCategory: "straight",
      whyItWorks: {
        en: "Horizontal lines visually break up vertical length, making an oblong face appear more oval and youthful.",
        ar: "الخطوط الأفقية تكسر الطول الرأسي للوجه وتجعله يبدو أكثر شباباً واستدارة كالشكل البيضاوي."
      },
      shapingGuide: {
        en: "Minimal arch with a flat horizontal base line. Soft downward taper at the very end.",
        ar: "قوس شبه منعدم مع خط قاعدة أفقي ممتد ونهاية تنحني بنعومة طفيفة جداً."
      },
      canthalTiltTip: {
        en: "Slight lift at the tail maintains a positive eye tilt without adding vertical height.",
        ar: "رفع طفيف جداً في الطرف يحافظ على ميلان العين الإيجابي دون زيادة طول الوجه."
      },
      avoidTip: {
        en: "Strictly avoid high peaked arches which make an oblong face look substantially longer.",
        ar: "تجنبي الأقواس المرتفعة بشدة لأنها تجعل الوجه المستطيل يبدو أطول بكثير."
      },
      tag: { en: "Length Shortener", ar: "تقصير مظهر طول الوجه" }
    }
  ]
};

export const INITIAL_FEMALE_USER: UserProfile = {
  name: "Layla Al-Noor",
  username: "@layla_glow",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  level: 8,
  xp: 3890,
  nextLevelXp: 4000,
  streakDays: 16,
  glowScore: 88,
  potentialScore: 96,
  scansCount: 5,
  joinedDate: "August 2024",
  unlockedBadges: [
    "Glass Skin Muse",
    "Gua Sha Alchemist",
    "Swan Posture Icon",
    "14-Day Streak Hero",
    "Radiant Glow Queen"
  ]
};

export const FEMALE_INITIAL_QUESTS: Quest[] = [
  {
    id: "fem-q-cryo-ice",
    title: {
      en: "Morning Cryo Ice-Roller / Cold Water Dunk (2 Mins)",
      ar: "تدليك بكرات الثلج أو غمر الوجه بالماء البارد (دقيقتين)"
    },
    category: "morning",
    xp: 60,
    completed: true,
    frequency: "daily",
    description: {
      en: "Flushes morning lymphatic fluid pools, contracts periorbital tissue, and delivers instant glassy radiance.",
      ar: "تصريف سريع لسوائل الوجه المحتبسة صباحاً وشد الجلد حول العينين لمنح إشراقة زجاجية فورية."
    },
    iconName: "snowflake"
  },
  {
    id: "fem-q-spf50",
    title: {
      en: "Invisible Broad-Spectrum SPF 50+ Dermal Shield",
      ar: "واقي شمس واسع المدى SPF 50+ لحماية الكولاجين"
    },
    category: "morning",
    xp: 50,
    completed: true,
    frequency: "daily",
    description: {
      en: "Prevents UV-induced collagen fragmentation, photoaging, and hyperpigmentation spots.",
      ar: "يحمي شبكة الكولاجين والإيلاستين ويمنع التصبغات والتجاعيد المبكرة الناتجة عن أشعة الشمس."
    },
    iconName: "sun"
  },
  {
    id: "fem-q-vitc",
    title: {
      en: "15% Pure Vitamin C + Hyaluronic Acid Glaze",
      ar: "سيروم فيتامين C النقي 15% مع الهيالورونيك لنضارة زجاجية"
    },
    category: "morning",
    xp: 50,
    completed: false,
    frequency: "daily",
    description: {
      en: "Neutralizes environmental free radicals and boosts collagen synthesis for radiant light reflection.",
      ar: "مضاد أكسدة قوي يوحد لون البشرة ويمنح انعكاساً مشرقاً كمرآة عاكسة للضوء."
    },
    iconName: "droplets"
  },
  {
    id: "fem-q-guasha",
    title: {
      en: "3-Minute Jade / Rose Quartz Gua Sha Cheek Sculpt",
      ar: "تدليك الغوا شا لنحت الوجنتين وتصريف السوائل (3 دقائق)"
    },
    category: "morning",
    xp: 75,
    completed: true,
    frequency: "daily",
    description: {
      en: "Upward sweeps along the zygomatic arch drain lymphatic stagnation and lift the midface contours.",
      ar: "حركات مسح للأعلى على طول عظام الوجنتين لرفع الخدود وتحديد خط الفك بانسيابية."
    },
    iconName: "sparkles"
  },
  {
    id: "fem-q-swan-neck",
    title: {
      en: "Swan Neck & Clavicle Alignment Reset (3x15)",
      ar: "تمرين إطالة الرقبة وإبراز عظام الترقوة (3x15)"
    },
    category: "anytime",
    xp: 65,
    completed: false,
    frequency: "daily",
    description: {
      en: "Lengthens cervical profile, eliminates tech-neck compression, and enhances clavicle bone definition.",
      ar: "يطيل مظهر الرقبة ويصحح انحناء الهاتف ويبرز عظام الترقوة بأناقة أنثوية فائقة."
    },
    iconName: "user-check"
  },
  {
    id: "fem-q-double-cleanse",
    title: {
      en: "Evening Double Cleanse (Camellia Oil + Gentle Foam)",
      ar: "التنظيف المزدوج المسائي (زيت الكاميليا + غسول لطيف)"
    },
    category: "evening",
    xp: 60,
    completed: false,
    frequency: "daily",
    description: {
      en: "Melts SPF and pollution without stripping the lipid moisture barrier.",
      ar: "يذيب واقي الشمس والشوائب بعمق دون تجريد حاجز البشرة الدهني من زيوته الطبيعية."
    },
    iconName: "sparkles"
  },
  {
    id: "fem-q-retinol-peptide",
    title: {
      en: "Multi-Peptide Glaze & Encapsulated Retinol (0.05%)",
      ar: "سيروم الببتيد المغذي مع كريم الريتينول المجدد للخلايا"
    },
    category: "evening",
    xp: 70,
    completed: false,
    frequency: "daily",
    description: {
      en: "Stimulates overnight dermal cellular turnover and collagen matrix thickening.",
      ar: "يحفز تجدد خلايا البشرة أثناء النوم ويعيد بناء كثافة طبقات الجلد ونعومتها."
    },
    iconName: "moon"
  },
  {
    id: "fem-q-silk-pillow",
    title: {
      en: "Mulberry Silk Pillowcase & Overnight Lip Mask",
      ar: "النوم على وسادة حرير التوت ومرطب الشفاه الليلي"
    },
    category: "evening",
    xp: 45,
    completed: false,
    frequency: "daily",
    description: {
      en: "Eliminates sleep-friction facial creases and prevents nighttime hair cuticular breakage.",
      ar: "يمنع تجاعيد النوم الناتجة عن احتكاك الوسادة ويحافظ على رطوبة الشعر والشفاه طوال الليل."
    },
    iconName: "moon"
  }
];

export const FEMALE_QUESTS = FEMALE_INITIAL_QUESTS;

export const FEMALE_CHALLENGES: Challenge[] = [
  {
    id: "c-fem-skin",
    title: {
      en: "21-Day Radiant Glass Skin & Barrier Reset",
      ar: "تحدي الـ 21 يوماً للبشرة الزجاجية وترميم الحاجز"
    },
    description: {
      en: "Master medical-grade hydration layering, fade dark spots, and achieve high-wattage natural dermal glow.",
      ar: "إتقان طبقات الترطيب العلمي، إزالة التصبغات، وتحقيق إشراقة زجاجية طبيعية تعكس الضوء بوضوح."
    },
    durationDays: 21,
    currentDay: 12,
    participants: 21400,
    badgeName: "Glass Skin Empress",
    rewardXp: 1200,
    joined: true,
    category: "skin",
    tasksSummary: {
      en: "Daily: AM Vitamin C + SPF 50, PM Double Cleanse, Ceramides, 2.5L water.",
      ar: "يومياً: فيتامين C وواقي شمس صباحاً، تنظيف مزدوج وسيراميد ليلاً، و2.5 لتر ماء."
    }
  },
  {
    id: "c-fem-guasha",
    title: {
      en: "14-Day Facial Sculpting & Lymphatic Gua Sha",
      ar: "تحدي الـ 14 يوماً لنحت الوجه وتصريف السائل اللمفاوي"
    },
    description: {
      en: "Daily lymphatic sweeps along cheekbones, jawline, and neck to sculpt cheek apex and banish puffiness.",
      ar: "جلسات تدليك يومية على عظام الوجنتين والرقبة لنحت الخدود والتخلص التام من انتفاخ الوجه."
    },
    durationDays: 14,
    currentDay: 6,
    participants: 18950,
    badgeName: "Gua Sha Alchemist",
    rewardXp: 950,
    joined: true,
    category: "jawline",
    tasksSummary: {
      en: "Daily: 5-min Gua Sha with squalane oil, cold spoon eye drain, strict low sodium.",
      ar: "يومياً: 5 دقائق تدليك بزيت السكوالين، كمادات باردة للعينين، وتقليل الأملاح."
    }
  },
  {
    id: "c-fem-posture",
    title: {
      en: "14-Day Swan Neck & Clavicle Elegance",
      ar: "تحدي الـ 14 يوماً لاستقامة الرقبة وأناقة الترقوة"
    },
    description: {
      en: "Correct forward head posture, lengthen the cervical silhouette, and accentuate elegant clavicle lines.",
      ar: "تصحيح انحناء الرأس للأمام وإطالة خط الرقبة وإبراز عظام الترقوة بمظهر ملكي جذاب."
    },
    durationDays: 14,
    currentDay: 3,
    participants: 14200,
    badgeName: "Swan Posture Icon",
    rewardXp: 800,
    joined: false,
    category: "posture",
    tasksSummary: {
      en: "Daily: 3x15 wall chin tucks, doorway shoulder rolls, screen at eye level.",
      ar: "يومياً: 3 مجموعات شد الرقبة، فتح الأكتاف على الباب، ورفع الشاشات لمستوى النظر."
    }
  },
  {
    id: "c-fem-hair",
    title: {
      en: "30-Day Hair Gloss & Scalp Density Sprint",
      ar: "تحدي الـ 30 يوماً لكثافة ولمعان الشعر وتأطير الوجه"
    },
    description: {
      en: "Revitalize hair follicles with rosemary scalp stimulation, silk protection, and peptide nourishment.",
      ar: "تغذية بصيلات الشعر بزيت إكليل الجبل والتدليك اليومي والحماية بالحرير لكثافة ولمعان باهر."
    },
    durationDays: 30,
    currentDay: 0,
    participants: 16800,
    badgeName: "Gloss Crown Queen",
    rewardXp: 1100,
    joined: false,
    category: "lifestyle",
    tasksSummary: {
      en: "Daily: 3-min inverted scalp massage, rosemary oil 2x/week, silk sleep bonnet.",
      ar: "يومياً: 3 دقائق تدليك لفروة الرأس، زيت إكليل الجبل مرتين أسبوعياً، وغطاء نوم حريري."
    }
  }
];

export const FEMALE_ROUTINE_GUIDES: RoutineGuide[] = [
  {
    id: "rg-fem-glass-skin",
    title: {
      en: "The Korean Glass Skin & Barrier Architecture",
      ar: "بروتوكول البشرة الزجاجية الكورية وترميم الحاجز الواقي"
    },
    subtitle: {
      en: "How to layer hydrating humectants and ceramides for translucent specular light bounce.",
      ar: "الترتيب العلمي لمرطبات الهيالورونيك والسيراميد لانعكاس الضوء النقي كسطح الزجاج."
    },
    category: "skin",
    duration: "Daily Ritual",
    scienceNote: {
      en: "When the stratum corneum is saturated with intercellular lipids and ceramides, skin roughness drops beneath 0.2 microns, causing incoming light to reflect specularly like polished glass.",
      ar: "عند تشبع الطبقة السطحية بالسيراميدات والدهون الصحية، تنخفض خشونة الجلد الدقيقة لأقل من 0.2 ميكرون، مما يعكس الضوء كمرآة نقية بدلاً من تشتته."
    },
    steps: [
      {
        title: { en: "1. Gentle Ferment / Essences", ar: "1. خلاصة التخمير والترطيب الأولي" },
        detail: {
          en: "Pat a galactomyces or rice ferment essence onto freshly cleansed damp skin to prime water channels.",
          ar: "تطبيق خلاصة الأرز أو الخمائر الطبيعية على بشرة رطبة لتفتيح القنوات المائية بالجلد."
        }
      },
      {
        title: { en: "2. Active Brightening Glaze", ar: "2. مصل التفتيح والنضارة الفعالة" },
        detail: {
          en: "Apply 2% Alpha Arbutin or 10% pure L-Ascorbic Acid to erase dark spots and enhance luminescence.",
          ar: "سيروم ألفا أربوتين 2% أو فيتامين C النقي لمحو التصبغات وتوحيد لون البشرة."
        }
      },
      {
        title: { en: "3. Quad-Ceramide Barrier Lock", ar: "3. حبس الرطوبة بمركب السيراميد الرباعي" },
        detail: {
          en: "Lock in moisture with a rich peptide-ceramide cream. Follow with mineral SPF 50 during daytime.",
          ar: "كريم غني بأربعة أنواع سيراميد وببتيدات، يليه واقي شمس معدني SPF 50 خلال النهار."
        }
      }
    ]
  },
  {
    id: "rg-fem-guasha",
    title: {
      en: "Lymphatic Gua Sha & Cheekbone Sculpting",
      ar: "فن تدليك الغوا شا لنحت الوجنتين ورفع الخدود"
    },
    subtitle: {
      en: "The anatomical technique to drain facial fluid and lift the midface natural contours.",
      ar: "التقنية التشريحية الصحيحة لتصريف السائل اللمفاوي وإبراز قمة عظام الوجنتين."
    },
    category: "jawline",
    duration: "5 Mins AM/PM",
    scienceNote: {
      en: "Lymphatic vessels lack a muscular pump and rely entirely on gentle directional pressure to drain toward the clavicular nodes. Regular drainage reveals bone structure hidden beneath fluid.",
      ar: "الأوعية اللمفاوية لا تحتوي على مضخة وتعتمد كلياً على الضغط اللطيف للتصريف نحو عقد الترقوة، والتصريف المنتظم يبرز تفاصيل الوجه المنحوتة."
    },
    steps: [
      {
        title: { en: "1. Neck Canal Opening", ar: "1. فتح قنوات الرقبة لتسهيل التصريف" },
        detail: {
          en: "Apply 3 drops squalane oil. Sweep downward from below the ear to the collarbone 5 times on each side.",
          ar: "وضع 3 قطرات من زيت السكوالين، ثم المسح للأسفل من خلف الأذن إلى عظمة الترقوة 5 مرات."
        }
      },
      {
        title: { en: "2. Zygomatic Cheek Sweep", ar: "2. مسح ونحت عظام الوجنتين للأعلى" },
        detail: {
          en: "Hold the stone at a 15° flat angle. Glide from the corner of the mouth along the cheekbone up to the hairline with gentle medium pressure.",
          ar: "إمساك حجر الغوا شا بزاوية مسطحة 15 درجة، والتحرك بنعومة من زاوية الفم للأعلى حتى خط الشعر."
        }
      },
      {
        title: { en: "3. Eye Canthal Lift", ar: "3. تصريف محيط العين ورفع زاوية العين" },
        detail: {
          en: "Use the rounded edge under the eye outwards toward the temple to smooth fine puffiness and lift canthal tilt.",
          ar: "استخدام الحافة المستديرة تحت العين بسحب لطيف نحو الصدغ للتخلص من الانتفاخ ورفع زاوية العين."
        }
      }
    ]
  },
  {
    id: "rg-fem-swan-posture",
    title: {
      en: "Swan Neck, Clavicle Grace & Cervical Alignment",
      ar: "استقامة الرقبة الملكية وأناقة عظام الترقوة"
    },
    subtitle: {
      en: "Eliminate forward head slumping to visibly elongate the neck by 1.5 cm.",
      ar: "التخلص من انحناء الرقبة للهواتف لإطالة مظهر الرقبة بمقدار 1.5 سم وإبراز الترقوة."
    },
    category: "posture",
    duration: "7 Mins Daily",
    scienceNote: {
      en: "Forward head posture stretches the submental fascia and drags the platysma muscle down, creating an illusion of double chin even at lean bodyfat percentages.",
      ar: "انحناء الرأس للأمام يشد اللفافة تحت الذقن ويرخي عضلة الرقبة، مما يعطي مظهراً ممتلئاً للذقن حتى مع انخفاض نسبة الدهون."
    },
    steps: [
      {
        title: { en: "1. Wall Alignment Reset", ar: "1. ضبط الاستقامة على الجدار" },
        detail: {
          en: "Stand against a wall. Tuck your chin straight back like making a double chin, feeling the back of the skull lift.",
          ar: "الوقوف ملاصقاً للجدار، وسحب الذقن للخلف برفق مع الشعور بارتفاع مؤخرة الرأس للأعلى."
        }
      },
      {
        title: { en: "2. Clavicle Chest Opener", ar: "2. فتح الصدر وإبراز الترقوة" },
        detail: {
          en: "Clasp hands behind your lower back, roll shoulders down and back, lifting the sternum gently.",
          ar: "تشبيك اليدين خلف الظهر، تدوير الكتفين للأسفل والخلف مع رفع عظمة الصدر باعتدال."
        }
      }
    ]
  }
];

export const INITIAL_FEMALE_SCAN: ScanResult = {
  id: "scan-fem-demo-01",
  date: "Today, 08:30 AM",
  overallScore: 89,
  potentialScore: 97,
  imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
  gonialAngle: "126° (Soft Tapered Mandible)",
  jawlineScore: 87,
  symmetryScore: 94,
  skinScore: 89,
  canthalTilt: "+4.6° (Positive Feline Tilt)",
  facialThirds: "1.00 : 0.98 : 1.02 (Golden Balance)",
  metrics: [
    {
      name: { en: "Zygomatic Apex & Cheekbone Lift", ar: "بروز عظام الوجنتين وانعكاس الضوء" },
      score: 93,
      target: 95,
      unit: "Index",
      status: { en: "Exceptional", ar: "استثنائي" },
      feedback: {
        en: "High, prominent cheekbone arches create beautiful natural light reflection and youthful midface support.",
        ar: "بروز رائع لعظام الوجنتين يوفر دعماً طبيعياً لمنتصف الوجه ويعكس الضوء بإشراقة حيوية."
      }
    },
    {
      name: { en: "Positive Canthal Tilt", ar: "ميلان زاوية العينين الإيجابي" },
      score: 91,
      target: 95,
      unit: "deg",
      status: { en: "Optimal Feline Lift", ar: "سحبة قطة مثالية" },
      feedback: {
        en: "Outer canthus is elevated +4.6° relative to medial canthus, giving magnetic, youthful feminine eye allure.",
        ar: "زاوية العين الخارجية أعلى بـ +4.6 درجات من الزاوية الداخلية، مما يمنح العينين سحراً وجاذبية ناعمة."
      }
    },
    {
      name: { en: "Dermal Hydration & Glass Glow", ar: "ترطيب البشرة والنضارة الزجاجية" },
      score: 88,
      target: 96,
      unit: "%",
      status: { en: "Luminous", ar: "مشرق ومتألق" },
      feedback: {
        en: "Smooth stratum corneum reflecting specular light. Further ceramide layering will maximize full glass radiance.",
        ar: "طبقة سطحية ناعمة تعكس الضوء بامتياز، وترطيب إضافي بالسيراميد سيرفع الإشراقة للدرجة القصوى."
      }
    },
    {
      name: { en: "Facial Thirds & Soft Symmetry", ar: "تناسق أثلاث الوجه والتناظر الأنثوي" },
      score: 92,
      target: 95,
      unit: "Ratio",
      status: { en: "Near Golden Ratio", ar: "قريب جداً من النسبة الذهبية" },
      feedback: {
        en: "Forehead, midface, and lower third are harmoniously balanced with gentle chin tapering.",
        ar: "توازن رائع بين الجبهة ومنتصف الوجه والذقن الانسيابي الناعم المتناسق."
      }
    },
    {
      name: { en: "Swan Neck & Clavicle Posture", ar: "استقامة الرقبة وأناقة الترقوة" },
      score: 84,
      target: 94,
      unit: "deg",
      status: { en: "Good (Slight Tech-Tilt)", ar: "جيد (ميلان طفيف للهواتف)" },
      feedback: {
        en: "Slight forward cervical tilt from desk posture. Chin tucks and doorway stretches will lengthen neck profile.",
        ar: "ميلان خفيف للأمام نتيجة الشاشات. تمارين شد الرقبة ستزيد من طولها وأناقتها."
      }
    }
  ],
  strengths: [
    {
      en: "Striking positive canthal tilt (+4.6°) providing naturally lifted, expressive eyes.",
      ar: "ميلان عيني إيجابي رائع (+4.6°) يمنح مظهراً مرفوعاً وساحراً للعينين بشكل طبيعي."
    },
    {
      en: "High zygomatic cheekbone projection with beautiful specular light reflection.",
      ar: "بروز ممتاز لعظام الوجنتين مع انعكاس ضوئي جذاب يبرز نضارة الملامح."
    },
    {
      en: "Harmonious philtrum-to-chin proportion giving soft, balanced feminine facial thirds.",
      ar: "تناسب متوازن بين مسافة الأنف والشفاه والذقن يمنح تناغماً أنثوياً فائقاً."
    }
  ],
  improvements: [
    {
      en: "Mild morning periorbital puffiness that responds rapidly to cold cryo-rolling and lymphatic drainage.",
      ar: "انتفاخ خفيف صباحاً حول العينين يزول سريعاً بالتدليك البارد والتصريف اللمفاوي."
    },
    {
      en: "Cheek dermal hydration can be elevated to achieve mirror-like Korean glass skin reflection.",
      ar: "يمكن رفع ترطيب الوجنتين بالسيراميد لتحقيق النضارة الزجاجية العاكسة للنور."
    },
    {
      en: "Subtle forward head posture that hides ~1 cm of elegant cervical neck height.",
      ar: "انحناء طفيف للرأس للأمام يخفي قرابة 1 سم من طول واستقامة الرقبة الأنيقة."
    }
  ],
  customRoutine: {
    morning: [
      {
        en: "2-minute cryo ice-roller or cold ice spoon sweep along cheekbones.",
        ar: "تمرير رولر مثلج أو ملعقة باردة على عظام الوجنتين لمدة دقيقتين."
      },
      {
        en: "Apply 15% Vitamin C serum followed by lightweight invisible SPF 50 shield.",
        ar: "سيروم فيتامين C بنسبة 15% يليه واقي شمس خفيف غير مرئي SPF 50."
      },
      {
        en: "Perform 15 wall-assisted chin tucks to align cervical spine and clavicles.",
        ar: "15 تكراراً لتمرين استقامة الرقبة على الجدار لإبراز عظام الترقوة."
      }
    ],
    evening: [
      {
        en: "5-minute gentle Rose Quartz Gua Sha sweep from chin to mastoid and collarbone.",
        ar: "تدليك الغوا شا لمدة 5 دقائق من منتصف الذقن نحو خلف الأذن والترقوة."
      },
      {
        en: "Ceramide & peptide barrier repair cream over 0.05% encapsulated retinol.",
        ar: "كريم مرمم بحاجز السيراميد والببتيدات فوق طبقة ريتينول لطيفة 0.05%."
      },
      {
        en: "Rest on pure mulberry silk pillowcase with slight cervical elevation.",
        ar: "النوم على وسادة من حرير التوت الطبيعي لمنع تجاعيد الاحتكاك الليلية."
      }
    ]
  },
  detectedGender: "female",
  faceShape: FACE_SHAPE_PRESETS.oval.analysis,
  femaleHairstyles: FACE_SHAPE_PRESETS.oval.femaleHairstyles,
  eyebrowStyles: FEMALE_EYEBROW_PRESETS.oval,
  stylesToAvoid: {
    menHairstyles: [],
    womenHairstyles: FACE_SHAPE_PRESETS.oval.stylesToAvoid.womenHairstyles,
    beards: [],
    eyebrows: [
      {
        en: "Excessively sharp angular arches that break soft feminine balance.",
        ar: "الأقواس الحادة القاسية جداً التي تكسر نعومة التناغم الأنثوي."
      },
      {
        en: "Flat, thin 90s brows that age the periorbital area prematurely.",
        ar: "الحواجب الرفيعة جداً كحقبة التسعينات التي تظهر منطقة العينين متقدمة في السن."
      }
    ]
  },
  immediateGlowUpTips: [
    {
      id: "fem-tip-1",
      category: "debloat",
      timeMinutes: 2,
      title: { en: "Cryo Ice Spoon Cheekbone Drain", ar: "تصريف ونحت الوجنتين بالملاعق الباردة" },
      instructions: {
        en: "Take two chilled metal spoons. Glide back of spoons from corner of mouth up toward temple.",
        ar: "استخدمي ملعقتين مثلجتين، حركي ظهر الملعقة من زاوية الفم للأعلى باتجاه الصدغ بلطف."
      },
      instantBenefit: {
        en: "Cuts midface fluid puffiness by 30% and instantly reveals cheekbone highlights.",
        ar: "يقلل انتفاخ الخدود بـ 30% ويبرز عظام الوجنتين فوراً."
      }
    },
    {
      id: "fem-tip-2",
      category: "brows",
      timeMinutes: 1,
      title: { en: "Spoolie Canthal Tilt Lift", ar: "رفع زاوية العين بسحبة الحاجب" },
      instructions: {
        en: "Brush brow tail hairs upward and diagonally at a 45° angle with clear gel.",
        ar: "مشطي الثلث الخارجي من الحاجب للأعلى بزاوية 45° باستخدام جل حواجب شفاف."
      },
      instantBenefit: {
        en: "Creates an immediate optical +3° lift to the eye canthal angle.",
        ar: "يمنح سحبة فورية إيجابية لزاوية العينين تضاهي تأثير الفوكس آيز الطبيعي."
      }
    },
    {
      id: "fem-tip-3",
      category: "skin",
      timeMinutes: 1,
      title: { en: "High Cheek Apex Glass Glaze", ar: "لمسة الإشراقة الزجاجية على قمة الوجنتين" },
      instructions: {
        en: "Dab a drop of squalane oil or hyaluronic balm on highest point of cheekbones.",
        ar: "ضعي قطرة خفيفة من زيت السكوالين أو مرطب الهيالورونيك على أعلى نقطة في الوجنتين."
      },
      instantBenefit: {
        en: "Creates specular camera reflection and a radiant dewy light bounce.",
        ar: "يعكس إضاءة طبيعية ساطعة تبرز نضارة البشرة كسطح الزجاج النقي."
      }
    },
    {
      id: "fem-tip-4",
      category: "posture",
      timeMinutes: 2,
      title: { en: "Swan Neck & Clavicle Reset", ar: "إطالة الرقبة وإبراز عظام الترقوة" },
      instructions: {
        en: "Drop shoulders back and down, slightly elevate chin, and lengthen spine upwards.",
        ar: "أرجعي الكتفين للخلف والأسفل مع رفع الذقن قليلاً وإطالة العمود الفقري للأعلى."
      },
      instantBenefit: {
        en: "Visibly adds 1 cm to neck profile and accentuates the elegant clavicle line.",
        ar: "يضيف طولاً ملحوظاً للرقبة ويبرز عظام الترقوة بأناقة أنثوية ملفتة."
      }
    }
  ],
  visualizedAfterUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
  transformationNotes: [
    { en: "Soft face-framing butterfly layers accentuate cheekbones and elongate neck line.", ar: "طبقات الفراشة المتدرجة تؤطر الملامح وتبرز الوجنتين وتطيل الرقبة." },
    { en: "Feathered brow arch lift enhances positive canthal tilt to +5°.", ar: "رفع قوس الحاجب الطبيعي يعزز ميلان العين الإيجابي إلى +5 درجات." },
    { en: "Lymphatic drainage and cryo sweep sculpted 25% of morning midface puffiness.", ar: "التصريف اللمفاوي قلل انتفاخ منتصف الوجه بـ 25% وأبرز النحت الطبيعي." },
    { en: "Dewy, glass skin hydration reflection focused on zygomatic bone apex.", ar: "انعكاس إشراقة زجاجية نضرة ومرآة عاكسة للضوء على قمة عظام الوجنتين." }
  ]
};
