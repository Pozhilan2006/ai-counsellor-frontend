"use client";

import { motion } from "framer-motion";
import type { Stage } from "@/lib/types";

interface StageIndicatorProps {
    currentStage: Stage;
}

export default function StageIndicator({ currentStage }: StageIndicatorProps) {
    const stages: { name: Stage; label: string; description: string }[] = [
        {
            name: "ONBOARDING",
            label: "Building Profile",
            description: "Complete your profile to get started."
        },
        {
            name: "DISCOVERY",
            label: "Discovering Universities",
            description: "Explore university recommendations tailored to your profile."
        },
        {
            name: "SHORTLIST",
            label: "Finalizing Universities",
            description: "Add universities to your shortlist and compare options."
        },
        {
            name: "LOCKED",
            label: "Preparing Applications",
            description: "You've locked your choice. Focus on your application."
        },
    ];

    const currentIndex = stages.findIndex((s) => s.name === currentStage);
    const activeStage = currentIndex >= 0 ? stages[currentIndex] : stages[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50"
        >
            <h2 className="text-xl font-semibold text-stone-900 mb-6">Current Stage</h2>

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
                                        <span className={`text-sm font-bold ${isPending ? "text-stone-400" : "text-stone-900"}`}>
                                            {idx + 1}
                                        </span>
                                    )}
                                </motion.div>

                                {/* Label */}
                                <div
                                    className={`mt-3 text-xs font-medium text-center max-w-[80px] ${isCurrent
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
                <div className="mb-2">
                    <span className="text-sm font-semibold text-stone-900">
                        {activeStage.label}
                    </span>
                </div>
                <p className="text-sm text-stone-600">
                    {activeStage.description}
                </p>
            </div>
        </motion.div>
    );
}
