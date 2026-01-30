"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if at top
            setIsScrolled(currentScrollY > 20);

            // Determine direction
            // Hide if scrolling down AND past threshold
            // Show if scrolling up OR at very top
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${isVisible ? "translate-y-0" : "-translate-y-full"
                } ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100/50" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">AI</div>
                    <span className={isScrolled ? "text-slate-900" : "text-slate-900 lg:text-white"}>Counsellor</span>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className={`text-sm font-medium hover:opacity-80 transition-opacity ${isScrolled ? "text-slate-600" : "text-slate-600 lg:text-slate-200"
                            }`}
                    >
                        Log in
                    </Link>
                    <Link
                        href="/onboarding"
                        className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all shadow-lg hover:shadow-xl ${isScrolled
                                ? "bg-slate-900 text-white hover:bg-slate-800"
                                : "bg-white text-emerald-900 hover:bg-emerald-50"
                            }`}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
