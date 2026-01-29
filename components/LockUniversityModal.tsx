"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { University } from "@/lib/types";

interface LockUniversityModalProps {
    university: University | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function LockUniversityModal({
    university,
    isOpen,
    onClose,
    onConfirm,
}: LockUniversityModalProps) {
    if (!university) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8"
                        >
                            {/* Header */}
                            <div className="mb-6">
                                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <h2 className="text-2xl font-semibold text-stone-900 mb-2">
                                    Lock Your University Choice?
                                </h2>
                                <p className="text-stone-600">
                                    You're about to lock <span className="font-semibold">{university.name}</span> as your
                                    final choice. This is an important decision.
                                </p>
                            </div>

                            {/* University Details */}
                            <div className="bg-stone-50 rounded-xl p-4 mb-6">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <div className="text-stone-500 font-medium">Country</div>
                                        <div className="text-stone-900">{university.country}</div>
                                    </div>
                                    <div>
                                        <div className="text-stone-500 font-medium">Rank</div>
                                        <div className="text-stone-900">
                                            {university.rank ? `#${university.rank}` : "Unranked"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-stone-500 font-medium">Tuition</div>
                                        <div className="text-stone-900">
                                            ${university.estimated_tuition_usd?.toLocaleString() || "N/A"}/year
                                        </div>
                                    </div>
                                    {university.acceptance_chance && (
                                        <div>
                                            <div className="text-stone-500 font-medium">Acceptance</div>
                                            <div className="text-stone-900">{university.acceptance_chance}%</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Warning */}
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                                <div className="flex gap-3">
                                    <span className="text-amber-600 text-lg flex-shrink-0">⚠️</span>
                                    <div>
                                        <div className="text-sm font-semibold text-amber-900 mb-1">Important</div>
                                        <p className="text-sm text-amber-800">
                                            Once locked, all guidance will be tailored specifically to this university.
                                            You can unlock later, but it will reset your application strategy.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 text-base font-medium bg-stone-100 text-stone-700 rounded-full hover:bg-stone-200 transition-all duration-200"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onConfirm}
                                    className="flex-1 px-6 py-3 text-base font-medium bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-200 shadow-lg shadow-purple-600/25"
                                >
                                    🔒 Lock Choice
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
