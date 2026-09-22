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
  genderTrack = "male",
}) => {
  const isRtl = locale === "ar";
  const isFemale = genderTrack === "female";

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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#08090C]/95 backdrop-blur-xl border-t border-[#1E232E] px-2 py-1.5 safe-area-bottom"
    >
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex flex-col items-center justify-center -top-3 cursor-pointer group"
                aria-label={tab.label}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                  isActive
                    ? "bg-[#42E8FF] text-[#08090C] shadow-[0_0_20px_rgba(66,232,255,0.4)]"
                    : "bg-[#111318] border-2 border-[#42E8FF] text-[#42E8FF] hover:bg-[#42E8FF]/20"
                }`}>
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-1 font-bold text-[#F4F7FA]">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center min-h-[48px] py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? "text-[#42E8FF] bg-[#42E8FF]/10 font-bold"
                  : "text-[#A5AEBC] hover:text-[#F4F7FA]"
              }`}
            >
              {tab.icon}
              <span className="text-[10px] mt-1 font-medium truncate max-w-full leading-tight">
                {tab.label}
              </span>
              {tab.badge && !isActive && (
                <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-[#8B5CF6] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute -bottom-1 w-4 h-0.5 rounded-full bg-[#42E8FF] shadow-[0_0_6px_#42E8FF]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
