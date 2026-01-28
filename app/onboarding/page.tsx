"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import Link from "next/link";

export default function OnboardingPage() {
    const router = useRouter();
    const { setUserProfile, setCurrentStage } = useAppContext();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        academic_score: "",
        budget: "",
        preferred_country: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const profile = {
            name: formData.name,
            email: formData.email,
            academic_score: parseFloat(formData.academic_score),
            budget: parseFloat(formData.budget),
            preferred_country: formData.preferred_country,
        };

        setUserProfile(profile);
        setCurrentStage("DISCOVERY");
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 text-stone-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-stone-200/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-lg font-semibold tracking-tight text-stone-900">
                        AI Counsellor
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Header */}
                        <div className="mb-12 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200/80 text-xs font-medium text-stone-600 mb-6 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Step 1 of 3
                            </div>
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-4">
                                Let's get started
                            </h1>
                            <p className="text-lg text-stone-600">
                                Tell us about yourself so we can provide personalized guidance.
                            </p>
                        </div>

                        {/* Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            onSubmit={handleSubmit}
                            className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 md:p-10 shadow-lg shadow-stone-200/50"
                        >
                            <div className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-stone-900 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-stone-900 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Academic Score */}
                                <div>
                                    <label htmlFor="academic_score" className="block text-sm font-medium text-stone-900 mb-2">
                                        Academic Score (GPA or %)
                                    </label>
                                    <input
                                        type="number"
                                        id="academic_score"
                                        required
                                        step="0.01"
                                        min="0"
                                        max="100"
                                        value={formData.academic_score}
                                        onChange={(e) => setFormData({ ...formData, academic_score: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                                        placeholder="3.8 or 85"
                                    />
                                </div>

                                {/* Budget */}
                                <div>
                                    <label htmlFor="budget" className="block text-sm font-medium text-stone-900 mb-2">
                                        Annual Budget (USD)
                                    </label>
                                    <input
                                        type="number"
                                        id="budget"
                                        required
                                        min="0"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                                        placeholder="50000"
                                    />
                                </div>

                                {/* Preferred Country */}
                                <div>
                                    <label htmlFor="preferred_country" className="block text-sm font-medium text-stone-900 mb-2">
                                        Preferred Country
                                    </label>
                                    <select
                                        id="preferred_country"
                                        required
                                        value={formData.preferred_country}
                                        onChange={(e) => setFormData({ ...formData, preferred_country: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-white border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select a country</option>
                                        <option value="USA">United States</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Netherlands">Netherlands</option>
                                        <option value="Singapore">Singapore</option>
                                    </select>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.2 }}
                                className="w-full mt-8 px-8 py-4 text-base font-medium bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all duration-300 hover:shadow-xl hover:shadow-stone-900/25"
                            >
                                Continue to Dashboard
                            </motion.button>
                        </motion.form>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
