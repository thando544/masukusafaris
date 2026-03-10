import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import AboutPreview from "../components/home/AboutPreview";
import ActivitiesPreview from "../components/home/ActivitiesPreview";
import StatsSection from "../components/home/StatsSection";
import PackagesPreview from "../components/home/PackagesPreview";
import TransfersPreview from "../components/home/TransfersPreview";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div className="bg-white text-zinc-900">
      <Navbar />
      <main>
        <HeroSection />
        <AboutPreview />
        <ActivitiesPreview />
        <StatsSection />
        <PackagesPreview />
        <TransfersPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}