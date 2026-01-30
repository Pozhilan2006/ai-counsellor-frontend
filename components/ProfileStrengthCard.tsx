"use client";

import { motion } from "framer-motion";
import type { ProfileStrength } from "@/lib/types";

interface ProfileStrengthCardProps {
    strength: ProfileStrength | null;
    completionScore?: number;
    missingFields?: string[];
}

export default function ProfileStrengthCard({ strength, completionScore, missingFields }: ProfileStrengthCardProps) {
    if (!strength) {
        return (
            <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50">
                <h2 className="text-xl font-semibold text-stone-900 mb-6">Profile Strength</h2>
                <div className="text-center py-8 text-stone-600">
                    <p className="text-sm">Analyzing your profile...</p>
                </div>
            </div>
        );
    }

    const getStrengthColor = (level: string) => {
        switch (level) {
            case "Strong":
                return "text-emerald-700 bg-emerald-100 border-emerald-200";
            case "Average":
                return "text-amber-700 bg-amber-100 border-amber-200";
            case "Weak":
                return "text-red-700 bg-red-100 border-red-200";
            default:
                return "text-stone-700 bg-stone-100 border-stone-200";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "text-emerald-700 bg-emerald-100 border-emerald-200";
            case "In Progress":
                return "text-blue-700 bg-blue-100 border-blue-200";
            case "Not Started":
                return "text-stone-700 bg-stone-100 border-stone-200";
            case "Ready":
                return "text-emerald-700 bg-emerald-100 border-emerald-200";
            case "Draft":
                return "text-amber-700 bg-amber-100 border-amber-200";
            default:
                return "text-stone-700 bg-stone-100 border-stone-200";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50"
        >
            <h2 className="text-xl font-semibold text-stone-900 mb-6">Profile Strength</h2>

            {/* Completion Score */}
            {completionScore !== undefined && (
                <div className="mb-6 pb-6 border-b border-stone-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-stone-700">Profile Completeness</span>
                        <span className="text-lg font-semibold text-stone-900">{completionScore}%</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-3">
                        <div
                            className={`h-3 rounded-full transition-all duration-500 ${completionScore >= 80
                                    ? "bg-emerald-500"
                                    : completionScore >= 50
                                        ? "bg-amber-500"
                                        : "bg-red-500"
                                }`}
                            style={{ width: `${completionScore}%` }}
                        ></div>
                    </div>
                    {missingFields && missingFields.length > 0 && (
                        <div className="mt-3">
                            <p className="text-xs font-medium text-stone-600 mb-2">Missing:</p>
                            <div className="flex flex-wrap gap-2">
                                {missingFields.map((field) => (
                                    <span
                                        key={field}
                                        className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded text-xs"
                                    >
                                        {field}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-4">
                {/* Academics */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-stone-700">Academics</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStrengthColor(
                                strength.academics
                            )}`}
                        >
                            {strength.academics}
                        </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 ${strength.academics === "Strong"
                                ? "bg-emerald-500 w-full"
                                : strength.academics === "Average"
                                    ? "bg-amber-500 w-2/3"
                                    : "bg-red-500 w-1/3"
                                }`}
                        ></div>
                    </div>
                </div>

                {/* Exams */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-stone-700">Exams</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                strength.exams
                            )}`}
                        >
                            {strength.exams}
                        </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 ${strength.exams === "Completed"
                                ? "bg-emerald-500 w-full"
                                : strength.exams === "In Progress"
                                    ? "bg-blue-500 w-2/3"
                                    : "bg-stone-400 w-1/3"
                                }`}
                        ></div>
                    </div>
                </div>

                {/* SOP */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-stone-700">Statement of Purpose</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                strength.sop
                            )}`}
                        >
                            {strength.sop}
                        </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 ${strength.sop === "Ready"
                                ? "bg-emerald-500 w-full"
                                : strength.sop === "Draft"
                                    ? "bg-amber-500 w-2/3"
                                    : "bg-stone-400 w-1/3"
                                }`}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Overall Assessment */}
            <div className="mt-6 pt-6 border-t border-stone-200">
                <p className="text-sm text-stone-600">
                    {strength.academics === "Strong" && strength.exams === "Completed" && strength.sop === "Ready"
                        ? "🎉 Your profile is strong! You're well-prepared for applications."
                        : strength.academics === "Weak" || strength.exams === "Not Started" || strength.sop === "Not Started"
                            ? "💡 Focus on strengthening your profile before applying."
                            : "📈 You're making good progress. Keep working on the remaining items."}
                </p>
            </div>
        </motion.div>
    );
}
