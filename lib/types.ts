// Production-grade type definitions for AI Counsellor Platform

// ============================================
// STAGE ENUM (STRICT FLOW)
// ============================================
export type Stage = "ONBOARDING" | "DISCOVERY" | "SHORTLIST" | "LOCKED" | "APPLICATION";

// ============================================
// USER PROFILE (EXPANDED)
// ============================================
export interface UserProfile {
  // Personal
  name: string;
  email: string;

  // Academic Background
  education_level?: "Undergraduate" | "Graduate" | "Postgraduate";
  degree?: string;
  major?: string;
  graduation_year?: number;
  gpa?: number;

  // Study Goals
  intended_degree?: string;
  field_of_study?: string;
  target_intake_year?: number;
  preferred_countries: string[]; // Multi-select

  // Budget
  budget_per_year: number;
  funding_plan?: "Self" | "Scholarship" | "Loan" | "Mixed";

  // Exams & Readiness
  ielts_status?: "Not Started" | "In Progress" | "Completed";
  ielts_score?: number;
  gre_status?: "Not Started" | "In Progress" | "Completed";
  gre_score?: number;
  sop_status?: "Not Started" | "Draft" | "Ready";

  // Metadata
  profile_complete: boolean;
  profile_strength?: ProfileStrength;
}

// ============================================
// PROFILE STRENGTH
// ============================================
export interface ProfileStrength {
  academics: "Strong" | "Average" | "Weak";
  exams: "Not Started" | "In Progress" | "Completed";
  sop: "Not Started" | "Draft" | "Ready";
}

// ============================================
// UNIVERSITY (ENHANCED)
// ============================================
export interface University {
  id: number;
  name: string;
  country: string;
  rank?: number;

  // Categorization
  category?: "Dream" | "Target" | "Safe";
  cost_level?: "Low" | "Medium" | "High";
  competitiveness?: "High" | "Medium" | "Low";

  // Financial
  estimated_tuition_usd: number;

  // Fit Analysis
  acceptance_chance?: number; // 0-100
  why_it_fits?: string;
  risks?: string;

  // Additional fields from backend
  [key: string]: any;
}

// ============================================
// TO-DO ITEM
// ============================================
export interface TodoItem {
  id: string;
  task: string;
  description?: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  stage: Stage;
  created_at: Date;
}

// ============================================
// API PAYLOADS
// ============================================
export interface CounsellorPayload {
  user_profile: UserProfile;
  current_stage: Stage;
  shortlisted_universities: number[]; // University IDs
  locked_university: number | null; // University ID
}

export interface CounsellorResponse {
  message: string;
  next_stage?: Stage;
  missing_fields?: string[];
  recommendations?: University[];
  tasks?: TodoItem[];
  profile_strength?: ProfileStrength;
}

// ============================================
// STAGE ACCESS RULES
// ============================================
export const STAGE_ORDER: Stage[] = [
  "ONBOARDING",
  "DISCOVERY",
  "SHORTLIST",
  "LOCKED",
  "APPLICATION"
];

export function canAccessStage(currentStage: Stage, targetStage: Stage): boolean {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);
  const targetIndex = STAGE_ORDER.indexOf(targetStage);

  // Can only access current stage or earlier stages
  return targetIndex <= currentIndex;
}

export function getNextStage(currentStage: Stage): Stage | null {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);
  if (currentIndex < STAGE_ORDER.length - 1) {
    return STAGE_ORDER[currentIndex + 1];
  }
  return null;
}
