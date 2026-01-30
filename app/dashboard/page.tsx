"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import { getRecommendations } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import UniversityCard from "@/components/UniversityCard";
import LockUniversityModal from "@/components/LockUniversityModal";
import ProfileStrengthCard from "@/components/ProfileStrengthCard";
import TaskList from "@/components/TaskList";
import StageIndicator from "@/components/StageIndicator";
import type { University } from "@/lib/types";

export default function DashboardPage() {
    const router = useRouter();
    const { userProfile, currentStage, recommendations, setRecommendations, lockUniversity, profileStrength, todoList, getTasksByStage } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [universityToLock, setUniversityToLock] = useState<University | null>(null);
    const [isLockModalOpen, setIsLockModalOpen] = useState(false);

    useEffect(() => {
        if (!userProfile) {
            router.push("/onboarding");
            return;
        }

        // Auto-fetch universities on dashboard load
        const fetchRecommendations = async () => {
            // CRITICAL GUARD: Only fetch if profile is complete
            if (!userProfile.profile_complete) {
                console.log("Dashboard: Profile incomplete, skipping recommendations fetch");
                setError("Please complete your onboarding to see university recommendations.");
                return;
            }

            // Skip if we already have recommendations
            if (recommendations.length > 0) {
                console.log("Using cached recommendations:", recommendations);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                console.log("Dashboard: Fetching university recommendations...");
                const response = await getRecommendations(userProfile.email);
                console.log("Dashboard: Universities received:", response);

                if (response.matches) {
                    const allMatches = [
                        ...(response.matches.dream || []),
                        ...(response.matches.target || []),
                        ...(response.matches.safe || [])
                    ];
                    setRecommendations(allMatches);
                } else {
                    setRecommendations([]);
                }

            } catch (err) {
                // Display backend error message verbatim
                const errorMessage = err instanceof Error ? err.message : "Failed to load university recommendations. Please refresh to try again.";
                console.error("Dashboard: Failed to fetch recommendations:", errorMessage);
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [userProfile, currentStage, recommendations.length, router, setRecommendations]);

    // Lock modal handlers
    const handleLockClick = (university: University) => {
        setUniversityToLock(university);
        setIsLockModalOpen(true);
    };

    const handleLockConfirm = () => {
        if (universityToLock) {
            lockUniversity(universityToLock);
            setIsLockModalOpen(false);
            setUniversityToLock(null);
        }
    };

    const handleLockCancel = () => {
        setIsLockModalOpen(false);
        setUniversityToLock(null);
    };

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

                            {/* Stage Indicator */}
                            <StageIndicator currentStage={currentStage} />
                        </div>

                        {/* Profile Strength & Tasks Grid */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <ProfileStrengthCard
                                strength={profileStrength}
                                completionScore={userProfile.completion_score}
                                missingFields={userProfile.missing_fields}
                            />
                            <TaskList tasks={todoList} showStageFilter={false} />
                        </div>

                        {/* University Matches Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="mb-8"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-stone-900">
                                    Recommended Universities
                                </h2>
                                {recommendations.length > 5 && (
                                    <Link
                                        href="/universities"
                                        className="px-4 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 hover:border-stone-300 transition-all duration-200"
                                    >
                                        View All ({recommendations.length})
                                    </Link>
                                )}
                            </div>

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

                            {/* Universities List - Top 5 */}
                            {!isLoading && !error && recommendations.length > 0 && (
                                <div className="space-y-4">
                                    {recommendations.slice(0, 5).map((uni: any, idx: number) => (
                                        <UniversityCard
                                            key={uni.id || idx}
                                            university={uni}
                                            index={idx}
                                            showActions={true}
                                            onLockClick={handleLockClick}
                                        />
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
                    </motion.div >
                </div >
            </main >

            {/* Lock University Modal */}
            < LockUniversityModal
                university={universityToLock}
                isOpen={isLockModalOpen}
                onClose={handleLockCancel}
                onConfirm={handleLockConfirm}
            />
        </div >
    );
}
