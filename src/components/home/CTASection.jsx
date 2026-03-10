import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-950 px-8 py-14 text-white md:px-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold md:text-5xl">
              Make room for adventure.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-300">
              Ready to embark on an unforgettable adventure? Contact Masuku
              Adventure Safaris today and let us create the perfect itinerary
              for your dream trip.
            </p>

            <Link
              to="/book"
              className="mt-8 inline-flex rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}