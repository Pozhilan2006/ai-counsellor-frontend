export function UniversityCardSkeleton() {
    return (
        <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-xl p-6 shadow-lg shadow-stone-200/50 animate-pulse">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="h-6 bg-stone-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-stone-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-stone-200 rounded w-20"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="h-4 bg-stone-200 rounded"></div>
                <div className="h-4 bg-stone-200 rounded"></div>
            </div>
            <div className="h-10 bg-stone-200 rounded"></div>
        </div>
    );
}

export function TaskListSkeleton() {
    return (
        <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50 animate-pulse">
            <div className="h-6 bg-stone-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-stone-200 rounded"></div>
                        <div className="flex-1 h-4 bg-stone-200 rounded"></div>
                        <div className="w-16 h-5 bg-stone-200 rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ProfileStrengthSkeleton() {
    return (
        <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50 animate-pulse">
            <div className="h-6 bg-stone-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i}>
                        <div className="h-4 bg-stone-200 rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-stone-200 rounded-full w-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function StageIndicatorSkeleton() {
    return (
        <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-8 shadow-lg shadow-stone-200/50 animate-pulse">
            <div className="h-6 bg-stone-200 rounded w-1/3 mb-6"></div>
            <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 bg-stone-200 rounded-full"></div>
                        <div className="h-3 bg-stone-200 rounded w-16"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
