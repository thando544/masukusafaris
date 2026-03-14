import { Link } from "react-router-dom";
import packages from "../../data/packages";

export default function PackagesPreview() {
  return (
    <section id="packages" className="bg-[#fcfaf6] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
            Signature Journeys
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
            Featured Safari Packages
          </h2>
          <p className="mt-4 text-base leading-8 text-zinc-600 md:text-lg">
            Discover unforgettable safari journeys carefully designed around wildlife,
            scenery, comfort, and authentic African travel experiences.
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
                  <p className="text-sm font-medium text-white/80">{pkg.subtitle}</p>
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
                    View Package
                    <span className="transition group-hover:translate-x-1">→</span>
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