"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black overflow-hidden relative">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

      {/* Navigation - Minimal Studio Style */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-40 px-8 py-8 md:px-12 flex justify-between items-center mix-blend-difference"
      >
        <div className="text-xs font-bold tracking-[0.2em] uppercase">
          AI Counsellor ®
        </div>

        <div className="hidden md:flex gap-12">
          {["Studio", "Product", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Product" ? "/onboarding" : "#"}
              className="text-xs font-medium uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
        </div>

        <Link
          href="/login"
          className="text-xs font-bold uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          Sign In
        </Link>
      </motion.nav>

      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col justify-center items-center relative px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center z-10"
        >
          {/* Oversized Brand Name */}
          <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter mb-8 md:mb-12 mix-blend-difference whitespace-nowrap">
            AI COUNSELLOR
          </h1>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-xl md:text-3xl font-light text-neutral-400 leading-tight">
              The premium intelligence layer for your<br className="hidden md:block" />
              <span className="text-white">study abroad ambition.</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Floating Gradient Orb (Subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-neutral-800 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      </section>

      {/* Footer / Bottom Interface */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 w-full px-8 md:px-12 flex justify-between items-end text-xs text-neutral-500 font-mono"
      >
        <div>
          [ EST. 2026 ]
        </div>
        <div className="flex gap-4">
          <span>SCROLL TO EXPLORE</span>
        </div>
      </motion.div>
    </div>
  );
}
