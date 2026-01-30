"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProfileStrength } from "@/lib/api";

interface ProfileStrengthCardProps {
    email: string;
}

interface ProfileStrengthData {
    completion_score: number;
    academics: { status: string; score?: number };
    exams: { status: string; score?: number };
    sop: { status: string; score?: number };
    documents: { status: string; score?: number };
    missing_fields?: string[];
}

export default function ProfileStrengthCard({ email }: ProfileStrengthCardProps) {
    const [strengthData, setStrengthData] = useState<ProfileStrengthData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStrength = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getProfileStrength(email);
                setStrengthData(data);
            } catch (err) {
                console.error("Failed to fetch profile strength:", err);
                setError("Unable to calculate");
            } finally {
                setIsLoading(false);
            }
        };

        if (email) fetchStrength();
    }, [email]);

    const getStatusChipClass = (status: string) => {
        const s = status.toLowerCase();
        if (s === "strong" || s === "completed" || s === "ready") return "chip chip-success";
        if (s === "average" || s === "in progress" || s === "draft") return "chip chip-warning";
        return "chip chip-neutral";
    };

    if (isLoading) {
        return (
            <div className="card-glass p-6 animate-pulse">
                <div className="h-6 w-1/3 bg-slate-200 rounded mb-6"></div>
                <div className="h-4 w-full bg-slate-100 rounded mb-4"></div>
                <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
            </div>
        );
    }

    if (error || !strengthData) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-glass p-6 relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <span className="text-xl">💪</span> Profile Strength
                    </h2>
                    <p className="text-sm text-slate-500">Readiness for 2026 application</p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xl font-bold border border-emerald-100 shadow-sm">
                    {strengthData.completion_score}%
                </div>
            </div>

            {/* Main Progress Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-8">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${strengthData.completion_score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                />
            </div>

            <div className="space-y-4">
                {[
                    { label: "Academics", data: strengthData.academics },
                    { label: "Exams", data: strengthData.exams },
                    { label: "SOP", data: strengthData.sop },
                    { label: "Documents", data: strengthData.documents },
                ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                        <span className="font-medium text-slate-700">{item.label}</span>
                        <span className={getStatusChipClass(item.data.status)}>
                            {item.data.status}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
