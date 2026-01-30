"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { UserProfile, Stage, University, TodoItem, CounsellorResponse, ProfileStrength } from "./types";
import { canAccessStage as checkStageAccess, getNextStage } from "./types";

// ============================================
// CONTEXT TYPE (PRODUCTION STATE MODEL)
// ============================================
interface AppContextType {
    // User Profile
    userProfile: UserProfile | null;
    setUserProfile: (profile: UserProfile) => void;
    updateProfile: (updates: Partial<UserProfile>) => void;

    // Stage Management
    currentStage: Stage;
    setCurrentStage: (stage: Stage) => void;
    canAccessStage: (targetStage: Stage) => boolean;
    progressToNextStage: () => void;

    // University Recommendations
    recommendations: University[];
    setRecommendations: (universities: University[]) => void;

    // Shortlist Management
    shortlistedUniversities: University[];
    addToShortlist: (university: University) => void;
    removeFromShortlist: (universityId: number) => void;
    isShortlisted: (universityId: number) => boolean;

    // University Locking
    lockedUniversity: University | null;
    lockUniversity: (university: University) => void;
    unlockUniversity: () => void;

    // Task Management
    todoList: TodoItem[];
    addTask: (task: Omit<TodoItem, "id" | "created_at">) => void;
    completeTask: (taskId: string) => void;
    removeTask: (taskId: string) => void;
    getTasksByStage: (stage: Stage) => TodoItem[];

    // AI Counsellor Response
    counsellorResponse: CounsellorResponse | null;
    setCounsellorResponse: (response: CounsellorResponse | null) => void;

