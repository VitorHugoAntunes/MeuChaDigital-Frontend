"use client";

interface NotFoundProps {
  title: string;
}

export default function NotFound({ title }: NotFoundProps) {
  return (
    <main className="grid gap-6 mt-8 py-6 px-4 md:px-8 h-fit w-full">
      <section className="bg-white rounded-lg p-6 border border-gray-200">
        <p className="text-center">{title}</p>
      </section>
    </main>
  );
}