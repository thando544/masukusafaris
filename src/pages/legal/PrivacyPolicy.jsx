import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { SITE } from "../../config/site";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#f6f1e8] text-zinc-900">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated 17 August 2026</p>

        <div className="mt-10 space-y-6 text-base leading-8 text-zinc-600">
          <p>
            {SITE.name} (“we”, “us”) is based in {SITE.location}. This policy
            explains how we handle personal information when you use{" "}
            {SITE.origin}, enquire, or book a safari.
          </p>
          <h2 className="text-2xl text-zinc-900">What we collect</h2>
          <p>
            We collect the details you send us: name, email, phone number, travel
            dates, party size, destination preferences, and any special requests.
            Booking and contact forms are delivered to our team by email.
          </p>
          <h2 className="text-2xl text-zinc-900">How we use it</h2>
          <p>
            We use this information to reply to enquiries, prepare itineraries
            and quotes, arrange lodges, activities, and transfers, and stay in
            touch about your trip. We do not sell your information.
          </p>
          <h2 className="text-2xl text-zinc-900">Sharing</h2>
          <p>
            We may share necessary details with trusted lodges, guides, transfer
            partners, and payment or email providers solely to deliver your
            safari. We do not take card payments on this website.
          </p>
          <h2 className="text-2xl text-zinc-900">Contact</h2>
          <p>
            Questions:{" "}
            <a className="underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>{" "}
            or {SITE.phone}.
          </p>
          <Link to="/contact" className="inline-flex text-sm font-semibold text-zinc-950">
            Back to contact →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
