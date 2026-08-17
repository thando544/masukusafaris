import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { SITE } from "../config/site";
import HeroBanner from "../components/layout/HeroBanner";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f6f1e8] text-zinc-900">
      <Navbar />
      <main>
        <HeroBanner
          src="/images/hero.jpg"
          alt="African safari landscape"
          className="min-h-screen"
          contentClassName="max-w-3xl flex-col items-start justify-end pb-24 pt-32"
        >
            <p className="text-sm uppercase tracking-[0.24em] text-white/70">404</p>
            <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">
              This path is off the map.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/85">
              The page you were looking for does not exist. Return home, browse
              safari packages, or message us on WhatsApp and we will point you
              in the right direction.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
              >
                Back Home
              </Link>
              <Link
                to="/packages"
                className="inline-flex rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                View Packages
              </Link>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                WhatsApp Us
              </a>
            </div>
        </HeroBanner>
      </main>
      <Footer />
    </div>
  );
}
