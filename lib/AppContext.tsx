"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { UserProfile, Stage, CounsellorResponse } from "./types";

interface AppContextType {
    userProfile: UserProfile | null;
    setUserProfile: (profile: UserProfile) => void;
    currentStage: Stage;
    setCurrentStage: (stage: Stage) => void;
    counsellorResponse: CounsellorResponse | null;
    setCounsellorResponse: (response: CounsellorResponse | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [currentStage, setCurrentStage] = useState<Stage>("ONBOARDING");
    const [counsellorResponse, setCounsellorResponse] = useState<CounsellorResponse | null>(null);

    return (
        <AppContext.Provider
            value={{
                userProfile,
                setUserProfile,
                currentStage,
                setCurrentStage,
                counsellorResponse,
                setCounsellorResponse,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppContextProvider");
    }
    return context;
}
