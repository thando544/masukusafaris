import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { SITE } from "../../config/site";
import SEO from "../../components/seo/SEO";

export default function TermsConditions() {
  return (
    <div className="bg-[#f6f1e8] text-zinc-900">
      <SEO
        title="Terms & Conditions"
        description={`Booking terms for ${SITE.name} safari packages, activities, and transfers from Victoria Falls.`}
        path="/legal/terms-conditions"
      />
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
          Terms & Conditions
        </h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated 17 August 2026</p>

        <div className="mt-10 space-y-6 text-base leading-8 text-zinc-600">
          <p>
            These terms apply to safari packages, activities, transfers, and
            custom itineraries arranged by {SITE.name}.
          </p>
          <h2 className="text-2xl text-zinc-900">Bookings</h2>
          <p>
            Website forms are reservation requests only. A booking is confirmed
            once our team replies with availability, inclusions, and payment
            instructions. Prices marked “Custom Quote” are indicative until
            confirmed.
          </p>
          <h2 className="text-2xl text-zinc-900">Payments and cancellations</h2>
          <p>
            Deposit, balance, and cancellation terms are stated on your quote
            and may vary by lodge or park. International flights, visas, travel
            insurance, and personal expenses are usually excluded unless listed.
          </p>
          <h2 className="text-2xl text-zinc-900">Travel responsibility</h2>
          <p>
            Safari travel involves wildlife, remote roads, and changing weather.
            Itineraries may be adjusted for safety, park regulations, or
            operational reasons. Guests are responsible for valid passports,
            visas, vaccinations, and comprehensive travel insurance.
          </p>
          <h2 className="text-2xl text-zinc-900">Contact</h2>
          <p>
            {SITE.email} · {SITE.phone} · {SITE.location}
          </p>
          <Link to="/contact" className="inline-flex text-sm font-semibold text-zinc-950">
            Speak with us →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
