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
            transition={{ duration: 0.6 }}
        >
            <p className="label-editorial mb-6">Journey Progress</p>

            {/* Progress Bar - Minimal */}
            <div className="relative mb-12">
                <div className="h-0.5 bg-neutral-200">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-neutral-900"
                    />
                </div>
            </div>

            {/* Stages List - Editorial */}
            <div className="space-y-6">
                {stages.map((stage, idx) => {
                    const isCompleted = idx < currentIndex;
                    const isCurrent = idx === currentIndex;
                    const isPending = idx > currentIndex;

                    return (
                        <div
                            key={stage.name}
                            className={`border-l-2 pl-6 py-2 transition-all duration-300 ${isCurrent
                                    ? "border-neutral-900"
                                    : isCompleted
                                        ? "border-neutral-400"
                                        : "border-neutral-200"
                                }`}
                        >
                            <div className={`text-lg font-bold mb-1 ${isCurrent ? "text-neutral-900" : isPending ? "text-neutral-400" : "text-neutral-600"
                                }`}>
                                {stage.label}
                            </div>
                            {isCurrent && (
                                <p className="text-sm text-neutral-600">{stage.description}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
