import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Flame, 
  Target, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  BookOpen
} from "lucide-react";
import { Locale, GenderTrack, UserProfile, TransformationPlan, Quest } from "../types";
import { translations } from "../i18n/translations";

interface CoachViewProps {
  locale: Locale;
  genderTrack?: GenderTrack;
  userProfile: UserProfile;
  activePlan?: TransformationPlan | null;
  todayQuests?: Quest[];
  onAddSuggestedQuest?: (title: string) => void;
}

interface CoachMessage {
  id: string;
  sender: "user" | "coach";
  directAnswer: string;
  why?: string;
  nextAction?: string;
  rawText?: string;
}

export const CoachView: React.FC<CoachViewProps> = ({
  locale,
  genderTrack = "male",
  userProfile,
  activePlan,
  todayQuests = [],
  onAddSuggestedQuest,
}) => {
  const t = translations[locale];
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const isFemale = genderTrack === "female";

  const initialCoachMessage: CoachMessage = {
    id: "m0",
    sender: "coach",
    directAnswer: isRtl
      ? `أهلاً بك يا ${userProfile.name || "صديقي"}. أنا مدربك الشخصي في أورا، مطلع على خطتك الحالية (${activePlan?.primaryGoal || "نحت الملامح"}) ومهامك لليوم.`
      : `Welcome back, ${userProfile.name || "friend"}. I'm your dedicated Aura transformation coach, grounded in your active ${activePlan?.primaryGoal || "sculpting"} plan and today's quests.`,
    why: isRtl
      ? "إجاباتي تعتمد على قواعد بيومترية وعادات مثبتة بدلاً من النصائح العامة."
      : "My guidance is structured around deterministic biometrics and sustainable habit adherence.",
    nextAction: isRtl
      ? "اختر أحد الأسئلة السريعة أدناه أو اسألني عن أي تفصيل في روتينك."
      : "Select one of the contextual prompts below or ask anything about your routine.",
  };

  const [messages, setMessages] = useState<CoachMessage[]>([initialCoachMessage]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    {
      q: isRtl ? "لماذا يبدو فكي منتفخاً اليوم؟" : "Why is my jawline puffy today?",
      answer: isRtl 
        ? "انتفاخ الوجه الصباحي سببه احتباس السوائل اللمفاوية الناتج عن الصوديوم المرتفع أو النوم بوضعية غير مستقيمة." 
        : "Morning facial puffiness is primarily interstitial lymphatic pooling caused by high sodium intake, late meals, or flat sleeping angles.",
      why: isRtl 
        ? "الأوعية اللمفاوية في الوجه والرقبة تفتقر إلى مضخة ذاتية وتحتاج إلى حركة خارجية لتصريف السوائل." 
        : "Facial lymphatic vessels lack active muscular pumps and require manual gravity and stimulation to drain.",
      nextAction: isRtl 
        ? "اغسل وجهك بماء بارد ونفذ تدليك التصريف اللمفاوي الصباحي لمدة دقيقتين." 
        : "Splash face with cold water and perform a 2-minute downward lymphatic drainage massage along the neck."
    },
    {
      q: isRtl ? "ما هي قصة الشعر المثالية لشكل وجهي؟" : "What haircut works best for my face?",
      answer: isRtl 
        ? "بناءً على شكل وجهك الهندسي، القصات التي تحافظ على كثافة علوية مع تدريج جانبي منخفض هي الأنسب لإبراز زوايا الفك." 
        : "Given your geometric proportions, styles maintaining textured crown volume with tapered or faded sides best complement your jawline.",
      why: isRtl 
        ? "الكثافة في أعلى الرأس تعطي استطالة وهمية توازن عرض الفك والخدين." 
        : "Crown height vertically elongates facial thirds, framing the cheekbones and balancing width.",
      nextAction: isRtl 
        ? "اطلع على قسم قصات الشعر في صفحة الفحص لاختيار القصة الدقيقة." 
        : "Check the Tailored Haircuts section in your Scan view for millimeter trimmer specifications."
    },
    {
      q: isRtl ? "هل يمكنني تخطي الروتين المسائي إذا كنت متعباً؟" : "Can I skip my evening routine if I'm exhausted?",
      answer: isRtl 
        ? "لا تتخطاه بالكامل! قم بتنفيذ 'النسخة المصغرة' (Micro Stack): غسول سريع وترطيب في دقيقة واحدة." 
        : "Do not skip entirely! Execute the 1-minute Micro Stack: cold splash and a quick layer of ceramide moisturizer.",
      why: isRtl 
        ? "الحفاظ على استمرارية العادة حتى لو بنسبة 10% يحمي مسارك العصبي وسلسلة انضباطك من الانهيار." 
        : "Maintaining habit continuity at even 10% volume preserves neurological momentum and prevents streak relapse.",
      nextAction: isRtl 
        ? "أكمل خطوة واحدة فقط وسنعدل الخطة تلقائياً لتخفيف العبء." 
        : "Check off just one quick step on Today's view to protect your streak."
    },
    {
      q: isRtl ? "كيف أحسن التزامي واستمراريتي؟" : "How do I improve my consistency?",
      answer: isRtl 
        ? "اربط كل مهمة جديدة بعادة يومية ثابتة موجودة مسبقاً (Habit Stacking)، مثل تنظيف الأسنان أو قهوة الصباح." 
        : "Employ Habit Stacking: attach each transformation quest directly to an existing anchor habit (e.g., brushing teeth or morning coffee).",
      why: isRtl 
        ? "تقليل الاحتكاك الذهني يحول الإجراء إلى تصرف تلقائي لا يتطلب قوة إرادة متجددة." 
        : "Removing cognitive friction converts conscious discipline into subconscious automaticity.",
      nextAction: isRtl 
        ? "انضم إلى سبرنت الالتزام (7 أيام) في قسم التحديات لتثبيت العادة." 
        : "Join the 7-Day Consistency Sprint in Challenges to lock in your morning anchor."
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendPrompt = (promptText: string, directAnswer?: string, why?: string, nextAction?: string) => {
    const userMsg: CoachMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      directAnswer: promptText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let coachReply: CoachMessage;
      if (directAnswer && why && nextAction) {
        coachReply = {
          id: `c-${Date.now()}`,
          sender: "coach",
          directAnswer,
          why,
          nextAction,
        };
      } else {
        // Fallback contextual response structured as Direct Answer -> Why -> Next Action
        coachReply = {
          id: `c-${Date.now()}`,
          sender: "coach",
          directAnswer: isRtl
            ? `بناءً على خطتك الحالية (${activePlan?.primaryGoal || "التحول الشامل"})، التركيز على الخطوات الأساسية المباشرة هو مفتاح التطور.`
            : `Based on your active plan (${activePlan?.primaryGoal || "holistic grooming"}), targeted daily repetition yields measurable compounding results.`,
          why: isRtl
            ? "الأنسجة والجلد يستجيبان للتكرار اليومي البسيط أكثر بكثير من الجهد المتقطع العنيف."
            : "Dermal barrier integrity and submental muscle tone respond to gentle daily frequency over sporadic intensity.",
          nextAction: isRtl
            ? "تأكد من إنجاز مهمتك الصباحية والمسائية اليوم في صفحة اليوم."
            : "Complete today's protocol quests to keep your transformation compounding.",
        };
      }
      setMessages((prev) => [...prev, coachReply]);
      setIsTyping(false);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const q = inputText.trim();
    setInputText("");
    handleSendPrompt(q);
  };

  return (
    <div 
      className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. Contextual Header: Grounded in User Plan */}
      <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-bold text-[#F4F7FA]">
                {isRtl ? "المدرب الذكي للتحول" : "Contextual Transformation Coach"}
              </h1>
              <div className="text-[11px] text-[#A5AEBC]">
                {isRtl ? "متصل مباشرة بخطتك وقياسات فحصك" : "Grounded in your active plan and biometrics"}
              </div>
            </div>
          </div>

          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#171A21] border border-[#252A33] text-[#8B5CF6] font-bold uppercase">
            Active Plan Context
          </span>
        </div>

        {/* Plan context pill bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#252A33] text-xs text-[#A5AEBC]">
          <span className="flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-[#42E8FF]" />
            <strong className="text-[#F4F7FA]">{isRtl ? "الهدف:" : "Goal:"}</strong> {activePlan?.primaryGoal || "Face Structure"}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#42E8FF]" />
            <strong className="text-[#F4F7FA]">{isRtl ? "الوقت:" : "Time:"}</strong> {activePlan?.timeBudget || "15m/day"}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#42E8FF]" />
            <strong className="text-[#F4F7FA]">{isRtl ? "الالتزام:" : "Streak:"}</strong> {userProfile.streakDays}d
          </span>
        </div>
      </div>

      {/* 2. Structured Chat History */}
      <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((m) => {
          if (m.sender === "user") {
            return (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-md p-3.5 rounded-2xl bg-[#42E8FF] text-[#08090C] text-xs font-semibold shadow-xs">
                  {m.directAnswer}
                </div>
              </div>
            );
          }

          // Structured Coach Response: Direct Answer -> Why -> Next Action
          return (
            <div key={m.id} className="flex justify-start">
              <div className="max-w-xl p-5 rounded-2xl bg-[#171A21] border border-[#252A33] space-y-3 text-xs">
                {/* 1. Direct Answer */}
                <div>
                  <div className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider mb-1">
                    {isRtl ? "الإجابة المباشرة" : "Direct Answer"}
                  </div>
                  <p className="text-[#F4F7FA] font-medium leading-relaxed">
                    {m.directAnswer}
                  </p>
                </div>

                {/* 2. Why (Rationale) */}
                {m.why && (
                  <div className="pt-2 border-t border-[#252A33]/60">
                    <div className="text-[10px] font-bold text-[#A5AEBC] uppercase tracking-wider mb-1">
                      {isRtl ? "السبب العلمي والتأثير" : "Why this matters"}
                    </div>
                    <p className="text-[#A5AEBC] leading-relaxed">
                      {m.why}
                    </p>
                  </div>
                )}

                {/* 3. Next Action */}
                {m.nextAction && (
                  <div className="p-3 rounded-xl bg-[#111318] border border-[#42E8FF]/20 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#42E8FF] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-bold text-[#42E8FF] uppercase tracking-wider">
                        {isRtl ? "الخطوة المقترحة التالية" : "Next Recommended Action"}
                      </div>
                      <div className="text-[#F4F7FA] text-xs mt-0.5 font-medium">
                        {m.nextAction}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="p-3.5 rounded-2xl bg-[#171A21] border border-[#252A33] text-xs text-[#A5AEBC] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span>{isRtl ? "جاري صياغة التوصية..." : "Formulating structured recommendation..."}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Quick Prompt Chips (Section 21) */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#A5AEBC] block">
          {isRtl ? "أسئلة شائعة مرتبطة ببروتوكولك:" : "Contextual quick prompts:"}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(p.q, p.answer, p.why, p.nextAction)}
              className="p-3 rounded-xl bg-[#111318] hover:bg-[#171A21] border border-[#252A33] hover:border-[#8B5CF6]/50 text-start text-xs text-[#F4F7FA] transition-colors cursor-pointer flex items-center justify-between gap-2"
            >
              <span>{p.q}</span>
              <ArrowIcon className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* 4. Chat Input Form */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isRtl ? "اسأل المدرب عن أي تفصيل في خطتك أو ملامحك..." : "Ask your coach anything about your plan or routine..."}
          className="flex-1 px-4 py-3 rounded-xl bg-[#111318] border border-[#252A33] text-xs text-[#F4F7FA] focus:outline-none focus:border-[#8B5CF6]"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Send className="w-4 h-4 rtl:rotate-180" />
          <span className="hidden sm:inline">{isRtl ? "إرسال" : "Send"}</span>
        </button>
      </form>
    </div>
  );
};
