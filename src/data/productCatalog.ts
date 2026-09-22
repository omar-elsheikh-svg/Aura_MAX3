import { CuratedProduct, UserGoal, GenderTrack } from "../types";

export const CURATED_PRODUCTS: CuratedProduct[] = [
  {
    id: "prod-spf-broad",
    name: {
      en: "Ultra-Light Matte Sun Shield SPF 50+",
      ar: "واقي شمس واسع المدى غير لامع SPF 50+",
    },
    category: "spf",
    attributes: ["Non-comedogenic", "Broad-Spectrum UVA/UVB", "Matte Finish", "Zero White Cast"],
    ingredients: ["Zinc Oxide", "Niacinamide 2%", "Centella Asiatica"],
    priceRange: "$$",
    priceEstimated: "$18",
    currency: "USD",
    targetGoal: "skin",
    genderSuitability: "both",
    whyItMatches: {
      en: "Essential shield to stop UV photo-breakdown of dermal collagen and maintain high skin reflectance.",
      ar: "درع أساسي لحماية الكولاجين من التلف الضوئي ومنع التصبغات مع لمسة مطفية طبيعية.",
    },
    merchant: "DermStore / Boots",
    affiliateUrl: "https://example.com/products/matte-spf50",
    disclosure: {
      en: "Transparent Disclosure: Independent aesthetic curation. Aura Max may earn a small referral commission at no additional cost to you.",
      ar: "إفصاح الشفافية: ترشيحات مستقلة. قد يحصل أورا ماكس على عمولة إحالة بسيطة دون أي تكلفة إضافية عليك.",
    },
  },
  {
    id: "prod-gua-sha-sculpt",
    name: {
      en: "Medical-Grade Stainless Steel Gua Sha Sculptor",
      ar: "أداة غوا شا من الستانلس ستيل الطبي لنحت الفك",
    },
    category: "tool",
    attributes: ["Naturally Cold", "Non-Porous", "Ergonomic Mandibular Edge", "Unbreakable"],
    ingredients: ["100% Medical Grade 304 Stainless Steel"],
    priceRange: "$",
    priceEstimated: "$16",
    currency: "USD",
    targetGoal: "face",
    genderSuitability: "both",
    whyItMatches: {
      en: "Provides natural cryo-temperature to flush stagnant nocturnal facial lymph and sharpen the gonial boundary.",
      ar: "توفر برودة ذاتية لتصريف السائل اللمفاوي الراكد وتحديد زاوية الفك والوجنتين بشكل طبيعي.",
    },
    merchant: "Aura Essentials / Sephora",
    affiliateUrl: "https://example.com/products/steel-guasha",
    disclosure: {
      en: "Transparent Disclosure: Non-sponsored independent selection based on ergonomic suitability.",
      ar: "إفصاح الشفافية: ترشيح مستقل مبني على الكفاءة الهندسية وتوافق الأداة مع زوايا الوجه.",
    },
  },
  {
    id: "prod-peptide-glaze",
    name: {
      en: "Quad-Peptide Barrier & Cellular Hydration Glaze",
      ar: "سيروم رباعي الببتيدات لترميم الحاجز والنضارة الزجاجية",
    },
    category: "serum",
    attributes: ["Multi-Peptide Matrix", "Fragrance Free", "Deep Epidermal Hydration"],
    ingredients: ["Copper Tripeptide-1", "Palmitoyl Tripeptide-5", "Hyaluronic Acid", "Ceramide NP"],
    priceRange: "$$",
    priceEstimated: "$24",
    currency: "USD",
    targetGoal: "skin",
    genderSuitability: "both",
    whyItMatches: {
      en: "Boosts dermal plumpness, eliminates micro-dehydration lines, and builds the glass-skin reflectance layer.",
      ar: "يعزز مرونة الجلد، ويزيل خطوط الجفاف الدقيقة، ويمنح البشرة توهجاً صحياً زجاجياً.",
    },
    merchant: "The Ordinary / CultBeauty",
    affiliateUrl: "https://example.com/products/quad-peptide",
    disclosure: {
      en: "Transparent Disclosure: Independently reviewed. Aura Max may earn an affiliate commission on qualifying purchases.",
      ar: "إفصاح الشفافية: مراجعة مستقلة معتمدة. قد يحصل التطبيق على عمولة عند الشراء عبر الرابط.",
    },
  },
  {
    id: "prod-precision-trimmer",
    name: {
      en: "Precision 0.2mm - 5mm Mandibular Beard Trimmer",
      ar: "ماكينة تشذيب وتحديد خط الفك الدقيقة (0.2 - 5 ملم)",
    },
    category: "grooming",
    attributes: ["0.2mm Increments", "Titanium Blades", "Li-ion 100min Battery", "Waterproof"],
    ingredients: ["Self-Sharpening Titanium Blades"],
    priceRange: "$$$",
    priceEstimated: "$45",
    currency: "USD",
    targetGoal: "grooming",
    genderSuitability: "male",
    whyItMatches: {
      en: "Enables razor-sharp neckline fading 2 finger-widths above the Adam's apple to chisel lower mandibular shadows.",
      ar: "تتيح تحديداً دقيقاً لخط الرقبة واللحية لإبراز ظل الفك وزاويته الذكورية بأقصى درجات الوضوح.",
    },
    merchant: "Philips / Braun Official",
    affiliateUrl: "https://example.com/products/precision-trimmer",
    disclosure: {
      en: "Transparent Disclosure: Non-sponsored tool chosen strictly for millimeter guard accuracy.",
      ar: "إفصاح الشفافية: تم اختيار الأداة بناءً على دقتها المليمترية في تحديد زوايا الفك.",
    },
  },
  {
    id: "prod-rosemary-scalp-serum",
    name: {
      en: "Organic Rosemary & Mint Follicle Stimulating Elixir",
      ar: "سيروم إكليل الجبل والنعناع العضوي لتنشيط بصيلات الشعر",
    },
    category: "hair",
    attributes: ["Cold-Pressed", "Biotin Infused", "Stimulates Micro-Circulation"],
    ingredients: ["Rosmarinus Officinalis (Rosemary) Leaf Oil", "Mentha Piperita", "Biotin", "Jojoba Oil"],
    priceRange: "$",
    priceEstimated: "$12",
    currency: "USD",
    targetGoal: "hair",
    genderSuitability: "both",
    whyItMatches: {
      en: "Clinically compared to 2% minoxidil in peer-reviewed trials for hair shaft thickness with zero hormonal disruption.",
      ar: "مثبت في الدراسات لتحفيز تدفق الدم للبصيلات ودعم كثافة الشعر طبيعياً دون تأثيرات هرمونية.",
    },
    merchant: "iHerb / Amazon Luxury",
    affiliateUrl: "https://example.com/products/rosemary-oil",
    disclosure: {
      en: "Transparent Disclosure: Evidence-backed natural formulation. Aura Max may receive an affiliate fee.",
      ar: "إفصاح الشفافية: تركيبة طبيعية مدعومة بالأبحاث. قد يحصل التطبيق على عمولة تسويق.",
    },
  },
];

export function getFilteredProducts(
  goal?: UserGoal, 
  gender?: GenderTrack, 
  maxBudget?: string
): CuratedProduct[] {
  return CURATED_PRODUCTS.filter((prod) => {
    if (goal && prod.targetGoal !== goal && prod.category !== "spf") return false;
    if (gender && prod.genderSuitability !== "both" && prod.genderSuitability !== gender) return false;
    return true;
  });
}