    // Profile Strength
    profileStrength: ProfileStrength | null;
    setProfileStrength: (strength: ProfileStrength) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ============================================
// CONTEXT PROVIDER
// ============================================
export function AppContextProvider({ children }: { children: ReactNode }) {
    // User Profile State
    // User Profile State
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    // Stage State
    const [currentStage, setCurrentStage] = useState<Stage>("ONBOARDING");

    // University States
    const [recommendations, setRecommendations] = useState<University[]>([]);
    const [shortlistedUniversities, setShortlistedUniversities] = useState<University[]>([]);
    const [lockedUniversity, setLockedUniversity] = useState<University | null>(null);

    // Task State
    const [todoList, setTodoList] = useState<TodoItem[]>([]);

    // AI Response State
    const [counsellorResponse, setCounsellorResponse] = useState<CounsellorResponse | null>(null);

    // Profile Strength State
    const [profileStrength, setProfileStrength] = useState<ProfileStrength | null>(null);

    // Persistence Effect
    useEffect(() => {
        // Hydrate from localStorage
        const storedProfile = localStorage.getItem("userProfile");
        const storedStage = localStorage.getItem("currentStage");

        if (storedProfile) {
            setUserProfile(JSON.parse(storedProfile));
        } else {
            // Fallback to simpler auth if full profile missing
            const simpleUser = localStorage.getItem("currentUser");
            if (simpleUser) {
                const parsed = JSON.parse(simpleUser);
                setUserProfile({
                    name: parsed.name,
                    email: parsed.email,
                    budget_per_year: 0,
                    preferred_countries: [],
                    profile_complete: false
                } as UserProfile);
            }
        }

        if (storedStage) {
            setCurrentStage(storedStage as Stage);
        }
    }, []);

    // Save on Change
    useEffect(() => {
        if (userProfile) {
            localStorage.setItem("userProfile", JSON.stringify(userProfile));
        }
    }, [userProfile]);

    useEffect(() => {
        localStorage.setItem("currentStage", currentStage);
    }, [currentStage]);

    // Backend Sync Effect (fetch stage, shortlist, tasks)
    useEffect(() => {
        const syncWithBackend = async () => {
            if (!userProfile?.email) return;

            try {
                // Fetch user stage from backend
                const { getUserStage } = await import("./api");
                const stageData = await getUserStage(userProfile.email);
                if (stageData.current_stage) {
                    setCurrentStage(stageData.current_stage);
                }

                // Fetch shortlist from backend
                const { getShortlist } = await import("./api");
                const shortlistData = await getShortlist(userProfile.email);
                if (shortlistData.shortlisted) {
                    setShortlistedUniversities(shortlistData.shortlisted);
                }

                // Fetch tasks from backend
                const { getTasks } = await import("./api");
                const tasksData = await getTasks(userProfile.email);
                if (tasksData.tasks) {
                    setTodoList(tasksData.tasks);
                }
            } catch (error) {
                console.error("Failed to sync with backend on mount:", error);
                // Continue with local state if backend fails
            }
        };

        syncWithBackend();
    }, [userProfile?.email]);

    // ============================================
    // PROFILE METHODS
    // ============================================
    const updateProfile = (updates: Partial<UserProfile>) => {
        if (userProfile) {
            setUserProfile({ ...userProfile, ...updates });
        }
    };

    // ============================================
    // STAGE METHODS
    // ============================================
    const canAccessStage = (targetStage: Stage): boolean => {
        return checkStageAccess(currentStage, targetStage);
    };

    const progressToNextStage = () => {
        const nextStage = getNextStage(currentStage);
        if (nextStage) {
            setCurrentStage(nextStage);
        }
    };

    // ============================================
    // SHORTLIST METHODS
    // ============================================
    const addToShortlist = async (university: University) => {
        if (!shortlistedUniversities.find((u) => u.id === university.id)) {
            // Optimistic update
            setShortlistedUniversities([...shortlistedUniversities, university]);

            // Sync with backend
            if (userProfile?.email) {
                try {
                    const { addToShortlist: addToShortlistAPI } = await import("./api");
                    await addToShortlistAPI(userProfile.email, university.id);
                } catch (error) {
                    console.error("Failed to sync shortlist with backend:", error);
                    // Rollback on error
                    setShortlistedUniversities(shortlistedUniversities.filter((u) => u.id !== university.id));
                }
            }

            // Auto-progress to SHORTLIST stage if not already there
            if (currentStage === "DISCOVERY") {
                setCurrentStage("SHORTLIST");
            }
        }
    };

    const removeFromShortlist = async (universityId: number) => {
        const previousShortlist = [...shortlistedUniversities];
        setShortlistedUniversities(shortlistedUniversities.filter((u) => u.id !== universityId));

        // Sync with backend
        if (userProfile?.email) {
            try {
                const { removeFromShortlist: removeFromShortlistAPI } = await import("./api");
                await removeFromShortlistAPI(userProfile.email, universityId);
            } catch (error) {
                console.error("Failed to sync shortlist removal with backend:", error);
                // Rollback on error
                setShortlistedUniversities(previousShortlist);
            }
        }
    };

    const isShortlisted = (universityId: number): boolean => {
        return shortlistedUniversities.some((u) => u.id === universityId);
    };

    // ============================================
    // LOCKING METHODS
    // ============================================
    const lockUniversity = async (university: University) => {
        setLockedUniversity(university);
        setCurrentStage("LOCKED");

        // Sync with backend
        if (userProfile?.email) {
            try {
                const { lockUniversityAPI } = await import("./api");
                const response = await lockUniversityAPI(userProfile.email, university.id);
                if (response.new_stage) {
                    setCurrentStage(response.new_stage);
                }
            } catch (error) {
                console.error("Failed to sync lock with backend:", error);
                // Rollback on error
                setLockedUniversity(null);
                setCurrentStage("SHORTLIST");
            }
        }
    };

    const unlockUniversity = async () => {
        const previousLocked = lockedUniversity;
        setLockedUniversity(null);
        setCurrentStage("SHORTLIST");

        // Sync with backend
        if (userProfile?.email) {
            try {
                const { unlockUniversityAPI } = await import("./api");
                const response = await unlockUniversityAPI(userProfile.email);
                if (response.new_stage) {
                    setCurrentStage(response.new_stage);
                }
            } catch (error) {
                console.error("Failed to sync unlock with backend:", error);
                // Rollback on error
                setLockedUniversity(previousLocked);
                setCurrentStage("LOCKED");
            }
        }
    };

    // ============================================
    // TASK METHODS
    // ============================================
    const addTask = (task: Omit<TodoItem, "id" | "created_at">) => {
        const newTask: TodoItem = {
            ...task,
            id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            created_at: new Date(),
        };
        setTodoList([...todoList, newTask]);
    };

    const completeTask = async (taskId: string) => {
        setTodoList(
            todoList.map((task) =>
                task.id === taskId ? { ...task, completed: true } : task
            )
        );

        // Sync with backend
        if (userProfile?.email) {
            try {
                const { completeTaskAPI } = await import("./api");
                await completeTaskAPI(userProfile.email, taskId);
            } catch (error) {
                console.error("Failed to sync task completion with backend:", error);
                // Rollback on error
                setTodoList(
                    todoList.map((task) =>
                        task.id === taskId ? { ...task, completed: false } : task
                    )
                );
            }
        }
    };

    const removeTask = (taskId: string) => {
        setTodoList(todoList.filter((task) => task.id !== taskId));
    };

    const getTasksByStage = (stage: Stage): TodoItem[] => {
        return todoList.filter((task) => task.stage === stage);
    };

    // ============================================
    // CONTEXT VALUE
    // ============================================
    const value: AppContextType = {
        // Profile
        userProfile,
        setUserProfile,
        updateProfile,

        // Stage
        currentStage,
        setCurrentStage,
        canAccessStage,
        progressToNextStage,

        // Recommendations
        recommendations,
        setRecommendations,

        // Shortlist
        shortlistedUniversities,
        addToShortlist,
        removeFromShortlist,
        isShortlisted,

        // Locking
        lockedUniversity,
        lockUniversity,
        unlockUniversity,

        // Tasks
        todoList,
        addTask,
        completeTask,
        removeTask,
        getTasksByStage,

        // AI Response
        counsellorResponse,
        setCounsellorResponse,

        // Profile Strength
        profileStrength,
        setProfileStrength,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ============================================
// CUSTOM HOOK
// ============================================
export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppContextProvider");
    }
    return context;
}
