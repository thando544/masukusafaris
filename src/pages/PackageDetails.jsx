import { Link, useParams } from "react-router-dom";
import packages from "../data/packages";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BookingForm from "../components/booking/BookingForm";

export default function PackageDetails() {
  const { slug } = useParams();
  const selectedPackage = packages.find((item) => item.slug === slug);

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-white text-zinc-900">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-32 md:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold">Package not found</h1>
          <p className="mt-4 text-zinc-600">
            The package you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Back Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white text-zinc-900">
      <Navbar />

      <main>
        <section className="relative h-[75vh] min-h-130 overflow-hidden">
          <img
            src={selectedPackage.image}
            alt={selectedPackage.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-16 md:px-6 lg:px-8">
            <div className="max-w-3xl pt-24 text-white">
              <p className="mb-3 text-sm uppercase tracking-[0.24em] text-white/75">
                Accommodation Package
              </p>
              <h1 className="text-4xl font-semibold md:text-6xl">
                {selectedPackage.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                {selectedPackage.shortDescription}
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                  <p className="mb-2 text-sm uppercase tracking-[0.2em] text-amber-700">
                    Package Overview
                  </p>
                  <h2 className="text-2xl font-semibold text-zinc-900 md:text-3xl">
                    Stay Details
                  </h2>
                  <p className="mt-5 text-base leading-8 text-zinc-600">
                    {selectedPackage.description}
                  </p>
                </div>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-zinc-900">What’s Included</h3>
                    <ul className="mt-5 space-y-3 text-zinc-600">
                      {selectedPackage.included.map((item) => (
                        <li key={item} className="rounded-xl bg-zinc-50 px-4 py-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-zinc-900">What’s Excluded</h3>
                    <ul className="mt-5 space-y-3 text-zinc-600">
                      {selectedPackage.excluded.map((item) => (
                        <li key={item} className="rounded-xl bg-zinc-50 px-4 py-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                  <h3 className="text-xl font-semibold text-zinc-900">Amenities</h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {selectedPackage.amenities.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl bg-zinc-50 px-4 py-3 text-zinc-600"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {selectedPackage.gallery.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-2xl">
                      <img
                        src={image}
                        alt={`${selectedPackage.title} ${index + 1}`}
                        className="h-64 w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-24 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="rounded-2xl bg-zinc-950 p-5 text-white">
                    <p className="text-sm text-white/70">Starting from</p>
                    <div className="mt-2 text-3xl font-semibold">
                      {selectedPackage.priceLabel}
                    </div>
                    <p className="mt-1 text-sm text-white/70">{selectedPackage.unit}</p>
                  </div>

                  <div className="mt-6 space-y-4 text-sm text-zinc-700">
                    <div className="flex justify-between gap-4 border-b border-zinc-200 pb-3">
                      <span>Location</span>
                      <strong className="text-right text-zinc-900">
                        {selectedPackage.location}
                      </strong>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-zinc-200 pb-3">
                      <span>Check-in</span>
                      <strong className="text-zinc-900">{selectedPackage.checkIn}</strong>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-zinc-200 pb-3">
                      <span>Check-out</span>
                      <strong className="text-zinc-900">{selectedPackage.checkOut}</strong>
                    </div>
                    <div className="flex justify-between gap-4 pb-1">
                      <span>Best For</span>
                      <strong className="text-right text-zinc-900">
                        {selectedPackage.bestFor}
                      </strong>
                    </div>
                  </div>

                  <a
                    href="#booking-form"
                    className="mt-6 inline-flex w-full justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
                  >
                    Book This Package
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="booking-form" className="pb-20 md:pb-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <BookingForm
              itemType="package"
              itemName={selectedPackage.title}
              pricePerPerson={selectedPackage.price}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}