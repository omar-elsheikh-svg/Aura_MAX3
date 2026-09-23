import React from "react";
import { Home, CheckSquare, Camera, TrendingUp, User } from "lucide-react";
import { Locale, NavTab, GenderTrack } from "../types";

interface BottomNavProps {
  locale: Locale;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  pendingQuestsCount?: number;
  genderTrack?: GenderTrack;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  locale,
  activeTab,
  setActiveTab,
  pendingQuestsCount = 0,
}) => {
  const isRtl = locale === "ar";

  const tabs: { id: NavTab; label: string; icon: React.ReactNode; badge?: number; isCenter?: boolean }[] = [
    {
      id: "home",
      label: isRtl ? "الرئيسية" : "Home",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "today",
      label: isRtl ? "اليوم" : "Today",
      icon: <CheckSquare className="w-5 h-5" />,
      badge: pendingQuestsCount > 0 ? pendingQuestsCount : undefined,
    },
    {
      id: "scan",
      label: isRtl ? "الفحص" : "Scan",
      icon: <Camera className="w-5 h-5" />,
      isCenter: true,
    },
    {
      id: "progress",
      label: isRtl ? "التقدم" : "Progress",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: "profile",
      label: isRtl ? "حسابي" : "Profile",
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#08090C]/95 backdrop-blur-xl border-t border-[#252A33] px-2 py-1 safe-area-bottom"
    >
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex flex-col items-center justify-center -top-2.5 cursor-pointer group min-h-[48px]"
                aria-label={tab.label}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-md ${
                  isActive
                    ? "bg-[#42E8FF] text-[#08090C] shadow-[0_0_18px_rgba(66,232,255,0.3)]"
                    : "bg-[#111318] border border-[#42E8FF]/60 text-[#42E8FF] hover:bg-[#171A21]"
                }`}>
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5 font-semibold text-[#F4F7FA]">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-colors cursor-pointer ${
                isActive
                  ? "text-[#42E8FF] font-semibold"
                  : "text-[#A5AEBC] hover:text-[#F4F7FA]"
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge && !isActive && (
                  <span className="absolute -top-1 -end-2 w-4 h-4 rounded-full bg-[#8B5CF6] text-white text-[9px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium truncate max-w-full leading-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
