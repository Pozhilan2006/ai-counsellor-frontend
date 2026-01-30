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
            className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-6 shadow-lg shadow-stone-200/50"
        >
            <h2 className="text-xl font-semibold text-stone-900 mb-4">Your Profile</h2>

            <div className="space-y-3">
                {/* Education */}
                {(profile.degree || profile.field_of_study) && (
                    <div>
                        <span className="text-sm text-stone-500">Education</span>
                        <p className="text-stone-900 font-medium">
                            {profile.degree && profile.field_of_study
                                ? `${profile.degree} in ${profile.field_of_study}`
                                : profile.degree || profile.field_of_study}
                        </p>
                    </div>
                )}

                {/* Target Intake */}
                {profile.target_intake_year && (
                    <div>
                        <span className="text-sm text-stone-500">Target Intake</span>
                        <p className="text-stone-900 font-medium">{profile.target_intake_year}</p>
                    </div>
                )}

                {/* Preferred Countries */}
                {profile.preferred_countries && profile.preferred_countries.length > 0 && (
                    <div>
                        <span className="text-sm text-stone-500">Preferred Countries</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {profile.preferred_countries.map((country) => (
                                <span
                                    key={country}
                                    className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm"
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
                        <span className="text-sm text-stone-500">Budget per Year</span>
                        <p className="text-stone-900 font-medium">
                            ${profile.budget_per_year.toLocaleString()}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
