import React, { useState } from "react";
import { 
  Locale, 
  UserProfile, 
  GenderTrack 
} from "../types";
import { 
  User, 
  Settings, 
  Crown, 
  ShieldCheck, 
  Download, 
  Trash2, 
  Flame, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Check, 
  ChevronRight, 
  Lock,
  Globe,
  HelpCircle,
  Clock
} from "lucide-react";
import { CURATED_PRODUCTS } from "../data/productCatalog";

interface ProfileViewProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  genderTrack: GenderTrack;
  onChangeGenderTrack: (track: GenderTrack) => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onResetAllData: () => void;
  onOpenSettings?: () => void;
  onShowToast: (msg: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  locale,
  setLocale,
  genderTrack,
  onChangeGenderTrack,
  userProfile,
  onUpdateProfile,
  onResetAllData,
  onOpenSettings,
  onShowToast,
}) => {
  const isRtl = locale === "ar";
  const isFemale = genderTrack === "female";

  const [name, setName] = useState(userProfile.name || "");
  const [activeSubTab, setActiveSubTab] = useState<"profile" | "products" | "privacy" | "premium">("profile");

  const productsList = CURATED_PRODUCTS.filter(
    (p) => p.genderSuitability === "both" || (isFemale ? p.genderSuitability === "female" : p.genderSuitability === "male")
  );

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onUpdateProfile({ name: name.trim() });
    onShowToast(isRtl ? "تم تحديث الاسم بنجاح" : "Profile name updated successfully");
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(
      {
        profile: userProfile,
        track: genderTrack,
        timestamp: new Date().toISOString(),
      },
      null,
      2
    );
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `auramax-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast(isRtl ? "تم تصدير نسختك الاحتياطية" : "Profile data exported successfully");
  };

  return (
    <div 
      className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. Header Profile Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#18181b] border border-[#27272a] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#111113] border border-[#27272a] flex items-center justify-center text-[#22d3ee] font-extrabold text-2xl font-display">
            {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "A"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#f4f4f5] font-display">
                {userProfile.name || (isRtl ? "مستخدم أورا" : "Aura Member")}
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#111113] border border-[#27272a] text-[#22d3ee] font-bold">
                {isFemale ? "Aura Fem" : "Aura Max"}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-[#a1a1aa]">
              <span>{isRtl ? "المستوى" : "Level"} {userProfile.level}</span>
              <span>·</span>
              <span>{userProfile.streakDays} {isRtl ? "أيام التزام" : "days streak"}</span>
              <span>·</span>
              <span className="text-[#22d3ee] font-bold">{userProfile.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Track switch button */}
        <button
          onClick={() => onChangeGenderTrack(isFemale ? "male" : "female")}
          className="px-4 py-2.5 rounded-xl bg-[#111113] hover:bg-[#27272a] border border-[#27272a] text-xs font-semibold text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer self-start md:self-auto"
        >
          {isFemale 
            ? (isRtl ? "التبديل إلى مسار الرجال (Aura Max)" : "Switch to Men's Track") 
            : (isRtl ? "التبديل إلى مسار النساء (Aura Fem)" : "Switch to Women's Track")}
        </button>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#27272a] pb-2 overflow-x-auto">
        {[
          { id: "profile", label: isRtl ? "الملف الشخصي" : "Profile" },
          { id: "products", label: isRtl ? "المنتجات المطابقة" : "Matched Products" },
          { id: "premium", label: isRtl ? "مزايا Premium" : "Premium Tier" },
          { id: "privacy", label: isRtl ? "الخصوصية والبيانات" : "Privacy & Data" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === tab.id
                ? "bg-[#18181b] text-[#22d3ee] border border-[#27272a] shadow-xs"
                : "text-[#a1a1aa] hover:text-[#f4f4f5]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Tab Contents */}

      {/* TAB 1: Profile Settings */}
      {activeSubTab === "profile" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#18181b] border border-[#27272a] space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#a1a1aa]">
              {isRtl ? "تعديل المعلومات الشخصية" : "Edit Profile Info"}
            </h2>
            <form onSubmit={handleSaveName} className="space-y-4">
              <div>
                <label className="text-xs text-[#a1a1aa] block mb-1">
                  {isRtl ? "اسم العرض:" : "Display Name:"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111113] border border-[#27272a] text-xs text-[#f4f4f5] focus:outline-none focus:border-[#22d3ee]"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#22d3ee] hover:opacity-95 text-[#09090b] text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                {isRtl ? "حفظ التعديلات" : "Save Changes"}
              </button>
            </form>
          </div>

          <div className="p-6 rounded-3xl bg-[#18181b] border border-[#27272a] space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#a1a1aa]">
              {isRtl ? "اللغة والتفضيلات العامة" : "Preferences & General"}
            </h2>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#111113] border border-[#27272a]">
              <div className="flex items-center gap-2.5 text-xs text-[#f4f4f5]">
                <Globe className="w-4 h-4 text-[#22d3ee]" />
                <span>{isRtl ? "لغة الواجهة" : "Interface Language"}</span>
              </div>
              <button
                onClick={() => setLocale(locale === "en" ? "ar" : "en")}
                className="text-xs font-bold text-[#22d3ee] hover:underline cursor-pointer"
              >
                {locale === "en" ? "العربية" : "English"}
              </button>
            </div>

            {onOpenSettings && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#111113] border border-[#27272a]">
                <div className="flex items-center gap-2.5 text-xs text-[#f4f4f5]">
                  <Settings className="w-4 h-4 text-[#818cf8]" />
                  <span>{isRtl ? "إشعارات المتصفح والتذكيرات" : "Notifications & Routine Reminders"}</span>
                </div>
                <button
                  onClick={onOpenSettings}
                  className="text-xs font-bold text-[#22d3ee] hover:underline cursor-pointer"
                >
                  {isRtl ? "تعديل" : "Manage"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Matched Products ("Why this matches you") */}
      {activeSubTab === "products" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#a1a1aa]">
              {isRtl ? "منتجات معتمدة تطابق أهدافك" : "Verified Products Matching Your Goals"}
            </h2>
            <span className="text-xs text-[#71717a]">
              {isRtl ? "غير إجبارية · مبنية على المكونات الفعالة" : "Optional · Selected for Active Ingredients"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productsList.map((prod) => (
              <div key={prod.id} className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a] flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#111113] border border-[#27272a] text-[#22d3ee] font-bold uppercase">
                    {prod.category}
                  </span>
                  <h3 className="text-base font-bold text-[#f4f4f5] mt-2 mb-1">
                    {prod.name[locale]}
                  </h3>
                  <div className="text-[11px] font-bold text-[#10b981] mb-2">
                    {prod.priceRange}
                  </div>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {prod.attributes.join(" · ")}
                  </p>

                  <div className="mt-3 p-2.5 rounded-lg bg-[#111113] text-[11px] text-[#a1a1aa]">
                    <span className="text-[#22d3ee] font-bold">{isRtl ? "لماذا يناسبك: " : "Why this matches you: "}</span>
                    {prod.whyItMatches[locale]}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#27272a] flex items-center justify-between text-xs text-[#71717a]">
                  <span>{isRtl ? "موصى به للبروتوكول" : "Matches Protocol"}</span>
                  <span className="text-[#22d3ee] font-bold">✓ Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Premium Tier (Transparent value proposition) */}
      {activeSubTab === "premium" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#18181b] border border-[#818cf8]/30 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#818cf8] uppercase tracking-wider">
            <Crown className="w-4 h-4 text-[#818cf8]" />
            <span>{isRtl ? "ترقية أورا بريميوم" : "Aura Max Premium Tier"}</span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#f4f4f5] font-display">
              {isRtl ? "أدوات متقدمة للتحول المستمر" : "Advanced Tools for Deeper Transformation"}
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1 max-w-2xl">
              {isRtl 
                ? "تتيح النسخة المجانية كل الوظائف الأساسية. تفتح ترقية بريميوم التكيف الذكي المستمر للمهام، وتتبع أهداف متعددة في آن واحد."
                : "The free tier includes complete scanning and daily protocols. Premium unlocks real-time adaptive scheduling, multi-goal protocols, and extended AI coaching."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#111113] border border-[#27272a] flex items-start gap-3">
              <Check className="w-4 h-4 text-[#818cf8] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#f4f4f5]">{isRtl ? "تكيّف أسبوعي تلقائي ذكي" : "Adaptive weekly adjustments"}</div>
                <div className="text-[#a1a1aa] mt-0.5">{isRtl ? "تعديل فوري للخطوات إذا فاتك روتين معين" : "Automatically resizes routine to prevent missed streak"}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#111113] border border-[#27272a] flex items-start gap-3">
              <Check className="w-4 h-4 text-[#818cf8] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#f4f4f5]">{isRtl ? "مدرب ذكي متصل بخطتك" : "Unlimited Contextual AI Coach"}</div>
                <div className="text-[#a1a1aa] mt-0.5">{isRtl ? "إجابات علمية دقيقة بناءً على قياسات وجهك" : "Specific answers grounded in your scan geometry"}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#111113] border border-[#27272a] flex items-start gap-3">
              <Check className="w-4 h-4 text-[#818cf8] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#f4f4f5]">{isRtl ? "أهداف متعددة في آن واحد" : "Multi-goal tracking"}</div>
                <div className="text-[#a1a1aa] mt-0.5">{isRtl ? "دمج الفك مع البشرة والشعر في جدول موحد" : "Stack jawline, posture, and hair in one plan"}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#111113] border border-[#27272a] flex items-start gap-3">
              <Check className="w-4 h-4 text-[#818cf8] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#f4f4f5]">{isRtl ? "سبرنتات عادات مضاعفة النقاط" : "Sprint multiplier rewards"}</div>
                <div className="text-[#a1a1aa] mt-0.5">{isRtl ? "أوسمة وجوائز XP خاصة لإتقان الالتزام" : "Exclusive badges and XP streaks for discipline"}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Privacy & Local Data Management */}
      {activeSubTab === "privacy" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#18181b] border border-[#27272a] space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#22d3ee] uppercase tracking-wider">
            <Lock className="w-4 h-4 text-[#22d3ee]" />
            <span>{isRtl ? "الخصوصية والتحكم في البيانات" : "Privacy & Data Sovereignty"}</span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#f4f4f5] font-display">
              {isRtl ? "بياناتك محفوظة محلياً على جهازك" : "Your Data Stays on Your Device"}
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1 max-w-2xl">
              {isRtl 
                ? "يتم تخزين فحوصاتك ومسارك والمهام اليومية محلياً. يمكنك تنزيل نسخة احتياطية أو مسح السجل كاملاً بأي لحظة."
                : "All scans, streaks, and customization inputs are stored in client-side storage. You retain total control over your profile."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleExportData}
              className="px-5 py-3 rounded-xl bg-[#111113] hover:bg-[#27272a] border border-[#27272a] text-xs font-semibold text-[#f4f4f5] flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4 text-[#22d3ee]" />
              <span>{isRtl ? "تصدير نسخة من بياناتي (JSON)" : "Export Profile Data (JSON)"}</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm(isRtl ? "هل أنت متأكد من مسح جميع البيانات؟" : "Are you sure you want to reset all local data?")) {
                  onResetAllData();
                }
              }}
              className="px-5 py-3 rounded-xl bg-[#111113] hover:bg-red-950/40 border border-red-900/40 text-xs font-semibold text-red-400 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>{isRtl ? "مسح وإعادة ضبط كل البيانات" : "Reset & Clear All Local Data"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
