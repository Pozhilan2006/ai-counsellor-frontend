"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import { callCounsellor } from "@/lib/api";
import Link from "next/link";
import type { UserProfile } from "@/lib/types";

export default function ProfilePage() {
    const router = useRouter();
    const { userProfile, setUserProfile, setRecommendations, setCurrentStage } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isRecalculating, setIsRecalculating] = useState(false);
    const [formData, setFormData] = useState<Partial<UserProfile>>({});

    useEffect(() => {
        if (!userProfile) {
            router.push("/onboarding");
            return;
        }
        setFormData(userProfile);
    }, [userProfile, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "number" ? parseFloat(value) : value,
        });
    };

    const handleMultiSelect = (country: string) => {
        const current = formData.preferred_countries || [];
        if (current.includes(country)) {
            setFormData({
                ...formData,
                preferred_countries: current.filter((c) => c !== country),
            });
        } else {
            setFormData({
                ...formData,
                preferred_countries: [...current, country],
            });
        }
    };

    const handleSave = async () => {
        setIsSaving(true);

        const updatedProfile: UserProfile = {
            ...userProfile!,
            ...formData,
            profile_complete: true,
        };

        setUserProfile(updatedProfile);
        setIsEditing(false);
        setIsSaving(false);

        // Ask if user wants to recalculate recommendations
        const shouldRecalculate = window.confirm(
            "Profile updated! Would you like to recalculate university recommendations based on your new profile?"
        );

        if (shouldRecalculate) {
            await recalculateRecommendations(updatedProfile);
        }
    };

    const recalculateRecommendations = async (profile: UserProfile) => {
        setIsRecalculating(true);

        try {
            const payload = {
                user_profile: {
                    name: profile.name,
                    email: profile.email,
                    gpa: profile.gpa,
                    budget_per_year: profile.budget_per_year,
                    preferred_countries: profile.preferred_countries,
                },
                query: "Based on my updated profile, please recommend universities that match my criteria.",
            };

            const response = await callCounsellor(payload);

            if (response.universities && response.universities.length > 0) {
                setRecommendations(response.universities);
                alert(`✅ Found ${response.universities.length} updated university recommendations!`);
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Error recalculating recommendations:", error);
            alert("Failed to recalculate recommendations. Please try again.");
        } finally {
            setIsRecalculating(false);
        }
    };

    const countries = ["USA", "UK", "Canada", "Australia", "Germany", "France", "Netherlands", "Singapore"];

    if (!userProfile) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 text-stone-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-stone-200/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-lg font-semibold tracking-tight text-stone-900">
                        AI Counsellor
                    </Link>
                    <div className="flex gap-6">
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/counsellor"
                            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200"
                        >
                            AI Counsellor
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-4xl font-semibold tracking-tight text-stone-900 mb-2">
                                    Your Profile
                                </h1>
                                <p className="text-lg text-stone-600">
                                    Manage your academic profile and study preferences
                                </p>
                            </div>
                            {!isEditing && (
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-3 text-base font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-600/20"
                                >
                                    Edit Profile
                                </motion.button>
                            )}
                        </div>

                        {/* Profile Content */}
                        <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-xl shadow-stone-200/50">
                            {isEditing ? (
                                <div className="space-y-6">
                                    {/* Personal Information */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-stone-900 mb-4">
                                            Personal Information
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Academic Background */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-stone-900 mb-4">
                                            Academic Background
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                                    GPA
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    name="gpa"
                                                    value={formData.gpa || ""}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                                    Major
                                                </label>
                                                <input
                                                    type="text"
                                                    name="major"
                                                    value={formData.major}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Study Goals */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-stone-900 mb-4">Study Goals</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                                    Budget per Year (USD)
                                                </label>
                                                <input
                                                    type="number"
                                                    name="budget_per_year"
                                                    value={formData.budget_per_year || ""}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-3">
                                                    Preferred Countries
                                                </label>
                                                <div className="grid grid-cols-4 gap-3">
                                                    {countries.map((country) => (
                                                        <button
                                                            key={country}
                                                            type="button"
                                                            onClick={() => handleMultiSelect(country)}
                                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${formData.preferred_countries?.includes(country)
                                                                    ? "bg-blue-600 text-white"
                                                                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                                                                }`}
                                                        >
                                                            {country}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4 pt-6 border-t border-stone-200">
                                        <motion.button
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setFormData(userProfile);
                                                setIsEditing(false);
                                            }}
                                            className="px-6 py-3 text-base font-medium bg-stone-100 text-stone-700 rounded-full hover:bg-stone-200 transition-all duration-300"
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSave}
                                            disabled={isSaving || isRecalculating}
                                            className="flex-1 px-6 py-3 text-base font-medium bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                                        >
                                            {isSaving
                                                ? "Saving..."
                                                : isRecalculating
                                                    ? "Recalculating..."
                                                    : "Save Changes"}
                                        </motion.button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* View Mode */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-stone-900 mb-4">
                                            Personal Information
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-sm font-medium text-stone-500 mb-1">Name</div>
                                                <div className="text-base text-stone-900">{userProfile.name}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-stone-500 mb-1">Email</div>
                                                <div className="text-base text-stone-900">{userProfile.email}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-stone-900 mb-4">
                                            Academic Background
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-sm font-medium text-stone-500 mb-1">GPA</div>
                                                <div className="text-base text-stone-900">
                                                    {userProfile.gpa || "N/A"}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-stone-500 mb-1">Major</div>
                                                <div className="text-base text-stone-900">
                                                    {userProfile.major || "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-stone-900 mb-4">Study Goals</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="text-sm font-medium text-stone-500 mb-1">
                                                    Budget per Year
                                                </div>
                                                <div className="text-base text-stone-900">
                                                    ${userProfile.budget_per_year?.toLocaleString() || "N/A"} USD
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-stone-500 mb-1">
                                                    Preferred Countries
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {userProfile.preferred_countries?.map((country) => (
                                                        <span
                                                            key={country}
                                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                                                        >
                                                            {country}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
