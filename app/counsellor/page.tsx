"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import { callCounsellor } from "@/lib/api";
import type { University } from "@/lib/types";
import Link from "next/link";

export default function CounsellorPage() {
    const router = useRouter();
    const { userProfile, currentStage, counsellorResponse, setCounsellorResponse } = useAppContext();

    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userProfile) {
            router.push("/onboarding");
        }
    }, [userProfile, router]);

    if (!userProfile) {
        return null;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await callCounsellor({
                user_profile: userProfile,
                current_stage: currentStage,
                shortlisted_universities: [],
                locked_university: null,
            });

            setCounsellorResponse(response);
            setQuestion("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to get response from counsellor");
        } finally {
            setIsLoading(false);
        }
    };

    const groupedRecommendations = counsellorResponse?.recommendations?.reduce(
        (acc, uni) => {
            if (!acc[uni.category]) acc[uni.category] = [];
            acc[uni.category].push(uni);
            return acc;
        },
        {} as Record<string, University[]>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 text-stone-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-stone-200/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-lg font-semibold tracking-tight text-stone-900">
                        AI Counsellor
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Header */}
                        <div className="mb-12 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200/80 text-xs font-medium text-stone-600 mb-6 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                AI Counsellor Active
                            </div>
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-4">
                                Your AI Counsellor
                            </h1>
                            <p className="text-lg text-stone-600">
                                Ask questions and get personalized university recommendations.
                            </p>
                        </div>

                        {/* Input Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            onSubmit={handleSubmit}
                            className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-6 md:p-8 shadow-lg shadow-stone-200/50 mb-8"
                        >
                            <div className="flex flex-col gap-4">
                                <textarea
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Ask me anything about your study abroad journey..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all resize-none"
                                    disabled={isLoading}
                                />
                                <motion.button
                                    type="submit"
                                    disabled={isLoading || !question.trim()}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                    className="self-end px-8 py-3 text-base font-medium bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all duration-300 hover:shadow-lg hover:shadow-stone-900/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:y-0"
                                >
                                    {isLoading ? "Thinking..." : "Ask Counsellor"}
                                </motion.button>
                            </div>
                        </motion.form>

                        {/* Error State */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-xs">!</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-red-900 mb-1">Error</h3>
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Response Section */}
                        {counsellorResponse && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-8"
                            >
                                {/* AI Message */}
                                <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm font-semibold">AI</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-stone-900 mb-2">Counsellor Response</h3>
                                            <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                                                {counsellorResponse.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* University Recommendations */}
                                {counsellorResponse.recommendations && counsellorResponse.recommendations.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-semibold text-stone-900 mb-6">
                                            University Recommendations
                                        </h2>
                                        <div className="space-y-6">
                                            {["Dream", "Target", "Safe"].map((category) => {
                                                const universities = groupedRecommendations?.[category];
                                                if (!universities || universities.length === 0) return null;

                                                const categoryColors = {
                                                    Dream: "bg-violet-100 border-violet-200 text-violet-900",
                                                    Target: "bg-blue-100 border-blue-200 text-blue-900",
                                                    Safe: "bg-emerald-100 border-emerald-200 text-emerald-900",
                                                };

                                                return (
                                                    <div key={category}>
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[category as keyof typeof categoryColors]}`}
                                                            >
                                                                {category}
                                                            </span>
                                                            <span className="text-sm text-stone-500">
                                                                {universities.length} {universities.length === 1 ? "university" : "universities"}
                                                            </span>
                                                        </div>
                                                        <div className="grid gap-4">
                                                            {universities.map((uni, idx) => (
                                                                <motion.div
                                                                    key={idx}
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                                                    className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-xl p-6 hover:bg-white/80 hover:border-stone-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50"
                                                                >
                                                                    <div className="flex justify-between items-start mb-3">
                                                                        <h3 className="text-lg font-semibold text-stone-900">{uni.name}</h3>
                                                                        {uni.acceptance_probability && (
                                                                            <span className="text-sm font-medium text-stone-600">
                                                                                {Math.round(uni.acceptance_probability * 100)}% match
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-4 text-sm text-stone-600">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="font-medium">Country:</span>
                                                                            <span>{uni.country}</span>
                                                                        </div>
                                                                        {uni.tuition_fee && (
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-medium">Tuition:</span>
                                                                                <span>${uni.tuition_fee.toLocaleString()}/year</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Empty State */}
                        {!counsellorResponse && !isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-center py-16"
                            >
                                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">💬</span>
                                </div>
                                <h3 className="text-lg font-semibold text-stone-900 mb-2">No conversation yet</h3>
                                <p className="text-stone-600">
                                    Ask a question above to get started with your AI counsellor.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
