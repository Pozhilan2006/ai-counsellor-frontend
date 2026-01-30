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
import ProfileSummaryCard from "@/components/ProfileSummaryCard";
import TaskList from "@/components/TaskList";
import StageIndicator from "@/components/StageIndicator";
import ErrorBoundary from "@/components/ErrorBoundary";
import type { University } from "@/lib/types";

export default function DashboardPage() {
    const router = useRouter();
    const { userProfile, currentStage, recommendations, setRecommendations, lockUniversity, todoList } = useAppContext();
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
                console.log("Dashboard: Full API response:", response);
                console.log("Dashboard: Response type:", typeof response);
                console.log("Dashboard: Response keys:", Object.keys(response || {}));

                // CRITICAL: Check actual response structure
                let universitiesArray: any[] = [];

                if (Array.isArray(response)) {
                    // Response is directly an array
                    universitiesArray = response;
                    console.log("Dashboard: Response is direct array, length:", universitiesArray.length);
                } else if (response && Array.isArray(response.recommendations)) {
                    // Response has recommendations key
                    universitiesArray = response.recommendations;
                    console.log("Dashboard: Found response.recommendations, length:", universitiesArray.length);
                } else if (response && Array.isArray(response.universities)) {
                    // Response has universities key
                    universitiesArray = response.universities;
                    console.log("Dashboard: Found response.universities, length:", universitiesArray.length);
                } else if (response && response.matches) {
                    // Response has matches object with dream/target/safe
                    universitiesArray = [
                        ...(response.matches.dream || []),
                        ...(response.matches.target || []),
                        ...(response.matches.safe || [])
                    ];
                    console.log("Dashboard: Found response.matches, total length:", universitiesArray.length);
                } else {
                    console.warn("Dashboard: Unknown response structure", response);
                }

                console.log("Dashboard: Setting recommendations array with length:", universitiesArray.length);
                setRecommendations(universitiesArray);

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 text-stone-900 pb-20">
            <main className="pt-6 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 mb-2">
                            Welcome back, {userProfile.name}
                        </h1>
                        <p className="text-stone-600">
                            Your personalized study-abroad guidance dashboard.
                        </p>
                    </motion.div>

                    {/* Main Grid Layout */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Context & Status */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* SECTION A: Profile Summary */}
                            <ProfileSummaryCard profile={userProfile} />

                            {/* SECTION C: Current Stage */}
                            <StageIndicator currentStage={currentStage} />
                        </div>

                        {/* Middle Column - Strength & Tasks */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* SECTION B: Profile Strength */}
                            <ErrorBoundary componentName="Profile Strength">
                                <ProfileStrengthCard email={userProfile.email} />
                            </ErrorBoundary>

                            {/* SECTION D: AI To-Do List */}
                            <ErrorBoundary componentName="Task List">
                                <TaskList tasks={todoList ?? []} showStageFilter={false} />
                            </ErrorBoundary>
                        </div>

                        {/* Right Column - Universities */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
                                {!isLoading && !error && Array.isArray(recommendations) && recommendations.length > 0 && (
                                    <div className="space-y-4">
                                        {recommendations.slice(0, 5).map((uni: any, idx: number) => (
                                            <ErrorBoundary key={uni?.id || idx} componentName="University Card">
                                                <UniversityCard
                                                    university={uni}
                                                    index={idx}
                                                    showActions={true}
                                                    onLockClick={handleLockClick}
                                                />
                                            </ErrorBoundary>
                                        ))}
                                    </div>
                                )}

                                {/* Empty State - ONLY if backend returns empty */}
                                {!isLoading && !error && recommendations.length === 0 && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
                                        <p className="text-amber-900">
                                            No matches found. Try adjusting your budget or preferred country.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Lock University Modal */}
            {isLockModalOpen && universityToLock && (
                <LockUniversityModal
                    university={universityToLock}
                    onConfirm={handleLockConfirm}
                    onClose={handleLockCancel}
                />
            )}
        </div>
    );
}
