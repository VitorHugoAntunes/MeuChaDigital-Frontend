"use client";

interface NotFoundProps {
  title: string;
}

export default function NotFound({ title }: NotFoundProps) {
  return (
    <main className="grid gap-6 mt-8 py-6 md:px-8 h-fit w-full">
      <section className="bg-white dark:bg-gray-dark rounded-lg p-6 border border-gray-dark dark:border-gray-light">
        <p className="text-center text-danger">{title}</p>
      </section>
    </main>
  );
}