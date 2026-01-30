"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import { callCounsellor } from "@/lib/api";
import Link from "next/link";

export default function CounsellorPage() {
    const router = useRouter();
    const { userProfile, currentStage, recommendations, setRecommendations } = useAppContext();

    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [conversationHistory, setConversationHistory] = useState<Array<{ role: "user" | "assistant"; message: string; response?: any }>>([]);

    const quickActions = [
        "Recommend universities for me",
        "Analyze my profile strength",
        "What should I do next?",
    ];

    useEffect(() => {
        if (!userProfile) {
            router.push("/onboarding");
        }
    }, [userProfile, router]);

    if (!userProfile) {
        return null;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        const userMessage = question.trim();
        setIsLoading(true);
        setError(null);

        // Add user message to history immediately
        setConversationHistory(prev => [...prev, { role: "user", message: userMessage }]);
        setQuestion("");

        try {
            console.log("Counsellor: Sending message", { email: userProfile.email, message: userMessage });
            const response = await callCounsellor(userProfile.email, userMessage);
            console.log("Counsellor: Response received:", response);

            // Add AI response to history
            setConversationHistory(prev => [...prev, {
                role: "assistant",
                message: response.message || "Response received",
                response: response
            }]);

            // Update global recommendations if new ones are returned
            if (response.recommendations && response.recommendations.length > 0) {
                setRecommendations(response.recommendations);
            }

        } catch (err) {
            // Show AI fallback message instead of error
            const fallbackMessage = "I'm having trouble connecting right now. Please try again in a moment, or try rephrasing your question.";
            console.error("Counsellor error:", err);

            // Add fallback as AI response
            setConversationHistory(prev => [...prev, {
                role: "assistant",
                message: fallbackMessage,
                response: null
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickAction = (action: string) => {
        setQuestion(action);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 text-stone-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-stone-200/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-lg font-semibold tracking-tight text-stone-900">
                        AI Counsellor
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200"
                    >
                        Back to Dashboard
                    </Link>
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
                        <div className="mb-12 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200/80 text-xs font-medium text-stone-600 mb-6 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                AI Counsellor Active
                            </div>
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-4">
                                Your AI Counsellor
                            </h1>
                            <p className="text-lg text-stone-600">
                                Ask questions and get personalized university recommendations.
                            </p>
                        </div>

                        {/* Input Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            onSubmit={handleSubmit}
                            className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-6 md:p-8 shadow-lg shadow-stone-200/50 mb-8"
                        >
                            {/* Quick Action Chips */}
                            {conversationHistory.length === 0 && (
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {quickActions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => handleQuickAction(action)}
                                            className="px-4 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-full hover:bg-stone-50 hover:border-stone-300 transition-all duration-200"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-col gap-4">
                                <textarea
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Ask me anything about your study abroad journey..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all resize-none"
                                    disabled={isLoading}
                                />
                                <motion.button
                                    type="submit"
                                    disabled={isLoading || !question.trim()}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                    className="self-end px-8 py-3 text-base font-medium bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all duration-300 hover:shadow-lg hover:shadow-stone-900/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Thinking..." : "Ask Counsellor"}
                                </motion.button>
                            </div>
                        </motion.form>

                        {/* Error State */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-xs">!</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-red-900 mb-1">Error</h3>
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Conversation History */}
                        {conversationHistory.length > 0 && (
                            <div className="space-y-6">
                                {conversationHistory.map((entry, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                                        className={`${entry.role === "user"
                                            ? "bg-stone-100/60 border-stone-200/50"
                                            : "bg-white/60 border-stone-200/50"
                                            } backdrop-blur-sm border rounded-2xl p-6 shadow-lg shadow-stone-200/50`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${entry.role === "user"
                                                    ? "bg-stone-600"
                                                    : "bg-stone-900"
                                                    }`}
                                            >
                                                <span className="text-white text-sm font-semibold">
                                                    {entry.role === "user" ? "You" : "AI"}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-base font-semibold text-stone-900 mb-2">
                                                    {entry.role === "user" ? "Your Question" : "Counsellor Response"}
                                                </h3>
                                                <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                                                    {entry.message}
                                                </p>

                                                {/* University Recommendations (only for assistant responses) */}
                                                {entry.role === "assistant" && entry.response?.recommendations && entry.response.recommendations.length > 0 && (
                                                    <div className="mt-6">
                                                        <h4 className="text-lg font-semibold text-stone-900 mb-4">
                                                            University Recommendations ({entry.response.recommendations.length})
                                                        </h4>
                                                        <div className="space-y-3">
                                                            {entry.response.recommendations.map((uni: any, uniIdx: number) => (
                                                                <div
                                                                    key={uni.id || uniIdx}
                                                                    className="bg-white/80 border border-stone-200/50 rounded-xl p-4 hover:bg-white hover:border-stone-300/50 transition-all duration-300"
                                                                >
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <div>
                                                                            <h5 className="text-lg font-semibold text-stone-900">
                                                                                {uni.name}
                                                                            </h5>
                                                                            <p className="text-sm text-stone-600">{uni.country}</p>
                                                                        </div>
                                                                        {uni.competitiveness && (
                                                                            <span
                                                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${uni.competitiveness === "High"
                                                                                    ? "bg-violet-100 border border-violet-200 text-violet-900"
                                                                                    : uni.competitiveness === "Medium"
                                                                                        ? "bg-blue-100 border border-blue-200 text-blue-900"
                                                                                        : "bg-emerald-100 border border-emerald-200 text-emerald-900"
                                                                                    }`}
                                                                            >
                                                                                {uni.competitiveness}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    {uni.why_it_fits && (
                                                                        <p className="text-sm text-stone-600 mt-2">
                                                                            <strong>Why it fits:</strong> {uni.why_it_fits}
                                                                        </p>
                                                                    )}
                                                                    {uni.risks && (
                                                                        <p className="text-sm text-amber-700 mt-2">
                                                                            <strong>Risks:</strong> {uni.risks}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
