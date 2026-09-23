import React, { useState, useEffect } from "react";
import { 
  Locale, 
  NavTab, 
  Quest, 
  ScanResult, 
  UserProfile, 
  GenderTrack, 
  TransformationPlan 
} from "./types";
import { translations } from "./i18n/translations";
import { INITIAL_USER, INITIAL_QUESTS, INITIAL_SCAN } from "./data/initialData";
import { FEMALE_QUESTS, INITIAL_FEMALE_USER, INITIAL_FEMALE_SCAN } from "./data/femaleBeautyData";
import { LandingPage } from "./components/LandingPage";
import { PathSelectionModal } from "./components/PathSelectionModal";
import { PlanBuilderView } from "./components/PlanBuilderView";
import { HomeView } from "./components/HomeView";
import { TodayView } from "./components/TodayView";
import { ProgressView } from "./components/ProgressView";
import { ProfileView } from "./components/ProfileView";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { ScanView } from "./components/ScanView";
import { CoachView } from "./components/CoachView";
import { ChallengesView } from "./components/ChallengesView";
import { TimelineView } from "./components/TimelineView";
import { LibraryView } from "./components/LibraryView";
import { SettingsModal } from "./components/SettingsModal";
import { LevelUpModal } from "./components/LevelUpModal";
import { getLevelData } from "./utils/levelService";
import { 
  NotificationSettings, 
  loadNotificationSettings, 
  saveNotificationSettings, 
  sendQuestReminderNotification 
} from "./utils/notificationService";
import { generateTransformationPlan } from "./services/rulesEngine";
import { Sparkles } from "lucide-react";

