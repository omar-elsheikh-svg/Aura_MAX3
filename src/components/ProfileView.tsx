import React, { useState } from "react";
import { 
  Locale, 
  GenderTrack, 
  UserProfile, 
  TransformationPlan 
} from "../types";
import { CURATED_PRODUCTS } from "../data/productCatalog";
import { 
  User, 
  Crown, 
  Flame, 
  Globe, 
  Bell, 
  ShieldCheck, 
  Trash2, 
  Download, 
  ExternalLink, 
  Sparkles, 
  Check, 
  ShoppingBag,
  Sliders,
  ChevronRight,
  Info
} from "lucide-react";

interface ProfileViewProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  genderTrack: GenderTrack;
  onChangeGenderTrack: (track: GenderTrack) => void;
  userProfile: UserProfile;
  activePlan?: TransformationPlan | null;
  onEditPlan?: () => void;
  onOpenSettings?: () => void;
  onClearAllData: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  locale,
  setLocale,
  genderTrack,
  onChangeGenderTrack,
  userProfile,
  activePlan,
  onEditPlan,
  onOpenSettings,
  onClearAllData,
}) => {
  const isRtl = locale === "ar";
  const isFemale = genderTrack === "female";

  const [activeTab, setActiveTab] = useState<"settings" | "products" | "premium">("settings");
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>("all");

  const filteredProducts = CURATED_PRODUCTS.filter((prod) => {
    if (prod.genderSuitability !== "both" && prod.genderSuitability !== genderTrack) return false;
    if (productCategoryFilter !== "all" && prod.category !== productCategoryFilter) return false;
    return true;
  });

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        userProfile,
        activePlan,
        genderTrack,
        locale,
        exportedAt: new Date().toISOString(),
      }, null, 2)
    );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `auramax-profile-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div 
      className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Profile Header */}
      <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#171A21] border border-[#252A33] flex items-center justify-center text-xl font-black text-[#42E8FF] font-display shrink-0">
            {userProfile.level}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#F4F7FA]">
                {userProfile.name || (isRtl ? "مستخدم أورا ماكس" : "Aura Max User")}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#42E8FF]/10 text-[#42E8FF]">
                {isFemale ? "Aura Fem" : "Aura Max"}
              </span>
            </div>
            <div className="text-xs text-[#A5AEBC] mt-0.5">
              {isRtl ? "المستوى" : "Level"} {userProfile.level} · {userProfile.xp} XP · {userProfile.streakDays} {isRtl ? "يوم التزام" : "Day Streak"}
            </div>
          </div>
        </div>

        {/* Subtabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#08090C] border border-[#252A33] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "settings" ? "bg-[#171A21] text-[#42E8FF]" : "text-[#A5AEBC]"
            }`}
          >
            {isRtl ? "الإعدادات" : "Preferences"}
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "products" ? "bg-[#171A21] text-[#42E8FF]" : "text-[#A5AEBC]"
            }`}
          >
            {isRtl ? "المنتجات المعتمدة" : "Products"}
          </button>
          <button
            onClick={() => setActiveTab("premium")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "premium" ? "bg-[#171A21] text-[#8B5CF6]" : "text-[#A5AEBC]"
            }`}
          >
            {isRtl ? "الترقية" : "Go Deeper"}
          </button>
        </div>
      </div>

      {activeTab === "settings" && (
        <div className="space-y-4">
          {/* Active Plan Overview */}
          {activePlan && (
            <div className="p-5 rounded-2xl bg-[#111318] border border-[#252A33] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#252A33]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC]">
                  {isRtl ? "خطتك المعتمدة الحالية" : "Active Transformation Plan"}
                </span>
                {onEditPlan && (
                  <button
                    onClick={onEditPlan}
                    className="text-xs font-bold text-[#42E8FF] hover:underline cursor-pointer"
                  >
                    {isRtl ? "تعديل الخطة" : "Re-calibrate"}
                  </button>
                )}
              </div>
              <div className="text-sm font-bold text-[#F4F7FA]">
                {activePlan.title[locale]}
              </div>
              <p className="text-xs text-[#A5AEBC] leading-relaxed">
                {activePlan.summary[locale]}
              </p>
            </div>
          )}

          {/* Preferences Group */}
          <div className="p-5 rounded-2xl bg-[#111318] border border-[#252A33] space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC]">
              {isRtl ? "خيارات المنظومة والمسار" : "System & Track Options"}
            </h2>

            {/* Track Switcher */}
            <div className="flex items-center justify-between py-2 border-b border-[#252A33]">
              <div>
                <div className="text-xs font-bold text-[#F4F7FA]">
                  {isRtl ? "مسار التطوير" : "Transformation Track"}
                </div>
                <div className="text-[11px] text-[#A5AEBC]">
                  {isFemale 
                    ? (isRtl ? "أورا فيم (التناغم الأنثوي والبشرة الزجاجية)" : "Aura Fem (Feminine harmony & glass skin)")
                    : (isRtl ? "أورا ماكس (هندسة الفك والعناية بالرجل)" : "Aura Max (Mandibular jawline & grooming)")}
                </div>
              </div>
              <button
                onClick={() => onChangeGenderTrack(isFemale ? "male" : "female")}
                className="px-3 py-1.5 rounded-lg bg-[#171A21] hover:bg-[#252A33] border border-[#252A33] text-xs font-bold text-[#42E8FF] transition-colors cursor-pointer"
              >
                {isFemale ? (isRtl ? "تبديل لمسار الرجال" : "Switch to Men") : (isRtl ? "تبديل لمسار النساء" : "Switch to Women")}
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center justify-between py-2 border-b border-[#252A33]">
              <div>
                <div className="text-xs font-bold text-[#F4F7FA]">
                  {isRtl ? "لغة التطبيق" : "Application Language"}
                </div>
                <div className="text-[11px] text-[#A5AEBC]">
                  {locale === "ar" ? "اللغة العربية (RTL)" : "English (LTR)"}
                </div>
              </div>
              <button
                onClick={() => setLocale(locale === "en" ? "ar" : "en")}
                className="px-3 py-1.5 rounded-lg bg-[#171A21] hover:bg-[#252A33] border border-[#252A33] text-xs font-bold text-[#F4F7FA] transition-colors cursor-pointer"
              >
                {locale === "en" ? "العربية" : "English"}
              </button>
            </div>

            {/* Notifications Modal Shortcut */}
            {onOpenSettings && (
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-xs font-bold text-[#F4F7FA]">
                    {isRtl ? "إشعارات التذكير اليومية" : "Daily Quest Reminders"}
                  </div>
                  <div className="text-[11px] text-[#A5AEBC]">
                    {isRtl ? "تنبيهات الحفاظ على سلسلة الاستمرارية" : "Streak preservation & scheduled alerts"}
                  </div>
                </div>
                <button
                  onClick={onOpenSettings}
                  className="px-3 py-1.5 rounded-lg bg-[#171A21] hover:bg-[#252A33] border border-[#252A33] text-xs font-bold text-[#F4F7FA] transition-colors cursor-pointer"
                >
                  {isRtl ? "ضبط التنبيهات" : "Configure"}
                </button>
              </div>
            )}
          </div>

          {/* Privacy & Data Ownership Group */}
          <div className="p-5 rounded-2xl bg-[#111318] border border-[#252A33] space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#42E8FF]" />
              <span>{isRtl ? "الخصوصية والتحكم في البيانات" : "Privacy & Data Sovereignty"}</span>
            </h2>

            <p className="text-xs text-[#A5AEBC] leading-relaxed">
              {isRtl
                ? "يتم تخزين جميع بيانات الفحوصات والخطط محلياً على جهازك. لا نقوم برفع صور وجهك الأصلية."
                : "All biometric metrics and transformation plans are held locally on your device. Raw facial photos are never retained on our servers."}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={exportData}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#171A21] hover:bg-[#252A33] border border-[#252A33] text-xs font-bold text-[#F4F7FA] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#42E8FF]" />
                <span>{isRtl ? "تصدير بياناتي (JSON)" : "Export Data (JSON)"}</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm(isRtl ? "هل أنت متأكد من حذف كافة بياناتك وسجل الفحوصات محلياً؟" : "Are you sure you want to delete all local scan data and reset your plan?")) {
                    onClearAllData();
                  }
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-red-950/20 hover:bg-red-900/30 border border-red-800/40 text-xs font-bold text-red-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isRtl ? "حذف كافة البيانات وإعادة التعيين" : "Delete All Local Data"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "products" && (
        <div className="space-y-4">
          {/* Transparent Disclosure Banner */}
          <div className="p-4 rounded-xl bg-[#08090C] border border-[#252A33] text-xs text-[#A5AEBC] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#42E8FF] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#F4F7FA] block mb-0.5">
                {isRtl ? "إفصاح الشفافية والحياد الجمالي:" : "Independent Product Curation & Disclosure:"}
              </span>
              <span>
                {isRtl 
                  ? "جميع المنتجات تم اختيارها بناءً على المكونات الفعالة وملائمتها لخطتك. قد يحصل التطبيق على عمولة تسويق بالعمولة عند الشراء عبر الروابط دون أي تكلفة إضافية عليك."
                  : "All selections are independently screened for ingredient efficacy and routine compatibility. Aura Max may earn an affiliate commission on qualifying purchases at zero extra cost to you."}
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {["all", "spf", "tool", "serum", "grooming", "hair"].map((cat) => (
              <button
                key={cat}
                onClick={() => setProductCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 capitalize ${
                  productCategoryFilter === cat
                    ? "bg-[#42E8FF] text-[#08090C]"
                    : "bg-[#111318] text-[#A5AEBC] hover:text-[#F4F7FA]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((prod) => (
              <div 
                key={prod.id} 
                className="p-5 rounded-2xl bg-[#111318] border border-[#252A33] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#42E8FF] px-2 py-0.5 rounded bg-[#42E8FF]/10">
                      {prod.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#F4F7FA]">
                      {prod.priceEstimated} ({prod.priceRange})
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#F4F7FA] mb-1">
                    {prod.name[locale]}
                  </h3>

                  <p className="text-xs text-[#A5AEBC] leading-relaxed mb-3">
                    {prod.whyItMatches[locale]}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {prod.attributes.map((attr, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#171A21] text-[#A5AEBC]">
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#252A33] flex items-center justify-between">
                  <span className="text-[10px] text-[#6B7484]">{prod.merchant}</span>
                  <a
                    href={prod.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#42E8FF] hover:underline"
                  >
                    <span>{isRtl ? "عرض المنتج" : "View Product"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "premium" && (
        <div className="p-8 rounded-3xl bg-gradient-to-b from-[#111318] to-[#171A21] border border-[#8B5CF6]/30 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-2xl font-black text-[#F4F7FA] font-display">
              {isRtl ? "التعمق في التحول — أورا بريميوم" : "Go Deeper with Aura Premium"}
            </h2>
            <p className="text-xs text-[#A5AEBC] leading-relaxed">
              {isRtl 
                ? "طبقة اختيارية متقدمة لمن يرغب في التوسع: محرك تكيف عميق للخطة، استشارات غير محدودة مع المدرب، وتقارير تطور بيومترية دقيقة."
                : "An optional progression layer for users seeking deeper plan adaptation, unlimited AI Coach interactions, and comprehensive biometric reporting."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-start">
            {[
              {
                title: isRtl ? "تكيف الخطة العميق" : "Adaptive Plan Depth",
                desc: isRtl ? "إعادة حساب المسارات آلياً بناءً على إجهاد عضلات الوجه." : "Dynamic recalibration tailored to facial strain and habit rhythm.",
              },
              {
                title: isRtl ? "استشارات المدرب المتقدمة" : "Unlimited AI Coach",
                desc: isRtl ? "تحليل فوري لمكونات المستحضرات واستفسارات تسريحة الشعر." : "Instant cosmetic formula screening and tailored hairstyle advice.",
              },
              {
                title: isRtl ? "تقارير التناسق التفصيلية" : "Full Harmonic Reports",
                desc: isRtl ? "مقارنات نسب الوجه الذهبية وتحليل الزوايا المتكامل." : "Golden ratio mapping and longitudinal symmetry charts.",
              },
            ].map((f, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#08090C] border border-[#252A33]">
                <div className="text-xs font-bold text-[#F4F7FA] mb-1">{f.title}</div>
                <div className="text-[11px] text-[#A5AEBC] leading-tight">{f.desc}</div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert(isRtl ? "ميزة تجريبية قادمة قريباً!" : "Premium preview tier is active for your account!")}
              className="px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all cursor-pointer"
            >
              {isRtl ? "معاينة مميزات بريميوم" : "Preview Premium Features"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
