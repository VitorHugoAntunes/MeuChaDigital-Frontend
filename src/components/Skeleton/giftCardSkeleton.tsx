export const GiftCardSkeleton = () => {
  return (
    <article className="w-full border border-gray-dark rounded-xl bg-white dark:bg-gray-dark overflow-hidden shadow-sm animate-pulse">
      <div className="relative w-full h-52 bg-gray-dark dark:bg-gray-light"></div>

      <section className="p-5 space-y-4">
        <div className="h-6 w-20 bg-gray-dark dark:bg-gray-light rounded-full"></div>

        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-gray-dark dark:bg-gray-light rounded"></div>
          <div className="h-4 w-full bg-gray-dark dark:bg-gray-light rounded"></div>
          <div className="h-4 w-5/6 bg-gray-dark dark:bg-gray-light rounded"></div>
          <div className="h-4 w-2/3 bg-gray-dark dark:bg-gray-light rounded"></div>
        </div>

        <div className="h-7 w-16 bg-gray-dark dark:bg-gray-light rounded"></div>
      </section>
    </article>
  );
};