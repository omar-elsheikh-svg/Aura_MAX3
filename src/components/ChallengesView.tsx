import React, { useState, useEffect } from "react";
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Check, 
  Clock, 
  Target,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { Locale, Challenge, GenderTrack } from "../types";
import { translations } from "../i18n/translations";
import { CHALLENGES } from "../data/initialData";
import { FEMALE_CHALLENGES } from "../data/femaleBeautyData";

interface ChallengesViewProps {
  locale: Locale;
  genderTrack?: GenderTrack;
  onJoinChallenge?: (challengeId: string) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  locale,
  genderTrack = "male",
  onJoinChallenge,
}) => {
  const t = translations[locale];
  const isRtl = locale === "ar";
  const isFemale = genderTrack === "female";

  const [challengesList, setChallengesList] = useState<Challenge[]>(
    isFemale ? FEMALE_CHALLENGES : CHALLENGES
  );

  useEffect(() => {
    setChallengesList(isFemale ? FEMALE_CHALLENGES : CHALLENGES);
  }, [genderTrack]);

  const toggleJoin = (id: string) => {
    setChallengesList((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nowJoined = !c.joined;
          return {
            ...c,
            joined: nowJoined,
            currentDay: nowJoined ? 1 : 0,
          };
        }
        return c;
      })
    );
    if (onJoinChallenge) {
      onJoinChallenge(id);
    }
  };

  return (
    <div 
      className="max-w-6xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111318] border border-[#252A33] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B5CF6] uppercase tracking-wider mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>{isRtl ? "سبرنتات العادات السلوكية" : "Consistency Sprints"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] font-display">
            {isRtl ? "تحديات الاستمرارية وحماية السلسلة" : "Habit Formation & Streak Challenges"}
          </h1>
          <p className="text-xs sm:text-sm text-[#A5AEBC] mt-0.5">
            {isRtl 
              ? "تحديات شخصية مركزة تركز على بناء العادات وتطبيق البروتوكولات المثبتة علمياً." 
              : "Focused execution sprints to lock in morning and evening protocols without cognitive friction."}
          </p>
        </div>
      </div>

      {/* Sprints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {challengesList.map((ch) => (
          <div
            key={ch.id}
            className={`bg-[#111318] rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between space-y-5 ${
              ch.joined ? "border-[#42E8FF]/40 shadow-lg shadow-[#42E8FF]/5" : "border-[#252A33] hover:border-[#42E8FF]/30"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#171A21] border border-[#252A33] text-[10px] font-bold uppercase text-[#42E8FF]">
                  {ch.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[#A5AEBC]">
                  <Clock className="w-3.5 h-3.5 text-[#42E8FF]" />
                  <span>{ch.durationDays} {isRtl ? "يوماً" : "Days"}</span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-[#F4F7FA] font-display">
                {ch.title[locale]}
              </h2>

              <p className="text-xs text-[#A5AEBC] leading-relaxed">
                {ch.description[locale]}
              </p>

              {/* Progress if joined */}
              {ch.joined && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs text-[#A5AEBC]">
                    <span>{isRtl ? "اليوم الحالي" : "Current Progress"}</span>
                    <span className="font-bold text-[#42E8FF]">
                      {ch.currentDay} / {ch.durationDays} {isRtl ? "يوم" : "Days"}
                    </span>
                  </div>
                  <div className="w-full bg-[#171A21] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#42E8FF]"
                      style={{ width: `${Math.min(100, (ch.currentDay / ch.durationDays) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom: XP Reward & Join CTA */}
            <div className="pt-4 border-t border-[#252A33] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B5CF6]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+{ch.rewardXp} XP</span>
              </div>

              <button
                onClick={() => toggleJoin(ch.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  ch.joined
                    ? "bg-[#171A21] text-[#10B981] border border-[#10B981]/30 hover:bg-[#1E232E]"
                    : "bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] shadow-xs"
                }`}
              >
                {ch.joined ? (isRtl ? "مشترك في السبرنت ✓" : "Active Sprint ✓") : (isRtl ? "انضمام للتحدي" : "Join Sprint")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
