import React, { useState, useRef, useEffect } from "react";
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Crosshair, 
  Layers, 
  BookmarkCheck,
  Eye,
  Activity,
  ArrowRight,
  Share2,
  Copy,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Target,
  Sliders,
  Wand2,
  Lock
} from "lucide-react";
import { Locale, ScanResult, UserProfile, FaceShapeType, GenderTrack } from "../types";
import { translations } from "../i18n/translations";
import { INITIAL_SCAN } from "../data/initialData";
import { INITIAL_FEMALE_SCAN } from "../data/femaleBeautyData";
import { FACE_SHAPE_PRESETS } from "../data/faceShapeData";
import { AuraMaxEmblem } from "./AuraMaxLogo";
import { SocialStoryModal } from "./SocialStoryModal";
import { GlowUpVisualizerModal } from "./GlowUpVisualizerModal";
import { FaceShapeSuite } from "./FaceShapeSuite";

interface ScanViewProps {
  locale: Locale;
  genderTrack?: GenderTrack;
  onSaveScan: (scan: ScanResult) => void;
  onViewTimeline: () => void;
  onAddProtocolToQuests?: (morning: string[], evening: string[]) => void;
  onBuildPlan?: (scan: ScanResult) => void;
  userProfile?: UserProfile;
}

export const ScanView: React.FC<ScanViewProps> = ({
  locale,
  genderTrack = "male",
  onSaveScan,
  onViewTimeline,
  onAddProtocolToQuests,
  onBuildPlan,
  userProfile,
}) => {
  const t = translations[locale];
  const isRtl = locale === "ar";
  const isFemale = genderTrack === "female";

  const defaultScan = isFemale ? INITIAL_FEMALE_SCAN : INITIAL_SCAN;

  const [scanState, setScanState] = useState<"prep" | "camera" | "upload" | "analyzing" | "result">("result");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisPhaseText, setAnalysisPhaseText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>(defaultScan.imageUrl || "");
  const [scanResult, setScanResult] = useState<ScanResult | null>(defaultScan);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [showMakeoverModal, setShowMakeoverModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sync scanResult if genderTrack changes and current scan was demo
  useEffect(() => {
    if (scanResult?.id === "scan-demo-01" || scanResult?.id === "scan-fem-demo-01") {
      const newScan = isFemale ? INITIAL_FEMALE_SCAN : INITIAL_SCAN;
      setScanResult(newScan);
      setSelectedImage(newScan.imageUrl || "");
    }
  }, [genderTrack]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setCameraError(null);
      setScanState("camera");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError(
        isRtl 
          ? "تعذر تشغيل الكاميرا. يرجى منح الإذن للمتصفح أو اختيار رفع صورة بدلاً من ذلك." 
          : "Unable to access camera. Please check permissions or choose to upload a portrait."
      );
      setScanState("prep");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    stopCamera();
    setSelectedImage(dataUrl);
    runAnalysis(dataUrl);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setSelectedImage(dataUrl);
        runAnalysis(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const runAnalysis = (imageUrl: string) => {
    setScanState("analyzing");
    setAnalysisProgress(10);
    setAnalysisPhaseText(isRtl ? "جاري كشف معالم الوجه والإضاءة..." : "Detecting facial contours & lighting quality...");

    setTimeout(() => {
      setAnalysisProgress(45);
      setAnalysisPhaseText(isRtl ? "حساب التناسق وتحديد شكل الوجه..." : "Calculating facial thirds and symmetry...");
    }, 800);

    setTimeout(() => {
      setAnalysisProgress(80);
      setAnalysisPhaseText(isRtl ? "تجهيز التوصيات وبناء نظرة أورا الشاملة..." : "Synthesizing appearance insights & focus areas...");
    }, 1600);

    setTimeout(() => {
      setAnalysisProgress(100);
      const generatedScan: ScanResult = {
        id: `scan-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        overallScore: isFemale ? 84 : 82,
        potentialScore: isFemale ? 93 : 91,
        symmetryScore: 84,
        skinScore: 81,
        jawlineScore: isFemale ? 83 : 82,
        gonialAngle: "123°",
        canthalTilt: "+4° Positive",
        facialThirds: "1.0 : 1.02 : 0.98",
        imageUrl,
        metrics: [],
        strengths: [
          { en: "High bilateral facial symmetry", ar: "تماثل ثنائي عالٍ في جانبي الوجه" },
          { en: "Healthy dermal moisture barrier", ar: "حاجز رطوبة صحي ونضارة متوازنة" },
        ],
        improvements: [
          { en: "Morning submental fluid accumulation", ar: "احتباس سوائل أسفل الفك في الصباح" },
          { en: "Slight forward cervical head tilt", ar: "ميل طفيف في الرقبة للأمام" },
        ],
        customRoutine: {
          morning: [
            { en: "Cold Water Face Plunge (2 mins)", ar: "غمر الوجه بالماء البارد (دقيقتين)" },
            { en: "Broad-Spectrum SPF 50+", ar: "واقي شمس واسع المدى SPF 50+" },
          ],
          evening: [
            { en: "Gentle Hydrating Cleanser", ar: "غسول لطيف مرطب" },
            { en: "Cervical Spine Wall Angels (3 mins)", ar: "تمرين استقامة الرقبة على الحائط (3 دقائق)" },
          ],
        },
        notes: {
          en: "Balanced scan with clear lighting and authentic symmetry.",
          ar: "فحص متناسق مع وضوح ملامح ممتاز.",
        },
        faceShape: {
          shape: isFemale ? "oval" : "square",
          name: {
            en: isFemale ? "Oval Harmony" : "Defined Square",
            ar: isFemale ? "البيضاوي المتناسق" : "المربع المحدد",
          },
          confidence: 0.92,
          description: {
            en: isFemale ? "Harmonious oval contours with soft balanced proportions." : "Prominent jawline with balanced square bone architecture.",
            ar: isFemale ? "ملامح بيضاوية متناسقة مع نعومة في الزوايا وتوازن طبيعي." : "هيكل عظمي مربع مع فك محدد وتناسق حاد في الملامح.",
          },
          proportions: {
            lengthToWidthRatio: "1.35",
            foreheadWidth: { en: "Balanced", ar: "متوازن" },
            cheekboneWidth: { en: "Prominent", ar: "بارز" },
            jawlineWidth: { en: "Defined", ar: "محدد" },
          },
          keyBalancingPrinciple: {
            en: "Preserve cheekbone prominence while maintaining vertical symmetry.",
            ar: "الحفاظ على بروز الوجنتين مع موازنة التماثل الرأسي.",
          },
        },
      };

      setScanResult(generatedScan);
      onSaveScan(generatedScan);
      setScanState("result");
    }, 2400);
  };

  const handleSaveToTimeline = () => {
    if (scanResult) {
      onSaveScan(scanResult);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div 
      className="max-w-6xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <canvas ref={canvasRef} className="hidden" />

      {/* 1. STATE: SCAN PREPARATION CHECKLIST */}
      {scanState === "prep" && (
        <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#111318] border border-[#252A33] text-start space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#42E8FF]/10 text-[#42E8FF] text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>{isRtl ? "تجهيز الفحص" : "Scan Preparation"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] font-display">
              {isRtl ? "فحص ملامح الوجه" : "Biometric Face Scan"}
            </h1>
            <p className="text-xs sm:text-sm text-[#A5AEBC]">
              {isRtl 
                ? "اتبع الإرشادات البسيطة التالية للحصول على أدق تقييم ممكن لملامحك." 
                : "Follow these 4 simple conditions for high-fidelity geometric accuracy."}
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            {[
              {
                title: isRtl ? "واجه الكاميرا مباشرة" : "Face the camera straight on",
                desc: isRtl ? "تأكد من أن رأسك غير مائل للأعلى أو الجانب." : "Keep your head level without tilting upward or sideways."
              },
              {
                title: isRtl ? "إضاءة متوازنة وواضحة" : "Good, balanced lighting",
                desc: isRtl ? "تجنب الإضاءة الخلفية القوية أو الظلال الحادة على نصف الوجه." : "Natural front lighting is best. Avoid harsh half-face shadows."
              },
              {
                title: isRtl ? "تعابير وجه طبيعية" : "Neutral facial expression",
                desc: isRtl ? "حافظ على ارتخاء الفك والشفتين دون ابتسامة مبالغة." : "Relax your jaw and lips in a calm, resting neutral state."
              },
              {
                title: isRtl ? "إبعاد العوائق عن الوجه" : "Remove major occlusions",
                desc: isRtl ? "ارفع خصلات الشعر عن الجبين والفك، وانزع النظارات الشمسية." : "Push hair away from forehead and jawline. Remove sunglasses."
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#171A21] border border-[#252A33] flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#42E8FF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#F4F7FA]">{item.title}</div>
                  <div className="text-xs text-[#A5AEBC] mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy Note */}
          <div className="p-3 rounded-xl bg-[#08090C] border border-[#252A33] flex items-center gap-2.5 text-xs text-[#6B7484]">
            <Lock className="w-4 h-4 text-[#42E8FF] shrink-0" />
            <span>
              {isRtl 
                ? "تنبيه الخصوصية: الفحص يبدأ ويعالج على جهازك مباشرة دون إرسال صورك." 
                : "Privacy guarantee: Processing begins on-device. Photos are never sold."}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={startCamera}
              className="flex-1 py-3.5 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(66,232,255,0.25)] active:scale-95 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{isRtl ? "تشغيل الكاميرا والتقاط صورة" : "Start Live Camera"}</span>
            </button>

            <label className="flex-1 py-3.5 rounded-xl bg-[#171A21] hover:bg-[#1E232E] border border-[#252A33] text-xs font-semibold text-[#F4F7FA] flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-[#A5AEBC]" />
              <span>{isRtl ? "اختيار صورة من الجهاز" : "Upload Portrait"}</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="text-center">
            <button
              onClick={() => setScanState("result")}
              className="text-xs text-[#6B7484] hover:text-[#A5AEBC] transition-colors cursor-pointer"
            >
              {isRtl ? "العودة إلى نتيجة الفحص السابقة" : "Back to current scan overview"}
            </button>
          </div>
        </div>
      )}

      {/* 2. STATE: CAMERA VIEWFINDER */}
      {scanState === "camera" && (
        <div className="max-w-xl mx-auto p-6 rounded-3xl bg-[#111318] border border-[#252A33] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#252A33]">
            <span className="text-xs font-bold text-[#F4F7FA] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              {isRtl ? "الكاميرا نشطة · اضبط محاذاة الوجه" : "Live View · Align Face Inside Oval"}
            </span>
            <button
              onClick={() => {
                stopCamera();
                setScanState("prep");
              }}
              className="text-xs text-[#A5AEBC] hover:text-[#F4F7FA] cursor-pointer"
            >
              {isRtl ? "إلغاء" : "Cancel"}
            </button>
          </div>

          <div className="relative w-full aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-black border border-[#252A33] flex items-center justify-center">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover transform -scale-x-100" 
            />

            {/* Subtle Alignment Guide Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-48 h-64 sm:w-56 sm:h-76 rounded-[50%] border-2 border-[#42E8FF]/60 border-dashed animate-pulse relative">
                <div className="absolute top-1/3 left-0 right-0 h-px bg-[#42E8FF]/30" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#42E8FF]/30" />
              </div>
            </div>

            {/* Subtle Radar sweep line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#42E8FF] to-transparent animate-radar" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#A5AEBC]">
              {isRtl ? "ثبت رأسك واضغط التقاط" : "Hold still and tap capture"}
            </span>
            <button
              onClick={capturePhoto}
              className="px-6 py-3 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(66,232,255,0.3)] active:scale-95 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{isRtl ? "التقاط وتحليل" : "Capture & Analyze"}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. STATE: ANALYZING SKELETON */}
      {scanState === "analyzing" && (
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-[#111318] border border-[#252A33] text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#171A21] border border-[#42E8FF]/40 text-[#42E8FF] flex items-center justify-center mx-auto animate-spin">
            <AuraMaxEmblem width={32} height={32} glow={false} />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#F4F7FA] font-display">
              {isRtl ? "جاري معالجة الفحص..." : "Analyzing Biometric Geometry..."}
            </h2>
            <p className="text-xs text-[#A5AEBC] min-h-[20px]">
              {analysisPhaseText}
            </p>
          </div>

          <div className="w-full bg-[#171A21] h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#42E8FF] to-[#38BDF8] transition-all duration-300"
              style={{ width: `${analysisProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* 4. STATE: RESULT VIEWPORT (STREAMLINED HIERARCHY) */}
      {scanState === "result" && scanResult && (
        <div className="space-y-8">
          {/* Top Row: First Viewport Aura Overview */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111318] border border-[#252A33] relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#252A33]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#42E8FF] uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isRtl ? "نظرة أورا الشاملة" : "Your Aura Overview"}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FA] font-display">
                  {isRtl ? "ملخص تقييم الملامح" : "Facial Symmetry & Architecture"}
                </h1>
                <p className="text-xs sm:text-sm text-[#A5AEBC] mt-1 max-w-xl">
                  {isRtl 
                    ? "تحليل ملامحي يحدد مواضع القوة التي تميزك ومجالات التركيز لتحقيق أعلى تناسق." 
                    : "Objective assessment identifying your natural architectural strengths and high-leverage focus areas."}
                </p>
              </div>

              {/* Primary Next Action CTA: BUILD MY PLAN */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={() => onBuildPlan?.(scanResult)}
                  className="px-7 py-3.5 rounded-xl bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(66,232,255,0.25)] active:scale-98 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Target className="w-4 h-4" />
                  <span>{isRtl ? "ابنِ خطتي الشخصية" : "Build My Plan"}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <button
                  onClick={() => setScanState("prep")}
                  className="px-4 py-3.5 rounded-xl bg-[#171A21] hover:bg-[#1E232E] border border-[#252A33] text-xs font-semibold text-[#A5AEBC] hover:text-[#F4F7FA] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {isRtl ? "فحص جديد" : "Retake Scan"}
                </button>
              </div>
            </div>

            {/* Metrics Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              {/* Card 1: Aura Score */}
              <div className="p-5 rounded-2xl bg-[#171A21] border border-[#252A33] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A5AEBC]">
                    {isRtl ? "نتيجة أورا" : "Aura Score"}
                  </span>
                  <div className="flex items-baseline gap-2 my-1">
                    <span className="text-4xl font-black text-[#42E8FF] font-display">
                      {scanResult.overallScore}
                    </span>
                    <span className="text-xs text-[#A5AEBC]">/ 100</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#10B981] font-semibold mt-2">
                  {isRtl ? "إمكانية وصول: 92+" : "Aesthetic Potential: 92+"}
                </div>
              </div>

              {/* Card 2: Detected Face Shape */}
              <div className="p-5 rounded-2xl bg-[#171A21] border border-[#252A33] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A5AEBC]">
                    {isRtl ? "شكل الوجه" : "Face Shape"}
                  </span>
                  <div className="text-xl font-bold text-[#F4F7FA] font-display my-1 capitalize">
                    {scanResult.faceShape?.shape || "Oval"}
                  </div>
                </div>
                <div className="text-[11px] text-[#A5AEBC]">
                  {scanResult.faceShape?.description[locale] || (isRtl ? "تناسق كلاسيكي متوازن" : "Balanced proportions")}
                </div>
              </div>

              {/* Card 3: Strong Areas */}
              <div className="p-5 rounded-2xl bg-[#171A21] border border-[#252A33] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#10B981]">
                    {isRtl ? "نقاط القوة" : "Strong Areas"}
                  </span>
                  <div className="space-y-1 mt-2 text-xs font-semibold text-[#F4F7FA]">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>{isRtl ? "كثافة الشعر وتأطير الوجه" : "Hair Framing & Symmetry"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>{isRtl ? "استقامة بنية الفك" : "Mandibular Jawline Poise"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Focus Areas */}
              <div className="p-5 rounded-2xl bg-[#171A21] border border-[#252A33] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#42E8FF]">
                    {isRtl ? "مجالات التركيز" : "Focus Areas"}
                  </span>
                  <div className="space-y-1 mt-2 text-xs font-semibold text-[#F4F7FA]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#42E8FF]" />
                      <span>{isRtl ? "طرد السوائل الصباحي (Debloat)" : "Morning Debloating Ritual"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#42E8FF]" />
                      <span>{isRtl ? "ترميم حاجز البشرة والواقي" : "Barrier Hydration & SPF"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Responsive 2-Column Section: Left = Recommendations & Hair/Beard, Right = Image & Collapsible Tech Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Recommendations & Face Shape Suite (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <FaceShapeSuite
                locale={locale}
                scanResult={scanResult}
                genderTrack={genderTrack}
                onOpenVisualizer={() => setShowMakeoverModal(true)}
              />
            </div>

            {/* Right Column: Scan Portrait & Collapsible Technical Biometrics & Visualizer Teaser (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Scan Portrait Card */}
              <div className="p-6 rounded-3xl bg-[#111318] border border-[#252A33] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A5AEBC]">
                    {isRtl ? "صورة الفحص المحفوظة" : "Verified Scan Image"}
                  </span>
                  <span className="text-xs text-[#6B7484]">{scanResult.date}</span>
                </div>

                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-black border border-[#252A33]">
                  {selectedImage ? (
                    <img 
                      src={selectedImage} 
                      alt="Aura scan portrait" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#6B7484]">
                      {isRtl ? "لا توجد صورة محملة" : "No image available"}
                    </div>
                  )}
                </div>

                {/* Makeover Visualizer Trigger */}
                <button
                  onClick={() => setShowMakeoverModal(true)}
                  className="w-full py-3 rounded-xl bg-[#171A21] hover:bg-[#1E232E] border border-[#252A33] hover:border-[#8B5CF6]/50 text-xs font-bold text-[#F4F7FA] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Wand2 className="w-4 h-4 text-[#8B5CF6]" />
                  <span>{isRtl ? "معاينة المظهر التقديرية (Visualizer)" : "Open Aesthetic Visualizer Preview"}</span>
                </button>
                <div className="text-[10px] text-[#6B7484] text-center">
                  {isRtl 
                    ? "المعاينة هي محاكاة بصرية لمساعدتك في تخيل النتيجة وليست تنبؤاً جراحياً." 
                    : "The visualizer is an aesthetic simulation preview, not a scientific guarantee."}
                </div>
              </div>

              {/* Technical Metrics (Collapsible as per prompt 10.F) */}
              <div className="rounded-3xl bg-[#111318] border border-[#252A33] overflow-hidden">
                <button
                  onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                  className="w-full p-5 flex items-center justify-between text-start cursor-pointer hover:bg-[#171A21]/50 transition-colors focus-visible:outline-none"
                  aria-expanded={showTechnicalDetails}
                >
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#42E8FF]" />
                    <span className="text-xs font-bold text-[#F4F7FA]">
                      {isRtl ? "التفاصيل والمقاييس البيومترية المتقدمة" : "View Technical Biometric Details"}
                    </span>
                  </div>
                  {showTechnicalDetails ? (
                    <ChevronUp className="w-4 h-4 text-[#A5AEBC]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#A5AEBC]" />
                  )}
                </button>

                {showTechnicalDetails && (
                  <div className="p-5 pt-0 space-y-3 border-t border-[#252A33]/50 animate-in fade-in duration-200">
                    <p className="text-xs text-[#A5AEBC] leading-relaxed pt-3">
                      {isRtl 
                        ? "هذه المقاييس الهندسية تُستعمل خلف الكواليس لضبط زوايا التوصيات وتصفيف الشعر." 
                        : "These geometric ratios guide algorithmic routine customization and haircut geometry."}
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-[#171A21] flex justify-between items-center">
                        <span className="text-[#A5AEBC]">{isRtl ? "نسبة الأثلاث الوجهية (Thirds):" : "Facial Thirds Ratio:"}</span>
                        <span className="font-mono text-[#F4F7FA] font-bold">{scanResult.facialThirds || "1.0 : 1.0 : 0.98"}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#171A21] flex justify-between items-center">
                        <span className="text-[#A5AEBC]">{isRtl ? "تناسق زاوية الفك (Gonial Definition):" : "Jawline Definition Index:"}</span>
                        <span className="font-mono text-[#42E8FF] font-bold">{scanResult.jawlineScore}/100</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#171A21] flex justify-between items-center">
                        <span className="text-[#A5AEBC]">{isRtl ? "مؤشر التماثل الثنائي (Symmetry):" : "Bilateral Symmetry:"}</span>
                        <span className="font-mono text-[#F4F7FA] font-bold">{scanResult.symmetryScore}%</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#171A21] flex justify-between items-center">
                        <span className="text-[#A5AEBC]">{isRtl ? "سحبة العين والخد (Canthal / Zygomatic):" : "Canthal & Zygomatic Index:"}</span>
                        <span className="font-mono text-[#8B5CF6] font-bold">{scanResult.canthalTilt || "+4°"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Makeover Visualizer Modal */}
      {showMakeoverModal && scanResult && (
        <GlowUpVisualizerModal
          isOpen={showMakeoverModal}
          onClose={() => setShowMakeoverModal(false)}
          locale={locale}
          scanResult={scanResult}
          userImage={scanResult.imageUrl || ""}
          genderTrack={genderTrack}
        />
      )}
    </div>
  );
};
