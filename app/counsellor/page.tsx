"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import { callCounsellor } from "@/lib/api";

export default function CounsellorPage() {
    const router = useRouter();
    const { userProfile, recommendations, setRecommendations } = useAppContext();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversationHistory]);

    if (!userProfile) {
        return null;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        const userMessage = question.trim();
        setIsLoading(true);

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
        <div className="h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 p-6 overflow-hidden">
            <div className="max-w-5xl mx-auto h-full flex flex-col">
                {/* Header */}
                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200/80 text-xs font-medium text-stone-600 mb-3 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        AI Counsellor Active
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
                        Your AI Counsellor
                    </h1>
                </div>

                {/* Chat Container - Fixed Height */}
                <div className="flex-1 bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl shadow-lg shadow-stone-200/50 flex flex-col overflow-hidden">

                    {/* Messages Area - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {/* Empty State */}
                        {conversationHistory.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                                    <span className="text-3xl">💬</span>
                                </div>
                                <h3 className="text-lg font-semibold text-stone-900 mb-2">Start a conversation</h3>
                                <p className="text-stone-600 mb-6">
                                    Ask questions and get personalized university recommendations.
                                </p>

                                {/* Quick Action Chips */}
                                <div className="flex flex-wrap gap-2 justify-center">
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
                            </div>
                        )}

                        {/* Chat Messages */}
                        {conversationHistory.map((entry, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[80%] ${entry.role === "user" ? "order-2" : "order-1"}`}>
                                    {/* Message Bubble */}
                                    <div
                                        className={`rounded-2xl px-4 py-3 ${entry.role === "user"
                                                ? "bg-stone-900 text-white"
                                                : "bg-stone-100 text-stone-900"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                            {entry.message}
                                        </p>
                                    </div>

                                    {/* University Recommendations (only for assistant) */}
                                    {entry.role === "assistant" && entry.response?.recommendations && entry.response.recommendations.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {entry.response.recommendations.map((uni: any, uniIdx: number) => (
                                                <div
                                                    key={uni.id || uniIdx}
                                                    className="bg-white border border-stone-200 rounded-xl p-4 hover:border-stone-300 transition-all duration-200"
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h5 className="font-semibold text-stone-900">
                                                                {uni.name}
                                                            </h5>
                                                            <p className="text-xs text-stone-600">{uni.country}</p>
                                                        </div>
                                                        {uni.competitiveness && (
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${uni.competitiveness === "High"
                                                                        ? "bg-violet-100 text-violet-900"
                                                                        : uni.competitiveness === "Medium"
                                                                            ? "bg-blue-100 text-blue-900"
                                                                            : "bg-emerald-100 text-emerald-900"
                                                                    }`}
                                                            >
                                                                {uni.competitiveness}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {uni.why_it_fits && (
                                                        <p className="text-xs text-stone-600 mt-2">
                                                            <strong>Why it fits:</strong> {uni.why_it_fits}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-stone-100 rounded-2xl px-4 py-3">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                        <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                        <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Auto-scroll anchor */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area - Sticky at Bottom */}
                    <div className="border-t border-stone-200 p-4 bg-white/80 backdrop-blur-sm">
                        <form onSubmit={handleSubmit} className="flex gap-3">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Ask me anything about your study abroad journey..."
                                className="flex-1 px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !question.trim()}
                                className="px-6 py-3 text-sm font-medium bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Sending..." : "Send"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
