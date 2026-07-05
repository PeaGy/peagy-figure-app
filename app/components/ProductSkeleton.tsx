export default function ProductSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="border border-gray-100 rounded-sm p-2 space-y-3">
                    <div className="aspect-square skeleton w-full rounded-sm"></div>
                    <div className="h-4 skeleton w-3/4"></div>
                    <div className="h-4 skeleton w-1/2"></div>
                    <div className="h-8 skeleton w-full"></div>
                </div>
            ))}
        </div>
    );
}