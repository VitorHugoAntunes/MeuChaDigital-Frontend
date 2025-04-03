"use client";

export default function GiftLoading() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-8 py-6 h-fit w-full">
      <section className="bg-white dark:bg-gray-dark rounded-lg p-6 border border-gray-dark">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-24 bg-gray-light rounded"></div>
            <div className="h-6 w-16 bg-gray-light rounded"></div>
          </div>
          <div className="h-8 w-48 bg-gray-light rounded"></div>
          <div className="h-4 w-64 bg-gray-light rounded"></div>
          <div className="h-4 w-32 bg-gray-light rounded"></div>

          <div className="h-4 w-full bg-gray-light rounded"></div>

          <div className="flex items-center gap-4 justify-end">
            <div className="h-10 w-24 bg-gray-light rounded"></div>
            <div className="h-10 w-24 bg-gray-light rounded"></div>
          </div>

          <div className="h-64 w-full bg-gray-light rounded-lg"></div>

          <div className="space-y-2">
            <div className="h-4 w-48 bg-gray-light rounded"></div>
            <div className="h-4 w-full bg-gray-light rounded"></div>
            <div className="h-4 w-3/4 bg-gray-light rounded"></div>
          </div>
        </div>
      </section>

      <aside className="sticky top-6 h-fit bg-white dark:bg-gray-dark rounded-lg p-6 border border-gray-dark">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-32 bg-gray-light rounded"></div>

          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-light rounded"></div>
            <div className="h-4 w-4/5 bg-gray-light rounded"></div>
          </div>

          <div className="space-y-2">
            <div className="h-5 w-16 bg-gray-light rounded"></div>
            <div className="h-12 w-full bg-gray-light rounded-lg"></div>
          </div>

          <div className="h-12 w-full bg-gray-light rounded-lg"></div>

          <div className="flex items-start gap-3 pt-4">
            <div className="h-5 w-5 bg-gray-light rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 w-full bg-gray-light rounded"></div>
              <div className="h-3 w-4/5 bg-gray-light rounded"></div>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}