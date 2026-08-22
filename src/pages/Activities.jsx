import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import activities from "../data/activities";
import Photo from "../components/common/Photo";
import HeroBanner from "../components/layout/HeroBanner";
import SEO from "../components/seo/SEO";

const filters = [
  { label: "All", value: "all" },
  { label: "Nature & Culture", value: "nature-culture" },
  { label: "Adventure", value: "adventure" },
  { label: "Wildlife", value: "wildlife" },
];

export default function Activities() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredActivities = useMemo(() => {
    if (activeFilter === "all") return activities;
    return activities.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-white text-zinc-900">
      <SEO
        title="Things to Do in Victoria Falls & Chobe | Activities"
        description="Book things to do in Victoria Falls and Chobe: Falls tours, sunset cruises, Chobe full-day trips, game drives, rafting, jet boat, bungee, and wildlife experiences with a local operator."
        path="/activities"
      />
      <Navbar />

      <main>
        <HeroBanner
          src="/images/rhino-3.jpeg"
          alt="Things to do in Victoria Falls and Chobe"
          className="min-h-[65vh]"
        >
          <div className="max-w-3xl text-white">
              <p className="mb-3 text-sm uppercase tracking-[0.24em] text-white/75">
                Things to do in Victoria Falls
              </p>
              <h1 className="text-4xl font-semibold md:text-6xl">
                Victoria Falls & Chobe activities
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                Guided Falls walks, Zambezi sunset cruises, Chobe day trips,
                game drives, rafting, jet boat, bungee, and wildlife encounters
                you can add to any safari package.
              </p>
            </div>
        </HeroBanner>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.25em] text-amber-700">
                  Select Category
                </p>
                <h2 className="text-3xl font-semibold text-zinc-900 md:text-5xl">
                  Explore Our Activities
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {filters.map((filter) => {
                  const active = activeFilter === filter.value;

                  return (
                    <button
                      key={filter.value}
                      onClick={() => setActiveFilter(filter.value)}
                      className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                        active
                          ? "bg-zinc-950 text-white"
                          : "border border-zinc-300 bg-white text-zinc-700 hover:border-zinc-900 hover:text-zinc-900"
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {filteredActivities.map((activity) => (
                <Link
                  key={activity.id}
                  to={`/activities/${activity.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="overflow-hidden">
                    <Photo
                      src={activity.image}
                      alt={activity.title}
                      ratio="aspect-16/10"
                      imgClassName="transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
                        {activity.category.replace("-", " ")}
                      </span>
                      <span className="text-sm text-zinc-500">{activity.duration}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-zinc-900">
                      {activity.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-zinc-600">
                      {activity.shortDescription}
                    </p>

                    <div className="mt-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xl font-semibold text-zinc-900">
                          {activity.priceLabel}
                        </p>
                        <p className="text-sm text-zinc-500">{activity.unit}</p>
                      </div>

                      <span className="text-sm font-semibold text-zinc-900 underline underline-offset-4">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-10 text-center">
                <h3 className="text-xl font-semibold text-zinc-900">
                  No activities found
                </h3>
                <p className="mt-3 text-zinc-600">
                  Try another category to view more experiences.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}