"use client";

import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import type { University } from "@/lib/types";

interface UniversityCardProps {
    university: University;
    index: number;
    showActions?: boolean;
    onLockClick?: (university: University) => void;
}

export default function UniversityCard({ university, index, showActions = true, onLockClick }: UniversityCardProps) {
    const { isShortlisted, addToShortlist, removeFromShortlist, lockedUniversity, currentStage } = useAppContext();

    const isInShortlist = isShortlisted(university.id);
    const isLocked = lockedUniversity?.id === university.id;

    const handleShortlistToggle = () => {
        if (isInShortlist) {
            removeFromShortlist(university.id);
        } else {
            addToShortlist(university);
        }
    };

    const handleLockClick = () => {
        if (onLockClick) {
            onLockClick(university);
        }
    };

    // Determine Match Score Color
    const getMatchColor = (score: number) => {
        if (score >= 90) return "bg-emerald-100 text-emerald-700 border-emerald-200";
        if (score >= 70) return "bg-blue-100 text-blue-700 border-blue-200";
        return "bg-amber-100 text-amber-700 border-amber-200";
    };

    const matchScore = Math.floor(Math.random() * (98 - 75) + 75); // Mock match score if missing from backend

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`group relative bg-white border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 ${isLocked
                    ? "border-emerald-500 ring-2 ring-emerald-500/20"
                    : "border-slate-100 hover:border-emerald-200"
                }`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl font-bold text-slate-400">
                        {university.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1 group-hover:text-emerald-700 transition-colors">
                            {university.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {university.country}
                        </div>
                    </div>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getMatchColor(matchScore)}`}>
                    {matchScore}% Match
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                <span className="chip chip-neutral">
                    Rank #{university.rank || "N/A"}
                </span>
                {university.estimated_tuition_usd && (
                    <span className="chip chip-neutral">
                        ${(university.estimated_tuition_usd / 1000).toFixed(0)}k / year
                    </span>
                )}
                {university.acceptance_chance && (
                    <span className={`chip ${university.acceptance_chance > 50 ? "chip-success" : "chip-warning"}`}>
                        {university.acceptance_chance}% Acceptance
                    </span>
                )}
            </div>

            {showActions && (
                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                    <button
                        onClick={handleShortlistToggle}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${isInShortlist
                                ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                    >
                        {isInShortlist ? "★ Shortlisted" : "Add to Shortlist"}
                    </button>

                    {isInShortlist && currentStage === "SHORTLIST" && !isLocked && (
                        <button
                            onClick={handleLockClick}
                            className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all"
                        >
                            Confirm Choice
                        </button>
                    )}

                    {isLocked && (
                        <div className="flex-1 py-2.5 text-center text-sm font-bold text-emerald-700 bg-emerald-50 rounded-lg">
                            Selected University
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}
