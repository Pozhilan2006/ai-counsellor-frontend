"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Validation
        if (!formData.email || !formData.password) {
            setError("All fields are required");
            setIsLoading(false);
            return;
        }

        // Check credentials
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const user = existingUsers.find(
            (u: any) => u.email === formData.email && u.password === formData.password
        );

        if (!user) {
            setError("Invalid email or password");
            setIsLoading(false);
            return;
        }

        // Set session
        localStorage.setItem("currentUser", JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
        }));

        setIsLoading(false);

        // Redirect to dashboard
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-blue-50/30 to-stone-100 text-stone-900 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md"
            >
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 mb-2">
                            AI Counsellor
                        </h1>
                    </Link>
                    <p className="text-stone-600">Welcome back! Log in to continue</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-xl shadow-stone-200/50">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="john@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm text-red-900">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-6 py-3 text-base font-medium bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all duration-300 shadow-lg shadow-stone-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Logging in..." : "Log In"}
                        </motion.button>
                    </form>

                    {/* Signup Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-stone-600">
                            Don't have an account?{" "}
                            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Demo Note */}
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-xs text-amber-900 text-center">
                        <span className="font-semibold">Demo Mode:</span> Authentication uses localStorage. In production, use a proper auth service.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
