import { 
  FaceShapeType, 
  FaceShapeAnalysis, 
  HairstyleRecommendation, 
  BeardRecommendation, 
  GlowUpImmediateTip, 
  StylesToAvoid 
} from "../types";

export interface FaceShapePreset {
  analysis: FaceShapeAnalysis;
  maleHairstyles: HairstyleRecommendation[];
  femaleHairstyles: HairstyleRecommendation[];
  beardStyles: BeardRecommendation[];
  stylesToAvoid: StylesToAvoid;
  immediateGlowUpTips: GlowUpImmediateTip[];
}

export const FACE_SHAPE_PRESETS: Record<FaceShapeType, FaceShapePreset> = {
  oval: {
    analysis: {
      shape: "oval",
      name: { en: "Oval Face Shape", ar: "شكل الوجه البيضاوي (Oval)" },
      confidence: 94,
      description: {
        en: "The classic ideal of facial symmetry. Face length is roughly 1.5 times the width, with gently curved jawlines and a forehead slightly wider than the chin.",
        ar: "المعيار الكلاسيكي للتناسق والتناغم الجمالي. طول الوجه يبلغ حوالي 1.5 ضعف العرض، مع خط فك منحني بنعومة وجبهة أعرض قليلاً من الذقن."
      },
      proportions: {
        lengthToWidthRatio: "1.5 : 1 (Ideal Balance)",
        foreheadWidth: { en: "Balanced, slightly wider than jaw", ar: "متوازنة، أعرض قليلاً من الفك" },
        cheekboneWidth: { en: "Widest point of the face, high arches", ar: "أعرض نقطة في الوجه مع بروز طبيعي" },
        jawlineWidth: { en: "Gently rounded, harmonious curve", ar: "منحنية بنعومة مع انسيابية متناسقة" }
      },
      keyBalancingPrinciple: {
        en: "Preserve the natural equilibrium. Avoid styles that add excessive height or pull hair too flat against the sides.",
        ar: "الحفاظ على التوازن الطبيعي دون المبالغة في زيادة الطول للأعلى أو تسطيح الجوانب بشكل مفرط."
      }
    },
    maleHairstyles: [
      {
        id: "m-oval-1",
        name: { en: "Textured Mid-Fade Quiff", ar: "تسريحة كويف بملمس متدرج (Quiff Mid-Fade)" },
        length: "medium",
        idealForGender: "male",
        whyItWorks: {
          en: "Subtly accentuates natural bone structure while maintaining forehead balance and jawline visibility.",
          ar: "يبرز البنية العظمية الطبيعية مع الحفاظ على توازن الجبهة ووضوح خط الفك."
        },
        stylingTip: {
          en: "Blow dry upward with sea salt spray, then lock with a dime-sized matte clay for all-day volume.",
          ar: "جفف الشعر للأعلى برذاذ ملح البحر، ثم ثبت بلمسة من صلصال الشعر غير اللامع (Matte Clay)."
        },
        productRecommendation: { en: "Matte Styling Clay + Sea Salt Spray", ar: "صلصال مصفف غير لامع + سبراي ملح البحر" },
        tag: { en: "Best All-Rounder", ar: "الأكثر تنوعاً وجاذبية" }
      },
      {
        id: "m-oval-2",
        name: { en: "Classic Side-Part Pompadour", ar: "بومبادور كلاسيكي مع فرق جانبي" },
        length: "medium",
        idealForGender: "male",
        whyItWorks: {
          en: "Draws eye movement diagonally across facial thirds, enhancing symmetry and maturity.",
          ar: "يوجه النظر قطرياً عبر أثلاث الوجه، مما يمنح مظهراً رجولياً راقياً ومتوازناً."
        },
        stylingTip: {
          en: "Use a wide-tooth comb to guide hair back and to the side while damp, finishing with medium-shine paste.",
          ar: "مشط الشعر للخلف والجانب وهو رطب بمشط واسع الأسنان وثبت بمرهم متوسط اللمعان."
        },
        productRecommendation: { en: "Medium-Hold Styling Pomade", ar: "مرهم تصفيف متوسط الثبات" },
        tag: { en: "Sharp & Sophisticated", ar: "أنيق ورسمي" }
      },
      {
        id: "m-oval-3",
        name: { en: "Textured Crop with Taper Fade", ar: "قصة كروب محكمة مع تلاشي جانبي" },
        length: "short",
        idealForGender: "male",
        whyItWorks: {
          en: "Keeps attention locked on cheekbones and eye canthal tilt without elongating the silhouette.",
          ar: "يركز الانتباه على عظام الوجنتين وميلان العينين دون زيادة طول الرأس."
        },
        stylingTip: {
          en: "Work texturizing styling powder into dry roots for effortless separation and grit.",
          ar: "ضع بودرة التصفيف على الجذور الجافة للحصول على مظهر طبيعي متموج وعصري."
        },
        productRecommendation: { en: "Volumizing Hair Powder", ar: "بودرة تعزيز الكثافة والملمس" },
        tag: { en: "Low Maintenance & Sharp", ar: "عملية وعالية الجاذبية" }
      }
    ],
    femaleHairstyles: [
      {
        id: "f-oval-1",
        name: { en: "Curtain Bangs with Cascading Layers", ar: "غرة ستائرية (Curtain Bangs) مع طبقات مموجة" },
        length: "long",
        idealForGender: "female",
        whyItWorks: {
          en: "Gracefully frames high cheekbones and guides focus directly to the eyes and lips.",
          ar: "تؤطر عظام الخدين البارزة بدقة وتوجه التركيز فوراً نحو بريق العينين وجمال الشفتين."
        },
        stylingTip: {
          en: "Blow out curtain bangs away from the face with a round ceramic brush for effortless bounce.",
          ar: "لفي الغرة بالفرشاة الدائرية بعيداً عن الوجه أثناء التجفيف لمنحها حركة حيوية طبيعية."
        },
        productRecommendation: { en: "Heat Protectant Mist + Volumizing Mousse", ar: "سبراي حماية من الحرارة + موس تكثيف" },
        tag: { en: "Model Favorite", ar: "المفضلة لدى عارضات الأزياء" }
      },
      {
        id: "f-oval-2",
        name: { en: "Collarbone Textured Lob", ar: "قصة لوب مدرجة عند عظمة الترقوة" },
        length: "medium",
        idealForGender: "female",
        whyItWorks: {
          en: "Hits right at the collarbone, highlighting neck posture and mandibular definition.",
          ar: "تستقر عند عظام الترقوة مما يبرز استقامة الرقبة ويحدد خط الفك بوضوح."
        },
        stylingTip: {
          en: "Create loose S-waves with a 1.25-inch curling wand, leaving the bottom inch straight.",
          ar: "اصنعي تموجات خفيفة على شكل حرف S بمكواة التجعيد مع ترك الأطراف مستقيمة."
        },
        productRecommendation: { en: "Dry Texture Spray + Argan Serum", ar: "سبراي ملمس جاف + سيروم الأرجان" },
        tag: { en: "Modern & Sleek", ar: "عصرية وأنيقة" }
      },
      {
        id: "f-oval-3",
        name: { en: "Sleek High Ponytail or Topknot", ar: "ذيل حصان عالي مشدود أو كعكة راقية" },
        length: "medium",
        idealForGender: "female",
        whyItWorks: {
          en: "Creates an instant non-surgical face-lift effect, highlighting perfect oval harmony and canthal tilt.",
          ar: "يمنح تأثيراً مشابهاً لشد الوجه الفوري ويبرز التناغم البيضاوي وزاوية العينين."
        },
        stylingTip: {
          en: "Align ponytail placement with cheekbone angle toward the crown; smooth baby hairs with a spoolie and hair wax.",
          ar: "اربطي ذيل الحصان على امتداد خط عظمة الخد نحو تاج الرأس وثبتي الشعيرات الدقيقة بشمع التصفيف."
        },
        productRecommendation: { en: "Slick Stick Wax + Shine Spray", ar: "إصبع شمع للتثبيت + سبراي لمعان" },
        tag: { en: "Instant Face Lift", ar: "شد طبيعي للملامح" }
      }
    ],
    beardStyles: [
      {
        id: "b-oval-1",
        name: { en: "3-Day Heavy Designer Stubble (3-4mm)", ar: "لحية خفيفة مصممة 3 أيام (3-4 ملم)" },
        lengthCategory: "stubble",
        whyItWorks: {
          en: "Darkens the lower jaw border without altering symmetrical oval geometry, providing rugged contrast.",
          ar: "تحدد الحافة السفلية للفك وتمنح تبايناً جذاباً دون الإخلال بتناسق الوجه البيضاوي."
        },
        trimmingGuide: {
          en: "Keep guard at 3.5mm; razor-shave clean boundaries on cheeks and 1.5 fingers above Adam's apple.",
          ar: "اضبط المشذب على 3.5 ملم واحلق بدقة أعلى الخدين وبمسافة إصبعين فوق تفاحة آدم."
        },
        necklineTip: { en: "Follow natural crease 1.5 inches above Adam's apple.", ar: "اتبع الانحناء الطبيعي فوق تفاحة آدم بإصبع ونصف." },
        avoidTip: { en: "Do not let stubble creep down the throat.", ar: "تجنب ترك الشعر يمتد للأسفل على الرقبة." },
        tag: { en: "Top Aesthetic Choice", ar: "الخيار الأكثر جاذبية" }
      },
      {
        id: "b-oval-2",
        name: { en: "Tapered Short Boxed Beard", ar: "لحية محددة قصيرة مع تدريج السوالف" },
        lengthCategory: "short",
        whyItWorks: {
          en: "Squares off the rounded chin slightly, creating a more masculine, defined gonial impression.",
          ar: "تمنح الذقن لمسة مستقيمة هندسية تعزز حدة زاوية الفك الرجولية."
        },
        trimmingGuide: {
          en: "Fade sideburns down from 2mm at ears into 6mm at jaw and 8mm at chin point.",
          ar: "تدرج السوالف من 2 ملم عند الأذن إلى 6 ملم عند الفك و8 ملم عند مقدمة الذقن."
        },
        necklineTip: { en: "Keep a sharp, curved line framing the mandible.", ar: "حافظ على خط منحني ونظيف يعانق عظم الفك." },
        avoidTip: { en: "Avoid round circular trimming under chin.", ar: "تجنب التحديد الدائري تحت الذقن." },
        tag: { en: "Chiseled Definition", ar: "تحديد ونحت مثالي" }
      },
      {
        id: "b-oval-3",
        name: { en: "Corporate Groomed Full Beard", ar: "لحية كاملة مشذبة ومهذبة (Corporate)" },
        lengthCategory: "medium",
        whyItWorks: {
          en: "Provides density and presence while keeping cheeklines crisp and professional.",
          ar: "تمنح هيبة وكثافة متوازنة مع الحفاظ على خطوط خد نظيفة واحترافية."
        },
        trimmingGuide: {
          en: "Comb downward, trim stray hairs with shears, and oil daily with jojoba and cedarwood.",
          ar: "مشط للأسفل وقص الشعيرات الشاردة واستخدم زيت الجوجوبا لترطيب اللحية."
        },
        necklineTip: { en: "Clean razor finish 2cm above thyroid cartilage.", ar: "تنظيف دقيق بالشفرة أعلى غضروف الرقبة بـ 2 سم." },
        avoidTip: { en: "Don't let sides flare out wider than cheekbones.", ar: "لا تدع الجوانب تنتفخ لتصبح أعرض من عظام الخدين." },
        tag: { en: "Executive Presence", ar: "هيبة وقوة كلاسيكية" }
      }
    ],
    stylesToAvoid: {
      menHairstyles: [
        { en: "Thick blunt forward fringe covering forehead completely (shortens face artificially)", ar: "الغرة المستقيمة السميكة التي تغطي الجبهة بالكامل (تقصر الوجه بشكل غير متناسق)" },
        { en: "Overly tall pompadours > 4 inches (creates unnecessary vertical elongation)", ar: "التسريحات شديدة الارتفاع فوق 10 سم (تزيد طول الوجه دون داعٍ)" }
      ],
      womenHairstyles: [
        { en: "Heavy blunt bangs with pin-straight flat sides (hides symmetry)", ar: "الغرة الثقيلة المستقيمة مع جوانب مسطحة تخفي التناسق الطبيعي" },
        { en: "Excessive volume concentrated purely on top of head", ar: "الكثافة المفرطة المحصورة فقط في أعلى الرأس" }
      ],
      beards: [
        { en: "Extremely long ducktail beard (exaggerates facial length)", ar: "اللحية الطويلة المدببة جداً (Ducktail) لأنها تطيل الوجه أكثر من اللازم" },
        { en: "Unshaped neckbeard without distinct border", ar: "شعر الرقبة غير المشذب دون خط فاصل واضح" }
      ]
    },
    immediateGlowUpTips: [
      {
        id: "tip-debloat",
        category: "debloat",
        timeMinutes: 3,
        title: { en: "Mandibular Ice-Roller Sweep", ar: "تدليك خط الفك بالثلج أو الرولر البارد" },
        instructions: {
          en: "Sweep an ice cube or frozen spoon along your jawline from chin to earlobes with gentle upward pressure for 2 minutes.",
          ar: "مرر مكعب ثلج أو ملعقة مبردة على طول عظم الفك من الذقن باتجاه شحمة الأذن بضغط خفيف لمدة دقيقتين."
        },
        instantBenefit: {
          en: "Vasoconstriction drops morning puffiness by ~30%, revealing sharp mandibular bone immediately.",
          ar: "تضييق الأوعية الدقيقة يقلل انتفاخ الصباح بنسبة 30% ويبرز حدة الفك العظمية فوراً."
        },
        scienceNote: { en: "Accelerates lymphatic drainage via superficial cervical nodes.", ar: "يسرع تصريف السوائل عبر الغدد اللمفاوية السطحية." }
      },
      {
        id: "tip-brows",
        category: "brows",
        timeMinutes: 2,
        title: { en: "Eyebrow Arch Elevation & Spoolie Groom", ar: "تهذيب وتمشيط الحواجب للأعلى" },
        instructions: {
          en: "Pluck any stray hairs between brows (glabella). Brush brow hairs upward and outward at a 45° angle with clear gel.",
          ar: "أزل الشعيرات الفردية بين الحاجبين، ومشط شعر الحاجب للأعلى وللخارج بزاوية 45 درجة بجل شفاف."
        },
        instantBenefit: {
          en: "Visually opens the orbital socket and reinforces a sharp, masculine or feminine positive canthal tilt.",
          ar: "يوسع محجر العين بصرياً ويعزز نظرة العيون الواثقة والمرفوعة بشكل فوري."
        }
      },
      {
        id: "tip-posture",
        category: "posture",
        timeMinutes: 1,
        title: { en: "Cervical Alignment & Mewing Suction", ar: "تعديل استقامة الرقبة ووضعية اللسان (Mewing)" },
        instructions: {
          en: "Tuck chin back gently (double-chin drill), pull shoulders down and back, and seal the posterior third of your tongue to your palate.",
          ar: "اسحب الذقن للخلف قليلاً (Chin Tuck)، انزل الكتفين وافردهم للخلف، والصق الثلث الخلفي للسان بسقف الحلق."
        },
        instantBenefit: {
          en: "Elevates the hyoid bone, instantly flattening loose submental tissue and sharpening your side profile.",
          ar: "يرفع عظم الحنجرة (Hyoid) ويشد الجلد المترهل تحت الذقن في ثوانٍ معدودة."
        }
      },
      {
        id: "tip-skin",
        category: "skin",
        timeMinutes: 2,
        title: { en: "Glass Glow Highlight Stacking", ar: "طبقات الإشراقة الزجاجية (Glass Glow)" },
        instructions: {
          en: "Mist face with water or toner, apply hyaluronic acid / peptide serum on damp skin, followed by a matte SPF 50+.",
          ar: "بلل الوجه برذاذ خفيف ثم ضع سيروم الهيالورونيك على بشرة ندية، ثم اتبع بواقي شمس SPF 50 خالي من اللمعان."
        },
        instantBenefit: {
          en: "Light bounces evenly off cheekbones and forehead, giving a radiant, rested model glow.",
          ar: "يعكس الضوء بشكل متجانس على عظام الخدين والجبهة ليمنحك مظهراً منتعشاً ومليئاً بالحيوية."
        }
      },
      {
        id: "tip-hair",
        category: "hair",
        timeMinutes: 2,
        title: { en: "Crown Volume Flip & Texture Boost", ar: "رفع جذور الشعر من التاج وإبراز الملمس" },
        instructions: {
          en: "Dust a pinch of styling powder at the crown roots and tousle upward with fingertips for instant 1-inch lift.",
          ar: "انثر لمسة من بودرة التصفيف على جذور الشعر في قمة الرأس وحركها بأصابعك للأعلى لرفع فوري."
        },
        instantBenefit: {
          en: "Creates dynamic vertical contrast that slims the cheeks and frames the facial thirds harmoniously.",
          ar: "يمنح تبايناً رأسياً يبرز تناسق ملامح الوجه ويجعل الإطلالة تبدو أكثر جاذبية."
        }
      }
    ]
  },

  square: {
    analysis: {
      shape: "square",
      name: { en: "Square Face Shape", ar: "شكل الوجه المربع (Square)" },
      confidence: 96,
      description: {
        en: "Characterized by a strong, prominent jawline, broad forehead, and equal width across forehead, cheekbones, and jaw. High masculinity and strong bone density.",
        ar: "يتميز بفك عريض وقوي، وجبهة عريضة، وتساوي نسبي بين عرض الجبهة والوجنتين والفك. يعكس قوة عظمية بارزة ومظهراً قيادياً حاداً."
      },
      proportions: {
        lengthToWidthRatio: "1 : 1 (Broad & Angular)",
        foreheadWidth: { en: "Wide, angular hairline", ar: "عريضة مع خط شعر مستقيم أو محدد" },
        cheekboneWidth: { en: "Broad, aligns with jaw width", ar: "عريضة توازي عرض الفك السفلي" },
        jawlineWidth: { en: "Sharp, 90-110° prominent gonial angle", ar: "حاد بزاوية فك قوية وواضحة (90-110°)" }
      },
      keyBalancingPrinciple: {
        en: "Soften the heavy angular jawline or celebrate its strength with textured layers, faded sides, and volume on top to add height.",
        ar: "تخفيف حدة الفك أو إبراز قوته بتسريحات تعتمد على طبقات متموجة، جوانب متلاشية، وارتفاع خفيف في الأعلى."
      }
    },
    maleHairstyles: [
      {
        id: "m-sq-1",
        name: { en: "Textured French Crop with High Skin Fade", ar: "كروب فرنسي متموج مع تلاشي مرتفع (High Fade)" },
        length: "short",
        idealForGender: "male",
        whyItWorks: {
          en: "Complements sharp bone structure by bringing texture to top while keeping sides ultra-clean to showcase jawline.",
          ar: "يكمل البنية العظمية الحادة بملمس متعرج من الأعلى مع جوانب نظيفة تبرز خط الفك بدقة."
        },
        stylingTip: {
          en: "Pinch fringe into jagged points with matte clay. Keep temples clipped down to skin.",
          ar: "حدد خصلات الغرة الأمامية بالصلصال المطفي وحافظ على نظافة الصدغين بتلاشي حاد."
        },
        productRecommendation: { en: "High-Hold Matte Clay", ar: "صلصال عالي التثبيت بدون لمعان" },
        tag: { en: "Ultra Masculine", ar: "قمة الرجولة والحدة" }
      },
      {
        id: "m-sq-2",
        name: { en: "Messy Textured Undercut", ar: "أندركت غير منتظم بملمس حيوي" },
        length: "medium",
        idealForGender: "male",
        whyItWorks: {
          en: "Adds height and movement to counteract equal facial width, elongating the silhouette attractively.",
          ar: "يضيف ارتفاعاً وحركة تكسر عرض الوجه المتساوي وتطيل المظهر بشكل جذاب."
        },
        stylingTip: {
          en: "Blow-dry hair backwards and up, apply sea salt spray for separation.",
          ar: "جفف الشعر للخلف والأعلى، واستخدم رذاذ الملح لإعطاء تباعد طبيعي بين الخصل."
        },
        productRecommendation: { en: "Sea Salt Spray + Matte Paste", ar: "رذاذ ملح البحر + معجون مطفي" },
        tag: { en: "Modern Warrior", ar: "إطلالة عصرية جريئة" }
      },
      {
        id: "m-sq-3",
        name: { en: "Classic Side Sweep with Soft Taper", ar: "تمشيط جانبي كلاسيكي مع تدرج ناعم" },
        length: "medium",
        idealForGender: "male",
        whyItWorks: {
          en: "Diagonal movement softens harsh horizontal angles while retaining executive authority.",
          ar: "الحركة القطرية تخفف من زوايا الوجه الأفقية الحادة مع الحفاظ على هيبة وأناقة لافتة."
        },
        stylingTip: {
          en: "Comb naturally along cowlick; avoid plastering hair flat against the scalp.",
          ar: "مشط مع اتجاه نمو الشعر وتجنب إلصاق الشعر بفروة الرأس تماماً."
        },
        productRecommendation: { en: "Fiber Cream", ar: "كريم ألياف مصفف (Fiber)" },
        tag: { en: "Executive Style", ar: "طابع قيادي راقي" }
      }
    ],
    femaleHairstyles: [
      {
        id: "f-sq-1",
        name: { en: "Butterfly Cut with Soft Face-Framing Waves", ar: "قصة الفراشة مع طبقات ناعمة حول الوجه" },
        length: "long",
        idealForGender: "female",
        whyItWorks: {
          en: "Cascading curved layers fall softly around the strong jaw corners, diffusing sharpness into elegant glamour.",
          ar: "تنسدل الطبقات المتموجة بنعومة حول زوايا الفك القوية، محولة الحدة إلى جاذبية أنثوية ساحرة."
        },
        stylingTip: {
          en: "Use large velcro rollers on the crown and face-framing pieces for 15 minutes before unrolling.",
          ar: "استخدمي بكرات الشعر الكبيرة لمدة 15 دقيقة على الطبقات الأمامية لمنحها حجماً مضاعفاً."
        },
        productRecommendation: { en: "Volumizing Mousse + Shine Spray", ar: "موس كثافة + رذاذ لمعان" },
        tag: { en: "Glamorous & Softening", ar: "ساحرة وتنعش الملامح" }
      },
      {
        id: "f-sq-2",
        name: { en: "Long Layered Shag with Curtain Fringe", ar: "شاج طويل متعدد الطبقات مع غرة ستائرية" },
        length: "long",
        idealForGender: "female",
        whyItWorks: {
          en: "Wispy ends and organic texture break up the boxy geometry of a square face structure.",
          ar: "الأطراف المتطايرة والملمس العفوي يكسران الخطوط الهندسية الصارمة للوجه المربع."
        },
        stylingTip: {
          en: "Scrunch in curl cream or texturizing spray while air drying.",
          ar: "اضغطي على أطراف الشعر بكريم التمويج أو سبراي التثبيت أثناء التجفيف الطبيعي."
        },
        productRecommendation: { en: "Wave & Texture Spray", ar: "سبراي التموجات والملمس" },
        tag: { en: "Effortless Chic", ar: "عفوية وأنيقة" }
      },
      {
        id: "f-sq-3",
        name: { en: "Deep Side Part with Cascading Curls", ar: "فرق جانبي عميق مع تموجات منسدلة" },
        length: "medium",
        idealForGender: "female",
        whyItWorks: {
          en: "Asymmetry disrupts square balance and sweeps the eye line dynamically across the face.",
          ar: "الفرق غير المتناظر يكسر توازي الوجه المربع ويوجه الأنظار بحركة انسيابية."
        },
        stylingTip: {
          en: "Part hair above the pupil of one eye and toss over; spray roots with hairspray.",
          ar: "افصلي الشعر عند محاذاة بؤبؤ إحدى العينين واقلبيه، ثم رشي الجذور بسبراي تثبيت خفيف."
        },
        productRecommendation: { en: "Flexible Hold Hairspray", ar: "مثبت شعر مرن" },
        tag: { en: "Red Carpet Hollywood", ar: "إطلالة هوليوودية" }
      }
    ],
    beardStyles: [
      {
        id: "b-sq-1",
        name: { en: "Rounded Heavy Stubble (4-5mm)", ar: "لحية خفيفة مدورة الحواف (4-5 ملم)" },
        lengthCategory: "stubble",
        whyItWorks: {
          en: "Softens the 90° mandibular corner while highlighting natural jawline shadow.",
          ar: "تلطف زوايا الفك القائمة مع إبراز ظل خط الفك الرجولي الطبيعي."
        },
        trimmingGuide: {
          en: "Curve the cheek line gently rather than keeping it razor-straight; fade sideburns higher up.",
          ar: "اجعل خط الخد منحنياً بانسيابية بدلاً من كونه حاداً مستقيماً، مع تخفيف السوالف للأعلى."
        },
        necklineTip: { en: "Trim into a gentle horseshoe curve 1 inch above Adam's apple.", ar: "حدد شكل حدوة حصان لطيفة أعلى تفاحة آدم بإنش." },
        avoidTip: { en: "Don't create a sharp right angle at the jaw corner.", ar: "تجنب رسم زاوية قائمة حادة عند طرف الفك." },
        tag: { en: "Natural & Masculine", ar: "طبيعية وذكورية" }
      },
      {
        id: "b-sq-2",
        name: { en: "Tapered Chin Goatee + Shadow Stubble", ar: "سكسوكة محددة مع لحية ظل خفيفة" },
        lengthCategory: "short",
        whyItWorks: {
          en: "Focuses visual weight vertically in the center, lengthening the square facial proportions.",
          ar: "تركز الثقل البصري في المنتصف عمودياً، مما يمنح الوجه المربع طولاً متوازناً."
        },
        trimmingGuide: {
          en: "Keep chin hair at 7-8mm and trim cheeks down to 2-3mm.",
          ar: "حافظ على طول شعر الذقن عند 7-8 ملم وقصر شعر الخدين إلى 2-3 ملم."
        },
        necklineTip: { en: "Clean shaved neck under jawline.", ar: "حلاقة نظيفة للرقبة أسفل خط الفك." },
        avoidTip: { en: "Do not leave sideburns wide and bushy.", ar: "تجنب ترك السوالف كثيفة وعريضة." },
        tag: { en: "Elongating Effect", ar: "إطالة ذكية للملامح" }
      },
      {
        id: "b-sq-3",
        name: { en: "Oval-Contoured Short Beard", ar: "لحية قصيرة منحوتة بقالب بيضاوي" },
        lengthCategory: "short",
        whyItWorks: {
          en: "Groomed longer at the chin and tighter on the sides to transform square outline into oval harmony.",
          ar: "أطول قليلاً عند الذقن وأقصر عند الجوانب لتحويل الإطار المربع إلى تناغم بيضاوي."
        },
        trimmingGuide: {
          en: "Fade sides down to 3mm; keep chin area at 8-10mm.",
          ar: "قصر الجوانب إلى 3 ملم وحافظ على منطقة الذقن بطول 8-10 ملم."
        },
        necklineTip: { en: "2 fingers above Adam's apple.", ar: "إصبعين فوق تفاحة آدم." },
        avoidTip: { en: "Avoid flat horizontal bottom line.", ar: "تجنب الخط الأفقي المسطح تماماً عند أسفل اللحية." },
        tag: { en: "Structure Sculptor", ar: "نحت وتعديل النسب" }
      }
    ],
    stylesToAvoid: {
      menHairstyles: [
        { en: "Flat center-parted bowl cut (exaggerates square symmetry into blockiness)", ar: "قصة الطاسة المسطحة بفرق وسطي (تظهر الوجه ككتلة مربعة غير مريحة)" },
        { en: "Wide bushy sides with no taper (makes head look wider than tall)", ar: "جوانب كثيفة غير متدرجة تجعل الرأس يبدو أعرض من طوله" }
      ],
      womenHairstyles: [
        { en: "Blunt geometric bob cut ending exactly at the jawline (draws a heavy box around jaw)", ar: "قصة البوب الهندسية المستقيمة التي تنتهي عند خط الفك تماماً (تحبس الفك في مربع صلب)" },
        { en: "Tight slicked-back ponytail with center part and no framing wisps", ar: "شد الشعر بالكامل للخلف بفرق وسطي بدون خصلات تؤطر الوجه" }
      ],
      beards: [
        { en: "Blocky wide square beard with thick un-tapered sides", ar: "اللحية المربعة العريضة بجوانب كثيفة تزيد من عرض الفك" },
        { en: "Straight horizontal chin strap", ar: "خط اللحية الرفيع الأفقي على امتداد عظم الفك" }
      ]
    },
    immediateGlowUpTips: [
      {
        id: "tip-debloat",
        category: "debloat",
        timeMinutes: 3,
        title: { en: "Masseter Tension Release & Cold Drain", ar: "إرخاء عضلة الفك (Masseter) وتصريف السوائل" },
        instructions: {
          en: "Use knuckles or ice roller to apply firm downward circular pressure along the masseter muscle (clenching muscle) for 90 seconds.",
          ar: "استخدم مفاصل الأصابع أو رولر مثلج لتدليك عضلة المضغ (Masseter) بحركات دائرية لمدة 90 ثانية."
        },
        instantBenefit: {
          en: "Releases subconscious teeth-clenching swelling, slimming the jaw flare by up to 3mm.",
          ar: "يرخي احتقان عضلة المضغ الناتجة عن التوتر ويقلل عرض الفك الجانبي بمقدار 3 ملم."
        }
      },
      {
        id: "tip-brows",
        category: "brows",
        timeMinutes: 2,
        title: { en: "Soft Curved Brow Arching", ar: "تقويس الحواجب بانحناء ناعم" },
        instructions: {
          en: "Avoid drawing hard sharp angular brows; brush brows with a slight upward curve to soften facial geometry.",
          ar: "تجنب رسم حواجب حادة الزوايا؛ مشط الحواجب بانحناء ناعم للأعلى لكسر حدة الوجه المربع."
        },
        instantBenefit: {
          en: "Introduces rounded organic curves that balance the square mandibular border.",
          ar: "يضفي انحناءات متناسقة توازن زوايا الفك السفلية القوية."
        }
      },
      {
        id: "tip-posture",
        category: "posture",
        timeMinutes: 1,
        title: { en: "Sternocleidomastoid (SCM) Stretch", ar: "تمديد عضلة الرقبة الجانبية (SCM)" },
        instructions: {
          en: "Tilt head 45° to the right and look up for 15 seconds; repeat left. Engage soft tongue posture.",
          ar: "أمِل رأسك بزاوية 45 درجة لليمين وانظر للأعلى 15 ثانية ثم كرر لليسار مع وضع اللسان بسقف الحلق."
        },
        instantBenefit: {
          en: "Lengthens neck profile and provides clear daylight separation between jaw and trapezius.",
          ar: "يطيل مظهر الرقبة ويفصل بوضوح بين زاوية الفك وعضلات الأكتاف."
        }
      },
      {
        id: "tip-skin",
        category: "skin",
        timeMinutes: 2,
        title: { en: "High Cheekbone Highlighter Focus", ar: "تركيز الإضاءة على قمة عظام الخد" },
        instructions: {
          en: "Dab a tiny drop of squalane oil or hydrating balm only on the highest point of your cheekbones.",
          ar: "ضع قطرة خفيفة من زيت السكوالين أو مرطب على أعلى نقطة في عظام الخد فقط."
        },
        instantBenefit: {
          en: "Draws gaze vertically toward the upper third of the face, lifting overall appearance.",
          ar: "يوجه الأنظار للأعلى نحو الثلث العلوي من الوجه ويمنح مظهراً مرفوعاً."
        }
      },
      {
        id: "tip-hair",
        category: "hair",
        timeMinutes: 2,
        title: { en: "Diagonal Parting Reset", ar: "تعديل الفرق الجانبي المائل" },
        instructions: {
          en: "Switch from a middle part to an asymmetrical diagonal side part with your fingers.",
          ar: "حول فرق الشعر من المنتصف إلى فرق جانبي مائل باستخدام أطراف أصابعك."
        },
        instantBenefit: {
          en: "Breaks bilateral square symmetry instantly, creating dynamic flow and sophistication.",
          ar: "يكسر تماثل المربع الثابت فوراً ويضفي حركة حيوية وأناقة على الملامح."
        }
      }
    ]
  },

  round: {
    analysis: {
      shape: "round",
      name: { en: "Round Face Shape", ar: "شكل الوجه الدائري (Round)" },
      confidence: 93,
      description: {
        en: "Characterized by soft, curved lines, full cheeks, and roughly equal length and width. Youthful appearance with less prominent bone angles.",
        ar: "يتميز بخطوط منحنية ناعمة وخدود ممتلئة مع تقارب في الطول والعرض، مما يعطي مظهراً شاباً دائم النضارة مع زوايا عظمية رقيقة."
      },
      proportions: {
        lengthToWidthRatio: "1 : 1 (Soft & Curvilinear)",
        foreheadWidth: { en: "Curved and rounded hairline", ar: "مستديرة مع خط شعر ناعم الانحناء" },
        cheekboneWidth: { en: "Full, widest part of the face", ar: "ممتلئة وتمثل أعرض نقطة في الوجه" },
        jawlineWidth: { en: "Soft, rounded without sharp gonial flare", ar: "ناعمة ومستديرة بدون بروز زوايا حادة" }
      },
      keyBalancingPrinciple: {
        en: "Add structural vertical height, angular definition, and sharp contrasts to slim the cheeks and elongate the face silhouette.",
        ar: "إضافة ارتفاع عمودي في الشعر وتحديد زوايا هندسية حادة لتنحيف الخدود وإطالة مظهر الوجه."
      }
    },
    maleHairstyles: [
      {
        id: "m-rd-1",
        name: { en: "High-Volume Pompadour with High Skin Fade", ar: "بومبادور مرتفع الكثافة مع تلاشي جانبي حاد" },
        length: "medium",
        idealForGender: "male",
        whyItWorks: {
          en: "Adds 2-3 inches of vertical height while slimming down the sides to cut cheek roundness.",
          ar: "يضيف ارتفاعاً رأسياً بـ 5-7 سم مع تنحيف الجوانب تماماً لكسر استدارة الخدود."
        },
        stylingTip: {
          en: "Blow dry upward with round brush, then lock roots with strong matte clay.",
          ar: "جفف للأعلى بالفرشاة الدائرية وثبت الجذور بصلصال قوي غير لامع."
        },
        productRecommendation: { en: "Extreme Hold Matte Clay", ar: "صلصال قوي التثبيت" },
        tag: { en: "Face Slimmer #1", ar: "الحل الأمثل لتنحيف الوجه" }
      },
      {
        id: "m-rd-2",
        name: { en: "Angular Textured Faux Hawk", ar: "فو هوك (Faux Hawk) بملمس هندسي" },
        length: "short",
        idealForGender: "male",
        whyItWorks: {
          en: "Creates a sharp diagonal apex on top of head, drawing eyes along a vertical focal point.",
          ar: "يخلق نقطة ارتكاز مثلثة حادة في قمة الرأس توجه النظر للأعلى بشكل جذاب."
        },
        stylingTip: {
          en: "Pinch center hair toward the middle with texturizing paste.",
          ar: "اجمع خصلات المنتصف نحو المركز بمعجون التصفيف الحركي."
        },
        productRecommendation: { en: "Texturizing Paste", ar: "معجون مصفف للألياف" },
        tag: { en: "Edgy & Defined", ar: "عصري ومحدد" }
      },
      {
        id: "m-rd-3",
        name: { en: "Angular Side-Part with Hard Part", ar: "فرق جانبي حاد مع خط محدد بالموس" },
        length: "medium",
        idealForGender: "male",
        whyItWorks: {
          en: "The sharp parting line introduces geometric definition that counters soft curves.",
          ar: "الخط الجانبي الحاد يضفي زوايا هندسية تعوض غياب الزوايا العظمية في الفك."
        },
        stylingTip: {
          en: "Have barber carve a razor hard part; comb side hair tight and top hair with volume.",
          ar: "اطلب من الحلاق تحديد خط الفرق بالشفرة ومشط الجوانب بإحكام مع رفع الأعلى."
        },
        productRecommendation: { en: "Low-Shine Pomade", ar: "مرهم قليل اللمعان" },
        tag: { en: "Clean & Structured", ar: "نظيف ومحدد هندسياً" }
      }
    ],
    femaleHairstyles: [
      {
        id: "f-rd-1",
        name: { en: "Long Asymmetrical Lob (Long Bob)", ar: "قصة لوب طويلة غير متماثلة (Asymmetrical Lob)" },
        length: "medium",
        idealForGender: "female",
        whyItWorks: {
          en: "Falling 2-3 inches below the chin, the longer front sections vertically slice through cheek fullness.",
          ar: "تسقط أسفل الذقن بـ 5 سم، مما يقص بصرياً امتلاء الخدود ويطيل ملامح الوجه."
        },
        stylingTip: {
          en: "Flat-iron straight with a slight bend inward at the ends; finish with anti-frizz serum.",
          ar: "ملسي الشعر بالمكواة مع انحناء خفيف جداً للأطراف وسيروم مضاد للتطاير."
        },
        productRecommendation: { en: "Anti-Frizz Smoothing Serum", ar: "سيروم تنعيم ومكافحة التطاير" },
        tag: { en: "Instant Face Slimmer", ar: "تنحيف فوري للوجه" }
      },
      {
        id: "f-rd-2",
        name: { en: "Long Layers with Deep Side Part", ar: "طبقات طويلة مع فرق جانبي عميق" },
        length: "long",
        idealForGender: "female",
        whyItWorks: {
          en: "Deep side part disrupts circular balance while long flowing layers draw focus down past the shoulders.",
          ar: "الفرق الجانبي العميق يكسر الاستدارة، والطبقات المنسدلة تجذب التركيز للأسفل."
        },
        stylingTip: {
          en: "Start layers below the chin line, never at cheek level.",
          ar: "اجعلي بداية الطبقات المتدرجة أسفل مستوى الذقن وليس عند مستوى الخدود."
        },
        productRecommendation: { en: "Lightweight Volumizing Spray", ar: "رذاذ تكثيف خفيف الوزن" },
        tag: { en: "Flowing & Flattering", ar: "انسيابية ومثالية" }
      },
      {
        id: "f-rd-3",
        name: { en: "Pixie Cut with Voluminous Textured Crown", ar: "بيكسي عصري مع تاج مرتفع الكثافة" },
        length: "short",
        idealForGender: "female",
        whyItWorks: {
          en: "Keeping sides tight to head and building vertical height transforms round silhouette into oval.",
          ar: "إبقاء الجوانب محكمة ورفع خصلات التاج يحول الشكل الدائري إلى بيضاوي رشيق."
        },
        stylingTip: {
          en: "Tousle crown with texturizing dry wax; tuck sides behind ears.",
          ar: "حركي خصلات التاج بشمع جاف مصفف وضعي جوانب الشعر خلف الأذنين."
        },
        productRecommendation: { en: "Dry Matte Wax", ar: "شمع مطفي جاف" },
        tag: { en: "Bold & Chic", ar: "جريئة ومميزة" }
      }
    ],
    beardStyles: [
      {
        id: "b-rd-1",
        name: { en: "Pointed Goatee with Clean Cheeks", ar: "سكسوكة مدببة (Goatee) مع خدود حليقة" },
        lengthCategory: "sculpted",
        whyItWorks: {
          en: "Directly adds 1-1.5cm of vertical length to the chin, creating an instant optical slimming elongation.",
          ar: "تضيف 1 إلى 1.5 سم لطول الذقن عمودياً مما يمنح استطالة فورية وتنحيفاً ملحوظاً."
        },
        trimmingGuide: {
          en: "Shape chin hair into a subtle triangular wedge; keep cheeks clean-shaven to skin.",
          ar: "شكل شعر الذقن على هيئة مثلث لطيف واحلق شعر الخدين بالشفرة تماماً."
        },
        necklineTip: { en: "Keep neck shaved clean up to lower chin border.", ar: "احلق الرقبة بالكامل حتى الحافة السفلية للذقن." },
        avoidTip: { en: "Never grow thick hair on the sides of the cheeks.", ar: "لا تسمح أبداً بنمو شعر كثيف على جانبي الخدين." },
        tag: { en: "Ultimate Face Elongator", ar: "أفضل تسريحة لإطالة الوجه" }
      },
      {
        id: "b-rd-2",
        name: { en: "Fade Beard (Short Sides, Long Chin)", ar: "لحية متدرجة (جوانب قصيرة وذقن طويل)" },
        lengthCategory: "short",
        whyItWorks: {
          en: "Skin-tight at the sideburns (1mm) progressing down to 10mm at the chin apex creates sharp angles.",
          ar: "تلاشي عند السوالف (1 ملم) يمتد إلى 10 ملم عند قمة الذقن ليصنع زوايا حادة مفقودة."
        },
        trimmingGuide: {
          en: "Grade guard from #1 at top to #3 at bottom jaw.",
          ar: "تدرج بالمشط من رقم 1 في الأعلى إلى رقم 3 عند عظم الفك السفلي."
        },
        necklineTip: { en: "1.5 fingers above Adam's apple.", ar: "إصبع ونصف فوق تفاحة آدم." },
        avoidTip: { en: "Avoid round bushy mutton chops.", ar: "تجنب السوالف العريضة المستديرة." },
        tag: { en: "Modern Jaw Builder", ar: "بناء الفك العصري" }
      },
      {
        id: "b-rd-3",
        name: { en: "Van Dyke Beard (Disconnected Moustache & Chin)", ar: "لحية فان دايك (شارب منفصل مع ذقن محدد)" },
        lengthCategory: "sculpted",
        whyItWorks: {
          en: "Separation creates focal points in the vertical center of the face, narrowing cheek expanse.",
          ar: "الفصل بين الشارب والذقن يركز الانتباه على المحور الطولي وينحف مساحة الخدود."
        },
        trimmingGuide: {
          en: "Shave gap between mustache and chin beard; groom chin into defined point.",
          ar: "احلق الفراغ بين الشارب والذقن، ورتب شعر الذقن في نقطة محددة."
        },
        necklineTip: { en: "Clean razor shaved below jawline.", ar: "تنظيف تام بالموس أسفل الفك." },
        avoidTip: { en: "Don't let mustache droop past mouth corners.", ar: "لا تدع الشارب يتدلى تحت زوايا الفم." },
        tag: { en: "Artistic & Sculpted", ar: "فنية ومنحوتة بدقة" }
      }
    ],
    stylesToAvoid: {
      menHairstyles: [
        { en: "Buzzcut with no fade or top contrast (highlights circular head silhouette)", ar: "حلاقة الرأس بدرجة واحدة متساوية (تظهر استدارة الرأس بالكامل)" },
        { en: "Wide mushroom / bowl cuts with volume at ears", ar: "قصات الشعر المنفوخة عند مستوى الأذنين (تزيد عرض الوجه)" }
      ],
      womenHairstyles: [
        { en: "Chin-length blunt rounded bob (frames face in a sphere)", ar: "قصة البوب المستديرة التي تنتهي عند الذقن تماماً (تحبس الوجه في كرة دائرية)" },
        { en: "Heavy blunt fringe across the forehead with no angles", ar: "الغرة الأفقية العريضة المستقيمة بدون أي تدرج" }
      ],
      beards: [
        { en: "Bushy sideburns and thick cheek hair with flat chin", ar: "سوالف عريضة وشعر خدود كثيف مع ذقن مسطح (تزيد استدارة الوجه)" },
        { en: "Rounded circular chin strap", ar: "تحديد اللحية على شكل دائرة حول الذقن" }
      ]
    },
    immediateGlowUpTips: [
      {
        id: "tip-debloat",
        category: "debloat",
        timeMinutes: 3,
        title: { en: "Cold Water Facial Plunge (Debloat Shock)", ar: "غمر الوجه بالماء المثلج لطرد السوائل" },
        instructions: {
          en: "Submerge face in a bowl of ice water for 3 rounds of 10 seconds. Pat dry with cold towel.",
          ar: "اغمر وجهك في وعاء ماء بارد ومثلج 3 مرات لمدة 10 ثوانٍ، ثم جفف بلطف بمنشفة باردة."
        },
        instantBenefit: {
          en: "Triggers mammalian dive reflex, evacuating micro-edema from cheeks and jaw in minutes.",
          ar: "ينشط انقباض الأوعية الفوري ويطرد السوائل المحتبسة في الخدود والفك خلال دقائق."
        }
      },
      {
        id: "tip-brows",
        category: "brows",
        timeMinutes: 2,
        title: { en: "High Arch Brow Styling", ar: "رسم قوس حاجب مرتفع ومحدد" },
        instructions: {
          en: "Brush brows up with an explicit angular arch peak right above the outer edge of the iris.",
          ar: "مشط الحاجبين للأعلى مع تشكيل قمة زاوية واضحة فوق الحافة الخارجية لقزحية العين."
        },
        instantBenefit: {
          en: "Lifts the entire upper facial frame and cuts through rounded softness with sharp angles.",
          ar: "يرفع إطار الوجه العلوي بالكامل ويكسر النعومة المستديرة بزوايا جذابة."
        }
      },
      {
        id: "tip-posture",
        category: "posture",
        timeMinutes: 1,
        title: { en: "Hard Tongue Mewing Suction", ar: "تثبيت اللسان بقوة بسقف الحلق (Mewing)" },
        instructions: {
          en: "Swallow saliva while pressing entire tongue firmly against upper palate; smile with teeth together.",
          ar: "ابلع ريقك مع ضغط اللسان بالكامل بقوة على سقف الحلق وأغلق شفتيك وتنفس من الأنف."
        },
        instantBenefit: {
          en: "Immediately tightens the submental triangle, revealing a defined jaw border from front view.",
          ar: "يشد على الفور الترهل تحت الذقن ويبرز تحديد الفك في الرؤية الأمامية."
        }
      },
      {
        id: "tip-skin",
        category: "skin",
        timeMinutes: 2,
        title: { en: "Sub-Cheekbone Matte Contouring", ar: "تظليل طبيعي أسفل عظمة الخد" },
        instructions: {
          en: "Ensure cheeks below bone arch remain matte (no shiny cream) to create a natural receding shadow.",
          ar: "احرص على أن تكون المنطقة تحت عظمة الخد خالية من اللمعان لإحداث ظل طبيعي ينحف الوجه."
        },
        instantBenefit: {
          en: "Optical hollow-cheek illusion that slims the midface profile.",
          ar: "يخلق خدعة بصرية بتجويف طبيعي ينحف منطقة منتصف الوجه."
        }
      },
      {
        id: "tip-hair",
        category: "hair",
        timeMinutes: 2,
        title: { en: "Vertical Crown Tease", ar: "تكثيف ورفع تاج الرأس" },
        instructions: {
          en: "Gently backcomb or lift roots at the crown of your head and set with hair powder or spray.",
          ar: "ارفع جذور الشعر عند قمة الرأس بمشط دقيق وثبت بقليل من البودرة أو مثبت خفيف."
        },
        instantBenefit: {
          en: "Adds immediate height that alters the face aspect ratio toward oval.",
          ar: "يضيف طولاً رأسياً فورياً يعدل نسبة الوجه نحو البيضاوي المثالي."
        }
      }
    ]
  },

  heart: {
    analysis: {
      shape: "heart",
      name: { en: "Heart Face Shape", ar: "شكل الوجه القلبي (Heart)" },
      confidence: 92,
      description: {
        en: "Broad forehead and high cheekbones tapering gracefully down to a delicate, pointed chin. Delicate and striking facial architecture.",
        ar: "جبهة عريضة وعظام وجنتين بارزتين تنحدران برقة وانسيابية نحو ذقن مدبب ونحيف، ما يمنح ملامح لافتة ودقيقة."
      },
      proportions: {
        lengthToWidthRatio: "1.3 : 1 (Tapered Wedge)",
        foreheadWidth: { en: "Prominent, often with widow's peak or broad expanse", ar: "عريضة وبارزة، غالباً مع خط شعر مميز" },
        cheekboneWidth: { en: "High and pronounced, slightly narrower than forehead", ar: "عالية وبارزة، أضيق قليلاً من الجبهة" },
        jawlineWidth: { en: "Narrow, tapering to a sharp, pointed chin", ar: "نحيف وينحدر بسلاسة نحو ذقن مدبب" }
      },
      keyBalancingPrinciple: {
        en: "Add fullness, texture, and visual weight around the jawline and chin while softening forehead width.",
        ar: "إضافة كثافة وامتلاء بصري حول خط الفك والذقن مع تخفيف مظهر عرض الجبهة."
      }
    },
    maleHairstyles: [
      {
        id: "m-ht-1",
        name: { en: "Medium-Length Flow with Textured Fringe", ar: "شعر متوسط منساب (Flow) مع غرة جانبية" },
        length: "medium",
        idealForGender: "male",
        whyItWorks: {
          en: "Soft side-swept fringe breaks up forehead width while side length fills in the narrow lower face.",
          ar: "الغرة الجانبية تكسر عرض الجبهة، وتدلي الشعر على الجوانب يملأ الفراغ حول الفك النحيف."
        },
        stylingTip: {
          en: "Apply leave-in styling cream to damp hair, comb with fingers, and allow natural wave to dry.",
          ar: "ضع كريم تصفيف خفيف على شعر رطب ومشط بأصابعك ودعه يجف على تموجه الطبيعي."
        },
        productRecommendation: { en: "Lightweight Styling Cream", ar: "كريم تصفيف مرطب خفيف" },
        tag: { en: "Natural & Balanced", ar: "طبيعي ومتوازن" }
      },
      {
        id: "m-ht-2",
        name: { en: "Messy Textured Fringe with Low Taper", ar: "غرة متدرجة غير منتظمة مع تدرج منخفض (Low Taper)" },
        length: "short",
        idealForGender: "male",
        whyItWorks: {
          en: "Avoids high fades which expose temples, framing the upper third gently.",
          ar: "يتجنب التلاشي المرتفع الذي يعري الصدغين العريضين، مؤطراً الثلث العلوي بنعومة."
        },
        stylingTip: {
          en: "Ask barber for a low taper at neckline and ears only; keep sides with slight bulk.",
          ar: "اطلب تدرجاً منخفضاً عند الرقبة والأذنين فقط مع الحفاظ على كثافة خفيفة بالجوانب."
        },
        productRecommendation: { en: "Matte Paste", ar: "معجون مطفي مرن" },
        tag: { en: "Youthful & Modern", ar: "شبابي وعصري" }
      },
      {
        id: "m-ht-3",
        name: { en: "Classic Side-Swept Quiff", ar: "كويف مائل للجانب بحجم معتدل" },
        length: "medium",
        idealForGender: "male",
        whyItWorks: {
          en: "Diagonal lines sweep across the wide forehead, drawing attention toward the eyes.",
          ar: "الخطوط المائلة تخترق عرض الجبهة وتلفت الانتباه فوراً نحو جاذبية العينين."
        },
        stylingTip: {
          en: "Style diagonally to one side rather than straight back.",
          ar: "صفف الشعر بميلان جانبي مائل بدلاً من شده للوراء مباشرة."
        },
        productRecommendation: { en: "Sea Salt Spray + Grooming Tonic", ar: "سبراي ملح البحر + منشط تصفيف" },
        tag: { en: "Classic Balance", ar: "توازن كلاسيكي" }
      }
    ],
    femaleHairstyles: [
      {
        id: "f-ht-1",
        name: { en: "Chin-Length Textured Bob with Flipped Ends", ar: "بوب عند الذقن مع أطراف متموجة للخارج" },
        length: "short",
        idealForGender: "female",
        whyItWorks: {
          en: "Ends hit right at the chin, adding width and fullness precisely where a heart face needs it most.",
          ar: "تنتهي أطراف القصة عند الذقن مباشرة، مضيفة عرضاً وامتلاءً في المكان الذي يحتاجه الوجه القلبي."
        },
        stylingTip: {
          en: "Flip ends outward slightly with a round brush or styling flat iron.",
          ar: "ابرمي الأطراف للخارج قليلاً بواسطة فرشاة دائرية أو مكواة التصفيف."
        },
        productRecommendation: { en: "Heat Protectant + Texturizing Spray", ar: "واقي حرارة + رذاذ ملمس" },
        tag: { en: "Perfect Proportion", ar: "تناسب مثالي للأبعاد" }
      },
      {
        id: "f-ht-2",
        name: { en: "Curtain Bangs with Bouncy Shoulder Layers", ar: "غرة ستائرية مع طبقات حيوية عند الكتفين" },
        length: "medium",
        idealForGender: "female",
        whyItWorks: {
          en: "Curtain bangs taper forehead width while shoulder-level layers broaden the jawline area.",
          ar: "الغرة الستائرية تخفف عرض الجبهة، والطبقات عند الكتف تمنح خط الفك امتلاءً أنيقاً."
        },
        stylingTip: {
          en: "Part curtain bangs in the middle and blow dry away from eyes; add soft waves below chin.",
          ar: "افصلي الغرة من المنتصف وجففيها بعيداً عن العينين مع تمويج الطبقات تحت الذقن."
        },
        productRecommendation: { en: "Volumizing Mousse", ar: "موس كثافة خفيف" },
        tag: { en: "Chic & Flattering", ar: "أنيقة وتبرز الأنوثة" }
      },
      {
        id: "f-ht-3",
        name: { en: "Deep Side-Part Wavy Lob", ar: "قصة لوب مموجة بفرق جانبي عميق" },
        length: "medium",
        idealForGender: "female",
        whyItWorks: {
          en: "Sweeps volume to one shoulder, softening the pointed chin and framing cheekbones.",
          ar: "تجمع الكثافة على أحد الكتفين مما ينعم الذقن الحاد ويبرز عظام الخد."
        },
        stylingTip: {
          en: "Tuck one side behind ear and bring opposite side over shoulder.",
          ar: "ضعي جانباً خلف الأذن واسحبي الجانب الآخر المموج فوق الكتف."
        },
        productRecommendation: { en: "Argan Shine Oil", ar: "زيت الأرجان للمعان" },
        tag: { en: "Asymmetrical Elegance", ar: "أناقة غير متناظرة" }
      }
    ],
    beardStyles: [
      {
        id: "b-ht-1",
        name: { en: "Full Rounded Boxed Beard", ar: "لحية كاملة مستديرة الحواف" },
        lengthCategory: "medium",
        whyItWorks: {
          en: "The single best beard for heart faces: fills out the narrow chin and adds dense volume to jaw corners.",
          ar: "أفضل لحية للوجه القلبي على الإطلاق: تملأ الذقن النحيف وتمنح زوايا الفك وزناً وكثافة رجولية."
        },
        trimmingGuide: {
          en: "Keep jaw sides trimmed to 6mm and let chin grow to 10-12mm with a rounded, squared base.",
          ar: "شذب جوانب الفك إلى 6 ملم ودع شعر الذقن ينمو لـ 10-12 ملم بقاعدة مستديرة عريضة."
        },
        necklineTip: { en: "Keep neckline 1.5 inches above Adam's apple.", ar: "حدد الرقبة بمسافة إنش ونصف فوق تفاحة آدم." },
        avoidTip: { en: "Never trim chin into a sharp point.", ar: "إياك وقص شعر الذقن في نقطة مدببة حادة." },
        tag: { en: "Transforms Lower Face", ar: "يحول النصف السفلي بالكامل" }
      },
      {
        id: "b-ht-2",
        name: { en: "Heavy Uniform Scruff (4-6mm)", ar: "لحية خفيفة كثيفة موحدة (4-6 ملم)" },
        lengthCategory: "stubble",
        whyItWorks: {
          en: "Even shadow adds perceived bone thickness along the jawline without excessive maintenance.",
          ar: "الظل المتساوي يمنح إيحاءً بسماكة عظمية على طول الفك دون الحاجة لترتيب معقد."
        },
        trimmingGuide: {
          en: "Use 5mm guard consistently across cheeks, jaw, and chin.",
          ar: "استخدم مشط 5 ملم بتساوٍ كامل عبر الخدين والفك والذقن."
        },
        necklineTip: { en: "Sharp line 1 inch above Adam's apple.", ar: "خط نظيف أعلى تفاحة آدم بإنش واحد." },
        avoidTip: { en: "Don't shave cheeks too low.", ar: "لا تخفض خط شعر الخدين كثيراً." },
        tag: { en: "Rugged Masculinity", ar: "مظهر رجولي جذاب" }
      },
      {
        id: "b-ht-3",
        name: { en: "Short Tapered Beard with Full Sides", ar: "لحية قصيرة متدرجة مع جوانب ممتلئة" },
        lengthCategory: "short",
        whyItWorks: {
          en: "Maintains width at the lower jaw to balance the prominent forehead above.",
          ar: "تحافظ على العرض عند الفك السفلي لموازنة عرض الجبهة البارز في الأعلى."
        },
        trimmingGuide: {
          en: "Trim chin flat across the bottom; keep width at gonial angles.",
          ar: "قص أسفل الذقن بخط أفقي مستوٍ وحافظ على العرض عند زوايا الفك."
        },
        necklineTip: { en: "Natural curved neckline.", ar: "خط رقبة منحني طبيعي." },
        avoidTip: { en: "Avoid goatee without side hair.", ar: "تجنب السكسوكة المنفردة بدون شعر جانبي." },
        tag: { en: "Balanced Proportions", ar: "توازن هندسي رائع" }
      }
    ],
    stylesToAvoid: {
      menHairstyles: [
        { en: "High skin fade with slicked-back top (exposes wide temples and isolates chin)", ar: "التلاشي شديد الارتفاع مع شد الشعر للخلف (يعري الصدغين العريضين ويعزل الذقن)" },
        { en: "Spiky faux hawk emphasizing top width", ar: "التسريحات الشوكية المرتفعة التي تزيد من عرض الرأس العلوي" }
      ],
      womenHairstyles: [
        { en: "Slicked-back high ponytail with zero face framing (drastically highlights forehead width)", ar: "شد الشعر بالكامل للأعلى بذيل حصان مشدود بدون أي خصلات جانبية" },
        { en: "Short volume focused solely above the ears", ar: "قصات الشعر القصيرة ذات الحجم المحصور فوق الأذنين" }
      ],
      beards: [
        { en: "Pointed goatee or soul patch (exaggerates the pointed chin into an arrowhead)", ar: "السكسوكة المدببة أو السكسوكة الحادة (تجعل الذقن يبدو كريشة السهم)" },
        { en: "Clean-shaven lower face with high top volume", ar: "الحلاقة الكاملة مع شعر علوي ضخم جداً" }
      ]
    },
    immediateGlowUpTips: [
      {
        id: "tip-debloat",
        category: "debloat",
        timeMinutes: 3,
        title: { en: "Forehead & Temple Lymph Flush", ar: "تصريف السوائل من الجبهة والصدغين" },
        instructions: {
          en: "Glide fingertips or cold spoon from center of forehead outwards toward temples, then down behind ears.",
          ar: "مرر أطراف أصابعك أو ملعقة مبردة من منتصف الجبهة للخارج نحو الصدغين ثم للأسفل خلف الأذنين."
        },
        instantBenefit: {
          en: "Decongests the upper third and sharpens eyebrow bone definition.",
          ar: "يصرف السوائل المحتبسة في الثلث العلوي ويحدد عظام الحاجبين بدقة."
        }
      },
      {
        id: "tip-brows",
        category: "brows",
        timeMinutes: 2,
        title: { en: "Straight, Softened Brow Tail", ar: "استقامة وتنعيم ذيل الحاجب" },
        instructions: {
          en: "Groom eyebrow tails straight across rather than drooping downward toward temples.",
          ar: "صفف ذيل الحاجب أفقياً بنعومة بدلاً من جعله ينحدر بشدة للأسفل نحو الصدغين."
        },
        instantBenefit: {
          en: "Broadens eye region horizontally and counterbalances the tapering chin.",
          ar: "يوسع مساحة العينين أفقياً ويوازن انحدار الذقن النحيف."
        }
      },
      {
        id: "tip-posture",
        category: "posture",
        timeMinutes: 1,
        title: { en: "Chin Forward & Micro-Tuck", ar: "ضبط زاوية الذقن لعدم إبراز النحافة" },
        instructions: {
          en: "Keep head level; avoid tilting chin down toward chest which accentuates pointed jaw.",
          ar: "حافظ على الرأس بمستوى أفقي وتجنب خفض الذقن نحو الصدر لأنه يزيد من حدة الذقن."
        },
        instantBenefit: {
          en: "Shows off the full mandibular border instead of isolating the chin tip.",
          ar: "يظهر امتداد عظم الفك كاملاً بدلاً من حصر النظر في مقدمة الذقن."
        }
      },
      {
        id: "tip-skin",
        category: "skin",
        timeMinutes: 2,
        title: { en: "Matte Forehead T-Zone Balancing", ar: "إزالة لمعان منطقة الجبهة (T-Zone)" },
        instructions: {
          en: "Dab translucent powder or oil-blotting sheet on the forehead center while keeping cheeks dewy.",
          ar: "ربت بالبودرة الشفافة أو ورق امتصاص الدهون على منتصف الجبهة مع ترك الخدين بنضارة خفيفة."
        },
        instantBenefit: {
          en: "Reduces visual expanse of the forehead instantly.",
          ar: "يقلل من المساحة البصرية للجبهة العريضة على الفور."
        }
      },
      {
        id: "tip-hair",
        category: "hair",
        timeMinutes: 2,
        title: { en: "Temple Wisps & Fringe Pull", ar: "سحب خصلات ناعمة عند الصدغين" },
        instructions: {
          en: "Pull out 2-3 thin wisps of hair in front of each ear and allow them to drape forward.",
          ar: "اسحب خصلتين رقيقتين من الشعر أمام الأذنين ودعهما تنسدلان للأمام."
        },
        instantBenefit: {
          en: "Frames the face effortlessly, softening the upper taper.",
          ar: "يؤطر جانبي الوجه بعفوية ويمنح تناسقاً فورياً لملامحك."
        }
      }
    ]
  },

  diamond: {
    analysis: {
      shape: "diamond",
      name: { en: "Diamond Face Shape", ar: "شكل الوجه الماسي (Diamond)" },
      confidence: 91,
      description: {
        en: "High, prominent cheekbones are the widest feature, paired with a narrow forehead and a pointed chin. Rare, high-fashion bone structure with strong photographic depth.",
        ar: "عظام الخدين البارزة والعالية هي النقطة الأعرض في الوجه، وتتكامل مع جبهة ضيقة وذقن مدبب. بنية عظمية نادرة وراقية تشبه عارضي الأزياء العالميين."
      },
      proportions: {
        lengthToWidthRatio: "1.4 : 1 (High Zygomatic Drama)",
        foreheadWidth: { en: "Narrow, tapering inward from cheekbones", ar: "ضيقة تنحدر للداخل انطلاقاً من الوجنتين" },
        cheekboneWidth: { en: "Prominent, angular, widest facial point", ar: "عالية وحادة وتمثل أعرض نقطة في الوجه" },
        jawlineWidth: { en: "Slender, tapering to a pointed chin apex", ar: "نحيف يتدرج نحو ذقن مدبب دقيق" }
      },
      keyBalancingPrinciple: {
        en: "Add width to the forehead and jawline while softening sharp cheekbone prominence with textured layers and fringe.",
        ar: "إضافة عرض متوازن للجبهة والفك السفلي مع تخفيف حدة بروز الخدين بطبقات منسدلة وغرة خفيفة."
      }
    },
    maleHairstyles: [
      {
        id: "m-dm-1",
        name: { en: "Textured Fringe with Scissor-Cut Sides", ar: "غرة مموجة مع جوانب مقصوصة بالمقص" },
        length: "medium",
        idealForGender: "male",
        whyItWorks: {
          en: "Scissor-cut sides retain hair width around temples, balancing prominent cheekbones naturally.",
          ar: "قص الجوانب بالمقص يحافظ على امتلاء الشعر حول الصدغين ويوازن بروز عظام الخد."
        },
        stylingTip: {
          en: "Avoid skin fades on the sides; ask barber for a soft #3 scissor taper.",
          ar: "تجنب التلاشي للجلد تماماً واطلب تدرجاً ناعماً بالمقص برقم 3 أو 4."
        },
        productRecommendation: { en: "Matte Texture Clay", ar: "صلصال مطفي للملمس" },
        tag: { en: "Runway Model Look", ar: "مظهر عارضي الأزياء" }
      },
      {
        id: "m-dm-2",
        name: { en: "Modern Wolf Cut / Shag with Mid-Taper", ar: "ولف كت عصري أو شاج مع تدرج متوسط" },
        length: "medium",
        idealForGender: "male",
        whyItWorks: {
          en: "Adds volume behind the ears and neck, filling the space behind the narrow jaw.",
          ar: "يضيف حجماً وكثافة خلف الأذنين والرقبة مما يملأ الفراغ حول الفك النحيف."
        },
        stylingTip: {
          en: "Scrunch in sea salt spray while damp for effortless rock-and-roll movement.",
          ar: "ضع رذاذ ملح البحر على شعر رطب وحركه بأصابعك لحركة عفوية جذابة."
        },
        productRecommendation: { en: "Sea Salt Spray", ar: "رذاذ ملح البحر" },
        tag: { en: "Trendy & High Fashion", ar: "عصري وأنيق للغاية" }
      },
      {
        id: "m-dm-3",
        name: { en: "Swept-Back Ivy League with Temple Softness", ar: "آيفي ليج (Ivy League) مصفف للخلف بنعومة" },
        length: "short",
        idealForGender: "male",
        whyItWorks: {
          en: "Broadens the forehead visually while celebrating high zygomatic bone structure.",
          ar: "يوسع الجبهة بصرياً مع إبراز الجاذبية الطبيعية لعظام الخد العالية."
        },
        stylingTip: {
          en: "Brush front hair up and slightly back with light pomade.",
          ar: "مشط خصلات المقدمة للأعلى وللخلف بمرهم تصفيف خفيف."
        },
        productRecommendation: { en: "Light Pomade", ar: "مرهم خفيف بدون ثقل" },
        tag: { en: "Polished Gentleman", ar: "أناقة كلاسيكية مصقولة" }
      }
    ],
    femaleHairstyles: [
      {
        id: "f-dm-1",
        name: { en: "Curtain Bangs with Chin-Flipping Shag", ar: "غرة ستائرية مع شاج مموج يلتف عند الذقن" },
        length: "medium",
        idealForGender: "female",
        whyItWorks: {
          en: "Curtain bangs broaden the narrow forehead, while ends flipping out at the chin add needed lower width.",
          ar: "الغرة الستائرية توسع الجبهة الضيقة، والتفاف الأطراف عند الذقن يمنح الفك النحيف عرضاً متناسقاً."
        },
        stylingTip: {
          en: "Curl bangs outward and flick bottom layers outward with a flat iron.",
          ar: "لفي الغرة للخارج ووجهي الأطراف السفلية للخارج بمكواة الشعر."
        },
        productRecommendation: { en: "Texturizing Sea Mist", ar: "رذاذ ملمس خفيف" },
        tag: { en: "Aesthetic Perfection", ar: "تناغم جمالي فائق" }
      },
      {
        id: "f-dm-2",
        name: { en: "Collarbone Lob with Deep Side Part", ar: "قصة لوب عند عظام الترقوة مع فرق جانبي" },
        length: "medium",
        idealForGender: "female",
        whyItWorks: {
          en: "The side sweep softens high cheekbones and creates a flattering diagonal silhouette.",
          ar: "الفرق الجانبي ينعم حدة عظام الخد ويمنح الوجه إطاراً مائلاً ساحراً."
        },
        stylingTip: {
          en: "Add soft waves through the mid-lengths, leaving roots relaxed.",
          ar: "اصنعي تموجات ناعمة في منتصف الشعر مع ترك الجذور مسترخية."
        },
        productRecommendation: { en: "Volumizing Foam", ar: "رغوة تكثيف مغذية" },
        tag: { en: "Sophisticated Glam", ar: "جاذبية وأناقة راقية" }
      },
      {
        id: "f-dm-3",
        name: { en: "Long Wispy Layers with Face-Framing Tendrils", ar: "طبقات متدرجة طويلة مع خصلات تؤطر الملامح" },
        length: "long",
        idealForGender: "female",
        whyItWorks: {
          en: "Tapers softly around high cheekbones without hiding their dramatic high-fashion structure.",
          ar: "تنسدل بنعومة حول الوجنتين دون أن تخفي جمال البنية العظمية اللافتة."
        },
        stylingTip: {
          en: "Blow out with a large paddle brush for smooth, airy movement.",
          ar: "جففي بفرشاة عريضة لحركة خفيفة وناعمة كالحرير."
        },
        productRecommendation: { en: "Argan Oil Serum", ar: "سيروم زيت الأرجان" },
        tag: { en: "Effortless Goddess", ar: "إطلالة ناعمة كالملائكة" }
      }
    ],
    beardStyles: [
      {
        id: "b-dm-1",
        name: { en: "Full Structured Boxed Beard", ar: "لحية كاملة محددة بزوايا هندسية" },
        lengthCategory: "medium",
        whyItWorks: {
          en: "Builds out the lower jaw width to match the wide zygomatic arches, establishing square harmony.",
          ar: "تبني عرض الفك السفلي ليوازي عرض عظام الخد، محققة تناغماً هندسياً رجولياً."
        },
        trimmingGuide: {
          en: "Keep cheeklines slightly lower and groom chin with a squared flat bottom.",
          ar: "اجعل خط الخد منخفضاً قليلاً وشذب أسفل الذقن بقاعدة مستقيمة مربعة."
        },
        necklineTip: { en: "Clean line 1.5 inches above Adam's apple.", ar: "خط نظيف أعلى تفاحة آدم بإنش ونصف." },
        avoidTip: { en: "Avoid pointy ducktail shaping.", ar: "تجنب التحديد المدبب نحو الأسفل." },
        tag: { en: "Architectural Balance", ar: "توازن معماري للملامح" }
      },
      {
        id: "b-dm-2",
        name: { en: "Dense Jawline Stubble with Full Chin (5mm)", ar: "لحية خفيفة كثيفة على الفك والذقن (5 ملم)" },
        lengthCategory: "stubble",
        whyItWorks: {
          en: "Adds texture and darkness along the narrow mandibular border without overbearing the cheekbones.",
          ar: "تضيف كثافة وظلاً على خط الفك النحيف دون طمس جمال عظام الخد العالية."
        },
        trimmingGuide: {
          en: "Keep at uniform 5mm; edge cheeklines naturally.",
          ar: "حافظ على طول موحد 5 ملم وحدد أطراف الخد بنعومة طبيعية."
        },
        necklineTip: { en: "Shave clean 1 inch above Adam's apple.", ar: "حلاقة نظيفة أعلى تفاحة آدم بإنش." },
        avoidTip: { en: "Don't shave off the chin hair.", ar: "لا تحلق شعر الذقن نهائياً." },
        tag: { en: "Sharp & Clean", ar: "حاد ونظيف" }
      },
      {
        id: "b-dm-3",
        name: { en: "Chin Strap + Balanced Mustache", ar: "لحية محددة مع شارب متناسق" },
        lengthCategory: "short",
        whyItWorks: {
          en: "Draws an explicit horizontal line along the jaw, widening the lower third visually.",
          ar: "ترسم خطاً أفقياً صريحاً على امتداد الفك مما يوسع الثلث السفلي بصرياً."
        },
        trimmingGuide: {
          en: "Trim neatly at 4mm width along the jawline; connect with mustache.",
          ar: "شذب بدقة بعرض 4 ملم على طول عظم الفك واربطه بالشارب."
        },
        necklineTip: { en: "Razor-edged under jawbone.", ar: "محددة بالموس بدقة تحت عظم الفك." },
        avoidTip: { en: "Don't make it too thin like a pencil line.", ar: "تجنب جعل الخط رفيعاً كالقلم." },
        tag: { en: "Precision Line", ar: "خطوط دقيقة ومحددة" }
      }
    ],
    stylesToAvoid: {
      menHairstyles: [
        { en: "High skin fade with no side volume (makes cheekbones jut out aggressively)", ar: "التلاشي الحاد للجلد بدون شعر جانبي (يجعل عظام الخد تبدو ناتئة بشكل حاد مفرط)" },
        { en: "Flat center-parted curtain hair clinging to temples", ar: "الشعر المسطح بفرق وسطي الملتصق بالصدغين" }
      ],
      womenHairstyles: [
        { en: "Hair slicked tightly flat at the temples with no volume", ar: "شد الشعر مسطحاً عند الصدغين بدون أي كثافة أو حركة" },
        { en: "Blunt heavy bangs cut straight across the eye line", ar: "الغرة السميكة المستقيمة التي تقص فوق العينين مباشرة" }
      ],
      beards: [
        { en: "Pointed V-shaped goatee (makes chin look needle-sharp)", ar: "السكسوكة المدببة على شكل V لأنها تجعل الذقن حاداً كالإبرة" },
        { en: "Unshaved neck with thin cheeks", ar: "شعر الرقبة غير المحلوق مع خدود فارغة" }
      ]
    },
    immediateGlowUpTips: [
      {
        id: "tip-debloat",
        category: "debloat",
        timeMinutes: 3,
        title: { en: "Sub-Zygomatic Drainage Sweep", ar: "تصريف السوائل أسفل عظام الخد" },
        instructions: {
          en: "Glide an ice roller right beneath your high cheekbone from nose outward to the ear.",
          ar: "مرر رولر مثلج أسفل عظمة الخد البارزة مباشرة من جانب الأنف للخارج نحو الأذن."
        },
        instantBenefit: {
          en: "Accentuates the natural hollow under cheekbones, boosting model facial contrast.",
          ar: "يبرز التجويف الطبيعي تحت عظام الخد مما يزيد من جاذبية الملامح كعارضي الأزياء."
        }
      },
      {
        id: "tip-brows",
        category: "brows",
        timeMinutes: 2,
        title: { en: "Elongated Eyebrow Tail Grooming", ar: "إطالة ذيل الحاجب أفقياً" },
        instructions: {
          en: "Brush brow tail outward towards the temples to extend forehead width visually.",
          ar: "مشط ذيل الحاجب للخارج نحو الصدغين لتوسيع مساحة الجبهة بصرياً."
        },
        instantBenefit: {
          en: "Broadens the narrow upper third and harmonizes with the cheekbone apex.",
          ar: "يوسع الثلث العلوي الضيق ويتناغم مع قمة عظام الخد."
        }
      },
      {
        id: "tip-posture",
        category: "posture",
        timeMinutes: 1,
        title: { en: "Chin Elevation & Head Retraction", ar: "ضبط الرأس واستقامة الذقن" },
        instructions: {
          en: "Perform 5 wall chin-tucks to align the neck, keeping the chin parallel to the floor.",
          ar: "قم بـ 5 حركات Chin Tuck على الحائط لضبط استقامة الرقبة مع جعل الذقن موازياً للأرض."
        },
        instantBenefit: {
          en: "Prevents downward jaw tapering and enhances natural gonial sharpness.",
          ar: "يمنع انحدار الفك للأسفل ويبرز حدة زاوية الفك الطبيعية."
        }
      },
      {
        id: "tip-skin",
        category: "skin",
        timeMinutes: 2,
        title: { en: "Temple Dewy Hydration", ar: "ترطيب وإضاءة منطقة الصدغين" },
        instructions: {
          en: "Apply a light drop of moisturizer or glow serum to temples to reflect light and create width.",
          ar: "ضع لمسة مرطب أو سيروم نضارة عند الصدغين لعكس الضوء وإعطاء إيحاء بالعرض."
        },
        instantBenefit: {
          en: "Softens the transition between temples and wide cheekbones.",
          ar: "ينعم الانتقال بين الصدغين الضيقين وعظام الخد العريضة."
        }
      },
      {
        id: "tip-hair",
        category: "hair",
        timeMinutes: 2,
        title: { en: "Temple Fluff & Volume Tuck", ar: "تنسيق خصلات الصدغين وإعطاؤها حجماً" },
        instructions: {
          en: "Loosen hair slightly right above the ears and pull gentle volume outward with fingertips.",
          ar: "فكك خصلات الشعر فوق الأذنين قليلاً واسحبها للخارج بأطراف أصابعك لإعطاء حجم."
        },
        instantBenefit: {
          en: "Fills in the narrow temple depression in seconds.",
          ar: "يملأ تجويف الصدغين الضيق في ثوانٍ معدودة."
        }
      }
    ]
  },

  oblong: {
    analysis: {
      shape: "oblong",
      name: { en: "Oblong / Rectangle Face Shape", ar: "شكل الوجه المستطيل / الطويل (Oblong)" },
      confidence: 93,
      description: {
        en: "Face length is noticeably longer than width, with straight cheekbones, similar width across forehead and jaw, and sometimes a higher forehead or longer chin.",
        ar: "طول الوجه أكبر بوضوح من عرضه، مع استقامة في جانبي الوجه، وتقارب في عرض الجبهة والفك، وقد يترافق مع جبهة مرتفعة أو ذقن طويل."
      },
      proportions: {
        lengthToWidthRatio: "1.7 : 1 (Elongated Vertical)",
        foreheadWidth: { en: "High, upright forehead", ar: "مرتفعة ومستقيمة للأعلى" },
        cheekboneWidth: { en: "Straight cheeklines without lateral flare", ar: "مستقيمة الجوانب دون بروز عرضي كبير" },
        jawlineWidth: { en: "Long mandibular line, square or rounded chin", ar: "امتداد طولي مع ذقن مربع أو منحني" }
      },
      keyBalancingPrinciple: {
        en: "Shorten visual facial length and create horizontal balance by adding side width, textured fringes, and avoiding excessive top height.",
        ar: "تقليل الطول البصري للوجه وإضافة توازن أفقي عبر تكثيف الجوانب، اعتماد الغرة الأمامية، وتجنب الارتفاع الزائد في قمة الشعر."
      }
    },
    maleHairstyles: [
      {
        id: "m-ob-1",
        name: { en: "Textured French Crop with Forward Fringe", ar: "كروب فرنسي مع غرة أمامية متموجة" },
        length: "short",
        idealForGender: "male",
        whyItWorks: {
          en: "The forward fringe covers the upper forehead, instantly shortening the perceived face length by 1-2 inches.",
          ar: "الغرة الأمامية تغطي الجزء العلوي من الجبهة مما يقلل طول الوجه البصري بـ 3-5 سم فوراً."
        },
        stylingTip: {
          en: "Blow dry forward, work styling powder into crown, and piece out the fringe horizontally.",
          ar: "جفف للأمام، ضع بودرة التصفيف على التاج، ورتب الغرة أفقياً بأصابعك."
        },
        productRecommendation: { en: "Matte Texture Powder", ar: "بودرة ملمس مطفية" },
        tag: { en: "Best Length Reducer", ar: "أفضل قصة لتقليل طول الوجه" }
      },
      {
        id: "m-ob-2",
        name: { en: "Classic Low-Taper Side Part", ar: "فرق جانبي كلاسيكي مع تدرج منخفض" },
        length: "medium",
        idealForGender: "male",
        whyItWorks: {
          en: "Keeps volume on the sides rather than the top, building horizontal width to balance length.",
          ar: "يحافظ على الكثافة على الجوانب بدلاً من الأعلى، مما يبني عرضاً أفقياً يوازن الطول."
        },
        stylingTip: {
          en: "Keep top length moderate (< 2.5 inches); style flat and neat to the side.",
          ar: "حافظ على طول معتدل في الأعلى (أقل من 6 سم) وصفف الشعر بنعومة للجانب."
        },
        productRecommendation: { en: "Medium-Hold Cream", ar: "كريم تصفيف متوسط التثبيت" },
        tag: { en: "Balanced & Smart", ar: "متوازن وذكي" }
      },
      {
        id: "m-ob-3",
        name: { en: "Textured Scissor Cut with Side Volume", ar: "قص بالمقص مع ملمس وكثافة جانبية" },
        length: "medium",
        idealForGender: "male",
        whyItWorks: {
          en: "Avoids harsh shaved fades that make long faces look narrower, retaining natural side fullness.",
          ar: "يتجنب التلاشي القصير الذي يجعل الوجه الطويل يبدو أنحف، محتفظاً بالامتلاء الجانبي."
        },
        stylingTip: {
          en: "Tousle with sea salt spray and push hair slightly down and forward.",
          ar: "حرك الشعر برذاذ ملح البحر ووجهه قليلاً للأسفل والأمام."
        },
        productRecommendation: { en: "Sea Salt Spray", ar: "رذاذ ملح البحر" },
        tag: { en: "Natural Proportion", ar: "نسب طبيعية متوازنة" }
      }
    ],
    femaleHairstyles: [
      {
        id: "f-ob-1",
        name: { en: "Curtain Bangs with Voluminous Waves", ar: "غرة ستائرية مع تموجات عريضة حيوية" },
        length: "medium",
        idealForGender: "female",
        whyItWorks: {
          en: "Curtain bangs shorten the forehead while bouncy side waves add crucial horizontal width.",
          ar: "الغرة تقصر مساحة الجبهة، والتموجات الجانبية العريضة تضيف عرضاً أفقياً حيوياً."
        },
        stylingTip: {
          en: "Use a 1.5-inch curling iron to curl hair outward horizontally from ear level down.",
          ar: "استخدمي مكواة تجعيد عريضة لتجعيد الشعر أفقياً للخارج ابتداءً من مستوى الأذن."
        },
        productRecommendation: { en: "Volumizing Texture Spray", ar: "رذاذ تكثيف الملمس" },
        tag: { en: "Face Harmonizer", ar: "التناغم الأمثل للملامح" }
      },
      {
        id: "f-ob-2",
        name: { en: "Collarbone Layered Shag with Full Fringe", ar: "شاج متدرج عند الترقوة مع غرة كاملة" },
        length: "medium",
        idealForGender: "female",
        whyItWorks: {
          en: "Horizontal fringe breaks vertical eye scan; wispy shoulder layers stop eyes from dragging down.",
          ar: "الغرة الأفقية تكسر المسح البصري الطولي، والطبقات الخفيفة عند الكتف تمنح توازناً مريحاً."
        },
        stylingTip: {
          en: "Blow dry fringe straight down with a paddle brush; scrunch ends with wave cream.",
          ar: "جففي الغرة للأسفل بفرشاة عريضة واضغطي الأطراف بكريم التموجات."
        },
        productRecommendation: { en: "Curl & Wave Defining Cream", ar: "كريم تحديد التموجات" },
        tag: { en: "Youthful & Retro", ar: "شبابية بطابع ريترو" }
      },
      {
        id: "f-ob-3",
        name: { en: "Side-Parted Chin-to-Collarbone Bob", ar: "بوب عند عظام الترقوة بفرق جانبي وتموجات" },
        length: "medium",
        idealForGender: "female",
        whyItWorks: {
          en: "Resting above the chest creates a horizontal boundary, immediately shortening facial appearance.",
          ar: "استقرار الشعر فوق الصدر يخلق حداً أفقياً يقصر مظهر الوجه الطويل فوراً."
        },
        stylingTip: {
          en: "Flip part deeply to one side to build horizontal body.",
          ar: "اقلبي الفرق بعمق لأحد الجوانب لبناء امتلاء أفقي عريض."
        },
        productRecommendation: { en: "Dry Texture Foam", ar: "رغوة ملمس جافة" },
        tag: { en: "Modern Classic", ar: "كلاسيكية حديثة" }
      }
    ],
    beardStyles: [
      {
        id: "b-ob-1",
        name: { en: "Full Beard with Dense Sides & Trimmed Chin", ar: "لحية كاملة بجوانب كثيفة وذقن قصير" },
        lengthCategory: "medium",
        whyItWorks: {
          en: "Grows hair thicker on the cheeks and sideburns while keeping the chin closely trimmed, widening the face.",
          ar: "تترك الشعر أكثف على الخدين والسوالف مع تقصير شعر الذقن، مما يمنح الوجه عرضاً متناسقاً."
        },
        trimmingGuide: {
          en: "Trim chin hair to 4-5mm; let cheeks and jaw sides flourish at 8-10mm.",
          ar: "قصر شعر الذقن إلى 4-5 ملم ودع شعر الخدين وجوانب الفك ينمو لـ 8-10 ملم."
        },
        necklineTip: { en: "Keep neckline high to not add vertical throat length.", ar: "اجعل خط الرقبة مرتفعاً قليلاً لعدم زيادة طول الرقبة." },
        avoidTip: { en: "Never grow a long chin beard or pointy goatee.", ar: "إياك وإطالة شعر الذقن أو تربية سكسوكة مدببة." },
        tag: { en: "Widens the Silhouette", ar: "يمنح الوجه عرضاً جذاباً" }
      },
      {
        id: "b-ob-2",
        name: { en: "Wide Designer Stubble with Full Mustache (4mm)", ar: "لحية خفيفة عريضة مع شارب ممتلئ (4 ملم)" },
        lengthCategory: "stubble",
        whyItWorks: {
          en: "A strong prominent mustache creates a horizontal anchor line across mid-face, breaking vertical length.",
          ar: "الشارب البارز والممتلئ يصنع خط ارتكاز أفقي في منتصف الوجه يكسر الطول العمودي."
        },
        trimmingGuide: {
          en: "Maintain uniform 4mm stubble across jaw, while keeping mustache slightly denser (6mm).",
          ar: "حافظ على لحية 4 ملم بانتظام مع ترك الشارب أكثر كثافة قليلاً (6 ملم)."
        },
        necklineTip: { en: "Clean trim 1.5 inches above Adam's apple.", ar: "تحديد نظيف أعلى تفاحة آدم بإنش ونصف." },
        avoidTip: { en: "Don't thin out the mustache.", ar: "لا تخفف الشارب أبداً." },
        tag: { en: "Horizontal Symmetry", ar: "تناسق أفقي متميز" }
      },
      {
        id: "b-ob-3",
        name: { en: "Classic Mutton Chops Fade / Wide Sideburns", ar: "سوالف عريضة ممتلئة مع ذقن خفيف" },
        lengthCategory: "short",
        whyItWorks: {
          en: "Pulls the eye horizontally outwards to the lateral cheek boundaries.",
          ar: "يسحب النظر أفقياً نحو الجوانب الخارجية للخدين مما يقلل الإحساس بالطول."
        },
        trimmingGuide: {
          en: "Keep sideburns wide and trimmed to 5mm; keep chin at 2-3mm shadow.",
          ar: "حافظ على السوالف عريضة بطول 5 ملم واجعل الذقن ظلاً خفيفاً بـ 2-3 ملم."
        },
        necklineTip: { en: "Clean straight finish.", ar: "خط نظيف ومستقيم." },
        avoidTip: { en: "Don't let them become wild uncombed mutton chops.", ar: "رتب السوالف ولا تتركها فوضوية." },
        tag: { en: "Bold Character", ar: "طابع جريء وفريد" }
      }
    ],
    stylesToAvoid: {
      menHairstyles: [
        { en: "Tall pompadour or high spiky hair (> 3 inches of vertical lift)", ar: "البومبادور المرتفع أو الشعر الشوكي للأعلى (يزيد طول الوجه بشكل مبالغ فيه)" },
        { en: "High skin fade with long slicked-back top", ar: "التلاشي الحاد للجلد مع شد الشعر الطويل للخلف والأعلى" }
      ],
      womenHairstyles: [
        { en: "Extra-long pin-straight hair with middle part and no layers (pulls face down into a rectangle)", ar: "الشعر الطويل جداً الأملس بفرق وسطي وبدون طبقات (يسحب الوجه للأسفل كالمستطيل)" },
        { en: "High tight topknots with no face framing", ar: "الكعكة المرتفعة المشدودة في قمة الرأس بدون أي خصلات محيطة" }
      ],
      beards: [
        { en: "Long pointed goatee or ducktail beard (drastically exaggerates chin length)", ar: "اللحية الطويلة المدببة أو السكسوكة الطويلة (تضاعف طول الذقن بشكل غير مستحب)" },
        { en: "Clean-shaven cheeks with long chin tuft", ar: "حلاقة الخدين بالكامل مع ترك خصلة ذقن متدلية" }
      ]
    },
    immediateGlowUpTips: [
      {
        id: "tip-debloat",
        category: "debloat",
        timeMinutes: 3,
        title: { en: "Horizontal Cheek Sweep Protocol", ar: "تدليك الخدود أفقياً لتوسيع الملامح" },
        instructions: {
          en: "Glide an ice roller or cold spoon horizontally across cheeks from mouth corners towards ears.",
          ar: "مرر رولر مثلج أو ملعقة مبردة بحركة أفقية عبر الخدين من زوايا الفم نحو الأذنين."
        },
        instantBenefit: {
          en: "Stimulates horizontal blood flow, giving cheeks a healthy, rosy wide flush.",
          ar: "يحفز الدورة الدموية أفقياً ويمنح الخدين تورداً صحياً يعزز الامتلاء المتوازن."
        }
      },
      {
        id: "tip-brows",
        category: "brows",
        timeMinutes: 2,
        title: { en: "Straight Horizontal Eyebrow Grooming", ar: "تمشيط الحواجب بخط أفقي مستقيم" },
        instructions: {
          en: "Groom brows horizontally straight without high arches. Extend the tail slightly outwards.",
          ar: "مشط الحواجب أفقياً باستقامة وتجنب تقويسها للأعلى مع مد الذيل قليلاً للخارج."
        },
        instantBenefit: {
          en: "The horizontal brow line cuts vertical face length in half optically.",
          ar: "الخط الأفقي للحاجبين يكسر امتداد الوجه الطولي إلى النصف بصرياً."
        }
      },
      {
        id: "tip-posture",
        category: "posture",
        timeMinutes: 1,
        title: { en: "Level Head Gaze Alignment", ar: "ضبط مستوى النظر وتجنب رفع الرأس" },
        instructions: {
          en: "Ensure you look straight ahead at eye level; avoid tilting your head backwards.",
          ar: "احرص على النظر للأمام مباشرة بمستوى العين وتجنب رفع الذقن للأعلى أثناء الحديث أو التصوير."
        },
        instantBenefit: {
          en: "Tilting head back adds 10% perceived length; level gaze keeps proportions compact.",
          ar: "رفع الرأس يزيد الطول الظاهري بـ 10%، بينما المستوى المستقيم يحفظ الأبعاد المتناسقة."
        }
      },
      {
        id: "tip-skin",
        category: "skin",
        timeMinutes: 2,
        title: { en: "Horizontal Blush / Glow Placement", ar: "توزيع الإشراقة والترطيب بشكل أفقي" },
        instructions: {
          en: "Apply hydration balm or blush horizontally across the bridge of nose and cheeks ('sun-kissed' sweep).",
          ar: "ضع لمسة ترطيب أو لمسة حيوية أفقياً على امتداد عظمة الأنف وأعلى الخدين."
        },
        instantBenefit: {
          en: "Draws visual attention horizontally across the center of your face.",
          ar: "يجذب الانتباه البصري أفقياً عبر منتصف الوجه بدلاً من الحركة الطولية."
        }
      },
      {
        id: "tip-hair",
        category: "hair",
        timeMinutes: 2,
        title: { en: "Fringe Pull-Down & Ear Tuck", ar: "سحب الغرة للأمام وتثبيت الجوانب" },
        instructions: {
          en: "Pull front bangs or wisps down over your hairline and tuck side hair with gentle flare.",
          ar: "اسحب خصلات الغرة الأمامية للأسفل فوق خط الشعر لتقليل مساحة الجبهة الظاهرة."
        },
        instantBenefit: {
          en: "Immediately clips 1-2 inches off your visible forehead height.",
          ar: "يقلص فوراً 3-5 سم من ارتفاع الجبهة الظاهرة."
        }
      }
    ]
  }
};