export default function App() {
  // Locale State (defaults to 'en', can be toggled to 'ar')
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem("glow_locale");
    if (saved === "ar" || saved === "en") return saved;
    if (typeof navigator !== "undefined" && navigator.language?.startsWith("ar")) {
      return "ar";
    }
    return "en";
  });

  // Gender Track Gate ('male' | 'female' | null)
  const [genderTrack, setGenderTrack] = useState<GenderTrack | null>(() => {
    const saved = localStorage.getItem("auramax_gender_track");
    if (saved === "male" || saved === "female") return saved;
    return null;
  });

  // Landing Page Status
  const [hasCompletedLanding, setHasCompletedLanding] = useState<boolean>(() => {
    return localStorage.getItem("auramax_landing_seen") === "true";
  });

  // Active Navigation View ('home' | 'today' | 'scan' | 'progress' | 'profile' | 'coach' | 'challenges' | 'timeline' | 'library')
  const [activeTab, setActiveTab] = useState<NavTab>("home");

  // Modals & Flow States
  const [isPathModalOpen, setIsPathModalOpen] = useState(false);
  const [isPlanBuilderOpen, setIsPlanBuilderOpen] = useState(false);
  const [planBuilderScan, setPlanBuilderScan] = useState<ScanResult | null>(null);

  // Active Transformation Plan
  const [activePlan, setActivePlan] = useState<TransformationPlan | null>(() => {
    const saved = localStorage.getItem("auramax_active_plan");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });

  // Settings & Notifications Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => {
    return loadNotificationSettings();
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const track = localStorage.getItem("auramax_gender_track");
    const trackKey = track === "female" ? "glow_profile_female" : "glow_profile_male";
    const saved = localStorage.getItem(trackKey) || localStorage.getItem("glow_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return track === "female" ? INITIAL_FEMALE_USER : INITIAL_USER;
  });

  // Quests
  const [quests, setQuests] = useState<Quest[]>(() => {
    const track = localStorage.getItem("auramax_gender_track");
    const trackKey = track === "female" ? "glow_quests_female" : "glow_quests_male";
    const saved = localStorage.getItem(trackKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return track === "female" ? FEMALE_QUESTS : INITIAL_QUESTS;
  });

  // Scans Progression History
  const [scansHistory, setScansHistory] = useState<ScanResult[]>(() => {
    const track = localStorage.getItem("auramax_gender_track");
    const trackKey = track === "female" ? "glow_scans_female" : "glow_scans_male";
    const saved = localStorage.getItem(trackKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return track === "female" ? [INITIAL_FEMALE_SCAN] : [INITIAL_SCAN];
  });

  // Ephemeral toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Level-Up Celebration Animation Sequence State
  const [levelUpModalData, setLevelUpModalData] = useState<{
    isOpen: boolean;
    previousLevel: number;
    newLevel: number;
    totalXp: number;
  }>({
    isOpen: false,
    previousLevel: 7,
    newLevel: 7,
    totalXp: 3420,
  });

  const handleTriggerLevelUpPreview = () => {
    setLevelUpModalData({
      isOpen: true,
      previousLevel: Math.max(1, userProfile.level - 1),
      newLevel: userProfile.level,
      totalXp: userProfile.xp,
    });
  };

  // Sync RTL / LTR document attributes whenever locale changes
  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    localStorage.setItem("glow_locale", locale);
  }, [locale]);

  // Sync states to local storage
  useEffect(() => {
    localStorage.setItem("glow_profile", JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem("glow_quests", JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    localStorage.setItem("glow_scans", JSON.stringify(scansHistory));
  }, [scansHistory]);

  useEffect(() => {
    if (activePlan) {
      localStorage.setItem("auramax_active_plan", JSON.stringify(activePlan));
    }
  }, [activePlan]);

  // Periodic check for daily quest reminder notifications
  useEffect(() => {
    const checkNotification = () => {
      const currentSettings = loadNotificationSettings();
      setNotificationSettings(currentSettings);

      if (!currentSettings.enabled) return;

      const now = new Date();
      const todayStr = now.toISOString().slice(0, 10);
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeStr = `${String(currentHour).padStart(2, "0")}:${String(currentMinute).padStart(2, "0")}`;

      let targetTime = "09:00";
      if (currentSettings.timeSlot === "evening") targetTime = "20:00";
      if (currentSettings.timeSlot === "custom") targetTime = currentSettings.customTime;

      const pending = quests.filter((q) => !q.completed);
      if (pending.length === 0) return;

      if (currentTimeStr === targetTime && currentSettings.lastNotifiedDate !== todayStr) {
        sendQuestReminderNotification(quests, locale);
        const updated = { ...currentSettings, lastNotifiedDate: todayStr };
        saveNotificationSettings(updated);
        setNotificationSettings(updated);
      } else if (
        currentSettings.streakAlert &&
        currentHour === 22 &&
        currentMinute === 0 &&
        currentSettings.lastNotifiedDate !== `${todayStr}-streak`
      ) {
        sendQuestReminderNotification(quests, locale);
        const updated = { ...currentSettings, lastNotifiedDate: `${todayStr}-streak` };
        saveNotificationSettings(updated);
        setNotificationSettings(updated);
      }
    };

    checkNotification();
    const interval = setInterval(checkNotification, 30000);
    return () => clearInterval(interval);
  }, [quests, locale]);

  // Toast trigger helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Toggle Quest Completion
  const handleToggleQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const newStatus = !q.completed;
          if (newStatus) {
            setUserProfile((u) => {
              const newXp = u.xp + q.xp;
              const levelData = getLevelData(newXp);
              if (levelData.level > u.level) {
                setLevelUpModalData({
                  isOpen: true,
                  previousLevel: u.level,
                  newLevel: levelData.level,
                  totalXp: newXp,
                });
              }
              return {
                ...u,
                xp: newXp,
                level: levelData.level,
                nextLevelXp: levelData.nextLevelXp,
              };
            });
            showToast(
              translations[locale].quests.questCompletedToast.replace(
                "{xp}",
                String(q.xp)
              )
            );
          }
          return { ...q, completed: newStatus };
        }
        return q;
      })
    );
  };

  // Add Custom Quest
  const handleAddQuest = (newQuestData: Omit<Quest, "id" | "completed">) => {
    const newQuest: Quest = {
      ...newQuestData,
      id: `quest-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      completed: false,
    };
    setQuests((prev) => [newQuest, ...prev]);
    showToast(locale === "ar" ? "تمت إضافة البروتوكول بنجاح!" : "Protocol added successfully!");
  };

  // Add Complete Protocol Stack from Biometric Scan
  const handleAddProtocolToQuests = (morning: string[], evening: string[]) => {
    const newQuests: Quest[] = [
      ...morning.map((m, idx) => ({
        id: `proto-m-${Date.now()}-${idx}`,
        title: { en: m, ar: m },
        category: "morning" as const,
        xp: 50,
        completed: false,
        frequency: "daily" as const,
        description: { 
          en: "Personalized morning ritual from Aura Max biometric scan.", 
          ar: "روتين صباحي مخصص من فحص أورا ماكس البيومتري." 
        },
        iconName: "sun",
      })),
      ...evening.map((e, idx) => ({
        id: `proto-e-${Date.now()}-${idx}`,
        title: { en: e, ar: e },
        category: "evening" as const,
        xp: 50,
        completed: false,
        frequency: "daily" as const,
        description: { 
          en: "Personalized evening ritual from Aura Max biometric scan.", 
          ar: "روتين مسائي مخصص من فحص أورا ماكس البيومتري." 
        },
        iconName: "moon",
      })),
    ];
    setQuests((prev) => [...newQuests, ...prev]);
    showToast(translations[locale].scan.addedToRoutine);
  };

  // Save Scan to Timeline
  const handleSaveScan = (scan: ScanResult) => {
    setScansHistory((prev) => [scan, ...prev]);
    setUserProfile((u) => {
      const newXp = u.xp + 150;
      const levelData = getLevelData(newXp);
      if (levelData.level > u.level) {
        setLevelUpModalData({
          isOpen: true,
          previousLevel: u.level,
          newLevel: levelData.level,
          totalXp: newXp,
        });
      }
      return {
        ...u,
        glowScore: scan.overallScore,
        scansCount: u.scansCount + 1,
        xp: newXp,
        level: levelData.level,
        nextLevelXp: levelData.nextLevelXp,
      };
    });
    showToast(translations[locale].scan.scanSaved);
  };

  // Handle Gender Track Switch
  const handleGenderChange = (track: GenderTrack) => {
    setGenderTrack(track);
    localStorage.setItem("auramax_gender_track", track);
    localStorage.setItem("auramax_landing_seen", "true");
    setHasCompletedLanding(true);
    setIsPathModalOpen(false);

    if (track === "female") {
      setQuests(FEMALE_QUESTS);
      showToast(locale === "ar" ? "تم التحويل إلى مسار أورا فيم (Aura Fem)" : "Switched to Aura Fem Track");
    } else {
      setQuests(INITIAL_QUESTS);
      showToast(locale === "ar" ? "تم التحويل إلى مسار أورا ماكس (Aura Max)" : "Switched to Aura Max Track");
    }
  };

  // Plan Builder trigger from ScanView
  const handleOpenPlanBuilder = (scan: ScanResult) => {
    setPlanBuilderScan(scan);
    setIsPlanBuilderOpen(true);
  };

  // Plan creation completion
  const handlePlanCreated = (plan: TransformationPlan) => {
    setActivePlan(plan);
    setIsPlanBuilderOpen(false);

    // Merge plan daily quests into user's quests
    const combinedNewQuests = [
      ...plan.dailyMorningQuests,
      ...plan.dailyEveningQuests,
      ...plan.weeklyQuests,
    ];
    setQuests(combinedNewQuests);

    showToast(locale === "ar" ? "تم اعتماد خطتك الشخصية بنجاح! جاهز لليوم الأول." : "Your transformation plan is active! Ready for Day 1.");
    setActiveTab("today");
  };

  // Clear all data & reset to landing
  const handleClearAllData = () => {
    localStorage.clear();
    setGenderTrack(null);
    setHasCompletedLanding(false);
    setActivePlan(null);
    setUserProfile(INITIAL_USER);
    setQuests(INITIAL_QUESTS);
    setScansHistory([INITIAL_SCAN]);
    setActiveTab("home");
    showToast(locale === "ar" ? "تم مسح كافة البيانات محلياً بنجاح." : "All local data has been reset.");
  };

  const pendingQuests = quests.filter((q) => !q.completed).length;

  // 1. Initial Landing Page Gate if user has not yet completed landing or chosen track
  if (!hasCompletedLanding && !genderTrack) {
    return (
      <>
        <LandingPage
          locale={locale}
          onSetLocale={setLocale}
          onStartFree={() => setIsPathModalOpen(true)}
          onSelectPathDirectly={(track) => handleGenderChange(track)}
        />
        <PathSelectionModal
          isOpen={isPathModalOpen}
          onClose={() => setIsPathModalOpen(false)}
          locale={locale}
          onSelectTrack={handleGenderChange}
        />
      </>
    );
  }

  const effectiveGenderTrack = genderTrack || "male";

  return (
    <div 
      className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col selection:bg-[#22d3ee]/25 selection:text-[#22d3ee] relative overflow-x-hidden"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Background Ambient Dark Luxury Lighting */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] max-w-[100vw] h-[400px] bg-gradient-to-b from-[#6366f1]/10 via-[#22d3ee]/6 to-transparent blur-[140px] pointer-events-none -z-10" 
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div 
          role="status"
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#18181b]/95 border border-[#22d3ee]/40 shadow-xl backdrop-blur-xl flex items-center gap-2.5 text-xs font-semibold text-[#22d3ee] animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <Sparkles className="w-4 h-4 shrink-0 animate-spin text-[#22d3ee]" />
          <span className="text-[#f4f4f5] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Application Header */}
      <Header
        locale={locale}
        setLocale={setLocale}
        genderTrack={effectiveGenderTrack}
        onChangeGenderTrack={handleGenderChange}
        streakDays={userProfile.streakDays}
        level={userProfile.level}
        xp={userProfile.xp}
        nextLevelXp={userProfile.nextLevelXp}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickScan={() => {
          setIsPlanBuilderOpen(false);
          setActiveTab("scan");
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLevelClick={handleTriggerLevelUpPreview}
        notificationsEnabled={notificationSettings.enabled}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-24 md:pb-12 pt-2">
        {isPlanBuilderOpen ? (
          <PlanBuilderView
            locale={locale}
            genderTrack={effectiveGenderTrack}
            scanResult={planBuilderScan}
            onPlanCreated={handlePlanCreated}
            onCancel={() => setIsPlanBuilderOpen(false)}
          />
        ) : (
          <>
            {activeTab === "home" && (
              <HomeView
                locale={locale}
                genderTrack={effectiveGenderTrack}
                userProfile={userProfile}
                activePlan={activePlan}
                todayQuests={quests}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onOpenCoach={() => setActiveTab("coach")}
                onOpenLibrary={() => setActiveTab("library")}
                onOpenChallenges={() => setActiveTab("challenges")}
                onInitiateScan={() => setActiveTab("scan")}
              />
            )}

            {activeTab === "today" && (
              <TodayView
                locale={locale}
                genderTrack={effectiveGenderTrack}
                userProfile={userProfile}
                quests={quests}
                onToggleQuest={handleToggleQuest}
                onQuickAddCustomQuest={(title, cat) => handleAddQuest({
                  title: { en: title, ar: title },
                  category: "anytime",
                  xp: 25,
                  frequency: "daily",
                  description: { en: "Personal routine habit.", ar: "عادة من الروتين الشخصي." },
                  iconName: "check"
                })}
                onShowToast={showToast}
              />
            )}

            {activeTab === "scan" && (
              <ScanView
                locale={locale}
                genderTrack={effectiveGenderTrack}
                onSaveScan={handleSaveScan}
                onViewTimeline={() => setActiveTab("timeline")}
                onAddProtocolToQuests={handleAddProtocolToQuests}
                onBuildPlan={handleOpenPlanBuilder}
                userProfile={userProfile}
              />
            )}

            {activeTab === "progress" && (
              <ProgressView
                locale={locale}
                genderTrack={effectiveGenderTrack}
                userProfile={userProfile}
                scansHistory={scansHistory}
                activePlan={activePlan}
                onInitiateScan={() => setActiveTab("scan")}
                onAdjustPlan={() => {
                  setPlanBuilderScan(scansHistory[0] || null);
                  setIsPlanBuilderOpen(true);
                }}
              />
            )}

            {activeTab === "profile" && (
              <ProfileView
                locale={locale}
                setLocale={setLocale}
                genderTrack={effectiveGenderTrack}
                onChangeGenderTrack={handleGenderChange}
                userProfile={userProfile}
                onUpdateProfile={(updated) => {
                  setUserProfile((prev) => ({ ...prev, ...updated }));
                }}
                onResetAllData={handleClearAllData}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onShowToast={showToast}
              />
            )}

            {activeTab === "coach" && (
              <CoachView
                locale={locale}
                genderTrack={effectiveGenderTrack}
                userProfile={userProfile}
                activePlan={activePlan}
                todayQuests={quests}
                onAddSuggestedQuest={(title) => handleAddQuest({
                  title: { en: title, ar: title },
                  category: "anytime",
                  xp: 25,
                  frequency: "daily",
                  description: { en: "Coach suggested routine habit.", ar: "عادة مقترحة من المدرب الذكي." },
                  iconName: "check"
                })}
              />
            )}

            {activeTab === "challenges" && (
              <ChallengesView
                locale={locale}
                genderTrack={effectiveGenderTrack}
                onJoinChallenge={(id) => {
                  showToast(locale === "ar" ? "تم الانضمام إلى سبرنت العادات بنجاح!" : "Joined habit sprint successfully!");
                }}
              />
            )}

            {activeTab === "timeline" && (
              <TimelineView
                locale={locale}
                genderTrack={effectiveGenderTrack}
                userProfile={userProfile}
                scansHistory={scansHistory}
                onInitiateScan={() => setActiveTab("scan")}
              />
            )}

            {activeTab === "library" && (
              <LibraryView
                locale={locale}
                genderTrack={effectiveGenderTrack}
                onAddGuideToQuests={(guideTitle) => {
                  handleAddQuest({
                    title: { en: guideTitle, ar: guideTitle },
                    category: "anytime",
                    xp: 35,
                    frequency: "daily",
                    description: { en: "Added from Aura Max knowledge library.", ar: "مضافة من مكتبة أورا ماكس المعرفية." },
                    iconName: "book"
                  });
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Settings & Daily Notifications Preferences Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
          setNotificationSettings(loadNotificationSettings());
        }}
        locale={locale}
        quests={quests}
        onShowToast={showToast}
      />

      {/* Level-Up Celebration Modal */}
      <LevelUpModal
        isOpen={levelUpModalData.isOpen}
        onClose={() => setLevelUpModalData((prev) => ({ ...prev, isOpen: false }))}
        locale={locale}
        previousLevel={levelUpModalData.previousLevel}
        newLevel={levelUpModalData.newLevel}
        totalXp={levelUpModalData.totalXp}
      />

      {/* Bottom Navigation for Mobile Devices */}
      <BottomNav
        locale={locale}
        genderTrack={effectiveGenderTrack}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setIsPlanBuilderOpen(false);
          setActiveTab(tab);
        }}
        pendingQuestsCount={pendingQuests}
      />

      {/* Path Selection Modal */}
      <PathSelectionModal
        isOpen={isPathModalOpen}
        onClose={() => setIsPathModalOpen(false)}
        locale={locale}
        onSelectTrack={handleGenderChange}
      />
    </div>
  );
}
