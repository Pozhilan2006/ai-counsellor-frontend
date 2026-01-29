"use client";

import { motion } from "framer-motion";
import { useAppContext } from "@/lib/AppContext";
import type { TodoItem } from "@/lib/types";

interface TaskListProps {
    tasks: TodoItem[];
    showStageFilter?: boolean;
}

export default function TaskList({ tasks, showStageFilter = false }: TaskListProps) {
    const { completeTask, removeTask } = useAppContext();

    const handleToggleComplete = (taskId: string) => {
        completeTask(taskId);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High":
                return "bg-red-100 text-red-700 border-red-200";
            case "Medium":
                return "bg-amber-100 text-amber-700 border-amber-200";
            case "Low":
                return "bg-blue-100 text-blue-700 border-blue-200";
            default:
                return "bg-stone-100 text-stone-700 border-stone-200";
        }
    };

    const getStageColor = (stage: string) => {
        switch (stage) {
            case "DISCOVERY":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "SHORTLIST":
                return "bg-amber-50 text-amber-700 border-amber-200";
            case "LOCKED":
                return "bg-purple-50 text-purple-700 border-purple-200";
            case "APPLICATION":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            default:
                return "bg-stone-50 text-stone-700 border-stone-200";
        }
    };

    if (tasks.length === 0) {
        return (
            <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50">
                <h2 className="text-xl font-semibold text-stone-900 mb-6">Your Tasks</h2>
                <div className="text-center py-8 text-stone-600">
                    <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">✅</span>
                    </div>
                    <p className="text-sm">No tasks yet. Talk to the AI Counsellor to get personalized guidance.</p>
                </div>
            </div>
        );
    }

    // Separate completed and pending tasks
    const pendingTasks = tasks.filter((t) => !t.completed);
    const completedTasks = tasks.filter((t) => t.completed);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-stone-900">Your Tasks</h2>
                <span className="text-sm text-stone-600">
                    {pendingTasks.length} pending, {completedTasks.length} completed
                </span>
            </div>

            <div className="space-y-3">
                {/* Pending Tasks */}
                {pendingTasks.map((task, idx) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors duration-200"
                    >
                        <button
                            onClick={() => handleToggleComplete(task.id)}
                            className="w-5 h-5 rounded border-2 border-stone-300 flex items-center justify-center flex-shrink-0 mt-0.5 hover:border-emerald-500 transition-colors duration-200"
                        >
                            {task.completed && <span className="text-emerald-600 text-sm">✓</span>}
                        </button>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-stone-900">{task.task}</div>
                            {task.description && (
                                <div className="text-xs text-stone-600 mt-1">{task.description}</div>
                            )}
                            <div className="flex gap-2 mt-2">
                                <span
                                    className={`px-2 py-0.5 rounded text-xs font-semibold border ${getPriorityColor(
                                        task.priority
                                    )}`}
                                >
                                    {task.priority}
                                </span>
                                {showStageFilter && (
                                    <span
                                        className={`px-2 py-0.5 rounded text-xs font-semibold border ${getStageColor(
                                            task.stage
                                        )}`}
                                    >
                                        {task.stage}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Completed Tasks */}
                {completedTasks.length > 0 && (
                    <>
                        <div className="pt-4 pb-2">
                            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                Completed
                            </div>
                        </div>
                        {completedTasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-start gap-3 p-4 bg-emerald-50/50 rounded-lg opacity-60"
                            >
                                <button
                                    onClick={() => handleToggleComplete(task.id)}
                                    className="w-5 h-5 rounded border-2 border-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5 bg-emerald-500"
                                >
                                    <span className="text-white text-sm">✓</span>
                                </button>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-stone-700 line-through">
                                        {task.task}
                                    </div>
                                    {task.description && (
                                        <div className="text-xs text-stone-600 mt-1 line-through">
                                            {task.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </motion.div>
    );
}
