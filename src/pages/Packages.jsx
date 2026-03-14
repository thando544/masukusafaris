import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import packages from "../data/packages";

import { Link } from "react-router-dom";

export default function Packages() {
  return (
    <div className="bg-[#fcfaf6] text-zinc-900">
      <Navbar />

      <main>
        <section className="relative min-h-[70vh] overflow-hidden">
          <img
            src="/images/tanzania.jpeg"
            alt="Safari packages"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-end px-4 pb-16 md:px-6 lg:px-8">
            <div className="max-w-4xl pt-24 text-white">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                Signature Safari Journeys
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl lg:text-7xl">
                Curated Safari Packages Across Africa
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                Explore premium multi-day journeys designed around wildlife,
                breathtaking landscapes, and unforgettable safari experiences.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
                Safari Packages
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
                Choose Your Next Journey
              </h2>
              <p className="mt-4 text-base leading-8 text-zinc-600 md:text-lg">
                Browse our safari packages and open each one to explore the
                itinerary, gallery, inclusions, and booking form.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {packages.map((pkg) => (
                <Link
                  key={pkg.id}
                  to={`/packages/${pkg.slug}`}
                  className="group block overflow-hidden rounded-[30px] bg-white shadow-sm ring-1 ring-zinc-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="h-105 w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

                    <div className="absolute left-5 top-5">
                      <span className="rounded-full bg-amber-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-black">
                        Safari Package
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-sm font-medium text-white/80">
                        {pkg.subtitle}
                      </p>
                      <h3 className="mt-2 text-3xl font-semibold leading-tight text-white">
                        {pkg.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm leading-7 text-zinc-600">
                      {pkg.shortDescription}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-2xl font-semibold text-zinc-950">
                          {pkg.priceLabel}
                        </p>
                        <p className="text-sm text-zinc-500">{pkg.unit}</p>
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-950">
                        View Itinerary
                        <span className="transition group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}