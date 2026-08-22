import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { SITE } from "../../config/site";
import SEO from "../../components/seo/SEO";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#f6f1e8] text-zinc-900">
      <SEO
        title="Privacy Policy"
        description={`How ${SITE.name} handles enquiry details, bookings, and advertising cookies including Google AdSense.`}
        path="/legal/privacy-policy"
      />
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated 22 August 2026</p>

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
          <h2 className="text-2xl text-zinc-900">Cookies and identifiers</h2>
          <p>
            We and third parties may place and read cookies on your browser, or
            use web beacons, IP addresses, and similar identifiers to operate
            the site, remember preferences, measure visits, and serve ads.
          </p>
          <h2 className="text-2xl text-zinc-900">Advertising (Google AdSense)</h2>
          <p>
            Third-party vendors, including Google, use cookies to serve ads
            based on a user’s prior visits to this website or other websites.
            Google’s use of advertising cookies enables it and its partners to
            serve ads to users based on their visit to this site and/or other
            sites on the internet. Users may opt out of personalized advertising
            by visiting{" "}
            <a
              className="underline"
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noreferrer"
            >
              Google Ads Settings
            </a>
            . Alternatively, you can opt out of a third-party vendor’s use of
            cookies for interest-based advertising by visiting{" "}
            <a
              className="underline"
              href="https://www.aboutads.info/"
              target="_blank"
              rel="noreferrer"
            >
              aboutads.info
            </a>
            . How Google uses information from sites that use its services is
            explained at{" "}
            <a
              className="underline"
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noreferrer"
            >
              How Google uses data when you use our partners’ sites or apps
            </a>
            .
          </p>
          <p>
            Ads appear only on content pages such as the homepage, packages,
            activities, and about. We do not show ads on booking, contact,
            custom-itinerary, legal, or error pages, and we do not place ads
            inside enquiry forms. We never ask anyone to click ads. Book and
            WhatsApp buttons are our own booking tools, not advertisements.
          </p>
          <h2 className="text-2xl text-zinc-900">Children</h2>
          <p>
            This website is for adults planning travel. It is not directed at
            children under 13, and we do not knowingly collect personal
            information from children.
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
