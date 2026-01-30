"use client";

import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import type { TodoItem } from "@/lib/types";

interface TaskListProps {
    tasks: TodoItem[];
    showStageFilter?: boolean;
}

export default function TaskList({ tasks, showStageFilter = false }: TaskListProps) {
    const { completeTask, lockedUniversity } = useAppContext();

    const handleToggleComplete = (taskId: string) => {
        completeTask(taskId);
    };

    if (!lockedUniversity) {
        return (
            <div className="card-glass p-8 text-center bg-slate-50/50 border-dashed border-2 border-slate-200">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl grayscale opacity-50">🔒</span>
                </div>
                <h3 className="text-slate-900 font-semibold mb-2">Unlock Your Roadmap</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Finalize a university to get a personalized checklist of tasks for your application.
                </p>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="card-glass p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-slate-900 font-semibold mb-2">All Caught Up!</h3>
                <p className="text-sm text-slate-500">You&apos;ve completed all pending tasks for now.</p>
            </div>
        );
    }

    return (
        <div className="card-glass p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <span className="text-xl">✅</span> Action Items
                </h2>
                <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                    {tasks.filter(t => t.completed).length}/{tasks.length} Done
                </span>
            </div>

            <div className="space-y-3">
                {tasks.map((task, idx) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className={`group flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 ${task.completed
                                ? "bg-slate-50 border-transparent opacity-60"
                                : "bg-white border-slate-100 hover:border-emerald-200 hover:shadow-sm"
                            }`}
                    >
                        <div className="pt-0.5">
                            <button
                                onClick={() => handleToggleComplete(task.id)}
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.completed
                                        ? "bg-emerald-500 border-emerald-500 text-white"
                                        : "bg-white border-slate-300 hover:border-emerald-400"
                                    }`}
                            >
                                {task.completed && (
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className="flex-1">
                            <p className={`text-sm font-medium transition-colors ${task.completed ? "text-slate-500 line-through decoration-slate-300" : "text-slate-800"
                                }`}>
                                {task.task}
                            </p>
                            {task.reason && !task.completed && (
                                <p className="text-xs text-slate-500 mt-1">
                                    💡 {task.reason}
                                </p>
                            )}
                        </div>

                        {!task.completed && (
                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${task.priority === "High" ? "bg-red-50 text-red-600" :
                                    task.priority === "Medium" ? "bg-amber-50 text-amber-600" :
                                        "bg-blue-50 text-blue-600"
                                }`}>
                                {task.priority}
                            </span>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
