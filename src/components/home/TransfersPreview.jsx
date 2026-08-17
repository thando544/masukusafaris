import { Link } from "react-router-dom";
import { transfers } from "../../data/homeData";
import Photo from "../common/Photo";

export default function TransfersPreview() {
  return (
    <section className="bg-[#f6f1e8] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-amber-700">
              Convenience During Your Tour
            </p>
            <h2 className="text-3xl font-semibold text-zinc-900 md:text-5xl">
              Airport and lodge transfers, handled with care.
            </h2>
          </div>
          <p className="lg:col-span-5 text-base leading-8 text-zinc-600">
            From Victoria Falls Airport to your lodge, border crossing, or next
            safari camp, the same professional team looks after the details so
            the journey stays smooth.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="overflow-hidden rounded-[28px] lg:col-span-5">
            <Photo
              src="/images/heli.jpg"
              alt="Safari transfer and scenic travel"
              fill
              className="aspect-4/3 min-h-80 lg:aspect-auto lg:min-h-full"
            />
          </div>

          <div className="space-y-8 lg:col-span-7">
            {transfers.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 border-t border-zinc-200 pt-8 lg:grid-cols-12"
              >
                <div className="lg:col-span-2">
                  <span className="text-sm font-semibold tracking-[0.2em] text-amber-700">
                    {item.id}
                  </span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="text-2xl font-semibold text-zinc-900">
                    {item.title}
                  </h3>
                </div>
                <div className="lg:col-span-6">
                  <p className="max-w-2xl text-base leading-8 text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            <Link
              to="/contact"
              className="inline-flex rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              Arrange a Transfer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
