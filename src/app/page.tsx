import Banner from "@/components/Home/Banner";
import Features from "@/components/Home/Features";
import GetStarted from "@/components/Home/GetStarted";

export default function HomePage() {
  return (
    <main className="px-8">
      <Banner />
      <Features />
      <GetStarted />
    </main>
  );
}
