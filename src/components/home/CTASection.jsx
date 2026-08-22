import { Link } from "react-router-dom";
import { SITE } from "../../config/site";

export default function CTASection() {
  return (
    <section className="bg-[#f6f1e8] py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-950 px-8 py-14 text-white md:px-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold md:text-5xl">
              Ready to book an African safari?
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-300">
              Tell us your dates and we will confirm lodge space, park fees, and
              transfers for Victoria Falls, Botswana, East Africa, or a custom
              crossing. WhatsApp is the fastest way to start.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="inline-flex rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
              >
                Book a Package
              </Link>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}