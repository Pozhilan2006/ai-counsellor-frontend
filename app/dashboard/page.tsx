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
                setError("Please complete your onboarding to see university recommendations.");
                return;
            }

            if (recommendations.length > 0) return;

            setIsLoading(true);
            setError(null);

            try {
                const response = await getRecommendations(userProfile.email);
                let universitiesArray: any[] = [];
                if (Array.isArray(response)) universitiesArray = response;
                else if (response?.recommendations) universitiesArray = response.recommendations;
                else if (response?.universities) universitiesArray = response.universities;
                else if (response?.matches) {
                    universitiesArray = [
                        ...(response.matches.dream || []),
                        ...(response.matches.target || []),
                        ...(response.matches.safe || [])
                    ];
                }
                setRecommendations(universitiesArray);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load recommendations.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [userProfile, recommendations.length, router, setRecommendations]);

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

    if (!userProfile) return null;

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                            {userProfile.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800 leading-none">Welcome back, {userProfile.name}</h1>
                            <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Control Center</p>
                        </div>
                    </div>
                    <Link href="/profile" className="btn-secondary text-sm py-2 px-4 shadow-sm hover:shadow-md">
                        Manage Profile
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN - Profile & Context (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Profile Strength - Primary Focus */}
                        <ProfileStrengthCard email={userProfile.email} />

                        {/* Stage Progress */}
                        <StageIndicator currentStage={currentStage} />

                        {/* Profile Context */}
                        <ProfileSummaryCard profile={userProfile} />
                    </div>

                    {/* RIGHT COLUMN - Tasks & Data (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Tasks Section */}
                        <div>
                            <div className="flex justify-between items-end mb-4">
                                <h2 className="text-xl font-bold text-slate-800">Your Roadmap</h2>
                                <span className="text-sm text-slate-500">Auto-generated based on your profile</span>
                            </div>
                            <TaskList tasks={todoList} />
                        </div>

                        {/* Recommendations Section */}
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-800">Recommended Universities</h2>
                                {recommendations.length > 3 && (
                                    <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                                        View All Matches →
                                    </button>
                                )}
                            </div>

                            {isLoading && (
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-64 rounded-2xl bg-white border border-slate-100 animate-pulse"></div>
                                    ))}
                                </div>
                            )}

                            {error && (
                                <div className="p-8 rounded-2xl bg-red-50 border border-red-100 text-center text-red-600">
                                    {error}
                                </div>
                            )}

                            {!isLoading && !error && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {recommendations.slice(0, 4).map((uni, idx) => (
                                        <UniversityCard
                                            key={uni.id || idx}
                                            university={uni}
                                            index={idx}
                                            onLockClick={handleLockClick}
                                        />
                                    ))}
                                    {recommendations.length === 0 && (
                                        <div className="col-span-2 p-12 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-200">
                                            No matches found yet. Keep updating your profile!
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Lock University Modal */}
            {isLockModalOpen && universityToLock && (
                <LockUniversityModal
                    university={universityToLock}
                    isOpen={true}
                    onConfirm={handleLockConfirm}
                    onClose={() => setIsLockModalOpen(false)}
                />
            )}
        </div>
    );
}
