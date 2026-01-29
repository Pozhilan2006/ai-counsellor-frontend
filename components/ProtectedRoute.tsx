"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/lib/AppContext";
import type { Stage } from "@/lib/types";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredStage?: Stage;
    requireProfile?: boolean;
}

/**
 * Route guard component that enforces stage-based access control
 * 
 * Usage:
 * <ProtectedRoute requiredStage="DISCOVERY" requireProfile={true}>
 *   <YourPage />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({
    children,
    requiredStage,
    requireProfile = true,
}: ProtectedRouteProps) {
    const router = useRouter();
    const { userProfile, currentStage, canAccessStage } = useAppContext();

    useEffect(() => {
        // Check if profile is required but missing
        if (requireProfile && !userProfile) {
            console.log("ProtectedRoute: No profile found, redirecting to onboarding");
            router.push("/onboarding");
            return;
        }

        // Check if profile is incomplete
        if (requireProfile && userProfile && !userProfile.profile_complete) {
            console.log("ProtectedRoute: Profile incomplete, redirecting to onboarding");
            router.push("/onboarding");
            return;
        }

        // Check stage access if required
        if (requiredStage && !canAccessStage(requiredStage)) {
            console.log(
                `ProtectedRoute: Cannot access stage ${requiredStage} from ${currentStage}, redirecting to dashboard`
            );
            router.push("/dashboard");
            return;
        }
    }, [userProfile, currentStage, requiredStage, requireProfile, canAccessStage, router]);

    // Don't render children if access is denied
    if (requireProfile && !userProfile) {
        return null;
    }

    if (requireProfile && userProfile && !userProfile.profile_complete) {
        return null;
    }

    if (requiredStage && !canAccessStage(requiredStage)) {
        return null;
    }

    return <>{children}</>;
}
