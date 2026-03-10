import { Link } from "react-router-dom";
import { packages } from "../../data/homeData";

export default function PackagesPreview() {
  return (
    <section id="packages" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-amber-700">
            Your Stay
          </p>
          <h2 className="text-3xl font-semibold text-zinc-900 md:text-5xl">
            Packages
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Link
              to={`/packages/${packages[0].slug}`}
              className="group block overflow-hidden rounded-2xl"
            >
              <img
                src={packages[0].image}
                alt={packages[0].title}
                className="h-125 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="pt-5">
                <h3 className="text-xl font-semibold text-zinc-900">
                  {packages[0].title}
                </h3>
                <p className="mt-2 text-base text-zinc-700">
                  {packages[0].price}{" "}
                  <span className="text-sm text-zinc-500">{packages[0].unit}</span>
                </p>
              </div>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {packages.slice(1).map((pkg) => (
              <Link
                key={pkg.id}
                to={`/packages/${pkg.slug}`}
                className="group block overflow-hidden rounded-2xl"
              >
                <div className="relative">
                  {pkg.popular && (
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-black">
                      Popular
                    </span>
                  )}
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {pkg.title}
                  </h3>
                  <p className="mt-2 text-base text-zinc-700">
                    {pkg.price}{" "}
                    <span className="text-sm text-zinc-500">{pkg.unit}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}