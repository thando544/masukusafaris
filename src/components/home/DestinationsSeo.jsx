import { Link } from "react-router-dom";

const destinations = [
  {
    name: "Victoria Falls, Zimbabwe",
    text: "Start with the world’s largest sheet of falling water: guided Falls walks, Zambezi sunset cruises, helicopter flights, and day trips into Chobe.",
    to: "/activities",
  },
  {
    name: "Chobe & Okavango, Botswana",
    text: "Elephant herds on the Chobe Riverfront, boat safaris, and luxury camps in the Okavango Delta — our most requested multi-day Botswana packages.",
    to: "/packages/okavango-delta-safari",
  },
  {
    name: "Hwange & Matobo, Zimbabwe",
    text: "Big game in Hwange, granite hills and rhino tracking in Matobo, plus Great Zimbabwe on our 9-day around-Zimbabwe safari.",
    to: "/packages/9-days-around-zimbabwe-great-zimbabwe-matobo-hwange-victoria-falls",
  },
  {
    name: "Tanzania & Kenya",
    text: "Great Migration and Ngorongoro Crater in Tanzania, or Amboseli elephants and the Masai Mara in Kenya — classic East Africa safari weeks.",
    to: "/packages/7-days-tanzania-safari",
  },
  {
    name: "Namibia & Kruger",
    text: "Sossusvlei dunes and Etosha, or a 13-day Kruger, Matobo, Hwange and Victoria Falls crossing for travelers who want more than one country.",
    to: "/packages/14-days-namibia-botswana-victoria-falls",
  },
];

export default function DestinationsSeo() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
          Things to do in Africa
        </p>
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          Safari packages and activities planned from Victoria Falls
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-600 md:text-lg">
          Travelers searching for African safari holidays, Victoria Falls tours,
          Botswana wildlife trips, and tailor-made itineraries work with us as a
          local operator. We sell the journeys below — not generic continent-wide
          lists — with lodges, game drives, transfers, and guiding included as
          shown on each package page.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="rounded-[28px] border border-zinc-200 bg-[#fcfaf6] p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-zinc-950">{item.name}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{item.text}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-zinc-950">
                View trips →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
