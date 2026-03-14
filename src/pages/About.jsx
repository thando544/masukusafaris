import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import {
  FaCompass,
  FaGlobeAfrica,
  FaLeaf,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

const values = [
  {
    icon: <FaCompass />,
    title: "Tailored Journeys",
    text: "Every itinerary is shaped around the traveler, balancing comfort, adventure, and authentic experiences.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Trusted Guidance",
    text: "We focus on safe, reliable, and smooth safari planning from arrival to departure.",
  },
  {
    icon: <FaLeaf />,
    title: "Respect for Nature",
    text: "We believe in experiences that celebrate wildlife, landscapes, and local heritage responsibly.",
  },
];

const highlights = [
  {
    icon: <FaMapMarkedAlt />,
    title: "Multi-Destination Expertise",
    text: "From Victoria Falls and Chobe to Serengeti and Masai Mara, we help travelers explore Africa’s most iconic safari regions.",
  },
  {
    icon: <FaUsers />,
    title: "Personal Service",
    text: "We work closely with each client to recommend the right mix of tours, stays, transfers, and custom safari packages.",
  },
  {
    icon: <FaGlobeAfrica />,
    title: "Meaningful Travel",
    text: "We create journeys that connect travelers with wildlife, landscapes, and unforgettable moments across Africa.",
  },
];

export default function About() {
  return (
    <div className="bg-[#fcfaf6] text-zinc-900">
      <Navbar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt="Masuku Adventure Safaris"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-end px-4 pb-16 md:px-6 lg:px-8">
            <div className="max-w-4xl pt-24 text-white">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                About Masuku Adventure Safaris
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl lg:text-7xl">
                Journeys Across Africa, Crafted With Care
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                We create safari experiences that go beyond sightseeing — blending
                wildlife, landscapes, culture, and comfort into journeys travelers
                remember for a lifetime.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
                Our Story
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
                More Than a Booking — A Complete Safari Experience
              </h2>
            </div>

            <div className="space-y-6 text-base leading-8 text-zinc-600 lg:col-span-7">
              <p>
                Masuku Adventure Safaris was built around one simple idea: travel in
                Africa should feel inspiring, seamless, and deeply memorable. Whether
                a guest is exploring Victoria Falls, cruising through Chobe, witnessing
                the Great Migration in Tanzania, or heading into the Masai Mara, we
                believe every journey deserves thoughtful planning and personal care.
              </p>
              <p>
                Our role is to make travel easier and richer. We help guests discover
                the right mix of accommodation, activities, transfers, and multi-day
                safari packages while keeping the experience smooth from the very first
                inquiry to the final day of the trip.
              </p>
              <p>
                We are passionate about showcasing Africa through experiences that feel
                genuine, well-organized, and unforgettable — journeys filled with
                wildlife, scenery, culture, and moments that stay with you long after
                you return home.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              {values.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-zinc-200 bg-white p-8 shadow-sm"
                >
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-xl text-amber-700">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-zinc-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-zinc-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="overflow-hidden rounded-4xl">
                <img
                  src="/images/lance.jpg"
                  alt="Safari landscape"
                  className="h-130 w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center rounded-4xl border border-zinc-200 bg-white p-8 shadow-sm md:p-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
                  Why Travel With Us
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
                  Thoughtful Planning. Authentic Experiences. Lasting Memories.
                </h2>
                <p className="mt-5 text-base leading-8 text-zinc-600">
                  We do more than arrange tours. We help shape complete journeys with
                  the right flow, the right destinations, and the right atmosphere for
                  each traveler — whether that means adventure, wildlife, culture,
                  comfort, or a little of everything.
                </p>

                <div className="mt-8 space-y-5">
                  {highlights.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-800">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-950">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-zinc-600">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="overflow-hidden rounded-[28px]">
                <img
                  src="/images/spot.jpg"
                  alt="Wildlife safari"
                  className="h-80 w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[28px]">
                <img
                  src="/images/zamb.jpeg"
                  alt="River experience"
                  className="h-80 w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[28px]">
                <img
                  src="/images/club.jpg"
                  alt="Safari lodge"
                  className="h-80 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="rounded-4xl bg-zinc-950 px-8 py-14 text-white md:px-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
                    Let’s Plan Your Journey
                  </p>
                  <h2 className="text-3xl font-semibold md:text-5xl">
                    Ready to Explore Africa With Confidence?
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
                    Whether you are looking for a day activity, a luxury lodge stay,
                    or a full safari package, we’re here to help you create the right
                    experience from start to finish.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 lg:justify-end">
                  <Link
                    to="/#packages"
                    className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
                  >
                    Explore Packages
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}