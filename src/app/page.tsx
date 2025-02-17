import Banner from "@/components/Home/Banner";
import Features from "@/components/Home/Features";
import Footer from "@/components/Home/Footer";
import GetStarted from "@/components/Home/GetStarted";

export default function Home() {
  return (
    <main className="px-8">
      <Banner />
      <Features />
      <GetStarted />
      <Footer />
    </main>
  );
}
