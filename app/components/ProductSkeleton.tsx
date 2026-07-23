export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-[#e9e4df] bg-white"
        >
          <div className="skeleton aspect-square w-full" />
          <div className="space-y-3 p-3 sm:p-4">
            <div className="skeleton h-3 w-2/5 rounded-full" />
            <div className="skeleton h-4 w-full rounded-full" />
            <div className="skeleton h-4 w-4/5 rounded-full" />
            <div className="flex items-center justify-between pt-2">
              <div className="skeleton h-5 w-2/5 rounded-full" />
              <div className="skeleton h-10 w-20 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
