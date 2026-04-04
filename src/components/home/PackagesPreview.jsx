import { Link } from "react-router-dom";
import packages from "../../data/packages";

export default function PackagesPreview() {
  return (
    <section id="packages" className="bg-[#fcfaf6] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
              Signature Journeys
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
              Featured Safari Packages
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-600 md:text-lg">
              Explore beautifully curated safari journeys designed around
              wildlife, scenery, comfort, and unforgettable African travel
              experiences.
            </p>
          </div>

          <div>
            <Link
              to="/packages"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-900"
            >
              View All Packages
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {packages.slice(0, 4).map((pkg) => (
            <Link
              key={pkg.id}
              to={`/packages/${pkg.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="h-70ll object-cover transition duration-700 group-hover:scale-105 md:h-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-amber-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-black">
                    Safari Package
                  </span>

                  {pkg.popular && (
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-900">
                      Popular
                    </span>
                  )}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  {pkg.location && (
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/75">
                      {pkg.location}
                    </p>
                  )}

                  <h3 className="mt-2 text-2xl font-semibold leading-tight text-white md:text-3xl">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-medium text-amber-700">
                  {pkg.subtitle || "Carefully curated safari experience"}
                </p>

                <p className="mt-4 line-clamp-3 text-sm leading-7 text-zinc-600 md:text-base">
                  {pkg.shortDescription}
                </p>

                <div className="mt-6 grid gap-4 rounded-2xl bg-zinc-50 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Best For
                    </p>
                    <p className="mt-2 text-sm font-medium text-zinc-900">
                      {pkg.bestFor || "Couples, families, safari lovers"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Duration
                    </p>
                    <p className="mt-2 text-sm font-medium text-zinc-900">
                      {pkg.checkIn && pkg.checkOut
                        ? `${pkg.checkIn} – ${pkg.checkOut}`
                        : "Multi-day safari"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4 border-t border-zinc-200 pt-6">
                  <div>
                    <p className="text-2xl font-semibold text-zinc-950">
                      {pkg.priceLabel}
                    </p>
                    <p className="text-sm text-zinc-500">{pkg.unit}</p>
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-950">
                    View Itinerary
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
