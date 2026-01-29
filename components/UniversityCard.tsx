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
    const canLock = currentStage === "SHORTLIST" && isInShortlist;

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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`bg-white/60 backdrop-blur-sm border rounded-xl p-6 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50 ${isLocked
                ? "border-purple-300 bg-purple-50/50"
                : isInShortlist
                    ? "border-amber-300 bg-amber-50/30"
                    : "border-stone-200/50"
                }`}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-stone-900">{university.name}</h3>
                        {isLocked && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 border border-purple-200 text-purple-900">
                                🔒 Locked
                            </span>
                        )}
                        {isInShortlist && !isLocked && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 border border-amber-200 text-amber-900">
                                ⭐ Shortlisted
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-stone-600">{university.country}</p>
                </div>

                {/* Category/Competitiveness Badge */}
                {university.competitiveness && (
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${university.competitiveness === "High"
                            ? "bg-violet-100 border border-violet-200 text-violet-900"
                            : university.competitiveness === "Medium"
                                ? "bg-blue-100 border border-blue-200 text-blue-900"
                                : "bg-emerald-100 border border-emerald-200 text-emerald-900"
                            }`}
                    >
                        {university.competitiveness}
                    </span>
                )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                    <span className="text-stone-500 font-medium">Rank:</span>{" "}
                    <span className="text-stone-900">{university.rank ? `#${university.rank}` : "Unranked"}</span>
                </div>
                <div>
                    <span className="text-stone-500 font-medium">Tuition:</span>{" "}
                    <span className="text-stone-900">
                        {university.estimated_tuition_usd
                            ? `$${university.estimated_tuition_usd.toLocaleString()}/year`
                            : "N/A"}
                    </span>
                </div>
                {university.acceptance_chance !== undefined && (
                    <div>
                        <span className="text-stone-500 font-medium">Acceptance:</span>{" "}
                        <span className="text-stone-900">{university.acceptance_chance}%</span>
                    </div>
                )}
                {university.cost_level && (
                    <div>
                        <span className="text-stone-500 font-medium">Cost Level:</span>{" "}
                        <span className="text-stone-900">{university.cost_level}</span>
                    </div>
                )}
            </div>

            {/* Why it fits */}
            {university.why_it_fits && (
                <div className="mb-4">
                    <div className="text-xs font-semibold text-stone-700 mb-1">Why it fits:</div>
                    <p className="text-sm text-stone-600 leading-relaxed">{university.why_it_fits}</p>
                </div>
            )}

            {/* Risks */}
            {university.risks && (
                <div className="mb-4">
                    <div className="text-xs font-semibold text-stone-700 mb-1">Risks:</div>
                    <p className="text-sm text-stone-600 leading-relaxed italic">{university.risks}</p>
                </div>
            )}

            {/* Action Buttons */}
            {showActions && !isLocked && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-stone-200">
                    <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleShortlistToggle}
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isInShortlist
                            ? "bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300"
                            : "bg-amber-500 text-white hover:bg-amber-600 shadow-sm"
                            }`}
                    >
                        {isInShortlist ? "Remove from Shortlist" : "Add to Shortlist"}
                    </motion.button>

                    {canLock && (
                        <motion.button
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLockClick}
                            className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-sm"
                        >
                            🔒 Lock Choice
                        </motion.button>
                    )}
                </div>
            )}
        </motion.div>
    );
}
