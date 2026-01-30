"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import { useState } from "react";
import UniversityCard from "@/components/UniversityCard";
import LockUniversityModal from "@/components/LockUniversityModal";
import type { University } from "@/lib/types";

export default function UniversitiesPage() {
    const router = useRouter();
    const { userProfile, recommendations, lockUniversity } = useAppContext();
    const [universityToLock, setUniversityToLock] = useState<University | null>(null);
    const [isLockModalOpen, setIsLockModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<string>("all");

    if (!userProfile) {
        router.push("/onboarding");
        return null;
    }

    // Filter universities based on search and country
    const filteredUniversities = recommendations.filter(uni => {
        const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            uni.country.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCountry = selectedCountry === "all" || uni.country === selectedCountry;
        return matchesSearch && matchesCountry;
    });

    // Get unique countries for filter
    const countries = Array.from(new Set(recommendations.map(uni => uni.country)));

    const handleLockClick = (university: University) => {
        setUniversityToLock(university);
        setIsLockModalOpen(true);
    };

    const handleLockConfirm = () => {
        if (universityToLock) {
            lockUniversity(universityToLock);
            setIsLockModalOpen(false);
            setUniversityToLock(null);
        }
    };

    const handleLockCancel = () => {
        setIsLockModalOpen(false);
        setUniversityToLock(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-stone-900 mb-2">
                        All Recommended Universities
                    </h1>
                    <p className="text-stone-600">
                        Explore all {recommendations.length} universities matched to your profile
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-6 mb-6 shadow-lg shadow-stone-200/50">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search universities..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                            />
                        </div>

                        {/* Country Filter */}
                        <div className="md:w-64">
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                            >
                                <option value="all">All Countries</option>
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mt-4 text-sm text-stone-600">
                        Showing {filteredUniversities.length} of {recommendations.length} universities
                    </div>
                </div>

                {/* Universities Grid */}
                {filteredUniversities.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredUniversities.map((uni, idx) => (
                            <motion.div
                                key={uni.id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                            >
                                <UniversityCard
                                    university={uni}
                                    index={idx}
                                    showActions={true}
                                    onLockClick={handleLockClick}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-12 text-center shadow-lg shadow-stone-200/50">
                        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🔍</span>
                        </div>
                        <h3 className="text-lg font-semibold text-stone-900 mb-2">No universities found</h3>
                        <p className="text-stone-600">
                            Try adjusting your search or filters
                        </p>
                    </div>
                )}
            </div>

            {/* Lock Modal */}
            <LockUniversityModal
                isOpen={isLockModalOpen}
                university={universityToLock}
                onConfirm={handleLockConfirm}
                onClose={handleLockCancel}
            />
        </div>
    );
}
