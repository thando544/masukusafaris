export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/gallery/4.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl pt-24">
          <p className="mb-5 max-w-3xl text-sm uppercase tracking-[0.25em] text-white/80 md:text-base">
            Unforgettable adventures, seamless transfers, and personalized
            experiences crafted just for you.
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
            Discover the Wonders of Africa
          </h1>

          <div className="mt-10">
            <a
              href="#about"
              className="inline-flex items-center gap-3 text-sm font-medium text-white transition hover:text-amber-300"
            >
              Scroll
              <span className="h-px w-16 bg-white/70" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}