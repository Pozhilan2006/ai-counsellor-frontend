// TypeScript types for AI Counsellor application

export type Stage = "ONBOARDING" | "DISCOVERY" | "SHORTLIST" | "APPLICATION";

export interface UserProfile {
  name: string;
  email: string;
  academic_score: number;
  budget: number;
  preferred_country: string;
}

export interface University {
  name: string;
  country: string;
  category: "Dream" | "Target" | "Safe";
  acceptance_probability?: number;
  tuition_fee?: number;
}

export interface CounsellorPayload {
  user_profile: UserProfile;
  current_stage: Stage;
  shortlisted_universities: string[];
  locked_university: string | null;
}

export interface CounsellorResponse {
  message: string;
  recommendations?: University[];
  next_stage?: Stage;
  error?: string;
}
