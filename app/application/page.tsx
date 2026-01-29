"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import Link from "next/link";
import { useEffect } from "react";

export default function ApplicationPage() {
    const router = useRouter();
    const { userProfile, currentStage, lockedUniversity, todoList, getTasksByStage } = useAppContext();

    useEffect(() => {
        // Redirect if no profile
        if (!userProfile) {
            router.push("/onboarding");
            return;
        }

        // Redirect if no locked university
        if (!lockedUniversity) {
            router.push("/shortlist");
            return;
        }

        // Only accessible if stage is LOCKED or APPLICATION
        if (currentStage !== "LOCKED" && currentStage !== "APPLICATION") {
            router.push("/dashboard");
            return;
        }
    }, [userProfile, lockedUniversity, currentStage, router]);

    if (!userProfile || !lockedUniversity) {
        return null;
    }

    // Get application-stage tasks
    const applicationTasks = getTasksByStage("APPLICATION");

    // Required documents (placeholder - would come from backend)
    const requiredDocuments = [
        { id: 1, name: "Statement of Purpose (SOP)", status: "pending" },
        { id: 2, name: "Letters of Recommendation (2-3)", status: "pending" },
        { id: 3, name: "Academic Transcripts", status: "pending" },
        { id: 4, name: "English Proficiency Test (IELTS/TOEFL)", status: "pending" },
        { id: 5, name: "Standardized Test Scores (GRE/GMAT)", status: "pending" },
        { id: 6, name: "Resume/CV", status: "pending" },
        { id: 7, name: "Passport Copy", status: "pending" },
        { id: 8, name: "Financial Documents", status: "pending" },
    ];

    // Timeline (placeholder - would come from backend)
    const timeline = [
        { month: "Month 1-2", task: "Prepare SOP and gather recommendations" },
        { month: "Month 2-3", task: "Complete standardized tests if needed" },
        { month: "Month 3-4", task: "Finalize all documents and submit application" },
        { month: "Month 4-6", task: "Wait for admission decision" },
        { month: "Month 6-7", task: "Apply for visa if accepted" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-purple-50/20 to-stone-100 text-stone-900">
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
                            href="/shortlist"
                            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200"
                        >
                            Shortlist
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
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 backdrop-blur-sm border border-purple-200 text-xs font-medium text-purple-900 mb-6 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                🔒 Locked Choice
                            </div>
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-4">
                                Application Guidance
                            </h1>
                            <p className="text-lg text-stone-600 mb-6">
                                Your personalized roadmap for applying to <span className="font-semibold text-stone-900">{lockedUniversity.name}</span>
                            </p>

                            {/* Locked University Card */}
                            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-purple-900 mb-1">
                                            {lockedUniversity.name}
                                        </h3>
                                        <p className="text-sm text-purple-700">{lockedUniversity.country}</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-200 text-purple-900">
                                        🔒 Locked
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <div className="text-purple-600 font-medium">Rank</div>
                                        <div className="text-purple-900">{lockedUniversity.rank ? `#${lockedUniversity.rank}` : "Unranked"}</div>
                                    </div>
                                    <div>
                                        <div className="text-purple-600 font-medium">Tuition</div>
                                        <div className="text-purple-900">
                                            ${lockedUniversity.estimated_tuition_usd?.toLocaleString() || "N/A"}/year
                                        </div>
                                    </div>
                                    {lockedUniversity.acceptance_chance && (
                                        <div>
                                            <div className="text-purple-600 font-medium">Acceptance</div>
                                            <div className="text-purple-900">{lockedUniversity.acceptance_chance}%</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {/* Required Documents */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50"
                            >
                                <h2 className="text-xl font-semibold text-stone-900 mb-6">Required Documents</h2>
                                <div className="space-y-3">
                                    {requiredDocuments.map((doc) => (
                                        <div key={doc.id} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded border-2 border-stone-300 flex items-center justify-center flex-shrink-0">
                                                {/* Checkbox placeholder */}
                                            </div>
                                            <div className="text-sm text-stone-700">{doc.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Timeline */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50"
                            >
                                <h2 className="text-xl font-semibold text-stone-900 mb-6">Application Timeline</h2>
                                <div className="space-y-4">
                                    {timeline.map((item, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                                {idx < timeline.length - 1 && (
                                                    <div className="w-0.5 h-full bg-purple-200 mt-1"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 pb-4">
                                                <div className="text-xs font-semibold text-purple-700 mb-1">
                                                    {item.month}
                                                </div>
                                                <div className="text-sm text-stone-700">{item.task}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* AI-Generated Tasks */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50 mb-8"
                        >
                            <h2 className="text-xl font-semibold text-stone-900 mb-6">Your Action Items</h2>
                            {applicationTasks.length > 0 ? (
                                <div className="space-y-3">
                                    {applicationTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg"
                                        >
                                            <div className="w-5 h-5 rounded border-2 border-stone-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                {task.completed && <span className="text-emerald-600 text-sm">✓</span>}
                                            </div>
                                            <div className="flex-1">
                                                <div className={`text-sm font-medium ${task.completed ? "text-stone-500 line-through" : "text-stone-900"}`}>
                                                    {task.task}
                                                </div>
                                                {task.description && (
                                                    <div className="text-xs text-stone-600 mt-1">{task.description}</div>
                                                )}
                                            </div>
                                            <span
                                                className={`px-2 py-0.5 rounded text-xs font-semibold ${task.priority === "High"
                                                        ? "bg-red-100 text-red-700"
                                                        : task.priority === "Medium"
                                                            ? "bg-amber-100 text-amber-700"
                                                            : "bg-blue-100 text-blue-700"
                                                    }`}
                                            >
                                                {task.priority}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-stone-600">
                                    <p>No tasks yet. Talk to the AI Counsellor to get personalized guidance.</p>
                                </div>
                            )}
                        </motion.div>

                        {/* CTA to Counsellor */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-10 md:p-12 text-center shadow-xl shadow-purple-900/20"
                        >
                            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                                Need Help with Your Application?
                            </h2>
                            <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
                                Chat with our AI counsellor for personalized SOP guidance, document preparation tips, and application strategy.
                            </p>
                            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                                <Link
                                    href="/counsellor"
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-white text-purple-900 rounded-full hover:bg-purple-50 transition-all duration-300 hover:shadow-xl hover:shadow-white/20"
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
