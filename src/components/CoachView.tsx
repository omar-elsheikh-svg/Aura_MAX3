import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldAlert,
  ArrowRight,
  HelpCircle
} from "lucide-react";
import { Locale, CoachMessage, GenderTrack } from "../types";
import { translations } from "../i18n/translations";

interface CoachViewProps {
  locale: Locale;
  genderTrack?: GenderTrack;
  glowScore: number;
  streakDays: number;
}

export const CoachView: React.FC<CoachViewProps> = ({
  locale,
  genderTrack = "male",
  glowScore,
  streakDays,
}) => {
  const t = translations[locale];
  const isRtl = locale === "ar";
  const isFemale = genderTrack === "female";

  const getWelcomeMessage = (): string => {
    if (isFemale) {
      return isRtl
        ? "أهلاً بكِ في Aura Fem! أنا مدربتكِ الذكية في علوم التناسق الجمالي الأنثوي والـ Looksmaxing. أساعدكِ في الحصول على بشرة زجاجية كورية (Glass Skin)، نحت الوجنتين بحجر الغوا شا، رفع سحبة العينين (Canthal Tilt)، وتصميم الحواجب والاستقامة الملكية (Swan Neck).\n\nما هو هدفكِ الجمالي اليوم؟"
        : "Welcome to Aura Fem! I am your AI Aesthetic Harmony & Looksmaxing Coach. I specialize in Korean glass skin protocols, zygomatic cheek sculpting, positive canthal tilt lift, eyebrow framing, and feminine poise & posture.\n\nWhat beauty or self-improvement goal shall we focus on today?";
    }
    return isRtl
      ? "أهلاً بك! أنا مدربك الشخصي في Glow. أساعدك في تطوير بنية الفك، تحسين صحة البشرة، طرد السوائل الزائدة (Debloating)، واختيار تسريحات الشعر المتناسقة مع ملامحك وفق أحدث العلوم الجمالية الطبيعية.\n\nبماذا نود البدء اليوم؟"
      : "Welcome! I am your personal AI Glow Coach. I specialize in non-invasive looksmaxing, mandibular jawline definition, dermal health stacks, debloating protocols, and facial harmony science.\n\nWhat aesthetic goal or question are we tackling today?";
  };

  const initialMessages: CoachMessage[] = [
    {
      id: "msg-welcome",
      role: "assistant",
      content: getWelcomeMessage(),
      timestamp: isRtl ? "الآن" : "Just now",
      source: "gemini",
    }
  ];

  const [messages, setMessages] = useState<CoachMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Reset messages if genderTrack switches
  useEffect(() => {
    setMessages([
      {
        id: `msg-welcome-${genderTrack}`,
        role: "assistant",
        content: getWelcomeMessage(),
        timestamp: isRtl ? "الآن" : "Just now",
        source: "gemini",
      }
    ]);
  }, [genderTrack]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts = isFemale ? [
    isRtl ? "روتين البشرة الزجاجية الكورية وترميم الحاجز" : "Glass skin routine & ceramide barrier",
    isRtl ? "تدليك الغوا شا لنحت الوجنتين ورفع الخدود" : "Gua Sha technique to sculpt cheekbones",
    isRtl ? "رسمة الحواجب لرفع زاوية العين (Canthal Tilt)" : "Eyebrow styling to lift canthal tilt",
    isRtl ? "طرد احتباس السوائل وتصريف انتفاخ الوجه" : "Rapid facial debloating & lymph drainage",
    isRtl ? "تمرين الرقبة الملكية (Swan Neck) والترقوة" : "Swan neck & collarbone posture drills",
  ] : [
    t.coach.q1,
    t.coach.q2,
    t.coach.q3,
    t.coach.q4,
    t.coach.q5,
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || loading) return;

    const userMessage: CoachMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: isRtl ? "الآن" : "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue("");
    setLoading(true);

    try {
      const historyPayload = messages.slice(-5).map((m) => ({
        role: m.role,
        text: m.content,
      }));

      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          locale,
          genderTrack,
          profileContext: {
            glowScore,
            streak: streakDays,
            genderTrack,
            focus: isFemale ? "Glass Skin, Facial Sculpt & Canthal Tilt" : "Jawline, Skin & Debloating",
          },
        }),
      });

      let replyText = "";
      let source: "gemini" | "knowledge-base" | "fallback" = "gemini";

      if (response.ok) {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await response.json();
          replyText = data?.reply || "";
          source = data?.source || "gemini";
        } else {
          const text = await response.text();
          console.warn("Non-JSON response from /api/coach:", text.slice(0, 100));
        }
      }

      if (!replyText) {
        if (isFemale) {
          replyText = isRtl
            ? "أهلاً بكِ! لتحقيق أقصى تناسق أنثوي وإشراقة زجاجية:\n1. طبّقي تدليك الغوا شا الصباحي 3 دقائق بحركات للأعلى نحو الصدغين لنحت الوجنتين.\n2. التزمي بواقي شمس SPF 50+ يومياً مع سيروم فيتامين C لحماية الكولاجين.\n3. مارسي تمرين الرقبة الملكية (Swan Neck) على الجدار لإبراز عظام الترقوة والفك."
            : "For peak feminine harmony and radiant glass skin:\n1. **Zygomatic Sculpt:** 3-minute upward gua sha sweeps over cheekbones with squalane oil.\n2. **Dermal Glow:** Daily SPF 50+ matte defense paired with 15% Vitamin C & ceramide barrier cream.\n3. **Swan Posture:** 3x15 wall chin tucks to lengthen the cervical profile and define collarbones.";
        } else {
          replyText = isRtl
            ? "أهلاً بك! لتحقيق أفضل تناسق لملامح الوجه ونضارة البشرة:\n1. واظب على شرب 3.5 لتر ماء مع تقليل الصوديوم لطرد السوائل الزائدة (Debloating).\n2. التزم بواقي شمس SPF 50+ يومياً صباحاً وسيروم فيتامين C.\n3. مارس تمرين Chin Tucks 3x15 وضبط وضعية اللسان في سقف الحلق."
            : "For optimal facial aesthetics and skin glow:\n1. **Debloat First:** Keep sodium under 2,000mg and drink 3.5L water with potassium-rich foods.\n2. **Morning Dermal Stack:** Gentle cleanse → 10% Vitamin C → Barrier moisturizer → Broad-Spectrum SPF 50+.\n3. **Mandibular Posture:** Keep tongue sealed against the palate (mewing) and perform 3x15 chin tucks daily.";
        }
        source = "fallback";
      }

      const botMessage: CoachMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: replyText,
        timestamp: isRtl ? "الآن" : "Just now",
        source,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Coach API error:", err);
      const errorMessage: CoachMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: isRtl
          ? "حدث انقطاع مؤقت في الاتصال، ولكن إليك النصيحة الذهبية لليوم: احرص على 3.5 لتر ماء، واقي شمس SPF 50 يومياً، وتمرين Chin Tucks 3x15."
          : "Temporary connection issue. Here is your golden daily takeaway: prioritize 3.5L hydration, daily SPF 50+, and 3x15 chin tucks to decompress the mandibular ramus.",
        timestamp: isRtl ? "الآن" : "Just now",
        source: "fallback",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleClearHistory = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Eyebrow & Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#42E8FF]/10 border border-[#42E8FF]/30 text-[#42E8FF] text-xs font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(66,232,255,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-[#42E8FF]" />
          <span>{t.coach.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F4F7FA] tracking-tight font-display">
          {t.coach.title}
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          {t.coach.subtitle}
        </p>
        <div className="text-[11px] font-mono text-[#42E8FF]/80">
          {t.coach.poweredBy}
        </div>
      </div>

      {/* Quick Prompts Carousel / Pills */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#42E8FF]" />
            <span>{t.coach.suggestedQuestions}</span>
          </span>
          {messages.length > 2 && (
            <button
              onClick={handleClearHistory}
              className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{isRtl ? "مسح المحادثة" : "Reset Conversation"}</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={loading}
              className="bg-[#111318] hover:bg-[#181B22] border border-[#1E232E] hover:border-[#42E8FF]/40 text-slate-300 hover:text-[#42E8FF] text-xs py-1.5 px-3 rounded-full transition-all duration-150 cursor-pointer text-start"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-[#111318] rounded-3xl border border-[#1E232E] shadow-xl overflow-hidden flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isBot = msg.role === "assistant";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#42E8FF] to-[#8B5CF6] flex items-center justify-center shrink-0 shadow-md text-[#08090C] mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                    isBot
                      ? "bg-[#08090C] border border-[#1E232E] text-[#F4F7FA]"
                      : "bg-gradient-to-r from-[#42E8FF] to-[#38bdf8] text-[#08090C] font-semibold shadow-md shadow-[#42E8FF]/10"
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {msg.content}
                  </div>

                  {isBot && (
                    <div className="pt-2 border-t border-[#1E232E] flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-mono text-[#42E8FF]">
                        {msg.source === "gemini" ? "Gemini 3.8 Flash" : "Knowledge Base"}
                      </span>

                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="flex items-center gap-1 hover:text-slate-200 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">{t.coach.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{t.coach.copyAdvice}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-[#1E232E] border border-[#2a3140] flex items-center justify-center shrink-0 text-slate-300 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#42E8FF]/20 border border-[#42E8FF]/40 flex items-center justify-center shrink-0 text-[#42E8FF] animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#08090C] border border-[#1E232E] rounded-2xl px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#42E8FF] animate-ping" />
                <span>{t.coach.thinking}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#08090C] border-t border-[#1E232E]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.coach.inputPlaceholder}
              disabled={loading}
              className="flex-1 bg-[#111318] border border-[#1E232E] rounded-xl px-4 py-3 text-xs text-[#F4F7FA] placeholder-slate-500 focus:outline-none focus:border-[#42E8FF] transition-colors"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="p-3 rounded-xl bg-gradient-to-r from-[#42E8FF] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#42E8FF] text-[#08090C] font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#42E8FF]/20 transition-all cursor-pointer"
            >
              <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
            </button>
          </form>

          <p className="text-[10px] text-slate-500 mt-2 text-center">
            {t.coach.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};
