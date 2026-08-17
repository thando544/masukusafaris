import { stats } from "../../data/homeData";

export default function StatsSection() {
  return (
    <section className="bg-[#f6f1e8] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
          Trusted Local Guiding
        </p>
        <h2 className="max-w-4xl text-3xl font-semibold leading-snug text-zinc-900 md:text-5xl">
          We strive to be the best in creating unforgettable adventures tailored
          just for you.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                {stat.label}
              </p>
              <div className="mt-4 text-4xl font-semibold text-zinc-900 md:text-5xl">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
