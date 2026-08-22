import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import AboutPreview from "../components/home/AboutPreview";
import ActivitiesPreview from "../components/home/ActivitiesPreview";
import PackagesPreview from "../components/home/PackagesPreview";
import TransfersPreview from "../components/home/TransfersPreview";
import StatsSection from "../components/home/StatsSection";
import DestinationsSeo from "../components/home/DestinationsSeo";
import ReviewsPresence from "../components/home/ReviewsPresence";
import CTASection from "../components/home/CTASection";
import ReferralBanner from "../components/common/ReferralBanner";
import SEO, { travelAgencyJsonLd } from "../components/seo/SEO";
import { SITE } from "../config/site";

export default function Home() {
  return (
    <div className="bg-[#f6f1e8] text-zinc-900">
      <SEO
        title="African Safari Packages from Victoria Falls"
        description={SITE.description}
        path="/"
        jsonLd={travelAgencyJsonLd()}
      />
      <Navbar />
      <ReferralBanner />

      <main>
        <HeroSection />
        <StatsSection />
        <AboutPreview />
        <PackagesPreview />
        <ActivitiesPreview />
        <DestinationsSeo />
        <ReviewsPresence />
        <TransfersPreview />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
