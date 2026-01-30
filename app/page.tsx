"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProfileStrengthView } from "@/components/ProfileStrengthCard";
import UniversityCard from "@/components/UniversityCard";
import Navbar from "@/components/Navbar";
import type { TodoItem, University } from "@/lib/types";

// Dummy Data
const DUMMY_PROFILE_STRENGTH = {
  completion_score: 75,
  academics: { status: "Strong" },
  exams: { status: "In Progress" },
  sop: { status: "Ready" },
  documents: { status: "Average" }
};

const DUMMY_UNIVERSITIES: University[] = [
  {
    id: 101,
    name: "University of Oxford",
    country: "UK",
    rank: 1,
    estimated_tuition_usd: 45000,
    acceptance_chance: 15,
    category: "Dream",
    competitiveness: "High"
  },
  {
    id: 102,
    name: "University of Toronto",
    country: "Canada",
    rank: 18,
    estimated_tuition_usd: 35000,
    acceptance_chance: 45,
    category: "Target",
    competitiveness: "Medium"
  },
  {
    id: 103,
    name: "University of Texas",
    country: "USA",
    rank: 45,
    estimated_tuition_usd: 28000,
    acceptance_chance: 85,
    category: "Safe",
    competitiveness: "Low"
  }
];

const DUMMY_TASKS: TodoItem[] = [
  {
    id: "t1",
    task: "Upload IELTS Score",
    priority: "High",
    completed: false,
    stage: "ONBOARDING",
    created_at: new Date(),
    reason: "Required for university matching"
  },
  {
    id: "t2",
    task: "Shortlist 3 Universities",
    priority: "Medium",
    completed: true,
    stage: "DISCOVERY",
    created_at: new Date(),
    reason: "To enable application tracking"
  },
  {
    id: "t3",
    task: "Finalize SOP Draft",
    priority: "High",
    completed: false,
    stage: "APPLICATION",
    created_at: new Date(),
    reason: "Deadline approaching in 14 days"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">

      {/* Smart Sticky Navbar */}
      <Navbar />

      {/* HERO SECTION - Marqo Style (Gradient + Info Hierarchy) */}
      <section className="pt-32 pb-32 md:pt-48 md:pb-48 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 text-white relative overflow-hidden mask-gradient-bottom">
        {/* Background Shapes with Ambient Motion - Lower Opacity & Slower */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-float-slow mix-blend-screen opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none animate-float-medium mix-blend-screen opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-float-fast mix-blend-overlay opacity-50"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-sm font-medium mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Admissions AI v2.0 Live
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-emerald-200">
              Your AI Study Abroad Counsellor
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Plan, compare, and apply to universities with confidence — powered by intelligent matching algorithms and real-time profile analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/onboarding" className="px-8 py-4 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-400 transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:-translate-y-1">
                Get Started
              </Link>
              <Link href="#how-it-works" className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 backdrop-blur-md transition-all border border-white/10 hover:-translate-y-1">
                How It Works
              </Link>
            </div>
          </motion.div>

          {/* Dashboard Preview / Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Main Card - Profile Strength */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 md:left-20 bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-2 w-[340px] z-20 border border-white/10 transform -rotate-2 hover:rotate-0 transition-transform duration-500"
            >
              <ProfileStrengthView data={DUMMY_PROFILE_STRENGTH} isLoading={false} error={null} />
            </motion.div>

            {/* Secondary Card - Top Match */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-20 right-10 md:right-20 bg-white/95 backdrop-blur shadow-2xl rounded-2xl w-[320px] z-10 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-lg font-bold text-slate-500">O</div>
                    <div>
                      <div className="font-bold text-slate-800">Oxford</div>
                      <div className="text-xs text-slate-500">UK</div>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">98% Match</span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-bold border border-purple-100">Dream</span>
                  <span className="bg-slate-50 text-slate-600 px-2 py-1 rounded text-xs font-medium border border-slate-100">High Comp</span>
                </div>
              </div>
            </motion.div>

            {/* Third Floating Element - AI Analysis Tag */}
            <motion.div
              animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute top-1/2 right-0 bg-white/90 backdrop-blur-md shadow-xl rounded-full px-4 py-2 z-30 flex items-center gap-2 border border-white/20"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-bold text-slate-700">AI Analysis Active</span>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Your Control Room</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Get a realistic preview of your AI-powered dashboard. Track everything from profile readiness to application tasks.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Strength Card (Reused) */}
            <div className="md:col-span-1">
              <ProfileStrengthView data={DUMMY_PROFILE_STRENGTH} isLoading={false} error={null} />
            </div>

            {/* Quick Stats Grid */}
            <div className="md:col-span-2 grid grid-cols-2 gap-6">
              <div className="card-glass p-6 flex flex-col justify-between">
                <span className="text-slate-500 font-medium">Target Countries</span>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["🇺🇸 USA", "🇬🇧 UK", "🇨🇦 Canada"].map(c => (
                    <span key={c} className="px-3 py-1 bg-slate-100 rounded-full text-slate-700 font-medium">{c}</span>
                  ))}
                </div>
              </div>
              <div className="card-glass p-6 flex flex-col justify-between">
                <span className="text-slate-500 font-medium">Estimated Budget</span>
                <div className="mt-4 text-3xl font-bold text-slate-900">$30,000<span className="text-sm font-normal text-slate-400">/yr</span></div>
              </div>
              <div className="col-span-2 card-glass p-6">
                <h3 className="font-bold text-slate-900 mb-4">Next Steps</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-bold text-slate-600">65% Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SMART UNIVERSITY MATCHING */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Smart University Matching</h2>
              <p className="text-lg text-slate-600">
                We categorize universities into <span className="text-purple-600 font-bold">Dream</span>, <span className="text-emerald-600 font-bold">Target</span>, and <span className="text-blue-600 font-bold">Safe</span> buckets based on your profile strength.
              </p>
            </div>
            <Link href="/onboarding" className="btn-secondary whitespace-nowrap">Explore All Matches</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {DUMMY_UNIVERSITIES.map((uni, i) => (
              <div key={uni.id} className="relative">
                {/* Custom category badge above card */}
                <div className="absolute -top-3 left-6 z-10">
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm text-white ${uni.category === "Dream" ? "bg-purple-600" :
                    uni.category === "Target" ? "bg-emerald-600" :
                      "bg-blue-600"
                    }`}>
                    {uni.category}
                  </span>
                </div>
                <UniversityCard university={uni} index={i} showActions={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI TASKS SECTION */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">What You Should Do Next</h2>
            <p className="text-slate-600">Your personalized AI checklist to stay on track.</p>
          </div>

          {/* Mocking TaskList container style manually for Landing Page specific look without context */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Action Items</h3>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">1 Pending</span>
            </div>
            <div className="divide-y divide-slate-50">
              {DUMMY_TASKS.map((task) => (
                <div key={task.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                  <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${task.completed ? "bg-emerald-500 border-emerald-500" : "border-slate-300"
                    }`}>
                    {task.completed && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${task.completed ? "text-slate-400 line-through" : "text-slate-800"}`}>{task.task}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{task.reason}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${task.priority === "High" ? "bg-red-50 text-red-600 border-red-100" :
                    "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50/50 text-center">
              <Link href="/login" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">View all tasks →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="font-bold text-white text-lg mb-4 md:mb-0">AI Counsellor</div>
          <div className="flex gap-8 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
