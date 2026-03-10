export default function AboutPreview() {
  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-amber-700">
            About Us
          </p>
          <h2 className="text-3xl font-semibold text-zinc-900 md:text-5xl">
            Why Travel with Masuku Adventure Safaris.
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6 text-base leading-8 text-zinc-600">
            <p>
              At Masuku Adventure Safaris, we transform your journey into an
              extraordinary adventure with our carefully curated experiences.
              Whether you're marveling at the stunning Victoria Falls,
              embarking on a thrilling Chobe safari, or exploring the cultural
              richness of Livingstone, our expert team ensures every moment is
              unforgettable.
            </p>
            <p>
              We handle all the details, offering seamless transfers and
              handpicked activities, so you can relax and fully immerse yourself
              in the magic of your destination.
            </p>
          </div>

          <div className="space-y-6 text-base leading-8 text-zinc-600">
            <p>
              Experience the ultimate convenience and personalized attention
              with Masuku Adventure Safaris. Our dedicated team crafts
              itineraries tailored to your unique preferences, providing
              exceptional service and support throughout your trip.
            </p>
            <p>
              We’re a trusted tour operator delivering safe, unforgettable
              safaris, proudly registered on{" "}
              <a
                href="https://safaribookings.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-zinc-900 underline"
              >
                SafariBookings
              </a>.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/img/mac/donald.jpg"
              alt="Masuku Adventure team"
              className="h-105 w-full object-cover"
            />
            <a
              href="/about"
              className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-900"
            >
              Explore More
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <img
              src="/img/mac/game_drive.jpg"
              alt="Game drive"
              className="h-105 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}