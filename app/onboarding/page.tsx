"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import type { UserProfile } from "@/lib/types";

export default function EnhancedOnboardingPage() {
    const router = useRouter();
    const { setUserProfile, setCurrentStage } = useAppContext();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    // Form state
    const [formData, setFormData] = useState<Partial<UserProfile>>({
        name: "",
        email: "",
        // Academic Background
        education_level: undefined,
        degree: "",
        major: "",
        graduation_year: undefined,
        gpa: undefined,
        // Study Goals
        intended_degree: "",
        field_of_study: "",
        target_intake_year: undefined,
        preferred_countries: [],
        // Budget
        budget_per_year: 0,
        funding_plan: undefined,
        // Exams & Readiness
        ielts_status: undefined,
        ielts_score: undefined,
        gre_status: undefined,
        gre_score: undefined,
        sop_status: undefined,
    });

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

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        const profile: UserProfile = {
            name: formData.name || "",
            email: formData.email || "",
            education_level: formData.education_level,
            degree: formData.degree,
            major: formData.major,
            graduation_year: formData.graduation_year,
            gpa: formData.gpa,
            intended_degree: formData.intended_degree,
            field_of_study: formData.field_of_study,
            target_intake_year: formData.target_intake_year,
            preferred_countries: formData.preferred_countries || [],
            budget_per_year: formData.budget_per_year || 0,
            funding_plan: formData.funding_plan,
            ielts_status: formData.ielts_status,
            ielts_score: formData.ielts_score,
            gre_status: formData.gre_status,
            gre_score: formData.gre_score,
            sop_status: formData.sop_status,
            profile_complete: true,
        };

        setUserProfile(profile);
        setCurrentStage("DISCOVERY");
        router.push("/dashboard");
    };

    const countries = ["USA", "UK", "Canada", "Australia", "Germany", "France", "Netherlands", "Singapore"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-blue-50/30 to-stone-100 text-stone-900 py-12 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Progress Indicator */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex items-center flex-1">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${step <= currentStep
                                            ? "bg-blue-600 text-white"
                                            : "bg-stone-200 text-stone-500"
                                        }`}
                                >
                                    {step}
                                </div>
                                {step < 4 && (
                                    <div
                                        className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${step < currentStep ? "bg-blue-600" : "bg-stone-200"
                                            }`}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-sm text-stone-600 text-center">
                        Step {currentStep} of {totalSteps}
                    </div>
                </div>

                {/* Form Steps */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-xl shadow-stone-200/50"
                    >
                        {/* Step 1: Personal & Academic Background */}
                        {currentStep === 1 && (
                            <div>
                                <h2 className="text-2xl font-semibold text-stone-900 mb-6">
                                    Personal & Academic Background
                                </h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">
                                            Current Education Level
                                        </label>
                                        <select
                                            name="education_level"
                                            value={formData.education_level || ""}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Undergraduate">Undergraduate</option>
                                            <option value="Graduate">Graduate</option>
                                            <option value="Postgraduate">Postgraduate</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">
                                                Degree
                                            </label>
                                            <input
                                                type="text"
                                                name="degree"
                                                value={formData.degree}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="e.g., B.Tech"
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
                                                placeholder="e.g., Computer Science"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">
                                                Graduation Year
                                            </label>
                                            <input
                                                type="number"
                                                name="graduation_year"
                                                value={formData.graduation_year || ""}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="2024"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">
                                                GPA / Percentage
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                name="gpa"
                                                value={formData.gpa || ""}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="3.5"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Study Goals */}
                        {currentStep === 2 && (
                            <div>
                                <h2 className="text-2xl font-semibold text-stone-900 mb-6">Study Goals</h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">
                                            Intended Degree
                                        </label>
                                        <input
                                            type="text"
                                            name="intended_degree"
                                            value={formData.intended_degree}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Master's in Computer Science"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">
                                            Field of Study
                                        </label>
                                        <input
                                            type="text"
                                            name="field_of_study"
                                            value={formData.field_of_study}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Artificial Intelligence"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">
                                            Target Intake Year
                                        </label>
                                        <input
                                            type="number"
                                            name="target_intake_year"
                                            value={formData.target_intake_year || ""}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="2025"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-3">
                                            Preferred Countries *
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
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
                        )}

                        {/* Step 3: Budget & Funding */}
                        {currentStep === 3 && (
                            <div>
                                <h2 className="text-2xl font-semibold text-stone-900 mb-6">Budget & Funding</h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">
                                            Budget per Year (USD) *
                                        </label>
                                        <input
                                            type="number"
                                            name="budget_per_year"
                                            value={formData.budget_per_year || ""}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="50000"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">
                                            Funding Plan
                                        </label>
                                        <select
                                            name="funding_plan"
                                            value={formData.funding_plan || ""}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Self">Self-Funded</option>
                                            <option value="Scholarship">Scholarship</option>
                                            <option value="Loan">Education Loan</option>
                                            <option value="Mixed">Mixed (Self + Scholarship/Loan)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Exams & Readiness */}
                        {currentStep === 4 && (
                            <div>
                                <h2 className="text-2xl font-semibold text-stone-900 mb-6">
                                    Exams & Readiness
                                </h2>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">
                                                IELTS Status
                                            </label>
                                            <select
                                                name="ielts_status"
                                                value={formData.ielts_status || ""}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select...</option>
                                                <option value="Not Started">Not Started</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">
                                                IELTS Score
                                            </label>
                                            <input
                                                type="number"
                                                step="0.5"
                                                name="ielts_score"
                                                value={formData.ielts_score || ""}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="7.5"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">
                                                GRE Status
                                            </label>
                                            <select
                                                name="gre_status"
                                                value={formData.gre_status || ""}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select...</option>
                                                <option value="Not Started">Not Started</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">
                                                GRE Score
                                            </label>
                                            <input
                                                type="number"
                                                name="gre_score"
                                                value={formData.gre_score || ""}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="320"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">
                                            SOP Status
                                        </label>
                                        <select
                                            name="sop_status"
                                            value={formData.sop_status || ""}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Not Started">Not Started</option>
                                            <option value="Draft">Draft</option>
                                            <option value="Ready">Ready</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 mt-8">
                            {currentStep > 1 && (
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleBack}
                                    className="px-6 py-3 text-base font-medium bg-stone-100 text-stone-700 rounded-full hover:bg-stone-200 transition-all duration-300"
                                >
                                    Back
                                </motion.button>
                            )}
                            {currentStep < totalSteps ? (
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleNext}
                                    className="flex-1 px-6 py-3 text-base font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-600/20"
                                >
                                    Next
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    className="flex-1 px-6 py-3 text-base font-medium bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-600/20"
                                >
                                    Complete Profile
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
