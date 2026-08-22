import { SITE } from "../../config/site";

const listings = [
  {
    name: "SafariBookings",
    href: SITE.safariBookings,
    text: "Official operator profile. Read traveler reviews, then book the same Victoria Falls, Chobe, and Okavango itineraries here.",
  },
  {
    name: "Facebook",
    href: SITE.facebook,
    text: "Photos, trip updates, and messages. Use the page to reach us, then complete a booking on this website.",
  },
  {
    name: "Google",
    href: SITE.googleMaps,
    text: "Masuku Adventure listing in Victoria Falls. Website, phone, and directions match the details on this site.",
  },
];

export default function ReviewsPresence() {
  return (
    <section className="bg-[#fcfaf6] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
          Reviews and listings
        </p>
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          Verified profiles that point back here
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-600 md:text-lg">
          These are the public pages we can confirm today. Read a review, then
          book packages and activities on this site or WhatsApp.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-[28px] border border-zinc-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-zinc-950">{item.name}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{item.text}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-zinc-950">
                Open profile →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
