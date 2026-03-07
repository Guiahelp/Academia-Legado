export function ProgressSkeleton() {
    return (
        <div className="glass-card p-6 rounded-2xl mb-8 border border-secondary/10 flex flex-col md:flex-row items-center gap-6 animate-pulse bg-white/5">
            <div className="w-24 h-24 rounded-full bg-white/10 flex-shrink-0" />
            <div className="w-full space-y-3">
                <div className="h-6 w-1/3 bg-white/10 rounded-lg" />
                <div className="h-4 w-2/3 bg-white/5 rounded-lg" />
                <div className="h-4 w-1/2 bg-white/5 rounded-lg" />
            </div>
        </div>
    );
}
