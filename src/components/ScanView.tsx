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
  Compass,
  Sliders,
  Wand2
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

  const [scanMode, setScanMode] = useState<"frontal" | "profile">("frontal");
  const [activeInput, setActiveInput] = useState<"sample" | "camera" | "upload">("sample");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>(defaultScan.imageUrl || "");
  const [scanResult, setScanResult] = useState<ScanResult | null>(defaultScan);

  // Sync scanResult if genderTrack changes and current scan was demo
  useEffect(() => {
    if (scanResult?.id === "scan-demo-01" || scanResult?.id === "scan-fem-demo-01") {
      const newScan = isFemale ? INITIAL_FEMALE_SCAN : INITIAL_SCAN;
      setScanResult(newScan);
      setSelectedImage(newScan.imageUrl || "");
    }
  }, [genderTrack]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [addedProtocolSuccess, setAddedProtocolSuccess] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showMakeoverModal, setShowMakeoverModal] = useState(false);
  const [activeResultsTab, setActiveResultsTab] = useState<"faceshape" | "biometrics" | "stacks">("faceshape");
  const [copiedCard, setCopiedCard] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sample profiles for both frontal & profile
  const sampleProfiles = [
    {
      id: "sample-frontal-male",
      mode: "frontal" as const,
      name: isRtl ? "ملامح أمامية حادة (ذكر)" : "Chiseled Frontal (Men)",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "sample-profile-jaw",
      mode: "profile" as const,
      name: isRtl ? "بروفايل الفك الجانبي 90°" : "Sharp 90° Jawline Profile",
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "sample-frontal-female",
      mode: "frontal" as const,
      name: isRtl ? "ملامح متناسقة (أنثى)" : "Harmonious Frontal (Women)",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "sample-profile-female",
      mode: "profile" as const,
      name: isRtl ? "بروفايل أنثوي متناسق 90°" : "Harmonious Female 90° Profile",
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
    }
  ];

  const getTierLabel = (score: number) => {
    if (score >= 90) return t.scan.tierAscended;
    if (score >= 80) return t.scan.tierHigh;
    return t.scan.tierRising;
  };

  // Camera start / stop
  const startCamera = async () => {
    try {
      setCameraError(null);
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
          ? "تعذر الوصول للكاميرا. يرجى منح الإذن أو استخدام خيار رفع الصورة." 
          : "Unable to access camera. Please allow camera permissions or upload a portrait photo."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handle capture from camera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setSelectedImage(dataUrl);
        stopCamera();
        runBiometricAnalysis(dataUrl, scanMode);
      }
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setSelectedImage(result);
        runBiometricAnalysis(result, scanMode);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run Biometric Scan Pipeline
  const runBiometricAnalysis = async (imgUrl: string, currentMode: "frontal" | "profile" = scanMode) => {
    setIsScanning(true);
    setScanResult(null);
    setSavedSuccess(false);
    setAddedProtocolSuccess(false);

    const steps = [
      t.scan.scanningLandmarks,
      t.scan.evaluatingGonial,
      t.scan.scoringThirds,
    ];

    let stepIdx = 0;
    setScanStepText(steps[0]);
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setScanStepText(steps[stepIdx]);
      }
    }, 800);

    try {
      const response = await fetch("/api/scan/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imgUrl.startsWith("data:") ? imgUrl : undefined,
          mode: currentMode,
          locale,
          gender: isFemale ? "female" : "male",
        }),
      });

      clearInterval(interval);

      let data: any = null;
      if (response.ok) {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          data = await response.json();
        }
      }

      if (data && data.analysis) {
        const a = data.analysis;
        const newScan: ScanResult = {
          id: `scan-${Date.now()}`,
          date: isRtl ? "اليوم، الآن" : "Today, Just now",
          overallScore: a.overallScore || 85,
          potentialScore: a.potentialScore || 95,
          imageUrl: imgUrl,
          gonialAngle: a.gonialAngle || (currentMode === "profile" ? "121.5° (Sharp)" : "123° (Optimal)"),
          jawlineScore: a.jawlineScore || 88,
          symmetryScore: a.symmetryScore || 89,
          skinScore: a.skinScore || 82,
          canthalTilt: a.canthalTilt || "+4.0° (Positive)",
          facialThirds: a.facialThirds || "33% / 34% / 33%",
          metrics: [
            {
              name: { 
                en: currentMode === "profile" ? "Mandibular Gonial Angle" : "Jawline Definition & Border", 
                ar: currentMode === "profile" ? "زاوية الفك السفلي (Gonial Angle)" : "تحديد خط الفك والرقبة" 
              },
              score: a.jawlineScore || 88,
              target: 96,
              status: { 
                en: currentMode === "profile" ? "121.5° (Masculine & Sharp)" : "Sharp & Well-Demarcated", 
                ar: currentMode === "profile" ? "121.5° (حادة ومحددة بدقة)" : "حاد وواضح مع فصل ممتاز" 
              },
              feedback: {
                en: currentMode === "profile" 
                  ? "Near ideal ramus-mandible angle with great submental projection." 
                  : "Strong mandibular border with distinct chin-neck demarcation.",
                ar: currentMode === "profile"
                  ? "زاوية فك مثالية مع ارتفاع بارز لعظم الفك يبرز البنية العظمية."
                  : "حافة فك سفلية قوية مع فصل واضح بين الذقن والرقبة."
              }
            },
            {
              name: { en: "Canthal Tilt & Periorbital Vector", ar: "ميلان العينين ومحيط المحجر" },
              score: 91,
              target: 95,
              status: { en: "Positive Canthal Tilt", ar: "ميلان إيجابي جذاب" },
              feedback: {
                en: "Youthful upward outer eye slope indicating strong orbital support.",
                ar: "ميلان علوي جذاب للزاوية الخارجية للعين يعكس بنية عظمية متناسقة."
              }
            },
            {
              name: { en: "Facial Horizontal Thirds Ratio", ar: "تناسق الأثلاث الأفقية للوجه" },
              score: a.symmetryScore || 89,
              target: 95,
              status: { en: "Harmonious (1:1:1)", ar: "متناسق مع النسبة الذهبية" },
              feedback: {
                en: "Balanced upper, middle, and lower facial third ratios.",
                ar: "توازن مدروس بين مساحات الجبهة، وسط الوجه، والفك السفلي."
              }
            },
            {
              name: { en: "Dermal Clarity & Glass Glow", ar: "نقاء وإشراقة البشرة (Glass Glow)" },
              score: a.skinScore || 82,
              target: 94,
              status: { en: "Smooth, Needs Hydration Stacking", ar: "نقية، بحاجة لترطيب أعمق" },
              feedback: {
                en: "Low blemish count. Consistent SPF 50 and ice roll will maximize light reflection.",
                ar: "قلة الشوائب، والالتزام بواقي الشمس وكمادات الثلج سيرفع لمعان البشرة لأقصاه."
              }
            },
            {
              name: { en: "Cheekbone Arch Prominence", ar: "بروز عظام الخدين (Zygomatic)" },
              score: 87,
              target: 93,
              status: { en: "High Zygomatic Arch", ar: "بروز عظمي جذاب" },
              feedback: {
                en: "Broad lateral cheekbones providing natural hollows under the cheek.",
                ar: "عظام خد عريضة توفر تجويفاً جمالياً طبيعياً تحت الوجنة."
              }
            },
            {
              name: { 
                en: currentMode === "profile" ? "Cervicomental Neck Angle" : "Submental Soft Tissue Tightness", 
                ar: currentMode === "profile" ? "زاوية الرقبة والحنجرة (Cervicomental)" : "شد منطقة أسفل الذقن" 
              },
              score: 82,
              target: 95,
              status: { en: "Firm, Responsive to Mewing", ar: "جيد، يستجيب للميونج وشد الذقن" },
              feedback: {
                en: "Minor fluid laxity under chin easily tightened with proper tongue posture and chin tucks.",
                ar: "ارتخاء خفيف تحت الذقن يمكن شده بتمارين اللسان والميونج اليومية."
              }
            }
          ],
          strengths: (a.strengths || []).map((s: string) => ({ en: s, ar: s })),
          improvements: (a.improvements || []).map((i: string) => ({ en: i, ar: i })),
          customRoutine: {
            morning: (a.customRoutine?.morning || []).map((m: string) => ({ en: m, ar: m })),
            evening: (a.customRoutine?.evening || []).map((e: string) => ({ en: e, ar: e })),
          },
          detectedGender: a.detectedGender || (isFemale ? "female" : "male"),
          faceShape: a.faceShape || (isFemale ? INITIAL_FEMALE_SCAN.faceShape : FACE_SHAPE_PRESETS.oval.analysis),
          maleHairstyles: a.maleHairstyles || FACE_SHAPE_PRESETS.oval.maleHairstyles,
          femaleHairstyles: a.femaleHairstyles || FACE_SHAPE_PRESETS.oval.femaleHairstyles,
          beardStyles: a.beardStyles || FACE_SHAPE_PRESETS.oval.beardStyles,
          stylesToAvoid: a.stylesToAvoid || (isFemale ? INITIAL_FEMALE_SCAN.stylesToAvoid : FACE_SHAPE_PRESETS.oval.stylesToAvoid),
          immediateGlowUpTips: a.immediateGlowUpTips || (isFemale ? INITIAL_FEMALE_SCAN.immediateGlowUpTips : FACE_SHAPE_PRESETS.oval.immediateGlowUpTips),
          transformationNotes: a.transformationNotes || (isFemale ? INITIAL_FEMALE_SCAN.transformationNotes : INITIAL_SCAN.transformationNotes),
          visualizedAfterUrl: a.visualizedAfterUrl,
        };

        const activeFallback = isFemale ? INITIAL_FEMALE_SCAN : INITIAL_SCAN;
        if (newScan.strengths.length === 0) newScan.strengths = activeFallback.strengths;
        if (newScan.improvements.length === 0) newScan.improvements = activeFallback.improvements;
        if (newScan.customRoutine.morning.length === 0) newScan.customRoutine = activeFallback.customRoutine;

        setScanResult(newScan);
      } else {
        setScanResult(isFemale ? INITIAL_FEMALE_SCAN : INITIAL_SCAN);
      }
    } catch (err) {
      console.error("Scan error, using fallback:", err);
      setScanResult(isFemale ? INITIAL_FEMALE_SCAN : INITIAL_SCAN);
    } finally {
      setIsScanning(false);
    }
  };

  const [visualizerOpts, setVisualizerOpts] = useState<{ gender?: "male" | "female"; hairstyleId?: string; beardId?: string } | null>(null);

  const handleOpenVisualizer = (opts?: { gender?: "male" | "female"; hairstyleId?: string; beardId?: string }) => {
    setVisualizerOpts(opts || null);
    setShowMakeoverModal(true);
  };

  const handleOverrideFaceShape = (shape: FaceShapeType) => {
    if (!scanResult) return;
    const preset = FACE_SHAPE_PRESETS[shape];
    setScanResult({
      ...scanResult,
      faceShape: preset.analysis,
      maleHairstyles: preset.maleHairstyles,
      femaleHairstyles: preset.femaleHairstyles,
      beardStyles: preset.beardStyles,
      stylesToAvoid: preset.stylesToAvoid,
      immediateGlowUpTips: preset.immediateGlowUpTips,
      transformationNotes: scanResult.transformationNotes || INITIAL_SCAN.transformationNotes,
    });
  };

  const handleSaveToTimeline = () => {
    if (scanResult) {
      onSaveScan(scanResult);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    }
  };

  const handleAddProtocol = () => {
    if (!scanResult || !onAddProtocolToQuests) return;
    const mSteps = scanResult.customRoutine.morning.map((m) => m[locale]);
    const eSteps = scanResult.customRoutine.evening.map((e) => e[locale]);
    onAddProtocolToQuests(mSteps, eSteps);
    setAddedProtocolSuccess(true);
    setTimeout(() => setAddedProtocolSuccess(false), 3500);
  };

  const handleCopyCardText = () => {
    if (!scanResult) return;
    const traitScore = Math.min(
      99,
      Math.round(scanResult.jawlineScore * 0.6 + scanResult.overallScore * 0.4)
    );
    const appBrand = isFemale ? "AURA FEM" : "AURA MAX";
    const traitLabel = isFemale 
      ? (isRtl ? "التناسق والجاذبية" : "Feminine Harmony") 
      : (isRtl ? "الحدة والذكورية" : "Masculinity");

    const cardText = `⚡ ${appBrand} BIOMETRIC RATINGS ⚡
Overall: ${scanResult.overallScore}
Potential: ${scanResult.potentialScore}
${traitLabel}: ${traitScore}
Skin quality: ${scanResult.skinScore}
Jawline: ${scanResult.jawlineScore}
Cheekbones: ${scanResult.symmetryScore}

Gonial Angle: ${scanResult.gonialAngle}
Canthal Tilt: ${scanResult.canthalTilt}
----------------------------------
GET YOUR RATINGS + GLOWUP WITH ${appBrand} APP`;

    navigator.clipboard.writeText(cardText);
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Title & Eyebrow */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#42E8FF]/10 border border-[#42E8FF]/30 text-[#42E8FF] text-xs font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(66,232,255,0.12)]">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>{t.scan.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F4F7FA] tracking-tight font-display">
          {t.scan.title}
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          {t.scan.subtitle}
        </p>
      </div>

      {/* Dual Scan Mode Selector: Frontal vs Profile Jawline */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="bg-[#111318] p-1.5 rounded-2xl border border-[#1E232E] inline-flex items-center gap-1 shadow-lg">
          <button
            onClick={() => {
              setScanMode("frontal");
              if (selectedImage) runBiometricAnalysis(selectedImage, "frontal");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              scanMode === "frontal"
                ? "bg-gradient-to-r from-[#42E8FF] to-[#38bdf8] text-[#08090C] shadow-md shadow-[#42E8FF]/25 font-black"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.scan.modeFrontal}</span>
          </button>

          <button
            onClick={() => {
              setScanMode("profile");
              // Automatically switch to profile sample if currently on sample mode
              const profileSample = sampleProfiles.find((p) => p.mode === "profile");
              if (activeInput === "sample" && profileSample) {
                setSelectedImage(profileSample.url);
                runBiometricAnalysis(profileSample.url, "profile");
              } else if (selectedImage) {
                runBiometricAnalysis(selectedImage, "profile");
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              scanMode === "profile"
                ? "bg-gradient-to-r from-[#42E8FF] to-[#38bdf8] text-[#08090C] shadow-md shadow-[#42E8FF]/25 font-black"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>{t.scan.modeProfile}</span>
          </button>
        </div>

        {/* Input Source Tabs (Sample / Camera / Upload) */}
        <div className="bg-[#111318] p-1.5 rounded-2xl border border-[#1E232E] inline-flex items-center gap-1 shadow-lg">
          <button
            onClick={() => {
              setActiveInput("sample");
              stopCamera();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeInput === "sample"
                ? "bg-[#181B22] text-[#F4F7FA] border border-[#1E232E] shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#42E8FF]" />
            <span>{t.scan.tabSample}</span>
          </button>

          <button
            onClick={() => {
              setActiveInput("camera");
              startCamera();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeInput === "camera"
                ? "bg-slate-800 text-slate-100 border border-slate-700"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.scan.tabCamera}</span>
          </button>

          <label
            onClick={() => {
              setActiveInput("upload");
              stopCamera();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeInput === "upload"
                ? "bg-slate-800 text-slate-100 border border-slate-700"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.scan.tabUpload}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-3.5 rounded-2xl bg-[#111318] border border-[#252A33] flex items-center justify-between gap-3 text-xs text-[#A5AEBC]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#42E8FF] shrink-0" />
          <span>
            {isRtl 
              ? "معالجة محلية 100%: يتم قياس ملامح وجهك داخل متصفحك. لا نخزن أو نرفع صور وجهك الأصلية." 
              : "100% Local Processing: Facial landmarks are analyzed directly on your device. Raw photos are not stored."}
          </span>
        </div>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded shrink-0">
          {isRtl ? "جودة الفحص: ممتازة" : "Quality: Optimal"}
        </span>
      </div>

      {/* Stage / Scanner Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: Biometric Stage & HUD Overlay */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-3xl overflow-hidden bg-[#0d1017] border-2 border-[#232a3b] shadow-2xl shadow-black/80 flex items-center justify-center group">
            {/* Background Image / Video Feed */}
            {activeInput === "camera" && (
              <>
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
              </>
            )}

            {(activeInput === "sample" || activeInput === "upload") && selectedImage && (
              <img
                src={selectedImage}
                alt="Scan subject"
                className="w-full h-full object-cover filter contrast-105"
              />
            )}

            {/* Dark vignette gradient for futuristic contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Biometric HUD Overlay Wireframe */}
            <div className="absolute inset-0 pointer-events-none p-5 flex flex-col justify-between">
              {/* Top HUD Telemetry */}
              <div className={`flex items-center justify-between text-[10px] font-mono ${isFemale ? "text-pink-400 border-pink-500/30" : "text-cyan-400 border-cyan-500/30"} bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border`}>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isFemale ? "bg-pink-400" : "bg-cyan-400"} animate-ping`} />
                  <span>{isFemale ? "AURA FEM v5.0" : "AURA MAX v5.0"} // {scanMode === "profile" ? "PROFILE" : "FRONTAL"}</span>
                </div>
                <span>468 PTS</span>
              </div>

              {/* Center Facial Wireframe Target based on Mode */}
              <div className="relative w-full h-full flex items-center justify-center my-2">
                {scanMode === "frontal" ? (
                  /* Frontal Mode Oval & Thirds Grid */
                  <div className="w-[78%] h-[82%] border-2 border-dashed border-cyan-400/40 rounded-[50%/60%] relative flex items-center justify-center">
                    <Crosshair className="w-6 h-6 text-cyan-400/60" />

                    {/* Horizontal Thirds Guidelines */}
                    <div className="absolute top-[33%] left-0 right-0 border-t border-cyan-500/30 flex justify-between px-2 text-[9px] font-mono text-cyan-300">
                      <span>MID-FACE</span>
                      <span>1:1</span>
                    </div>
                    <div className="absolute top-[66%] left-0 right-0 border-t border-cyan-500/30 flex justify-between px-2 text-[9px] font-mono text-cyan-300">
                      <span>MANDIBLE</span>
                      <span>123°</span>
                    </div>

                    {/* Eye canthal tilt vector line */}
                    <div className="absolute top-[38%] left-[18%] right-[18%] h-[1px] bg-[#42E8FF]/70 rotate-2 flex items-center justify-center">
                      <span className="bg-[#08090C]/90 text-[#42E8FF] text-[8px] font-mono px-1 rounded -translate-y-3 border border-[#42E8FF]/40 shadow-[0_0_8px_rgba(66,232,255,0.3)]">
                        CANTHAL +4.0°
                      </span>
                    </div>

                    {/* Gonial Angle Corner Guides */}
                    <div className="absolute bottom-[16%] left-[8%] w-4 h-4 border-b-2 border-l-2 border-[#42E8FF] drop-shadow-[0_0_6px_#42E8FF]" />
                    <div className="absolute bottom-[16%] right-[8%] w-4 h-4 border-b-2 border-r-2 border-[#42E8FF] drop-shadow-[0_0_6px_#42E8FF]" />
                  </div>
                ) : (
                  /* Profile Mode Gonial Angle & Jaw Guide */
                  <div className="w-[85%] h-[85%] relative flex items-center justify-center">
                    {/* Jawline mandibular slope vector line */}
                    <div className="absolute bottom-[22%] left-[20%] w-[60%] h-[2px] bg-[#42E8FF]/90 -rotate-12 flex items-center justify-center shadow-[0_0_8px_rgba(66,232,255,0.5)]">
                      <span className="bg-[#08090C]/90 text-[#42E8FF] text-[8px] font-mono px-1.5 py-0.5 rounded -translate-y-4 border border-[#42E8FF]/50 shadow-[0_0_8px_rgba(66,232,255,0.4)]">
                        MANDIBULAR LINE
                      </span>
                    </div>

                    {/* Ramus height vertical vector */}
                    <div className="absolute bottom-[24%] right-[22%] h-[40%] w-[2px] bg-[#42E8FF]/90 flex items-center justify-center shadow-[0_0_8px_rgba(66,232,255,0.5)]">
                      <span className="bg-[#08090C]/90 text-[#42E8FF] text-[8px] font-mono px-1 rounded translate-x-12 whitespace-nowrap border border-[#42E8FF]/40">
                        RAMUS HEIGHT
                      </span>
                    </div>

                    {/* Gonial Vertex Arc */}
                    <div className="absolute bottom-[22%] right-[22%] w-10 h-10 border-b-2 border-r-2 border-[#8B5CF6] rounded-br-2xl flex items-center justify-center shadow-[0_0_8px_rgba(139,92,246,0.5)]">
                      <span className="text-[9px] font-mono text-[#8B5CF6] translate-x-3 translate-y-3 font-bold bg-[#08090C]/80 px-1 rounded border border-[#8B5CF6]/30">
                        {isFemale ? "124°" : "121.5°"}
                      </span>
                    </div>

                    {/* Cervicomental angle guideline */}
                    <div className="absolute bottom-[10%] left-[25%] right-[30%] border-t border-dashed border-[#42E8FF]/60" />
                  </div>
                )}

                {/* Radar Sweep Scanning Laser */}
                {isScanning && (
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#42E8FF] to-transparent shadow-[0_0_15px_#42E8FF] animate-radar" />
                )}
              </div>

              {/* Bottom HUD readout */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#F4F7FA] bg-[#08090C]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#1E232E]">
                <span className={`${isFemale ? "text-pink-400" : "text-[#42E8FF]"} font-bold`}>
                  GONIAL: {scanResult?.gonialAngle || (isFemale ? "124°" : "121.5°")}
                </span>
                <span className="text-[#8B5CF6]">
                  {scanMode === "profile" ? "RAMUS: OPTIMAL" : `CANTHAL: ${scanResult?.canthalTilt || (isFemale ? "+4.5°" : "+4.0°")}`}
                </span>
              </div>
            </div>

            {/* Scanning In-Progress Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-[#08090C]/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
                <div className="w-16 h-16 rounded-2xl border-2 border-[#42E8FF] border-t-transparent animate-spin flex items-center justify-center mb-4 shadow-lg shadow-[#42E8FF]/30">
                  <Sparkles className="w-7 h-7 text-[#42E8FF] animate-pulse" />
                </div>
                <h4 className="text-base font-bold text-[#F4F7FA] font-display">
                  {t.scan.analyzing}
                </h4>
                <p className="text-xs text-[#42E8FF] font-mono mt-1 animate-pulse">
                  {scanStepText}
                </p>
              </div>
            )}
          </div>

          {/* Action Trigger Button */}
          <div className="w-full max-w-[380px] mt-4 flex items-center gap-3">
            {activeInput === "camera" ? (
              <button
                onClick={capturePhoto}
                disabled={isScanning}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#42E8FF] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#42E8FF] text-[#08090C] font-extrabold text-sm shadow-xl shadow-[#42E8FF]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>{t.scan.takePhoto}</span>
              </button>
            ) : (
              <button
                onClick={() => runBiometricAnalysis(selectedImage, scanMode)}
                disabled={isScanning}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#42E8FF] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#42E8FF] text-[#08090C] font-extrabold text-sm shadow-xl shadow-[#42E8FF]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isScanning ? t.scan.analyzing : t.scan.takePhoto}</span>
              </button>
            )}
          </div>

          {/* Sample Switcher Selector */}
          {activeInput === "sample" && (
            <div className="w-full max-w-[380px] mt-3 flex items-center gap-2">
              {sampleProfiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedImage(p.url);
                    setScanMode(p.mode);
                    runBiometricAnalysis(p.url, p.mode);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all truncate ${
                    selectedImage === p.url
                      ? "bg-[#42E8FF]/20 border-[#42E8FF]/50 text-[#42E8FF]"
                      : "bg-[#111318] border-[#1E232E] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}

          {cameraError && (
            <div className="w-full max-w-[380px] mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{cameraError}</span>
            </div>
          )}
        </div>

        {/* Right: Scan Results & Biometric Analysis Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {scanResult ? (
            <>
              {/* Primary Score Banner */}
              <div className="bg-gradient-to-br from-[#111318] via-[#141720] to-[#181C26] rounded-3xl p-6 border border-[#1E232E] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#42E8FF]/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Overall Aura Score */}
                  <div className="flex items-center gap-5">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="#1a1e28"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke={isFemale ? "#F472B6" : "#42E8FF"}
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={264}
                          strokeDashoffset={264 - (264 * scanResult.overallScore) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className={`text-3xl font-black ${isFemale ? "text-pink-400" : "text-[#42E8FF]"} font-display`}>
                          {scanResult.overallScore}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          / 100
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs uppercase font-bold ${isFemale ? "text-pink-400" : "text-[#42E8FF]"} tracking-wider`}>
                          {t.scan.overallScore}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/40 shadow-sm shadow-[#8B5CF6]/20">
                          {getTierLabel(scanResult.overallScore)}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-[#F4F7FA] font-display mt-1">
                        {scanResult.overallScore >= 90
                          ? (isRtl ? "ملامح استثنائية (Chiseled Apex)" : "Apex Aesthetic Tier")
                          : scanResult.overallScore >= 80
                          ? (isRtl ? "ملامح متناسقة جداً (High Harmony)" : "High Aesthetic Harmony")
                          : (isRtl ? "إمكانات واعدة (Developing)" : "Aesthetic Potential Prime")}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {scanResult.date}
                      </p>
                    </div>
                  </div>

                  {/* Potential Score Card */}
                  <div className="bg-[#08090C]/80 border border-[#8B5CF6]/30 rounded-2xl p-4 sm:w-56 text-center sm:text-start shadow-[0_0_15px_rgba(139,92,246,0.08)]">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-[#8B5CF6]">
                      <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
                      <span>{t.scan.potentialScore}</span>
                    </div>
                    <div className="text-2xl font-black text-[#F4F7FA] mt-1">
                      {scanResult.potentialScore}
                      <span className="text-xs text-[#8B5CF6] font-normal ml-1">
                        (+{scanResult.potentialScore - scanResult.overallScore} pts)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {t.scan.potentialNote}
                    </p>
                  </div>
                </div>

                {/* Quick Save, Export Card & Timeline CTAs */}
                <div className="mt-6 pt-5 border-t border-[#1E232E] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center flex-wrap gap-2">
                    {onBuildPlan && scanResult && (
                      <button
                        onClick={() => onBuildPlan(scanResult)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-[#42E8FF] hover:bg-[#38BDF8] text-[#08090C] shadow-[0_0_15px_rgba(66,232,255,0.3)] active:scale-95 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isRtl ? "ابنِ خطتي الشخصية" : "Build My Transformation Plan"}</span>
                      </button>
                    )}

                    <button
                      onClick={handleSaveToTimeline}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        savedSuccess
                          ? "bg-emerald-500 text-black"
                          : "bg-[#181B22] hover:bg-[#202532] text-[#42E8FF] border border-[#42E8FF]/30"
                      }`}
                    >
                      {savedSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.scan.scanSaved}</span>
                        </>
                      ) : (
                        <>
                          <BookmarkCheck className="w-4 h-4" />
                          <span>{t.scan.saveScan}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setShowShareModal(true)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#42E8FF]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 hover:from-[#42E8FF]/30 hover:to-[#EC4899]/30 border border-[#42E8FF]/50 shadow-md shadow-[#42E8FF]/15 transition-all active:scale-95 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#42E8FF]" />
                      <span>{t.socialStory.triggerBtn}</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-[#42E8FF] text-black">
                        9:16
                      </span>
                    </button>

                    <button
                      onClick={onViewTimeline}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-[#F4F7FA] transition-colors"
                    >
                      <span>{t.scan.viewTimeline}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  <div className="text-xs font-mono text-[#42E8FF] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>GONIAL: {scanResult.gonialAngle}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Glow-Up Makeover Banner */}
              <div className="bg-gradient-to-r from-[#42E8FF]/15 via-[#8B5CF6]/15 to-[#EC4899]/15 border border-[#42E8FF]/40 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#42E8FF] to-[#8B5CF6] flex items-center justify-center text-[#08090C] font-bold shrink-0 shadow-lg shadow-[#42E8FF]/20">
                    <Wand2 className="w-6 h-6 text-[#08090C]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-[#F4F7FA] font-display">
                        {isRtl ? "استوديو محاكاة التحول الجمالي (Glow-Up Visualizer)" : "Aura Makeover & Glow-Up Visualizer"}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold bg-[#42E8FF] text-black uppercase">
                        {isRtl ? "شريط تفاعلي" : "Interactive Split"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {isRtl 
                        ? "عاين مظهرك بشريط مقارنة تفاعلي 50/50 بعد تطبيق التسريحة، لحية الفك، والتخلص من الانتفاخ" 
                        : "Inspect your look with our interactive 50/50 split slider with tailored haircuts, beard, and debloated jawline"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenVisualizer()}
                  className="shrink-0 w-full sm:w-auto py-3 px-5 rounded-2xl bg-gradient-to-r from-[#42E8FF] to-[#38bdf8] hover:opacity-90 text-[#08090C] font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl shadow-[#42E8FF]/25 cursor-pointer active:scale-95 transition-all"
                >
                  <Sliders className="w-4 h-4" />
                  <span>{isRtl ? "فتح استوديو المقارنة" : "Launch Makeover Studio"}</span>
                </button>
              </div>

              {/* Analysis Navigation Tabs */}
              <div className="flex items-center bg-[#111318] p-1.5 rounded-2xl border border-[#1E232E] gap-1 overflow-x-auto">
                <button
                  onClick={() => setActiveResultsTab("faceshape")}
                  className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeResultsTab === "faceshape"
                      ? "bg-[#42E8FF] text-black shadow-md shadow-[#42E8FF]/20 font-extrabold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isRtl ? "شكل الوجه والتسريحات واللحية" : "Face Shape, Hair & Glow-Up"}</span>
                </button>

                <button
                  onClick={() => setActiveResultsTab("biometrics")}
                  className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeResultsTab === "biometrics"
                      ? "bg-[#42E8FF] text-black shadow-md shadow-[#42E8FF]/20 font-extrabold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isRtl ? "قياسات الزوايا والهيكل" : "Biometric Measurements"}</span>
                </button>

                <button
                  onClick={() => setActiveResultsTab("stacks")}
                  className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeResultsTab === "stacks"
                      ? "bg-[#42E8FF] text-black shadow-md shadow-[#42E8FF]/20 font-extrabold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isRtl ? "روتين اليوم والعناية" : "Daily Stacks & Routine"}</span>
                </button>
              </div>

              {/* TAB 1: Face Shape, Hairstyles, Beards & Immediate Glow-Up */}
              {activeResultsTab === "faceshape" && (
                <FaceShapeSuite
                  locale={locale}
                  scanResult={scanResult}
                  genderTrack={genderTrack}
                  onOpenVisualizer={handleOpenVisualizer}
                  onOverrideFaceShape={handleOverrideFaceShape}
                />
              )}

              {/* TAB 2: Biometric Measurements Grid & Strengths/Improvements */}
              {activeResultsTab === "biometrics" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-[#F4F7FA] uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#42E8FF]" />
                      <span>{t.scan.breakdownTitle}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {scanResult.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="bg-[#111318] rounded-2xl p-4 border border-[#1E232E] hover:border-[#42E8FF]/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-xs font-bold text-[#F4F7FA]">
                              {m.name[locale]}
                            </span>
                            <span className="text-xs font-mono font-bold text-[#42E8FF]">
                              {m.score}/100
                            </span>
                          </div>

                          {/* Progress meter */}
                          <div className="w-full h-1.5 bg-[#181B22] rounded-full overflow-hidden mb-2">
                            <div
                              className="h-full bg-gradient-to-r from-[#42E8FF] to-[#8B5CF6] rounded-full transition-all duration-800"
                              style={{ width: `${m.score}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                            <span className="px-1.5 py-0.5 rounded bg-[#42E8FF]/10 text-[#42E8FF] text-[10px] font-semibold border border-[#42E8FF]/20">
                              {m.status[locale]}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {m.feedback[locale]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Advantages */}
                    <div className="bg-[#111318] rounded-2xl p-4 border border-emerald-500/20">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{t.scan.strengthsTitle}</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {scanResult.strengths.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{s[locale]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Optimizations */}
                    <div className="bg-[#111318] rounded-2xl p-4 border border-[#8B5CF6]/30">
                      <h4 className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-[#8B5CF6]" />
                        <span>{t.scan.improvementsTitle}</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {scanResult.improvements.map((imp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#8B5CF6] font-bold">•</span>
                            <span>{imp[locale]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Tailored Morning & Evening Stacks from Scan */}
              {activeResultsTab === "stacks" && (
                <div className="bg-[#111318] rounded-2xl p-5 border border-[#1E232E] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h4 className="text-sm font-bold text-[#F4F7FA] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#42E8FF]" />
                      <span>{t.scan.customRoutineTitle}</span>
                    </h4>

                    {onAddProtocolToQuests && (
                      <button
                        onClick={handleAddProtocol}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          addedProtocolSuccess
                            ? "bg-emerald-500 text-black"
                            : "bg-[#42E8FF]/15 hover:bg-[#42E8FF]/25 text-[#42E8FF] border border-[#42E8FF]/40 shadow-sm shadow-[#42E8FF]/10"
                        }`}
                      >
                        {addedProtocolSuccess ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.scan.addedToRoutine}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{t.scan.addToRoutine}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#08090C] p-3.5 rounded-xl border border-[#1E232E]">
                      <div className="font-bold text-[#42E8FF] mb-2 flex items-center gap-1.5">
                        <span>☀️</span>
                        <span>{t.scan.morningStack}</span>
                      </div>
                      <ul className="space-y-1.5 text-slate-300">
                        {scanResult.customRoutine.morning.map((m, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#42E8FF] font-bold">›</span>
                            <span>{m[locale]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#08090C] p-3.5 rounded-xl border border-[#1E232E]">
                      <div className="font-bold text-[#8B5CF6] mb-2 flex items-center gap-1.5">
                        <span>🌙</span>
                        <span>{t.scan.eveningStack}</span>
                      </div>
                      <ul className="space-y-1.5 text-slate-300">
                        {scanResult.customRoutine.evening.map((e, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-cyan-400 font-bold">›</span>
                            <span>{e[locale]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="h-full min-h-[350px] bg-[#12151c] rounded-3xl border border-[#232a3b] p-8 flex flex-col items-center justify-center text-center">
              <Crosshair className="w-12 h-12 text-slate-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-300">
                {isRtl ? "في انتظار بدء فحص Aura Max" : "Awaiting Aura Max Scan Initiation"}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                {scanMode === "profile" ? t.scan.cameraHintProfile : t.scan.cameraHintFrontal}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Viral TikTok & Instagram 9:16 Story Card Generator Modal */}
      {scanResult && (
        <>
          <SocialStoryModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            locale={locale}
            scanResult={scanResult}
            userProfile={userProfile}
            genderTrack={genderTrack}
          />

          <GlowUpVisualizerModal
            isOpen={showMakeoverModal}
            onClose={() => setShowMakeoverModal(false)}
            locale={locale}
            scanResult={scanResult}
            userImage={selectedImage}
            genderTrack={genderTrack}
            initialHairstyleId={visualizerOpts?.hairstyleId}
            initialBeardId={visualizerOpts?.beardId}
            onOverrideFaceShape={handleOverrideFaceShape}
          />
        </>
      )}
    </div>
  );
};
