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

        const fetchRecommendations = async () => {
            if (!userProfile.profile_complete) {
                console.log("Dashboard: Profile incomplete, skipping recommendations fetch");
                setError("Please complete your onboarding to see university recommendations.");
                return;
            }

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

                let universitiesArray: any[] = [];

                if (Array.isArray(response)) {
                    universitiesArray = response;
                } else if (response && Array.isArray(response.recommendations)) {
                    universitiesArray = response.recommendations;
                } else if (response && Array.isArray(response.universities)) {
                    universitiesArray = response.universities;
                } else if (response && response.matches) {
                    universitiesArray = [
                        ...(response.matches.dream || []),
                        ...(response.matches.target || []),
                        ...(response.matches.safe || [])
                    ];
                }

                setRecommendations(universitiesArray);

            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Failed to load university recommendations.";
                console.error("Dashboard: Failed to fetch recommendations:", errorMessage);
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [userProfile, currentStage, recommendations.length, router, setRecommendations]);

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
        <div className="min-h-screen bg-white text-neutral-900">
            {/* Header - Editorial */}
            <div className="border-b border-neutral-200 bg-white sticky top-0 z-40">
                <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="label-editorial mb-2">Control Room</p>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                {userProfile.name}
                            </h1>
                        </div>
                        <Link
                            href="/profile"
                            className="btn-editorial-outline"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>

            <main className="max-w-screen-2xl mx-auto px-8 md:px-16 py-16">
                {/* Stats Overview - Minimal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-3 gap-px bg-neutral-200 mb-16"
                >
                    <div className="bg-white p-12">
                        <p className="label-editorial mb-4">Current Stage</p>
                        <p className="text-3xl font-bold">
                            {currentStage === "ONBOARDING" && "Building Profile"}
                            {currentStage === "DISCOVERY" && "Discovering"}
                            {currentStage === "SHORTLIST" && "Finalizing"}
                            {currentStage === "LOCKED" && "Preparing"}
                        </p>
                    </div>
                    <div className="bg-white p-12">
                        <p className="label-editorial mb-4">Universities</p>
                        <p className="stat-editorial">{recommendations.length}</p>
                    </div>
                    <div className="bg-white p-12">
                        <p className="label-editorial mb-4">Tasks</p>
                        <p className="stat-editorial">{todoList?.length || 0}</p>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left Column */}
                    <div className="space-y-16">
                        {/* Profile Summary - Editorial */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <p className="label-editorial mb-6">Profile Overview</p>
                            <div className="space-y-6 border-t border-neutral-200 pt-6">
                                {userProfile.degree && userProfile.field_of_study && (
                                    <div>
                                        <p className="text-sm text-neutral-500 mb-1">Education</p>
                                        <p className="text-xl font-medium">{userProfile.degree} in {userProfile.field_of_study}</p>
                                    </div>
                                )}
                                {userProfile.target_intake_year && (
                                    <div>
                                        <p className="text-sm text-neutral-500 mb-1">Target Intake</p>
                                        <p className="text-xl font-medium">{userProfile.target_intake_year}</p>
                                    </div>
                                )}
                                {userProfile.preferred_countries && userProfile.preferred_countries.length > 0 && (
                                    <div>
                                        <p className="text-sm text-neutral-500 mb-1">Preferred Countries</p>
                                        <p className="text-xl font-medium">{userProfile.preferred_countries.join(", ")}</p>
                                    </div>
                                )}
                                {userProfile.budget_per_year && userProfile.budget_per_year > 0 && (
                                    <div>
                                        <p className="text-sm text-neutral-500 mb-1">Budget</p>
                                        <p className="text-xl font-medium">${userProfile.budget_per_year.toLocaleString()}/year</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Profile Strength - Qualitative */}
                        <ErrorBoundary componentName="Profile Strength">
                            <ProfileStrengthCard email={userProfile.email} />
                        </ErrorBoundary>

                        {/* Stage Progress */}
                        <StageIndicator currentStage={currentStage} />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-16">
                        {/* AI Tasks - Editorial Checklist */}
                        <ErrorBoundary componentName="Task List">
                            <TaskList tasks={todoList ?? []} showStageFilter={false} />
                        </ErrorBoundary>

                        {/* Universities - Minimal Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <p className="label-editorial">Recommended Universities</p>
                                {recommendations.length > 5 && (
                                    <Link
                                        href="/universities"
                                        className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                                    >
                                        View All ({recommendations.length}) →
                                    </Link>
                                )}
                            </div>

                            {isLoading && (
                                <div className="border border-neutral-200 p-16 text-center">
                                    <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-neutral-600">Loading recommendations...</p>
                                </div>
                            )}

                            {error && !isLoading && (
                                <div className="border border-red-200 bg-red-50 p-8 text-center">
                                    <p className="text-red-900">{error}</p>
                                </div>
                            )}

                            {!isLoading && !error && recommendations.length > 0 && (
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

                            {!isLoading && !error && recommendations.length === 0 && (
                                <div className="border border-neutral-200 p-12 text-center">
                                    <p className="text-neutral-600">No recommendations yet.</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>

            {isLockModalOpen && universityToLock && (
                <LockUniversityModal
                    university={universityToLock}
                    isOpen={true} // Modal is conditionally rendered, so it's always open when rendered
                    onConfirm={handleLockConfirm}
                    onClose={handleLockCancel}
                />
            )}
        </div>
    );
}
