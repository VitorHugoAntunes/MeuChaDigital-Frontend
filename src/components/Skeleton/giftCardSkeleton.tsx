export const GiftCardSkeleton = () => {
  return (
    <article className="w-full border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm animate-pulse">
      <div className="relative w-full h-52 bg-gray-200"></div>

      <section className="p-5 space-y-4">
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>

        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        </div>

        <div className="h-7 w-16 bg-gray-200 rounded"></div>
      </section>
    </article>
  );
};