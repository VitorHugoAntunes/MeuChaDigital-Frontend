"use client";

interface NotFoundProps {
  title: string;
}

export default function NotFound({ title }: NotFoundProps) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-8 py-6 px-4 md:px-8 h-fit w-full">
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <p>{title}</p>
      </section>
    </main>
  );
}