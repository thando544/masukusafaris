import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import AboutPreview from "../components/home/AboutPreview";
import ActivitiesPreview from "../components/home/ActivitiesPreview";
import PackagesPreview from "../components/home/PackagesPreview";
import TransfersPreview from "../components/home/TransfersPreview";
import StatsSection from "../components/home/StatsSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div className="bg-[#f6f1e8] text-zinc-900">
      <Navbar />

      <main>
        <HeroSection />
        <StatsSection />
        <AboutPreview />
        <PackagesPreview />
        <ActivitiesPreview />
        <TransfersPreview />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
