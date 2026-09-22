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
      className="max-w-4xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Header & Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs font-bold tracking-wider uppercase">
          <Trophy className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>{isRtl ? "سبرنتات العادات السلوكية" : "Behavioral Sprints"}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F4F7FA] tracking-tight font-display">
          {isRtl ? "تحديات الانضباط والاستمرارية" : "Consistency & Habit Challenges"}
        </h1>
        <p className="text-sm text-[#A5AEBC] leading-relaxed">
          {isRtl 
            ? "تحديات شخصية مركزة تركز على بناء العادات، حماية سلسلة الاستمرارية، وتطبيق البروتوكولات المثبتة دون منافسات سطحية." 
            : "Personal execution sprints focused on habit formation, streak protection, and proven protocols."}
        </p>
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
                <span className="px-2.5 py-0.5 rounded-full bg-[#08090C] border border-[#252A33] text-[10px] font-bold uppercase text-[#42E8FF]">
                  {ch.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[#A5AEBC]">
                  <Clock className="w-3.5 h-3.5 text-[#42E8FF]" />
                  <span>{ch.durationDays} {isRtl ? "يوماً" : "Days"}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#F4F7FA] font-display">
                  {ch.title[locale]}
                </h3>
                <p className="text-xs text-[#A5AEBC] mt-1.5 leading-relaxed">
                  {ch.description[locale]}
                </p>
              </div>

              {/* Progress bar if joined */}
              {ch.joined && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-[#42E8FF] font-semibold font-mono">
                    <span>
                      {isRtl 
                        ? `اليوم ${ch.currentDay} من ${ch.durationDays}` 
                        : `Day ${ch.currentDay} of ${ch.durationDays}`}
                    </span>
                    <span>{Math.round((ch.currentDay / ch.durationDays) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#08090C] rounded-full overflow-hidden border border-[#252A33]">
                    <div
                      className="h-full bg-gradient-to-r from-[#42E8FF] to-[#38bdf8] transition-all duration-500 rounded-full"
                      style={{ width: `${(ch.currentDay / ch.durationDays) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#252A33] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                <Award className="w-4 h-4" />
                <span>+{ch.rewardXp} XP</span>
              </div>

              <button
                onClick={() => toggleJoin(ch.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  ch.joined
                    ? "bg-[#171A21] text-[#42E8FF] border border-[#42E8FF]/30 hover:bg-[#252A33]"
                    : "bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] shadow-md shadow-[#42E8FF]/20"
                }`}
              >
                {ch.joined ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#42E8FF]" />
                    <span>{isRtl ? "مشارك (نشط)" : "Active Sprint"}</span>
                  </>
                ) : (
                  <span>{isRtl ? "بدء التحدي" : "Start Sprint"}</span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
