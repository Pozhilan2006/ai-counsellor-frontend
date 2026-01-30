"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProfileStrength } from "@/lib/api";
import Link from "next/link";

interface ProfileStrengthCardProps {
    email: string;
}

interface ProfileStrengthData {
    completion_score: number;
    academics: {
        status: string;
        score?: number;
    };
    exams: {
        status: string;
        score?: number;
    };
    sop: {
        status: string;
        score?: number;
    };
    documents: {
        status: string;
        score?: number;
    };
    missing_fields?: string[];
}

export default function ProfileStrengthCard({ email }: ProfileStrengthCardProps) {
    const [strengthData, setStrengthData] = useState<ProfileStrengthData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStrength = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getProfileStrength(email);
                setStrengthData(data);
            } catch (err) {
                console.error("Failed to fetch profile strength:", err);
                setError("Unable to calculate right now");
            } finally {
                setIsLoading(false);
            }
        };

        if (email) {
            fetchStrength();
        }
    }, [email]);

    const getStatusColor = (status?: string) => {
        const statusLower = status?.toLowerCase() ?? "unknown";
        switch (statusLower) {
            case "strong":
            case "completed":
            case "ready":
                return "text-emerald-700 bg-emerald-100 border-emerald-200";
            case "average":
            case "in progress":
            case "drafting":
            case "draft":
                return "text-amber-700 bg-amber-100 border-amber-200";
            case "weak":
            case "not started":
            case "incomplete":
                return "text-red-700 bg-red-100 border-red-200";
            default:
                return "text-stone-700 bg-stone-100 border-stone-200";
        }
    };

    const getProgressWidth = (status?: string, score?: number) => {
        if (score !== undefined) return `${score}%`;

        const statusLower = status?.toLowerCase() ?? "unknown";
        switch (statusLower) {
            case "strong":
            case "completed":
            case "ready":
                return "100%";
            case "average":
            case "in progress":
            case "drafting":
            case "draft":
                return "66%";
            case "weak":
            case "not started":
            case "incomplete":
                return "33%";
            default:
                return "0%";
        }
    };

    const getProgressColor = (status?: string) => {
        const statusLower = status?.toLowerCase() ?? "unknown";
        switch (statusLower) {
            case "strong":
            case "completed":
            case "ready":
                return "bg-emerald-500";
            case "average":
            case "in progress":
            case "drafting":
            case "draft":
                return "bg-amber-500";
            case "weak":
            case "not started":
            case "incomplete":
                return "bg-red-500";
            default:
                return "bg-stone-400";
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50">
                <h2 className="text-xl font-semibold text-stone-900 mb-6">Profile Strength</h2>
                <div className="text-center py-8 text-stone-600">
                    <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sm">Loading profile strength...</p>
                </div>
            </div>
        );
    }

    if (error || !strengthData) {
        return (
            <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50">
                <h2 className="text-xl font-semibold text-stone-900 mb-6">Profile Strength</h2>
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-center">
                    <p className="text-stone-600">{error || "Unable to calculate right now"}</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50"
        >
            <h2 className="text-xl font-semibold text-stone-900 mb-6">Profile Strength</h2>

            {/* Overall Completion Score */}
            <div className="mb-6 pb-6 border-b border-stone-200">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-stone-700">Overall Completeness</span>
                    <span className="text-2xl font-semibold text-stone-900">{strengthData?.completion_score ?? 0}%</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-4 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${strengthData?.completion_score ?? 0}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-4 rounded-full ${(strengthData?.completion_score ?? 0) >= 80
                                ? "bg-emerald-500"
                                : (strengthData?.completion_score ?? 0) >= 50
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                            }`}
                    ></motion.div>
                </div>
                {strengthData?.missing_fields && strengthData.missing_fields.length > 0 && (
                    <div className="mt-3">
                        <p className="text-xs font-medium text-stone-600 mb-2">Missing:</p>
                        <div className="flex flex-wrap gap-2">
                            {strengthData.missing_fields.map((field) => (
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

            <div className="space-y-4">
                {/* Academics */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-stone-700">Academics</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                strengthData?.academics?.status
                            )}`}
                        >
                            {strengthData?.academics?.status ?? "Unknown"}
                        </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: getProgressWidth(strengthData?.academics?.status, strengthData?.academics?.score) }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className={`h-2 rounded-full ${getProgressColor(strengthData?.academics?.status)}`}
                        ></motion.div>
                    </div>
                </div>

                {/* Exams */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-stone-700">Exams</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                strengthData?.exams?.status
                            )}`}
                        >
                            {strengthData?.exams?.status ?? "Unknown"}
                        </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: getProgressWidth(strengthData?.exams?.status, strengthData?.exams?.score) }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className={`h-2 rounded-full ${getProgressColor(strengthData?.exams?.status)}`}
                        ></motion.div>
                    </div>
                </div>

                {/* SOP */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-stone-700">Statement of Purpose</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                strengthData?.sop?.status
                            )}`}
                        >
                            {strengthData?.sop?.status ?? "Unknown"}
                        </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: getProgressWidth(strengthData?.sop?.status, strengthData?.sop?.score) }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className={`h-2 rounded-full ${getProgressColor(strengthData?.sop?.status)}`}
                        ></motion.div>
                    </div>
                </div>

                {/* Documents */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-stone-700">Documents</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                strengthData?.documents?.status
                            )}`}
                        >
                            {strengthData?.documents?.status ?? "Unknown"}
                        </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: getProgressWidth(strengthData?.documents?.status, strengthData?.documents?.score) }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className={`h-2 rounded-full ${getProgressColor(strengthData?.documents?.status)}`}
                        ></motion.div>
                    </div>
                </div>
            </div>

            {/* Helper CTAs */}
            <div className="mt-6 pt-6 border-t border-stone-200 space-y-2">
                <Link
                    href="/documents"
                    className="block w-full text-center px-4 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 hover:border-stone-300 transition-all duration-200"
                >
                    📁 View Vault
                </Link>
                <Link
                    href="/sop"
                    className="block w-full text-center px-4 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 hover:border-stone-300 transition-all duration-200"
                >
                    ✍️ Complete SOP
                </Link>
            </div>

            {/* Overall Assessment */}
            <div className="mt-6 pt-6 border-t border-stone-200">
                <p className="text-sm text-stone-600">
                    {(strengthData?.completion_score ?? 0) >= 80
                        ? "🎉 Your profile is strong! You're well-prepared for applications."
                        : (strengthData?.completion_score ?? 0) >= 50
                            ? "📈 You're making good progress. Keep working on the remaining items."
                            : "💡 Focus on strengthening your profile before applying."}
                </p>
            </div>
        </motion.div>
    );
}
