export type Locale = "en" | "ar";

export type GenderTrack = "male" | "female";

export type NavTab = "home" | "today" | "scan" | "progress" | "profile" | "coach" | "challenges" | "timeline" | "library";

export type UserGoal = "face" | "skin" | "hair" | "grooming" | "style";
export type TimeBudget = "5m" | "15m" | "30m";
export type BudgetLevel = "free" | "essential" | "optimized";

export interface ScanQuality {
  status: "good" | "fair" | "poor";
  lighting: "optimal" | "acceptable" | "poor";
  faceDetected: boolean;
  pose: "frontal" | "angled" | "profile";
  confidence: number;
  feedback: { en: string; ar: string };
}

export interface TransformationPlan {
  id: string;
  createdAt: string;
  genderTrack: GenderTrack;
  primaryGoal: UserGoal;
  secondaryGoal?: UserGoal;
  timeBudget: TimeBudget;
  budgetLevel: BudgetLevel;
  title: { en: string; ar: string };
  summary: { en: string; ar: string };
  weeklyObjective: { en: string; ar: string };
  prioritizationReason: { en: string; ar: string };
  estimatedDailyMinutes: number;
  dailyMorningQuests: Quest[];
  dailyEveningQuests: Quest[];
  weeklyQuests: Quest[];
  status: "active" | "completed" | "adapted";
}

export interface WeeklyReview {
  weekNumber: number;
  startDate: string;
  endDate: string;
  completedCount: number;
  totalScheduled: number;
  adherenceRate: number; // 0 - 100
  streak: number;
  strongestHabit: { en: string; ar: string };
  skippedHabit?: { en: string; ar: string };
  adaptationNote: { en: string; ar: string };
}

export interface CuratedProduct {
  id: string;
  name: { en: string; ar: string };
  category: "cleanser" | "serum" | "spf" | "retinoid" | "tool" | "hair" | "grooming";
  attributes: string[];
  ingredients: string[];
  priceRange: "$" | "$$" | "$$$";
  priceEstimated: string;
  currency: string;
  targetGoal: UserGoal;
  genderSuitability: "male" | "female" | "both";
  whyItMatches: { en: string; ar: string };
  merchant: string;
  affiliateUrl: string;
  disclosure: { en: string; ar: string };
}

export interface Quest {
  id: string;
  title: { en: string; ar: string };
  category: "morning" | "evening" | "anytime";
  xp: number;
  completed: boolean;
  frequency: "daily" | "weekly";
  description: { en: string; ar: string };
  iconName: string;
  durationMinutes?: number;
  goalCategory?: UserGoal;
  whyItMatters?: { en: string; ar: string };
}

export interface MetricScore {
  name: { en: string; ar: string };
  score: number; // 0-100
  target: number;
  unit?: string;
  status: { en: string; ar: string };
  feedback: { en: string; ar: string };
}

export type FaceShapeType = "oval" | "square" | "round" | "heart" | "diamond" | "oblong";

export interface FaceShapeAnalysis {
  shape: FaceShapeType;
  name: { en: string; ar: string };
  confidence: number;
  description: { en: string; ar: string };
  proportions: {
    lengthToWidthRatio: string;
    foreheadWidth: { en: string; ar: string };
    cheekboneWidth: { en: string; ar: string };
    jawlineWidth: { en: string; ar: string };
  };
  keyBalancingPrinciple: { en: string; ar: string };
}

export interface HairstyleRecommendation {
  id: string;
  name: { en: string; ar: string };
  length: "short" | "medium" | "long";
  idealForGender: "male" | "female" | "unisex";
  whyItWorks: { en: string; ar: string };
  stylingTip: { en: string; ar: string };
  productRecommendation: { en: string; ar: string };
  tag: { en: string; ar: string };
}

export interface BeardRecommendation {
  id: string;
  name: { en: string; ar: string };
  lengthCategory: "stubble" | "short" | "medium" | "sculpted";
  whyItWorks: { en: string; ar: string };
  trimmingGuide: { en: string; ar: string };
  necklineTip: { en: string; ar: string };
  avoidTip: { en: string; ar: string };
  tag: { en: string; ar: string };
}

export interface EyebrowRecommendation {
  id: string;
  name: { en: string; ar: string };
  styleCategory: "arched" | "natural" | "straight" | "feathered";
  whyItWorks: { en: string; ar: string };
  shapingGuide: { en: string; ar: string };
  canthalTiltTip: { en: string; ar: string };
  avoidTip: { en: string; ar: string };
  tag: { en: string; ar: string };
}

export interface GlowUpImmediateTip {
  id: string;
  category: "debloat" | "skin" | "brows" | "posture" | "hair" | "style";
  timeMinutes: number;
  title: { en: string; ar: string };
  instructions: { en: string; ar: string };
  instantBenefit: { en: string; ar: string };
  scienceNote?: { en: string; ar: string };
}

export interface StylesToAvoid {
  menHairstyles: { en: string; ar: string }[];
  womenHairstyles: { en: string; ar: string }[];
  beards: { en: string; ar: string }[];
  eyebrows?: { en: string; ar: string }[];
}

export interface ScanResult {
  id: string;
  date: string;
  overallScore: number;
  potentialScore: number;
  imageUrl?: string;
  gonialAngle: string;
  jawlineScore: number;
  symmetryScore: number;
  skinScore: number;
  canthalTilt: string;
  facialThirds: string;
  metrics: MetricScore[];
  strengths: { en: string; ar: string }[];
  improvements: { en: string; ar: string }[];
  customRoutine: {
    morning: { en: string; ar: string }[];
    evening: { en: string; ar: string }[];
  };
  detectedGender?: "male" | "female";
  faceShape?: FaceShapeAnalysis;
  notes?: { en: string; ar: string };
  maleHairstyles?: HairstyleRecommendation[];
  femaleHairstyles?: HairstyleRecommendation[];
  beardStyles?: BeardRecommendation[];
  eyebrowStyles?: EyebrowRecommendation[];
  stylesToAvoid?: StylesToAvoid;
  immediateGlowUpTips?: GlowUpImmediateTip[];
  visualizedAfterUrl?: string;
  transformationNotes?: { en: string; ar: string }[];
}

export interface CoachMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  source?: "gemini" | "knowledge-base" | "fallback";
}

export interface Challenge {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  durationDays: number;
  currentDay: number;
  participants: number;
  badgeName: string;
  rewardXp: number;
  joined: boolean;
  category: "jawline" | "skin" | "posture" | "lifestyle";
  tasksSummary: { en: string; ar: string };
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  glowScore: number;
  streakDays: number;
  xp: number;
  tier: "Ascended" | "Diamond" | "Platinum" | "Gold";
  isCurrentUser?: boolean;
}

export interface RoutineGuide {
  id: string;
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  category: "jawline" | "skin" | "nutrition" | "hair" | "posture";
  duration: string;
  steps: { title: { en: string; ar: string }; detail: { en: string; ar: string } }[];
  scienceNote: { en: string; ar: string };
}

export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  glowScore: number;
  potentialScore: number;
  scansCount: number;
  joinedDate: string;
  unlockedBadges: string[];
  genderTrack?: GenderTrack;
}
