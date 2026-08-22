import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import InquiryForm from "../components/common/InquiryForm";
import { SITE } from "../config/site";
import { Link } from "react-router-dom";
import HeroBanner from "../components/layout/HeroBanner";
import SEO from "../components/seo/SEO";

export default function CustomItinerary() {
  return (
    <div className="bg-[#f6f1e8] text-zinc-900">
      <SEO
        title="Custom African Safari Itinerary | Victoria Falls Planner"
        description="Request a tailor-made African safari itinerary from Victoria Falls: Zimbabwe, Botswana, Zambia, Tanzania, Kenya, Namibia, or a multi-country crossing."
        path="/custom-itinerary"
      />
      <Navbar />
      <main>
        <HeroBanner
          src="/images/lance.jpg"
          alt="Tailor-made safari journey"
          className="min-h-[60vh]"
        >
          <div className="max-w-3xl text-white">
              <p className="mb-3 text-sm uppercase tracking-[0.24em] text-white/75">
                Bespoke Travel
              </p>
              <h1 className="text-4xl font-semibold md:text-6xl">
                Custom Safari Itineraries
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                Tell us your dates, pace, and the places you want to see. We
                will shape a private journey across Victoria Falls, Chobe, the
                Delta, and beyond.
              </p>
            </div>
        </HeroBanner>

        <section className="py-20 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
                How It Works
              </p>
              <h2 className="text-3xl font-semibold md:text-5xl">
                A journey designed around you.
              </h2>
              <div className="mt-8 space-y-6 text-base leading-8 text-zinc-600">
                <p>
                  Share who is travelling, when you would like to go, and whether
                  you prefer lodges, camps, or a mix of both. We recommend the
                  right parks, stays, and activities, then send a clear quote.
                </p>
                <p>
                  Prefer to talk it through? Call {SITE.phone} or message us on
                  WhatsApp. {SITE.replyTime}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
                >
                  WhatsApp the team
                </a>
                <Link
                  to="/packages"
                  className="inline-flex rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900"
                >
                  Browse set packages
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <InquiryForm
                defaultType="Custom Itinerary"
                lockType
                heading="Request a Tailor-Made Safari"
                intro="Include dates, guest numbers, destinations, and the kind of stay you have in mind."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
