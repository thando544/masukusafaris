export default function CustomHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dnqjax5ut/image/upload/q_auto/f_auto/v1775294136/masukusafaris.com8_kjougq.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
            Signature Safari Experience
          </p>

          <p className="mt-6 text-base leading-8 text-white/85 md:text-lg mt-[2em]">
            Discover unforgettable journeys across Zimbabwe and beyond —
            from wildlife safaris to breathtaking landscapes and iconic
            destinations.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/packages"
              className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-black hover:bg-amber-400"
            >
              View Packages
            </a>

            <a
              href="/contact"
              className="rounded-xl border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-black"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
