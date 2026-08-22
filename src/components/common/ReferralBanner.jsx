import { Link, useSearchParams } from "react-router-dom";
import { SITE } from "../../config/site";

const SOURCES = {
  tripadvisor: "TripAdvisor",
  getyourguide: "GetYourGuide",
  gyg: "GetYourGuide",
  safaribookings: "SafariBookings",
  viator: "Viator",
  facebook: "Facebook",
  google: "Google",
};

function sourceLabel(params) {
  const raw = (
    params.get("utm_source") ||
    params.get("from") ||
    params.get("ref") ||
    ""
  )
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  return SOURCES[raw] || null;
}

export default function ReferralBanner() {
  const [params] = useSearchParams();
  const source = sourceLabel(params);
  if (!source) return null;

  return (
    <div className="sticky top-20 z-40 border-b border-amber-200 bg-amber-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-sm text-zinc-800 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <p>
          Welcome from {source}. Book the same Victoria Falls and African safari
          packages here with our team — WhatsApp is fastest.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/book"
            className="inline-flex rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white"
          >
            Book on this site
          </Link>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900"
          >
            WhatsApp a planner
          </a>
        </div>
      </div>
    </div>
  );
}
