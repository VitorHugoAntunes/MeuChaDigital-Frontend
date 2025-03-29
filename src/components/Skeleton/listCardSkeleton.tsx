export function ListCardSkeleton() {
  return (
    <article className="bg-white rounded-lg shadow-md flex flex-col flex-1 w-full h-full">
      <div className="w-full h-32 lg:h-48 bg-gray-200 animate-pulse rounded-t-lg" />

      <section className="flex flex-col gap-4 lg:gap-6 p-4 lg:p-6 flex-1">
        <header>
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
        </header>

        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>

        <footer className="mt-auto space-y-4">
          <div className="h-3 w-full bg-gray-200 rounded-full animate-pulse" />
          <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
        </footer>
      </section>
    </article>
  );
}