"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Routes that should NOT show the sidebar
    const noSidebarRoutes = ["/", "/login", "/signup", "/onboarding"];
    const showSidebar = !noSidebarRoutes.includes(pathname);

    if (!showSidebar) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-60">
                {children}
            </main>
        </div>
    );
}
