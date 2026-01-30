"use client";

import { motion } from "framer-motion";
import type { UserProfile } from "@/lib/types";

interface ProfileSummaryCardProps {
    profile: UserProfile;
}

export default function ProfileSummaryCard({ profile }: ProfileSummaryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card-glass p-6"
        >
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🎓</span> Profile Overview
            </h2>

            <div className="space-y-4">
                {/* Education */}
                {(profile.degree || profile.field_of_study) && (
                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1.5">Education</span>
                        <div className="flex flex-wrap gap-2">
                            {profile.degree && (
                                <span className="chip chip-neutral">{profile.degree}</span>
                            )}
                            {profile.field_of_study && (
                                <span className="chip chip-neutral">{profile.field_of_study}</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Target Intake */}
                {profile.target_intake_year && (
                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1.5">Target Intake</span>
                        <span className="chip chip-success bg-emerald-50 text-emerald-700 border-emerald-100">{profile.target_intake_year}</span>
                    </div>
                )}

                {/* Preferred Countries */}
                {profile.preferred_countries && profile.preferred_countries.length > 0 && (
                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1.5">Preferred Countries</span>
                        <div className="flex flex-wrap gap-2">
                            {profile.preferred_countries.map((country) => (
                                <span
                                    key={country}
                                    className="chip chip-neutral"
                                >
                                    {country}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Budget */}
                {profile.budget_per_year !== undefined && profile.budget_per_year > 0 && (
                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1.5">Budget</span>
                        <span className="text-slate-800 font-semibold text-sm">
                            ${profile.budget_per_year.toLocaleString()}
                            <span className="text-slate-400 font-normal"> / year</span>
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
