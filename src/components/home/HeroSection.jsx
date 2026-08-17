import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <img
        src="https://res.cloudinary.com/dnqjax5ut/image/upload/q_auto/f_auto/v1775294136/masukusafaris.com8_kjougq.jpg"
        alt="Safari landscape across Africa"
        className="hero-media absolute inset-0 h-full w-full max-w-none object-cover object-center"
      />

      <div className="hero-veil absolute inset-0" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl pt-28 md:pt-32">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85 backdrop-blur-sm md:text-xs">
            Curated Safaris • Transfers • Tailor-Made African Journeys
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Experience Africa with Masuku Adventure Safaris
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
            Discover unforgettable journeys across Zimbabwe and beyond — from
            Victoria Falls to Chobe and world-class safari destinations. Let us
            craft your perfect African adventure with comfort, authenticity, and
            unforgettable moments.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Victoria Falls", "Chobe", "Okavango Delta", "Hwange"].map((place) => (
              <span
                key={place}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs tracking-[0.18em] text-white/85 uppercase"
              >
                {place}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/packages"
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-4 text-sm font-semibold text-black transition hover:bg-amber-400"
            >
              Explore Packages
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
