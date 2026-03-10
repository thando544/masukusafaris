import { stats } from "../../data/homeData";

export default function StatsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="max-w-4xl text-2xl font-semibold leading-snug text-zinc-900 md:text-4xl">
          We strive to be the best in creating unforgettable adventures tailored
          just for you.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
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