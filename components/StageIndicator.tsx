"use client";

import { motion } from "framer-motion";
import type { Stage } from "@/lib/types";

interface StageIndicatorProps {
    currentStage: Stage;
}

export default function StageIndicator({ currentStage }: StageIndicatorProps) {
    const stages: { name: Stage; label: string }[] = [
        { name: "ONBOARDING", label: "Profile" },
        { name: "DISCOVERY", label: "Discovery" },
        { name: "SHORTLIST", label: "Finalizing" },
        { name: "LOCKED", label: "Applying" },
    ];

    const currentIndex = stages.findIndex((s) => s.name === currentStage);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card-glass p-6"
        >
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="text-xl">🚀</span> Current Stage
            </h2>

            {/* Visual Stepper */}
            <div className="relative flex justify-between items-center w-full px-2">
                {/* Background Line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 rounded-full -z-10" />

                {/* Progress Line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 rounded-full -z-10"
                />

                {stages.map((stage, idx) => {
                    const isCompleted = idx < currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                        <div key={stage.name} className="flex flex-col items-center gap-2 relative group cursor-default">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.2 : 1,
                                    backgroundColor: isCompleted || isCurrent ? "#10b981" : "#ffffff",
                                    borderColor: isCompleted || isCurrent ? "#10b981" : "#e2e8f0"
                                }}
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-colors duration-300 ${isCompleted || isCurrent ? "shadow-md shadow-emerald-500/30" : "bg-white"
                                    }`}
                            >
                                {isCompleted ? (
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className={`text-xs font-bold ${isCurrent ? "text-white" : "text-slate-400"}`}>
                                        {idx + 1}
                                    </span>
                                )}
                            </motion.div>

                            <div className={`absolute top-10 text-xs font-medium whitespace-nowrap transition-colors duration-300 ${isCurrent ? "text-emerald-700 font-bold" : "text-slate-400 group-hover:text-slate-600"
                                }`}>
                                {stage.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-sm text-emerald-800 text-center">
                {currentStage === "ONBOARDING" && "Complete your profile to unlock recommendations."}
                {currentStage === "DISCOVERY" && "Explore our AI-curated university list."}
                {currentStage === "SHORTLIST" && "Compare options and finalize your choice."}
                {currentStage === "LOCKED" && "Follow the roadmap to your dream admission."}
            </div>
        </motion.div>
    );
}
