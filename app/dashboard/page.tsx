"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import { callCounsellor } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const router = useRouter();
    const { userProfile, currentStage, recommendations, setRecommendations } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userProfile) {
            router.push("/onboarding");
            return;
        }

        // Auto-fetch universities on dashboard load
        const fetchRecommendations = async () => {
            // Skip if we already have recommendations
            if (recommendations.length > 0) {
                console.log("Using cached recommendations:", recommendations);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const payload = {
                    user_profile: {
                        name: userProfile.name,
                        email: userProfile.email,
                        gpa: userProfile.gpa,
                        budget_per_year: userProfile.budget_per_year,
                        preferred_countries: userProfile.preferred_countries,
                    },
                    current_stage: currentStage,
                    shortlisted_universities: [],
                    locked_university: null,
                };

                console.log("Dashboard: Fetching university recommendations...");
                const response = await callCounsellor(payload);
                console.log("Dashboard: Universities received:", response.recommendations);

                if (response.recommendations) {
                    setRecommendations(response.recommendations);
                }
            } catch (err) {
                console.error("Dashboard: Failed to fetch recommendations:", err);
                setError("Failed to load university recommendations. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [userProfile, currentStage, recommendations.length, router, setRecommendations]);

    if (!userProfile) {
        return null;
    }

    const stageConfig = {
        ONBOARDING: { label: "Onboarding", color: "bg-stone-500" },
        DISCOVERY: { label: "Discovery", color: "bg-blue-500" },
        SHORTLIST: { label: "Shortlist", color: "bg-amber-500" },
        LOCKED: { label: "Locked", color: "bg-purple-500" },
        APPLICATION: { label: "Application", color: "bg-emerald-500" },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 text-stone-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-stone-200/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-lg font-semibold tracking-tight text-stone-900">
                        AI Counsellor
                    </Link>
                    <Link
                        href="/onboarding"
                        className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200"
                    >
                        Edit Profile
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Header */}
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-4">
                                Welcome back, {userProfile.name}
                            </h1>
                            <p className="text-lg text-stone-600">
                                Your personalized study-abroad guidance dashboard.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {/* Profile Summary Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50"
                            >
                                <h2 className="text-xl font-semibold text-stone-900 mb-6">Profile Summary</h2>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm font-medium text-stone-500 mb-1">Email</div>
                                        <div className="text-base text-stone-900">{userProfile.email}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-stone-500 mb-1">GPA</div>
                                        <div className="text-base text-stone-900">{userProfile.gpa}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-stone-500 mb-1">Budget</div>
                                        <div className="text-base text-stone-900">
                                            ${userProfile.budget_per_year?.toLocaleString() || 'N/A'} USD/year
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-stone-500 mb-1">Preferred Countries</div>
                                        <div className="text-base text-stone-900">{userProfile.preferred_countries?.join(', ') || 'N/A'}</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Current Stage Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50"
                            >
                                <h2 className="text-xl font-semibold text-stone-900 mb-6">Current Stage</h2>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-3 h-3 rounded-full ${stageConfig[currentStage].color}`}></div>
                                    <div className="text-2xl font-semibold text-stone-900">
                                        {stageConfig[currentStage].label}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {Object.entries(stageConfig).map(([stage, config]) => (
                                        <div key={stage} className="flex items-center gap-3">
                                            <div
                                                className={`w-2 h-2 rounded-full ${stage === currentStage ? config.color : "bg-stone-300"
                                                    }`}
                                            ></div>
                                            <div
                                                className={`text-sm ${stage === currentStage ? "text-stone-900 font-medium" : "text-stone-500"
                                                    }`}
                                            >
                                                {config.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* University Matches Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-semibold text-stone-900 mb-6">
                                University Matches {recommendations.length > 0 && `(${recommendations.length})`}
                            </h2>

                            {/* Loading State */}
                            {isLoading && (
                                <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-12 text-center shadow-lg shadow-stone-200/50">
                                    <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-stone-600">Finding your perfect university matches...</p>
                                </div>
                            )}

                            {/* Error State */}
                            {error && !isLoading && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                    <p className="text-red-900 text-center">{error}</p>
                                </div>
                            )}

                            {/* Universities List */}
                            {!isLoading && !error && recommendations.length > 0 && (
                                <div className="space-y-4">
                                    {recommendations.map((uni: any, idx: number) => (
                                        <motion.div
                                            key={uni.id || idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                                            className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-xl p-6 hover:bg-white/80 hover:border-stone-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-stone-900 mb-1">
                                                        {uni.name}
                                                    </h3>
                                                    <p className="text-sm text-stone-600">{uni.country}</p>
                                                </div>
                                                {uni.competitiveness && (
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${uni.competitiveness === "High"
                                                            ? "bg-violet-100 border border-violet-200 text-violet-900"
                                                            : uni.competitiveness === "Medium"
                                                                ? "bg-blue-100 border border-blue-200 text-blue-900"
                                                                : "bg-emerald-100 border border-emerald-200 text-emerald-900"
                                                            }`}
                                                    >
                                                        {uni.competitiveness}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-stone-500 font-medium">Rank:</span>{" "}
                                                    <span className="text-stone-900">
                                                        {uni.rank ? `#${uni.rank}` : "Unranked"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-stone-500 font-medium">Tuition:</span>{" "}
                                                    <span className="text-stone-900">
                                                        {uni.estimated_tuition_usd
                                                            ? `$${uni.estimated_tuition_usd.toLocaleString()}/year`
                                                            : "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Empty State */}
                            {!isLoading && !error && recommendations.length === 0 && (
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
                                    <p className="text-amber-900">
                                        No matches found. Try adjusting your budget or preferred country.
                                    </p>
                                </div>
                            )}
                        </motion.div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-10 md:p-12 text-center shadow-xl shadow-stone-900/20"
                        >
                            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                                Have questions about these universities?
                            </h2>
                            <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
                                Chat with our AI counsellor to get detailed insights, compare options, and refine your choices.
                            </p>
                            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                                <Link
                                    href="/counsellor"
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-white text-stone-900 rounded-full hover:bg-stone-100 transition-all duration-300 hover:shadow-xl hover:shadow-white/20"
                                >
                                    Talk to AI Counsellor
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
