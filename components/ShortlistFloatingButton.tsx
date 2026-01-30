"use client";

import Link from "next/link";
import { useAppContext } from "@/lib/AppContext";

export default function ShortlistFloatingButton() {
    const { shortlistedUniversities } = useAppContext();

    if (shortlistedUniversities.length === 0) {
        return null;
    }

    return (
        <Link href="/shortlist">
            <button className="fixed top-20 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-full shadow-lg hover:bg-stone-800 transition-all duration-200 flex items-center gap-2 group">
                <span className="text-xl">🎓</span>
                <span className="font-medium">Shortlist</span>
                <span className="bg-white text-stone-900 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {shortlistedUniversities.length}
                </span>
            </button>
        </Link>
    );
}
