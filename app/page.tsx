"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Floating background orb component
function FloatingOrb({ delay = 0, duration = 10, yOffset = 20, className = "" }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -yOffset, 0],
        x: [0, yOffset / 2, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// Animated card wrapper
function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group"
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 text-stone-900 font-sans selection:bg-amber-200/50 overflow-hidden relative">
      {/* Floating Background Elements - Subtle Depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <FloatingOrb
          delay={0}
          duration={14}
          yOffset={25}
          className="w-[600px] h-[600px] bg-amber-300/[0.06] -top-64 -left-32"
        />
        <FloatingOrb
          delay={3}
          duration={16}
          yOffset={30}
          className="w-[700px] h-[700px] bg-blue-300/[0.05] top-1/3 -right-48"
        />
        <FloatingOrb
          delay={6}
          duration={15}
          yOffset={20}
          className="w-[500px] h-[500px] bg-violet-300/[0.07] bottom-1/4 left-1/4"
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-stone-200/50"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight text-stone-900">
            AI Counsellor
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <Link href="#how-it-works" className="hover:text-stone-900 transition-colors duration-200">
              How it works
            </Link>
            <Link href="#features" className="hover:text-stone-900 transition-colors duration-200">
              Features
            </Link>
            <Link href="#about" className="hover:text-stone-900 transition-colors duration-200">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:block text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors duration-200"
            >
              Sign in
            </Link>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link
                href="/start"
                className="px-5 py-2.5 text-sm font-medium bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all duration-300 hover:shadow-lg hover:shadow-stone-900/20"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 max-w-7xl mx-auto pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200/80 text-xs font-medium text-stone-600 mb-8 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Guided Study Abroad Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-stone-900 mb-8 leading-[1.1]"
            >
              Plan your study-abroad journey with a guided AI counsellor.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Clarity, structure, and decision discipline. Navigate the complexity of international
              education without the confusion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all duration-300 hover:shadow-xl hover:shadow-stone-900/25"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-white/80 backdrop-blur-sm text-stone-900 border border-stone-200 rounded-full hover:bg-white hover:border-stone-300 transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50"
                >
                  How it Works
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="px-6 max-w-7xl mx-auto py-24 md:py-32">
          <div className="border-t border-stone-200/50 pt-20">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-4"
              >
                <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 mb-4">
                  How it Works
                </h2>
                <p className="text-stone-600 leading-relaxed text-lg">
                  A systematic approach to finding your best-fit university, grounded in data and
                  personalized analysis.
                </p>
              </motion.div>

              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
                {/* Step 1 */}
                <AnimatedCard delay={0.1}>
                  <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-stone-200/50 hover:bg-white/80 hover:border-stone-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50 h-full">
                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-semibold mb-6 group-hover:bg-stone-200 transition-colors duration-300">
                      1
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-3">
                      Build your profile
                    </h3>
                    <p className="text-stone-600 leading-relaxed">
                      Input your academic background, test scores, and career aspirations to create a
                      comprehensive digital profile.
                    </p>
                  </div>
                </AnimatedCard>

                {/* Step 2 */}
                <AnimatedCard delay={0.2}>
                  <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-stone-200/50 hover:bg-white/80 hover:border-stone-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50 h-full">
                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-semibold mb-6 group-hover:bg-stone-200 transition-colors duration-300">
                      2
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-3">
                      Understand strengths & gaps
                    </h3>
                    <p className="text-stone-600 leading-relaxed">
                      Get an objective analysis of where you stand compared to global applicant pools.
                    </p>
                  </div>
                </AnimatedCard>

                {/* Step 3 */}
                <AnimatedCard delay={0.3}>
                  <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-stone-200/50 hover:bg-white/80 hover:border-stone-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50 h-full">
                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-semibold mb-6 group-hover:bg-stone-200 transition-colors duration-300">
                      3
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-3">
                      Realistic recommendations
                    </h3>
                    <p className="text-stone-600 leading-relaxed">
                      Receive university suggestions categorized by safety, target, and reach, based on
                      acceptance probabilities.
                    </p>
                  </div>
                </AnimatedCard>

                {/* Step 4 */}
                <AnimatedCard delay={0.4}>
                  <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-stone-200/50 hover:bg-white/80 hover:border-stone-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50 h-full">
                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-semibold mb-6 group-hover:bg-stone-200 transition-colors duration-300">
                      4
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-3">Lock decisions</h3>
                    <p className="text-stone-600 leading-relaxed">
                      Finalize your shortlist and get a structured timeline for managing applications
                      and essays.
                    </p>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </section>

        {/* Why AI Counsellor */}
        <section id="features" className="px-6 py-24 md:py-32 bg-stone-900 text-stone-50 relative overflow-hidden">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 opacity-50"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 leading-tight">
                  Engineered for guidance,{" "}
                  <span className="text-stone-400">not just browsing.</span>
                </h2>
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-4"
                  >
                    <div className="pt-1 flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-stone-100 mb-2">
                        Decision Discipline
                      </h3>
                      <p className="text-stone-400 leading-relaxed">
                        Avoid analysis paralysis. We help you make hard choices with confidence by
                        focusing on what truly matters for your career.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-4"
                  >
                    <div className="pt-1 flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-stone-100 mb-2">
                        Reduced Confusion
                      </h3>
                      <p className="text-stone-400 leading-relaxed">
                        Cut through the noise of forums and unverified advice. Get clear, actionable
                        steps tailored to your profile.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-square lg:aspect-auto lg:h-[500px] bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl p-10 border border-stone-700/50 flex flex-col justify-between shadow-2xl"
              >
                {/* Abstract UI Representation */}
                <div className="space-y-6">
                  <div className="h-2 w-32 bg-stone-700/50 rounded-full"></div>
                  <div className="h-10 w-72 bg-stone-600/30 rounded-xl border border-stone-700/30"></div>
                  <div className="space-y-3 pt-6">
                    <div className="h-2 w-full bg-stone-700/30 rounded-full"></div>
                    <div className="h-2 w-5/6 bg-stone-700/30 rounded-full"></div>
                    <div className="h-2 w-4/6 bg-stone-700/30 rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <div className="h-2 w-24 bg-stone-700/30 rounded-full"></div>
                    <div className="h-2 w-32 bg-stone-700/30 rounded-full"></div>
                  </div>
                  <div className="px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400 font-medium">
                    High Match
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 max-w-7xl mx-auto py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-stone-900 mb-6">
              Ready to start your journey?
            </h2>
            <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who plan their future with precision and clarity.
            </p>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link
                href="/start"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all duration-300 hover:shadow-xl hover:shadow-stone-900/25"
              >
                Get Started Now
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/50 bg-white/40 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="text-lg font-semibold text-stone-900 mb-2">AI Counsellor</div>
            <p className="text-stone-500 text-sm">
              © {new Date().getFullYear()} AI Counsellor. All rights reserved.
            </p>
          </div>

          <div className="flex gap-8 text-sm text-stone-600">
            <Link href="/privacy" className="hover:text-stone-900 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-stone-900 transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-stone-900 transition-colors duration-200">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
