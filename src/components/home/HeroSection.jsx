import { Link } from "react-router-dom";
import HeroBanner from "../layout/HeroBanner";
import { SITE } from "../../config/site";

export default function HeroSection() {
  return (
    <HeroBanner
      src="https://res.cloudinary.com/dnqjax5ut/image/upload/q_auto/f_auto/v1775294136/masukusafaris.com8_kjougq.jpg"
      alt="Safari landscape across Africa"
      className="min-h-screen"
      contentClassName="items-center"
      kenburns
    >
      <div className="max-w-4xl pt-28 md:pt-32">
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85 backdrop-blur-sm md:text-xs">
          Victoria Falls operator • African safari packages • Day trips
        </span>

        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Safari packages and things to do in Africa, planned from Victoria Falls
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
          Book Victoria Falls tours, Chobe day trips, Okavango Delta safaris,
          Hwange game drives, Tanzania Great Migration weeks, and Kenya Masai
          Mara itineraries with a local Zimbabwe operator. Lodges, guiding, and
          transfers are arranged on the packages we actually sell.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {["Victoria Falls", "Chobe", "Okavango Delta", "Tanzania", "Kenya"].map((place) => (
            <span
              key={place}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs tracking-[0.18em] text-white/85 uppercase"
            >
              {place}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/packages"
            className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-4 text-sm font-semibold text-black transition hover:bg-amber-400"
          >
            Explore Packages
          </Link>

          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            WhatsApp a Planner
          </a>
        </div>
      </div>
    </HeroBanner>
  );
}
