"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import Link from "next/link";
import { useState } from "react";
import UniversityCard from "@/components/UniversityCard";
import LockUniversityModal from "@/components/LockUniversityModal";
import type { University } from "@/lib/types";

export default function ShortlistPage() {
    const router = useRouter();
    const { userProfile, shortlistedUniversities, lockUniversity, currentStage } = useAppContext();
    const [universityToLock, setUniversityToLock] = useState<University | null>(null);
    const [isLockModalOpen, setIsLockModalOpen] = useState(false);

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
            // Redirect to dashboard or application page
            router.push("/dashboard");
        }
    };

    const handleLockCancel = () => {
        setIsLockModalOpen(false);
        setUniversityToLock(null);
    };

    if (!userProfile) {
        router.push("/onboarding");
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 text-stone-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-stone-200/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-lg font-semibold tracking-tight text-stone-900">
                        AI Counsellor
                    </Link>
                    <div className="flex gap-6">
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/counsellor"
                            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200"
                        >
                            AI Counsellor
                        </Link>
                    </div>
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
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-amber-200/80 text-xs font-medium text-amber-700 mb-6 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                {shortlistedUniversities.length} {shortlistedUniversities.length === 1 ? "University" : "Universities"} Shortlisted
                            </div>
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-4">
                                Your Shortlist
                            </h1>
                            <p className="text-lg text-stone-600">
                                Review your shortlisted universities and lock your final choice when ready.
                            </p>
                        </div>

                        {/* Shortlisted Universities */}
                        {shortlistedUniversities.length > 0 ? (
                            <div className="space-y-4 mb-8">
                                {shortlistedUniversities.map((uni, idx) => (
                                    <UniversityCard
                                        key={uni.id}
                                        university={uni}
                                        index={idx}
                                        showActions={true}
                                        onLockClick={handleLockClick}
                                    />
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-12 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">📋</span>
                                </div>
                                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                                    No universities shortlisted yet
                                </h3>
                                <p className="text-stone-600 mb-6">
                                    Go to your dashboard to browse recommendations and add universities to your shortlist.
                                </p>
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all duration-300"
                                >
                                    Browse Universities
                                </Link>
                            </motion.div>
                        )}

                        {/* Info Box */}
                        {shortlistedUniversities.length > 0 && currentStage === "SHORTLIST" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="bg-purple-50 border border-purple-200 rounded-xl p-6"
                            >
                                <div className="flex gap-3">
                                    <span className="text-purple-600 text-lg flex-shrink-0">💡</span>
                                    <div>
                                        <div className="text-sm font-semibold text-purple-900 mb-1">
                                            Ready to lock your choice?
                                        </div>
                                        <p className="text-sm text-purple-800">
                                            Once you lock a university, all application guidance will be tailored specifically to that institution. You can unlock later if needed.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </main>

            {/* Lock University Modal */}
            <LockUniversityModal
                university={universityToLock}
                isOpen={isLockModalOpen}
                onClose={handleLockCancel}
                onConfirm={handleLockConfirm}
            />
        </div>
    );
}
