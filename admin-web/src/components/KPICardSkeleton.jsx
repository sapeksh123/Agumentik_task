export default function KPICardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
}
