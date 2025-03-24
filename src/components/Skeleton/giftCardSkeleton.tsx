export const GiftCardSkeleton = () => {
  return (
    <article className="w-full max-w-[16.8rem] border border-gray-200 rounded-lg bg-white overflow-hidden shadow-md animate-pulse">
      <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-t-lg"></div>

      <section className="p-4 space-y-3">
        <header className="flex items-center justify-between">
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
          <div className="h-5 w-12 bg-gray-200 rounded"></div>
        </header>

        <div className="h-6 w-3/4 bg-gray-200 rounded"></div>

        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>

        <footer className="flex justify-between items-center pt-2">
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
          <div className="flex gap-2">
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
          </div>
        </footer>
      </section>
    </article>
  );
};