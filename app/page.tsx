"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">AI</div>
            Counsellor
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-emerald-600 transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-emerald-600 transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Log in
            </Link>
            <Link href="/onboarding" className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-emerald-50/50 to-white -z-10" />
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[100px] -z-10 animate-float" />
        <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-[80px] -z-10 animate-float" style={{ animationDelay: "2s" }} />

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Now updated for 2026 Admissions
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
              Your Study Abroad Journey, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Put on Autopilot.</span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              AI-powered guidance to discover top universities, strengthen your profile, and apply with confidence—all in one intelligent platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/onboarding" className="btn-primary min-w-[180px]">
                Start Your Journey
              </Link>
              <Link href="#how-it-works" className="btn-secondary min-w-[180px]">
                See How It Works
              </Link>
            </div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-20 relative mx-auto max-w-5xl"
            >
              <div className="rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-xl p-2 shadow-2xl shadow-slate-200/50">
                <div className="rounded-xl bg-slate-50 border border-slate-100 aspect-[16/9] flex items-center justify-center overflow-hidden relative">
                  {/* Create a mock UI representation directly with CSS/divs to avoid image dependency */}
                  <div className="absolute inset-x-0 top-0 h-12 bg-white border-b border-slate-100 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                  </div>
                  <div className="p-6 w-full h-full pt-20 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
                    {/* Fake Sidebar/Profile */}
                    <div className="col-span-1 space-y-4">
                      {/* Profile Card */}
                      <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                          <div className="space-y-1">
                            <div className="w-20 h-3 bg-slate-200 rounded"></div>
                            <div className="w-12 h-2 bg-slate-100 rounded"></div>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-emerald-500 rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Profile Strength</span>
                          <span className="text-emerald-600 font-bold">75%</span>
                        </div>
                      </div>

                      {/* Mini Tasks */}
                      <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 space-y-3">
                        {[1, 2].map(i => (
                          <div key={i} className="flex gap-2 items-center">
                            <div className="w-4 h-4 rounded border border-slate-200"></div>
                            <div className="w-full h-2 bg-slate-100 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Main Content Areas */}
                    <div className="col-span-2 space-y-4">
                      {/* University Matches */}
                      <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100">
                        <div className="flex justify-between mb-4">
                          <div className="w-32 h-4 bg-slate-100 rounded"></div>
                          <div className="w-16 h-4 bg-emerald-100 rounded"></div>
                        </div>
                        <div className="space-y-3">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-white border border-slate-100"></div>
                                <div className="w-24 h-3 bg-slate-200 rounded"></div>
                              </div>
                              <div className="w-12 h-6 rounded-full bg-emerald-500/10"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Your Path to Admission.</h2>
            <p className="text-lg text-slate-600">Three simple steps to unlock your dream university.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              {
                icon: "👤",
                title: "1. Build Your Profile",
                desc: "Enter your academic details, test scores, and preferences. Our AI instantly analyzes your profile strength."
              },
              {
                icon: "🔍",
                title: "2. Get Matched",
                desc: "Receive a personalized list of Ambitious, Target, and Safe universities tailored to your chances."
              },
              {
                icon: "🚀",
                title: "3. Apply with Confidence",
                desc: "Follow a step-by-step roadmap with AI-generated tasks to craft the perfect application."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>

                {/* Connector Line (Desktop) */}
                {i !== 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-slate-200 -z-10"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">Trusted by students targeting</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale transition-all hover:grayscale-0">
            {["Stanford", "MIT", "Oxford", "Cambridge", "Harvard"].map(uni => (
              <span key={uni} className="text-xl font-bold text-slate-800">{uni}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Sections - Alternating Layouts */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 space-y-24 md:space-y-32">

          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-100 rounded-3xl transform rotate-3 scale-95 opacity-50 blur-xl"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-semibold text-slate-700">Profile Strength</h4>
                    <span className="text-2xl font-bold text-emerald-600">75%</span>
                  </div>
                  {["Academics", "Extracurriculars", "Tests"].map((item, i) => (
                    <div key={item} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">{item}</span>
                        <span className={`${i === 0 ? "text-emerald-600" : "text-amber-600"}`}>{i === 0 ? "Strong" : "Average"}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${i === 0 ? "bg-emerald-500 w-3/4" : "bg-amber-400 w-1/2"}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <div className="order-1 md:order-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-6">📊</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Data-Driven Profile Analysis.</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Stop guessing where you stand. Our AI analyzes your academics, test scores, and background to give you a realistic admission probability and actionable steps to improve.
              </p>
              <ul className="space-y-3">
                {["Instant Strength Score", "Gap Analysis", "Improvement Roadmap"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6">🎯</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Smart University Matching.</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Discover universities that are the perfect fit for your profile and budget. We categorize them into Ambitious, Target, and Safe options to build a balanced application list.
              </p>
              <Link href="/onboarding" className="text-emerald-600 font-semibold hover:text-emerald-700 inline-flex items-center gap-1 group">
                Find your matches <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-100 to-indigo-100 rounded-3xl transform -rotate-2 scale-95 opacity-50 blur-xl"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-6 space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                      <div className="h-3 w-20 bg-slate-100 rounded"></div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${i === 0 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                      {i === 0 ? "Dream" : "Target"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to take control of your future?</h2>
          <p className="text-xl text-slate-300 mb-10">Join thousands of students who have simplified their study abroad journey with AI Counsellor.</p>
          <Link href="/onboarding" className="px-8 py-4 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/30 text-lg">
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-900 font-bold text-lg">AI Counsellor</div>
          <div className="text-slate-500 text-sm">© 2026 AI Counsellor Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
