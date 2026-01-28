"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardPage() {
    const router = useRouter();
    const { userProfile, currentStage } = useAppContext();

    useEffect(() => {
        if (!userProfile) {
            router.push("/onboarding");
        }
    }, [userProfile, router]);

    if (!userProfile) {
        return null;
    }

    const stageConfig = {
        ONBOARDING: { label: "Onboarding", color: "bg-stone-500" },
        DISCOVERY: { label: "Discovery", color: "bg-blue-500" },
        SHORTLIST: { label: "Shortlist", color: "bg-amber-500" },
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
                                        <div className="text-sm font-medium text-stone-500 mb-1">Academic Score</div>
                                        <div className="text-base text-stone-900">{userProfile.academic_score}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-stone-500 mb-1">Budget</div>
                                        <div className="text-base text-stone-900">
                                            ${userProfile.budget.toLocaleString()} USD/year
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-stone-500 mb-1">Preferred Country</div>
                                        <div className="text-base text-stone-900">{userProfile.preferred_country}</div>
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

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-10 md:p-12 text-center shadow-xl shadow-stone-900/20"
                        >
                            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                                Ready to get personalized guidance?
                            </h2>
                            <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
                                Our AI counsellor will analyze your profile and provide tailored university
                                recommendations based on your goals and qualifications.
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
