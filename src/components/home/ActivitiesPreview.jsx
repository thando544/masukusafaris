import { Link } from "react-router-dom";
import activities from "../../data/activities";

export default function ActivitiesPreview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
              Signature Experiences
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
              Activities & Adventures
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-600 md:text-lg">
              Discover unforgettable wildlife encounters, scenic adventures, and
              guided experiences designed to make your journey through Victoria
              Falls and beyond truly memorable.
            </p>
          </div>

          <div>
            <Link
              to="/activities"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-900"
            >
              View All Activities
            </Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {activities.slice(0, 6).map((activity) => (
            <Link
              key={activity.id}
              to={`/activities/${activity.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="h-65 w-full object-cover transition duration-700 group-hover:scale-105 md:h-75"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-900">
                    {activity.category?.replace("-", " ") || "Experience"}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-2xl font-semibold leading-tight text-white">
                    {activity.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-medium text-amber-700">
                  {activity.priceLabel || "Custom Quote"}
                </p>

                <p className="mt-4 line-clamp-3 text-sm leading-7 text-zinc-600 md:text-base">
                  {activity.shortDescription}
                </p>

                <div className="mt-6 grid gap-4 rounded-2xl bg-zinc-50 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Location
                    </p>
                    <p className="mt-2 text-sm font-medium text-zinc-900">
                      {activity.location || "Victoria Falls"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Duration
                    </p>
                    <p className="mt-2 text-sm font-medium text-zinc-900">
                      {activity.duration || "Flexible"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4 border-t border-zinc-200 pt-6">
                  <div>
                    <p className="text-2xl font-semibold text-zinc-950">
                      {activity.priceLabel || "Custom Quote"}
                    </p>
                    <p className="text-sm text-zinc-500">{activity.unit}</p>
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-950">
                    View Details
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
