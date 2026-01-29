"use client";

import { motion } from "framer-motion";
import type { Stage } from "@/lib/types";

interface StageIndicatorProps {
    currentStage: Stage;
}

export default function StageIndicator({ currentStage }: StageIndicatorProps) {
    const stages: { name: Stage; label: string; icon: string }[] = [
        { name: "ONBOARDING", label: "Onboarding", icon: "📝" },
        { name: "DISCOVERY", label: "Discovery", icon: "🔍" },
        { name: "SHORTLIST", label: "Shortlist", icon: "⭐" },
        { name: "LOCKED", label: "Locked", icon: "🔒" },
        { name: "APPLICATION", label: "Application", icon: "📄" },
    ];

    const currentIndex = stages.findIndex((s) => s.name === currentStage);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50"
        >
            <h2 className="text-xl font-semibold text-stone-900 mb-6">Your Journey</h2>

            <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-1 bg-stone-200 rounded-full">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-gradient-to-r from-blue-500 via-amber-500 to-emerald-500 rounded-full"
                    ></motion.div>
                </div>

                {/* Stage Nodes */}
                <div className="relative flex justify-between">
                    {stages.map((stage, idx) => {
                        const isCompleted = idx < currentIndex;
                        const isCurrent = idx === currentIndex;
                        const isPending = idx > currentIndex;

                        return (
                            <div key={stage.name} className="flex flex-col items-center">
                                {/* Node */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-4 transition-all duration-300 ${isCompleted
                                            ? "bg-emerald-500 border-emerald-200 shadow-lg shadow-emerald-500/30"
                                            : isCurrent
                                                ? "bg-white border-amber-500 shadow-lg shadow-amber-500/30 ring-4 ring-amber-100"
                                                : "bg-white border-stone-200"
                                        }`}
                                >
                                    {isCompleted ? (
                                        <span className="text-white">✓</span>
                                    ) : (
                                        <span className={isPending ? "opacity-40" : ""}>{stage.icon}</span>
                                    )}
                                </motion.div>

                                {/* Label */}
                                <div
                                    className={`mt-3 text-xs font-medium text-center ${isCurrent
                                            ? "text-stone-900"
                                            : isCompleted
                                                ? "text-emerald-700"
                                                : "text-stone-500"
                                        }`}
                                >
                                    {stage.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Current Stage Info */}
            <div className="mt-8 pt-6 border-t border-stone-200">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{stages[currentIndex].icon}</span>
                    <span className="text-sm font-semibold text-stone-900">
                        Current: {stages[currentIndex].label}
                    </span>
                </div>
                <p className="text-sm text-stone-600">
                    {currentStage === "ONBOARDING" && "Complete your profile to get started."}
                    {currentStage === "DISCOVERY" && "Explore university recommendations tailored to your profile."}
                    {currentStage === "SHORTLIST" && "Add universities to your shortlist and compare options."}
                    {currentStage === "LOCKED" && "You've locked your choice. Focus on your application."}
                    {currentStage === "APPLICATION" && "Follow your personalized application roadmap."}
                </p>
            </div>
        </motion.div>
    );
}
