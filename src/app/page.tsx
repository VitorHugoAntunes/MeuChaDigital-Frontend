import Banner from "@/components/HomePage/Banner";
import Features from "@/components/HomePage/Features";
import GetStarted from "@/components/HomePage/GetStarted";

export default function HomePage() {
  return (
    <main className="px-8">
      <Banner />
      <Features />
      <GetStarted />
    </main>
  );
}
