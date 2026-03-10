import { transfers } from "../../data/homeData";

export default function TransfersPreview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-amber-700">
            Convenience During Your Tour
          </p>
          <h2 className="text-3xl font-semibold text-zinc-900 md:text-5xl">
            Transfers.
          </h2>
        </div>

        <div className="space-y-10">
          {transfers.map((item) => (
            <div
              key={item.id}
              className="grid gap-4 border-t border-zinc-200 pt-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-1">
                <span className="text-sm font-semibold text-zinc-400">
                  {item.id}
                </span>
              </div>

              <div className="lg:col-span-5">
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
        </div>
      </div>
    </section>
  );
}