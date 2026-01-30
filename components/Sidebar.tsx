"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/lib/AppContext";

export default function Sidebar() {
    const pathname = usePathname();
    const { userProfile } = useAppContext();

    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: "📊" },
        { name: "Universities", path: "/universities", icon: "🎓" },
        { name: "AI Counsellor", path: "/counsellor", icon: "💬" },
        { name: "Tasks", path: "/application", icon: "✅" },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-stone-200 flex flex-col z-40">
            {/* Logo/Brand */}
            <div className="p-6 border-b border-stone-200">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <span className="text-2xl">🎓</span>
                    <span className="text-lg font-semibold text-stone-900">AI Counsellor</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                            ? "bg-stone-900 text-white shadow-md"
                            : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>

            {/* User Profile Section */}
            {userProfile && (
                <div className="p-4 border-t border-stone-200">
                    <div className="px-4 py-3 bg-stone-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {userProfile.name?.charAt(0).toUpperCase() || "U"}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-stone-900 truncate">
                                    {userProfile.name || "User"}
                                </p>
                                <p className="text-xs text-stone-600 truncate">{userProfile.email}</p>
                            </div>
                        </div>
                        <Link
                            href="/profile"
                            className="block w-full text-center px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>
            )}
        </aside>
    );
}
